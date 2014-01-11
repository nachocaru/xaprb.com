---
title: How to display an HTML table as a folder tree
author: Baron Schwartz
excerpt: |
  <p>XHTML tables provide several elements to group and structure data, including <a href="http://www.w3.org/TR/REC-html40/struct/tables.html#rowgroups">row groups</a> (<code>thead</code>, <code>tbody</code>, and <code>tfoot</code>).  Styling row groups with CSS can make data relationships visually obvious.  One familiar way to group data visually is with Explorer-style folder icons.</p>
  
  <div style="text-align:center"><img src="/articles/images/folder-view-slug.png" alt="Data grouped as a folder view" height="85" width="218" /></div>
layout: post
permalink: /2006/01/10/grouping-data-visually-with-row-groups/
description:
  - >
    Demonstrates how to display an HTML table as an Explorer-style folder tree using
    only CSS.
---
XHTML tables provide several elements to group and structure data, including [row groups][1] (`thead`, `tbody`, and `tfoot`). Styling row groups with CSS can make data relationships visually obvious. One familiar way to group data visually is with Explorer-style folder icons.

<div style="text-align:center">
  <img src="/articles/images/folder-view-slug.png" alt="Data grouped as a folder view" height="85" width="218" />
</div>

The basic idea is to use `tbody` as many times as needed to group each set of rows together. The image above shows a single `tbody` element. I think using multiple `tbody` elements may not occur to developers because it sounds like there ought to be only one &#8212; but that's not true. Tables can have as many `tbody` elements as you want. You can optionally have one (and only one) `thead` and `tfoot` too. Read the [Tables in HTML documents][2] part of the HTML spec for more, if you want (there's no need to for this article).

The next thing to do is add some CSS. The image will go at the far left of the leftmost (first) `td` as a background image, and I'll add some left-padding to keep the text from overlapping the image. I identify the leftmost column with the `first-child` class.

Next, the first and last rows in the group need special treatment. The middle rows get a little dotted "tree-view" extender line, but the first row needs a folder icon and the last needs the extender line not to continue downward (because there's nothing below it to connect to). To accomplish this, the first row in the group gets the `first-child` class, and the last gets `class="last-child"`. Now I can use these to set different background images for the first and last rows in the group.

If I knew that my browser was a Good Browser such as Opera, Firefox or Konqueror, I could use the CSS selector `:first-child` instead of adding classes, but since IE is still popular, I'm adding the classes to the HTML instead.

This part is optional, but I like to do it because it keeps the number of images down: use exactly the same image for every row (first, middle and last), and set the `background-position` property so a different part of the image will show up (top, middle, and bottom of the image).

That's it! Here's a [demo][3].

Another option is to re-code the first row of each group with `th` elements instead of `td`. The `scope` attribute can then be set to `rowgroup`, which conveys additional semantic meaning about the row and eliminates the need to add the `first-child` class to the `tr`. Whether I do that depends on the data. I don't think it makes sense for my demo, but I can imagine data applications where it does. I can also imagine making the leftmost column `th` instead of `td` in my sample data; that strikes me as appropriate. Regardless of how I do it, if I mark the data up semantically, I can use CSS to reflect that meaning visually.

 [1]: http://www.w3.org/TR/REC-html40/struct/tables.html#rowgroups
 [2]: http://www.w3.org/TR/REC-html40/struct/tables.html
 [3]: /articles/row-groups-folder-demo.html
