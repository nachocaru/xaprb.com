---
title: How to guard your privacy with blacklists and whitelists
author: Baron Schwartz
excerpt: '<p>This article explains how to protect your privacy online, without impairing your ability to surf, by creating a content blacklist and a cookie whitelist.</p>'
layout: post
permalink: /2005/11/06/protect-your-privacy-online/
---
This article explains how to protect your privacy online, without impairing your ability to surf, by creating a content blacklist and a cookie whitelist. In my opinion, this is the most effective combination of privacy controls that doesn&#8217;t inhibit normal browsing.

### Motivation: don&#8217;t tell &#8220;them&#8221; any more about myself than I have to

I work in Internet commerce, and I&#8217;m excruciatingly aware of the dozens of companies whose sole purpose is to gather statistics about surfers. They tie these statistics to personally identifiable information in a variety of ways, and they know more about you than you&#8217;d ever believe. What usually happens is Company X (a fictional e-commerce site) will purchase services from Tracker Inc (a fictional company) to help them understand how surfers use their own site. Company X&#8217;s privacy policy usually says your personally identifiable information isn&#8217;t tracked or disclosed, and they&#8217;re being honest. It becomes an issue when Tracker Inc places a cookie on your computer while you browse Company X&#8217;s site. This cookie persists, even when you leave that site, and when you browse Company Y&#8217;s site, the cookie serves to tell Tracker Inc &#8220;this is the same person.&#8221; Tracker Inc only does for Companies X and Y what they promised: they analyze site usage patterns, etc. But they are also independently aggregating the information they gather, and analyzing it in a much broader context. Then they sell it.

### How companies track surfers

The most common way to track surfers is a combination of images (sometimes called beacons, 1-pixel GIFs, tracking GIFs and so forth) and cookies. Company X&#8217;s website will have an image embedded in it. The image is hosted by Tracker Inc, so every time you view a page on Company X&#8217;s site, Tracker Inc gets a request for an image. The request typically contains encoded information. As a simple example, when you request `http://www.companyx.com/shoppingcart.html`, your browser might also request an image from `http://www.trackerinc.com/tracker.gif?cartitem=ipod40gb`. At the same time, your browser gets a cookie set on it, such as `globalid=1234`. This cookie identifies you when you go to Company Y&#8217;s website.

### How effective is anti-spyware software?

There is a variety of software available to block cookies and such. Caveat emptor! Much of this software is spyware itself! Some of it is also poor-quality and may cause your computer to crash, slow down web browsing, interfere with the proper functioning of pages, and so forth. More to the point though, it *doesn&#8217;t block your browser from requesting the image* from Tracker Inc. It just prevents Tracker Inc setting a cookie. Tracker Inc can still track you, because when they get the image request, your IP address goes along with it. They can use this to identify you even without a cookie. The best thing to do is prevent your browser asking for the image to begin with. You don&#8217;t need it. It&#8217;s probably a little 1-pixel image hidden in the footer or somewhere else inconspicuous. Its only purpose is to track you.

### How to set up a cookie whitelist and a content blacklist

I recommend a combination of cookie whitelists and content blacklists to protect your privacy. I use Mozilla Firefox and recommend you do too, for a variety of reasons: it is more secure, faster, adheres to standards, etc. Most importantly for my purposes, it gives you fine-grained control of privacy and allows extensions, one of which is a great content-blocker. In other words, your browser can guard your privacy *without requiring you to install other software*. The remainder of this article explains how I set Firefox up to blacklist content and whitelist cookies.

First, I go look at my cookies in the preferences dialog under Privacy:Cookies (to open the preferences dialog, use the Tools:Options menu option in Windows, Edit:Preferences in Linux, and Firefox:Preferences in Mac). I just scan the cookies I see there. Some of them are bound to be &#8220;good&#8221; or &#8220;useful,&#8221; such as my email provider, [del.icio.us][1] (bookmarks), [RSS feeds][2] and so forth. Others are not. These are ones like doubleclick, bluestreak, statcounter, hitbox and so on. These are the Bad Guys (I&#8217;m not picking on them exclusively; I&#8217;m just using them as examples). I don&#8217;t block cookies from them, however! That would be a blacklist. I&#8217;m just making a list of the Bad Guys I see.

Why look at cookies if I&#8217;m not going to block them? Well, I didn&#8217;t get cookies from the Bad Guys by accident. The cookies are there because my browser requested an image, ad, or other content from them. These cookies are clues to domains whose content I need to block. I feed these domains into my [AdBlock pattern][3]. If you don&#8217;t know what [AdBlock][4] is, head over to their website and check it out. It&#8217;s designed to block content, which can be used both to remove obnoxious ads and to block invasions on your privacy. Once I&#8217;ve blocked the domains, I shouldn&#8217;t get any more cookies from them, *and* I won&#8217;t be requesting tracking GIFs from them. They should be prevented from tracking me. It&#8217;s feasible to make a Bad Guy blacklist because the market space for Bad Guys is fairly small (there is not much competition in the surfer-tracking, statistic-gathering market).

While I&#8217;m there, I also make a list of cookies I think my browser needs for my favorite sites to work right. I&#8217;ll feed this into my cookie whitelist below. I also occasionally turn cookies back on and just see who is setting cookies on my computer. This helps me discover more Bad Guys (though I haven&#8217;t found any new ones in a long while).

The second part of my method for making my browser only do what I tell it is simply whitelisting cookies. If I deny all cookies, except those from specific domains, I don&#8217;t have to be bothered by constant &#8220;do you want to allow this cookie?&#8221; dialogs, and I don&#8217;t have to forbid cookies from all possible Bad Guys. A whitelist says NO cookies are allowed, except from certain cites. This is different from a blacklist, which says ALL cookies are allowed except from certain sites. If I decide I want a cookie for a site, I tell my browser to allow it. A cookie whitelist is feasible because the number of sites that really need cookies on my browser to work is very small. Generally, I only need to allow sites to set cookies if I want to log in for shopping and such.

I&#8217;ll break it down into steps:

1.  Open the preferences dialog as above.
2.  Delete existing cookies so you can start with a clean slate. (DO NOT choose the &#8220;Don&#8217;t allow&#8221; option. This is a blacklist, not a whitelist; you don&#8217;t want a blacklist).
3.  Click OK to dismiss the cookie dialog. You should still have the preferences dialog open.
4.  Un-check the checkbox to &#8220;allow sites to set cookies.&#8221;
5.  Click the &#8220;Exceptions&#8221; button and enter sites that should be able to set cookies. I usually enter the top-level domain of the site. For example, if I want to get into http://members.site.com, I allow cookies from site.com.
6.  If at any point a site isn&#8217;t working right (won&#8217;t let me log in, etc) I just add it to my whitelist. Easy.

Whether I need a cookie whitelist is debatable. If I&#8217;ve blacklisted all content from the Bad Guys, maybe I don&#8217;t; maybe I can just allow anyone to set cookies. You decide for yourself. One of the downsides to the cookie whitelist is I might start fetching content from a Bad Guy without knowing it (since the images are tiny, I usually only find out about them by looking at cookies).

I&#8217;m not naive. I don&#8217;t pretend this is a perfect solution, but it makes me feel better about my privacy online. I hope it has helped you too.

 [1]: http://del.icio.us
 [2]: http://bloglines.com
 [3]: /blog/2005/10/26/adblock-patterns/
 [4]: http://adblock.mozdev.org/