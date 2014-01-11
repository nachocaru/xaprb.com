---
title: 'MySQL Table Sync bounty: let&#8217;s do it!'
author: Baron Schwartz
excerpt: |
  <p>A little while ago I offered to take time off work and improve <a href="http://mysqltoolkit.sourceforge.net/">MySQL Table Sync</a>.  I've gotten a very positive response to that, with several organizations offering to contribute to the bounty, so I'll go ahead and commit to doing this.  Read on for the details.</p>
layout: post
permalink: /2007/10/31/mysql-table-sync-bounty-lets-do-it/
description:
  - "I'm accepting sponsorship for MySQL Table Sync features."
tags:
  - bounty
  - MySQL
  - sponsorship
  - SQL
  - table syncing
---
A little while ago I offered to take time off work and improve [MySQL Table Sync][1]. I&#8217;ve gotten a very positive response to that, with several organizations offering to contribute to the bounty, so I&#8217;ll go ahead and commit to doing this.

### The conditions

*   The bounty is $2500 USD.
*   I&#8217;ll work on the following features and improvements. I have the grand plan in my head, so this list just kind of describes the plan; I&#8217;ll probably end up improving other things at the same time. 
    *   Modularizing and writing a test suite (this is mandatory; the script is collapsing under its own weight without them) (the good news is a lot of this is done already; I&#8217;ve been modularizing a lot of the code for other tools in the toolkit)
    *   Bugs, bugs, bugs! The test suite should help a lot here.
    *   Bi-directional syncing
    *   Syncing many tables
    *   Syncing tables without a primary key
    *   Providing useful exit codes and more informational output
    *   Syncing in chunks to block updates less
    *   Checking privileges before syncing
    *   Syncing based on pre-computed checksums
    *   Automatically choosing sensible parameters based on table structure
    *   Making default locking and other behaviors smarter
    *   Full UTF8 support for 3-byte characters
*   I decide when the features are done. Actually, the test suite decides, but I decide on what&#8217;s reasonable and feasible; some of these features could get way out of hand if I don&#8217;t get to decide. Please feel free to submit your requirements for consideration &#8212; for example, how do you propose to use two-way sync? I know how I&#8217;d do it, but tell me your needs too. I&#8217;ll also look at feature requests in terms of total money contributed, and work on the ones people donated most for.
*   The code will be released through the normal Sourceforge channels. Nothing will change as regards licensing, copyright, etc.
*   No guarantees about bugs, how much I&#8217;ll be able to complete, or any other warranties. This is a bounty to **sponsor me working on the code**, not a contract to deliver certain results.
*   I&#8217;ll work on this between December and March. I can&#8217;t do anything before December because of the book. I think I can do it in December, but I&#8217;m not sure. The book&#8217;s final deadline is February 1, so I shouldn&#8217;t commit to anything before then. In other words, I&#8217;ll probably do this before the year is over, but I want a margin of safety.

### How to donate

I was thinking about using a third party to handle the money, but I decided it&#8217;s not that much money, and the people I spoke to had no qualms about sending me money directly. Here&#8217;s how I&#8217;m thinking of handling it:

*   I&#8217;m just passing the hat, I&#8217;m not an official charitable organization or anything :-)
*   Leave a comment with your email, or send an email to me [thisdomain] @ [thisdomain].com.
*   We can work out how to transfer the money, in whatever way is kosher for you. I have a PayPal account, or I can give you my address and you can mail me a check, or we can figure out something else if that doesn&#8217;t work.
*   I&#8217;ll keep this post updated with the total amount pledged.
*   Let me know if you wish to be acknowledged. I&#8217;ll add a &#8220;donors&#8221; section to this post with your name and a link, if you want. Otherwise I&#8217;ll just list &#8220;anonymous.&#8221;
*   Let me know if there&#8217;s a particular feature you want.

### Donors

The total pledged so far is $0 of $2500 USD.

<table class="borders compact collapsed">
  <tr>
    <th>
      Donor
    </th>
    
    <th>
      Amount
    </th>
  </tr>
  
  <tr>
    <td>
      Your name here
    </td>
    
    <td class="currency">
      ???
    </td>
  </tr>
</table>

 [1]: http://code.google.com/p/maatkit/