---
title: To Gentoo or not to Gentoo?
author: Baron Schwartz
excerpt: "<p>Some people who know I've used Gentoo asked me my thoughts on using it for MySQL servers.  Here are my opinions and experiences using Gentoo, both for desktop systems and for servers.</p>"
layout: post
permalink: /2006/11/21/to-gentoo-or-not-to-gentoo/
description:
  - "Why I don't use Gentoo myself anymore.  It's too hard to update and maintain, not fast enough, and I'm not confident of the builds."
---
Some people who know I&#8217;ve used Gentoo asked me my thoughts on using it for MySQL servers. Here are my opinions and experiences while using Gentoo, both for desktop systems and for servers.

This is long, but hopefully the brain dump is useful to you. I have so many thoughts on this subject that I&#8217;m having a hard time really organizing them well, and I&#8217;m censoring myself too because I know I represent only a very small, focused viewpoint on Gentoo.

This article is *highly* subjective, so please take what I say with a spoonful of salt. Your mileage may vary.

Finally, before I begin: I have a lot of reasons for moving away from Gentoo myself, and this article is mostly about why I don&#8217;t think Gentoo is a good idea for what I use computers for, but I don&#8217;t mean to criticize anyone or say it&#8217;s no good in general (in fact I know of some uses where it works great, and lots of places use it). Nothing here is personal. This is simply the train of thought I went through when deciding not to use a source-based, continuous upgrade distribution for my own systems.

### The 50,000 foot view

I recently switched away from Gentoo, after using it since 2001 or 2002. I used Red Hat, Slackware and other distributions before that, and my main gripe with them was the unavailability of reasonably recent software; I felt they became stale and forced you to upgrade your entire system to get something other than an ancient version of [insert package name here]. There were also endless dependency conflicts. By contrast, Gentoo let me build a recent version of whatever I wanted, and I felt a lot happier with it.

In recent years though, I&#8217;ve become more aware of the pain of a constant, incremental upgrade process, which is what Gentoo gave me. Even though in theory it&#8217;s not necessary to constantly keep updated with the most recent version of all installed packages, in practice I find it is. I found if I didn&#8217;t keep abreast of changes, I couldn&#8217;t catch back up again without a lot of pain.

I also started to question some of the things people assert about Gentoo, such &#8220;it is small, light and focused on speed.&#8221; I find packages compiled under Gentoo, with the precisely right CFLAGS customized just for my processor and hardware, and with just the right USE flags customized to only install what&#8217;s needed, are often much less performant than software compiled for generic i386 architecture with no optimizations. Finally, some of the software I&#8217;ve installed under Gentoo seems to be broken.

The following are more details of my experiences.

### Upgrading is painful

Upgrading can be an enormous pain:

1.  First you sync,
2.  Then you run `emerge -avuD --newuse world` and look at what&#8217;s going to be upgraded,
3.  Then you cancel and tweak some USE flags,
4.  Then you pull your hair out as you still can&#8217;t understand what package is trying to install 301MB of dependencies you don&#8217;t want,
5.  Then you use `equery` and friends to try to find out,
6.  Then you pull your hair out because these tools say there is no such package, or can&#8217;t find the files for it, or find the package but say nothing at all,
7.  Finally you get on the forums and figure it out, and get the flags/whatever right. It turns out there&#8217;s a new default USE flag for some package that doesn&#8217;t show up in the upgrade list, and it wants to install a bunch of &#8220;dependencies&#8221; it doesn&#8217;t need. For example, there are lots of things that want to install multiple versions of QT, including QT itself. If you let it install version 3 for just one program, it will want to simultaneously upgrade itself to 4 and keep the version 3, because that program needs it,
8.  Then you let it upgrade, which still has to download 194MB (hey! you saved 105MB, be happy!) over your DSL connection and takes 4 hours to compile on a fast 64-bit machine loaded with RAM &#8212; why? Why, because of course GCC has to be upgraded from 4.1.1-pre5\_r16a to 4.1.1-pre5\_r16b, which is probably three lines of source that changed. But as I say later, you don&#8217;t dare not upgrade GCC.

