---
title: When to ignore perfectly good advice
date: "2012-12-20"
permalink: /2012/12/20/when-to-ignore-perfectly-good-advice/
categories:
  - Commentary
  - Programming
---
A couple of months ago I bent the ear of a friend whose opinion I really respect. She's a totally sharp engineer who actively writes code for a living as well as managing large teams. She's held top-level technical roles at some large and extremely respectable companies. In short, her perspective and experience is very valuable.

One of my most important questions was what technologies she saw as established or emerging winners &#8212; good technologies to use as the foundation for a [startup][1]. I had a list of requirements I needed my technologies to meet, but I wanted to know what other requirements she thought would be important to consider. For example, the ability to hire engineers to work with the technologies.

My prime candidate for a main programming language was Go, and I was also considering Java, Scala, Clojure, and C/C++. Most languages were easy to eliminate based on my requirements. I tried to summarize my reasons for Go and against others, and asked what she thought.

Her response was that Go was probably not a good choice. As she pointed out, one could make the case that it's immature and unproven, and it's not clear whether it's gaining significant mindshare. It's probably hard to find people who know it, and risky and costly to hire people and then train them in it. She recommended that I consider Java and C++ at the top of my list, because they are safer options for many of the reasons Go would be risky. She also recommended that I consider "cool" languages and environments in order to attract great talent. She put JavaScript and Node.JS onto my list of things to evaluate.

In the weeks that followed, I did a lot of hard thinking, and also sought the advice of many other people. In the end, I chose Go as a main language, and so far I don't see a reason to change that decision.

Why would I choose Go when so many factors seemingly weigh against it? Partly because it's easier to meet many of my specific requirements in Go than it is in other languages. Meeting these requirements gives a lot of business benefits (significantly lowering the barrier to customer adoption, for example).

So regardless of the negatives, the positives for Go for my specific use case are very strong.

In addition, the usual benefits discussed about Go are turning out to be very true in my experience. You can read some articles or watch some talks on [golang.org][2] to see what those benefits are. It's not hype; Go really is that good. Check out this great [talk][3].

The real reason I chose Go, though, is that I took it for a test drive and found out for myself. Not just reading about it or doing code tours and walk-throughs &#8212; building systems with it. I decided to reimplement my most recent Perl program in Go and see how it went. The program does [adaptive fault detection][4] on time-series data at a fine resolution. It takes 1m16s to run on a sample dataset I use a lot. After rewriting it clumsily in Go, it runs in a few seconds. Keep in mind that I'm not a novice Perl programmer, and I don't think my Perl program could be made much faster. This is an illustration of the execution speed difference between a scripting language and a compiled language.

That was a nice validation, but I wasn't close to being ready to decide on Go. I spent a few weeks implementing throwaway prototypes for risky or uncertain parts of my planned system in Go, as well as writing portions of things that I knew would be humdrum turn-the-crank code. Along the way I learned a bit about designing to Go's strengths, and started to become a little bit more productive (I am not as fast a learner as many of the people who say they've learned Go in a couple of weeks). I probed into things like how robust its support for MySQL client libraries is, and how easy it is to work with C or C++ libraries in case something doesn't exist in Go but does in a C library.

I also dug a lot into the community: the mailing list, the blogs, the projects that companies build in Go. It turns out there's a lot more adoption of Go than I thought at first. There are many major systems written with it, some of them at hot up-and-coming companies, some at older companies. It's not just Google.

In the end, I still really appreciate the advice from my friend. It was good advice and pointed out a number of things I needed to think about more or investigate further. But you have to make your own decisions, not just follow advice. And that's the difference between asking a friend for an opinion, and asking a friend to decide for you.

 [1]: http://vividcortex.com
 [2]: http://golang.org/
 [3]: http://vimeo.com/53221560
 [4]: http://www.xaprb.com/blog/2012/10/02/adaptive-fault-detection-in-mysql-servers/
