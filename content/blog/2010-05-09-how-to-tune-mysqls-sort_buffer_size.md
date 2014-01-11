---
title: "How to tune MySQL's sort_buffer_size"
permalink: /2010/05/09/how-to-tune-mysqls-sort_buffer_size/
categories:
  - SQL
tags:
  - sort_buffer_size
---
I perpetually see something like the following:

> My server load is high and my queries are slow and my server crashes. Can you help me tune my server? Here is some information.
> 
> [random sample of SHOW GLOBAL STATUS, like the query cache counters] 
> my.cnf:
> 
> `<pre>[mysqld]
key_buffer_size=1500M
query_cache_size= 64M
max_connections = 256
key_buffer = 8M
sort_buffer_size = 100M
read_buffer_size = 8M
delay_key_write = ALL
</pre>`</blockquote> 
> There are many problems in this my.cnf file, but the sort\_buffer\_size is a glaring one that identifies the user as someone who should not be playing with live ammunition. Therefore, I have developed an advanced process for tuning sort\_buffer\_size, which you can follow to get *amazing* performance improvements. It's magical.
> 
> 1.  How expert are you? 
>     *   I know that there is a sort buffer, and that it is related to sort\_merge\_passes. When sort\_merge\_passes is high, I have been told to increase the sort\_buffer\_size. I also know that it is somehow related to the number of sorts the server does, so when there are a lot of sorts shown in variables like Sort\_rows and Sort\_scan, I think I should also increase it. **You are a beginner**.
>     *   I have been administering MySQL for many years. I know that there are two sort algorithms inside MySQL. I know exactly [how to optimize the key cache hit ratio][1]. **You are a novice**.
>     *   I have read every blog post Peter Zaitsev ever wrote, and I can improve on them all. **You are an expert**.
> 2.  Based on your score on the scale above, find your optimal sort\_buffer\_size tuning algorithm below: 
>     *   Beginners and novices should leave this setting at its default, and comment it out of the configuration file.
>     *   Experts don't need me to tell them what to do, but most of them will leave this setting at its default, and comment it out of the configuration file.</ol> 
>     The most amazing thing about sort\_buffer\_size is how many people utterly ruin their server performance and stability with it, but *insist* that they know it's vital to change it instead of leaving at its default. I do not know why this is always the case. Why don't people choose random variables to destroy their performance? It's not as though there is a shortage to choose from. Why does everyone always pick sort\_buffer\_size instead of something else? It's like a flame drawing the moths in.
>     
>     Feel free to ask questions if anything is unclear, but be prepared for a direct answer if you ask for tuning advice.
>     
>     <small><em>PS: I considered a simpler tuning guide, such as <a href="http://mituzas.lt/2009/07/08/query-cache-tuning/">Domas's guide to tuning the query cache</a>, but I am convinced that people need more a complex guide for the sort_buffer_size, or they will not believe in the validity of the instructions. I base this on multiple experiences being paid a lot of money to suggest not setting sort_buffer_size to 256M, and being told that I must be an idiot.</em></small>

 [1]: http://www.mysqlperformanceblog.com/2010/02/28/why-you-should-ignore-mysqls-key-cache-hit-ratio/
