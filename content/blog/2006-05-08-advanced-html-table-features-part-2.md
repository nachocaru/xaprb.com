---
title: Advanced HTML table features, Part 2
author: Baron Schwartz
excerpt: '<p>This is the second article in a two-part series on understanding and using advanced features in HTML tables.  It explains how the <code>AXIS</code> attribute defines multiple dimensions within tables, and what that implies about their true capabilities.</p>'
layout: post
permalink: /2006/05/08/advanced-html-table-features-part-2/
description:
  - "Explains how HTML's AXIS attribute allows an author to encode multi-dimensional data into two-dimensional tables, and to encode relational data into hierarchical tables."
---
This is the second article in a two-part series on understanding and using advanced features in HTML tables. In the first part I explained a few of the simpler features. In this article I&#8217;ll explain how the `axis` attribute allows an author to encode *multi*-dimensional data into *two*-dimensional tables, and to encode *relational* data into *hierarchical* tables.

### Encoding multiple dimensions

There are lots of places where data has more than two dimensions &#8212; or where I might want to break data apart into more than two dimensions.

As just one example, take business intelligence analysis in a relational database. Star schemas and data cubes are built expressly for the purpose of slicing and aggregating data by dimensions and measures.

I know that&#8217;s a mouthful if you&#8217;re not familiar with this type of analysis. What I&#8217;m saying is, data comes in a lump, and I want to slice and dice it a bunch of ways. For example, if I&#8217;m doing BI for a catalog retailer, I want to be able to analyze orders

*   over time
*   by number of items
*   per buyer
*   by buyer frequency
*   by total dollar amount
*   by geographic location
*   by sign of zodiac&#8230;

Any seemingly simple data actually has tons and tons of information in it, all along different *dimensions*, and if I squint along the right dimensions, I see patterns that aren&#8217;t obvious otherwise. Some of the dimensions are inherent to the data itself, and others need to be indicated explicitly. For instance, the total number of orders is inherent to a set of data &#8212; I count the set to find it. Whether each order is a gift is NOT inherent to the set of data; this I need to indicate in each order. Once I have encoded that information, it&#8217;s possible to slice the data along yet another dimension (gift/non-gift).

The `axis` attribute allows me to [specify to which dimensions each cell belongs][1]:

<blockquote cite="http://www.w3.org/TR/html4/struct/tables.html#adef-axis">
  <p>
    This attribute may be used to place a cell into conceptual categories that can be considered to form axes in an n-dimensional space&#8230; The value of this attribute is a comma-separated list of category names.
  </p>
</blockquote>

I know of no user agent which currently does the kinds of gymnastics mentioned in the spec (it sounds like the authors of the spec envision user agents as SQL databases, and users themselves as data analysts), but the capability is there in the data. I can encode rich semantic information into table cells with `axis`, basically categorizing each little bit of data. And I can do it on a cell-by-cell basis &#8212; the finest granularity possible in a table.

It&#8217;s a similar concept to the way people are &#8220;tagging&#8221; things on the web these days. Since I can add as many axes to my table as I want just by putting them into the cells, there can be many-to-many relationships between the data and the axes/tags/categories.

### The multiple-hierarchy problem

HTML&#8217;s essential nature is hierarchical, because elements are contained inside other elements. Whenever I encode data in one hierarchy, I rule out placing it into another. Yet *I almost always want multiple hierarchies* &#8212; this is a truism I&#8217;ve seen time after time in real-life applications, and it always frustrates people because it severely limits what they can do with the data.

Here&#8217;s a real example of the multiple-hierarchy problem. At my previous employer, I was tasked with integrating an analysis software package into a website. The package created a set of nested categories and subcategories for each page and product, and when a user visited a page, they recorded the page visit. Their analysis system, which the marketing and creative teams used, allowed what data-analysis folks often call &#8220;drill-down&#8221; &#8212; start viewing overall stats at the top (whole website), then navigate down through the categories to view statistics about each one. So, if I started at the top, then navigated to Men&#8217;s Wear, then to Shoes, I could see how the men&#8217;s shoes pages performed. I could do the same thing with Women&#8217;s Wear/Shoes, or Children&#8217;s/Shoes. But I could *not* get a summary of all pages about shoes.

This is a predictable situation. It happens every time someone tries to &#8220;categorize&#8221; things with a hierarchy. What the teams wanted was relational data, not hierarchical (actually, hierarchies *are* relational, but they only allow one kind of relationship: parent to child).

Another example of where people want to escape a single hierarchy is tables themselves &#8212; lots of people want the `colgroup` element to apply CSS properties to &#8220;child&#8221; cells, but it can&#8217;t because of the strict element hierarchy (`colgroup` is not really the parent element of any table cells at all). You can read hundreds of comments about this on Mozilla bug [915][2].

