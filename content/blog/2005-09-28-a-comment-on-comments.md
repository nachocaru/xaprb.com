---
title: A comment on comments
date: "2005-09-28"
url: /blog/2005/09/28/a-comment-on-comments/
categories:
    - Programming
---
Comments are one of the most abused programming techniques. I know I'm not the first to say this, but it bears repeating. There are hundreds of ways to misuse comments, and very few ways to use them correctly. In this article I'll pick on just one way to misuse them: fustian pontificating.

Albert Einstein said something like "things should be made as simple as possible, but no simpler" (it's unclear what he actually said, so I'm paraphrasing). Einstein's greatest genius, in fact, was his ability to help ordinary people understand the esoterica of relativity -- a subject most physicists would have had trouble explaining to other physicists. Yet he wrote with such simplicity and clarity that I know people who were able to read his work at age ten and grok the essential ideas. This is the mark of true genius: making specialized things accessible to non-specialists.

In "Walden," Thoreau advised: *simplify, simplify, simplify.* Emerson is supposed to have responded, "I think one 'simplify' would have sufficed."

In that light, let us examine one of the worst comments I have ever seen in code:

<pre>/*
 * Delayhover effectively creates a phase-shifted version of sfhover
 * that runs parallel with it.  The CSS listens for any of the hover
 * options: :hover, .sfhover, and .delayhover.  There are multiple
 * checkpoints in the code to prevent asynchronous modification of the
 * same objects, or at least provide recovery (If a menu gets left open
 * somehow, a mouseover-mouseout will probably fix it - I've never
 * seen this, though).
 * code reference: T__ M_____.
 */</pre>

This comment is in a Javascript file that implements drop-down navigation menus on a website. The code is only 170 lines long, and does nothing resembling the comment very much; it simply opens and closes the drop-down menus. It doesn't even add delays to the menus. The comments are completely wrong, and to add insult to injury, they scared T.M.'s managers. After this fellow worked on our website, my manager was so afraid of it that he thought we would never be able to replace the man, and I had to literally calm him down in a meeting and explain that in fact, someone in our company *could* maintain the code, that we did *not* need to hire an outside consultant, and T.M. was *not* a "Javascript Ninja." Nice going T.M.

I was tasked with implementing delays on the drop-down menus, and in about 90 minutes I not only did that, but I took the code down to 84 lines. T.M. had worked on this for I don't know how many weeks -- unsuccessfully. It's easy to see why: he didn't understand what the code was doing.
