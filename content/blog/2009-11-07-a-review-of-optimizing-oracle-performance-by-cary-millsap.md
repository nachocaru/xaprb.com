---
title: A review of Optimizing Oracle Performance by Cary Millsap
date: "2009-11-07"
permalink: /2009/11/07/a-review-of-optimizing-oracle-performance-by-cary-millsap/
categories:
  - PostgreSQL
  - Review
  - SQL
---
<div id="attachment_1416" class="wp-caption alignleft" style="width: 238px">
  <a href="http://www.amazon.com/Optimizing-Oracle-Performance-Cary-Millsap/dp/059600527X?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2009/11/optimizing_oracle_performance-228x300.jpg" alt="Optimizing Oracle Performance" title="Optimizing Oracle Performance" width="228" height="300" class="size-medium wp-image-1416" /></a><p class="wp-caption-text">
    Optimizing Oracle Performance
  </p>
</div>

[Optimizing Oracle Performance][1]. By [Cary Millsap][2], O'Reilly 2003. Page count: about 375 pages with appendices. (Here's [a link to the publisher's site][3].)

This is easily one of the best books I've ever read on performance optimization. I've just finished reading it for the second-and-a-half time in two weeks, and I very rarely read a book more than once. I've been telling a lot of people about it.

Despite the title, it is actually not about Oracle performance. It is a book on how to optimize a) any system, including a MySQL-based application b) the process of optimization itself. It is very, very good, and I highly recommend it to all database users. My bet is that most people will learn more by reading this book than by spending thousands of dollars on conferences and training, especially since a lot of what you'll learn from those sources is wrong and harmful. So not only will you save money and time on learning, you'll reap great rewards thereafter.

The book is organized into three sections. The first section explains a performance optimization methodology called *Method R* (for response time) that is designed to deterministically advance from identifying what needs to be optimized, to collecting diagnostic data, and then choosing the correct activities to optimize. Simply put, it is probably the clearest and most logical process I've ever seen for focusing on what matters. It is quite similar to our process at Percona, which we call Goal-Driven Performance Optimization. But Cary does a really good job explaining it. Cary told me that he wrote the book while simultaneously developing Method R training classes, and did dozens of classes before the book went to press. You can tell!

The second and third parts of the book are about putting the method into practice.

Cary shows many typical mistakes, such as focusing on ratios, working on things that "look bad," ignorance of Amdahl's Law, trying to draw conclusions about specific activities by examining system-wide information, and so on. He brings the focus back to response time again and again.

Another typical "tuning mistake" is not knowing when to quit. Cary shows how to know when further performance improvements, even if they're possible, will not be economically justified. At the point where the gains don't exceed the cost, you're done. The system is optimized. Maybe it's not performing as well as it could, but if it costs too much to get any more performance, it's still optimal.

This is a book that backs up every assertion with references to source material, or even with a proof or derivation from first principles. It is significantly more rigorous than most books of this type. There's a very good chapter on kernel timings that explains a ton of stuff about how processes work, measurement intrusion effect, quantization error, and so on.

There is a very good section on queueing theory, with excellent examples of using it to prove that a desired improvement is mathematically impossible and/or impractically expensive. There are also examples of how to use queueing theory to predict when a hardware upgrade will worsen your performance problems. (And lots of other examples of when "optimizing" something will actually make it worse, as for example improving performance of some task other than the one you're interested in, thereby making it use and contend for more resources &#8212; and hurting performance of the task you wanted to improve.)

What is it NOT about? It's not about how to write more efficient SQL &#8212; there is practically nothing in the book about SQL. It's not about how everything inside Oracle works, though it does have one or two chapters that are mostly about how to apply the principles to Oracle through extended SQL trace files, a discussion that will transfer well to any other system that emits trace data. (Read these, or you'll miss learning about quantization error and such!)

Highly, highly recommended.

 [1]: http://www.amazon.com/Optimizing-Oracle-Performance-Cary-Millsap/dp/059600527X?tag=xaprb-20
 [2]: http://www.method-r.com/
 [3]: http://oreilly.com/catalog/9780596005276
