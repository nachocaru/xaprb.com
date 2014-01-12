---
title: Using GPG in Gmail on a Mac
date: "2013-10-24"
permalink: /2013/10/24/using-gpg-in-gmail-on-a-mac/
categories:
  - Desktop
  - Security
---

I used to use the FireGPG extension to encrypt and decrypt text in a browser -- including wikis, for example, where sensitive client information could be stored. It's been a while since I had that need, but recently I wanted to send a GPG-encrypted message to a coworker, and FireGPG has been discontinued for years. I also use a Mac now, and Chrome is my primary browser. 

What to do? I looked around at a few Chrome extensions, but didn't really like them. 

Then [someone][1] kindly pointed out on Twitter that the GPG suite from [gpgtools.org][2] adds "services" to the right-click menu on a Mac, which enable all sorts of GPG actions on selected text, files, and so on. I had an earlier version of the GPG suite installed, so I upgraded it. (I got an error message about the pin entry application, so I uninstalled and reinstalled, which fixed it.) 

Et voila. Here I'm composing a message: <img src="http://www.xaprb.com/blog/wp-content/uploads/2013/10/compose.png" alt="compose" width="413" height="316" class="aligncenter size-full wp-image-3297" /> 

Then I encrypt it: <img src="http://www.xaprb.com/blog/wp-content/uploads/2013/10/encrypt.png" alt="encrypt" width="495" height="680" class="aligncenter size-full wp-image-3298" /> 

Here's the result: <img src="http://www.xaprb.com/blog/wp-content/uploads/2013/10/encrypted.png" alt="encrypted" width="410" height="473" class="aligncenter size-full wp-image-3299" /> 

And here I've decrypted it on the receiving end: <img src="http://www.xaprb.com/blog/wp-content/uploads/2013/10/decrypted.png" alt="decrypted" width="554" height="374" class="aligncenter size-full wp-image-3300" /> 

It's not quite as seamless as a plugin would make it, but for occasional use it's more than acceptable.



 [1]: https://twitter.com/mnxsolutions/status/393178369543520256

 [2]: https://gpgtools.org/

