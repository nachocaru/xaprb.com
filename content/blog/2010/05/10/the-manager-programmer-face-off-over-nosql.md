---
title: The manager-programmer face-off over NoSQL
date: "2010-05-10"
url: /blog/2010/05/10/the-manager-programmer-face-off-over-nosql/
categories:
  - Commentary
  - Databases
---
A lot of conversations with a few different people I respect (no links, sorry) have coalesced some thoughts about these newly popular "non-relational" datastores. I wanted to point out an aspect I'm not sure is very clear in the hot-topic department. This is about what happens when managers learn that their developers or operations team have installed some new technology in their systems without them knowing it.

Lest anyone think that this happens only in a poorly-managed company, I can attest that it happens everywhere, all the time. Remember Marten Mickos's favorite story about salespeople asking prospects if they used MySQL, the managers saying absolutely not, and the developers contradicting them?

The moment of discovery is unpleasant for the manager, but everything leading up to it was a joy for the programmer. He decided that he's annoyed with the MySQL database. SQL is hard anyway -- it is such a pain to write queries like "find the most recent article in each category." Besides, things are already slowing down, and it's obvious that this system is doomed unless someone takes action. Management is stuck in the mud and unwilling to hear about anything; they are so conservative! The programmer works late one night, or over the weekend, and gets Paprika (imaginary NoSQL database, I call dibs on the name) working. The site's logs are now in Paprika. It's harmless: just a proof of concept. It will be good to show the managers that this is a better way to do things, without actually risking any real functionality on the system.

The manager now finds out about it, and is seriously stressed. Developers, estimate how much stress you think this could cause for your manager, and then multiply by about ten. This is the kind of thing that can ruin your manager's sleep, put stress on his marriage and family, and make him end up wanting to quit or fire you.

How can something so joyful for the developer -- productivity at last -- be so opposed to the needs of the management and business? Let's see what the programmer thinks is good about this new technology:

*   I finally got to learn something cool! I keep reading on makemysitescale.com how all the cool kids are solving their problems, but if I don't rebel, I'll never get to use any of these techniques and technologies!
*   I get to do something new! Yay! My ordinary life is so boring!
*   I get to put this on my resume!
*   I get to be the only one in the company who knows about this. I get to strut a bit during lunch break! I can talk casually about it, like it's no big deal. They'll all envy me even more.
*   This is excellent job security for me!

Which of these things don't make the manager stressed out? If you're a manager, you're looking at a nightmare. Think about it the manager's point of view:

*   This system is impossible to hire for. There are about a billionth the number of people on the job market who know Paprika, as those who know some SQL.
*   Most people's skills and experience will not transfer to this system at all. I can't train anyone how to use this.
*   Commercial support and consulting are either nonexistent or very limited.
*   Documentation is inaccurate and scanty. Every Google result is talking about something that doesn't exist in the newest releases, because this thing has changed every three months for the last year.
*   I don't know where this project/product is going in the future. The project's developers seem excited about the openness of the roadmap -- I do not share their enthusiasm.
*   I can't figure out how to write a query against this. How do I data-mine my logs? I've got to find someone who knows how to write a map-reduce function in Prolog or some wacky thing like that. There is no graphical interface, and I can't plug my Business Objects or Crystal Reports into it.
*   I can't monitor this system. I can't measure what it is doing. There are little or no tools for managing it. I don't know about its performance characteristics, and no one else does either; we can't capacity plan. How do we do backups and restores? Under what cases can it crash or corrupt its data, and what do we do then? My operations team is crippled.
*   I have a rogue developer who thinks he's got job security because of this, and he's obviously interested in building his resume. He'd better be, if he knows what's good for him, but I can't fire him until I fix this mess. All I can do is hope he stays until I do.

What a disaster from management's point of view! I recently heard about a case pretty similar to this, except that unfortunately the hot-shot coder did leave the company for a cooler job, and management was twisting in the wind with a system they could not support.

If I were hiring a team of developers, I think I'd interview them with the question "how cool is Paprika?" and mark them down for too-enthusiastic answers.
