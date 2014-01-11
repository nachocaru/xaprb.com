---
title: How to use meta-data to sort itself
date: "2006-06-04"
permalink: /2006/06/04/how-to-use-meta-data-to-sort-itself/
description:
  - >
    Explains how meta-data can store meta-data about itself, which can then be
    applied to itself and the real data.
---
I'm a big fan of meta-data stored in the database. I love having a table that records arbitrary data about data. In fact, such a table can even be used to store meta-data about itself. In this article I'll explain how to use meta-data to define a sort order for both itself and the data to which it's related.

I've mentioned an online cemetery database several times. One of the great things about this project is it doesn't need custom-designed interfaces for every view on the data; the interfaces can be automatically generated. This was simple until the customer wanted the fields to be ordered a certain way. Since the interfaces are automatically generated from the meta-data, I hadn't built that feature in.

After bit of thought, I found a way to do it easily.

### The setup

Here's the table schema for the meta-data:

<pre>create table meta (
   t varchar(50) not null, -- table
   c varchar(50) not null, -- column
   name varchar(50) not null,
   value varchar(50) not null,
   primary key(t, c, name)
)</pre>

### Defining a sort order

I knew I wanted entries in this table to define a sort order. For the `marker` table, for instance, I'd need entries that looked like this:

<table class="borders collapsed">
  <tr>
    <th scope="col">
      t
    </th>
    
    <th scope="col">
      c
    </th>
    
    <th scope="col">
      name
    </th>
    
    <th scope="col">
      value
    </th>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      width
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      height
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td colspan="4">
      &#8230; etc &#8230;
    </td>
  </tr>
</table>

That data would sort the marker's width first, followed by the height, and so forth.

So far, so good. The only complicating factor was the customer wanted certain fields first, others all the way at the end, and the rest she didn't care about. To ease maintenance, I decided to leave the columns in the middle to fall where they may, so I needed my sorting technique to work correctly when sort order isn't specified.

I decided no table is likely to have more than a couple dozen columns, so I built in a "default" sort value of 50, and allowed pulling fields to the front with low numbers, or pushing them to the end with high numbers (up to 99). The resulting data looks like this:

<table class="borders collapsed">
  <tr>
    <th scope="col">
      t
    </th>
    
    <th scope="col">
      c
    </th>
    
    <th scope="col">
      name
    </th>
    
    <th scope="col">
      value
    </th>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      width
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      height
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      notes
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      98
    </td>
  </tr>
  
  <tr>
    <td>
      marker
    </td>
    
    <td>
      misc
    </td>
    
    <td>
      sort
    </td>
    
    <td>
      99
    </td>
  </tr>
</table>

### Getting the data

I wanted my interface-building query to retrieve all meta-data about the desired table, already sorted in the defined order (I don't like to sort things in code; that's what databases are for). The query to fetch the meta-data *without* the ordering is pretty simple:

<pre>select m.*
from meta as m
where m.t = 'marker'</pre>

To add the ordering, I have to join the meta table to the "sort" subset of itself. To make sure all the meta-data is included in the results even if it has no defined sort order, I use a left join. Since there's a left join, the "default" sort position of 50 is implemented with a `COALESCE`, and to make string data sort as though it's numeric, I left-padded everything with zeroes to a width of 2 characters:

<pre>select m.*
from meta as m
    left outer join meta as s on m.t = s.t
        and m.c = s.c
        and s.name = 'sort'
where m.t = 'marker'
order by lpad(coalesce(s.value, "50"), 2, "0")</pre>

*Et voila*, meta-data that sorts itself.
