---
title: More details about SchoonerSQL performance, please!
date: "2012-02-02"
url: /blog/2012/02/02/more-details-about-schoonersql-performance-please/
categories:
  - Databases
---
Schooner has a [blog post][1] showing that one node of their product beats 9 nodes of Clustrix's in throughput. But this reduces everything to a single number, and that's not everything that matters. If you've looked at [Vadim's white paper][2] about Clustrix's (paid-for) performance evaluation with Percona, you see there is a lot of detail about how consistent the throughput and response time are.

I'd love to see that level of details in any product comparison. A single number often isn't enough to judge how good the performance is -- fast is not the only thing that matters.

I have absolutely no doubts that a single node of Schooner's product can run like a deer. It isn't doing any cross-node communication, after all, so it had better be faster than something that blends multiple nodes together into a virtual "single database server." And I think if the full story were told, it would be a great knock-down drag-out fight. Give us more details, Schooner!

 [1]: http://schoonerha.blogspot.com/2012/02/one-schoonersql-node-is-equavalent-to-9.html
 [2]: http://www.percona.com/redir/files/white-papers/clustrix-tpcc-mysql-benchmark.pdf
