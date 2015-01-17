---
title: "Switching from Sublime Text back to Vim"
date: "2014-04-15"
url: /blog/2014/04/15/sublime-text-vim-go/"
categories:
  - Programming
---

I've used Vim for as long as I can remember, but when I started to work with Go
at VividCortex, for some reason I started to use Sublime Text instead. It does
make a very nice GUI-based editor, but I never felt that it was as powerful as
Vim.

Ever notice how the Vim logo looks a little like Superman's logo? No? Squint a
little harder, then.

![Superman][3]

I think the thing that made me start using Sublime Text was the nice IDE-like code completion and
other features, which are easy to install with a package called GoSublime. I was
aware that these are also available in Vim, but when I tried, the configuration
seemed to be a little bit complicated, and I didn't get quite the experience I
wanted. For example, when I set up Vim to run `gofmt` on save, it moved my
cursor back to the top of the file and reset my undo history. Chasing down the
last little bits of this customization would have taken me some time and I was
lazy.

Recently I discovered [vim-go][1], which lets me remain lazy and ignorant of how
my preferred editor really works, while getting an IDE experience in Vim that
rivals any I've had outside of a real IDE (I'm thinking of Visual Studio here,
for example).

Setup was really trivial. I found the instructions quite good. This [blog
post][2] is a good overview.

Now I seem to have the best of both worlds, and I'm back to a true text-based
terminal editor again.

[1]: https://github.com/fatih/vim-go
[2]: http://blog.gopheracademy.com/vimgo-development-environment
[3]: /media/2014/04/superman.jpg
