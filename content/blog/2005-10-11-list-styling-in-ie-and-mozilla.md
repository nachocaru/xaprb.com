---
title: How to style HTML lists consistently in all browsers
date: "2005-10-11"
permalink: /blog/2005/10/11/list-styling-in-ie-and-mozilla/
---
IE's and Mozilla's ordered and unordered lists are rendered similarly by default, but the way the list is indented is opposite in the two browsers. Understanding how to style lists correctly is key to avoiding unexpected ugliness. In this article, I explain how UL and OL are styled by default, how to re-style them so they behave consistently, and uncover an incompatibility that cannot be fixed.

The [example list][1] is the same as the example list used in the [CSS list-style-position property definition][2]. Each sample image shows Mozilla's rendering on the left and IE's on the right. To show visually what is happening, I styled the left border of the content area, the list, and the list items red, black and blue respectively.

With default styling, the colored borders made it clear that the left borders of the list were in different places in the two browsers, even though the content was in the same position. In Mozilla, the list's box extended all the way left to the content area. There was about 40px of space between the list's left edge and the list item's left edge. It was not obvious whether this was created by the UL's padding or the LI's margin. In IE, the left edges of the UL and LI were next to each other, so I guessed the indentation was created by the UL's left margin. In both cases, it was clear the LI had no padding, but there was no way to know if it had a margin in Mozilla.

<img src="/articles/images/list-styling-default.png" alt="default styling" width="440" height="75" /> 
To understand whether Mozilla adds padding to the UL or margin to the LI, I removed the padding and margin from the elements and watched the results. First, I removed the margin from the UL:

<img src="/articles/images/list-styling-no-margin.png" alt="margin-left: 0" width="440" height="75" /> 
There was no change in Mozilla, so that wasn't it. Based on that, I decided there was probably padding on the UL. IE collapsed the list all the way to the left edge, so as expected, IE must use the margin on the UL to indent the bullets. Next, I removed the padding from the UL and reset the margin to the default:

<img src="/articles/images/list-styling-no-padding.png" alt="padding-left: 0" width="440" height="75" /> 
This time IE was unchanged from the default, and Mozilla collapsed to the left edge, so I guessed right.

At this point, I understood enough to know how to make the browsers render the lists identically, but I didn't know whether one way was better. I think either will do equally well for general purposes, but for some purposes, it is better to use Mozilla's method. For example, when placing lists on the right side of a float, there are issues with margins. CSS defines special rules for margins on and around floating elements. In general, I think it is best to style every UL with padding-left, and remove the margins. This expands the left edge of the content box so there are no margins to behave strangely around floats.

So far so good, but I also have also noticed strange behavior with text-indent applied to LI elements. I was trying to style certain LI elements as "new," with an icon to the left of the text. My first idea was to add a background image and indent the text so it didn't overlay the image. I saw strange behavior again, though. That led me to experiment further with list items, namely with marker-position and text-indent.

To figure out how the text-indent was implemented, I first set the marker-position to outside. I saw no change in the rendering at all, so I set it to inside, and the results looked very much like the CSS spec's example:

<img src="/articles/images/list-styling-inside.png" alt="marker-position: inside" width="440" height="75" /> 
The CSS spec says when marker-position is inside, the marker should become the *first inline box* in the LI. Given that, I expect the marker to be indented with the text when it is inside the LI, and to remain independent when it is outside the LI. I experimented with this, adding text-indent with marker-position outside:

<img src="/articles/images/list-styling-outside-indent.png" alt="text-indent: 40px" width="440" height="75" /> 
Mozilla did as expected, indenting the content but not the marker. IE indented the marker too though, indicating the marker is not rendered independently from the content. Next I added text-indent with the marker inside:

<img src="/articles/images/list-styling-inside-indent.png" alt="marker-position: inside; text-indent: 40px" width="440" height="75" /> 
This time both browsers rendered the text the same, as per the spec. In this regard it seems IE doesn't follow the spec. To be fair though, the spec is deliberately vague on markers to be backwards-compatible with the ambiguity in CSS1 on markers.

There seems to be no way to indent the text in a LI without also moving the marker, at least in some browsers. I recommend not relying on marker-position because different browsers treat it differently and the spec doesn't indicate what is absolutely correct. As a side note, Opera treats markers exactly as IE in this regard.

**PS**: Guess what? It turns out I'm not the [first to notice][3] this.

 [1]: /articles/list-styling-example.html
 [2]: http://www.w3.org/TR/REC-CSS2/generate.html#propdef-list-style-position
 [3]: http://www.meyerweb.com/eric/css/list-indent.html
