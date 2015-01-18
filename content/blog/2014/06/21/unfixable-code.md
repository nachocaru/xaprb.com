---
title: "Unfixable Code"
date: "2014-06-21"
url: /blog/2014/06/21/unfixable-code/
categories:
  - Programming
---

Over the years I've come to believe something that I'm not sure others will
agree with. I would like to hear your point of view on it.

I posit that some code can become literally unfixable. Programmers can paint
themselves into a corner with the code and it becomes impossible to get out
again.

![humpty](/media/2014/06/humpty.jpg)

The scenario arises when a specific set of conditions exists:

<!--more-->

* the code is difficult to work with for some reason --- inherent complexity, badly written code, whatever
* the code is not tested and is not written to be testable
* bugs are high-stakes, so changes are extremely risky
* the code needs to be changed for some reason (it's buggy or doesn't fulfill its requirements)

This situation is a deadlock. I can't leave the code as it is, because it
has bugs that are causing problems that need to be fixed. I can't change the
code, or I'll cause bugs that may be truly serious in a variety of ways. I can't
test the code, because it's untestable the way it's written. I can't refactor it
to be testable for the same reasons I can't just change it in the first place.

I have encountered such code many times in my career. I've also met people who
say they can fix any code with enough work. I haven't seen that happen. The only
solution I've seen is a complete replacement, rewriting from scratch.

What do you think?

PS: I remember seeing claims that if more than a small amount (10% or so, as I
recall?) of a program's code needs to be modified, a rewrite from scratch will
be a better outcome in less time. If you can find any sources for that claim,
please leave them in the comments.
