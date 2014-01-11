---
title: How to export your Previous Recipients addresses from Mac Mail
author: Baron Schwartz
layout: post
permalink: /2012/08/15/how-to-export-your-previous-recipients-addresses-from-mac-mail/
categories:
  - SQL
---
Mail&#8217;s Mail.app keeps a list of recent recipients, but it doesn&#8217;t let you export them to a file. You could do as some others on the Internet have suggested and grep the file of addresses for everything that looks like an email address, or you could work with your system instead of against it!

The trick is twofold: knowing where the addresses are stored, and knowing how. They&#8217;re stored in a file in your user directory, *Library/Application Support/AddressBook/MailRecents-v4.abcdmr*.

The &#8220;how&#8221; is the fun part. It&#8217;s an SQLite database file. Now all you have to do is open the file with SQLite and select the data from it! The full power of SQL is at your disposal. Here&#8217;s a sample:

    $ sqlite3 ~/Library/Application\ Support/AddressBook/MailRecents-v4.abcdmr

Here is an SQL command you can enter to select all of the emails, with first and last names:

    select '"' || ZFIRSTNAME || ' ' || ZLASTNAME || '" ^lt;' || ZEMAILNORMALIZED || '>' from ZABCDMAILRECENT;