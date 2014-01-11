---
title: Catching erroneous queries, without MySQL proxy
date: "2009-11-01"
permalink: /2009/11/01/catching-erroneous-queries-without-mysql-proxy/
categories:
  - Maatkit
  - SQL
---
MySQL Proxy is a really neat tool. I remember a few years back when I first saw Jan talking about it. Back in those days it was significantly different than it is now, but the concept remains the same: direct your database traffic through a man-in-the-middle. [Chris Calender's post on capturing erroneous queries with MySQL Proxy][1] shows one use for Proxy. But wait. MySQL Proxy is just inspecting the MySQL protocol. And unless you're using it for something else too, having a man in the middle to catch errors is like standing in the middle of the street and blocking traffic to count the cars on the street. Why don't you stand on the sidewalk to count the cars instead?

### Observing without interrupting

Maybe we can use tcpdump. If you search Google you'll see lots of examples of using tcpdump and grep to extract queries from the MySQL protocol. These examples usually fall on their face when there are multi-line queries, or the compressed protocol is in use, but here there's another problem: the error flag is just a field in the protocol, and that's not very easy to inspect with grep. I'm not sure it's even reasonably possible.

Maatkit to the rescue! The mk-query-digest tool can understand the protocol and we can then filter and manipulate however we wish. As usual, begin by downloading it:

`<pre>wget http://www.maatkit.org/get/mk-query-digest</pre>` 
Next, let's set it up to observe the traffic so we can see what's happening on the server.

`<pre>tcpdump -i lo port 3306 -s 65535 -xnq -tttt \
   | perl mk-query-digest --type tcpdump</pre>` 
That'll capture traffic on port 3306 and push it into mk-query-digest, which defaults to aggregating and reporting on queries. But what we really want to do with that traffic is filter out all the traffic that doesn't have errors. This is a one-liner, but I'll take a detour to show you how to fish instead of just giving you the fish.

### Writing mk-query-digest filters

You can filter and transform query events any way you wish with the `--filter` command-line option. To do this, you have to know the structure of a query event, as seen by mk-query-digest. This is really easy; let's create a filter that simply prints the event itself with Perl's built-in Data::Dumper module, so we can see it:

`<pre>tcpdump -i lo port 3306 -s 65535 -xnq -tttt \
   | perl mk-query-digest --type tcpdump --filter 'print Dumper $event'</pre>` 
I'll test this by leaving it running in one terminal, and running a malformed query, such as 'SELECT' without any FROM, in another terminal:

`<pre>mysql> select;
ERROR 1064 (42000): You have an error in your SQL syntax...
</pre>` 
Good enough for me. When I did this, mk-query-digest printed the following:

`<pre>$VAR1 = {
<strong>  Error_no => '#1064',</strong>
  No_good_index_used => 'No',
  No_index_used => 'No',
  Query_time => '0.000316',
  Rows_affected => 0,
  Thread_id => '4294967296',
  Warning_count => 0,
  arg => 'select',
  bytes => 6,
  cmd => 'Query',
  db => undef,
  fingerprint => 'select',
  host => '127.0.0.1',
  ip => '127.0.0.1',
  port => '39640',
  pos_in_log => '0',
  ts => '091101 14:54:44.293453',
  user => undef
};
</pre>` 
So the $event is a hash with an entry called Error_no. (There is a comprehensive reference to the structure of a query event in the Maatkit wiki, but I often find this technique faster than looking up the reference.) Now we're ready to build a filter that'll snag queries with errors, and print them out in slow-query-log format. Due to an [oddity][2] of the way the Error_no is reported for queries that do NOT have an error, I need to explicitly filter by queries that don't say "none". The final filter code, with a little sanity check to prevent crashing if it's ever undefined, is just:

`--filter '($event->{Error_no} ||"") ne "none"'`

Sorry to disappoint if you were expecting something more complicated!

### Mission accomplished

The final mk-query-digest command is as follows:

`<pre>
tcpdump -i lo port 3306 -s 65535 -xnq -tttt \
   | perl mk-query-digest --type tcpdump \
     --filter '($event->{Error_no} || "") ne "none"' --print
</pre>` 
If I now run a bunch of queries, some with errors, I'll see those with errors get printed out. Let's try:

`<pre>
mysql> select 1; select current_date; select; set global nono=1;select 1;
</pre>` 
And the result:

`<pre># Time: 091101 15:23:40.983195
# Client: 127.0.0.1:39640
# Thread_id: 4294967296
# Query_time: 0  Lock_time: 0  Rows_sent: 0  Rows_examined: 0
select;
# Time: 091101 15:23:40.983457
# Client: 127.0.0.1:39640
# Thread_id: 4294967296
# Query_time: 0  Lock_time: 0  Rows_sent: 0  Rows_examined: 0
set global nono=1;
</pre>` 
Presto, we have a way to catch all queries causing errors.

### Benefits

There are a lot of benefits to doing things this way. Of course, we can do all the usual things with the queries (filter, aggregate, report, save to a file and analyze with any of a number of tools, store to the database&#8230;). But even better, we can do that at any time, without having to install MySQL Proxy or do anything else disruptive to the system. In fact, we can even dump the tcpdump output to a file and take it elsewhere to examine it &#8212; there is no need to even have Perl or the Maatkit tools on the server you want to examine. This is one of the nice things about *not* coupling the analysis and collection tightly together, which is unique to mk-query-digest as far as I know.

 [1]: http://www.chriscalender.com/?p=66
 [2]: http://code.google.com/p/maatkit/issues/detail?id=669
