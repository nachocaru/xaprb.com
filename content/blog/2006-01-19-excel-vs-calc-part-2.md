---
title: How to label Excel and OpenOffice.org XY scatter plots
author: Baron Schwartz
excerpt: |
  <p>In an earlier post I compared <a href="/blog/2005/12/30/excel-calc-number-formatting/">number formatting in Excel vs. OpenOffice.org Calc</a>.  I've learned some more interesting things about both spreadsheets, as regards opening CSV files and adding labels to XY scatter charts (spoiler: both spreadsheets have problems)</p>
  
  <p style="text-align:center"><img src="/articles/images/excel-vs-calc-2.png" alt="Excel vs. Calc" width="162" height="110" /></p>
layout: post
permalink: /2006/01/19/excel-vs-calc-part-2/
description:
  - >
    Explains how to label points on XY scatter plots in Excel and OpenOffice.org
    Calc.
---
In an earlier post I compared [number formatting in Excel vs. OpenOffice.org Calc][1]. I&#8217;ve learned some more interesting things about both spreadsheets, as regards opening CSV files and adding labels to XY scatter charts (spoiler: both spreadsheets have problems)

<p style="text-align:center">
  <img src="/articles/images/excel-vs-calc-2.png" alt="Excel vs. Calc" width="162" height="110" />
</p>

### Opening CSV files with Excel

Maybe someone else can answer this one for me, because I&#8217;m stumped and can&#8217;t seem to find the right search phrase to turn up relevant results in Google: I can&#8217;t get Excel to open a .csv file on my friend&#8217;s Mac. It runs OSX, and the &#8220;About Excel&#8221; dialog says &#8220;Excel X for Mac&#8221; (can you tell what a dummy I am when it comes to Mac? The only thing that saves me is the presence of the Terminal, so I can resort to the command line to do things). Both of us have tried all the ways we know. No matter what we do in the Open dialog, including choosing &#8220;All Readable Files,&#8221; it leaves CSV files grayed out. The only way we&#8217;ve found is to rename it to something else such as .txt, open the file, and then do Data->Text To Columns.

### Labelling XY scatter charts

I&#8217;ve been working with cemetery data again. Recently we took a total station out to a cemetery and mapped it, then downloaded the data as tab-separated values. For a quick and dirty map of the data, it&#8217;s great to import it into a spreadsheet, select the Northing and Easting columns, and map it as a scatter plot. This gives a quick sense of what the map looks like. Of course, when you&#8217;ve got hundreds of points on the map, you want them labelled so you can see what they are, like so:

<p style="text-align:center">
  <img src="/articles/images/oocalc-scatter-plot-result.png" alt="The desired result" width="365" height="193" />
</p>

The first column in the spreadsheet is the point&#8217;s name. We tried and tried but couldn&#8217;t get Excel to plot the points with nice labels next to them. A bit of Googling revealed lots of other frustrated folks with the same problem. This has been a limitation in Excel for many years, and so many people want this feature, I wonder why they aren&#8217;t implementing it. The good news is, someone has written a little utility which will [label XY scatter plots in Excel][2], both for PC and Mac ([here&#8217;s another link][3]). So it&#8217;s possible to do after all &#8212; just not easy, and not built-in.

On the other hand, opening the same file with [OpenOffice.org][4] Calc and creating the same graph led me to believe it is supported in Calc. The graphing autopilot has a step where I specified the first column as labels:

<p style="text-align:center">
  <img src="/articles/images/oocalc-scatter-plot-step1.png" alt="Step 1, choosing the data" width="388" height="283" />
</p>

But after following through the rest of the steps &#8212; choose chart type, etc etc &#8212; the final result has no labels. I fooled around with it for a while, read the documentation and surfed the web, but still couldn&#8217;t get it to show the labels. Only after [I posted on the OpenOffice.org forums][5] did I find an answer:

1.  Select the data, start the graphing AutoPilot, check &#8220;First column as labels&#8221; and create the graph
2.  Place the cursor over the unselected graph and right click. Select &#8220;Edit&#8221;
3.  Select &#8220;Insert > Data Labels&#8230;&#8221; and check &#8220;Show Label Text&#8221;

I probably would not have solved this on my own. The way to select and unselect charts, and how to modify their properties, is really unintuitive, I&#8217;m afraid. Even after fooling with charts a while, I&#8217;m still blundering through things like exactly what sequence of actions is necessary to make a chart editable, what I need to do to alter the scale on the axes, and so forth. Even if I had known all that in advance, though, I wouldn&#8217;t think to go to the Insert menu to add labels to the chart. I told it to do that when I created the chart &#8212; why doesn&#8217;t it show them by default? If I didn&#8217;t want them to show, I wouldn&#8217;t have specified the first column as labels.

I conclude both Excel and OpenOffice.org both have some room for improvement. I&#8217;m sure that comes as no surprise! The good news is, OpenOffice.org is a community-driven effort, with an open bug-tracking system and active forums &#8212; not to mention it&#8217;s [Free Software][6]. You know who I&#8217;m backing&#8230; take &#8216;em to the mat!

 [1]: /blog/2005/12/30/excel-calc-number-formatting/
 [2]: http://www.bmsltd.ie/MVP/MVPPage.asp
 [3]: http://www.appspro.com/Utilities/ChartLabeler.htm
 [4]: http://www.openoffice.org
 [5]: http://www.oooforum.org/forum/viewtopic.phtml?t=30294
 [6]: http://www.gnu.org/philosophy/free-sw.html