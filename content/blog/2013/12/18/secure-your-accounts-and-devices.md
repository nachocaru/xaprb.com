---
title: Secure your accounts and devices
date: "2013-12-18"
url: /blog/2013/12/18/secure-your-accounts-and-devices/
categories:
  - Security
---
This is a public service announcement. Many people I know are not taking important steps necessary to secure their online accounts and devices (computers, cellphones) against malicious people and software. It's a matter of time before something seriously harmful happens to them. 

This blog post will urge you to use *higher* security than popular advice you'll hear. **It really, really, *really* is necessary to use strong measures to secure your digital life.** The technology being used to attack you is very advanced, operates at a large scale, and you probably stand to lose much more than you realize. 

You're also likely not as good at being secure as you think you are. If you're like most people, you don't take some important precautions, and you overestimate the strength and effectiveness of security measures you *do* use. 

### Password Security

The simplest and most effective way to dramatically boost your online security is **use a password storage program**, or password safe. You need to *stop making passwords you can remember* and make long, random passwords on websites. The only practical way to do this is to use a password safe. 

Why? Because if you can remember the password, it's [trivially hackable][1]. For example, passwords like 10qp29wo38ei47ru can be broken instantly. Anything you can feasibly remember is just too weak. 

And, any rule you set for yourself that requires self-discipline will be violated, because you're lazy. **You need to make security easier so that you automatically do things more securely**. A password safe is the best way to do that, by far. A good rule of thumb for most people is that you should not try to know your own passwords, except the password to your password safe. (People with the need to be hyper-secure will take extraordinary measures, but those aren't practical or necessary for most of us.) 

I use [1Password][2]. Others I know of are [LastPass][3] and [KeePass Password Safe][4]. I personally wouldn't use any others, because lesser-known ones are more likely to be malware. 

It's easy to share a password safe's data across devices, and make a backup of it, by using a service such as Dropbox. The password safe's files are encrypted, so the contents will not be at risk even if the file syncing service is compromised for some reason. (Use a strong password to encrypt your password safe!) 

It's important to note that online passwords are different from the password you use to log into your personal computer. Online passwords are much more exposed to brute-force, large-scale hacking attacks. By contrast, your laptop probably isn't going to be subjected to a brute-force password cracking attack, because attackers usually need physical access to the computer to do that. This is not a reason to use a weak password for your computer; I'm just trying to illustrate how important it is to use *really* long, random passwords for websites and other online services, because they *are* frequent targets of brute-force attacks. 

Here are some other important rules for password security. 

*   Never use the same password in more than one service or login. If you do, someone who compromises it will be able to compromise other services you use. 
*   Set your password generation program (likely part of your password safe) to make long, random passwords with numbers, special characters, and mixed case. I leave mine set to 20 characters by default. If a website won't accept such a long password I'll shorten it. For popular websites such as LinkedIn, Facebook, etc I use much longer passwords, 50 characters or more. They are such valuable attack targets that I'm paranoid. 
*   Don't use your web browser's features for storing passwords and credit cards. Browsers themselves, and their password storage, are the target of many attacks. 
*   Never write passwords down on paper, except once. The only paper copy of my passwords is the master password to my computer, password safe, and GPG key. These are in my bank's safe deposit box, because if something happens to me I don't want my family to be completely screwed. (I could write another blog post on the need for a will, power of attorney, advance medical directive, etc.) 
*   Never treat any account online, no matter how trivial, as "not important enough for a secure password." That last item deserves a little story. Ten years ago I didn't use a password safe, and I treated most websites casually. "Oh, this is just a discussion forum, I don't care about it." I used an easy-to-type password for such sites. I used the same one everywhere, and it was a common five-letter English word (not my name, if you're guessing). Suddenly one day I realized that someone could guess this password easily, log in, change the password and in many cases the email address, and lock me out of my own account. They could then proceed to impersonate me, do illegal and harmful things in my name, etc. Worse, they could go find other places that I had accounts (easy to find -- just search Google for my name or username!) and do the same things in many places. I scrambled to find and fix this problem. At the end of it, I realized I had created more than 300 accounts that could have been compromised. Needless to say, I was very, very lucky. My reputation, employment, credit rating, and even my status as a free citizen could have been taken away from me. Don't let this happen to you! 
* Never use real answers to security questions. Always generate fake answers. City of birth? The moon. Favorite high school teacher? Swimming pool. First pet? Diesel locomotive. Store these answers in your password safe. I've guessed my way into many an account by knowing who someone's mother's maiden name was, or paternal grandfather, or whatever. It's usually easy to find this stuff online with a little searching.

### Strong, Memorable Passwords Without a Safe

