---
title: Can MySQL be a 12-factor service?
date: "2014-05-10"
url: /blog/2014/05/10/can-mysql-be-12factor-service/
categories:
  - Programming
  - Databases
---


A while ago I [wrote](http://www.xaprb.com/blog/2012/04/24/the-mysql-init-script-mess/) about some of the things that can make MySQL unreliable or hard to operate. Some time after that, in a completely unrelated topic, someone made me aware of a set of principles called [12-factor](http://12factor.net) that I believe originated from experiences building Heroku.

![Dodecahedron][1]

That's been over a year, and I've come to increasingly agree with the 12-factor principles. I guess I'm extremely late to the party, but making applications behave in 12-factor-compliant ways has solved a lot of problems for me.

This experience has repeatedly reminded me of one of the applications that continues to cause a lot of the kinds of pain that the 12-factor principles have solved for me: MySQL.

Example: configuration files. I initially thought MySQL's technique of multiple configuration files that serve as defaults, overrides to the defaults, and eventually are overridden by the commandline options was a good thing. In fact, you can blame me for that pattern being imitated in Percona Toolkit, if you want to blame anyone for it.

But then I started to see the problems with it. Quick question: how easy is it to set up multiple MySQL instances on the same server, in your opinion? Had any problems with that? Any unexpected things ever happen to you?

12-factor solves many of the types of problems I've had with that. For example, I once needed multiple instances of an API server on a single operating system host. This was very difficult because of conflicts with configuration files and init scripts, which I'd created by copying the way MySQL does things. Moving the configuration into the environment variables solved most of those problems and helped solve others.

I don't necessarily expect anyone to understand this unless they've had first-hand experience with it. After all, I didn't until I got that experience myself. I know a lot of people believe fully in the results of following 12-factor principles, so I won't spend time trying to explain it here.

Thought experiment: how hard would it be to make MySQL accept all of its configuration as environment variables? I think it would be feasible to make a wrapper that reads the environment variables and exec's `mysqld` with the resulting options. But if MySQL could be configured via environment variables directly, that'd be even nicer. (I can't think of an environment variable it respects at the moment, other than `TZ`.)

I don't propose blindly following 12-factor principles. They are most applicable to stateless or little-state applications, such as API servers or web applications. They are harder to use with attachable stateful resources, such as a database server. But even a system like MySQL could sometimes be improved, with regards to operational characteristics, by following 12-factor principles.

[Pic](https://www.flickr.com/photos/sanchtv/4192677571)

[1]: /media/2014/05/dodecahedron.jpg
