---
title: Is agent-based or agentless monitoring best?
date: "2008-08-21"
url: /blog/2008/08/21/is-agent-based-or-agentless-monitoring-best/
---
Rob Young has posted a few blog entries lately on the MySQL Enterprise monitoring software. His latest post claims that agent-based monitoring is equivalent to extensibility ([MySQL Enterprise Monitor: Agent = Extensibility][1]).

I think this is conflating two completely distinct properties of a monitoring solution. [Cacti][2] is extremely extensible, with a plugin-based architecture and templates and all kinds of other goodies; yet it is not agent-based (actually it lets you choose -- now that's extensibility). [innotop][3] is not agent-based, and it's extremely extensible too. Basically everything inside innotop is a lookup table of anonymous subroutines and data structures that you can tweak pretty much infinitely with plugins and configuration files that get merged into the running code dynamically. Extensibility is completely orthogonal to whether the architecture is agent-based. What about WordPress? It's ridiculously extensible and it has nothing to do with agents.

So now that we've clarified that, what can we say about agent-based or agentless architectures? Which is better?

<!--more-->

It depends. What do you want to do? How big is your system? How close to real-time do you need? What other properties do you need?

### Scaling? Need precision?

One claim might be that agent-based software scales better because it reduces the number of network connections. You have all these agents running independently on each monitored system; they collect the data they need to and that relieves the central system of doing it. Now, the theory goes, there are fewer connections between the central system and the monitored systems. Except that this completely misses the point: the agents have to connect to the central system to report their results (or be connected to and queried for results) -- you don't save any connections this way. So that's not a valid argument.

**Note:** I do realize that some of the viewpoints I mention are absurd. I'm mentioning them because I've heard people earnestly say them as though they could be true. So hold the flame-throwers for just a bit&#8230;

Next we might point out the time-sensitive nature of monitoring. If you're going to collect stats every minute, you may want them done exactly on the minute. A non-agent-based monitoring system may have to reach out to these remote systems and query for results, then wait; you could easily see each one-minute cycle beginning to take more than a minute with many systems! In fact, this is a problem with Cacti. Monitor too many systems (or monitor them in a silly way) and you can get overlapping executions. But this isn't really about agent-based or agentless either, is it? It's just about multi-threading, or the lack thereof. Systems that poll in sequence will always suffer from this problem. Doing it asynchronously is much smarter.

Here I want to be careful to point out that if you need to measure each system exactly on the minute, even asynchronous polling won't save you. Get enough multi-threading going, and you can run into problems with too many threads, too. So there's something to be said for agent-based monitoring if you have a lot of systems.

This also feels like a good time to mention that the [MySQL Cacti templates][4] I wrote will make your Cacti monitoring a lot more efficient -- they get all their info in one go, so they don't make many silly repeated calls to the MySQL server. (This is accomplished via some caching code that works around Cacti's limitations.) And lest we forget, this type of monitoring generally does not need to be real-time or even close to it. Some of what the MySQL Enterprise Monitor can do *does* need to be precisely timed; but Cacti monitoring does not.

So if you need precise time-sensitive monitoring on a lot of systems, you might want to think seriously about agent-based monitoring. (By "a lot" I probably mean on the order of hundreds of servers.) However -- all that data still has to come back to your central monitoring system somehow, so there's no silver bullet; as long as you have a centralized monitoring system **you will have scaling limitations**. The only way around this is to decentralize, and I don't know of a system capable of doing that today. I'm sure commenters will set me straight if I'm wrong.

### Management overhead

On the other hand, you might also think seriously about the risks and management overhead of agent-based systems; what happens when you have 1000 servers each running an agent, consuming 1000 times however much memory and other resources, and opening 1000 security holes simultaneously when a flaw is found? What if the central system dies -- is your agent-based system smart enough that the agents don't all have to be reconfigured to talk to its replacement? Have you ever run a large-scale agent-based system of any type? What about a large-scale agentless system? These are the questions you should be weighing for yourself.

Personally I like polling if possible, and I want my servers to be absolutely bare-bones, especially if they are exposed to the Internet. For example, I don't permit anything such as SNMP to be running on those servers. I want SSH and nothing else. Anything that wants to talk to that system and get information from it can SSH in and execute some standard Unix commands, like `cat /proc/vmstat`, and work from there. Standard Unix user-management, and sudo, can lock down precisely what that SSH user is permitted to do.

### It's all marketing anyway

Going back to Rob's post, there are a number of other claims about the benefits of agent-based monitoring, including "Minimal connections to the backend MySQL database" and "Application data sharding across replicated slaves." I'm skeptical that these things can't be achieved without an agent running (what does that last one even mean, in the context of a monitoring app?) I think I can (and to some extent I have done this already) build systems with these properties without agents. It strikes me that MySQL has taken a lot of hard questions about why they went with an agent-based architecture, and there's some stiff competition from agentless systems who shall not be named -- the post sounds a little defensive, if you ask me.

In a funny way, I think it's kind of because they had a product on the market before the unnamed competition; they chose an agent-based architecture; now the competition is taking potshots at them. If they'd chosen agentless, I bet someone would have built an agent-based system, then pointed at them and snickered and put "we're agent-based!" in their marketing materials. Everybody's got a right to market. It's not as though any of these "X method is best" claims is objective. It's all a matter of convincing people that what you're trying to sell them has value.

### Summary

So what's my opinion?

For small to medium-sized installations, I like the combination of Nagios and Cacti.

For anything above that, I don't believe a truly fantastic solution exists yet.

What I've seen of the MySQL Enterprise Monitor has not overwhelmed me, and it's special-purpose -- if I monitor my MySQL servers with that, then I have to have something else to monitor all my other servers, like my mail server and my LDAP server and so on. If That's just more work for me. And yet, I can't presently get all the MySQL fanciness I want with these more-generic systems. So, I conclude you currently cannot have your cake and eat it too.

 [1]: http://theopenproductmanager.blogspot.com/2008/08/mysql-enterprise-monitor-agent.html
 [2]: http://www.cacti.net/
 [3]: http://code.google.com/p/innotop/
 [4]: http://code.google.com/p/mysql-cacti-templates/
