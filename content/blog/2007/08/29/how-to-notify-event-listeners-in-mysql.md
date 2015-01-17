---
title: How to notify event listeners in MySQL
date: "2007-08-29"
url: /blog/2007/08/29/how-to-notify-event-listeners-in-mysql/
categories:
  - Databases
---
A high-performance application that has producers and consumers of some resource, such as a queue of messages, needs an efficient way to notify the consumers when the producer has inserted into the queue. Polling the queue for changes is not a good option. MySQL's `GET_LOCK()` and `RELEASE_LOCK()` functions can provide both mutual exclusivity and notifications.

This post was prompted by a message to the MySQL general emailing list some time ago, but I'm finally getting around to actually testing the theoretical solution I mentioned then (I can never just think my way through anything that involves locking and waiting... I have to test it).

Here's the set-up:

<pre>create table test.messages (
   id int not null auto_increment primary key,
   message varchar(50) not null
);</pre>

### The producer

The producer's job is to insert rows into the table. In pseudo-code,

<pre>while (true ) {
   get_lock();
   // time passes...
   query("insert into messages(message) values ('hi')");
   release_lock();
}</pre>

Releasing the lock immediately after inserting will "wake up" the consumer, which must be blocked, waiting for the lock. Locking again as soon as possible will make the producer wait until the consumer is done processing, then the consumer will wait again.

### The consumer

Since the consumer is waiting for the lock, that means it has tried to exclusively lock the same resource the producer has locked. Once the producer releases it, the consumer can go ahead and process the rows just inserted. In pseudo-code:

<pre>$last_row = 0;
while ( true ) {
   get_lock();
   $rows = query("SELECT * FROM messages WHERE id &gt; $last_row");
   for each $row ( $rows ) {
      // Process
      $last_row = $row[id];
   }
   release_lock();
}
</pre>

### Locking

The actual locking implementation always makes the details more complicated.

Both the producer and the consumer will have to get an exclusive lock on the queue table, or something that represents the queue table. The immediately obvious solution is `LOCK TABLES`. This doesn't work well for most situations.

Why not? Since the producer and/or the consumer might need to access data in more than one table, they'll have to lock all the tables they need. This will block other parts of the system from functioning, assuming there's more than just a queue in the database. Other queries might then need to use `LOCK TABLES` too, and this just has a way of spreading out of control until the entire database becomes serial, mutual-exclusive access. This is terrible for any serious application.

Fortunately, MySQL has application locks, implemented with [GET\_LOCK() and RELEASE\_LOCK()][1]. They're advisory, so you can ignore them if you want, but they are handy for things like this, where the producer and consumer just need to lock the same thing. They're also relatively cheap. You're really just locking a string, which you can pick. I'll use the name of the table.

Here's the code:

<pre>// Producer:
$timeout = 1000000;
while (true) {
   query("SELECT GET_LOCK('messages', $timeout)");
   // time passes...
   query("insert into messages(message) values ('hi')");
   query("SELECT RELEASE_LOCK('messages')");
}

// Consumer:
$last_row = 0;
while ( true ) {
   query("SELECT GET_LOCK('messages', $timeout)");
   $rows = query("SELECT * FROM messages WHERE id &gt; $last_row");
   for each $row ( $rows ) {
      // Process
      $last_row = $row[id];
   }
   query("SELECT RELEASE_LOCK('messages')");
}
</pre>

This works because the producer and consumer are really notifying *each other* -- it's not one-way, it's symmetric. Inside MySQL, there's a queue of threads waiting for locks. As soon as one releases the lock, the other gets it, and immediately goes back onto the queue waiting for it again.

### Complications

There's more to it than this. `GET_LOCK()` has a timeout, which can't be infinite. If the timeout expires, the function returns, but doesn't grant the lock. Some other errors could also cause this to happen. The producer and consumer have to be prepared to recognize when the lock isn't granted, and retry. The return value of `GET_LOCK()` signifies whether the lock was really granted. Also, either the producer or consumer could die, and then there'd be no wait for the lock at all. The consumer can tell that this happened by noticing there's no work to do. The producer can't really tell unless it queries the database. But the producer is likely waiting for something (another lock, user input...) where the code says "time passes." So this shouldn't really be a problem.

Another limitation is the possibility of the consumer starting first and locking out the producer. If it doesn't release the lock and try to re-lock periodically, the producer will never be able to get a lock. If it does, there's still another problem. The consumer should sleep so as not to spin-wait for the presence of a producer. If the producer produces a row while the consumer is sleeping, and then doesn't produce and release again for a very long time, the consumer will not find out about the row the producer inserted. It will have to wait for the next message the producer inserts. The solution is to make sure the consumer keeps the lock while it sleeps.

All of these issues are solvable with special-case startup code, but I'm sure you can work out something that meets your needs. I don't want to make this article more complicated, because this will all be application-dependent.

### Sample application

Here is a Perl script that implements a producer and consumer on a MySQL table called `test.messages`. To run it, give a `--mode` argument of 'p' or 'c'. Be sure you create the table (see above) first:

*   [producer_consumer.txt][2]

Start two instances, one in producer mode, one in consumer mode, and watch the consumer print out messages as you enter them into the producer. Fun!

### More options

If you do need to poll, there are still some steps you can take to make it more efficient. I wrote about [efficient polling with exponential or Fibonacci wait][3] a while ago. This technique has worked well for me in many applications.

You can also poll on something small and efficient, instead of polling a potentially big messages table. Make another table in which the producer inserts a single row, or flips a single row from zero to one, and the consumer resets it. Polling on a small resource is much more efficient than a big resource. You can use this technique together with transactions to coordinate the work of many producers and consumers, even when you don't have explicit methods of locking (for example, if your database server doesn't support it).

Finally, if you need a fixed-size FIFO queue or "round-robin table," try the suggestions in my article on [how to create a queue in SQL][4].

 [1]: http://dev.mysql.com/doc/refman/5.0/en/miscellaneous-functions.html
 [2]: https://gist.github.com/xaprb/8494656
 [3]: http://www.xaprb.com/blog/2006/05/04/how-to-make-a-program-choose-an-optimal-polling-interval/
 [4]: http://www.xaprb.com/blog/2007/01/11/how-to-implement-a-queue-in-sql/
