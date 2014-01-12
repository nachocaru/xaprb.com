---
title: "Easy on the eyes: the solarized color theme"
date: "2011-07-28"
permalink: /2011/07/28/easy-on-the-eyes-the-solarized-color-theme/
categories:
  - Desktop
  - Open Source
  - Operations
---
I recently set up the [solarized][1] color theme for my terminal emulator. I've been meaning to do this for a while, but procrastinated. However, I finally got really frustrated with the colors I get from "ls" sometimes -- I use a dark terminal with light fonts, and the directory listings in particular can become invisible, with dark blue on black.

Solarized is much improved. All of the colors work well together and are easy on the eyes. What a relief! Recommended for programmers and system administrators. There are plugins or configuration files for a huge variety of programming environments and programs, including Vim of course.

I use XFCE's terminal, and I found that there was no terminal configuration file for it in the download. But I found a workaround: just append the colors listed in [this file][2] to the end of $HOME/.config/Terminal/terminalrc.

 [1]: http://ethanschoonover.com/solarized
 [2]: https://github.com/sgerrand/solarized/blob/7541ef797ee9a2ef7d95d349f8ae600a5d1b2aef/xfce4-terminal-colors-solarized/terminalrc
