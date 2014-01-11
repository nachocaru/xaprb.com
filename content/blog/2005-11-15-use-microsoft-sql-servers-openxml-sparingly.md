---
title: 'Efficient alternatives to Microsoft SQL Server&#8217;s openxml'
author: Baron Schwartz
excerpt: "<p>Microsoft SQL Server's <code>openxml</code> function is highly CPU-intensive.  This article demonstrates more efficient alternatives to <code>openxml</code>.</p>"
layout: post
permalink: /2005/11/15/use-microsoft-sql-servers-openxml-sparingly/
---
Microsoft SQL Server&#8217;s `openxml` function is highly CPU-intensive. This article demonstrates more efficient alternatives to `openxml`.

### Why people use `openxml`

A common usage for `openxml` is to use XML to pass a &#8220;list&#8221; or &#8220;table&#8221; of values into a stored procedure. Here is a scenario I&#8217;ve seen a lot at my current job:

1.  An ASP accepts a string as input, such as &#8220;ipod car adapter&#8221;
2.  The ASP parses the input into space-separated values, then concatenates them together into XML
3.  The ASP passes the XML to a stored procedure
4.  The sproc uses `openxml` to populate a temporary table from the XML
5.  The sproc does some work (such as searching a product catalog)

This is fine, except `openxml` can cause a huge CPU spike, which is bad news in a Web-facing search server during holiday shopping season.

I have rewritten such a search sproc to remove `openxml`, and found it to account for upwards of three-fourths of the total cost, even in an otherwise very expensive sproc. I have anecdotal wisdom from other DBAs about people who over-use `openxml` and end up with systems that run hot all the time.

A list of simple delimited values doesn&#8217;t need XML &#8212; it&#8217;s overkill. A better alternative is to pass the string directly into the sproc, and write a <acronym title="user-defined function">UDF</acronym> to return a table with the elements of the string. It&#8217;s still string parsing, but it&#8217;s better than using XML.

### Solution 1: a `WHILE` loop in a user-defined function

Here is a user-defined function that will split a delimited set of words into a table and return the table:

<pre>CREATE function dbo.fn_SplitWords (
    @Words varchar(8000),
    @Delim char(1))
    returns @Words_table table(word varchar(255), ident int identity not null)
as begin

    declare @Wordstart int, @WordEnd int, @DoubleDelim varchar(2)
    
    set @Wordstart = 1
    set @WordEnd = 1
    set @DoubleDelim = replicate(@Delim, 2)

    -- Prepare the data
    while charindex(@DoubleDelim, @Words) &gt; 0
        set @Words = replace(@Words, @DoubleDelim, @Delim)
    -- Left-trim it
    if left(@Words, 1) = @Delim
    begin
        if @Delim = ' '
            set @Words = ltrim(@Words)
        else
            set @Words = substring(
                @Words,
                patindex('%[^' + @Delim + ']%', @Words),
                len(@Words) - patindex('%[^' + @Delim + ']%', @Words) + 1)
    end
    -- Right-pad it
    if right(@Words, 1) &lt;&gt; @Delim
        set @Words = @Words + @Delim

    while @Wordstart &gt; 0
    begin
        -- Extract the next word
        set @WordEnd = charindex(@Delim, @Words, @Wordstart)
        if @WordEnd &gt; @WordStart
        begin
            insert into @Words_table select substring(@Words, @Wordstart, @WordEnd - @Wordstart)
            set @Wordstart = @WordEnd + 1
        end
        else set @Wordstart = 0 -- Terminate the loop
    end
    return
end</pre>

Please note the bug I&#8217;m avoiding in the `while` loop above. I explain the [SQL Server 2000 `replace` bug][1] in another post.

Here are some test calls for the UDF:

<pre>select * from dbo..fn_SplitWords('this is a test call', ' ')
select * from dbo..fn_SplitWords(' this is a test call', ' ')
select * from dbo..fn_SplitWords('this is a test call ', ' ')
select * from dbo..fn_SplitWords('this-is-a-test-call', '-')
select * from dbo..fn_SplitWords('this is a test      call', ' ')
select * from dbo..fn_SplitWords(' ', ' ')
select * from dbo..fn_SplitWords('', ' ')</pre>

After I wrote this, I saw someone else did the same thing elsewhere, though in my opinion very poorly implemented and explained. In any case, here&#8217;s a link for the sake of completeness: [Treat Yourself to Fn_Split()][2]

### A more efficient approach

Instead of using a loop as I did above, it&#8217;s actually much more efficient to use an [integers table][3] and a `JOIN` to parse the tokens apart. This approach is slightly less flexible, and doesn&#8217;t handle all the special cases I handled above with my UDF, such as tokens being separated by several delimiters instead of just one. Regardless, it is absolutely a better way to go, as long as the input is well-formed. It doesn&#8217;t use any nonstandard SQL, either &#8212; it&#8217;s a relational solution to the problem. Here are three resources where you can learn more about this extremely elegant technique:

*   [http://www.bizdatasolutions.com/tsql/sqlarrays.asp][4]
*   <http://www.sommarskog.se/arrays-in-sql.html>
*   <http://www.users.drew.edu/skass/sql/>

### Other advantages to a UDF

This approach has other advantages over `openxml`, too:

1.  it&#8217;s easy to string-ify a table for input to another sproc from within SQL (see my article about [concatenating strings in SQL][5] for more)
2.  it is much simpler, needs much less code, and is easier to understand and maintain
3.  the UDF can be used directly in a FROM clause; there is no need to create a temporary table or table variable unless you want to store and re-use the values
4.  you can use table variables instead of temporary tables, saving disk I/O and locks in the `tempdb` database
5.  you can pass more data without running into upper limits on the size of varchar, because space-delimited is much less verbose than XML

I would be remiss if I didn&#8217;t mention the downsides:

1.  string-parsing is never efficient, and can be error-prone
2.  you will need to create and maintain UDFs (in my case, I need at least two &#8212; one for strings and one for integers)
3.  you have less flexibility about types and schemas; this technique is only convenient for simple cases

### More about efficiency

SQL server seems to be smart enough to reuse resources within a query batch, so the high cost of using `openxml` only seems to happen on the first invocation in a batch. When I benchmarked it with a thousand iterations, the string-parsing solution&#8217;s constant cost appeared to be about half the constant cost of `openxml` &#8212; not a significant improvement. However, in the common case where it&#8217;s used only once, the string-parsing is much more efficient because there is no startup cost.

All in all, I think string-parsing is the lesser of the evils.

 [1]: /blog/2005/11/15/a-bug-in-microsoft-sql-servers-replace-function/
 [2]: http://msdn.microsoft.com/library/en-us/dnsqlmag01/html/TreatYourself.asp
 [3]: /blog/2005/12/07/the-integers-table/
 [4]: http://web.archive.org/web/20050326014057/http://www.bizdatasolutions.com/tsql/sqlarrays.asp
 [5]: /blog/2005/09/28/simulating-the-group-concat-function/