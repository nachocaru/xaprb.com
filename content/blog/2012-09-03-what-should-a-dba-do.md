---
title: What should a DBA do?
author: Baron Schwartz
layout: post
permalink: /2012/09/03/what-should-a-dba-do/
categories:
  - SQL
---
I was thinking recently about what a DBA does, and decided to blog about what I think a DBA could/should do. Most DBAs I know are mired in day-to-day firefighting and time-consuming tedium. This forces them to operate in reactive mode (because they don&#8217;t have enough time to &#8220;get caught up&#8221;), and keeps them from more valuable things they *could* be doing. Here&#8217;s my short and incomplete list:

1.  Working with the developers (programmers) to help architect upcoming projects. If the DBA leaves design to the developers, then suboptimal designs might be found after the fact. This often happens after deploying to production, where the design impacts the business. Without early input, the DBA also has no chance to assess and prepare for future needs. 
    *   Teaching developers how to work with the database. Many developers struggle to understand databases and SQL, and are unable to fully optimize the queries they write. They also unwittingly write programs with security flaws that could give attackers access to the entire database. Education is a big part of prevention. 
        *   Capacity planning and management. If the DBA doesn&#8217;t have enough time to do routine work, he can&#8217;t prepare for the future. He needs to ensure that the servers are going to be fast enough and have enough storage space for what&#8217;s next. 
            *   Planning and executing upgrades. It&#8217;s very important to stay up-to-date, but if you upgrade carelessly, you may hit serious problems. Upgrades take a lot of time and attention, and if you don&#8217;t have that, the business is at risk whether you upgrade or not. 
                *   Business continuity planning and fire drills. Backups are only a small part of the overall BCP process. It takes a lot of time and thought, and it&#8217;s never finished. </ol> 
                    A DBA who&#8217;s overworked on tedious tasks gets tunnel vision. He can&#8217;t think strategically, he can&#8217;t protect the business from risk. Critically, he can&#8217;t help the business make the most of other investments, such as the developers. A DBA who&#8217;s freed from those things is a resource and an enabler, a critical asset for strategic and tactical planning on upcoming changes to systems, and a risk reducer &#8212; able to stop a lot of problems before they get worse, or even before they start.
                    
                    Some of this is about tools. DBAs with good tools can manage at least an order of magnitude more servers than one with poor/no tools. I know some DBAs who manage hundreds of servers and treat it as unremarkable. They usually have excellent tools to help them, whether self-developed or gotten elsewhere.