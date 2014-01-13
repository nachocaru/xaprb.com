---
title: My unorthodox CAPTCHA blocked thousands of spam comments every week
date: "2007-05-28"
url: /blog/2007/05/28/my-unorthodox-captcha-blocked-thousands-of-spam-comments-every-week/
categories:
    - Web
---
I wrote a custom image-less CAPTCHA for my blog a while ago. I didn't write it as a plugin, so I lost it when I upgraded WordPress a couple weeks ago. Not having this protection was an eye-opening experience, and vindicated what I asserted in my original posts: a naive question-and-answer system is *highly* effective at stopping spammers, probably as effective as scrambled images. Read on for the details.

In my [original article][1], I hypothesized that CAPTCHAs with scrambled images just make it hard for real people to use websites, and probably don't provide any additional protection over less obnoxious methods. I thought there was probably a sweet spot at which humans don't find the system intrusive, and yet it's just a tiny bit too hard for most spammers to bother cracking it. After all, comment spammers are mostly targeting wide-open WordPress installations. Why work hard at the small fraction that resist comment spam when there are so many easy targets?

(Actually, knowing what I know about search engine optimization, I'd go after the hard-to-get ones myself if I wanted quality links, but the comment spam I get is clearly about quantity, not even an attempt to look like quality).

### How much spam do I get?

My little system of multiple-choice questions such as "which of the following is blue? a) sky b) grass &#8230;" seemed to cut out the vast majority of comment spam, but I never quite knew how much until I took it away and replaced it with a default installation of WordPress 2.1. In the old system, I had to delete a comment or two a day from the moderation queue. Wanna guess how much spam I built up in a week with nothing but Akismet in the new installation? From Sunday night May 13th to the next Sunday night, I got over 1,800 spam comments.

### What about Akismet?

"Ah," you say, "but that's really no problem. You say you had [Akismet][2] installed; it should catch most of them." Yes, but it also catches valid comments, which I value highly and don't want to throw away. I had to pore through the spam queue and find them. If you've ever tried that with 1,800 comments in the spam bucket -- holy cow, that's all but impossible. I had to log into my MySQL database at the command line and start nuking them with `LIKE` patterns just to get it down to something manageable. Even a couple dozen spam comments a day *in the spam queue* would push me over the edge. If I had to deal with thousands in the spam bucket, and dozens that weren't caught by Akismet, I'd turn off comments.

I needed a challenge question just to stop the hemorrhaging. Instead of writing my own this time, I decided to try using a pre-built plugin. I chose the popular "[did you pass math?][3]" plugin. It is, like most WordPress plugins, not perfect -- but it's good enough. I'm down to about 15 spam comments a day in the moderation queue now. With Akismet helping, that becomes quite manageable.

Notice -- and this surprised me -- the "did you pass math" plugin lets through more spam than my custom solution. I'd bet dollars to donuts that's because it's both popular and not customized per-blog. My system was unique, so it makes sense that it worked better.

### So much for the naysayers

There's a lot of "wisdom" floating around the web (some of it in the comments on my earlier posts, showing me how easy it would be to bypass my custom solution ) that says CAPTCHAs don't work at all, and you should just use Bayesian filters and the like. I never believed it. Now I have proof. Was my system easy to break? Absolutely, and that's why it wasn't a hassle for real people to use. Did it work great despite its flaws? You bet.

I may re-write my solution as a plug-in at some point, if I get time. Till then, good enough is good enough, just as it always has been.

 [1]: http://www.xaprb.com/blog/2006/01/28/captchas-done-better/
 [2]: http://akismet.com/
 [3]: http://www.herod.net/dypm/
