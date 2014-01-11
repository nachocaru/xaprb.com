---
title: 'Permit Cookies: a Firefox extension that makes cookie whitelisting easy'
author: Baron Schwartz
excerpt: |
  <p>I've been writing a lot lately about Perl, MySQL and so forth, and neglecting another topic that interests me: the Web.  I'm going to finish and publish some of the drafts I have on the Web before I continue with another massive database marathon.  This one is about someone who read my mind and built exactly the Firefox extension I was about to build myself: an <a href="http://addons.mozilla.org/firefox/44/">easy way to block all cookies and allow them on a case-by-case basis without nagging</a>.</p>
layout: post
permalink: >
  /2006/10/23/permit-cookies-a-firefox-extension-that-makes-cookie-whitelisting-easy/
description:
  - >
    The Permit Cookies extension for Firefox makes it easy and convenient to guard
    your privacy with a cookie whitelist.
---
I&#8217;ve been writing a lot lately about Perl, MySQL and so forth, and neglecting another topic that interests me: the Web. I&#8217;m going to finish and publish some of the drafts I have on the Web before I continue with another massive database marathon. This one is about someone who read my mind and built exactly the Firefox extension I was about to build myself: an [easy way to block all cookies and allow them on a case-by-case basis without nagging][1].

### By default, cookie whitelisting in Firefox isn&#8217;t easy

As you may know, I take a &#8220;say no by default&#8221; approach to [blocking cookies on the Web][2]. I disable all cookies by default, and only enable them on sites I want to have them (a &#8220;whitelist&#8221;).

This cookie whitelist is a bit of a pain, though. Every time I browse to a site and want to allow cookies, I have to open the cookie preferences and add the site to the whitelist. That ends up being eight clicks, and I have to type the domain too.

I could tell Firefox to ask me about every cookie, but that&#8217;s worse than no privacy at all. I don&#8217;t even know why there is such an option. It makes browsing so unpleasant, I&#8217;d rather just let everyone set cookies and be done with it. So that&#8217;s not a solution.

What I need is a non-disruptive way to 1) see when cookies aren&#8217;t allowed, and 2) allow them with just a click or two. I looked around the Mozilla extension site and didn&#8217;t find what I wanted. I wanted a bare-bones extension, and everything I saw was a complicated mess. That was quite a while ago.

I thought I&#8217;d have to write my own extension, but never got around to it. In the meantime, either someone wrote exactly what I wanted, or I got better at finding things. The [Permit Cookies][3] extension by [Daniel Lindkvist][4] is about as perfect as it gets.

### How Permit Cookies works

It puts a small icon in the status bar:

<img src="/articles/images/permit-cookies-status-bar.png" width="77" height="29" alt="Permit Cookies Status Bar" />

When I want to allow cookies for a site, a single click on the icon pops up a dialog with the top-level domain of the site I&#8217;m browsing already filled in:

<img src="/articles/images/permit-cookies-dialog.png" width="361" height="198" alt="Permit Cookies Dialog" />

The little &#8220;C&#8221; in the status bar turns green to indicate cookies are now allowed. Another click on that same icon later will let me change my setting for that site, to delete the setting and disallow cookies once more.

Thanks, Daniel! You made Firefox a lot easier for me to use!

 [1]: http://addons.mozilla.org/firefox/44/
 [2]: /blog/2005/11/06/protect-your-privacy-online/
 [3]: https://addons.mozilla.org/firefox/44/
 [4]: http://mfe.gorgias.de/