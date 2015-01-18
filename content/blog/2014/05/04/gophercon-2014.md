---
title: "GopherCon 2014"
date: "2014-05-04"
url: /blog/2014/05/04/gophercon-2014/
categories:
  - Programming
---

I spoke at [Gophercon](http://gophercon.com/) last week in Denver, and it was one of the best
conferences I've attended. I can't remember learning so much and meeting so many
great people in years. I have page after page of notes in my notebook, many of
which I've yet to follow up on. The conference prompted a burst of learning and
a flurry of creativity for me, as well as a huge list of things to study
further.

![Gophercon](/media/2014/05/gophercon.png)

In no particular order, here are some of the many highlights for me:

<!--more-->

* Meeting some of the Go team. Most of the people I've been interacting with or
  following online were there, although I didn't get to meet all of them in
  person.
* Meeting many of the super-smart people whose code, blogs, and emails have
  taught me so much over the last couple of years.
* Learning a lot about Go's internals and design. For example, although it seems
  obvious in hindsight, I had never really thought about the `select` statement
  as the heart of Go's concurrency model -- but it is. Everything else in Go
  seems to get the attention (channels, goroutines, etc), and is copied in
  various languages, but `select` is really the crowning jewels and is unique as
  far as I know.
* The talks. I haven't listened to talks so intently for many years. I was able
  to attend all but two. Fortunately those were recorded and will be online
  soon. The speakers were so good that I truthfully started to get an insecurity
  complex about my own presentation. I could just list all of the talks, and I
  don't want to pick favorites, but if you must watch only a couple --
  watch [Rob Pike][3], [Andrew Gerrand][2], John Graham, Kelsey Hightower, Ben
  Johnson, Peter Bourgon, Alan Shreve, Richard Crowley, oh dear that's more than
  a few. If you use or are curious about Go, you *must* watch the first two.
  The slides are good to read, but you are missing 80% of the talk if that's all
  you make time for.

I was going to write a pretty long retrospective about Gophercon, but another
amazing Gopher [already did that][4] (update: [another one][7]).  I encourage you to read it, as it will
give you a good sense of the conference and Go, and how they fit together.

I'll leave you with some pithy quotes that summarize the depth of the content
and quality of the hallway track at this conference:

* "I will now boot this virtual machine from my slideshow." - Kelsey Hightower.  Note: this is not a joke; he PXE-booted the box using a server program that was running from his slideshow, which was written in Go and ran a Go PXE server. A few minutes later he booted another virtual machine from the first machine that booted from his slideshow.
* "It's turtles all the way down and Handler all the way up." - Richard Crowley, on building HTTP API services by composition using the `net/http` libraries.
* "Interfaces separate data from behavior. Classes conflate the two." - Andrew Gerrand, on the difference between programming with composition versus inheritance.
* "Go is profoundly different." - Rob Pike, addressing the common misconception that Go is little more than an elegant version of C
* "Go has generics. They are called interfaces." - Rob Pike, not speaking in jest
* "The only decison no one has second-guessed is writing this in Go." - Josh Bleecher Snyder

Finally, if you would like to write Go professionally, [VividCortex][6] is
hiring!

[2]: http://talks.golang.org/2014/go4gophers.slide
[3]: http://talks.golang.org/2014/hellogophers.slide
[4]: http://influxdb.org/blog/2014/04/30/java-is-the-cobol-of-my-generation-and-go-is-its-successor.html
[6]: https://vividcortex.com/
[7]: http://blog.joshsoftware.com/2014/05/05/my-experience-at-the-awesome-first-ever-gophercon-2014/
