---
title: How to add paragraph spacing in Google Docs
date: "2009-06-21"
url: /blog/2009/06/21/how-to-add-paragraph-spacing-in-google-docs/
categories:
  - Web
---
I'm using [Google Docs][1] for a project I'm working on right now, and I ran into a problem with spacing. There appears to be no way to get spacing between paragraphs. You can control spacing between lines, but that's not the same thing. Actually, it's quite easy. You just have to know how Google Docs works.

The root problem is that it's not creating paragraphs when you press the [Enter] key. It's just adding a <br> tag. If you get it to create paragraphs, you can edit the document's CSS and fix the problem easily.

The trick to this is to explicitly format the text with the **Normal Paragraph Text** style. This is **not** the same as no formatting. The easiest way to do this is to press Ctrl+0 while your cursor is in the paragraph you want to format. After you do this, pressing [Enter] will actually do what you want -- it will create a new paragraph.

Now that you've done that, you can add the following CSS with the **Edit/Edit CSS** menu:

<pre>p {
  margin: 1em 0 1em 0;
}
</pre>

You should now see the desired spacing between paragraphs.

 [1]: http://docs.google.com/
