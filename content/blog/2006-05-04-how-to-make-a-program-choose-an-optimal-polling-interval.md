---
title: How to make a program choose an optimal polling interval
date: "2006-05-04"
url: /blog/2006/05/04/how-to-make-a-program-choose-an-optimal-polling-interval/
categories:
  - Programming
---
My co-worker John taught me a useful technique to let a program choose an optimal wait time when polling a resource. In the post couple of years, I've used it many times. In this article I'll explain the technique and give some examples of when to use it (and when not to use it!).

### The technique

Here is pseudo-code for a process that needs to poll a resource:

<pre>wait = 128;
minWait = 1;
maxWait = 32768;
didSomething = false;

while (true) {
   didSomething = false;

   // Do stuff till done
   do {
      stuffToDo = pollResource();
      if (stuffToDo) {
         doStuff(stuffToDo);
         didSomething = true;
      }
   } while (stuffToDo);

   // Decide how long to wait
   if (didSomething) {
      wait = max(minWait, wait / 2);
   }
   else {
      wait = min(maxWait, wait * 2);
   }

   // Wait
   sleep(wait);
}</pre>

This code is an infinite loop that polls something, does what needs to be done, then sleeps a varying amount of time. If there was something to do, it must have waited too long last time, so it halves the current wait time. If there was nothing to do, it waits twice as long. I've specified minimum, maximum, and initial wait times. All are powers of 2, which is important because the algorithm always halves or doubles it, so it needs to always be divisible by two.

The code will not only choose a sleep time and adapt to changing conditions. During periods where there's more to do, it'll wake up more and more often. When there's less to do, it'll check less often. It does require some learning time before it gets in the right ballpark, but since it's a binary search, that happens quickly.

### Improvements for greater accuracy

The above code is bare-minimum simplistic, and there are many ways to improve it. Here's one limitation: it won't actually find a single optimal sleep time. It'll bounce around between several powers of two. That might not be so great, depending on the application. Here are two ways to change that:

1.  Don't work in powers of two. Choose a multiplier and an interval such as 100, then increment or decrement the multiplier. Now the interval goes from 100 to 200, 300, 400... The downside to this method is the wait time may not adapt quickly enough to changing conditions, for some applications.
2.  Don't change the interval based on a boolean value such as `didSomething`, but compare a number such as `amountOfStuffDone` to a range of values. If `amountOfStuffDone` is between acceptable values, the interval doesn't need to be changed.

Both variations can help find a better wait time.

### How to learn fast, then become stable

The power-of-two algorithm has the best learning time, because it uses a binary search to find a time. However, it bounces around between times, as I discussed above. The other variations I presented can help find a truly optimal value and stay there. These approaches can be combined by doing a binary search initially, then changing to a value that increments or decrements less drastically, with an acceptable-value algorithm to keep it stable.

How do I know when it's time to change from binary search to increment/decrement? The first time the binary search *changes direction*, I switch to increment/decrement.

There's a downside to that, too. If there's nothing to do for a long time, then a sudden burst of activity, the algorithm is in sluggish mode and won't shorten its sleep time fast enough. This might happen while people aren't at work during the night, then they get to work in the morning and create a bunch of work do be done abruptly. To solve this, if the sleep time has to be changed twice in the same direction, it's time to switch to binary search again.

These and other refinements require more code, but if they're needed, they're needed.

### When it's useful

I've used this approach when something genuinely needs to be polled (but only if I can't find a better way). For example, at my last job I wrote two mass e-mail programs. Emails were stored in the database, which should be polled as infrequently as possible. Variable sleep times helped the program find a good interval and adjust it as the volume of email varied through the day. Another use was processing inbound email from a POP3 server.

### When not to use it

This is definitely not a one-size-fits-all technique. Although it's simple and elegant, I find myself tempted to use it sometimes when there's a much better way. To a man with a hammer, everything looks like a nail! Here are some cases where it's not the best choice:

*   This isn't a replacement for bona fide scheduling algorithms.
*   This isn't a good way to coordinate IPC or threading. That's what monitors, semaphores, and so forth are made for.
*   This isn't a good way to listen for events. That's what the [Observer design pattern][1] is for (in .NET, use [events and delegates][2]).
*   Consider whether polling is really necessary. If there's another option, it's probably better not to poll.

Sometimes I've also found myself using this when I just couldn't figure out how to decide when it's time to do something. For example, I implemented this algorithm in a bid-management system for online advertising. When the system calculated a bid on an ad, it compared the calculated bid to the current bid. If it was different, the system considered it had "done some work," and decreased the `reviewInterval` on the ad, so it would examine it again sooner for a bid change. I did this so I could decrease the amount of work the system was doing every time it calculated bids, because every ad required looking up tons and tons of historical click and order data, previous bid history, and so on. The `nextReview` variable helped keep the working set small.

This may have been a good thing to do, but perhaps I was over-working the technique. At my new employer I proposed a similar approach to optimizing when bids need to be sent for an ad, but John found a much smarter way to figure out when an ad needs to be bid. Instead of guessing at how often it needs to be bid, he showed me there's a way to actually calculate how important it is to bid the ad, avoiding the "learning time" and imprecision inherent to the algorithm I showed above.

It's true John and I were optimizing different things. "Whether to bid" isn't the same thing as "whether to calculate a bid," and "keep the working set small" isn't the same as "only make important bid changes," but it's certain the system won't bid an ad if it doesn't first calculate a bid. The discussion made me re-examine my optimization strategy, which is a good thing.

 [1]: http://en.wikipedia.org/wiki/Observer_design_pattern
 [2]: http://msdn.microsoft.com/library/en-us/dnbda/html/observerpattern.asp
