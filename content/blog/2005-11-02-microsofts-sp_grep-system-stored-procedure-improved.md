---
title: "Microsoft's sp_grep system stored procedure improved"
date: "2005-11-02"
permalink: /blog/2005/11/02/microsofts-sp_grep-system-stored-procedure-improved/
---
Here is a quick patch to Microsoft's sp_grep system stored procedure, for SQL Server 2000. The changes will enable searching job steps, and return the correct object type for functions. The MS-supplied stored procedure isn't that well-written (doesn't even use ANSI joins), but this patch doesn't correct any style or other issues.

<pre>34a32,36
&gt; insert into #tset
&gt;   select distinct '', j.name, 'JB' from msdb..sysjobs as j(nolock)
&gt;     inner join msdb..sysjobsteps as js(nolock) on j.job_id = js.job_id
&gt;   where js.command like @str or j.name like @str
&gt; 
40a43,44
&gt;   when type = 'FN' then 'Function'
&gt;   when type = 'JB' then 'Job'</pre>

I have seen variations in this sproc to prevent grepping where the user has no access to the database, viz:

<pre>if HAS_DBACCESS(@name) = 1
  ...
else
    print 'Skipped ' + @name</pre>

I don't think this is safe. If the user doesn't have access to the database, I think it's better to die, instead of lying by omission about the results (in case the user isn't viewing the results in text mode, and doesn't see the message printed out). However, it's a fine idea to add an extra entry in `#tset`, add a case to the case statement at the end, and show the user something like `Denied! Access denied to DB 'master', dude!`.
