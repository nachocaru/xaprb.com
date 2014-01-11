---
title: 'Speaking at Strata NYC: Making Big Data Small'
author: Baron Schwartz
layout: post
permalink: /2013/08/18/speaking-at-strata-nyc-making-big-data-small/
categories:
  - Conferences
---
I&#8217;m off to my first [Strata][1] conference, and I&#8217;m speaking! I&#8217;ve always wanted to attend Strata. (OSCON too, but I haven&#8217;t yet made it there.)

My session will be about [ways to make big data small][2], in both the storage and processing dimensions, without losing much of the value. 
<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/08/4985831624_fc6cc446c9-300x156.jpg" alt="4985831624_fc6cc446c9" width="300" height="156" class="aligncenter size-medium wp-image-3248" />

If you&#8217;re familiar with Bloom Filters, this is an example. Bloom Filters let you answer the question, 
> Is value X a member of this data set? Yes, or no?
by substituting the question, 
> Is value X a member of this data set? Probably yes, or definitely no?
You lose a small and quantifiable amount of precision in the &#8220;yes,&#8221; and you gain massive savings in storage and processing cost. Bloom Filters are typically used when you need a definite answer, but only as a pre-filtering step, because if the answer happens to be No, you save the effort of looking through the set to try to find your data. 
That worldview or philosophy is a valuable thing to keep in your pocket when you&#8217;re working with large amounts of data, and that&#8217;s the topic of my Strata Conference / Hadoop World NYC 2013 talk. 
[(photo credit)][3]

 [1]: http://strataconf.com/stratany2013/
 [2]: http://strataconf.com/stratany2013/public/schedule/detail/31435
 [3]: http://www.flickr.com/photos/dwysiu/4985831624/