---
title: How I keep track of notes
permalink: /2010/07/03/how-i-keep-track-of-notes/
categories:
  - Commentary
  - Sys Admin
  - Tools
tags:
  - 37Signals
  - GTD
---
This is the follow-up to my post on [how I keep track of tasks][1]. It's important for me to have a good system for keeping notes and other files organized. The problem usually turns out to be that I want them organized several different ways simultaneously: by date, by project, by person, by subject. Alas, if I keep them in files on a hard drive, I can only choose one such organizing strategy, because filesystems are a single hierarchy.

I choose to organize by date, simply because most of the time I need access to notes and files about things I'm working on now or recently. If I need to find files by project or subject, there's a search feature in my file browser, and it works really well! So date-organization is good enough for me.

Inside my home directory, I have a directory per year, and inside that, a directory per month. If I write a note today, it goes into the $HOME/etc/2010/07/03/ directory. The filename starts with today's date. That's the simple organizing principle behind my note system. It also lets me eventually move things off my computer into permanent storage, so I don't have to keep backing things up forever and carrying around infinite amounts of data. I keep the last couple of years; if I need access to notes or projects from 2006, I can go pull a hard drive off the shelf and pop it into my [hard drive dock][2] (buy one of those, and you'll never get ripped off again by external drives with their own enclosures and power supplies).

I still need a quick way to create files and place them there, or move them there after I create them. For creating files, I use Vim. There is nothing better than a plain-text editor for me. My Vim settings are such that if I begin a line with a hyphen, Vim keeps nice indentation for me, making it easy to take notes in bulleted lists with proper indentation. If you're on a call with me and you hear typing, I'm probably taking notes into Vim.

But it's a pain to type out the full path to the file including the year, month, and date. So I created some helper scripts and put them into my $PATH. The most important are 't' and 'c'. 't' simply uses Vim to edit a file. (It also creates any required directories, based on today's date.) So if I am on a call with Joe, I just type 't joe' into a terminal, and I'm editing /home/baron/etc/2010/07/03-joe.txt.

The 'c' tool cats the file's contents. If I type 'c joe', it executes 'cat /home/baron/etc/2010/07/03-joe.txt'. This makes it easy to grep, copy and paste, and so on.

There are a few more tools: the 'm' tool moves any file into the date-based hierarchy, so if I save a PDF of an order-confirmation page, for example, I can then 'm' it and it goes into its proper place. And I have a few tools to list files I created today, yesterday, this week, and this month.

I have a very important convention: when I'm taking notes and something becomes my responsibility to follow up on, I type TODO in the notes. After the call ends, I can grep for TODO in the file and quickly transfer the item into the task system I described in the post linked from above. This is how I can be confident that I'm not forgetting anything I'm supposed to do: I take notes and write it out as it happens, and then review the notes afterwards.

All told, this system kind of feels too simple to be a system. Everyone else seems to use complicated online gizmos named after groceries, or whizbang apps created by 37Signals, but I've found none of them to meet my needs, and just went back to basics. Basic is good. Basic works. Basic lets me concentrate on what I'm doing.

As I said in my previous post, part of this is based on the [GTD][3] book, which I read through a couple of times (with a year in between) and picked the parts that made sense to me. I think it's a useful book to read, if you're having trouble organizing yourself. I would just caution against spending all your energy getting organized &#8212; leave a little energy for actually doing your work!

 [1]: http://www.xaprb.com/blog/2010/06/30/how-i-keep-track-of-tasks/
 [2]: http://www.amazon.com/Vantec-NexStar-NST-D200SU-2-5-Inch-3-5-Inch/dp/B001QFNDXE/?tag=xaprb-20
 [3]: http://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0142000280?tag=xaprb-20
