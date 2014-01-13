---
title: Reacting to small variations in response time
date: "2010-05-26"
permalink: /blog/2010/05/26/reacting-to-small-variations-in-response-time/
categories:
  - Databases
  - Open Source
---
I wrote recently about [early detection for MySQL performance problems][1]. If your server is having micro-fluctuations in performance, it's important to know, because very soon they will turn much worse. What can you do about this?

The most important thing is not to guess at what's happening, but to measure instead. I have seen these problems from DNS, the binary log, failing hardware, the query cache, the table cache, the thread cache, and a variety of InnoDB edge cases. Guessing at the problem is very dangerous; you need diagnostic data. But it is often quite hard to catch a problem in action when you can only observe it in hindsight, and it happens only for a few seconds once or twice a week. This blog post is about how to detect small variations in performance, especially when it is most difficult to observe them.

Sometimes it's actually quite easy, so let's look at the easy cases first. Over time I have built up a collection of tricks and [tools][2] for catching a problem in action. The process of catching and diagnosing a lightning-fast performance problem looks like the following:

1.  Determine the symptoms of the problem.
2.  Determine how to observe the symptoms reliably and quickly.
3.  Determine how to gather diagnostic data for later.
4.  Set up tools or processes to do the above.
5.  Sift the collected data and diagnose.

This is 95% about figuring out how to observe the problem and gathering the data, and 5% about actually diagnosing. If you don't get the 95% right, you'll gather too little or too much data, or you'll capture it at the wrong time. Your job is hard enough; you won't be successful if you simply gather gigs of data for weeks at a time. You need to be as precise as you can. Here are some examples:

1.  There are normally very few connections to the server, but sometimes I start getting "Error: max_connections exceeded" or similar. *Solution: observe Threads\_connected from SHOW GLOBAL STATUS and react when it grows too large, or when you cannot log in to query Threads\_connected.*
2.  There are normally very few queries running, but we have a connection pool (and thus Threads_connected is constant). During the freezes, hundreds of queries show up in SHOW PROCESSLIST. *Solution: observe Threads_running from SHOW GLOBAL STATUS and react when it grows too large.*

You get the point. Find a simple metric and figure out how to capture it -- usually this is possible with a little bit of bash, awk, and grep. You might need to look for something specific in SHOW INNODB STATUS, for example, such as a large number of transactions in LOCK WAIT status.

But sometimes it's much harder. What if you simply can't observe the problem internally to MySQL? This does happen, especially when nothing changes except for response time. This was the case in the customer's system that I discussed in the "predicting performance problems" blog post linked above. Every single metric provided by MySQL itself stayed constant during the mini-freezes. The problem is that you can't get information on response time from within MySQL.

I ended up writing tools to help with this, of course. I'll show the results below.

If fluctuations in response time are the problem, then the way to observe it is to measure response time. This requires some care, because you don't want false positives, and a lot of my ideas were obviously vulnerable to false positives. I could cross them off right away. I can't trigger on unusually large or small numbers of queries, for example, because those just happen as the workload fluctuates through the day, and random user behavior naturally introduces variations too.

I ended up writing a tool to tail the slow query log file, which I set to zero so it captured all queries with microsecond precision. Once per second, MySQL writes out the current timestamp to the log file, so when I see that marker, I know that a second's worth of queries has passed by. I aggregate the last second's worth of queries (count, total time, average time) and print out a line.

This in itself does not provide a good way to know when something unusual is happening, but it gives the foundation for it. I took it slightly further: I kept a sliding window of the last 60 1-second averages, and took the standard deviation of those. If the current second's average response time deviates significantly from the average response time over the last 60 seconds, then something is wrong. "Significant" is pretty easy to measure with standard deviations, so that's where the real magic comes in. Let's see some samples of this.

First, here's a bit of the slow query log chopped into 1-second segments and aggregated:

<pre>
           Time        Total  Count          Avg    1-Min Avg  1-Min StDev        Sigma