### Flatten out the hierarchy with `axis`

It&#8217;s just not possible to have multiple hierarchies; the only way to break out of it is to encode relational data as relational, not hierarchical. That&#8217;s what `axis` can do. Instead of building a strict hierarchy, I can build a flat table, then encode enough meta-data to let a processing application categorize the data as needed.

The HTML spec says `axis` is for categorizing data, potentially for [rendering tables in non-visual user agents][3], but there&#8217;s no reason that data can&#8217;t be used for other things too, such as processing by scripts. The possibilities are pretty much limitless. Just consider how scriptable the `class` attribute is &#8212; `axis` offers similar power, but it&#8217;s decoupled from CSS, so it&#8217;s potentially even simpler.

### Example: the color chooser

This article is getting long, so I&#8217;ll wrap up with a simple example of multi-dimensional data commonly encoded in two dimensions: the familiar color chooser. Here are several color choosers from various systems:

<img src="/articles/images/dreamweaver-color-chooser.png" width="181" height="121" alt="Dreamweaver Color Chooser" />

Dreamweaver&#8217;s color chooser flattens three dimensions (red, green, blue) into two by slicing the cube into layers and placing them next to each other. Notice how there are two rows of three six-by-six blocks of color &#8212; six blocks of six by six. You can see the same strategy at a paint store. If you step back and unfocus your eyes, you can always see blocks of color next to each other.

<img src="/articles/images/gimp-color-chooser-1.png" width="188" height="217" alt="GIMP Color Chooser" />

This color chooser from the GIMP flattens the three dimensions (hue, saturation and luminance) into two by placing hue in the narrow bar on the right, and the saturation and luminance in the square on the left. The selected hue is red, all the way at the top of the bar.

<img src="/articles/images/gimp-color-chooser-2.png" width="188" height="215" alt="GIMP Color Chooser" />

This one is from the GIMP again, but it&#8217;s a different style. Don&#8217;t let the triangle fool you. It&#8217;s the same dimensions as the first one, presented a bit differently. I guess some people find it easier to use.

<img src="/articles/images/ms-color-chooser.png" width="218" height="267" alt="MS Paint Color Chooser" />

This is from Microsoft Paint. This is also hue, saturation and luminance. Luminance is in the narrow bar at the right. Hue is in the square (left to right), and saturation is too (top to bottom).

If I were to mark up a table of all HTML colors, I might only mark up the cells that fall *on the axes* to indicate where the axes are. In other words, the cell containing the color `#110000` would be on the `red` axis, and the cell containing the color `#001100` would be on the `blue` axis.

Another way I might mark things up would be to indicate when a value falls in a plane. For example, the value `#003377` is in the `green-blue` plane.

I don&#8217;t know why I&#8217;d want to do any of that. I&#8217;m just hypothesizing. It would depend completely on the need I am trying to satisfy.

### So, what do I do with this stuff?

If I were processing tabular data with scripts, and it involved any kind of aggregating or slicing, folding into pivot tables, or so forth, I&#8217;d certainly be using the features I&#8217;ve discussed above. Right now, though, I&#8217;m not doing any of that. I&#8217;ve had some cool data-processing articles, including scripts that do this kind of fancy processing, in draft form for about 6 months&#8230; someday I&#8217;ll finish them.

Until then, invent your own uses! How about a script that iterates over every cell, collecting a list of all axes, then populates a drop-down menu with the axes so a user can choose to do something to one axis at a time? By &#8220;do something,&#8221; I mean it could hide the other cells, or do some math on the selected axis. For example, you could have another drop-down menu of functions on the selected cells, like a spreadsheet&#8217;s status-bar display (sum, avg, etc):

<img src="/articles/images/calc-status-bar-functions.png" width="240" height="202" alt="OpenOffice.org Calc's status bar summary function" />

### Summary

In this article I explained how the `axis` attribute of table cells can indicate to which axes the cell belongs in a multi-dimensional space, the multiple hierarchy problem and how to solve it, and gave some examples of flattened-out multi-dimensional data. This article is probably a solution in search of a problem, but given that the `axis` attribute isn&#8217;t used very much and might also be a solution without a problem, I don&#8217;t mind :-)

 *[BI]: Business Intelligence

 [1]: http://www.w3.org/TR/html4/struct/tables.html#multi-dimension
 [2]: https://bugzilla.mozilla.org/show_bug.cgi?id=915#c27
 [3]: http://www.w3.org/TR/html4/struct/tables.html#h-11.4