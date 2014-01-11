---
title: 'Seeing things from the user&#8217;s point of view'
author: Baron Schwartz
layout: post
permalink: /2013/03/04/seeing-things-from-the-users-point-of-view/
categories:
  - Commentary
  - SQL
---
I was discussing how to avoid surprising users and someone pointed out that what seems intuitive and rational to one person is often complete insanity for others. The mental gap between a developer and a user can often be a chasm far too wide to cross. Of all the bug reports I&#8217;ve filed against MySQL, [here][1] is my all-time favorite:

> `select * from t where a >= 1.0order by a;`
> 
> Does not cause an error. I believe it should, because there should be a whitespace before ORDER BY.

Similar syntax errors such as &#8220;`select 1e0from dual`&#8221; were also accepted as valid SQL. Much soul-searching later, the official reply from MySQL&#8217;s development team:

> The server behaves properly here:  
> - &#8220;1&#8243; alone can not be an identifier, because it&#8217;s followed by a &#8220;.&#8221;  
> - therefore, the lexer parses &#8220;1&#8243; as the beginning of a number, and ends up with &#8220;1.0&#8243; as one token.  
> The next token will be &#8220;order&#8221;, a keyword.
> 
> There is nothing special to document here either. What was reported is not a bug in the server, and is not a documentation bug.

What just happened here? It&#8217;s fairly simple. Never attribute to malice that which can be adequately explained by tunnel vision. The developer decided that the SQL isn&#8217;t a syntax error because the lexer is designed to parse it. If the developer were able to stand in a user&#8217;s shoes for a moment, this answer would be obviously absurd. But when you live deep in the dungeons of a large codebase, you lose the ability (despite your best intentions) to see a normal user&#8217;s point of view.

For this reason I often doubt my own judgment. I&#8217;m ignorant of my ignorance. It&#8217;s a very &#8220;meta&#8221; problem. I have to rely on others to give me a sanity check. 

I suggest, as a topic of discussion, that the willingness and ability to accept others&#8217; judgment over one&#8217;s own is an essential characteristic of good leadership. I also suggest that knowing when this is appropriate is another attribute a good leader must have. Both of these are very difficult in my experience.

 [1]: http://bugs.mysql.com/bug.php?id=44833