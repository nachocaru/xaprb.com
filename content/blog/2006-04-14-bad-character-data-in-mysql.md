---
title: How to find and fix invalid character data in MySQL
date: "2006-04-14"
url: /blog/2006/04/14/bad-character-data-in-mysql/
categories:
  - Databases
---
Odd characters can sometimes cause problems with character data in MySQL. These characters are easy to accidentally import from a CSV file or other data source, but hard to detect because they don't always display correctly. In this article I'll tell you which characters are bad, how you can get them in your database, how to avoid getting them, how to detect them when you have them, and how to get rid of them.

### Bad characters

Tangent: on some UNIX systems, the command `sleep with me` returns the error `bad character`.

Jokes aside, there are two types of bad characters: good characters in the wrong place, and characters that aren't valid data. The most common case I've seen of the first type is line endings. UNIX, Windows and Mac systems all use different combinations of control characters as line endings. In UNIX, a newline terminates a line; in Mac it's carriage-return, and in Windows it's a carriage return followed by a newline. MySQL usually ignores trailing spaces when comparing character data (depending on the collation in use, among other things), but not if the trailing spaces are followed by a line ending. For example,

<pre>mysql&gt; select "a" = "a  "; -- returns 1
mysql&gt; select "a" = "a  \n"; -- returns 0</pre>

The other type of bad character is a character that truly isn't valid data. For example, Microsoft uses some [proprietary extensions][1] to standard ASCII character codes, especially in the Office suite -- characters such as "smart quotes," em-dashes, and so forth. This is discussed extensively elsewhere, so I won't go into it too much. Some of the offenders are the curly quotes (characters 145-148) and the em-dash (character 151).

### Vectors of infection

Line ending problems commonly come from data that's bulk-imported from a file, but with the wrong line terminators. For example, I might use the `LOAD DATA INFILE` statement on a CSV file that's terminated with `\r\n`, but tell MySQL lines are terminated by `\n` as in a UNIX system. The result is the last column in the file always has an extra carriage return.

Similarly, loading a CSV file that was saved from a Microsoft Office application can introduce the proprietary characters I mentioned above.

### Prevention

Preventing bad data in a `LOAD DATA INFILE` statement is fairly simple: find the line ending, and use the correct syntax in the statement. To determine the line ending, I use the `od` (octal dump) command, which dumps an unambiguous representation of the file's contents. One of the options makes it display the actual characters in a way humans can read, too. Given a file called file.csv, the following commands will display its contents:

<pre>xaprb@localhost ~ $ head file.csv | od -c
0000000   o   n   e  \t   t   w   o  \n   t   h   r   e   e  \t   f   o
0000020   u   r  \n
0000023</pre>

It's easy to see the special characters in the file, such as the newlines and tabs. Now I know my file isn't really comma-separated, it's tab-separated, and the line endings are newlines. Finding and replacing truly bad characters is another matter. Finding them may not be hard, but determining what to replace them with can be as simple as replacing curly quotes with the un-curly equivalent, or as hard as doing different things depending on the language of the document. Perl generally does the work very easily, but first I have to figure out what to do!

### Detection

Supposing I've already loaded the bad data into the database, how can I detect it? For example, suppose a join between tables is failing because of a trailing carriage return, or a column looks like it has the same data as another column -- while actually having different data -- because my terminal refuses to display some of the characters.

The first case actually isn't too hard from the MySQL command-line client. The presence of trailing carriage returns will misalign the display:

<pre>create table test(col1 varchar(10));
insert into test values("test1\r"), ("test2\r");
select * from test;
+--------+
| col1   |
+--------+
 |test1
 |test2
+--------+</pre>

The second case can be harder to detect. For the following example to work, I have to specify a non-default character set (my default character set is utf8, which will correctly reject invalid non-utf8 characters such as 146).

<pre>create table test(
   col1 varchar(10)
      character set cp1251 collate cp1251_bin
);

insert into test values ("Xaprbs");
insert into test values (replace("Xaprb's", "'", char(146));

select a.col1, b.col1, a.col1 = b.col1 as equal
from test as a 
    cross join test as b;
+---------+---------+-------+
| col1    | col1    | equal |
+---------+---------+-------+
| Xaprbs  | Xaprbs  | 1     |
| Xaprbs | Xaprbs  | 0     |
| Xaprbs  | Xaprbs | 0     |
| Xaprbs | Xaprbs | 1     |
+---------+---------+-------+</pre>

In this example, you can see the command-line client's display is a little off due to the wacky character. Sometimes, though, it's not so simple. I've stared at data in the command-line client and been unable to figure out what is wrong. In my example the two values look the same, so why aren't they comparing equal? The answer is they're not equal, but the terminal can't display the funky characters.

There are a couple of ways to essentially do an `od` within MySQL. One is to join against the [integers table][2]:

<pre>select
   lpad(substring(col1, i, 1), i, " ") as char_i,
   i,
   ascii(substring(col1, i, 1)) as charcode
from test
   cross join integers
where col1 &lt;&gt; "Xaprbs" and i between 1 and length(col1);

+---------+---+----------+
| char_i  | i | charcode |
+---------+---+----------+
| X       | 1 | 88       |
|  a      | 2 | 97       |
|   p     | 3 | 112      |
|    r    | 4 | 114      |
|     b   | 5 | 98       |
|        | 6 | 146      |
|       s | 7 | 115      |
+---------+---+----------+</pre>

This makes it pretty easy to see that byte 6 is the bad guy, character 146. Another way to do this is with the `HEX` function, which prints the value one byte per every two hexadecimal digits; `select hex(col1) from test where col1 <> 'Xaprbs';` results in `58617072629273`. The suspicious byte is 92, which is the hex value of 146.

### Removal

Once the bad data is in the database, it's probably best to fix it in the database, rather than pull it back out, fix it, and put it back in. It's pretty much the same process as above: figure out where the bad data is, figure out what it ought to be (that's the hard part!), then fix it. In this case, `REPLACE` is my best friend:

<pre>update test set col1 = replace(col1, char(146), "'");
select * from test;
+---------+
| col1    |
+---------+
| Xaprbs  |
| Xaprb's |
+---------+</pre>

 [1]: http://www.cs.tut.fi/~jkorpela/www/windows-chars.html
 [2]: /blog/2005/12/07/the-integers-table/

 *[ASCII]: American Standard Code for Information Interchange
