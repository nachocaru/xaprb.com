---
title: Two Perl documentation time-savers
date: "2007-05-17"
url: /blog/2007/05/17/two-perl-documentation-time-savers/
categories:
  - Programming
---
If you are a Perl developer and you only think of perldoc as the command that formats embedded POD (Plain Old Documentation) and lets you read it like a man page, you're missing two huge time-savers this versatile command can give you.

### Function documentation

Suppose you're programming and you've forgotten the exact return values of `localtime()`. What do you do?

*   Get out your Camel book, open it to the alphabetical function reference, and hunt for localtime (it's on page 738 and took me 15 seconds to find, but I got lucky and found the right page with only four flips).
*   Open your web browser and go to the [online Perl documentation][1], click, click, click, there it is (took another 15 seconds, but my browser was already open).
*   Open a terminal and type `man perlfunc`, type `/localtime`, and press 'n' four times (8 seconds).

If you do any of the above, you're missing a shortcut that works for any of Perl's built-in functions:

*   Type `perldoc -f localtime`.

This command extracts the `localtime` section from the `perlfunc` man page and shows it to you. Elapsed time: a second or two.

### Perl FAQs

If you haven't used the Perl FAQs, you're missing a treasure trove of answers to just about any question you might have about Perl. (Sometimes I have what I think is an obscure question, and it's in the FAQ; I have begun to doubt that these questions are all frequently asked).

How do I prompt the user for a password? How do I write a `switch` statement? How do I convert from textual date-time formats back to a UNIX timestamp?

These questions and hundreds more are in the FAQ. To get to them, you can type `man perlfaq`, which is just an index into the detailed FAQ pages, and search for a keyword, such as "switch." When you find it, you can scroll up a few pages and see it's in Perl FAQ 7, General Perl Language Issues. Now you can quit this FAQ page and type `man perlfaq7`, then search again for "switch."

By this time you're probably asking "how is this a timesaver, with all those steps just to get to the answer?" It took me 15 seconds to do. Compared to a Google search and reading through things that make it sound like I'll need to upgrade my Perl or download some CPAN module, it is a timesaver, but you can do even better.

Try typing `perldoc -q switch`. Oooh, is that neat or what? It searches the FAQ pages and pulls out any entries that match your term. Elapsed time: a second or two.

### Conclusion

Documentation is one of Perl's greatest strengths, but knowing how to use it well is even better.

Now if you'll excuse me, I must go write some Perl :-)

 [1]: http://perldoc.perl.org/