100519 18:05:17     0.477078   2084     0.000229     0.000795     0.063251     0.008954
100519 18:05:18     0.264729   1823     0.000145     0.000756     0.061334     0.009960
100519 18:05:19     0.287641   1936     0.000149     0.000720     0.059481     0.009599
100519 18:05:20     0.213181   1619     0.000132     0.000691     0.058050     0.009641
100519 18:05:21     0.276063   1520     0.000182     0.000669     0.056806     0.008587
100519 18:05:22     0.289921   1963     0.000148     0.000642     0.055310     0.008936
100519 18:05:23     0.277754   1882     0.000148     0.000618     0.053983     0.008717
100519 18:05:24     0.337821   1900     0.000178     0.000598     0.052745     0.007963
100519 18:05:25     0.236592   1727     0.000137     0.000579     0.051682     0.008556
100519 18:05:26     0.257150   1488     0.000173     0.000566     0.050821     0.007727
100519 18:05:27     0.303697   1672     0.000182     0.000552     0.049908     0.007412
100519 18:05:28     0.182106   1416     0.000129     0.000539     0.049163     0.008346
100519 18:05:29     0.211202   1631     0.000129     0.000525     0.048347     0.008186
</pre>

The columns mean the following:

*   Time is the timestamp of this second's stats.
*   Total is the total response time within the sample, in seconds.
*   Count is how many queries were in that sample.
*   Avg is just the mean response time (Total / Count).
*   1-Min Avg is the one-minute moving average of response time.
*   1-Min StDev is the standard deviation of the average response times for each of the previous 60 seconds.
*   Sigma is the difference between this second's average response time and the 1-Min Avg, in standard deviations.

As you can see, most of the time the deviation between this second's average and the last minute's average is quite low. But when there's a meaningful fluctuation in performance, that changes pretty clearly. Here's a sample with a blip at 18:09:30:

<pre>
           Time        Total  Count          Avg    1-Min Avg  1-Min StDev        Sigma
100519 18:09:26     0.187038   1245     0.000150     0.000159     0.006844     0.001343
100519 18:09:27     0.269272   1697     0.000159     0.000160     0.006862     0.000178
100519 18:09:28     0.329386   1901     0.000173     0.000160     0.006895     0.001865
100519 18:09:29     0.350918   2017     0.000174     0.000161     0.006929     0.001881
100519 18:09:30     0.016610     73     0.000228     0.000161     0.006943     0.009537
100519 18:09:31     0.590175   2905     0.000203     0.000162     0.007074     0.005815
100519 18:09:32     0.384193   1879     0.000204     0.000163     0.007133     0.005783
100519 18:09:33     0.345033   2044     0.000169     0.000163     0.007133     0.000815
100519 18:09:34     0.289663   1793     0.000162     0.000163     0.007148     0.000255
</pre>

That was a fast one! It flew by too quickly to do much about. But it was also not a very large deviation, and could have been a false positive. In any case, I highly doubt that we would have caught anything meaningful by triggering a stats-collection process just then. Let's keep looking.

<pre>
           Time        Total  Count          Avg    1-Min Avg  1-Min StDev        Sigma
100519 18:10:05     0.209619   1578     0.000133     0.000181     0.009542     0.005044
100519 18:10:06     0.279070   1849     0.000151     0.000181     0.009546     0.003167
100519 18:10:07     1.152811   1624     0.000710     0.000189     0.010152     0.051257
100519 18:10:08     0.342763   1450     0.000236     0.000191     0.010188     0.004478
100519 18:10:09     0.200373   1452     0.000138     0.000190     0.010182     0.005155
100519 18:10:10     0.231888   1577     0.000147     0.000191     0.010190     0.004289
100519 18:10:13     0.000459     10     0.000046     0.000191     0.010241     0.014203
100519 18:10:14     0.001999      4     0.000500     0.000189     0.010139     0.030678
100519 18:10:15     0.165705    582     0.000285     0.000189     0.010151     0.009423
100519 18:10:16     7.129640   5104     0.001397     0.000251     0.024463     0.046854
100519 18:10:17     1.140011   2859     0.000399     0.000256     0.024555     0.005817
100519 18:10:18     0.325617   2240     0.000145     0.000255     0.024491     0.004460
100519 18:10:19     0.243101   1538     0.000158     0.000255     0.024510     0.003966
</pre>

Another relatively short blip but a bit longer. The mean response time really didn't deviate as much as my client was complaining about -- they were showing me New Relic transaction traces with 50-second waits. Maybe I could have caught something here, but I doubt that it'd be enough to separate the signal from the noise. Still, at this point you can clearly see how sensitive this technique is. The deviation in average response varies from a few thousandths of a sigma to a few hundredths. Let's keep looking for something more dramatic to use as a trigger:

<pre>
           Time        Total  Count          Avg    1-Min Avg  1-Min StDev        Sigma
