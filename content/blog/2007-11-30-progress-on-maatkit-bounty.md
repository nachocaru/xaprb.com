---
title: Progress on Maatkit bounty
  <p>My <a href="http://www.xaprb.com/blog/2007/11/29/maatkit-bounty-begins-tomorrow/">initial plans</a> got waylaid!  I didn't pull out the checksumming code first, because the code wasn't at all as I remembered it.  Instead, I began writing code to handle the more abstract problem of accepting two sets of rows, finding the differences, and doing something with them.  I'm ending up with a little more complicated system than I thought I would.  However, it's also significantly simpler in some ways. Instead of just passing references to subroutines to use as callbacks, I'm object-ifying the entire synchronization concept...</p>
date: "2007-11-30"
permalink: /2007/11/30/progress-on-maatkit-bounty/
description:
  - Progress on the Maatkit bounty for the table synchronization tool for MySQL
tags:
  - MySQL
  - OOP
  - SQL
  - synchronization
---
My [initial plans][1] got waylaid! I didn't pull out the checksumming code first, because the code wasn't at all as I remembered it. Instead, I began writing code to handle the more abstract problem of accepting two sets of rows, finding the differences, and doing something with them. I'm ending up with a little more complicated system than I thought I would. However, it's also significantly simpler in some ways. Instead of just passing references to subroutines to use as callbacks, I'm object-ifying the entire synchronization concept.

What's the advantage of doing this? Well, as some of you may know, there are two fairly complex algorithms in the tool at present, which handle synchronization in a hierarchical manner, zooming in on the rows that need to be changed. There are a lot of complexities in them. If I wrap all that up into modules, and make them have a uniform interface (real OO interfaces would be delightful here, but Perl doesn't support them), I can simplify the project significantly by&#8230;

&#8230;throwing them out the window! That's right, I'm tossing out the 'top-down' and 'bottom-up' algorithms. What I want to develop, first and foremost, is the code that does the synchronization, not the really twisted code that does bitwise XORs on groupwise slices of checksums and has recursion and all that stuff. So I decided on a generic data-syncing interface, and wrote the simplest possible implementation of that, which I'm going to use to help me deal with complexity. This algorithm is called 'stream' (for lack of a better word). It has no hierarchical drill-down or any other complexities. It amounts to "select \* from source, select \* from dest, diff and resolve."

It's not a very efficient algorithm for comparing and syncing data, at least not by my standards. (It amounts to a `FULL OUTER JOIN` implemented in Perl). But boy, does it make it easier to start cleaning up the nasty spaghetti code that handles locking, waiting for a slave to catch up, actually changing the data that turns out to be different, and so on.

Of course, I'll add back the top-down and bottom-up algorithms later, as well as some others. They should turn out to be pretty simple to implement, since they won't have, for example, locking code intertwined with them. When done, the tool will examine the table and figure out the best algorithm to use. This will go a good way towards another of my goals, which is that you should be able to just point it at two tables and tell it to sync them, and it should do it in the most efficient way possible, without needing lots of command-line options.

 [1]: http://www.xaprb.com/blog/2007/11/29/maatkit-bounty-begins-tomorrow/
