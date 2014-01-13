---
title: How to simulate the GROUP_CONCAT function
date: "2005-09-28"
permalink: /blog/2005/09/28/simulating-the-group-concat-function/
---
MySQL 4.1 adds a number of new aggregate functions, among them [GROUP_CONCAT][1]. Earlier versions require you to build and compile the function as a C++ extension, which I'm told is easy. However, that is usually not possible in a shared hosting environment.

It is possible to use [user variables][2] to write some queries without GROUP_CONCAT. The key is to understand how MySQL implements selects. As the following example shows, it really loops through each row one at a time, evaluating the expression for each. This example uses the same `fruits` table as in my article on [simulating the ROW_NUMBER function][3]:

<pre>set @result = '';
select @result := concat(@result, variety, ' ') 
from fruits where type = 'apple';
+------------------------------------------+
| @result := concat(@result, variety, ' ') |
+------------------------------------------+
| fuji                                     |
| fuji gala                                |
| fuji gala limbertwig                     |
+------------------------------------------+
select @result;
+-----------------------+
| @result               |
+-----------------------+
| fuji gala limbertwig  |
+-----------------------+</pre>

It is possible to get similar functionality from Microsoft SQL Server 2000 with a local variable.

<pre>declare @result varchar(8000);
set @result = '';
select @result = @result + name + ' '
    from master.dbo.systypes;
select rtrim(@result);</pre>

The result is the string "image text uniqueidentifier tinyint smallint int smalldatetime real money datetime float sql_variant ntext bit decimal numeric smallmoney bigint varbinary varchar binary char timestamp nvarchar nchar sysname." It is necessary to initialize the string to " before the select, because NULL concatenates to NULL.

 [1]: http://dev.mysql.com/doc/mysql/en/group-by-functions.html
 [2]: http://dev.mysql.com/doc/mysql/en/variables.html
 [3]: /blog/2005/09/27/simulating-the-sql-row_number-function/
