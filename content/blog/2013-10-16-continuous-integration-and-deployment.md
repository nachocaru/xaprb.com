---
title: Continuous integration and deployment
date: "2013-10-16"
permalink: /2013/10/16/continuous-integration-and-deployment/
categories:
  - Databases
  - Operations
  - Programming
---

I've been talking to some smart people about deployment. First a little background. One of my colleagues was working on a project that ultimately didn't bear fruit. It was a system for continuous delivery, and involved reacting to `git push` by building and shipping to production. But it felt as if the problem shouldn't be separated from provisioning, and from setting up a development environment, and so these things got folded in, and the effort became a boil-the-ocean project that had to be set aside. 

During this process I came to appreciate my colleague's point of view on topics such as how software should be deployed and how it should be designed to run in its environment. A lot of this is encapsulated in [The Twelve Factors][1]. In fact, I actually created and deployed to a Heroku app, and experienced firsthand why people love Heroku. 

At Velocity this week, we're talking a lot about resilience, operations, and so on. Introducing change is often one of the things that exposes failure modes in our products, and this fragility is probably more likely to show up during deployments than almost any other time. But there's not a lot of discussion at Velocity about deployment -- that vital part of the engineering process where we take code from development and mutate our production environment to include it. 

I started asking some people about this, because I need to resume the deployment effort at my own company. A few people gave me pointers to prior art to look at, but some other people told me it's not a solved problem for them either. I'll include some of that information in this post. 

But first I want to write my current thoughts about this subject, to get it on record and to stimulate more conversation. Later I'll follow up after I've learned more. 

It's a little difficult for me to organize my thoughts coherently, so I'll just drop a list on you: 


*   I want continuous deployment because if it's not a part of the culture at the company, we'll engineer ourselves into a corner away from it and it'll get more and more difficult to ship code rapidly later. Tools are vital; rules can't overcome the natural reluctance (or just lack of incentive) to push code to production. I also want continuous deployment for a few reasons that might be obvious to readers. First, small, incremental changes are a lot less risky. Second, it is a positive feedback cycle. Third, code that's written but not serving customers is inventory that I've paid for but not benefited from (and neither are customers). The cost of this inventory is very real; this is a philosophy expressed well in Eli Goldratt's book *The Goal*.
*   Code should be deployed when it's merged to master/HEAD and all tests passed. It's a good question whether it should be deployed completely automatically, or whether it's good to let people batch together some changes. I favor the latter. We might not want to deploy every typo fixed. We don't want the batches to accumulate, though, or deployment gets really scary and risky. Visibility into whose changes, and what they are, is important for this scenario. Approval by all involved is also important.
*   I don't want to build all of this infrastructure myself. I want to use external providers as much as possible. I prefer to buy or rent rather than build, because I won't do the job as well, and it's not my core business. I don't want to engage in "undifferentiated heavy lifting," to quote someone smart at Netflix.
*   However, there's a tension here. External providers must be a convenience, not in the critical path. If one or more external providers is down, that can't be a hard block on a deployment. The last thing I want is to have downtime I can't fix because someone else has downtime too. As an example, I want to continue to use Github and CircleCI, but I don't want to make them SPOFs. But if I have an alternate, less-used deployment route, that's also a problem; there should only be one deployment system, or the fallback will fail when I need it. I think the solution is to make Github and CircleCI trigger deployment, but only as one possible source of triggers.
*   Deploying binaries with restarts is very different from source code deployments, and there are other types of deployments that need to be considered as well. Deployment to stateless resources (a web server) is a lot simpler and less risky than deploying to something that is stateful, or affects something stateful such as a database server. There's also the matter of migrations. From my experience with lots of large companies, migrations are simplistic and I've never seen them scale beyond toy applications. But taking them out-of-band means the system is not completely self-documenting, and may not be runnable unless some change or other requirement is satisfied, which can only be performed and verified by a human. These are concerns I don't know how to resolve.
*   Although it's tempting to put manifests (Procfile) and include provisioning (and even scaling) in the deployment process, I think it's better to put a strong barrier between those. Otherwise we'll end up with a hairball that can't be dealt with separately. System provisioning and configuration to prepare an environment to be deployed into is not part of deployment. Similarly, there needs to be some thought about a service directory to register and mutate the state of the overall system, such as taking apps in and out of proxies and load balancers before, during, and after deployments. That might need to be part of deployment, or the provisioning, or both.
*   Most of the services I've seen for deployment want to imagine that the world is all on Heroku, where a deployment is a `git push`. Unfortunately, as nice as that is, it isn't going to work. The other thing many of them offer is "we'll run your Capistrano jobs" -- but that's also not workable, because allowing external hands to poke into our systems is not an option. Agent-based deployment is preferable. I have good experience with this, even with self-upgrading agents. There are some companies (Distelli) that do something reasonable here.

Thoughts from other people I talked to include: 

> We think about this basically all the time at [company]. The difficulty is that organizations build their own because there's a likely corollary to Conway's Law here: deployment and development infrastructure are context sensitive, so therefore organization sensitive.

And Jez Humble offered this: 

> I wrote a <a href="http://www.amazon.com/dp/0321601912" target="_blank">book</a> on the topic, plus I <a href="http://continuousdelivery.com/" target="_blank">blog</a> and <a href="http://continuousdelivery.com/talks/" target="_blank">speak</a> about it a bunch.
> 
> You also want to check out Michael Nygard's <a href="http://www.amazon.com/dp/0978739213/" target="_blank">Release It!</a> and his <a href="http://www.youtube.com/watch?v=Luskg9ES9qI" target="_blank">stuff</a>, which is extremely awesome 
>
> There are some <a href="http://continuousdelivery.com/2013/05/videos-from-the-continuous-delivery-track-at-qcon-sf-2012/" target="_blank">talks</a> from the continuous delivery tracks at various conferences (including from <a href="http://www.youtube.com/watch?v=JR-ccCTmMKY" target="_blank">Etsy</a>) 
>
> I'm running a conference which talks about continuous delivery, lean UX, devops and related stuff: <a href="http://flowcon.org/flowcon-sanfran-2013/schedule/index.jsp" target="_blank">http://flowcon.org/flowcon-sanfran-2013/schedule/index.jsp</a></blockquote> 

I look forward to your thoughts and links to further study. Thanks!


 [1]: http://12factor.net/

