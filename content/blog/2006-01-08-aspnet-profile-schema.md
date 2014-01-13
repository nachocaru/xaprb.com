---
title: "ASP.NET's Profile DB schema"
date: "2006-01-08"
url: /blog/2006/01/08/aspnet-profile-schema/
categories:
    - Programming
	 - Databases
---
ASP.NET has built-in functionality to store profile information about a user. The DB table schema has several design trade-offs that make it somewhat inflexible for certain uses.

ASP.NET will write a custom class, given the properties you want, such as name and birthdate. It will also take care of hooking the plumbing up in the database (there is a little script to create the profile tables in the database). It then stores and retrieves the data on subsequent requests. The feature can handle both text and binary data, but for simplicity's sake, I'll just ignore the binary. Since the profile could contain arbitrary information, the table has to be designed to accommodate any type of data -- essentially name/value pairs. Here's the table schema:

<pre>CREATE TABLE dbo.aspnet_Profile (
    UserId uniqueidentifier NOT NULL PRIMARY KEY CLUSTERED,
    PropertyNames ntext NOT NULL,
    PropertyValuesString ntext NOT NULL,
    PropertyValuesBinary image NOT NULL,
    LastUpdatedDate datetime NOT NULL
)</pre>

Hmmm, that's an interesting schema. How do you store name/value pairs in that? I'd expect to see a `UserID` column and a `Name` column, with the primary key on `UserID` and `Name`, but it looks like they must be storing the data another way. For one thing, there can't be multiple rows per user -- all the values have to be in one row. I could see someone arguing that's a good idea, because it would keep the data all on one page -- but the columns are `ntext` and `image` so they're not stored in-page anyway. That results in a compact table, with a small clustered index to seek for the user's row, but then the DB has to seek to other pages and find the data stored in those three columns. So how is the data stored?

<pre>select top 1 UserId, PropertyNames, PropertyValuesString from aspnet_Profile;</pre>

Results:

<table class="borders collapsed compact">
  <tr>
    <th>
      UserId
    </th>
    
    <th>
      PropertyNames
    </th>
    
    <th>
      PropertyValuesString
    </th>
  </tr>
  
  <tr>
    <td>
      017D&#8230;[snip]&#8230;
    </td>
    
    <td>
      User.LName:S:0:5:User.FName:S:5:4:
    </td>
    
    <td>
      SmithJohn
    </td>
  </tr></table> 
  
  <p>
    Yuck! So the object just dehydrates itself in a similar fashion as PHP's <a href="http://www.php.net/manual/en/function.serialize.php"><code>serialize</code></a> and re-writes the entire row whenever it saves itself into the database (I'm guessing it re-writes the entire row; perhaps it's smart enough to know that the binary data doesn't need to be re-written if only the text has changed, though the design doesn't instill much confidence about that). This is a very bad design. The table isn't even first normal form. There is also no decent way to use this data except through the Profile objects. I can't grab the data and query it for reports or whatnot. And finally, those ubiquitous Microsoft <code>uniqueidentifier</code> 128-bit surrogate keys are rearing their ugly heads.
  </p>
  
  <p>
    I'm surprised and nonplussed. After all the gazillions of dollars that went into ASP.NET 2.0&#8230; I'll give them some credit and say "it's good that they found a way to store the data in the table without customizing the table schema based on the desired profile properties," but this design is barely a step up from that. This schema is missing all the obvious benefits of normalization.
  </p>
