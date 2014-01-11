---
title: "How to write good comments: say why, not what"
author: Baron Schwartz
excerpt: '<p>This article uses two examples of bad comments to explain my rule of thumb for good commenting style: comments should say why, not what.</p>'
layout: post
permalink: /2005/12/10/tell-me-why-not-what/
---
I have [written before][1] about badly commented code, but I've recently encountered two examples of code that warns someone of something bad, then never tells them what it is. This is a great reason to write comments that say why, not what &#8212; my first rule of thumb when commenting code.

### Example: SQL stored procedure

The first example of a bad comment is in a SQL stored procedure, where a table is updated from a view:

<pre>-- *** THIS MUST BE SEPARATE ***
update table1 set col1 = someVal
    from table1 join view1 on [join critieria]</pre>

I did a quick search and found *18 places this code had been copied and pasted*. I asked about it, and after some time found someone who knew what the code did. Here's the answer I got about it:

> A bug in the query optimizer prevents left joining onto `view1` in a large join statement. `col1` was not getting set from `isnull(someVal, 0)`.

That's a serious bug! Other programmers definitely deserve to know about it in detail. There are lots of problems here, though. First of all, that's not a left join. Second, there's no `isnull()` at all. What does that comment have to do with this query? Answer: nothing. Someone copied and pasted the meaningless, paralyzing comment along with code.

I can't think of a more effective way to make code impossible to maintain. It's brilliantly simple: just hint at a vague, terrifying possibility of something bad happening if you change the code. Voila, nobody will ever touch it again.

### Example: ASP article editor

The second instance of this "worst practice" is an internal ASP article editor. If a user viewed the editor with Internet Explorer on a Macintosh, the following code would print out an error:

<pre>sBrowserType = request.ServerVariables("HTTP_USER_AGENT")
if instr(sBrowserType, "MSIE") &gt; 0 and instr(sBrowserType, "Mac") &gt; 0 then
    response.Write "You can not edit the body text of this article with Mac IE - please use a different browser"
    ' some code to prevent further use of the page
end if</pre>

There was no comment explaining why, and the intern who wrote the code several summers ago was long gone. After I asked everyone &#8212; programmers, writers, team leaders &#8212; one person dredged up a vague recollection that this particular browser wouldn't save all the article's text, causing your article to truncate after a certain point.

### The first rule of Xaprb

I think it's self-evident why these are examples of spectacularly unmaintainable programming, but I'll just sum it up for easy digestion:

*   Comments should say why, not what.

I'm probably not the first to say this, but I don't know of anyone else who's said it, so I claim naming rights: henceforth, I refer to this as the **first rule of Xaprb** :-)

### What the rule means

The rule follows from the principle of [Don't Repeat Yourself][2] (DRY), which states "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." **The code already says what** and is the authoritative representation. In the first example, the code and comment repeat each other and omit a piece of system knowledge (the missing knowledge is **why**), so the comment is about as useful as saying

<pre>-- *** THIS CODE IS SEPARATE ***</pre>

In the second example, there's no *comment*, but there's a *behavior* and a *message*. **The message repeats the behavior**. Both say "you can't use this page," which is repeated knowledge. Neither says why. Again, a piece of system knowledge ("why") is not represented at all. DRY, together with [Once and Only Once][3], requires not only **at most** one representation of a piece of knowledge, but also **at least** one. Both examples in this article fail these criteria.

From a usability standpoint, any interface that warns but doesn't inform is a faux pas, too. "You can't do that" is irritating. "Your browser will not save your work correctly" is helpful.

 [1]: /blog/2005/09/28/a-comment-on-comments/
 [2]: http://c2.com/cgi/wiki?DontRepeatYourself
 [3]: http://c2.com/cgi/wiki?OnceAndOnlyOnce
