---
title: Seldom-used HTML form elements
author: Baron Schwartz
excerpt: '<p>Some of the neatest parts of standard HTML are the least-used.  Forms in particular can become much more usable and accessible when marked up correctly with a few standard HTML elements.  This article points out the most important of those elements.</p>'
layout: post
permalink: /2005/11/07/html-elements-for-form-accessibility/
---
Some of the neatest parts of standard HTML are the least-used. Forms in particular can become much more usable and accessible when marked up correctly with a few standard HTML elements. These are LABEL (and the related CSS `outline` property), OPTGROUP, LEGEND, and FIELDSET.

Before I launch into this article, I challenge you to read the [list of HTML 4 elements][1] and ask yourself how many of these you use regularly. If you are like most web designers (including myself), you may over-use familiar elements and attributes, and perhaps not even realize some of the elements exist. The good news is, now is a great time to start using HTML&#8217;s capabilities more fully, because even though you may not know about or use them, browsers support them very well, and have for years.

### LABEL elements make forms act more like traditional GUI apps

LABEL elements work in concert with a form input. You already know what they are, because they are used in almost all user interfaces in traditional GUI software. The label &#8220;targets&#8221; an input by ID. For example, if a website has a login form like so,

<pre>&lt;form action="login.cgi"&gt;
&lt;input type="text" name="username" id="username" /&gt;
Username
&lt;/form&gt;</pre>

You might surround `Username` with a LABEL, thusly:

<pre>&lt;form action="login.cgi"&gt;
&lt;input type="text" name="username" id="username" /&gt;
&lt;label for="username"&gt;Username&lt;/label&gt;
&lt;/form&gt;
</pre>

The browser will then activate the username field when the user selects the LABEL. LABELs are particularly useful for accessibility, but they make forms more usable, too. Consider how you are accustomed to interacting with a list of radio buttons, each with text beside it. In a typical GUI application, the radio button is NOT used to select which option is the active one. Instead, it merely serves as a visual indicator of which option the user chose. Most users (you can verify this for yourself) will select the text, not the radio button, because they know it is &#8220;clickable.&#8221; Many users will also try clicking on the text in web pages, before they realize they have to click on the radio button itself. Even users who are used to surfing the web will first automatically try clicking on the text, then click on the button! Providing LABELs makes the text &#8220;clickable&#8221; and meets the user&#8217;s expectations. It also makes the form easier to use, because it is not necessary to use the mouse as carefully; there is more clickable area.

Here is a sample form, for your testing pleasure:

A word about styling: Internet Explorer styles labels with a dashed button when the input is selected (In IE, HTML form elements are actually rendered by the underlying OS, not the browser). Firefox does not. CSS2 does provide for styling, which should allow the designer to mark up labels so they look and feel as expected across all browsers. The `outline` property is meant for this, but unfortunately does not have broad and consistent browser support yet. However, it&#8217;s easy to add styles to hint that the label is attached to the input. For instance, adding a background color, making the cursor into a &#8220;hand,&#8221; and so forth can all help.

### OPTGROUP creates a menu of logically grouped choices

The OPTGROUP element groups OPTIONs in a SELECT menu. You have doubtless seen SELECT menus (perhaps even written some yourself!) like the following:

This typically comes with some server-side or client-side code to make sure the user selects one of the &#8220;real&#8221; entries, not one of the &#8220;headings.&#8221; This is exactly the problem OPTGROUP was designed to accomplish. Here is the form rewritten with standard, plain vanilla HTML (nothing fancy here! Netscape 4 can even handle this!):

### FIELDSET and LEGEND create logical groupings of inputs

Just as OPTGROUP groups related values together, FIELDSET groups related form inputs together. Again, this should be familiar from GUI applications. Preferences dialogs are one common place where you see this metaphor all the time. Here is a quick example:

I think this example should speak pretty clearly for itself.

### Summary

Good old HTML 4: it&#8217;s more than half a decade old now. In terms of the Internet, that&#8217;s a lifetime. It&#8217;s good to be familiar with its full capabilities, and more importantly, to know when to use or not to use a particular HTML element.

 [1]: http://www.w3.org/TR/html4/index/elements.html