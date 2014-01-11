---
title: My unorthodox CAPTCHA blocked thousands of spam comments every week
author: Baron Schwartz
excerpt: "<p>I wrote a custom imageless CAPTCHA for my blog a while ago.  I didn't write it as a plugin, so I lost it when I upgraded Wordpress a couple weeks ago.  Not having this in place to help eliminate comment spam was an eye-opening experience, and vindicated much of what I asserted in my original posts: a naive question-and-answer system is <em>highly</em> effective at stopping spammers, probably as effective as scrambled images.  Read on for the details.</p>"
layout: post
permalink: /2007/05/28/my-unorthodox-captcha-blocked-thousands-of-spam-comments-every-week/
description:
  - >
    Upgrading Wordpress conclusively demonstrated that my custom CAPTCHA system
    worked better than popular ones.
---
I wrote a custom image-less CAPTCHA for my blog a while ago. I didn&#8217;t write it as a plugin, so I lost it when I upgraded WordPress a couple weeks ago. Not having this protection was an eye-opening experience, and vindicated what I asserted in my original posts: a naive question-and-answer system is *highly* effective at stopping spammers, probably as effective as scrambled images. Read on for the details.

In my [original article][1], I hypothesized that CAPTCHAs with scrambled images just make it hard for real people to use websites, and probably don&#8217;t provide any additional protection over less obnoxious methods. I thought there was probably a sweet spot at which humans don&#8217;t find the system intrusive, and yet it&#8217;s just a tiny bit too hard for most spammers to bother cracking it. After all, comment spammers are mostly targeting wide-open WordPress installations. Why work hard at the small fraction that resist comment spam when there are so many easy targets?

(Actually, knowing what I know about search engine optimization, I&#8217;d go after the hard-to-get ones myself if I wanted quality links, but the comment spam I get is clearly about quantity, not even an attempt to look like quality).

### How much spam do I get?

My little system of multiple-choice questions such as &#8220;which of the following is blue? a) sky b) grass &#8230;&#8221; seemed to cut out the vast majority of comment spam, but I never quite knew how much until I took it away and replaced it with a default installation of WordPress 2.1. In the old system, I had to delete a comment or two a day from the moderation queue. Wanna guess how much spam I built up in a week with nothing but Akismet in the new installation? From Sunday night May 13th to the next Sunday night, I got over 1,800 spam comments.

### What about Akismet?

&#8220;Ah,&#8221; you say, &#8220;but that&#8217;s really no problem. You say you had [Akismet][2] installed; it should catch most of them.&#8221; Yes, but it also catches valid comments, which I value highly and don&#8217;t want to throw away. I had to pore through the spam queue and find them. If you&#8217;ve ever tried that with 1,800 comments in the spam bucket &#8212; holy cow, that&#8217;s all but impossible. I had to log into my MySQL database at the command line and start nuking them with `LIKE` patterns just to get it down to something manageable. Even a couple dozen spam comments a day *in the spam queue* would push me over the edge. If I had to deal with thousands in the spam bucket, and dozens that weren&#8217;t caught by Akismet, I&#8217;d turn off comments.

I needed a challenge question just to stop the hemorrhaging. Instead of writing my own this time, I decided to try using a pre-built plugin. I chose the popular &#8220;[did you pass math?][3]&#8221; plugin. It is, like most WordPress plugins, not perfect &#8212; but it&#8217;s good enough. I&#8217;m down to about 15 spam comments a day in the moderation queue now. With Akismet helping, that becomes quite manageable.

Notice &#8212; and this surprised me &#8212; the &#8220;did you pass math&#8221; plugin lets through more spam than my custom solution. I&#8217;d bet dollars to donuts that&#8217;s because it&#8217;s both popular and not customized per-blog. My system was unique, so it makes sense that it worked better.

### So much for the naysayers

There&#8217;s a lot of &#8220;wisdom&#8221; floating around the web (some of it in the comments on my earlier posts, showing me how easy it would be to bypass my custom solution ) that says CAPTCHAs don&#8217;t work at all, and you should just use Bayesian filters and the like. I never believed it. Now I have proof. Was my system easy to break? Absolutely, and that&#8217;s why it wasn&#8217;t a hassle for real people to use. Did it work great despite its flaws? You bet.

I may re-write my solution as a plug-in at some point, if I get time. Till then, good enough is good enough, just as it always has been.

 [1]: http://www.xaprb.com/blog/2006/01/28/captchas-done-better/
 [2]: http://akismet.com/
 [3]: http://www.herod.net/dypm/