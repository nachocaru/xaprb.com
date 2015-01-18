---
title: "Why Deployment Freezes Don't Prevent Outages"
date: "2014-11-29"
url: /blog/2014/11/29/code-freezes-dont-prevent-outages/
categories:
  - Programming
  - Operations
---

I have $10 that says you've experienced this before: there's a holiday, trade show, or other important event coming up. Management is worried about the risk of an outage during this all-important time, and restricts deployments from the week prior through the end of the event.

What really happens, of course, is that the system in question becomes booby-trapped with extra risk. As a result, problems are more likely, and when there there is even a slight issue, it has the potential to escalate into a major crisis.

Why does this happen? As usual, there's no single root cause, but a variety of problems combine to create a brittle, risky situation.

![freeze](/media/2014/11/freeze.png)

### Assumptions

When managers declare a freeze, they're not being malicious. They're doing something that seems to make sense. That's why it's important to understand the reasoning.

<!--more-->

The goal is simple: prevent breaking something that's working. And a lot of issues seem to trace back to a deployment that breaks a working system, so it's natural to want to avoid a deployment.

The assumptions, in my experience, are that

* the systems are working now
* systems break because of change
* restricting change will prevent breakage
* the riskiest change is deployment, so restricting deployment eliminates risky change
* potential downsides are less costly than potential outages

Unfortunately, the assumptions are wrong, which is why deployment freezes often have the opposite of the intended effect.

### Change Breaks Things

It's true that change breaks things, but that doesn't tell the whole story. The reality is that systems are always changing, even when you think they're not. And they're also broken. Right now. You just don't know it yet.

The first great lie is that you can stop systems from changing. You can't stop change. Shipping code is *not* the only change in a system. Unless the system is turned off completely, it's changing every instant. User requests are being served. Logs are being written. Cron jobs and other scheduled tasks are starting, running, and stopping. The system clock is advancing. There are also dependencies on other systems, which likewise are undergoing constant change. And there are requirements changes, which nobody ever thinks about.

Most of these changes happen all the time and nothing goes wrong, or humans adjust and fix things as a matter of course. But many of these changes actually expose corner-case bugs or weird problems that just aren't tickled often. As a result, you get the illusion that your systems are not broken. And that's the second great lie, because your systems *are* broken. You just don't know it yet.

What's broken? All sorts of things. Your Java runtime has a time bug that's waiting to throw it into an infinite loop when a leap second happens. Your website has a SQL injection vulnerability that nobody's exploited yet. A set of servers that you bought all together and installed at the same time has a ticking time bomb in the RAID controllers, which are all going to go into degraded self-test mode simultaneously. Your auto-increment integer column is  crossing the 2 billion mark right now, and will soon reach its max value.

The reality is that practically every running system is a ticking time bomb. You just don't know what's ticking or how long till it stops.

![clock](/media/2014/11/clock.jpg)

### Uncontrolled Change Is More Dangerous

As I said, I'm not demonizing your managers. They're actually right to think that deployments are riskier and are likely to cause breaking changes. That's because deployment is often a barely-controlled change.

Generally, the more automated (scripted) the deployment is, the safer. This is actually not because of the automation, but because of an effect of automation. With automated deployment in place, deployment usually becomes a more frequent process, which tends to exercise, expose, and remove sources of risk to a larger extent.

So the headline of this section is wrong, in a way. Uncontrolled change isn't what's dangerous. Infrequent change is the problem.

Wait! Isn't that precisely the opposite of what the managers are asking? Aren't they asking us to freeze deployments *in order to slow the pace of change and decrease risk?*  Yep, that's right. Their intuition is actually the reverse of the truth: to make the systems safer, they should be encouraging more deployments, not fewer.

Deplyoment freezes actually add risk. But that's not all. The deployoment freeze sets in place a vicious cycle that includes a couple of other effects and spirals down and down. Watch as I show you how the deplyoment freeze is only the first step in how we ambush the operations engineers.

![excellent smithers](/media/2014/11/raccoon.jpg)

### You Can't Freeze Deployments

Freezes never, but *never*, work. You can declare a freeze, but you can't make it happen.

This follows naturally from the inability to actually stop the systems from changing. Systems that change are going to break, and you have to respond to this.

There are other effects, too. Requirements change, for example. The catalog merchants went to the marketers and decided to offer a special promo. Buy a tablet and a case in combination with a warranty, and get a bluetooth keyboard free! Sounds great; we'll make a bundle -- let's print and ship those catalogs. Just in time for the holidays! Whoops, nobody told IT about this. Catalogs are printed already. We've got two weeks and there's no going back; we need the order-entry system and the website to support this promo. Bingo; forced change.

Whether it's a promo or a bugfix, something always has to be changed. So we always have to break the rule. This is why the rule inevitably ends up being *no deployments except for emergency changes.*

This is getting good. What's riskier than a change? An emergency change. What's riskier still? Undeployed code!

### Undeployed Code Is Inventory; Inventory Is Risk

