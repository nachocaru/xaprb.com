---
title: Sphinx 0.9.8 is released!
date: "2008-07-15"
url: /blog/2008/07/15/sphinx-098-is-released/
---
The [Sphinx][1] project just released version 0.9.8, with many enhancements since the previous release. There's never been a better time to try it out. It's really cool technology.

What is Sphinx? Glad you asked. It's fast, efficient, scalable, relevant full-text searching and a heck of a lot more. In fact, Sphinx complements MySQL for a lot of non-search queries that MySQL frankly isn't very good at, including WHERE clauses on low-selectivity columns, ORDER BY with a LIMIT and OFFSET, and GROUP BY. A lot of you are probably running fairly simple queries with these constructs and getting really bad performance in MySQL. I see it a lot when I'm working with clients, and there's often not much room for optimization. Sphinx can execute a subset of such queries very efficiently, due to its smart I/O algorithms and the way it uses memory. By "subset" I mean you don't get the full complexity of SQL, but you get enough functionality for lots of the poorly-performing queries I see in the wild. It's a 95% solution.

<a style="float:right" href="http://sourceforge.net/awards/cca/?project_name=Sphinx&project_url=http%3A//www.sphinxsearch.com/"><img src="http://sphinxsearch.com/g/cca_125x125_finalist.png" border="0" /></a>Is Sphinx for you? Good question. You can find answers in Appendix C in [High Performance MySQL][2]. And yes, that is why I wrote this blog post -- to put in a plug for the book. \*grin\* But before I go, let me put in another plug for Sphinx: [go vote for it on Sourceforge][3]! If it's voted as one of the Community Choice projects of the year, that will be fantastic.

 [1]: http://www.sphinxsearch.com/
 [2]: http://highperfmysql.com/
 [3]: http://sourceforge.net/awards/cca/?project_name=Sphinx&project_url=http%3A//www.sphinxsearch.com/
