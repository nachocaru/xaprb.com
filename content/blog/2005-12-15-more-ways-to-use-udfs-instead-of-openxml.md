---
title: "More alternatives to <code>openxml</code>"
author: Baron Schwartz
excerpt: '<p>Here are some alternate usage scenarios for the UDF I wrote to avoid <code>openxml</code> in SQL Server 2000.</p>'
layout: post
permalink: /2005/12/15/more-ways-to-use-udfs-instead-of-openxml/
---
Following up on my [earlier post][1], here are some alternate usage scenarios for the UDF I wrote to avoid `openxml` in SQL Server 2000.

The most obvious variation is to create different versions to return various data types, such as `INTEGER` or `DATETIME` or whatnot. I started to do this, but then realized it's silly. If I duplicate the code for every datatype, what have I accomplished besides duplicating code? The input is `VARCHAR`, so it's getting implicitly converted at some point no matter what. It's better for me to let the end user do the conversion, and not duplicate any code.

My next thought was a function to split apart name-value pairs, such as `width=100 height=200 color=blue`. Such a function should return three columns: `name`, `value` and `ident`. Again, once I wrote the code, I felt silly. There are at least two fine ways to do it without a new function. One is to pass the names in one input and the values in another. The other is to use two delimiters and just use `SUBSTRING` to split them apart. In either case, it's pretty simple; the UDF is doing the looping, and the rest can be done with standard SQL. Here are two ways to do this:

<pre>declare @Names varchar(8000),
    @Values varchar(8000),
    @NameValues varchar(8000),
    @Delim1 char(1),
    @Delim2 char(1)
select @Names = 'width height color',
    @Values = '100 200 blue',
    @NameValues = 'width=100 height=200 color=blue',
    @Delim1 = ' ',
    @Delim2 = '='

select l.word as name, r.word as value, l.ident
from dbo.fn_SplitWords(@Names, @Delim1) as l
    inner join dbo.fn_SplitWords(@Values, @Delim1) as r
        on l.ident = r.ident

select 
    substring(word, 1, charindex(@Delim2, word) - 1) as name,
    substring(word,
        charindex(@Delim2, word) + 1,
        len(word) - charindex(@Delim2, word)) as value,
    ident
from dbo.fn_SplitWords(@NameValues, @Delim1)
where charindex(@Delim2, word) &gt; 0</pre>

Both queries yield the same results:

<table class="borders collapsed">
  <caption>Results</caption> <tr>
    <th>
      name
    </th>
    
    <th>
      value
    </th>
    
    <th>
      ident
    </th>
  </tr>
  
  <tr>
    <td>
      width
    </td>
    
    <td>
      100
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      height
    </td>
    
    <td>
      200
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      color
    </td>
    
    <td>
      blue
    </td>
    
    <td>
      3
    </td>
  </tr>
</table>

These methods both have a shortcoming: it's not possible to pass missing or zero-length values for a given name. Here is a query that does:

<pre>declare @NameValues varchar(8000),
    @Delim1 char(1),
    @Delim2 char(1)
select @NameValues = 'width=100 height=200 color=blue weight= length',
    @Delim1 = ' ',
    @Delim2 = '='

select 
    case when charindex(@Delim2, word) &gt; 0
        then substring(word, 1, charindex(@Delim2, word) - 1)
        else word end
    as name,
    case when charindex(@Delim2, word) &gt; 0
        then substring(word,
        charindex(@Delim2, word) + 1,
        len(word) - charindex(@Delim2, word)) end
    as value,
    ident
from dbo.fn_SplitWords(@NameValues, @Delim1)</pre>

<table class="borders collapsed">
  <caption>Results</caption> <tr>
    <th>
      name
    </th>
    
    <th>
      value
    </th>
    
    <th>
      ident
    </th>
  </tr>
  
  <tr>
    <td>
      width
    </td>
    
    <td>
      100
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      height
    </td>
    
    <td>
      200
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      color
    </td>
    
    <td>
      blue
    </td>
    
    <td>
      3
    </td>
  </tr>
  
  <tr>
    <td>
      weight
    </td>
    
    <td>
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      length
    </td>
    
    <td>
      NULL
    </td>
    
    <td>
      5
    </td>
  </tr>
</table>

From first to last, each of these queries is more flexible and complex than the preceding one. Therefore I prefer them in that order.

 [1]: /blog/2005/11/15/use-microsoft-sql-servers-openxml-sparingly/
