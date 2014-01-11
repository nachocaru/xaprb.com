---
title: How to make Thunderbird download new IMAP messages
permalink: /2009/05/26/how-to-make-thunderbird-download-new-imap-messages/
categories:
  - Desktop
  - GNU/Linux
tags:
  - IMAP
  - Mozilla
  - Thunderbird
---
One of the minor things I've noticed when I use Thunderbird on my IMAP accounts is that it doesn't download IMAP messages until I click on them. Then I have to wait until I can see the message. I have heard that this is supposed to be fixed in Thunderbird 3, and I tried it but a lot of the extensions I need aren't compatible with it.

Today I finally tried to search and find out more about the problem. Turns out I'm not alone &#8212; others have noticed that the setting to download message bodies for offline use doesn't do what it's supposed to.

Fortunately, there's an extension for this. It's called [Sync On Arrival][1]. So far, it's working like a charm. The only thing I had to do was edit the install.rdf to increase the version number. It's compatible with Thunderbird 2, even though it says it's not.

**Edit**: see the comments for a way to do this with configuration alone, rather than an extension.

 [1]: https://addons.mozilla.org/en-US/thunderbird/addon/1396
