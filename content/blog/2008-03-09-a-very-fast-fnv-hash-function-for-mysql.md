---
title: A very fast FNV hash function for MySQL
  |
    <p>I wrote a User-Defined Function that implements the <a href="http://isthe.com/chongo/tech/comp/fnv/">FNV (Fowler-Voll-No)</a> hash function for MySQL.  I'm <a href="http://www.radwin.org/michael/blog/2007/03/mysql_user_defined_functio.html">not the first person to do this</a> -- in fact, I was inspired by the <a href="http://code.google.com/p/google-mysql-tools/">Google patches for MySQL</a>.  But my implementation is a little bit different from most, in a very important way that leads directly to much higher performance, especially suited for the Maatkit tools.</p>
permalink: /2008/03/09/a-very-fast-fnv-hash-function-for-mysql/
description:
  - You can speed up Maatkit by installing a faster hash function I created.
tags:
  - checksumming
  - FNV
  - hashing
  - MySQL
  - MySQL Google Patches
---
I wrote a User-Defined Function that implements the [FNV (Fowler-Voll-No)][1] hash function for MySQL. I'm [not the first person to do this][2] &#8212; in fact, I was inspired by the [Google patches for MySQL][3]. But my implementation is a little bit different from most, in a very important way that leads directly to much higher performance, especially suited for the Maatkit tools.

A bit of background: FNV hashing is a very fast hash algorithm that operates in fixed memory. It is widely used in lots of important areas in computer science. My implementation requires absolutely no `malloc()` calls, which is a darn good thing because I am not to be trusted with `malloc()`, having spent too many years programming in managed languages. I made it return a 64-bit integer, which matches the size MySQL uses internally for most integer arithmetic.

The most important thing I did was make my UDF accept 1 to infinity arguments. That means you can hash entire rows with a single function call. And that is very useful for the [Maatkit][4] table-checksumming tools, which tend to run about 8-10 times faster when they don't have to make MySQL do a bunch of string concatenation. That translates directly to less impact on the server, and less slave lag (if that is a problem for you).

Here's how my implementation works:

<pre>SELECT FNV_64(col1, col2, col3, .... colN) FROM ...</pre>

Compare this to MD5() hashing that accomplishes the same thing:

<pre>SELECT MD5(CONCAT_WS('#', col1, col2, col3, .... colN)) FROM ...</pre>

The UDF's code is distributed with Maatkit, and I plan to eventually build it as a binary that can be installed without requiring you to compile it. However, compiling is very easy; there are instructions in the source code comments. Installing is also easy: just a simple SQL statement.

If you're using Maatkit to make sure your slaves have the same data as their master, you should install the UDF on all your servers for a significant performance boost. You'll save your servers a lot of work. You don't need to do anything extra for Maatkit to take advantage of it. Maatkit will auto-detect it if you have it installed.

I've been running it in production for a couple of months now with nothing but good results. And the code is drop-dead simple, so I think the chance of bugs is very slim. But if you have questions, problems, bug reports etc, please use the [Maatkit][4] project page to report them.

 [1]: http://isthe.com/chongo/tech/comp/fnv/
 [2]: http://www.radwin.org/michael/blog/2007/03/mysql_user_defined_functio.html
 [3]: http://code.google.com/p/google-mysql-tools/
 [4]: http://code.google.com/p/maatkit/
