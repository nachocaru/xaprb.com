---
title: "High Performance MySQL, Second Edition: Schema Optimization and Indexing"
permalink: /blog/2007/10/14/high-performance-mysql-second-edition-schema-optimization-and-indexing/
date: "2007-10-14"
categories:
  - Databases
---
I've been trying to [circle back][1] and clean up things I left for later in several chapters of High Performance MySQL, second edition. This includes a lot of material in chapter 4, Schema Optimization and Indexing. At some point I'll write more about the process of writing this book, and what we've done well and what we've learned to do better, but for right now I wanted to complete the picture of what material we have on schema, index, and query optimization. The last two chapters I've written about ([Query Performance Optimization][2] and [Advanced MySQL Features][3]) have generated lots of feed back along the lines of "don't forget X!" to which I'm obliged to reply "It's in a different chapter."

The truth is, it's difficult to separate these topics sensibly. I'd like to do it in the mythical "perfect" way that serializes into a nice narrative without cross-references, but even the perfectionist in me wilts under the glare of deadlines. As a result, I don't know if it's really possible for us to completely avoid cross-references. (I do know there's room for improvement in how we've arranged the material, but I've spent a lot of the day today trying to de-dupe some topics we wrote about in two places, and I'm coming to appreciate that re-organizing is an extraordinary amount of work, especially in OpenOffice.org -- but more on that later).

All this is a preface to the following sentence: schema, indexing, advanced features, and query optimization are intermingled to some extent in the three chapters, even though we tried to separate the topics sensibly. I haven't yet taken some of the suggestions I got in comments on the last chapter I posted. Like I said, reorganizing is a lot of work :-)

Here's the outline. I have the same kinds of questions as before: what are we forgetting, do you have any questions or topics you'd like us to cover, etc? Comments are welcome.

[**Update**: I forgot to mention the vital statistics. So far it's about 55 pages printed.]

<pre>[Intro]
Choosing Optimal Data Types
Indexing Basics
Normalization and Denormalization
Notes on Storage Engines
</pre>

Here's a snippet of "what it's like to write this book" that I'll throw out there. OpenOffice.org, at least the version I'm using, doesn't like O'Reilly's custom heading styles and won't show me an outline view of the document. I'm copying and pasting into this blog post by scrolling from one heading to the next. This is always enlightening, because as you can see a lot of the material isn't organized correctly in the hierarchy. Guess what, it's my first look at the chapter's real outline, too! This isn't the outline we planned to have, but the chapter evolved because of making localized changes without any real way to zoom out and make sure the outline still made sense. So my two comments on this are a) OpenOffice.org hasn't been the most helpful tool in some ways and b) these blog posts are, to some extent, airing the project's dirty laundry (illogical outlining, difficult separation of material among chapters, etc). I'm not afraid of that; I think it's healthy and will help the book be better as a result. I guess my experience with open source, combined with my employer's open-books policy, has taught me to embrace transparency instead of fearing it. In the end this material will be organized and make a lot of sense, but that's a process of evolution -- not intelligent design.

As I said, at some point I'll write more about the process of writing. It's been educational, and most bloggers I know who've written a book don't say much about it (they just pop their heads up every now and then to apologize for not blogging). Very briefly: if you dream of writing a book, do it. It helps that my boss and co-workers support me in this venture, but it's worth it regardless.

