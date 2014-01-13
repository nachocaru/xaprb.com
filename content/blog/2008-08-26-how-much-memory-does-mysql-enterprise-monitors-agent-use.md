---
title: "How much memory does MySQL Enterprise Monitor's agent use?"
date: "2008-08-26"
url: /blog/2008/08/26/how-much-memory-does-mysql-enterprise-monitors-agent-use/
categories:
  - Databases
  - Open Source
---
After last week's post on [agents versus agentless monitoring systems][1], I got a lot of email. One, from a customer whose name I am not permitted to mention, sent me the following action shot (posted with permission):

![MySQL Enterprise Monitor Memory Usage][2]

<!--more-->

Over half a gigabyte; more than twice what MySQL itself is using. So, that raises an interesting question. How much memory would you say your server's [MySQL Enterprise Monitor][3] agent uses? No bashing allowed, tell the truth. And please post if your agent runs in a small amount of memory, too.

Another thing I'm interested in: what factors contribute to the high memory usage? Under what conditions does it use a lot or a little? What can you expect, generally speaking?

On another note, I think it's almost unfair not to mention the competition, so I will: I was playing with [MONyog][4] 2.6 recently and it started to use a lot of CPU. I think it might be architecture-specific (amd64 Ubuntu) but I can't be sure. It was using 170% CPU on my dual-core system to monitor 2 instances.

 [1]: http://www.xaprb.com/blog/2008/08/21/is-agent-based-or-agentless-monitoring-best/
 [2]: http://www.xaprb.com/media/2008/08/mysql-enterprise-monitor.jpg
 [3]: http://www.mysql.com/
 [4]: http://www.webyog.com/
