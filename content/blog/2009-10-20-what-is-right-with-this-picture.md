---
title: What is right with this picture?
author: Baron Schwartz
layout: post
permalink: /2009/10/20/what-is-right-with-this-picture/
categories:
  - Coding
---
Do you know what this is?

`<pre>debian:~/mysql-cacti-templates/t# php mysql.php 

not ok 1 - basic test to check that the test suite works
#     Failed test (/root/mysql-cacti-templates/t/mysql.php at line 9)
#     got: Array
(
    [b] => 2
)

# Looks like you failed 1 tests of 1.
`</pre> 
It is the beginning of a test suite, which is long overdue. Writing a test suite for [this code][1] would have saved a lot of work ages ago. But as I always say, if you don't do it from the beginning, it's much harder to do later. And this code began its life as a script someone else wrote, so I wasn't there at the beginning. Better late than never.

 [1]: http://code.google.com/p/mysql-cacti-templates/