---
title: Vim, the ultimate command-line password manager
date: "2011-06-11"
permalink: /2011/06/11/vim-the-ultimate-command-line-password-manager/
categories:
  - Desktop
tags:
  - Vim
---
Thanks to [a comment on a recent blog post][1] where I lamented the lack of an easy-to-use password manager, I've switched from Revelation to&#8230; Vim.

I already use Vim for my note-keeping system. I simply add a modeline to the top of the file,

<pre># vim: set ic hlsearch:</pre>

This makes searches case-insensitive, so I can just open the file and start typing a search, and it highlights it and moves to the first match as I type. It's a great way to find something in a file. I have used this simple technique for many years to build a topical index over thousands of interesting email threads, code snippets, posts from bloggers, and customer issues. To use a buzzword, it scales as large as I need it to, and I can quickly find just about anything on any topic I've cared about in the past.

The remaining question is how to encrypt the file full of passwords. That's what Sergio showed me in his comment. There's a [GPG plugin for Vim][2] that detects that I'm opening a GPG-encrypted file and decrypts the buffer for me. This makes it incredibly easy to open, search, edit, and save the file. Much easier than Revelation. I found that the plugin didn't properly encrypt the file (or I'm doing something wrong), so I first created the file as plain-text and manually encrypted it with GPG, and subsequently the plugin seems to work great.

I still might follow up on Sergio's suggestions for building something on top of this. I'd really like integration with the desktop: press a key, start typing and seeing matches auto-complete, press TAB when I have the one I want, and copy the password. Maybe I will actually do this. Or maybe a hot-key to simply open Vim with the password file in a terminal is all I need.

 [1]: http://www.xaprb.com/blog/2011/06/07/impressions-of-fedora-15-with-gnome-3/
 [2]: http://www.vim.org/scripts/script.php?script_id=661
