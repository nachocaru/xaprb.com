---
title: How to flatten hierarchies with awk
date: "2006-03-04"
permalink: /2006/03/04/awk-categories/
---
Suppose you have a spreadsheet with columns of product category names and numbers. The product hierarchy has two levels, indicated by writing top-level categories without numbers. How do you flatten the hierarchy quickly for insertion into a relational database? My solution is `awk`. In this article I'll show you some sample data, demonstrate how to process and reformat it with `awk`, and explain how to avoid some basic pitfalls.

### Sample data

Here is the sample data in the spreadsheet, with header columns removed:

<table class="borders collapsed">
  <tr>
    <td>
      Books
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Novels
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      Biographies
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      Self-Help
    </td>
    
    <td>
      3
    </td>
  </tr>
  
  <tr>
    <td>
      Music
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Rock
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      Jazz
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
      Classical
    </td>
    
    <td>
      6
    </td>
  </tr>
</table>

The top-level entries have no identity themselves; it is not possible to place a product into a top-level category. Since I want to insert the categories into a database for an application to use, I don't want these entries at all. I want to flatten everything out, separating the levels with `>`. Here is my desired result:

<table class="borders collapsed">
  <tr>
    <td>
      Books > Novels
    </td>
    
    <td>
      1
    </td>
  </tr>
  
  <tr>
    <td>
      Books > Biographies
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      Books > Self-Help
    </td>
    
    <td>
      3
    </td>
  </tr>
  
  <tr>
    <td>
      Music > Rock
    </td>
    
    <td>
      4
    </td>
  </tr>
  
  <tr>
    <td>
      Music > Jazz
    </td>
    
    <td>
      5
    </td>
  </tr>
  
  <tr>
    <td>
      Music > Classical
    </td>
    
    <td>
      6
    </td>
  </tr>
</table>

I could do this any number of ways, but since it lends itself well to line-by-line processing, I elected to use `awk`. Perl would have worked just as well.

### Flattening the categories

The basic idea is to examine each line and see if it has a category number. If it doesn't, it's a parent category, and I save its name to a variable. If it does, it's a child category, and I print out the (saved) parent's name, the angle bracket, and its own name, followed by the category number. Here's some code to do that:

<pre>/\t$/ {
    current = $1 " > ";
}

/\t.+$/ {
    printf("%s %s\t%d\n", current, $1, $2);
}</pre>

The first block matches anything with a tab at the end of the line, and saves the value of the first column to the variable `current`. The second block prints out `current`, the first column, and the second column. I saved it to `transform.awk` and invoked it like so:

<pre>awk -f transform.awk original.csv</pre>

Since the CSV file's fields are surrounded by double quotes, I piped the result through `sed` to nuke them:

<pre>awk -f transform.awk original.csv | sed -e 's/"//g'</pre>

### More ideas

I can use this general idea in a number of ways. Unfortunately, the original CSV format is slightly hare-brained, so this doesn't generalize to hierarchies deeper than two levels. One file I transformed did have several levels of hierarchy. The top-level categories were bolded, intermediate were not, and "leaf nodes" had a number. As an Excel spreadsheet, the bolding is fine. Once it's saved to a CSV file, the bolding disappears. I tried the following script to get me partway there:

<pre>/\t$/ {
        level = level + 1;
        if (level == 1) {
                level1 = $1;
                current = $1 " > ";
        }
        if (level == 2) {
                level2 = $1;
                current = level1 " > " $1 " > ";
        }
}

/\t.+$/ {
        level = 0;
        printf("%s %s\t%d\n", current, $1, $2);
}</pre>

That's fine as far as it goes, but it's not a complete solution. A quick Vim macro solved the rest of the problem for me. If automating is harder than doing it with a macro, and I won't be doing it a lot, I'll just use a macro. If I do it often, I'll automate ([three strikes and you automate][1]!).

### Pitfalls

*   Watch out for `awk` printing lines that don't have a number. If it's expecting two columns and thinks the second column should be a number, it'll print a zero. That's why the second code block doesn't just print every line.
*   Beware spurious spaces: `printf("%s %s \t %d\n", current, $1, $2);` will cause every number to have leading, and every category name to have trailing spaces.

### Summary

I hope this gives you some ideas on using `awk` for processing files line-by-line. It is built specifically for the job; when you have a file that needs this type of processing, there's no better tool. For a quick one-off job when you don't need complex logic saved in a file, you can easily write an `awk` program right on the command line. For example, to find all non-top-level categories and swap the category and id:

<pre>$ awk '/\t.+$/{print $2 "\t" $1}' original.csv
1       Novels
2       Biographies
3       Self-Help
4       Rock
5       Jazz
6       Classical</pre>

 [1]: http://c2.com/cgi/wiki?ThreeStrikesAndYouAutomate
