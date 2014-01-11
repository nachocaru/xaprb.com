---
title: How I built the NOW_USEC() UDF for MySQL
date: "2007-10-30"
permalink: /2007/10/30/how-i-built-the-now_usec-udf-for-mysql/
---
Last week I wrote about my efforts to [measure MySQL's replication speed precisely][1]. The most important ingredient in that recipe was the [user-defined function][2] to get the system time with microsecond precision. This post is about that function, which turned out to be surprisingly easy to write.

The [manual section on user-defined functions][2] provides very good instructions on how they work and how to build them. But just for the record, on Ubuntu 7.04 on an AMD64 machine, all I had to do was install the libmysqlclient15-dev package, and I was then able to compile the UDF with no further ado. Also for the record, [MySQL header files have some dependencies they shouldn't][3] that break building against a downloaded tarball. So don't be surprised if you have troubles building against anything but Ubuntu's provided header files.

Here's the source, which I basically cribbed from a NOW_MSEC() function I saw in a bug report somewhere. Really, there's not much to it besides the basic skeleton of a UDF, with a few lines to actually get the system time. And I actually believe if I took another ten minutes to learn about strftime(), there's probably no need to do it in two steps; I could probably do the whole thing with one strftime() call and save a little memory and time. But that's what I get for copying and pasting code of unknown quality:

<pre>#include &lt;my_global.h&gt;
#include &lt;my_sys.h&gt;
#include &lt;mysql.h&gt;

#include &lt;stdio.h&gt;
#include &lt;sys/time.h&gt;
#include &lt;time.h&gt;
#include &lt;unistd.h&gt;

extern "C" {
   my_bool now_usec_init(UDF_INIT *initid, UDF_ARGS *args, char *message);
   char *now_usec(
               UDF_INIT *initid,
               UDF_ARGS *args,
               char *result,
               unsigned long *length, char *is_null, char *error);
}

my_bool now_usec_init(UDF_INIT *initid, UDF_ARGS *args, char *message) {
   return 0;
}

char *now_usec(UDF_INIT *initid, UDF_ARGS *args, char *result,
               unsigned long *length, char *is_null, char *error) {

  struct timeval tv;
  struct tm* ptm;
  char time_string[20]; /* e.g. "2006-04-27 17:10:52" */
  char *usec_time_string = result;
  time_t t;

  /* Obtain the time of day, and convert it to a tm struct. */
  gettimeofday (&tv, NULL);
  t = (time_t)tv.tv_sec;
  ptm = localtime (&t);   

  /* Format the date and time, down to a single second.  */
  strftime (time_string, sizeof (time_string), "%Y-%m-%d %H:%M:%S", ptm);

  /* Print the formatted time, in seconds, followed by a decimal point
 *      and the microseconds.  */
  sprintf(usec_time_string, "%s.%06ld\n", time_string, tv.tv_usec);

  *length = 26;

  return(usec_time_string);
}
</pre>

The installation looks like this:

<pre>baron@tigger now_usec $ make
gcc -fPIC -Wall -I/usr/include/mysql -shared -o now_usec.so now_usec.cc
baron@tigger now_usec $ sudo cp now_usec.so /lib
baron@tigger now_usec $ mysql test
mysql> create function now_usec returns string soname 'now_usec.so';
Query OK, 0 rows affected (0.00 sec)

mysql> select now_usec();
+----------------------------+
| now_usec()                 |
+----------------------------+
| 2007-10-23 10:28:13.862116 | 
+----------------------------+</pre>

For those who have reached this page via Google searches and are looking for more information, you should check out the [MySQL User Defined Function Library][4] project. Lots of good UDFs there.

 [1]: http://www.xaprb.com/blog/2007/10/23/how-fast-is-mysql-replication/
 [2]: http://dev.mysql.com/doc/en/adding-functions.html
 [3]: http://bugs.mysql.com/bug.php?id=28456
 [4]: http://www.xcdsql.org/MySQL/UDF/