The process of developing and deploying code is really a process of forking and merging your codebase. A developer writes a new version of the application, which diverges from what's running in production. The developer then merges it back in and deploys it to production, resolving the differences.

There are at least two key points where *inventory* of risk builds up in this process. The first is when the developer's codebase isn't merged into the main code yet. The longer this waits, and the more the code diverges, the riskier. Secondly, after merging and before deployment.

Code that has been merged and not deployed is a loaded gun. If I merge in my changes and don't deploy them, and you then merge and deploy yours, you've just deployed mine too. This was more than you bargained for. It's now more likely that your deployment will break something, and harder for you to fix if it does.

In a deployment freeze, two important things happen.

1. Lots of latent changes build up, ready to break the whole world when the freeze is lifted. *There is increasing risk of breaking the system after the freeze.*
2. Every developer's codebase, and knowledge of the codebase, is diverging from production. Development and QA environments typically are, too. As a result, when emergency changes have to be applied to production during the freeze, breakage is much more likely. *There is increasing risk of breaking the system during the freeze.*

### Frozen Systems are Inoperable

We've seen that the tip of the codebase is where the least risk has accumulated. The tip is where things work best. Frozen systems get further behind this tip, and therefore much riskier.

Infrastructure is code, too. Frozen systems also become incompatible with the current tip of environment configuration and infrastructure automation code. The result is that emergency deployments are often done outside of normal change control procedures, and the usual automation and deployment code can't be used.

To illustrate this problem, consider that app code and automation code are usually separate, although there is a dependency. This dependency is not properly versioned most of the time. Is your Puppet code version-controlled in lockstep with your application code, such that if you want to deploy a stale version of the app code, the deployment process will check out and use the older Puppet code? Would this even work, if it were possible -- can you just run old Puppet code on systems that have been advanced forward? The answer to both of these questions is likely no.

Imagine trying to drive your car without all the usual help you get from it: no mirrors, no gauges, no power steering, no power brakes. A car with all these things disabled is largely inoperable for most people.

A system that's stale in production for a month, while developers work actively on a bunch of unshipped changes, is in a similar state. Important controls, indicators, and assists are disabled. It's largely inoperable.

We've seen that a deployment freeze can't prevent the need for changes. Now we see that it forces the inevitable changes to be done in a much more dangerous way, seriously increasing the risk of problems. Looks like the freeze is not preventing the risk of an outage as intended!

### The Cost Of Deployment Freezes

The assumption is that the downsides of a deployment freeze are outweighed by the benefit of avoiding outages. I'm arguing that the benefit is much smaller than expected, and may even be negative. What about the costs?

Deployment freezes have a huge productivity cost. Huge.

When you can't deploy, you can't resolve the temporary tension in the system that results from changes that aren't merged or deployed. Many changes you make while developing the system have to go through a compatibility lifecycle: to mutate from state A to B, you must first go to AB, which is backwards compatible with A and forward compatible with B. Then you move from AB to B.

A simple example is adding a column to a table. You make sure the code ignores new columns, add the column with a default value, then make the code recognize and work with the new column, then remove the default value once it's no longer needed.

This kind of compatibility lifecycle represents a set of *dependencies* across time. If you've read The Goal, you know dependencies are bad for workflow. These dependencies become blockers for developers working on the code, and even for other developers and operations staff. If the dependencies are short-lived, it often isn't too bad. This is the case when you deploy a dozen times a day. But if the dependencies become long-lived, large portions of engineering slows down or stops completely. Projects have to be shelved until things can be deployed. Meanwhile, work that's been done on these projects becomes stale and creates conflicts with alternative work. It often has to be reworked later.

What was a local change and dependency becomes, given a little more time, a global blocker and waste of work.

This scenario is practically certain to happen. Deployment freezes crush productivity, often long beyond the duration of the freeze itself.

### What About Feature Freezes?

It's fairly common for large, complex, fast-moving systems to declare feature freezes in preparation for a major release. (Think of versions of operating systems or databases, for example.) However, this is different from a deployment freeze in a web appication.

The most important difference is that a deployment freeze is an attempt to branch the infrastructure, code/app, data, system state, and activity (customers/users). This is not branching one thing, but many interdependent things. This is practically impossible to do.

### Conclusion

Frozen systems can run as-is briefly, but then pressure to change them mounts steeply. The system grows stale, but things change anyway and force changes. These changes become much more difficult and dangerous, and the likelihood of an outage grows quickly.

Code freezes thus make systems more likely to break, while impacting productivity. Both the cost and the risk are much worse than intuition would suggest.

I believe that a focus on improving the processes by which changes are made, making smaller and more frequent iterations, and finding out and fixing breakage as soon as possible is a better way to the goal. But that's a different article

What have your experiences been? Let me know in the comments.

Image credits: [freeze](http://www.imdb.com/title/tt0118688/), [clock](https://www.flickr.com/photos/jlhopgood/6795353385/), [raccoon](http://memegenerator.net/instance/53212554)
