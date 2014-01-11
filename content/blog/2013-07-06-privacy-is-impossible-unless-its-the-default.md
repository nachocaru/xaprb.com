---
title: 'Privacy is impossible unless it&#8217;s the default'
author: Baron Schwartz
layout: post
permalink: /2013/07/06/privacy-is-impossible-unless-its-the-default/
categories:
  - Commentary
---
This is a follow-up to my last post, in which I asserted that [without free software and hardware, privacy is impossible][1]. Suppose we have trustworthy, free hardware and software. What else is needed to thwart efforts to monitor our everyday behavior on a massive scale?

Let&#8217;s look only at one activity that&#8217;s currently being monitored: email. How can we make email less vulnerable to prying eyes?

Technology to encrypt email between ordinary citizens (PGP, OpenPGP, and [GnuPG][2]) has existed for years, and in a form strong enough to frustrate any known attempts at decryption. The encrypted emails can be decrypted, but it requires a brute-force effort of computing, which would take far too long with available computers.

But if you and I use this technology right now to encrypt our communications, we&#8217;ll actually make ourselves more interesting targets. That&#8217;s partially because we&#8217;d be among the few people doing so. Have you ever noticed that nothing draws attention like whispering in a public place? I don&#8217;t know what proportion of ordinary email between everyday people is encrypted, but if pressed, I&#8217;d guess it&#8217;s fewer than one email in 50,000. That&#8217;s an extraordinarily strong signal to authorities looking for needles in the haystack of Internet activity. I wouldn&#8217;t be surprised if the NSA has large-scale brute-force encryption-cracking clusters dedicated to forcibly decrypting the few encrypted emails that wend their way around the Internet.

But what if *everyone* sent encrypted email? Then it wouldn&#8217;t be remarkable. Those little *hi hon, do you need me to pick up groceries on the way home?* emails I send would be as common as more weighty ones. Brute-forcing may be feasible on a small scale, but I doubt that even un-guessed-at techniques and availability of powerful computers could brute-force decryption on the scale of the whole of the Internet&#8217;s email. The NSA, unable to determine whose emails to decrypt, would have to settle for snooping on a smaller scale, or giving up.

What would it take for everyone to use encryption in their emails? It is practically impossible, and thus certainly won&#8217;t happen, unless all email software makes it *the default behavior*. And since most people use email software from companies such as Apple, Microsoft, and Google, this will not happen. Even if these companies wanted to make such software encrypt-by-default, I am absolutely certain that they would be secretly barred from doing so. (Plus, as I&#8217;ve said in my earlier article, their software would not be trustworthy and we&#8217;d be spied upon in other ways. Why spy on email software when you can spy on the whole operating system?)

Email encryption would also have to be a lot simpler and more automatic. Most computer users, in my opinion, can&#8217;t understand the concepts of public and private key pairs, how to generate them, how to exchange them, how to know if another person&#8217;s key should be trusted, and so on. Even HTTPS is baffling to most computer users &#8212; and the only thing they&#8217;re exposed to is their browser&#8217;s address bar and the presence or absence of a lock icon, a much simpler thing to understand. Yet a majority of people still get it wrong and expose themselves to phishing attacks, viruses, and other scams. This is not a criticism of them; it&#8217;s a criticism of the technology. Security technology is way, way too hard for everyday people to use. Thus we&#8217;ll never have mass encryption unless something fundamentally changes in how we do it.

Even if we had mass adoption of encryption, there are a couple of things that would make it easier for the NSA to continue spying on us. Once they decrypt one message, they&#8217;d have the key to decrypt future emails to that same recipient. So over time they&#8217;d be able to snoop on more and more people. Encryption keys would have to be rotated regularly to frustrate this. For this, and other technological reasons, absolutely everything would have to &#8220;just work&#8221; without any need for manual configuration or intervention. If a human has to do something like rotate an encryption key, it won&#8217;t happen. Anyone experienced with backups knows what I mean.

The other is that only the body of the email message is encrypted. The subject, sender, recipient, IP addresses, and a surprising variety of other data would be unprotected. This is too much for my comfort. It&#8217;s essentially equivalent to the so-called metadata they&#8217;ve been collecting from Verizon, for example (caller, callee, time of call, and so on).

The bottom line is that we are using technologies such as email that were never designed to be resistant to the snooping now occurring. Email encryption is a bolt-on afterthought. It&#8217;s not feasible society-wide, by default, for all users; and on a smaller scale, it helps identify interesting snoop-worthy targets. And thus there&#8217;s really nothing we can do that will make government monitoring of email impossible.

In a future post I&#8217;ll broaden this topic beyond email.

 [1]: http://www.xaprb.com/blog/2013/07/05/without-free-software-and-hardware-privacy-is-impossible/ "without free software and hardware, privacy is impossible"
 [2]: http://www.gnupg.org/