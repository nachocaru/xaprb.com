---
title: How to export your Previous Recipients addresses from Mac Mail
date: "2012-08-15"
permalink: /2012/08/15/how-to-export-your-previous-recipients-addresses-from-mac-mail/
categories:
  - SQL
---
Mail's Mail.app keeps a list of recent recipients, but it doesn't let you export them to a file. You could do as some others on the Internet have suggested and grep the file of addresses for everything that looks like an email address, or you could work with your system instead of against it!

The trick is twofold: knowing where the addresses are stored, and knowing how. They're stored in a file in your user directory, *Library/Application Support/AddressBook/MailRecents-v4.abcdmr*.

The "how" is the fun part. It's an SQLite database file. Now all you have to do is open the file with SQLite and select the data from it! The full power of SQL is at your disposal. Here's a sample:

    $ sqlite3 ~/Library/Application\ Support/AddressBook/MailRecents-v4.abcdmr

Here is an SQL command you can enter to select all of the emails, with first and last names:

    select '"' || ZFIRSTNAME || ' ' || ZLASTNAME || '" ^lt;' || ZEMAILNORMALIZED || '>' from ZABCDMAILRECENT;
