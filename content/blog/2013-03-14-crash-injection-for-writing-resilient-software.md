---
title: Crash injection for writing resilient software
date: "2013-03-14"
permalink: /2013/03/14/crash-injection-for-writing-resilient-software/
categories:
  - Databases
---
I am currently finishing some features to make a program highly resilient to occasional crashing bugs. A particular function was found to crash on queries of the form `WHERE x IN(NULL)`, and that crashed the entire program. Now we have a framework for intelligently recovering from arbitrary crashes. I will write more on this in the future, because I think it's a very interesting thing to share.

In this episode, I want to focus on a related topic: how do you test a program that is supposed to be resilient to bugs you can't predict? Many new problems are caused by writing [clever code that is supposed to detect, avoid, or recover from problems][1], even known problems. Unknown problems are even riskier.

The approach that has given me a great deal of confidence in the "resilience framework" is to write a "crash injection framework." (If it's not a framework, it can't be any good, right?) Crash injection can be activated at runtime to cause crashes in arbitrary source code locations. A fairly simple analysis of the source code showed me some places I'm particularly interested in crashing to see how the program reacts.

In the first iteration, it turned out that I hadn't actually solved the problem, even though I was sure I had. (I had already discovered previous mistakes, so this was actually about the 3rd time through, and I was sure I'd found all the bits I'd previously missed.) My crash injection framework allowed me to quickly dispel the notion that my program was resilient to the kinds of bugs we'd already found.

The fix was simple, but the lesson was well learned. I don't remember doing this before, but I've studied and admired other pieces of software that are built to be resilient. For example, CouchDB has a [crash-only][2] design. If you're not familiar with that phrase, it's well worth reading more about that. Stewart Smith has also written software that helps reveal wrong assumptions, such as [libeatmydata][3], and I think he also wrote something that randomly broke `malloc()`, but I can't find that easily. Assumptions like "allocating memory will always succeed" are great places to end up with horrible bugs.

In the MySQL world, it would be great if we had more crash-injection testing of InnoDB as well. If you agree, you might consider subscribing to <http://bugs.mysql.com/bug.php> to keep up to date with effort on that front.

 [1]: http://www.xaprb.com/blog/2011/05/04/whats-wrong-with-mmm/ "What’s wrong with MMM?"
 [2]: http://en.wikipedia.org/wiki/Crash-only_software
 [3]: http://flamingspork.com/projects/libeatmydata/
