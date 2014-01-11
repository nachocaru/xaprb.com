---
title: A review of MySQL 5.1 Plugin Development by Golubchik and Hutchings
permalink: /2010/10/10/a-review-of-mysql-5-1-plugin-development-by-golubchik-and-hutchings/
categories:
  - SQL
tags:
  - Andrew Hutchings
  - MariaDB
  - MySQL
  - Plugins
  - Sergei Golubchik
  - UDF
---
<p style="float:left">
  <div id="attachment_2059" class="wp-caption alignleft" style="width: 135px">
    <a href="http://www.amazon.com/dp/1849510601/?tag=xaprb-20"><img src="http://www.xaprb.com/blog/wp-content/uploads/2010/10/mysql-plugin-development.jpg" alt="MySQL 5.1 Plugin Development" title="MySQL 5.1 Plugin Development" width="125" height="152" class="size-full wp-image-2059" /></a><p class="wp-caption-text">
      MySQL 5.1 Plugin Development
    </p>
  </div>
</p>

[MySQL 5.1 Plugin Development][1], by Sergei Golubchik and Andrew Hutchings, Packt 2010. About 250 pages. (Here's a [link to the publisher's site][2].)

This book is well worth reading for anyone interested in MySQL internals. I learned a lot from it. It is well-written and understandable. I cannot say that I'm planning to write storage engines or more advanced plugins, but I have a great many ideas how to improve MySQL, and I now understand more clearly which of those are suitable to write as plugins, and of what type of plugin is appropriate. I also think I have a better idea how much work these various ideas might involve.

The book begins with an orientation to building plugins on various platforms. Next it covers user-defined functions (UDFs). I have written UDFs, but that's as far as I have gone with MySQL plugins. The rest of the book covers Daemon plugins, INFORMATION_SCHEMA plugins, full-text parser plugins, and storage engine plugins from basic to advanced. The last example is a nearly complete storage engine built on Tokyo Cabinet, with some pretty advanced functionality. It finishes with a quick overview of the types of plugins available in development and future versions of MySQL, and what's possible in MariaDB.

The examples are full code listings, with paragraphs of text alternating with a few lines of code. It's like reading a really well-commented C program, like reading InnoDB source, but with even more explanations. You can download everything you need to build and run the examples yourself &#8212; even the sample images used for demonstrating full-text search of EXIF data.

I enjoyed reading about what's possible in MariaDB. I had not kept up-to-date with the work that's being done there. If I were a storage engine developer, I'm sure I would appreciate what MariaDB has done. I would speculate that many of the people who've written in-house custom storage engines for their own businesses might find MariaDB interesting.

I think that anyone who is planning to modify the MySQL source code should read this book. It could save a lot of work and show easier ways to do things. I learned a lot about the MySQL source code that I have not gotten from other places. This one will go onto my [list of essential books for MySQL users][3].

 [1]: http://www.amazon.com/dp/1849510601/?tag=xaprb-20
 [2]: https://www.packtpub.com/mysql-5-1-plugins-development/book
 [3]: http://www.xaprb.com/blog/essential-books/
