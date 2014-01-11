---
title: Big Data is how big exactly?
author: Baron Schwartz
layout: post
permalink: /2011/03/31/big-data-is-how-big-exactly/
categories:
  - Commentary
  - SQL
tags:
  - Big Data
  - Hype
  - Infobright
---
I see that &#8220;Big Data&#8221; has become the new buzzword with a spike of hype around it. Everyone&#8217;s jumping on it. Companies are eager to promote their products as &#8220;Big Data,&#8221; just as they were eager to be associated with Web 2.0, Service-Oriented Architectures, and all the rest. Predictably, there&#8217;s basically zero agreement on what it means.

I&#8217;ve seen &#8220;Big Data&#8221; mentioned in the context of 1TB, which I think is rather moderate sized. But worse yet, I&#8217;ve seen 100GB labeled Big Data. I&#8217;ve even seen 5GB labeled Big Data. No links &#8212; I don&#8217;t want to draw attention to them.

I don&#8217;t know what Big Data is, but the stick-of-gum-sized flash drive in my pocket holds 16GB. It&#8217;s pretty Small. I mean, I forget it&#8217;s even there &#8212; it&#8217;s definitely not Big. I don&#8217;t know where I&#8217;d draw the line, but if it fits in a commodity server&#8217;s memory, which 100GB can do easily these days, it&#8217;s not Big Data. I don&#8217;t even think that 1TB is Big &#8212; again, it&#8217;s only twice as big as commonly available servers can fit in RAM. In fact, most things in the MySQL world aren&#8217;t Big Data if they run on a single server, and I&#8217;m not sure I&#8217;d call a large sharded data store Big Data either &#8212; just a bunch of Small Data sitting next to each other. I might make an exception to my no-MySQL-allowed rule of thumb for technologies like InfoBright, which starts to hit its stride in the low-to-mid tens of terabytes of data. That&#8217;s entry-level Big in my opinion. This is completely arbitrary, but I&#8217;d say 100TB is Big Data in my mind, because it is a couple orders of magnitude bigger than commodity RAM capacities. Ask me a few years from now, and I&#8217;ll probably say a petabyte.

The lack of definition of Big Data is characteristic of hyped buzzwords. It&#8217;s why nobody can refute anyone&#8217;s claims. I think a good guiding principle for marketing might be &#8220;don&#8217;t associate yourself with something that you can claim despite it being unverifiable.&#8221; This might go along with &#8220;don&#8217;t brag about things your competitors can also claim.&#8221;

Edit: oh my, I just realized that one of Percona&#8217;s webinars had &#8220;Big Data&#8221; in the title. Busted. It was Continuent who proposed the webinar and picked the title, but still&#8230; the pot calls the kettle black!