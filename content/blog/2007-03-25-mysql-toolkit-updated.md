---
title: MySQL Toolkit updated
date: "2007-03-25"
permalink: /2007/03/25/mysql-toolkit-updated/
---
<p class="download">
  <a href="http://code.google.com/p/maatkit">Download MySQL Toolkit</a>
</p>

I've just released updates to all the tools in the MySQL Toolkit. The biggest change I made to most packages is using DBD to read MySQL's option files, though some packages got more significant updates.

### Overview

I discovered some features I didn't know the Perl MySQL driver had &#8212; features to read MySQL's option files, mostly, though there are some other nice features I use occasionally (but which are very relevant to [innotop][1]). Getting the driver to read the option files instead of doing it myself has many benefits. It does a better job than I do, provides more options, works like MySQL users will expect it to, and perhaps most importantly isn't my problem if it's broken \*grin\* I love not maintaining code.

I also changed how I was handling command-line options. I'm new to this, but I think I've got a good system going now. I did change some options on a couple of the tools, so check your scripts if you upgrade. (I'd rather do it right than remain backwards compatible with a bad system).

The most important changes I made are to the MySQL Show Grants tool and the MySQL Table Sync tool. I fixed some fairly major bugs in each tool.

One feature I had inconsistently implemented is prompting for passwords. I removed it completely rather than do it in patches. I'm not convinced prompting is a good way to do it. Log on to the #mysql IRC channel and wait a bit, and you'll see someone who doesn't understand how MySQL's own tools handle passwords at the command line.

### Details

Here are detailed changes on each of the packages.

#### mysql-deadlock-logger version 1.0.0 

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files.

#### mysql-duplicate-key-checker 1.0.2

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files. 
*   Error handling if there aren't permissions to run SHOW CREATE TABLE on a view.
*   Documentation copy/paste error.

#### mysql-query-profiler 1.0.2

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files.
*   Documentation.

#### mysql-show-grants 1.0.0

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files.
*   Fix the &#8211;revoke and &#8211;separate options so revokes are not separate unless specified. Add REVOKE GRANT OPTION when the user has it.

#### mysql-table-checksum 1.0.3

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files.
*   Make the exit code behave as expected.
*   Handle errors from tables that have gone away or can't be read.
*   Change command-line option names.

#### mysql-table-sync 0.9.0

I continue to be very conservative about this tool. It's complicated and I haven't a) written a test suite yet b) tested it in production enough. Plus I don't use half its features in production. That may be an argument for removing them, but they are ideally suited for some scenarios, and I don't want to be too focused on only filling my own needs!

*   Rewrite the GetOpt::Long code and rely on DBD to read MySQL option files.
*   Change some parsing of DSNs.
*   Handle UPDATE statements correctly in handle\_data\_change.
*   Handle some special cases in locking for consistency.

### The future

I have either started or found the need for half a dozen more tools, and there are some improvements I still want to make to the existing ones too, but it will need to wait a bit. I have to work on some things for my wife, and then innotop is next because I'm going to demo some currently nonexistent features at the upcoming [MySQL Conference][2]. There's nothing like a deadline to motivate me!

### About MySQL Toolkit

[MySQL Toolkit][3] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`.

 [1]: http://code.google.com/p/innotop
 [2]: http://www.mysqlconf.com
 [3]: http://code.google.com/p/maatkit
