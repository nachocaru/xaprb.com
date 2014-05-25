---
title: The Goal
date: "2014-05-24"
url: /blog/2014/05/24/the-goal/
categories:
  - Programming
  - Reviews
---

Once upon a time I managed several teams of consultants. At a certain stage of the organization's growth, we wanted to achieve a higher billable-time utilization more easily, and we wanted more structure and process.

Cary Millsap, about whom I have written quite a bit elsewhere on this blog, suggested that I might profit from reading [*The Goal*](http://www.amazon.com/Goal-Process-Ongoing-Improvement/dp/0884271951/?tag=xaprb-20) by Eliyahu Goldratt. I will let history be the judge of the outcome, but from my perspective, this was revolutionary for me. It is a clear watershed moment in my memory: I lived life one way and saw things through one lens before, and afterwards everything was different.

![Horse Race][horserace]

*The Goal* helped me relate what I had learned about performance in the computer context --- queueing theory, system optimization, computer architecture, and so on --- to organizations. It taught me that, at least in some senses, humans and their interactions form systems that obey fundamentally the same laws as computer components. This is not to dehumanize people and treat them as components. Far from it: *The Goal* helped me to organize my thoughts and knowledge about computers by giving me human analogies. It helped me deepen and strengthen my intuition about how things work.

I will summarize some of the main points of *The Goal* in this article, but I encourage you to read the book. It is a parable in the form of a novel, similar in some ways to Daniel Quinn's [*Ishmael*](http://www.amazon.com/Ishmael-Adventure-Spirit-Daniel-Quinn/dp/0553375407/?tag=xaprb-20) or Dan Millman's [*Way Of The Peaceful Warrior*](http://www.amazon.com/Way-Peaceful-Warrior-Changes-Lives/dp/1932073205/?tag=xaprb-20).

### Background

At the time I read *The Goal*, the consulting group was experiencing tremendous demand, overcommitment to an explosion of inititatives that were too many and varied to execute well, and cash flow challenges. As for myself, I was not only leading the consulting team, but also serving as the main salesperson and an executive at large.

The first response to the pressures on the organization was to grow it by hiring quickly.
As a seasoned manager might guess, this amplified many of the problems. In a nutshell, *the organization was not scalable* and there was chaos at every turn.

![Chaos][smoke]

Reading *The Goal* gave me the first surge of hope I'd had in a while. Acting on it solved many problems: some immediately, some long-term. Some things I saw clearly could be improved but was unable to effect the changes I wanted. But the first benefit was hope where I had been hopeless.

### Summary of The Goal

*The Goal* introduces the Theory of Constraints, a process of business
improvement. It's a novel about business process optimization, centered around a
factory that's always losing money and missing deadlines.
The manager solves these problems by understanding the true goal of the
factory.

What did he learn?

The goal of a business is to

  - make money by increasing net profit,
  - while simultaneously increasing return on investment,
  - and simultaneously increasing cash flow.

All three are necessary.  To accomplish these, the
business needs to

  - increase throughput,
  - while simultaneously reducing inventory,
  - and simultaneously reducing operating expense.

These terms have specific meanings.

  -  Throughput: the rate at which the system generates *money*
     through sales.
  -  Inventory: the *money* the system has invested in
     purchasing things to sell.
  -  Operating expense: *money* spent to turn inventory into
     throughput.

Note that all of these are in a common unit, money. Inventory, for example, is not a physical concept, it's monetary. These definitions describe a model of a business as a system of monetary throughput:

  - money entering the system
  - money contained inside the system
  - money leaving the system

Achieving the business's goal requires maximizing the money coming in, minimizing money leaving, and minimizing money that's absorbed into the system. It's that simple.

It surprises the manager to learn that his factory's goal is the same as the
business's goal (his factory is a smaller part of a larger business). This is a
general principle: each component's goal is the same as the system's goal.

Now that we have a cogent model of a business and its goals in the starkest possible terms, it is necessary to understand what constrains or limits it in each of these dimensions.

![Chain][chain]

There are two primary and strongly related factors, both of which affect business processes: dependencies and variations.

* Dependencies, or dependent events, are things that have to happen before other things can happen.
* Statistical variations are variations in start times, stop times, or durations of events.

Variations cause unpredictability, and dependencies cause unpredictability to accumulate and cascade through the system. The only way to keep throughput stable at the process's output is to have excess capacity and buffers in the system. The traditional wisdom of trimming capacity to fit demand (in an attempt to cut waste) will increase the system's unpredictability, drop throughput, and increase inventory. These work against the business's goal.

This is nothing more than queueing theory, but much more simply explained than usual.

_The Goal_ introduces a process of continuous improvement towards
the business's goal.  Simplified, it is basically identifying bottlenecks, finding ways to exploit them, prioritizing that, and then looking for the next bottleneck. This is the Theory of Constraints.

### Optimizing The Consulting Teams

The process of improvement above sounds incredibly obvious, and it is once you see it. After all, I'd been doing the same thing in systems performance optimization for years. The magic is in understanding the meaning of constraints, variations, dependencies, throughput, inventory, and so on as it relates to the organization and its processes.

While studying *The Goal* I frequently put the book down and excitedly noted things that had just occurred to me. For example, I created a massive list of constraints. These were always things that had frustrated me, but I'd never seen clearly how badly they impacted the organization until I considered them as constraints. To list a few:

* Timezone differences
* Unsatisfied prerequisites such as access to the systems where work was to be performed, or availability of a consultant with the required skills
* Communication delays
* Interruptions
* Transitions between available/unavailable, such as travel or vacation time

There were many more, perhaps several dozen. I was on an airplane while doing much of this work, and I remember bursting with excitement. I just couldn't wait to start fixing some of the problems that were suddenly so obvious.

One of the clearest problems was that I was a huge constraint myself. I was dependent on many things in the business, and I made a lot of the business dependent on me in turn. For example, I would dedicate myself full-time to consulting when there was too much demand, and when demand slacked, I would stop working with customers and make sales calls. The result is ridiculously obvious in hindsight, but while I was in the midst of it, I couldn't see how I was causing the entire organization's workload to overcorrect in giant swings of the pendulum, from too much demand to everyone being practically idle. Hiring a salesperson was the key to solving this problem, so that variations in the sales process were eliminated. The operative word there is "variations."

![Dependencies][dependencies]

Another major theme that jumped out at me was the ways in which the lack of process was causing problems with inbound work, inventory, and throughput. Lack of process caused a lot of variation in work, and lack of knowledge-sharing caused dependencies amongst people, projects, and teams. Lack of process was either at the root of problems, or intimately involved in them. As I recall, I did not identify a single constraint that could not be improved by better and more consistent processes. For readers who are interested in this line of thought, I can suggest the book [*The E-Myth Revisited*](http://www.amazon.com/E-Myth-Revisited-Small-Businesses-About/dp/0887307280/?tag=xaprb-20) by Michael Gerber.

### Conclusion

*The Goal* helped me reduce the complexity of a large consulting group and its attendant business processes and pains to simplest possible terms --- things I could understand and relate clearly to myself and to others. The principles and concepts that weave through *The Goal* are easy to grasp and easy to work with, but at the same time there's little danger of over-simplification.

As an aside, *The Goal* contributed directly to the thought processes that led to my founding VividCortex, and to crucial breakthroughs such as defining a [system fault](https://vividcortex.com/blog/2014/04/24/fault-anomaly-detection/) in terms of throughput, inventory, and operating expense. You can read more about this in a [blog post][perfmgmt] explaining how and why VividCortex is different from a monitoring system.

Photo credits: [horse race](https://www.flickr.com/photos/kingstongal/6011726882/),
[smoke](https://www.flickr.com/photos/almostinfamous/4603824077/),
[chain](https://www.flickr.com/photos/intherough/3470183543),
[chain-link fence](https://www.flickr.com/photos/willmontague/3813295674/).

[perfmgmt]: https://vividcortex.com/blog/2014/04/21/monitoring-is-dead-long-live-performance-management/
[horserace]: /media/2014/05/horse-race.jpg
[smoke]: /media/2014/05/chaos.jpg
[chain]: /media/2014/05/chain.jpg
[dependencies]: /media/2014/05/chain-link.jpg
