---
title: Avoiding statement-based replication warnings
date: "2012-08-23"
permalink: /2012/08/23/avoiding-statement-based-replication-warnings/
categories:
  - Databases
---
Although not perfect, MySQL replication was probably the killer feature that made MySQL the default database for web applications some time ago. Since then, MySQL replication has been improved greatly, with such notable changes as row-based replication. At the same time, the replication engineering team has made MySQL replication more conservative and less forgiving of foot-gun errors. These have gone a long way towards helping users avoid some of the problems that made replication sometimes drift out of sync with the master copy, sometimes silently.

In some cases I think the strictness has gone a little too far. One example is the server's identification of statements that are unsafe for replication because they are nondeterministic. Here is a statement in an application I manage, which is designed to claim some work from a queue. After running this statement, the application checks if any rows were affected, and if so, it then fetches and processes the rows:

<pre>update pending_jobs set token = ?
where token is null
  and (owner_pid is null or owner_pid <> ?)
order by id
limit 1;</pre> 
MySQL will write to the server's error log when this statement is issued and binlog_format=STATEMENT, because of the presence of a LIMIT in the statement: *120823 20:59:12 [Warning] Unsafe statement written to the binary log using statement format since BINLOG_FORMAT = STATEMENT. The statement is unsafe because it uses a LIMIT clause. This is unsafe because the set of rows included cannot be predicted. Statement: [statement follows]*

This becomes a problem very quickly, because in fact the statement is deterministic and the rows to be affected can be predicted perfectly. The server is just being overly strict. The general technique illustrated here is a superior alternative to some other ways of [implementing a queue in a database table][1]. But if a superior alternative floods the error log with spurious messages, it must be avoided anyway.

The solution I chose in this case is a blend of SQL and application code. Part of the logic &#8212; the limit &#8212; must be handled in the application code, and pulled out of the UPDATE statement so the server will consider it to be deterministic. Here is pseudocode for the result:

<pre>
function claim_a_job() {
   $pid   = get_pid();
   $token = md5(rand(), time(), $pid);
   @jobs  = query(
            "select id from pending_jobs
             where token is null and (owner_pid is null or owner_pid <> ?)
             order by id", $pid);
   foreach ( $job in @jobs ) {
      next unless query("update pending_jobs set token=?
                         where token is null and id=?", $token, $job);
      return $job;
   }
   return null;
}
</pre> 
This code finds all unclaimed rows and tries to claim each one in turn. If there's a race condition and another worker has claimed the job in the meantime, no rows will be updated. If the UPDATE affects a row, then the function claimed the job successfully, and the job's ID is returned. The most important thing, however, is that the SQL lacks any constructs such as LIMIT that might cause errors to be spewed into the log. I want my logs to be silent so that I can detect when something really important actually happens.

Percona Server has a feature to disable logging this warning, which is a mixed blessing. I want to find all such queries and examine them, because some of them might be a legitimate risk to replication integrity. If I disable the logging, it becomes much harder, though I can potentially do it by inspecting TCP traffic instead. I do wish that official MySQL supported the ability to silence warnings selectively, however.

Another possible solution would be to switch to row-based binary logging, which comes with many other benefits as well. But such a change is not to be taken lightly; it requires a careful assessment of the server and its workload, lest there be unintended consequences.

An even better solution would be to implement some additional features in the server. Many of the features that developers like the most about NoSQL databases such as MongoDB and Redis (or even PostgreSQL) are special-case behaviors to simplify things that are awkward to do in most databases. Examples include atomically adding and removing from a queue, and features to avoid polling, such as LISTEN and NOTIFY.

 [1]: http://www.engineyard.com/blog/2011/5-subtle-ways-youre-using-mysql-as-a-queue-and-why-itll-bite-you/
