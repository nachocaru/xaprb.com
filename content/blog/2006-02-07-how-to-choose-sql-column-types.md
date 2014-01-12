---
title: "How to choose SQL column types: a case study"
date: "2006-02-07"
permalink: /2006/02/07/how-to-choose-sql-column-types/
categories:
  - Databases
---
There are at least two important factors to consider when choosing a column type for a <acronym title="Relational database query language">SQL</acronym> database table: technical requirements and semantics. The choice can be confusing, but it is important to get it right. I've seen it done both ways and it's sometimes hard to tell what's wrong -- it just feels wrong. In this article I will explain how to spot these mistakes, and more importantly, how to explain the mistake clearly to others.

I'll assume the data requirements are already known -- in other words, I have all the information I need to decide what type of data will live in the column.

### Technical considerations

Technical considerations are often the first thing many technical people think about when choosing a column type. This is natural; technical prowess is a core strength, so there can sometimes be a tendency to make it the most important factor, or even the **only** factor, in the decision. Resist that tendency!

That said, it's important to consider the storage requirements, indexing characteristics, foreign key relationships and so forth when choosing a column type. Most <acronym title="Relational database management system">RDBMS</acronym>s have extensive documentation about choosing column types. Any specific suggestion other than "consult your documentation" is beyond this article's scope! If you're not intimately familiar with your <acronym title="Relational database management system">RDBMS</acronym>, you might also consider getting help from someone who is.

I assume a highly technical audience for this website, so the only other thing I'll say about technical considerations is "Beware! You need to think more broadly."

### Semantic considerations

It's very valuable to choose column types that describe the data, because the type serves as documentation about the data. Even if the data is documented in a written specification, if I choose the wrong data type, I've contradicted the specification. The only true, authoritative specification of what a system does is the actual implementation, so it needs to be aligned with the reality of the system's purpose, not just its function.

At some point, meaning becomes very important, because there is often a wide latitude within which the technical considerations are immaterial. For example, if data type A, B, and C can all store the data adequately, some people may think "well, at this point it doesn't matter; I can choose any of the three." Be careful with that assumption! When storing a price, for example, `MONEY` or a related type is a much better choice than other numeric types, even if they can store the same data. Conversely, one should never use a `MONEY` type to store something that's not a currency value.

There are also variations on data types that might confuse the issue. For example, in SQL Server 2000 the `DECIMAL` data type has the following storage requirements, depending on the precision (maximum total number of digits, both to the left and right of the decimal point):

<table class="borders collapsed">
  <caption>Storage requirements in SQL Server 2000</caption> <tr>
    <th>
      Precision
    </th>
    
    <th>
      Storage bytes
    </th>
  </tr>
  
  <tr>
    <td>
      1 &#8211; 9
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
      10-19
    </td>
    
    <td>
      9
    </td>
  </tr>
  
  <tr>
    <td>
      20-28
    </td>
    
    <td>
      13
    </td>
  </tr>
  
  <tr>
    <td>
      29-38
    </td>
    
    <td>
      17
    </td>
  </tr>
</table>

I recently saw a table designed with a `DECIMAL(9, 1)` column to hold average customer ratings, whose values range from 0 to 5 with one decimal place. The best data type, in my opinion, is `DECIMAL(2, 1)`. Why did the developer add more precision?

According to the table above, the column requires 5 bytes of storage, whether the precision is 2 or 9. I can almost imagine the developer's train of thought:

> This data is (2, 1) but that needs 5 bytes, and for the same size, I could get (9, 1). That's *free storage*! I should use it!

This imaginary line of reasoning is a fallacy. It values a factor that makes no difference, and ignores one that does.

### Explaining the difference

How do you explain this mindset to someone who's stuck in the "free storage" worldview? Let's look again at the two viewpoints:

*   The developer's line of reasoning was "I can get more capacity for the same storage, so I should."
*   A better train of thought is "this data needs 5 bytes no matter what, so the unneeded extra storage is *valueless*, but the extra documentation provided by the smaller precision is *valuable*."

In other words, one person thinks lack of control over data storage size makes the data storage capacity *very important*. The second person thinks the lack of control makes the data storage capacity *irrelevant*. I agree with the second person.

Notice the contrast between the technical and semantic factors. These two mindsets are in conflict. This is why I emphasized the need to temper the technical person's mindset, because technical people concentrate on their areas of competence. It's important to step back and take the technical blinders off, lest a sub-optimal choice look like the best thing.

How you approach it is up to you, but I might consider holding the unconscious decisions and gut feelings up in the light for conscious examination. I might also emphasize the value of the semantics. In the example I gave above, I simply emailed my thoughts to the <acronym title="Database administrator">DBA</acronym>s, who agreed immediately and changed the column type to `DECIMAL(2, 1)`. Perhaps it can be that simple, perhaps not.

### Define your own types

Many <acronym title="Relational database management system">RDBMS</acronym>s allow user-defined data types. At my current employer, I've never seen this facility used. I would love to see us start doing so, though. It would be very helpful to define types such as `ITEMNO`, `CREDITCARDNO` and `TRACKINGCODE`. I think user-defined types are just as important as roles (another thing we don't use).

User-defined types do bring their own challenges; they require more work, may have technical ramifications (how the <acronym title="Relational database management system">RDBMS</acronym> handles the type across databases or servers where it may not be defined), might cause extra bureaucracy, and there are external factors to think about -- educating a consultant who may need to work with the data, for example. Standard tools and code libraries may not be aware of them, too -- for example, the .NET SqlClient classes. I think user-defined types are worth considering, but of course that's a decision that must be weighed carefully.

### The moral of the story

The moral of the story is "think carefully." Now, if only I were better at that myself! The other moral, of course, is "have fun."