Some people I know have a set of heuristics to generate a password for each service. "Take the first two letters, prepend the year of signup, reverse the last two letters..." These passwords are a) weak, b) not easy to change since the heuristics don't change, c) easy to figure out if someone gets one of your passwords. In other words, if someone is able to steal your password to, say, Amazon, and figures out from the password `no2014amaz` what your heuristic is, they'll be able to log into lots of other services with a little guesswork.

If you feel unusually vigorous, you could try out [this person's mental encryption scheme](http://www.scilogs.com/hlf/mental-cryptography-and-good-passwords/), but I see a major weakness with that: it doesn't allow for changing your password, since your password is a hashed scheme of the service name. I also think the passwords it generates are less secure than some people have opined them to be, just because they're short. It's interesting but clearly impractical for most people. A password safe is much better.

Another alternative, which I did not know about when I wrote this post, is a
unique physical device to generate passwords. Two that I'm aware of are [QWERTY
Cards](https://www.qwertycards.com/) and
[PasswordCard](https://www.passwordcard.org/).

![qwertycard](/media/2013/12/qwertycards.png)

These have some weaknesses as well, but there are workarounds:

1. They can only generate one password per site, so you can't change your password or have multiple logins per site.
	Workaround: use different secret words to "salt" the passwords over time, and
	remember which one you're currently using. If you can't log into a site, try
	past secret words. Workaround 2: get a new card and keep the old one.
	Workaround 3: add a "version" to the site; for example you might add v1 to
	the site name or company name. You could also append a username so you can
	have multiple logins, e.g. appending "personal" or "work" or similar.
2. They generate strong passwords, which some sites may not accept. For example,
	some sites have length limits or forbid "special characters" in passwords.
	Workaround: just use the first N characters of the password. Workaround 2:
	translate all "special characters" to something non-special, such as an
	underscore. Neither is foolproof, since you'll have to remember this site as
	a special exception, but it may be workable.

### Avoiding Insecure Sites

The limitations on length and special characters that I mentioned in the
previous paragraph are red flags that your password is not secured properly in
their servers.

Do not trust such sites. If you're forced to use them, do so, but otherwise I
would suggest finding another way to do your business.

<blockquote class="twitter-tweet" lang="en"><p>Nothing screams &quot;we are wildly insecure&quot; like a 16-character limit on password length. Stay classy, <a href="https://twitter.com/AOL">@AOL</a>.</p>&mdash; Baron Schwartz (@xaprb) <a href="https://twitter.com/xaprb/status/544310203819495425">December 15, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/auswipe">@auswipe</a> no, a mere 18-character password limit is the dubious honor of <a href="https://twitter.com/CrateandBarrel">@CrateandBarrel</a></p>&mdash; Baron Schwartz (@xaprb) <a href="https://twitter.com/xaprb/status/544317402524430336">December 15, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Another red flag is when you reset your password and instead of forcing you to create a new one, they a) send your existing one (which means they stored it, which they should *never* do) or b) generate a new one and send it to you in email.



### Use Two-Factor Auth


Two-factor authentication (aka 2-step login) is a much stronger mechanism for account security than a password alone. It uses a "second factor" (something you physically possess) in addition to the common "first factor" (something you know -- a password) to verify that you are the person authorized to access the account. 

Typically, the login process with two-factor authentication looks like this: 

*   You enter your username and password. 
*   The service sends a text message to your phone. The message contains a 6-digit number. 
*   You must enter the number to finish logging in. With two-factor auth in place, it is very difficult for malicious hackers to access your account, even if they know your password. **Two-factor auth is way more secure than other tactics such as long passwords**, but it doesn't mean you shouldn't also use a password safe and unique, random, non-memorized passwords. 

Two-factor auth has a bunch of special ways to handle other common scenarios, such as devices that can't display the dialog to ask for the 6-digit code, or what if you lose your cellphone, or what if you're away from your own computer and don't have your cellphone. Nonetheless, these edge cases are easy to handle. For example, you can get recovery codes for when you lose or don't have your cellphone. You should store these -- where else? -- in your password safe. 

There seems to be a perception that lots of people think two-factor auth is not convenient. I disagree. I've never found it inconvenient, and I use two-factor auth a lot. And I've never met these people, whoever they are, who think two-factor auth is such a high burden. The worst thing that happens to me is that I sometimes have to get out of my chair and get my phone from another room to log in. 

Unfortunately, most websites don't support two-factor authentication. Fortunately, many of the most popular and valuable services do, including Facebook, Google, Paypal, Dropbox, LinkedIn, Twitter, and most of the other services that you probably use which are most likely to get compromised. [Here is a list of services with two-factor auth][5], with instructions on how to set it up for each one. 

**Please enable two-factor authentication if it is supported!** I can't tell you how many of my friends and family have had their Gmail, Facebook, Twitter, and other services compromised. Please don't let this happen to you! It could do serious harm to you -- worse than a stolen credit card. 

Another suggestion I've heard, for websites and services that don't offer strong security and for which you don't want or need to remember or store a password, is to just reset your password every single time you log in. In this way, your email account effectively becomes external authentication, and every password becomes single-use. You click "forgot password," check your email, click on the link there, enter some random gibberish (best generated with `pwgen 50` or similar) for your "new password" that you're never going to use again, and log in.

### Secure Your Devices

Sooner or later someone is going to get access to one of your devices -- tablet, phone, laptop, thumb drive. I've never had a phone or laptop lost or stolen myself, but it's a matter of time. I've known a lot of people in this situation. One of my old bosses, for example, forgot a laptop in the seat pocket of an airplane, and someone took it and didn't return it. 

And how many times have you heard about some government worker leaving a laptop at the coffee shop and suddenly millions of people's Social Security numbers are stolen? 

Think about your phone. If someone stole my phone and it weren't protected, they'd have access to a bunch of my accounts, contact lists, email, and a lot of other stuff I really, really do not want them messing with. If you're in the majority of people who leave your phone completely unsecured, think about the consequences for a few minutes. Someone getting access to all the data and accounts on your phone could probably ruin your life for a long time if they wanted to. 

All of this is easily preventable. Given that one or more of your devices will someday certainly end up in the hands of someone who may have bad intentions, I think it's only prudent to take some basic measures: 

*   Set the device to require a password, lock code, or pattern to be used to unlock it after it goes to sleep, when it's idle for a bit, or when you first power it on. If someone steals your device, and can access it without entering your password, you're well and truly screwed. 
*   Use full-device encryption. If someone steals your device, for heaven's sake don't let them have access to your data. For Mac users, use File Vault under Preferences / Security and Privacy. Encrypt the whole drive, not just the home directory. On Windows, use [TrueCrypt][6], and on Linux, you probably already know what you're doing. 
*   On Android tablets and phones, you can encrypt the entire device. You have to set up a screen lock code first. 
*   If you use a thumb drive or external hard drive to transfer files between devices, encrypt it. 
*   Encrypt your backup hard drives. Backups are one of the most common ways that data is stolen. *(You have backups, right? I could write another entire blog post on backups. Three things are inevitable: death, taxes, and loss of data that you really care about.)* 
*   Use a service such as [Prey Project][7] to let you have at least some basic control over your device if it's lost or stolen.  Android phones now have the [Android Device Manager][10] and [Google Location History][9], but you have to enable these.
*   Keep records of your devices' make, model, serial number, and so on. Prey Project makes this easy. 
*   On your phone or tablet, customize the lockscreen with a message such as "user@email.com &#8211; reward if found" and on your laptops, stick a small label inside the lid with your name and phone number. You never know if a nice person will return something to you. I know I would do it for you.

### External Links and Resources

* http://twofactorauth.org
* [How PayPal and GoDaddy exposed someone to account theft][8]
* [Good advice on common password misconceptions](https://www.qwertycards.com/strong_passwords.html)

### Things that don't help

Finally, here are some techniques that aren't as useful as you might have been told. 

*   Changing passwords doesn't significantly enhance security unless you change from an insecure password to a strong one. Changing passwords is most useful, in my opinion, when a service has already been compromised or potentially compromised. It's possible on any given day that an attacker has gotten a list of encrypted passwords for a service, hasn't yet been discovered, and hasn't yet decrypted them, and that you'll foil the attack by changing your password in the meanwhile, but this is such a vanishingly small chance that it's not meaningful. 
*   (OK, this ended up being a list of 1 thing. Tell me what else should go here.)

### Summary


Here is a summary of the most valuable steps you can take to protect yourself: 

*   Get a password safe, and use it for all of your accounts. Protect it with a long password. Make this the *one* password you memorize. 
*   Use long (as long as possible), randomly generated passwords for all online accounts and services, and *never* reuse a password. 
*   Use two-factor authentication for all services that support it. 
*   Encrypt your hard drives, phones and tablets, and backups, and use a password or code to lock all computers, phones, tablets, etc when you turn them off, leave them idle, or put them to sleep. 
*   Install something like Prey Project on your portable devices, and label them so nice people can return them to you. 
*   Write down the location and access instructions (including passwords) for your password safe, computer, backup hard drives, etc and put it in a safe deposit box. Friends try not to let friends get hacked and ruined. Don't stop at upgrading your own security. Please tell your friends and family to do it, too! 

Do you have any other suggestions? Please use the comments below to add your thoughts.


[1]: http://arstechnica.com/security/2013/05/how-crackers-make-minced-meat-out-of-your-passwords/
[2]: https://agilebits.com/onepassword
[3]: https://lastpass.com/
[4]: http://keepass.info/
[5]: http://twofactorauth.org/
[6]: http://www.truecrypt.org/
[7]: http://preyproject.com/
[8]: https://medium.com/p/24eb09e026dd
[9]: https://maps.google.com/locationhistory/
[10]: https://www.google.com/android/devicemanager
