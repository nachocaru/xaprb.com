---
title: How to make file names cross-platform
author: Baron Schwartz
excerpt: '<p>Using a filesystem, such as an external hard drive, across mutiple platforms can sometimes cause annoying behaviors.  This article shows how to avoid problems when files are used on multiple platforms.</p>'
layout: post
permalink: /2005/11/17/maximizing-filesystem-portability/
---
Using a filesystem, such as an external hard drive, across mutiple platforms can sometimes cause annoying behaviors. For example, filenames may be changed to all uppercase or all lowercase, which may cause problems on a system with case-sensitive filenames or vice versa. Here are my suggestions for minimizing conflicts.

### Use only letters and numbers, underscores, and dashes

<img class="alignright" src="/articles/images/special-chars.png" height="134" width="331" alt="MS Windows prevents special characters in filename" />Avoid using characters that any system treats as special characters, not just your own. PCs running Microsoft Windows will generally not allow you to type a special character into a filename, but Mac OS X will. UNIX and Linux will too, if you escape the characters in the argument (though Linux/UNIX won't allow `/` even if you escape it). Windows can be forced to accept `:` as part of a filename, but the resulting file's name apparently truncates at the `:`.

I have a friend who uses Mac OS X and needs to share files via an external drive with a PC running Windows at her job. She used the `/` character in some filenames, which prevented her from copying files to the drive. I recommend avoiding the characters `\ / : * ? " < > |` no matter what OS or filesystem you are using. These characters are not portable.

For maximum safety, use only letters and numbers, dashes, and underscores.

### Use mixed-case names

The next trouble I experienced was with another external hard drive formatted as FAT32. The same friend gave me a website to rewrite. I copied the files from her hard drive to the Windows XP laptop my employer provided, rewrote the site, and then copied it back. Unfortunately, in the process every all-lowercase file and directory name got converted to all-uppercase. I believe this happened when she used her Mac to read the files back off the drive. I've experienced similar problems with a Linux driver for VFAT filesystems, such as USB flash drives, except in this case every all-uppercase filename got translated to all-lowercase! I believe this is some filesystem driver "being smart," though I haven't investigated further. I think the filesystem driver is deciding "well, it's all uppercase, so obviously it's some DOS thing, and lowercase filenames are more readable&#8230;" Yuck. This wasn't just a case of ugliness, either. The destination for the website was a Linux server, where filenames are case-sensitive, so dozens of links broke.

In each case, when the file or directory name was mixed-case it survived without mangling. This led me to my next filesystem portability decision: from now on, I'm going to use `InternalCapitalLetters` to name files. I typically like lowercase with dashes because it's easier to type, but I'll do a little extra work to save myself these types of troubles in the future.

### Always treat filenames as case-insensitive

Another lesson I've learned is to treat every filesystem as though it is case-insensitive. I personally abhor case-insensitive **anything**, such as the way SQL or VB are case-insensitive. Filesystems, such as Microsoft Windows filesystems, are no exception. The reality is I have to work with them, though. What this really means in practice is avoiding filenames in a single directory that differ only by letter case, such as `File.txt` and `file.txt`. This is not a big deal to do, but if I don't do it, it becomes a big deal the moment I try to view a directory with such files on a case-insensitive filesystem.

I can't recall where I saw this, but I also believe I once saw a filesystem where a file and a directory could be named the same thing without a conflict. I don't know about other filesystems, but in UNIX a directory is just a file like any other, so I'm not sure where I'd have seen this behavior. If I'm not dreaming it up, though, it's something else to watch out for.

### The bottom line

The bottom line is, from now on I'm going to:

*   avoid special characters, and go for the least common denominator
*   use mixed-case letters to ensure a "smart" filesystem driver doesn't mangle my filenames
*   make sure I don't use identical-except-for-lettercase for filenames in a directory
*   ask others to do these things too, if I have to work with them
