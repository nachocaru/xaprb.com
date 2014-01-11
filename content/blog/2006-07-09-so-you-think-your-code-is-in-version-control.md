---
title: So you think your code is in version control?
  <p>"My code is all in version control," Joe said proudly.  "Everything is versioned.  I'll never lose any work."  But then he lost some "other" code he didn't realize was critical.  This article is about how to find and safeguard all the hidden code you don't know your business relies on.</p>
date: "2006-07-09"
permalink: /2006/07/09/so-you-think-your-code-is-in-version-control/
description:
  - >
    Lists over ten mission-critical types of code you may not think should be in
    version control, but definitely should.
---
"My code is all in version control," Joe said proudly. "Everything is versioned. I'll never lose any work." But then he lost some "other" code he didn't realize was critical. This article is about how to find and safeguard all the hidden code you don't know your business relies on.

### Introduction

Everyone knows version control is indespensable. I put everything into version control &#8212; even my [GnuCash][1] file is in version control. So is my poetry (you're in luck: this is a technical blog, so I won't post any of it). And definitely all my code, right?

Well, no. Like many people, some little snippets of code escape my notice. I don't think of it as something that has to be in version control. This is really dangerous. The most recent time I noticed some code eluding my version control fanaticism was in the comments on [my post on re-licensing my JavaScript snippets][2]. I realized that I'd developed these scripts at odd times, over SSH connections to servers I didn't own, e-mailing myself the latest versions to save it&#8230; but never putting it in version control. I felt dumb.

Feeling dumb is one thing, but suddenly discovering that you've overlooked some critical code *and you can't recover it from backups* in the middle of the night is another. Software engineers I've known, myself included, have a habit of thinking about certain work products as code, and others as less important and not deserving of version control. For example, maybe certain things go through a defined release process, and others don't, and you think of the release-able things as code that needs to be in version control.

You need to become conscious of those hidden distinctions, and put everything into version control, because it will bite you if you don't. This article isn't about the benefits of version control, or how to use it. It's about helping you realize the things you've forgotten, so you can stop overlooking them.

Here's a list of things I version. It's not necessarily an exhaustive list; the point is to get your creative juices flowing, and come up with your own list.

### User-related information

If you're not versioning users, passwords, public keys, groups, and privileges, you're not versioning the full state of your software system. Your system depends on the right users having the right privileges to do the things that have to happen. It can get very complex in a system of any size. If you install a system, then spend weeks tweaking it to have the right users and privileges, but then lose those, you may have lost weeks of work. Likewise, if you install on a test system and then have to deploy to production systems, you should not have to go through it all again if you've versioned it.

### Database schema

Something went wrong during the release. It's midnight, and a stored procedure is trying to insert into a table, but there's a database error: it's trying to insert too many columns. One of your developers made the mistake of doing a [blind insert][3]. And you don't know what the database used to look like, because you don't have your database schema under version control.

It's really easy to fix this. Just create a nightly scheduled task that scripts out the entire database schema and commits any changes. I did this at my new employer and it has proven very helpful even when there are no problems; it gives everyone visibility into what is changing, and it even helps us find what refers to a given database entity, because the schema is all in searchable text files.

### Initialization scripts

Imagine this: you built a great database schema for a system that integrates with an e-commerce or business-to-business system. It serves as the persistence layer for a set of services that talk remotely to web services on the other end. Your code is all in version control, and so is the schema. But you populated those tables with definitions of the partner's constants, and someone deleted them. Now you don't have the constants, and you don't have the script to populate the tables with the initial set of data.

Such initialization scripts should always go into version control. Anything that has to do with getting the system into a defined state so it'll function definitely needs to be versioned. You should be able to start with an empty database, run your schema script, run your initialization script, and be ready to roll. Even if there's no data loss, this is essential for smooth integration and deployment.

### Other database code

Stored procedures, user-defined functions, and triggers should also be in version control. In the Microsoft world, stored procedures can be put into Visual SourceSafe fairly easily, but triggers and functions can't, at least not when I quit working in the Microsoft world about six months ago. They can still be scripted to file, and put into version control that way, as opposed to integration with SourceSafe through an IDE, though.

In the non-Microsoft world, of course I script these things out to files and put them into version control.

### Scheduled tasks

Crontabs and other OS-specific scheduled tasks are also code. I don't know about Windows Scheduled Tasks, but crontabs are very easy to put into version control, along with a script to install them from version control, with the ability to detect if they've been changed outside version control and complain.

One great benefit to this is knowing what programs are used. You can search for any references to programs if your scheduled tasks are in version control.

### Configuration files

In UNIX systems, the entire `/etc` directory is a good candidate for version control. Sometimes operating systems even have built-in versioning methods, which is great. For example, on Gentoo GNU/Linux, using `dispatch-conf` with the option to integrate RCS is a good idea (as opposed to using `etc-update`, which doesn't keep deltas between past versions).

In the non-UNIX world, you can find all configuration files and add them to version control with a really minimal amount of extra work, considering how much work it could save you. In Windows, I think it's a great idea to script out either the entire registry, or selected parts of it.

### Your backups

That's right, all your data in your regular backups can be versioned! Look into `rdiff-backup` for a great example of a tool that does this. A side benefit of storing deltas is the much smaller disk space requirement. Storing *all* backups like this might be a bit extreme of course, but sometimes it's a viable option. One place I actually do this is on my home systems. I use rdiff-backup to back up my entire `/etc` and `/home` directories. Boy, has that saved my neck a few times!

### Other things

Here are some other things that might need to be in version control:

1.  one-off shell scripts and environmental settings (supposing they're in `/usr/local/bin`, you can put them somewhere else that's under version control, and make symbolic links to them)
2.  your documentation and specifications (including your wiki)
3.  your template and scratchpad files
4.  lists of software and versions installed from other sources, such as CPAN

### Summary

You may think I'm a fanatic to insist on versioning everything, and you'd be right &#8212; but my fanaticism has saved me, and sometimes my employers, a lot of trouble. I think everything ought to be under version control, but it's so easy to overlook something. I hope this article has helped you make a list of critical code you're not putting into source control.

 [1]: http://www.gnucash.org/
 [2]: /blog/2006/06/19/xaprb-scripts-relicensed/
 [3]: /blog/2006/07/07/what-is-a-sql-blind-insert/

 *[IDE]: Integrated Development Environment
 *[RCS]: Revision Control System
 *[CPAN]: Comprehensive Perl Archive Network
