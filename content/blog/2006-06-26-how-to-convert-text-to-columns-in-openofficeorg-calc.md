---
title: How to convert text to columns in OpenOffice.org Calc
date: "2006-06-26"
url: /blog/2006/06/26/how-to-convert-text-to-columns-in-openofficeorg-calc/
categories:
  - Desktop
---
Unlike Microsoft Excel, OpenOffice.org 2.0 Calc doesn't have a built-in "text to columns" feature, which is hard to live without once you're used to it. OpenOffice.org has an extensible add-on architecture, and someone has written a "text to columns" add-on, but installation may be confusing. In this article I'll explain how to install the add-on.

I hope this feature will be added into the office suite at some point. Oddly, it seems to already be implemented, but not in the way it's needed. [Writer has a text-to-columns feature][1] already, and Calc's Open process has what looks to me like the needed functionality too -- when opening a delimited text file, it brings up a dialog that does exactly what I'd do with the text-to-columns feature in Excel.

### Update

Here is something I've noticed under GNU/Linux since writing this article: if I've copied text to the primary selection, for example by highlighting it in a terminal window, I can get OO.org to "text to columns" the text just by middle-click-pasting it into the spreadsheet. Instead of actually pasting it, this opens up the "Text Import (Pasted Data)" dialog, which lets me choose delimiters, etc -- exactly what I need. (Of course, it'd be nice if it were even smarter and auto-detected that for me). So far I have not found any other way to cause this dialog to appear, which is puzzling.

### Getting the add-on

The add-on is available through SourceForge and the [OOoMacros][2] site, which is both a source of add-ons and help and examples for those wishing to make their own add-ons. You can [download text to columns for Calc here][3]. There are actually two add-ons, but apparently the "Text2Columns fixed width" one is redundant, since the "Text to Columns" one does that too.

### How to install an add-on in OpenOffice.org

This is the part I found confusing. The difference between macros and add-ons in OpenOffice.org isn't very clear to me, and the tools to manage them aren't either. I went down the wrong path with macros until I realized this isn't a macro, it's an add-on. Then I tried to learn how to install an add-on. I found lots of references to something called `unopkg`, but nothing about where it's installed. It wasn't in my `PATH`. I searched my filesystem and found it in `/usr/lib/openoffice/program/unopkg`. Then I ran it:

<pre>xaprb $ /usr/lib/openoffice/program/unopkg gui</pre>

<p class="center">
  <img src="/articles/open-office-org-package-manager.png" width="487" height="351" alt="OpenOffice.org Package Manager" />
</p>

Lo and behold, it brought up the same dialog I can access through the Tools > Package Manager menu entry. All that searching for nothing. I recommend not running it from the command-line; just run it through Tools > Package Manager!

### Installing and using the package

Once I found it, installing the package was as easy as selecting the My Packages entry and pressing Add.. to browse for the file. It installs itself and shows up under the Tools > Add-Ons menu. This is really easy to do, but it took me a while to abandon my misdirected efforts to install it as a macro.

Here's a screenshot of what it looks like (click the screenshot for a full-size look).

<p class="center">
  <a href="/articles/open-office-org-text-to-columns.png"><img src="/articles/open-office-org-text-to-columns-preview.png" width="320" height="239" alt="OpenOffice.org text to columns" /></a>
</p>

So far it has worked fine for myself and my coworker. I hope it's useful to you too.

**Update** For those of you using GNU/Linux, [Gnumeric][4] has a built-in text-to-columns converter that's very nice. Gnumeric also loads much faster and runs with much less memory than OpenOffice.org.

 [1]: http://openoffice.blogs.com/openoffice/2006/06/converting_text.html
 [2]: http://www.ooomacros.org/
 [3]: http://sourceforge.net/project/showfiles.php?group_id=87718&#038;package_id=104183
 [4]: http://www.gnome.org/projects/gnumeric/
