---
title: JavaScript regular expression toolkit
date: "2006-01-18"
permalink: /blog/2006/01/18/regular-expression-toolkit/
---
I have created a web page that matches regular expressions against arbitrary input text and displays the results graphically, so you can take some sample text and build regular expressions the easy way, with immediate feedback about what matches and where, where you have errors, and more.

<p style="text-align:center">
  <img src="/articles/images/rx-toolkit.png" alt="Regular Expression Toolkit Screenshot" width="449" height="225" />
</p>

I've been working on this for a couple of weeks, a minute here and there as I get time. A few days ago I saw someone created a very nifty similar app over at [Rex V][1]. Apparently the pundits are right -- never assume you're the only one with an idea.

Mine is simpler and doesn't use AJAX. It's JavaScript only. Thanks to the folks at [ActiveState][2] for the idea -- I was inspired by [Komodo][3]. I have to wonder whether Rex V was too!

Here it is: the [JavaScript regular expression toolkit][4].

I used my work on [grouping data visually with row groups][5] and [browser variations in `RexExp.exec()`][6] to build this tool.

 [1]: http://www.rexv.org/
 [2]: http://www.activestate.com/
 [3]: http://www.activestate.com/Products/Komodo/
 [4]: http://www.xaprb.com/demos/rx-toolkit/
 [5]: /blog/2006/01/10/grouping-data-visually-with-row-groups/
 [6]: /blog/2006/01/14/browser-variations-in-regexpexec/
