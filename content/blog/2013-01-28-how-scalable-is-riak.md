---
title: How scalable is Riak?
author: Baron Schwartz
layout: post
permalink: /2013/01/28/how-scalable-is-riak/
categories:
  - Riak
  - Scalability
---
I&#8217;m reading a little bit about Riak, and was curious about performance and scalability. The only benchmark I found that allowed me to assess scalability was [this one from Joyent][1]. Of course, they say scalability is linear (everyone says that without knowing what it means) but the results are clearly not a straight line. So how scalable is it, really?

The Universal Scalability Law is *such* a powerful tool for thinking about scalability. A few seconds later, I had my answer.

<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/01/usl-model-vs-actual1.png" alt="usl-model-vs-actual" width="640" height="480" class="aligncenter size-full wp-image-3032" />

Of course, this is to be taken with a spoonful of salt, because the modeling is based on only four measurements. But it&#8217;s an incredibly quick way to get an idea of what we&#8217;re looking at, just as a level-set.

 [1]: http://joyent.com/blog/riak-smartmachine-benchmark-the-technical-details/