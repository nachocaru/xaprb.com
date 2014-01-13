---
title: "Tables and data part 1: CSS and data types"
date: "2006-01-02"
url: /blog/2006/01/02/tables-and-data-part-1/
categories:
    - Web
---
I don't know how spreadsheets do it internally, but at least from a user's perspective, they derive the default cell format from the type of data in the cell. For example, if I enter a number into a cell, the spreadsheet will right-align it. It will format dates and times according to cultural conventions, and will recognize other data types as well. This is the right way to do it, because the formatting conveys information about the data. Right-aligned numbers are numeric, not textual.

Now switch from spreadsheets to HTML. I have a table with sales data rolled up by day for a week. How do I format it? Do I right-align the numbers, format them with dollar signs and two decimal places, and display negative numbers in red? Do I left-align the days? Or do I just specify the first column as date and the second as currency?

I could do either, but I think it's better to go the second route, and let CSS control the formatting. It's possible to control simple presentation with just CSS and the [HTML `class` attribute][1], the [general-purpose method for adding processing data to HTML elements][2]. I might want more advanced formatting (rearranging the data itself), and in that case I'd need some help from JavaScript. I'll demonstrate all that and more in this series of articles. Let's dive in:

### The foundation

To set the stage, here's some sample data, which I'll use throughout this series of articles:

<table id="table1" class="cleanHeaders elbowroom">
  <caption>Weekly Sales Stats</caption> <tr>
    <th scope="col">
      Date
    </th>
    
    <th scope="col">
      Net Sales
    </th>
  </tr>
  
  <tr>
    <td>
      2005-01-01
    </td>
    
    <td>
      581
    </td>
  </tr>
  
  <tr>
    <td>
      2005-01-02
    </td>
    
    <td>
      557.23
    </td>
  </tr>
  
  <tr>
    <td>
      2005-01-03
    </td>
    
    <td>
      532.1
    </td>
  </tr>
  
  <tr>
    <td>
      2005-01-04
    </td>
    
    <td>
      20.
    </td>
  </tr>
  
  <tr>
    <td>
      2005-01-05
    </td>
    
    <td>
      -82.58
    </td>
  </tr>
</table>

Aside from an alarming trend in the numbers (quick! Get me the VP of Marketing!), this table is pretty uninteresting and hard to read, especially since the numbers aren't formatted consistently (they represent the values accurately, but not legibly). A sample row looks like this:

<pre>&lt;tr&gt;&lt;td&gt;2005-01-05&lt;/td&gt;&lt;td&gt;-82.58&lt;/td&gt;&lt;/tr&gt;</pre>

I used standard formats for the data. The dates are in ISO8601 standard format, and the numbers are just plain&#8230; numbers. No fanciness here. That's intentional, because I want it to be easy for a program to use in a future article (you'll see, it will get pretty complex).

### First steps: formatting, type vs. value

The most immediate benefit comes from specifying visual formatting for the values, to convey information about what they are. I can't think of anything special to do with the dates (visually at least -- adding a `date` class will still convey semantic information), but the numbers can be right-aligned and negative numbers can be red. How can I make negative numbers red? I could add a few classes to the `TD`, for example `class="number currency negative"`.

Does that `negative` belong there? I don't think it does. I'm a data guy, and I don't do hand-coding if I can get a program to do it for me, so I naturally assume the table is generated dynamically and the CSS classes are specified in a template. The CSS will vary by data *type*, and perhaps specify a desired *formatting* based on the data type, but will not vary by the data's actual *value*. I think it's crucial to distinguish between types, presentational styles, and values.

*   `number` is a data type.
*   `currency` is both a presentational instruction and a sub-type of the `number` data type.
*   `negative` is neither type nor presentational -- it's dependent on the data value, not the type or the author's formatting preference. It doesn't belong there.

To keep the type/presentation/value separation clear, I won't mark negative numbers up differently. I'll just add some classes to the `TD` elements to indicate my data type and formatting preferences.

### CSS class name conventions

I used `class="currency"` above as an example, but I'm going to use certain class name conventions to help organize the CSS classes. I'll use the prefix `dt-` to indicate "data type," and `dst-` to mean "data subtype." Here are the values I'll use:

<table class="cleanHeaders elbowroom">
  <tr>
    <th scope="col">
      Data Type
    </th>
    
    <th scope="col">
      Class Name
    </th>
    
    <th scope="col">
      Misc
    </th>
  </tr>
  
  <tr>
    <td>
      Date
    </td>
    
    <td>
      dt-datetime
    </td>
    
    <td>
      All date and time data.
    </td>
  </tr>
  
  <tr>
    <td>
      Date and Time
    </td>
    
    <td>
      dst-date
    </td>
    
    <td>
      Date only; no time information.
    </td>
  </tr>
  
  <tr>
    <td>
      Numeric
    </td>
    
    <td>
      dt-number
    </td>
    
    <td>
      All numeric data, including currency.
    </td>
  </tr>
  
  <tr>
    <td>
      Currency
    </td>
    
    <td>
      dst-currency
    </td>
    
    <td>
      A subset of <code>number</code>.
    </td>
  </tr>
  
  <tr>
    <td>
      Currency Type
    </td>
    
    <td>
      dst-???
    </td>
    
    <td>
      Use ISO 4217 currency codes.
    </td>
  </tr>
</table>

I can think of many other variations, but [I'll invent them when I need them][3]. The sample row now looks like this:

<pre>&lt;tr&gt;
    &lt;td class="dt-datetime dst-date"&gt;2005-01-05&lt;/td&gt;
    &lt;td class="dt-number dst-currency dst-USD"&gt;-82.58&lt;/td&gt;
&lt;/tr&gt;</pre>

That's as far as I'll take it with plain CSS at this point -- I'm happy with the markup. It is structural and semantic, but not presentational; the CSS will handle that later.

### Future possibilities

I could push the limits a bit, but the techniques I'd have to use are either not widely supported or not part of current standards. However, some will very likely be widely implemented in the future, so they are interesting enough that I want to discuss and demonstrate the possibilities:

*   Align cells along a string. No browser, as far as I know, currently supports this -- and that's understandable because it would be really hard and the spec has some problems -- but the CSS 2.1 spec says you could theoretically [line numbers up along the decimal point][4]. In my opinion, this won't happen in the forseeable future, so I'll just mention it in passing and forget about it.
*   Use the `:before` pseudo-element to add the currency sign before currency values, according to the currency type. This won't work in IE.
*   Change the formatting based on the value itself. With some limitations, this works well. For example, add parentheses around negative numbers. This requires matching some part of the data in the stylesheet, which isn't currently possible. There is a workaround though, which will be very useful for other purposes too: use the `abbr` attribute to hold a copy of the value. Then the CSS can match the attribute value. CSS 2.1 allows only very limited matching (see [section 5.8.1][5]), but CSS3 will probably allow more options (see [section 6.3][6]), most importantly the substring matching selectors. For example, it would be possible to style numeric data beginning with "-" differently -- perhaps making it red, perhaps using `before:` and `after` to add parentheses. Currency values that don't end in a decimal place and exactly two zeros could be fixed up. Even though the attribute matching is still pretty limited, it would allow a lot of flexibility -- and you know how web programmers are. Some bright kid is sure to figure out ways to combine all sorts of technologies and make it sing and dance.
*   If the application is not HTML, but is some other variant, such as XHTML or just XML, other technologies such as XSLT and XPath can do far more complex processing.

These techniques could change the actual value the user sees, which brings up a related issue: am I lying about the data if I change the displayed value? In my opinion, no, I'm just showing the user one particular *view* of the data. The document contains the same data no matter what the browser displays. There are many views on a single bit of data, and making the view independent of the data is a good thing. There's precedent for this practice even in HTML and CSS -- `text-transform` is an obvious example. In other technologies, it's taken for granted that the user never sees raw data, only views of it. Heck, even a browser is just one view of an HTML document!

Even though many of these techniques aren't well supported, some of them are. Here is a [demo][7] so you can see all of the above -- both supported and unsupported -- in action. Let me know what you think!

### Upcoming work

That's all for now. In upcoming articles, several threads (JavaScript, date and number formatting, CSS, tables) are going to start converging, and I'll introduce a lot more material. You'll see how to add load-time processing to your tables, apply predefined and user-defined format strings by naming them in the CSS, get around the row/column multiple-hierarchy problem so you don't have to specify the classes on every single row or cell separately, allow users to really choose their preferred view of the data, and maybe even more. Stay tuned!

 [1]: http://www.w3.org/TR/html4/struct/global.html#adef-class
 [2]: http://www.w3.org/TR/html4/struct/global.html#h-7.5.2
 [3]: http://xp.c2.com/YouArentGonnaNeedIt.html
 [4]: http://www.w3.org/TR/REC-CSS2/tables.html#column-alignment
 [5]: http://www.w3.org/TR/CSS21/selector.html#q10
 [6]: http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#attribute-selectors
 [7]: http://www.xaprb.com/articles/tables-and-data-1.html
