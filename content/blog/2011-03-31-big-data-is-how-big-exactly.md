---
title: Big Data is how big exactly?
date: "2011-03-31"
permalink: /2011/03/31/big-data-is-how-big-exactly/
categories:
  - Commentary
  - SQL
---
I see that "Big Data" has become the new buzzword with a spike of hype around it. Everyone's jumping on it. Companies are eager to promote their products as "Big Data," just as they were eager to be associated with Web 2.0, Service-Oriented Architectures, and all the rest. Predictably, there's basically zero agreement on what it means.

I've seen "Big Data" mentioned in the context of 1TB, which I think is rather moderate sized. But worse yet, I've seen 100GB labeled Big Data. I've even seen 5GB labeled Big Data. No links &#8212; I don't want to draw attention to them.

I don't know what Big Data is, but the stick-of-gum-sized flash drive in my pocket holds 16GB. It's pretty Small. I mean, I forget it's even there &#8212; it's definitely not Big. I don't know where I'd draw the line, but if it fits in a commodity server's memory, which 100GB can do easily these days, it's not Big Data. I don't even think that 1TB is Big &#8212; again, it's only twice as big as commonly available servers can fit in RAM. In fact, most things in the MySQL world aren't Big Data if they run on a single server, and I'm not sure I'd call a large sharded data store Big Data either &#8212; just a bunch of Small Data sitting next to each other. I might make an exception to my no-MySQL-allowed rule of thumb for technologies like InfoBright, which starts to hit its stride in the low-to-mid tens of terabytes of data. That's entry-level Big in my opinion. This is completely arbitrary, but I'd say 100TB is Big Data in my mind, because it is a couple orders of magnitude bigger than commodity RAM capacities. Ask me a few years from now, and I'll probably say a petabyte.

The lack of definition of Big Data is characteristic of hyped buzzwords. It's why nobody can refute anyone's claims. I think a good guiding principle for marketing might be "don't associate yourself with something that you can claim despite it being unverifiable." This might go along with "don't brag about things your competitors can also claim."

Edit: oh my, I just realized that one of Percona's webinars had "Big Data" in the title. Busted. It was Continuent who proposed the webinar and picked the title, but still&#8230; the pot calls the kettle black!