Now your system is upgraded, right? Wrong, everything is broken because it isn&#8217;t linked against the new glibc/QT/whatever. Time to `revdep-rebuild` &#8212; oh goody, it wants to rebuild your entire system. Another 7 hours of compiling. Cozy up to the back of your computer&#8217;s case, it&#8217;s cold in the basement and that thing is warm. Who needs a fireplace? Aaahhhhh. Watch a movie.

You won&#8217;t have to do this again for another three days, don&#8217;t worry.

I&#8217;m exaggerating for effect. It isn&#8217;t like this every three days. There is something to upgrade every three days, or even every day, but it&#8217;s usually small and incremental. However, if you let it slip, it becomes a nightmare, and even when you keep up with it, occasionally you still get this kind of mess. I am absolutely not exaggerating about the size of these. Recent memory contains painful un-repressed experiences with xorg and GCC, which took weeks to solve on certain machines (how much pain you experience totally varies from system to system, depending on what you&#8217;ve installed and how it&#8217;s configured). And even when this doesn&#8217;t happen, it is a royal pain to do this every few days. A constant upgrade process is just way too much work.

### Upgrading breaks things

Upgrading can badly break things too frequently for my taste. For example, these are things that used to break on my desktop machine all the time:

1.  My atheros network card. Every time I upgraded anything to do with networking (such as my kernel, or the drivers), networking broke. I know it has to be this way, but when upgrading a kernel, it&#8217;s tough to remember everything else that has to be rebuilt against it. I usually figured it out by rebooting and noticing that the network wouldn&#8217;t come up, at which point I didn&#8217;t have a working network to fetch the latest madwifi drivers for building (oops, I should have been upgrading constantly; I&#8217;d have the .tar.gz files cached if I did).
2.  Samba. Any idea how many things in a typical Samba-enabled desktop system are linked against Samba? Me neither, I&#8217;m trying to forget. Upgrading a kernel means re-compiling all that stuff (if there&#8217;s a way to avoid it, I never found it, and that&#8217;s what `revdep-rebuild` told me to do &#8212; and the only thing that worked for me).

There is no way around this, as far as I know.

### Even in the best case, it&#8217;s too slow

Downloading and building everything from source may promise &#8220;infinite flexibility&#8221; (more on this later), but it&#8217;s too slow. It doesn&#8217;t seem that way at first, but after a while, it gets tedious. Compiling everything is just a waste of time, for most people and most purposes. Why should everyone have to start from source code with every package? If we all compiled all our own software, we&#8217;d waste billions of hours of processor time every year. There&#8217;s something to be said for doing things once and then enjoying the benefits, and compilation is a good example, in my opinion.

Downloading the source is also usually a larger download than getting pre-compiled packages. It&#8217;s a waste of bandwidth.

### Gentoo is *not* optimized for my hardware!

As I said above, the whole &#8220;Gentoo is optimized&#8221; train of thought doesn&#8217;t ring true for me. Here are some experiences I&#8217;ve had where the Gentoo &#8220;optimized&#8221; build ran very badly on my machine:

