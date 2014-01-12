---
title: CAPTCHAs without images, part 2
date: "2006-05-29"
permalink: /2006/05/29/captchas-without-images-part-2/
---
I want to follow up on my earlier article about [how to do CAPTCHAs without images][1], for accessibility and usability. In that article I hoped my simple scheme would deter dumb robots, cutting down on the bulk of the comment spam I was getting.

It did cut out the comment spam -- for a while. After a while, though, I started to get some spam again. I could see the spammer was either doing it manually, or had figured out that my form submission included the ID of the question I'd asked (wow, you spammers *sure are smart*). I tried changing the questions once or twice, thinking they might be automated set-and-forget spambots that would not get updated for a while. This seemed to have no effect at all. "Alas," I thought, "I'll just put up with a few spam comments every now and then." Then it became 10 a day. That bothered me, but still not enough to do anything about it.

But then some @$$ started really slamming me. It was all about buying medications and online poker and so forth. It's funny how easy it is to detect which spammer is which by the message style, too. The phrasing is always the same. I could tell this one was new. And I was getting hundreds of spam comments a day.

I tried a Bayesian filter plugin for WordPress briefly, but it didn't work quite right and I didn't have enough time to learn about WordPress's plugin architecture to fix it. During that trial, comments were totally disabled on the blog. I couldn't let that continue, so I uninstalled the plugin and kept moderating while I hoped for a few spare minutes to find a fix.

Meanwhile, even my posts about not using image CAPTCHAs were getting slain. Oh, the irony!

Finally, I managed to find a half-hour to tweak my image-less CAPTCHA system. Instead of posting back which question was on the comment form, I made it set up a session and store which question, like traditional CAPTCHA systems. I really didn't want a heavy-weight solution where I stored the information in an actual session or in a relational database. I wanted it to be just enough to deter spammers, as before. So this time I used some encryption, some randomization, and a known bit of data that changes frequently -- though I won't say what that is -- to generate a passkey and put it in a cookie. The cookie is valid only for one request, and is time-sensitive too. And since the secret changes frequently, hopefully it's not obvious how this all works (though, as before, it wouldn't be too hard to figure it out if you approach it from a "what would be easiest for him to do" point of view).

Basically, I went from a stateless and easily hackable system to one with a bare minimum of statefulness, and I guess it was just enough to foil the spammers. I haven't gotten a single spam comment since. This is like being in an airplane and putting noise-blocking headphones on. It is blessed, blessed relief. And I'm really happy because I seem to have found -- at least temporarily -- just the right balance between people and robots.

Now, the only thing left is to wait and see how long it takes the spammers this time. I promise, I will fight image CAPTCHAs till the last resort is exhausted. Who knows how it will work out? I'll certainly let you know!

 [1]: /blog/2006/01/28/captchas-done-better/

 *[CAPTCHA]: Completely Automated Public Turing Test to Tell Computers and Humans Apart
