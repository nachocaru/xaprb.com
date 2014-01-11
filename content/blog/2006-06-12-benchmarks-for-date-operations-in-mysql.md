---
title: Benchmarks for DATE operations in MySQL
date: "2006-06-12"
permalink: /2006/06/12/benchmarks-for-date-operations-in-mysql/
---
This article compares the relative speed of extracting the date part of a value in MySQL with `LEFT()` and with the `DATE()` function.

`LEFT()` is faster than `DATE()`. To prove this, I inserted two million un-indexed sequential values into a table and selected the minimum and maximum values. Both queries are table scans, so it does read through all the records. The table below lists the time in seconds for `MAX()` on my computer. I tested with three data types: `DATE`, `TIMESTAMP` and `DATETIME`.

<table class="borders collapsed">
  <caption>Date operation benchmarks</caption> <tr>
    <th scope="row">
      Type
    </th>
    
    <th scope="row">
      Time for <code>DATE(col)</code>
    </th>
    
    <th scope="row">
      Time for <code>LEFT(col, 10)</code>
    </th>
  </tr>
  
  <tr>
    <th scope="col">
      TIMESTAMP
    </th>
    
    <td>
      2.69
    </td>
    
    <td>
      1.28
    </td>
  </tr>
  
  <tr>
    <th scope="col">
      DATETIME
    </th>
    
    <td>
      1.67
    </td>
    
    <td>
      0.48
    </td>
  </tr>
  
  <tr>
    <th scope="col">
      DATE
    </th>
    
    <td>
      1.63
    </td>
    
    <td>
      0.39
    </td>
  </tr>
</table>

I don't know why it's faster to use `LEFT()` than `DATE()`. I would assume the reverse to be true, but clearly it's not, at least on the systems I've tested.

The time for `MIN()` is one or two milliseconds faster than `MAX()`, probably because the values are sequential and only one assignment is performed, whereas the `MAX()` query must perform two million assignments.