1.  Firefox. When I used an official binary package, Firefox ran like a dream. But if I did this, I couldn&#8217;t link against it for building the desktop environment, so then that desktop environment wanted to build the Mozilla suite. So one way or another, I ended up either compiling Firefox from source, or Mozilla from source. And Firefox from source ran like a dog. Even scrolling in a text field was slow. I know, I know &#8212; I read all the forum entries about locales and blah blah, and it helped, but it still ran badly. One note about desktop environments &#8212; I like to use Fluxbox or XFCE, but there are certain things that have at least some dependency on gnome-base. I don&#8217;t mind having that installed, except that it in turn depends on things&#8230; and that makes for a lot more things to upgrade.
2.  Any DVD playing software.
3.  OpenOffice.org
4.  MySQL server (I think &#8212; preliminary results discussed below).

These are the places where I most notice the speed difference. It beats me why packages I compile from source are slower. I bet I&#8217;ve spent a hundred hours trying to learn enough to fix these and other speed problems, but I never could.

The only thing I think might have been more responsive on Gentoo, before I switched to a binary distribution on one machine, is GTK+. On this machine now I notice a small lag in bringing up dialog boxes and so forth. (QT has always been lightning quick for me, no matter what).

### Gentoo doesn&#8217;t have the latest and greatest

While Gentoo usually has more up-to-date versions of packages in its source tree than Red Hat sometimes used to in 5.1 (ah, the good old days), it doesn&#8217;t always have updated versions. I can&#8217;t think of a good example right now, except for how long it took to get XFCE 4.2 into the tree, but I know I&#8217;ve seen it &#8212; common desktop apps that are a year and a half out of date or something like that. Sorry I&#8217;m getting a bit hand-wavy here, but I&#8217;m sure if you browse Portage you&#8217;ll find something really stale, which binary distributions provide much more up-to-date. In general, I don&#8217;t think Gentoo is any better or worse than a binary distro.

### Gentoo builds are sometimes really broken

Other things I&#8217;ve written about are painful, but this is worse. Slow is bad, incorrect is worse. I can&#8217;t tell you all the programs I&#8217;ve seen behave bizarrely or crash after being built from source on Gentoo (and I stress I don&#8217;t do anything exotic with USE flags or compiler optimizations). Most programs work fine, it&#8217;s true, but some don&#8217;t. Here&#8217;s a partial list:

1.  Kexi was completely and bizarrely broken on my Gentoo box. Even though it was supposedly version 1.6.something, dialog boxes popped up saying version 0.8, large sections of functionality simply didn&#8217;t exist or didn&#8217;t work, and everything crashed constantly. I installed a *lower* version number on a binary distribution and everything worked like a dream. This was really strange; it was as though the Gentoo build was mixing together source from different trees!
2.  MySQL Administrator and MySQL Query Browser were similarly busted beyond all recognition. Yet when I downloaded the official builds from MySQL and ran them, everything worked flawlessly. I tried this multiple times on many different machines. Why can&#8217;t the Gentoo version &#8212; built from the same source, I assume &#8212; be made to work? Granted, it was masked in portage, but why should it be if the official builds work great?
3.  Perl&#8217;s MySQL support broke, then unbroke, then broke&#8230; I don&#8217;t know whether it was MySQL, Perl, or the DBI or DBD libraries (or something else). I couldn&#8217;t connect with `AutoCommit` disabled; it would throw an error saying &#8220;transactions are not supported.&#8221; I found a number of places where other people complained of the same problem, but never found a solution, and recompiling endlessly never fixed it. 
    *   **Update:** this is not Gentoo&#8217;s fault, it&#8217;s MySQL&#8217;s fault ([bug 21829][1]). The reason I&#8217;ve never seen it elsewhere is because other distributions choose a non-broken MySQL version. In this case I shot myself in the foot by choosing a broken MySQL.
4.  GRUB mysteriously broke one day after an upgrade. I could never get it to work again. It would start and then have an error, which I forget now, and drop into a command-line. I had to manually type the boot commands at the GRUB command-line every time I booted. I probably spent five or six hours trying to solve this too. Again I saw many other people had the same problem, and none of the tutorials or FAQs fixed it, even when they described the problem exactly.
5.  The madwifi libraries were flakey at best. Half the time when I booted, the Atheros module wouldn&#8217;t find the card because the device didn&#8217;t exist. I suspected something was wrong with my hardware, but then I switched distributions. Nary a problem since then.

Experienced developers will likely see this list and see I&#8217;m confused about the source of some problem, or &#8220;oh, you just need to do X&#8221; or something. Why does it take an experienced Gentoo developer to properly configure a Gentoo machine? Have you ever noticed that&#8217;s who gives the answers to the sticky problems on the forums? Users shouldn&#8217;t have to be C programmers to know how to configure their system. Unfortunately, when you run into these issues you do, as far as I can tell &#8212; and that&#8217;s a risk.

### Infinite flexibility and minimality are myths

Gentoo isn&#8217;t infinitely flexible, no matter how many USE flags there are. Here are two examples where you can&#8217;t get just some part of the required functionality.

The first is MySQL. You can&#8217;t just get the `mysql` client, or C libraries, which means you have to download and build the entire server if anything on your system needs MySQL support. For example, suppose you&#8217;re setting up a web server, which will run Perl web apps that talk to other servers running MySQL. You can&#8217;t just build Perl with MySQL support. You build `dev-perl/DBD-mysql`, and it depends on `dev-db/mysql`. Look at the ebuild:

<pre>DEPEND="dev-lang/perl
	dev-perl/DBI
	dev-db/mysql"</pre>

If you want anything to do with MySQL, you just installed a MySQL server, even if you wanted your web servers to be &#8220;minimal.&#8221; Other distributions let you get just the client programs or C libraries.

The next example is Samba. It&#8217;s much the same &#8212; you can&#8217;t just get Samba client libraries and programs, you install a Samba server too.

Even USE flags don&#8217;t give you full flexibility. For example, `mytop` will use ANSI color codes and hi-res time if there&#8217;s support for them, but it doesn&#8217;t really need them. However, they are listed as dependencies in Portage, so even though they&#8217;re optional for `mytop`, they&#8217;re not optional in Gentoo. In theory you could add USE flags for that, but in practice, you don&#8217;t get the choice. In theory, Gentoo is infinitely flexible, but in practice it&#8217;s not. This should not be a surprise.

I&#8217;m sure there are other examples, but I don&#8217;t want to get into it too much. I don&#8217;t mean to put down the developers&#8217; hard work, but in these cases this just doesn&#8217;t do what I want. I want a system that can talk to MySQL or Samba servers, without being one itself, and without having to compile all that extra code.

### It&#8217;s reinventing the wheel

As a distribution, Gentoo has been and continues to be great. I can&#8217;t thank the Gentoo people enough. But I personally don&#8217;t want to run any system that I can&#8217;t just install and run, with a modicum of knowledge and reasonable installation/configuration time. I&#8217;m not a &#8220;protect me from complexity because it scares me&#8221; person. I&#8217;m a &#8220;don&#8217;t make me do all this work, my time is scarce&#8221; person. I do not want to solve the same problems other people are solving, over and over. I want a distribution that solves the problems and gives me the result. If you don&#8217;t think Gentoo users reinvent the wheel thousands of times a day, go read the forums!

### Package staleness vs. flexibility vs. stable release cycles

Gentoo is all about choice and flexibility. While that is true, as I said infinite flexibility isn&#8217;t a reality. What you get instead is the ability to choose exactly which versions of packages you want (theoretically).

For example, if I use a binary distribution with regular &#8220;snapshot&#8221; releases and only security upgrades, I might be limited to versions 1, 2 and 3 of certain packages. Maybe I want those packages to be versions 2, 2 and 3, but when I upgrade to a newer release of my binary distribution, I can only get versions 2, 3 and 3. Gentoo will likely let me install exactly the versions I want.

That&#8217;s the upside of being able to mix and match versions of software. The downside is &#8220;infinite flexibility&#8221; really means much greater system complexity, when you consider the number of combinations of packages, versions, and interdependencies between them.

Binary or &#8220;snapshot&#8221; releases are much simpler and the packages can be much better tested with each other. Simple math shows this: if you have N packages in a release snapshot, you have a graph with potentially (N-1)^2 edges. If you have a distribution that lets you install many versions of a given package, say 5 on average (I think this is about right for Gentoo), you have (5(N-1))^2 edges in the graph &#8212; 25 times as many. In real numbers, Gentoo currently has 11453 packages in the Portage tree. A hypothetical snapshot release would have about 131 million package inter-relationships, while Gentoo with an average of 5 versions per package would have about 3.27 billion inter-relationships.

In practice, most of these packages aren&#8217;t installed and don&#8217;t actually interact with each other, so the number of relationships to test and integrate is much smaller, but you can see how the combinatorial explosion makes it much less likely that any given set of packages has really been installed widely and tested together widely.

Combine this with the fact that most binary distro users are using basically the same system, starting from the same installation CD, and you get an idea how much less variability there is in, say, people running the stable version of Ubuntu. A person who installs Gentoo, doesn&#8217;t tweak USE flags or other settings at all, syncs her Portage tree, and runs `emerge -uD world` probably ends up with an entirely unique system, different from any other system anywhere in the world. Just like a snowflake. That&#8217;s bad, not good.

Gentoo is like a continuously variable function, whereas a snapshot-based distribution is like a step function.

There&#8217;s something else I haven&#8217;t added into the mix: USE flags and compiler and CPU settings. I doubt your web browser has enough zeroes to express the combinatorial explosion that causes.

For this reason, I feel far less comfortable with building everything from source and continuously upgrading, than accepting something that&#8217;s a few months old but better tested.

This isn&#8217;t just theory. Many packages won&#8217;t even build unless you get everything just right. For example, a lot of &#8220;package won&#8217;t compile&#8221; forum entries are solved with answers like &#8220;you can&#8217;t build that with GCC 4.1, you have to upgrade to 4.1.1.&#8221; Who knew?

### While we&#8217;re on the subject&#8230;

Certain upgrades can be either difficult or impossible, depending on how much software you have installed. When the most recent &#8220;large&#8221; GCC upgrade appeared, I tried to put off upgrading my home desktop machine to it because I saw forum threads from people having huge problems. I thought maybe these would get ironed out over time. But then I needed to upgrade or install something myself, and it wouldn&#8217;t build with my current GCC version. The only option was to upgrade GCC, I think to 4.1.1.

&#8220;Nightmare&#8221; doesn&#8217;t really capture the experience. Everything broke, and I mean everything. It would have been far easier to just re-install the system from scratch &#8212; except that when you install your system, you get whatever GCC is on the CD, so you **still** have to complete the upgrade. When you go through one of these upgrades, you have to re-compile your entire system, *all at once in the proper order*. If it breaks partway through &#8212; which it will unless you&#8217;ve got a really minimal system (e.g. not a desktop machine) &#8212; you have to restart, because the dependencies and order of compilation really matters. And there&#8217;s no facility for only re-compiling the things that aren&#8217;t already re-compiled. After about three or four cycles of `emerge --emptytree world`, watch it break after eight or ten hours, read the forums and try something, restart only to have the same package break again, it was just too much for me. I switched to Ubuntu.

I&#8217;ve had a good bit of experience with other people&#8217;s installations too. I know of several servers at various sites that have bumped up against that GCC upgrade cliff. I have only seen it solved by rebuilding the machine from scratch, and upgrading the system *before* adding non-base-system packages in. I have seen servers remain in the queue a long time for that, as they can&#8217;t always be taken down and rebuilt at will. If you try to put it off, every time you try to change anything you&#8217;ll likely find its Portage tree is out of sync and refers to packages that don&#8217;t exist anymore, so you have to re-sync Portage, and then *tons* of stuff wants to be upgraded as a dependency. Sometimes I&#8217;ve seen machines get so stale they want to upgrade hundreds of packages, but that can&#8217;t happen or everything would bust. This is an ugly reality of life with Gentoo, as far as I&#8217;m concerned.

If you&#8217;re running a desktop machine on Gentoo, there are other painful upgrades too. My main home desktop machine somehow had no problems upgrading xorg to the modular distribution, but on another machine, I basically had to nuke xorg and install it from scratch &#8212; and then the modular builds failed, because they were really buggy and didn&#8217;t properly list all dependencies, etc (and when there are *over 300 modular xorg packages alone* to build, this is pretty ugly too). So everything failed and I didn&#8217;t have a graphical desktop. I&#8217;m okay working in that environment &#8212; I spend most of my day at a terminal anyway &#8212; but it&#8217;s nice to have a web browser. I could not resolve this, and spending days reading forums was simply not an option. I may have had that luxury in the past when I wasn&#8217;t really busy on other things (ha, ha), but not anymore. I ended up upgrading that machine to Ubuntu as well.

### Configuration management is tough

It&#8217;s really tough to get all your machines uniform. There are ways around it, but you still have to expend that effort, and it can be significant. I know of people who set up a build machine that will host binaries for other machines, such as white-box workhorses. This machine is a proxy for the others, and they sync up with it. You can also use `g-cpan` to manage Perl code in a separate Portage overlay, so you&#8217;ll have uniform Perl module versions too. But this is a fair amount of work no matter what, at least with the tools I know about.

That might only be feasible with cheap white-box workhorses. What if you need this same process for really expensive machines? Can you spare a really expensive machine big-iron server just to act as a build host? Even if you do, do all your machines have the same hardware? That&#8217;s kinda doubtful. Virtual machines are only a partial solution &#8212; a virtual machine isn&#8217;t the same as the server it runs on, and installing a virtual machine by definition makes the server different from the others in its &#8220;class.&#8221;

You might try documenting your install process. I guess you could get machines reasonably close to identical, as long as you have a single Portage tree you&#8217;re syncing against. (Whatever you do, don&#8217;t sync against the main Gentoo mirrors, or you&#8217;re finished before you start. It changes constantly.) I&#8217;ve personally had mixed success with this type of process. I don&#8217;t think it works as well as it might. There are still too many places to mess up, too many things that introduce variability between machines.

There are ways to deal with all this, but they require extra work, and are basically imposing a &#8220;snapshot release cycle&#8221; on top of Portage&#8217;s stream-of-consciousness continuous change, which is a wheel that&#8217;s been invented in almost every other distro out there. I think Gentoo is enough work already.

### When you have a problem, where is the problem?

When you&#8217;ve compiled everything from source, with your own USE flags, linked against your own libraries etc, you have a version of the software that&#8217;s different from anyone else&#8217;s anywhere else in the world. And when you have problems with that, you don&#8217;t know what the problem is. Is it a bug, or is it just your system?

You can&#8217;t always know. Based on my other experiences with things being broken, I am not prepared to say any Gentoo build isn&#8217;t subtly buggered.

For example, I&#8217;ve seen a business have trouble with MySQL replication. Is it MySQL, is it the way they&#8217;ve been doing replication, is it the setup and configuration, or is it that they have a broken MySQL build? I don&#8217;t know. They are not executing the same bits as anyone else. I don&#8217;t even feel comfortable submitting certain of their bugs as bug reports to MySQL because of this.

### I suggest using the official MySQL builds

One site using Gentoo recently decided to download MySQL&#8217;s official build and untar it instead of building it from Gentoo&#8217;s source tree. Preliminary results indicate this was a wise decision. For one thing, the official build seems to be getting dramatically higher throughput. There were queries that ran in 90+ minutes on Gentoo&#8217;s build, and after switching to the official build, ran in 20 minutes (granted, they also went from 5.0.21-log to 5.0.26-standard, but that isn&#8217;t the cause of the increased performance!). This is not the only indicator of better performance, as the disk activity increased significantly (by about 2x) on the official build too. That might indicate the CPU is being used much more efficiently. In fact, the official build seems to saturate the I/O, so the disk is now the bottleneck, which is as it should be in that site&#8217;s workload.

Regardless of whether you run Gentoo or a binary distribution, I generally advocate running the same bits as other MySQL users. I&#8217;ve chatted with dozens of people on IRC who are having trouble with broken builds from third parties, not just Gentoo users. The official builds are tested by thousands of people already, so the bits are much more likely to be good. And if there&#8217;s a problem, it makes it dramatically easier to troubleshoot and/or give good bug reports.

This has its downsides too. Getting other things in Portage to link against MySQL libraries, etc etc, without installing the MySQL package from Portage, can be non-trivial. You probably don&#8217;t want to install both, or you&#8217;ll never know what your programs are linked against.

### Conclusion

That&#8217;s a heck of a brain dump, but hopefully you can sort through it and glean something from it. I would summarize by saying any source-based, continuous-upgrade distribution is less likely to be well-tested and widely verified, the complexity is much higher, and it is probably much slower and more difficult to install, maintain and upgrade, and keep everything at the same configuration.

If you&#8217;re using Gentoo for a MySQL server, I would *at a minimum* install the official builds, not build from source. I don&#8217;t want to say what distribution to use for a MySQL server, but my personal experience has made me want to stay away from Gentoo.

But that&#8217;s just my opinion :-)

 [1]: http://bugs.mysql.com/bug.php?id=21829