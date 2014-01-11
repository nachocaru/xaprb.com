---
title: Lessons learned from the Sublime Text editor
author: Baron Schwartz
layout: post
permalink: /2012/11/20/lessons-learned-from-the-sublime-text-editor/
categories:
  - Coding
  - Desktop
  - Tools
---
Terminal-based, keystroke-driven editors are enormously powerful, and I still haven&#8217;t seen anything more powerful than Vim. I&#8217;m a longtime Vim user, and although I&#8217;m not the world&#8217;s foremost jaw-dropping expert on Vim, I would call myself an advanced power user at the very least, and probably a true expert. Still, I have maintained a relationship with GUI text editors over the years, too. An editor that has an insertion point for a cursor, and &#8220;native&#8221; mouse interaction, has an appeal I&#8217;ve never quite shaken. I&#8217;ve used (and been highly productive with) Kate, GEdit, Notepad++, Visual Studio, and many others. I have *purchased licenses* for Textpad, Textmate, and most recently [Sublime Text 2][1].

Sublime Text is a very nice editor. I&#8217;ve chosen it for my recent Go programming because of the [GoSublime][2] integration, which uses [gocode][3] (which also works for Vim, by the way) to provide IDE-like autocomplete and other helpful functionality, like incremental syntax checking and running gofmt on save. Sublime Text also has a limited Vim emulation mode, which lets me drop into Vim command mode for some mouseless productivity.

Keep in mind that I think Sublime is great, and well worth the license fee. That said, I find its advocates a bit wide-eyed and breathless in their enthusiasm. I keep thinking, *Have they never used a decent editor before?* Take the &#8220;multiple selection&#8221; feature. You can select something, such as a variable name, then press Control-D repeatedly and select other occurrences of the same text. Then you can type, and all of the occurrences change simultaneously. *Revolutionary! Any praise about multiple selections is an understatement!*

Really? You&#8217;ve been able to do that with just as few, or even fewer, keystrokes in Vi or Vim forever:

    :%s/oldtext/newtext/gc

All you have to do is press a key for every occurrence. If you want to change them all without confirmation, leave off the trailing &#8216;c&#8217; command to the regular expression. This is *basic*, not a power-user feature. It&#8217;s Unix regex 101 for any number of tools &#8212; nothing new to learn here.

Similarly, a number of other purportedly &#8220;new&#8221; features in Sublime Text 2 are decades old, well-worn and loved in many other text editors. I&#8217;ll admit that most of the mouse-based, cursor-insertion-point, GUI text editors don&#8217;t offer these types of features in any usable or convenient way; they just seem to lend themselves much better to terminal-based editors like Vim and Emacs. (Example: passing selected text through a shell command and reinserting it into the file.)

In fact, many of these older text editors offer *way* more functionality than Sublime Text. It doesn&#8217;t even come close. The find-and-replace in Vim, for example, is way better than the dialog-based functionality in Sublime Text, or nearly any GUI editor for that matter. Not to mention the documentation; Vim&#8217;s documentation and help system is breathtaking, but Sublime Text&#8217;s is&#8230; uninspired at best. You can compare terminal-based text editors to Sublime Text on a bunch of dimensions and it comes up way, way short. Again, this is just some rambling thoughts &#8212; I repeat, I bought the license. And I&#8217;m sure Sublime Text is going to continue improving rapidly, as it has been the whole time I&#8217;ve been aware of it.

And now we come to my point: it appears to me, from the enthusiastic response to Sublime Text, that *a large proportion of the developer population either uses a weak-sauce text editor or is utterly untrained on using a powerful one.* How else can we explain the enthusiasm? I honestly can&#8217;t think of anything. And this is a really saddening thought, because it means that thousands of programmers have completely neglected one of the most important things they could do: become truly proficient, if not expert, with their text editor. The text editor is to the programmer as the wrench is to the mechanic, as the compass is to the navigator, as the shoe is to the runner. It is arguably the single most important tool you&#8217;ll use as a programmer.

There&#8217;s just no excuse. If you aren&#8217;t using a powerful text editor (and I would count Sublime Text as one), *get one.* And if you aren&#8217;t at least an advanced user of that editor, *get a move on it.* I&#8217;m not the first to say this, but I can&#8217;t remember or locate the quotation about this topic that I&#8217;m trying to recall. Maybe someone can help out in the comments.

What&#8217;s your favorite text editor? What&#8217;s your favorite resource for becoming an amazing wizard with it, so that you regularly do the kinds of tricks that make your friends say &#8220;hey, what editor is that?&#8221;

 [1]: http://www.sublimetext.com/
 [2]: https://github.com/DisposaBoy/GoSublime
 [3]: https://github.com/nsf/gocode