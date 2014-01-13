---
title: How to use extended properties as documentation with sp_showdoc
date: "2005-12-08"
url: /blog/2005/12/08/sp_showdoc/
---
My current employer has created a policy for documenting database tables. When tables are created or modified, we are required to add extended properties to the tables and columns. SQL Server 2000&#8242;s extended properties are name/value pairs, which can be attached to most objects. There are a few different ways to view them:

*   as the "Description" field in the "Design Table" dialog in Visual Studio
*   by right-clicking on an object in the Object Browser in Query Analyzer
*   with system stored procedures and built-in functions such as `fn_listextendedproperty`

None of these is convenient or safe when browsing around the databases. Given all the hassles and risks, I decided to write my own system stored procedure to display the documentation. It should be created in `master`, so it can be called as though it exists in every database. It returns one row for the table's documentation, followed by one row for each column's documentation. Here's the code:

<pre>create procedure sp_showdoc
    @tablename sysname
as

if object_id(@tablename) is null
begin
    raiserror('Object ''%s'' does not exist.', 12, 1, @tablename)
    return
end

select cast('Table' as varchar(10)) as type, @tablename as name, prop.value as 'documentation'
    from (
            select object_id(@tablename) as objname
        ) as x
    left outer join dbo.sysproperties as prop(nolock) on prop.id = x.objname
		and prop.type = 3
		and prop.name = 'MS_Description'
union all select cast('Column' as varchar(10)) as type, col.name, prop.value
    from dbo.syscolumns as col(nolock)
    left outer join dbo.sysproperties as prop(nolock) on prop.id = col.id
        and prop.smallid = col.colid
        and prop.type = 4
        and prop.name = 'MS_Description'
    where col.id = object_id(@tablename)</pre>

I'm accessing the `sysproperties` table directly because it's simpler than creating a wrapper around `fn_listextendedproperty`. There are other tweaks that could be made depending on the usage -- for example, return the table and column documentation in separate recordsets.

### Other ways to make a database self-documenting

I think adding arbitrary name/value pairs to objects by inserting them into a single table is a great idea. Even before I worked in SQL Server, I used to create similar tables in MySQL to document relationships between tables. The documentation was machine-readable, so my code could simulate foreign keys, cascading updates and deletes, navigate between related records in different tables, and so forth. Obviously such meta-data can be very powerful.

Nearly three years ago now at my current employer (long before the current standard was even proposed) I volunteered some time to write several ASPs that could be used to browse databases, view and edit documentation, view the text of objects with entries in `syscomments` (such as stored procedures and triggers), and navigate between related structures. My primary motivation was to capture the knowledge I was getting from the DBAs as I picked their brains -- a standard occurrence for new hires. At that time there was no documentation at all, and even then we had dozens of major database servers running hundreds of large databases, each with piles and piles of tables -- and if I wanted to know what some data meant, I had to go ask one of just a couple of people (one of whom has now left the company). Many of our databases contain data related to other databases, but since it's impossible to create foreign keys between databases, the relations can't be expressed in the schema itself. Naming conventions help a little, but many of the tables are from years ago, before naming conventions. We also love to store values in a single integer column as bit fields, and the bit fields can't be foreign keyed even within the same database -- though there are lookup tables where I can find out what the bits mean.

I used just a few extended properties to attach "fake foreign keys" and "links" to objects, and the ASP parsed it all out and magically made the entire structure navigable and easily updatable in a browser window. The interface presented the documentation properties right next to the actual object's schema and other information. It was visually nice and took very few clicks to navigate. I think such a system is pretty much ideal for documenting a database. If I don't have extended properties, I can create my own name/value pair table; it's trivial to do and takes hardly any code, even in ASP.

These are just some thoughts for those curious souls out there looking for ways to document databases. In my opinion, there's just no beating meta-data that's attached to whatever I'm trying to document. I try to make the documentation live as close as possible to the objects I'm documenting, and then create tools to present a nice interface to people who want to use and update the documentation. If it's code, generate the documentation directly from the code (documentation comments and type information); if it's data, create a table of meta-data and generate it from there; if it's XML, annotate the schemas and get it from there.

I think it's important to avoid creating [undocumentation][1], however -- vast amounts of meaningless, obvious, redundant meta-data where no real documentation actually exists. It's worse than no documentation. It might seem cool at first, but I have seen it sour people and kill what might have been a good thing. In my experience, people will get irritated with one bad method of doing a Good Thing, think it's the Thing that's bad, and never give it a second chance after that.

 [1]: http://swigartconsulting.blogs.com/tech_blender/2005/07/the_undocumente.html
