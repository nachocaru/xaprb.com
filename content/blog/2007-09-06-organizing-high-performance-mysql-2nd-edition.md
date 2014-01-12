---
title: Organizing High Performance MySQL, 2nd Edition
date: "2007-09-06"
permalink: /2007/09/06/organizing-high-performance-mysql-2nd-edition/
categories:
  - Databases
---
I mentioned earlier that I'd blog about progress on the book as we go. It's not only progress on the book itself -- I want to write about the process of writing, because I think it's very interesting and relevant to software engineering. I'm finding a lot of the work in writing a book comes from some of the same things that make software hard: coordinating work, deciding what should go where, and so on.

As I mentioned in the last article, this book is going to be much bigger than the first edition. There are places where we're working from the first edition as a baseline, but they're really a small part of the book. Sections have become chapters; appendices have become chapters. Topics become sections. Bulleted lists become sections too.

We (as a team) have deep expertise on a pretty broad spectrum of MySQL. Take any point in the first edition -- here, I'll open it randomly and find a page. Okay, that one was about GRANT&#8230; maybe I'll find another one ;-) Page 68, "Index Structures". This section in the first edition gives a couple of paragraphs to B-Tree indexes. We are probably going to write many pages and have diagrams. Not that you don't know how B-Tree indexes work, but there are a lot of things to think about: what kinds of queries can you satisfy efficiently with them? What's the memory cost of a B-Tree index? How can you use them to simulate hash indexes on storage engines that don't (yet) support hash indexing? What are some useful hacks you can do? What about fragmentation, fill factor, and so on? Inserting in sorted order is a worst-case scenario in one way because it causes the most re-balancing, but does that matter overall? (As it turns out, it doesn't -- page fill factor and fragmentation trump re-balancing cost).

This kind of depth in the material is great, of course. It means you can learn about things you need to hone MySQL for a specific scenario. Though MySQL performs well as a general-purpose database server, a lot of people striving for high performance need to push the server really hard in a specific problem. Think about [del.icio.us][1], for example. Imagine the queries they run. They're far from general-purpose! Including specific details in such depth is very helpful for people trying to solve specific problems.

But it makes for an interesting and difficult challenge for us as authors: we have to figure out how to organize the material so you can use it. In some ways, it is a classic multiple hierarchy problem. Chapters, sections and subsections are a hierarchy. That's the way books work, but one hierarchy can never adequately address multi-dimensional data, and MySQL is definitely a multi-dimensional topic.

Let me give you an example: we have chapters on architecture, query optimization, and schema optimization. Each of these topics has storage-engine-specific details. We can place all the details in a section titled "Engine-Specific Notes," but then where will you go to learn about each storage engine? You'll have to read every chapter's notes section. We could stuff it all into a chapter called "Storage Engines," but that chapter would hardly make sense without discussing a lot of architecture, queries, and schema optimization, would it?

Ultimately this problem is not solvable in a static book, which can only have one hierarchy. If it were a data warehouse, we could give you multiple dimensions and let you drill into the topics any way you please. In a book, the best we can do is try to arrange things where they make the *most* sense and seem to go with the other material the *best*, and then give you cross-references and a great index.

This is just one of the interesting challenges in writing that is very reminiscent of good software engineering, where code needs to be massaged into the place where it fits best. Actually, code is easier than this, because in a well-designed system, there's usually just one best place for some bit of functionality to go. There's usually no single best place in a book.

Working with multiple authors who have different talents and expertise also reminds me of collaborative programming, but maybe I'll write about that another time.

 [1]: http://del.icio.us/
