---
title: MySQL Query Profiler, Checksum, Index Checker updated to version 1.0.1
date: "2007-03-02"
permalink: /2007/03/02/mysql-query-profiler-checksum-index-checker-updated-to-version-101/
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

I got a lot of very nice feedback on the three tools I recently added to the MySQL Toolkit project on Sourceforge, and found and solved several issues with quoting and password prompting, index types, and so forth. Thank you all for your feedback, and welcome to Ruslan Zakirov, who plans to add some new tools!

Updated packages are now on Sourceforge. All three packages needed minor tweaks, so I bumped the version numbers to 1.0.1 for all of them.

The duplicate index checker needed the most changes. It wasn't detecting index type correctly, and wasn't comparing correctly even if it had been. And I added a new option to print all the output together when it's finished, instead of printing output a database at a time. This makes it possible to align everything in columns, so a human can read the output more easily. It's helpful when you're expecting only a few lines of output, but not recommended if you expect a lot.

There's a lot more coming, including occasional packages that'll bundle everything together so you don't have to download and install the tools separately. But first, I need to spend a little time with [innotop][1]. These are exciting times for me!

 [1]: http://code.google.com/p/innotop
