---
title: Great things afoot in MySQL 5.5
date: "2010-04-19"
permalink: /blog/2010/04/19/great-things-afoot-in-mysql-5-5/
categories:
  - Databases
---
I haven't been blogging much about the changes in MySQL for a while. But the MySQL and InnoDB engineers have been doing a ton of work over the last couple years, and now it's seeing the light of day, so it's time to offer words of congratulations and appreciation about that.

I was holding my breath for a big-splash 5.5 GA announcement at last week's conference, but I was wrong. Still, [there's a lot to talk about in 5.5][1], with a dozen or more substantial blog posts from the InnoDB and MySQL teams alone over the last week or so! Here are a few choice tidbits of the good, the bad, and the ugly.

### InnoDB is the default storage engine

"No big deal," I thought. "Serious users do this anyway." But then Morgan Tocker pointed out that it really is a big deal. This is going to cause a sea change in the way MySQL is used. Instead of growing up on a storage engine that doesn't give a damn about your data (MyISAM), and then learning about one that does (InnoDB), users will be plunged into a much more advanced and complex storage engine from day one. We're going to be seeing a lot more people learning internals, a lot more pressure on InnoDB's seams, a lot more of everything InnoDB. And a lot less MyISAM. Instead of "why would I switch from MyISAM to InnoDB?" we'll be hearing "I hear there's this MyISAM thing, when should I use that?"

This was a very smart move on MySQL's part.

### InnoDB improvements

This is a mixed bag. Some improvements are awesome. Some look like improved implementations of the changes in XtraDB, which is also awesome.

In the "we peeked at XtraDB" department, I'm thinking about improvements to recovery time, a separate purge thread (inspired in XtraDB by a Sun employee's patch), and changes to enable multiple rollback segments. The concepts for these are proven by XtraDB users to be tremendously effective in the real world, and I am hopeful that InnoDB has done a great job of implementing the concepts. The changes to recovery seem even better than Yasufumi's work, although it's not clear yet whether InnoDB's recovery is really any faster than XtraDB's. InnoDB took a tremendous leap forward by implementing these changes.

I am not that thrilled with multiple buffer pools. This looks to me like saying "it's a hard problem and we don't know the best solution, but how about we try this classic idea." The buffer pool is already hard to manage (can't be resized at runtime, can't pin a table or index into it&#8230;) and it looks like this doesn't improve that. Instead, it looks like a zero-sum game with respect to really advancing the internal architecture, done solely for performance reasons, and I think it's a local optimization that won't be very future-proof. I predict this will be changed somewhat in the future. Unless other problems with the buffer pool are fixed, any future enhancements to multiple pools will probably have ugly problems such as fragmentation. I know it's not very helpful for me to criticize without offering suggestions, but the truth is I'm aware that all my suggestions would be hand-waving ("avoid mutexes on global structures," duh).

The work on splitting up mutexes is complex and I don't have an opinion on it yet. Benchmarks are great, but the real world often holds unpleasant surprises. So we'll see about the true performance changes. I know InnoDB has done a ton of work on this, but it seems to me that Percona had reasons not to do things the way InnoDB did. The great thing about this is that if InnoDB's approach suffers in some workload, then Percona will be able to construct a benchmark to show pretty graphs about it!

The async I/O worries me; I/O is not well instrumented, and that's a complex change. Yet another mysterious thing that can behave badly and be difficult or impossible to understand.

I suspect that delete buffering can go completely off the rails, in the same ways that insert buffering can. At the time of writing, there is only very crude control over the buffering mechanism. There is no way to control how large the buffer is, or make InnoDB unload the buffer in the background (XtraDB lets you do those things). But I would not be surprised if InnoDB is working on this limitation. I think this is a very low-hanging fruit. The behavior of the insert buffer is utterly bizarre sometimes ("I ran STOP SLAVE, why the heck did my completely idle server start flushing tens of gigs of data to disk and become unresponsive for half an hour afterwards?") The implementation is just silly: you cannot prevent the insert buffer from putting pressure on the LRU list and forcing things out of the buffer pool that you really want there. And [Yasufumi's last slide on his presentation][2] showed clearly how the lack of control over the buffer causes performance problems in InnoDB, and makes XtraDB beat even the newest InnoDB versions in some benchmarks.

### Performance Schema

I'm completely unimpressed with Performance Schema, and have been from day one. It was an ivory-tower project created and developed in secret, and it bears no evidence of input from people with practical experience. What I see is useless for normal people; it's useful only for MySQL and InnoDB developers, and not even a good solution for them. If you read around the blog posts and docs about it, you find a lack of any practical examples -- and IMO that's because it's not possible to create good examples of how it can be useful. Instead, you see phrases such as "trace issues back to the relevant file and line in the source code so you can really see what's happening behind the scenes." I'm not the only one; [Robin Schumacher panned it too][3].

### Conclusions

I am really heartened to see MySQL not only continuing to work really hard on the server and on InnoDB, but also to see all the hard work from the last few years finally become available where it can be reviewed, praised or criticized, and put into production. I think that it's time to take Don MacAskill's praise of Percona last year ("[great things are afoot][4]") and pass it over to MySQL and InnoDB! I hope the pace of development, *and getting it out the door*, continues as it is now.

 [1]: http://dev.mysql.com/tech-resources/articles/introduction-to-mysql-55.html
 [2]: http://en.oreilly.com/mysql2010/public/schedule/detail/12660
 [3]: http://en.oreilly.com/mysql2010/public/schedule/detail/13366
 [4]: http://don.blogs.smugmug.com/2008/12/23/great-things-afoot-in-the-mysql-community/
