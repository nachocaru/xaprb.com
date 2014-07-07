---
title: "Mac's Time Machine and Symlinks"
date: "2014-07-07"
url: /blog/2014/07/07/mac-time-machine-links/
categories:
  - Programming
---

I use Mac OSX's built-in Time Machine for backups, and a couple of times I've
noticed my backups failed and couldn't be completed successfully. I was unable
to fix the problem until I reformatted the backup drive. Today I think I
stumbled on the solution.

![Time Machine](/media/2014/07/time-machine.jpg)

The problem seems to come from swapping a directory and a symlink to it. I had a
set of directories with symlinks back and forth, and sometimes I moved the
directory to where the symlink was and made a symlink to it from where it used
to be. That seems to confuse Time Machine mightily.

Just removing both the symlink and the directory seems to "fix" it. Well...
maybe it's not a fix, but it's better than the nuclear option of reformatting
the backup drive.

Hope this helps someone.

[Photo Credit](https://www.flickr.com/photos/24071429@N08/2309369605/)
