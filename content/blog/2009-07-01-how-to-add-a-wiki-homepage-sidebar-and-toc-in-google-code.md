---
title: How to add a wiki homepage, sidebar, and TOC in Google Code
author: Baron Schwartz
layout: post
permalink: /2009/07/01/how-to-add-a-wiki-homepage-sidebar-and-toc-in-google-code/
categories:
  - Maatkit
  - Open Source
  - World Wide Web
tags:
  - Google Code
  - Maatkit
  - wiki
---
I just adore Google Code. But the default wiki view (a list of pages, sorted by last-modified) is lacking something. Fortunately, it&#8217;s fixable. Here&#8217;s the before:

<div id="attachment_1167" class="wp-caption alignnone" style="width: 642px">
  <img src="http://www.xaprb.com/blog/wp-content/uploads/2009/07/Screenshot-Wiki-Pages-maatkit-Google-Code-Mozilla-Firefox.png" alt="Default wiki list" title="Default wiki list" width="632" height="342" class="size-full wp-image-1167" /><p class="wp-caption-text">
    Default wiki list
  </p>
</div>

And here&#8217;s the after:

<div id="attachment_1168" class="wp-caption alignnone" style="width: 642px">
  <img src="http://www.xaprb.com/blog/wp-content/uploads/2009/07/Screenshot-Wiki-Pages-maatkit-Google-Code-Mozilla-Firefox1.png" alt="Wiki with sidebar and default page" title="Wiki with sidebar and default page" width="632" height="342" class="size-full wp-image-1168" /><p class="wp-caption-text">
    Wiki with sidebar and default page
  </p>
</div>

Here&#8217;s how:

1.  Create a wiki page called TableOfContents, or something like that. Using normal wiki syntax, enter links and text for your table of contents. The best way to do this is to use bulleted lists to organize and outline the pages. Keep in mind that we&#8217;ll use this same text for the sidebar, so keep it brief.
2.  Go to Administer/Wiki and enter that wiki page&#8217;s name in the &#8220;Wiki Sidebar&#8221; box. Save the changes.
3.  Go to Administer/Tabs and enter the same page in the Wiki box. Save the changes.

Now both the wiki &#8220;homepage&#8221; and the sidebar will contain the page you created. No more ugly list-of-pages. And as you navigate through the wiki pages, the sidebar automatically expands and closes the outline to show where you are.

If you want, you can use a different homepage and sidebar, but I&#8217;ve found that it works well for me to use the same page for both. It&#8217;s a preference, that&#8217;s all.

There&#8217;s one more trick I&#8217;d like to share: you can add the text `<wiki:toc />` at the top of any page to create a small table of contents for that page. There are ways to customize it &#8212; check the documentation for more options.