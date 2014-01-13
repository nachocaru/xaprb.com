---
title: JavaScript combo box
date: "2005-09-29"
permalink: /2005/09/29/javascript-combo-box/
---
<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

Like the [JavaScript date chooser][1], I created this after searching the Internet for something to accomplish what I needed. Most of what I found was very complex; it dynamically overlaid select menus with text intputs and so forth. And most of it wasn't free, which is absurd. The rest was not suitable for what I needed. So I wrote my own.

To use the combo box, all you have to do is type into the SELECT menu below. Your keystrokes will create a new option at the end of the list. When you are done typing, press `enter` to exit "edit mode;" you can use `backspace` and `enter`, but otherwise all non-printable keystrokes are ignored.

I'm aware of some bugs:

*   Opera will report the up and down arrow as parentheses and ampersands.
*   Some Mozilla browsers won't immediately select the new option you are creating, if the text you enter begins with the same letter as an existing option; the second keystroke will select the new option.

Any fixes for these or other problems are gratefully received.

 [1]: /blog/2005/09/29/javascript-date-chooser/