100519 18:10:57     0.352336   2038     0.000173     0.000282     0.026701     0.004092
100519 18:10:58     0.260373   1692     0.000154     0.000283     0.026725     0.004817
100519 18:10:59     1.453306   1834     0.000792     0.000294     0.027073     0.018400
100519 18:11:00     0.264517   1658     0.000160     0.000295     0.027084     0.004989
100519 18:11:01     0.093991    953     0.000099     0.000294     0.027148     0.007203
100519 18:11:02     1.119373    469     0.002387     0.000306     0.027513     0.075629
100519 18:11:03     8.609779    291     0.029587     0.000395     0.038954     0.749383
100519 18:11:04     3.474422    103     0.033732     0.000435     0.040854     0.815026
100519 18:11:05     4.095386    111     0.036895     0.000483     0.043286     0.841211
100519 18:11:06    14.951602    131     0.114134     0.000647     0.065451     1.733932
100519 18:11:07     5.954177     52     0.114503     0.000720     0.068831     1.653074
100519 18:11:08    19.979373     53     0.376969     0.000952     0.096110     3.912385
100519 18:11:09     8.056343     16     0.503521     0.001047     0.100590     4.995285
100519 18:11:10    28.035963      7     4.005138     0.001380     0.138789    28.847777
100519 18:11:11     0.017634     69     0.000256     0.001400     0.139897     0.008182
100519 18:11:12    10.516826     20     0.525841     0.001548     0.145732     3.597660
100519 18:11:13    11.889159     50     0.237783     0.001687     0.151319     1.560253
100519 18:11:14     0.032239    138     0.000234     0.001685     0.151199     0.009599
100519 18:11:15    39.607576     38     1.042305     0.002164     0.204041     5.097713
100519 18:11:16    14.577523     40     0.364438     0.002397     0.215261     1.681870
100519 18:11:17    47.602524     34     1.400074     0.003094     0.278776     5.011118
100519 18:11:18     0.016022     84     0.000191     0.003180     0.282795     0.010570
</pre>

We totally hit pay dirt here. This period in the log corresponded exactly to one of the visible spikes in New Relic. There were extremely long queries in the log, and throughput dropped to the floor -- for an extended time. In the far right-hand column, Sigma is in the double digits. More experience showed me that on this particular client's workload, anything above 0.3 Sigma is a reliable indicator of a real performance problem. If that condition becomes true, then it's time to gather diagnostic data for a while. This is resistant to false positives from things like the occasional one-off long-running query.

After building this tool -- maybe 30 minutes of work or so -- I can see that I could have used other metrics instead. The number of queries per second (throughput) varies, just as response time does. And I probably could go back to the database and start watching Handler_ counters, or similar things like Innodb\_rows\_read, with the same technique. I wasn't able to see those things as possibilities because of the overwhelming amount of information to sift through before (and I still don't really know that they're going to show spikes and notches the same way, I'm just speculating; they might be really noisy and unreliable). However, focusing on response time is an accurate metric, because response time is what actually matters. Handler counters and rows-read counters are secondary effects that can lie, and there is never anything wrong with focusing on primary sources. Looking at secondary things is far too likely to present you with unreliable information, and you end up on wild goose chases that consume huge amounts of your client's time.

The tool I wrote for this task is crude, and not formally tested, but it's a great proof of concept. I think the next step is probably going to be something like revamping mk-loadavg (and probably renaming it!) to be able to capture load metrics and variations in a more flexible and meaningful way.

The end result on this case is at least two problems, by the way (we're still working on it). One was [DNS flakiness][3]. The server was not configured with skip\_name\_resolve, and when DNS stopped working for a short period, everything stopped working. After clearing that up, many but not all of the spikes in response time went away, and permitted me to see that InnoDB is also having trouble. It is actually quite common for multiple things to be going badly on a server, which makes a disciplined approach all the more important. Trial and error is a disaster in cases like these. Peter and I wrote a brief [whitepaper][4] about our approach, by the way. You might find it helpful if you are also facing complex performance problems.

 [1]: http://www.mysqlperformanceblog.com/2010/05/18/is-your-servers-performance-about-to-degrade/
 [2]: http://code.google.com/p/aspersa/
 [3]: http://www.mysqlperformanceblog.com/2008/05/31/dns-achilles-heel-mysql-installation/
 [4]: http://www.percona.com/about-us/white-papers
