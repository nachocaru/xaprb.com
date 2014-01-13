---
title: Model-view-controller considered harmful
date: "2013-04-17"
permalink: /blog/2013/04/17/model-view-controller-considered-harmful/
categories:
  - Commentary
  - Programming
  - Web
---
In 2001 I created a PHP 4 web application framework from scratch as the backbone of a sophisticated application. Back then frameworks weren't cool. Smarty templates were the hotness.

My framework had URL routing, templates with a capable templating syntax similar to mustache, loosely coupled and tightly cohesive object-oriented design, an elegant way to access the database without dumbing it down, and nicely separated business logic and presentation layers -- among many other nice things you find in good frameworks. As the application grew more and more complex, the framework continued to serve well with only occasional enhancements.

I mention this because it illustrates that I've been aware of how to design maintainable systems for a long time. But the so-called MVC paradigm (model, view, controller) has *never* made sense to me.

The design goals make sense. See above. It's just that I find MVC itself -- the abstraction and implementation of those goals -- to be unhelpful at best, on a day I'm being charitable. On a day I'm telling it like it is, I'll just bluntly say MVC is the most confusing pile of acronym bulls**t I can think of.

Tell me, without knowing what MVC is, what would you guess the model represents? Controller? View? It would be bad enough if these were abstract terms like "node" or "resource," but they're not abstract. They hint at meaning, and then you discover that MVC doesn't align with the hinted-at meaning. Instead, the M, V, and C represent concepts that are vague and hard to understand, and are kind of a stretch to mentally fit with the terms. This is worse than abstract, it's misleading. It's like bait-and-switch for someone who's trying to grasp what it means.

I don't know where MVC came from and I'm sure I won't change my mind if I find out. I have a hard time believing that I'm the only one who wishes someone had formed a committee[1] to discuss what kind of names to represent the concepts. Especially since there are so many frameworks that abstract things slightly differently, because MVC apparently doesn't suit their designers either, and thus it's necessary to explain the relationship between Framework X's view of the world, and how that loosely maps to the MVC view of the world. It becomes a sloppy comparison to a sloppy analogy.

Even more fun: some folks try to invent an MVC framework, like the original ASP.NET, and "get it wrong," to disdainful criticism. Then they have to reinvent it, sometimes several times.

It's kind of like the OSI 7-layer model, which everyone agrees doesn't actually represent modern networking technology stacks cleanly, and yet everyone talks about the OSI layers. There's a clean way to think about networking layers, but the OSI model ain't it. Or NoSQL -- the most unhelpful, undescriptive name for an &#8230; amorphous category of technologies or worldviews or design patterns or whatever&#8230; ever.

The lesson: great concepts that teach great truths, and could result in great advances in engineering due to a common mental model around which other things can be built, can be sidetracked by slapping an ill-fitting monicker or set of analogies on them. And sometimes we never seem to get another chance. NoSQL believers can't seem to think of anything better than NoSQL as a name (and neither can I, as much as I deplore the NoSQL name). We're stuck.

I'm sure my strong opinions on this are a) somewhat ignorant and b) not shared by everyone. Discuss! :-)

[1] Yes, I'm aware that awful things come from committees, like SQL. But I have faith that it would have been better than MVC.
