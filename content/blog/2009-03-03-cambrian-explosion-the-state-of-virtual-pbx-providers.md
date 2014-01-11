---
title: 'Cambrian explosion: the state of virtual PBX providers'
author: Baron Schwartz
layout: post
permalink: /2009/03/03/cambrian-explosion-the-state-of-virtual-pbx-providers/
categories:
  - Commentary
  - Internet
tags:
  - Internet
  - telephone
  - Virtual PBX
---
My employer has been looking for a company who can provide us with phone service designed for a decentralized, virtual-office consulting and support workforce, and after extensive surveying of the options, *every single one* comes up short on features, quality, or support. You can have one or sometimes two, but not all three, and we don't really see signs of it getting better. There's a real race to the bottom in this industry. We've had to get creative to make things work. (It is working, but I'll get to that later.)

Right now I think there are [too many immature providers][1] in this space, none of them really doing what's needed. It looks to me like there's an enormous untapped market just waiting for some company to get it right. I predict that whoever does that will wipe the floor with their competition, and a lot of them will go out of business and leave a few giants behind.

I think we're a little bit different from the target market these companies are after (though I think we're part of a larger unrecognized market that's under-served at present). We're not your typical company, but I suggest that we are ahead of our time; in ten years, a lot of companies will look like us.

### Call routing and scheduling

We want a customer or potential customer to be able to pick up the phone and call our toll-free emergency number day and night, and get connected to the on-call person wherever they are in the world. To make this happen, we're currently using a vendor who supports flexible scheduling and something called call-blasting. One person is on-call. The phone system needs to call that person first. If the person picks up the phone, the phone system asks them to press 1 to accept the call. Pressing 1 completes the circuit and that's the end of the story.

If the on-call person doesn't pick up and acknowledge in a certain time period, the system simultaneously calls a selected group of others (call-blasting). Whoever picks up first and accepts the call gets connected to the caller.

The on-call person and the standby group need to be scheduled with great flexibility. Ideally, we'd like an API for the scheduling, so we can simply schedule on-call and backup groups in our internal systems, and communicate that to the service provider.

In the event that the system cannot get anyone to accept the call, it should drop the caller to voicemail, send the voicemail as an email attachment to our issue tracking system, and SMS alert another selected group of people. This shouldn't have to be done, but we currently use this as a paranoid backup measure.

As our team grows, we will change what we're doing. We might have multiple people on-call, and perhaps route based on originating location and/or daylight or working hours, so you get connected to someone close to you and don't wake anyone up. Or we might choose a different strategy, such as automatically calling through to the smaller group who's already assigned to you (for existing customers), based on caller ID and whether it's working hours for that group. We may also have a person whose job it is to accept calls and route them the correct place (we do not want to do callbacks; doing a callback introduces more chances for something to go wrong). The point is &#8212; as we grow, we'll need a better solution. The current solution is working for us because we're engineers and we can make it happen through cleverness, but it won't scale to hundreds of team members.

This system of routing and scheduling is not solvable by any simple means; it needs a lot of intelligence and flexibility. Currently the most feature-rich providers on the market barely meet some of our criteria, and they don't meet our future needs at all. Most providers don't even start to meet our current needs. For example, most of them don't support scheduling or call-blasting.

### Quality of service

Another mandatory aspect of this system is quality of the connection. Getting an international call from a person with an unfamiliar accent and perhaps limited ability to speak English is a challenge. Just trying to get names, email addresses, and IM names to begin a text chat is often very difficult. A poor connection makes it much harder, and in some cases literally impossible.

As far as I can tell, the reason we can't get quality of service is that a lot of providers try to route calls over the public Internet, which provides no guarantees about quality of service. VOIP traffic is not like other traffic. You can't just retry failed packets or route them different ways and then re-assemble them in the right order later. VOIP is near real-time. If packets are dropped, you have to forge on ahead. Otherwise the speech is completely unintelligible. If you have a poor quality connection, such as you get with the public Internet infrastructure, you basically get unusable phone calls. Anyone who uses Skype or similar over long distances knows what I mean here. Our provider's QoS is generally much worse than Skype for international calls.

So providers really need their own dedicated network infrastructure, separate from the public Internet, running on their own equipment (not rented and resold from another provider). Most providers completely fail this test. Why? It's very expensive to own or rent dedicated fiber across the country, much less across the world. That leads me to my next point.

### Price

Everyone's trying to compete on price and (in many cases) features. That pretty much excludes quality of service. It's a race to the bottom in terms of prices, with one or two exceptions. There are a few companies who have higher prices, and everyone gripes about them price-gouging.

I think people are living in a fairy tale here. You get what you pay for. Every little one-person web design LLC owner who's posting on blogs and forums wants every imaginable feature *and quality of service* for $30 per month. This is a pipe dream! But the worst part is &#8212; most companies are trying to provide the features and low price, and ignoring the fact that there are a lot of companies who do not see "low price" as a value.

