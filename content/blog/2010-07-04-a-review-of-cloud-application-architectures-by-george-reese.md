---
title: A review of Cloud Application Architectures by George Reese
date: "2010-07-04"
permalink: /blog/2010/07/04/a-review-of-cloud-application-architectures-by-george-reese/
categories:
  - Databases
  - Reviews
---
<div id="attachment_1938" class="wp-caption alignleft" style="width: 190px">
  <a href="http://www.amazon.com/dp/0596156367?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2010/07/cloud_application_architectures.gif" alt="Cloud Application Architectures" title="Cloud Application Architectures" width="180" height="236" class="size-full wp-image-1938" /></a><p class="wp-caption-text">
    Cloud Application Architectures
  </p>
</div>

[Cloud Application Architectures][1]. By George Reese, O'Reilly 2009. (Here's [a link to the publisher's site][2]).

This is a great book on how to build apps in the cloud! I was happy to see how much depth it went into. It's short -- 150 pages plus some appendixes -- so I was expecting it to be a superficial overview. But it isn't. It is thorough. And it is also obviously built on his own experience building very specific applications that he uses to run his business -- he isn't preaching about stuff he doesn't know first-hand. Finally, George Reese is a good writer! It's impressive. This is how he covers so much ground with so much depth in so few pages, and it all makes sense. He takes a side trip every now and then, but it's always in the right place at the right time -- how to do a snapshot for backups, for example -- and isn't distracting. For a technical book, it has an amazing narrative flow.

The book begins with an intro to cloud computing in general, with definitions and an explanation of different models, plus cost estimates of traditional IT, managed hosting, and cloud computing for an app. There's a brief overview of the Amazon platform. This book is mostly about Amazon, and states that up front. There are references and comparisons to other providers throughout, and later there'll be two appendixes on GoGrid and Rackspace, each written by a representative of that company. I was happy that the author brought in people to write those, instead of doing it himself. They are non-promotional in nature, and quite short. That adds value to the book, which would have been fine without them, honestly.

Back to chapter two now -- a deeper introduction to Amazon, moving through all the major components, but especially EC2, S3, and EBS. Here we also start to see a focus on the platform as a whole -- availability zones, security, redundancy, reliability. These topics are treated fairly and woven into every chapter. It's clear that the author doesn't want to isolate these topics, but rather explain them in context so your mind is always on them as each new topic is introduced. Chapter 3 picks all this up again: considering a move into the cloud? More cost comparisons, more explanations of concepts such as availability and how they translate into the Amazon cloud. Performance, disaster recovery and a few other topics show up here.

Chapter 4 is about how to build an app in the cloud: web app design, making multiple machines work together, handling failure, building AMIs, privacy, and operating databases (especially MySQL) in the cloud. The privacy section is particularly good. I'd recommend this to anyone building an app that might process personally identifiable information or financial information, in or out of the cloud. And as I said already, this is one of the types of things he weaves into the whole book. Chapter 5 picks right up and keeps going: it's about security. Data security, regulatory compliance, network security, host security, how to respond if there's a breach. And then Chapter 6 is on disaster recovery: planning, implementing, managing.

Chapter 7 is titled "scaling," but it's more than that. It starts with capacity planning. Here's one of my favorite quotes: "some think they no longer need to engage in capacity planning&#8230; [others] think of tens or hundreds of thousands of dollars in consulting fees. Both thoughts are dangerous myths&#8230;" There's a reference to [John Allspaw's excellent book on capacity planning][3]. (I saw that he was a tech reviewer for this book, too.) This chapter covers how you predict and provision for capacity needs in the cloud, including the "automatic scaling" holy grail, how it can bite you, and how to keep that from happening. It also talks about how you scale vertically in the cloud. It doesn't talk about why [it's hard to really be sure about your capacity needs in the cloud][4], but that's okay given the other material covered in the chapter.

And that's it! After this, it's 3 appendixes. One is an AWS reference, and then there's the two on GoGrid and Rackspace.

What's to criticize? Well, not a lot really. I read every word in this book, I promise. Here's what I noticed: he talked about database corruption from unexpected shutdowns -- he should have said "use InnoDB," because that's pretty much a MyISAM problem. He talked about taking backups from replication slaves -- he should have said "don't just trust replication, verify it with mk-table-checksum." I also think he encourages a little too much trust that cloud providers are always magically going to have the capacity you need; it felt a bit naive, but this is actually a fundamental point in whether you're going to use the cloud or not. Nobody knows how much excess capacity Amazon has, and as we know, [weird things happen][5]. But if you're going to embrace a cloud platform, you're going to have to trust to a certain extent.

A couple other things to nitpick: in Chapter 1, when talking about availability, he writes "[if] even 1 minute of downtime in a year is entirely unacceptable, you almost certainly want to opt for a managed services environment&#8230; [if] 99.995% is good enough, you can't beat the cloud." But these numbers are unrealistic and don't have enough context to explain what he means. Finally, in a couple of places he talks about algorithms for generating unique identifiers and dealing with concurrent access, but these don't have a deep enough explanation to prevent novices from shooting themselves in the foot with wrong assumptions such as *a timestamp will always increase between each subsequent access.* But a savvy developer will recognize those problems and won't be bitten.

This book is the first one to go onto [my list of essential books][6] in a while. I'll be keeping this one on my own bookshelf.

 [1]: http://www.amazon.com/dp/0596156367?tag=xaprb-20
 [2]: http://oreilly.com/catalog/9780596156374
 [3]: http://www.xaprb.com/blog/2009/10/24/a-review-of-the-art-of-capacity-planning-by-john-allspaw/
 [4]: http://www.xaprb.com/blog/2010/06/01/under-provisioning-the-curse-of-the-cloud/
 [5]: http://en.wikipedia.org/wiki/Northeast_Blackout_of_2003
 [6]: http://www.xaprb.com/blog/essential-books/
