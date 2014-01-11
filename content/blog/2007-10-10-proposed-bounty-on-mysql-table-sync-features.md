---
title: Proposed bounty on MySQL Table Sync features
date: "2007-10-10"
permalink: /2007/10/10/proposed-bounty-on-mysql-table-sync-features/
---
I am considering taking some time off work to concentrate deeply on [MySQL Table Sync][1], which has been getting usage in very large companies whose names we all know. There are a lot of bugs and feature requests outstanding for it. It is overly complex, needs a lot of work, and I can't do it in one-hour or even three-hour chunks. I need to focus on it. I'm considering asking for a bounty of $2500 USD for this. Please let me know what you think of this; it seems to be a successful way to sponsor development on some other projects, like Vim.

For the amount of time I think this will take, $2500 is far below my per-hour consulting rate; I considered setting the bounty higher, but I think this will be a fair amount.

I would not begin this project before December at the earliest, so there's some time to raise funds and time for me to continue working on High Performance MySQL. I would like a volunteer to coordinate the fund-raising for me. It should be trivial, but I don't want to do it myself, for several reasons. I can publicize the bounty on this blog and the project mailing list, and contact some of the corporations that have asked me for features. I doubt it will be hard to raise the money.

I'm not committing to this, just proposing it, though I did run it by my employer, who is very supportive. Here's the list of features I propose to implement:

*   Writing a test suite
*   Bi-directional syncing
*   Syncing many tables
*   Syncing tables without a primary key
*   Providing useful exit codes and more informational output
*   Syncing in chunks
*   Checking privileges before syncing
*   Syncing based on pre-computed checksums
*   Automatically choosing sensible parameters based on table structure
*   Making default locking and other behaviors smarter

Alternatively, if someone wants to do it and just contribute the code to the project, I'd be delighted. I doubt that will happen, though, and there'd still be a lot of work in it for me, so I think it's probably more realistic that I will do it.

 [1]: http://code.google.com/p/maatkit/