These providers need to step back and realize that the market holds a lot bigger players. There are giant internationals who are going to be decentralizing (if they aren't already) in the next ten years. If there were a company ready to handle it, I wouldn't be surprised to see Fortune 100 companies outsourcing their telephone services pretty soon. Virtual offices and decentralized workforces are the future. Just look at where things have been going in the last 5 years alone. The Internet is changing the game, and there's a huge opportunity here for someone smart enough to see it. And this will be expensive, and sometimes a company has to say "sorry, you can't get what you want for $30 a month." For whatever reason, that's not happening.

The other effect a price war has is on support.

### Support

I believe you can't get good service for free. Sure, there are economies of scale. And for a company that manages to achieve a Six Sigma level of quality on a large scale, the law of large numbers probably means a relatively low and constant need for support, even though each individual customer may rarely or never need support.

But if you're paying $30 a month for your service in an industry that's in a desperate price war, from a provider who's focusing on feature development to try to keep their subscribers, what do you think the profit margin is? I might be wrong, but I would bet that it's less than ten percent &#8212; maybe a few dollars a month. Even at 50% margins, $30 a month isn't enough to provide good support. The moment you email, open a ticket, or pick up the phone to call for support, you've just blown the provider's profit on you. You're losing them money.

And that's why these companies don't provide good support. That's why you open a ticket with them, and they ask you for some ridiculous information that *you need them to find out*, and they auto-close the ticket after 72 hours (72 hours? Yep) with an inane message about how you didn't provide the requested information so the incident is considered to be finished. *Good* support would be bending over backwards to debug why your calls didn't get connected or why you got a really terrible connection or why the scheduling feature went AWOL and calls went into /dev/null. *Good* support would be helping answer the question "why were there X number of calls per month forever, and then in this particular time period it dropped to 1/10th of that level and then came right back to its previous level? What the hell happened?"

But *good support costs money* and if you're trying to scrape by on a few percent profit margin, you hire people in foreign countries for ten dollars a day, don't train them, and don't give them any means or incentive to actually resolve issues that arise. This is why people who want it all for a few tens of bucks a month are causing their own problems.

But &#8212; and here's the kicker &#8212; there's no option to pay anyone more if you want to. You can't call up and say "you know, I really want premium features, quality of service, and excellent support. I'm fully prepared to pay many hundreds of dollars a month to have my cake and eat it too." These companies have built themselves around a wholly different paradigm. They don't know how to answer that request.

There's a market for cheap service with lots of features, *but it's not the only market*.

### Why not Asterisk, etc etc?

Why not host our own service?

For the same reason we don't generate our own power, build our own cars, and have our own dairy farms for the milk on our cereal each morning. This is a utility, although no one seems to acknowledge that yet. It's a problem that needs large infrastructure investments and will only work well at scale. There's no way I know of to get what we need without that infrastructure.

I could be wrong, but I don't think there's any chance of getting good quality of service by hosting our own Asterisk server. Remember, we're talking about no centralized office at all &#8212; international calls from and to anywhere in the world. It would have to be routed over the public Internet, and we'd be doomed to terrible call quality. Plus we'd have to invest heavily in our own equipment, developing the features we need, etc etc. I think the list of downsides is pretty much endless.

If I'm wrong, please convince me!

### Making it work

I won't bore you with the gory details of how we're running a reliable service on top of an unreliable infrastructure. It's a lot of work, and there are a lot of workarounds. It's basically the same principle as getting reliable communication across an unreliable network &#8212; you build a process that has redundancy and lots of alternate channels and so on. You recognize that things will happen and make sure there's a means of recovery. It's partially process, partially technology, partially recognizing that these are humans, and you can do certain things to make it easier for the humans on each end of the conversation to get their needs met.

But I will say this: I wish we didn't have to do it. I wish we could get the ear of one of the companies who has a high-quality infrastructure, and tell them that if they'll build the features, we'll be there to buy them at a premium price. Or tell one of the companies with the huge feature list and crappy performance and support, that if they want to go rent a bunch of the dark cable and buy their own equipment and then charge a premium on it, we'll be ready to pay for that.

I wish we could get one of these companies to partner with us and gather our requirements, write a contract, and promise to provide what we need at a defined point in the future for a defined amount of money.

### Someday

I'm sure this will all work out someday. But for right now, it feels like we're in the bad old days when every railroad in America had [different gauges][2], and freight had to be unloaded and transferred between railroads. Until rail was recognized as an industry that benefited from economies of scale and cooperation, things were pretty inefficient.

Building virtual PBX as a utility service will remove a huge barrier to building companies such as ours, and a lot of good will come from that. A more connected world is a world with [more opportunities][3] for the individuals who are connecting.

 [1]: http://en.wikipedia.org/wiki/Cambrian_explosion
 [2]: http://en.wikipedia.org/wiki/Rail_gauge
 [3]: http://www.amazon.com/Outliers-Story-Success-Malcolm-Gladwell/dp/0316017922?tag=xaprb-20
