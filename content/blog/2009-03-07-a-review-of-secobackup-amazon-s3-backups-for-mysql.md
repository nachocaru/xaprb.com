---
title: A review of SecoBackup Amazon S3 backups for MySQL
date: "2009-03-07"
permalink: /2009/03/07/a-review-of-secobackup-amazon-s3-backups-for-mysql/
categories:
  - Databases
  - Open Source
---
After I wrote about [things you need to know about MySQL backups][1], a customer contacted me and asked me what I know about [SecoBackup][2] for MySQL. I see it has a very low cost and Percona has Amazon accounts for testing purposes, so I quickly downloaded s3sql\_2.2.0.1-2.01\_i386.deb, installed it, configured it, and gave it a whirl.

Since I just want to see what it does to take a backup, I started up a sandbox running from /tmp/12345 and configured it to backup msandbox:msandbox@127.0.0.1 (I shut down my main mysqld on my laptop to make sure it can't connect to the default instance).

Then I configured a backup set and tried to take a backup. Right away I saw it isn't full featured enough. It doesn't let you specify a port to connect to. This is fixable. They just have to add better support for all the command-line parameters like port, SSL, socket, etc. It is not enough to specify host, username and password. But it gives me a funny feeling about their level of experience with production MySQL servers.

And so I expected to see it using mysqldump. I tried a backup, and indeed I saw it's using mysqldump. It could not connect to port 12345, which is where I set up my sandbox. I see no way to make it do that. I tried changing the port to the default 3306 and tried again, but it still doesn't manage to connect to it to take a backup.

In any case, mysqldump might be a fine way to take a backup, for some people, but I need to see what command-line parameters it's using before I can determine. So I hacked around for a while, got it to take a backup of my default instance, and eventually found out how to get the parameters it used to dump the data. Here are the parameters:

<pre>
--opt --extended-insert --single-transaction --default-character-set=utf8 --create-options
</pre>

I also turned on the log to my mysql instance and examined it afterwards to find out more about what this software really does to the database. I didn't see anything unusual.

So having done that, how does SecoBackup stack up against my list of ten things to know?

1.  Does the backup require shutting down MySQL? If not, what is the impact on the running server? Blocking, I/O load, cache pollution, etc? **Answer: It uses mysqldump, so you can use it online, but you'll get all the usual stuff: cache pollution, extra load on the server, and so on. For large databases, mysqldump is unusable, so it won't work for them.**
2.  What technique is used for the backup? Is it mysqldump or a custom product that does something similar? Is it a filesystem copy? **Answer: mysqldump.**
3.  Does the backup system understand that *you cannot back up InnoDB by simply copying its files*? **Answer: It doesn't do file copies.**
4.  Does the backup use FLUSH TABLES, LOCK TABLES, or FLUSH TABLES WITH READ LOCK? These all interrupt processing. **Answer: None of the above.**
5.  What other effects are there on MySQL? I've seen systems that do a RESET MASTER, which immediately breaks replication. Are there any FLUSH commands at all, like FLUSH LOGS? **Answer: None of the above.**
6.  How does the system guarantee that you can perform point-in-time recovery? **Answer: It does not. It doesn't capture the binary log positions.**
7.  How does the system guarantee consistency with the binary log, InnoDB logs, and replication? **Answer: It does not. It doesn't capture the binary log positions.**
8.  Can you use the system to set up new MySQL replication slaves? How? **Answer: No. It does not capture the master log positions.**
9.  Does the system verify that the backup is restorable, e.g. does it run InnoDB recovery before declaring success? **Answer: It does not verify backups.**
10. Does anyone stand behind it with support, and guarantee working, recoverable backups? How strong is the legal guarantee of this and how much insurance do they have? **Answer: I'll skip this question.**

And then there's the other question someone asked in the comments on the original article: how long does it take to restore the backup? The answer is, for big databases it's going to take A Very Long Time. This is another reason why mysqldump is unusable for backing up large databases.

Overall I'm not all that impressed with the quality of the software; I crashed it a number of times trying to set things up and take backups, and it does sort of naive things like print output without a trailing linebreak so the terminal gets messed up. But whether it's a good choice really depends, I think, on your data. (Naturally.) It seems like it's pretty convenient, but even if they fixed the problems and added --master-data to the mysqldump options, it would absolutely not work for a lot of the systems I work on. Even if you could back up some of those servers with mysqldump, it would take way too long to restore.

But here is the most important thing: It is neither Open Source nor Free Software, and I had to download it and try it out to find out that it uses mysqldump rather than some other technique. Nowhere on their website does SecoBackup mention that they take backups via mysqldump. That's basic information that I would like to see right up front. Any backup system should disclose how it works.

 [1]: http://www.mysqlperformanceblog.com/2009/03/03/10-things-you-need-to-know-about-backup-solutions-for-mysql/
 [2]: http://www.secobackup.com/
