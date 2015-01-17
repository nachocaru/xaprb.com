---
title: Three steps to stopping blog comment spam
date: "2008-10-11"
url: /blog/2008/10/11/three-steps-to-stopping-blog-comment-spam/
categories:
  - Databases
  - Web
---
This is part knowledge share, part appeal: fellow bloggers, I'd comment a lot more on your blogs (and I want to!) if I could. Please, make it easy for me to comment -- don't make me log in (I won't do it) or moderate me. I've found a solution that works really well for me; maybe it'll help you too.

<!--more-->

I get a **lot** of comment attempts on this blog. Even years ago, when it wasn't getting much traffic, I would get hundreds or thousands of spam comments every time I logged in to check my moderation queue. It became a ritual I'd do several times a day, like checking email, and I'd have pages and pages of comments to delete.

Today I get just a few spam comments a month. I have a three-part recipe that has proven to virtually eliminate spam comments. None of the three works in isolation, but together they are very good.

Here it is:

1.  [Akismet][1]. Akismet is very, very good at detecting spam and putting it into the moderation queue. It rarely has a false positive or false negative. All you have to do is sign up for a WordPress account (takes 15 seconds) so you get an Akismet API key.
2.  [WP-Gatekeeper][2]. This lets you add a simple question-answer, like a CAPTCHA but without obnoxious accessibility problems or unreadable images. Even the biggest sites on the web use unreadable CAPTCHAs, and it drives me nuts. See [Yes, I'm Human. No, I Can't Decode YouTube Captchas.][3]
3.  [Bad Behavior][4] is the keystone in the arch. It actually denies access to the site, based on the request's HTTP headers and other metadata.

This trio of plugins, all of which are very simple to install and configure, mean that very few spam-bot requests ever reach the site. The remaining requests are easily quarantined into the moderation queue if they are spam.

This also makes it really easy for humans to comment on my blog. You just answer the goofy question and that's it. Your comments don't get moderated unless Akismet thinks they are spam.

On a related note, the [Subscribe To Comments][5] is the other feature I appreciate the most on other people's blogs. I don't want to subscribe via RSS, and I don't want to check back; subscribing to get email when there's a response is great for me.

 [1]: http://akismet.com/
 [2]: http://www.meyerweb.com/eric/tools/wordpress/wp-gatekeeper.html
 [3]: http://www.rimmkaufman.com/rkgblog/2008/09/15/illegible-captchas/
 [4]: http://www.bad-behavior.ioerror.us/
 [5]: http://txfx.net/code/wordpress/subscribe-to-comments/
