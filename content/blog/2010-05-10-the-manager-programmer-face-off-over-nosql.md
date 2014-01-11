---
title: The manager-programmer face-off over NoSQL
author: Baron Schwartz
layout: post
permalink: /2010/05/10/the-manager-programmer-face-off-over-nosql/
categories:
  - Commentary
  - SQL
---
A lot of conversations with a few different people I respect (no links, sorry) have coalesced some thoughts about these newly popular &#8220;non-relational&#8221; datastores. I wanted to point out an aspect I&#8217;m not sure is very clear in the hot-topic department. This is about what happens when managers learn that their developers or operations team have installed some new technology in their systems without them knowing it.

Lest anyone think that this happens only in a poorly-managed company, I can attest that it happens everywhere, all the time. Remember Marten Mickos&#8217;s favorite story about salespeople asking prospects if they used MySQL, the managers saying absolutely not, and the developers contradicting them?

The moment of discovery is unpleasant for the manager, but everything leading up to it was a joy for the programmer. He decided that he&#8217;s annoyed with the MySQL database. SQL is hard anyway &#8212; it is such a pain to write queries like &#8220;find the most recent article in each category.&#8221; Besides, things are already slowing down, and it&#8217;s obvious that this system is doomed unless someone takes action. Management is stuck in the mud and unwilling to hear about anything; they are so conservative! The programmer works late one night, or over the weekend, and gets Paprika (imaginary NoSQL database, I call dibs on the name) working. The site&#8217;s logs are now in Paprika. It&#8217;s harmless: just a proof of concept. It will be good to show the managers that this is a better way to do things, without actually risking any real functionality on the system.

The manager now finds out about it, and is seriously stressed. Developers, estimate how much stress you think this could cause for your manager, and then multiply by about ten. This is the kind of thing that can ruin your manager&#8217;s sleep, put stress on his marriage and family, and make him end up wanting to quit or fire you.

How can something so joyful for the developer &#8212; productivity at last &#8212; be so opposed to the needs of the management and business? Let&#8217;s see what the programmer thinks is good about this new technology:

*   I finally got to learn something cool! I keep reading on makemysitescale.com how all the cool kids are solving their problems, but if I don&#8217;t rebel, I&#8217;ll never get to use any of these techniques and technologies!
*   I get to do something new! Yay! My ordinary life is so boring!
*   I get to put this on my resume!
*   I get to be the only one in the company who knows about this. I get to strut a bit during lunch break! I can talk casually about it, like it&#8217;s no big deal. They&#8217;ll all envy me even more.
*   This is excellent job security for me!

Which of these things don&#8217;t make the manager stressed out? If you&#8217;re a manager, you&#8217;re looking at a nightmare. Think about it the manager&#8217;s point of view:

*   This system is impossible to hire for. There are about a billionth the number of people on the job market who know Paprika, as those who know some SQL.
*   Most people&#8217;s skills and experience will not transfer to this system at all. I can&#8217;t train anyone how to use this.
*   Commercial support and consulting are either nonexistent or very limited.
*   Documentation is inaccurate and scanty. Every Google result is talking about something that doesn&#8217;t exist in the newest releases, because this thing has changed every three months for the last year.
*   I don&#8217;t know where this project/product is going in the future. The project&#8217;s developers seem excited about the openness of the roadmap &#8212; I do not share their enthusiasm.
*   I can&#8217;t figure out how to write a query against this. How do I data-mine my logs? I&#8217;ve got to find someone who knows how to write a map-reduce function in Prolog or some wacky thing like that. There is no graphical interface, and I can&#8217;t plug my Business Objects or Crystal Reports into it.
*   I can&#8217;t monitor this system. I can&#8217;t measure what it is doing. There are little or no tools for managing it. I don&#8217;t know about its performance characteristics, and no one else does either; we can&#8217;t capacity plan. How do we do backups and restores? Under what cases can it crash or corrupt its data, and what do we do then? My operations team is crippled.
*   I have a rogue developer who thinks he&#8217;s got job security because of this, and he&#8217;s obviously interested in building his resume. He&#8217;d better be, if he knows what&#8217;s good for him, but I can&#8217;t fire him until I fix this mess. All I can do is hope he stays until I do.

What a disaster from management&#8217;s point of view! I recently heard about a case pretty similar to this, except that unfortunately the hot-shot coder did leave the company for a cooler job, and management was twisting in the wind with a system they could not support.

If I were hiring a team of developers, I think I&#8217;d interview them with the question &#8220;how cool is Paprika?&#8221; and mark them down for too-enthusiastic answers.