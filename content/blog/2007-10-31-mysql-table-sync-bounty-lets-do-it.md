---
title: "MySQL Table Sync bounty: let's do it!"
date: "2007-10-31"
permalink: /2007/10/31/mysql-table-sync-bounty-lets-do-it/
categories:
  - Databases
---
A little while ago I offered to take time off work and improve [MySQL Table Sync][1]. I've gotten a very positive response to that, with several organizations offering to contribute to the bounty, so I'll go ahead and commit to doing this.

### The conditions

*   The bounty is $2500 USD.
*   I'll work on the following features and improvements. I have the grand plan in my head, so this list just kind of describes the plan; I'll probably end up improving other things at the same time. 
    *   Modularizing and writing a test suite (this is mandatory; the script is collapsing under its own weight without them) (the good news is a lot of this is done already; I've been modularizing a lot of the code for other tools in the toolkit)
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
*   I decide when the features are done. Actually, the test suite decides, but I decide on what's reasonable and feasible; some of these features could get way out of hand if I don't get to decide. Please feel free to submit your requirements for consideration &#8212; for example, how do you propose to use two-way sync? I know how I'd do it, but tell me your needs too. I'll also look at feature requests in terms of total money contributed, and work on the ones people donated most for.
*   The code will be released through the normal Sourceforge channels. Nothing will change as regards licensing, copyright, etc.
*   No guarantees about bugs, how much I'll be able to complete, or any other warranties. This is a bounty to **sponsor me working on the code**, not a contract to deliver certain results.
*   I'll work on this between December and March. I can't do anything before December because of the book. I think I can do it in December, but I'm not sure. The book's final deadline is February 1, so I shouldn't commit to anything before then. In other words, I'll probably do this before the year is over, but I want a margin of safety.

### How to donate

I was thinking about using a third party to handle the money, but I decided it's not that much money, and the people I spoke to had no qualms about sending me money directly. Here's how I'm thinking of handling it:

*   I'm just passing the hat, I'm not an official charitable organization or anything :-)
*   Leave a comment with your email, or send an email to me [thisdomain] @ [thisdomain].com.
*   We can work out how to transfer the money, in whatever way is kosher for you. I have a PayPal account, or I can give you my address and you can mail me a check, or we can figure out something else if that doesn't work.
*   I'll keep this post updated with the total amount pledged.
*   Let me know if you wish to be acknowledged. I'll add a "donors" section to this post with your name and a link, if you want. Otherwise I'll just list "anonymous."
*   Let me know if there's a particular feature you want.

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
