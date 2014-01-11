---
title: How to create input masks in HTML
date: "2006-11-02"
permalink: /2006/11/02/how-to-create-input-masks-in-html/
description:
  - A simple, free way to add input masks to your HTML form fields.
---
<p class="download">
  <a href="/html-input-mask/src/">Download HTML Input Mask</a>
</p>

<p style="border:solid red 1px; background:yellow">
  If you have questions or comments or bugs report, or a change to make, be sure to use the project's new homepage: <a href="http://code.google.com/p/flexible-js-formatting/">Flexible JS Formatting Libraries</a>
</p>

<p style="border: 1px solid red; background: yellow">
  Note that this is not compatible with all browsers, has known problems and limitations, and I am not maintaining it or replying to requests for help. Thanks! (But also note that you are free to change and redistribute under the license terms, which you should read after downloading)
</p>

Have you ever wanted to apply an input mask to an HTML form field? Input masks are common in traditional GUI applications, but HTML has no such feature. This article introduces a library that adds input masks to form fields with unobtrusive JavaScript.

### What's an input mask?

<p class="demo">
  <a href="/html-input-mask/html-form-input-mask.html">View the Demo</a>
</p>

Input masks are guides to help users enter data in the correct format. They typically do *not* actually validate data; they just ensure the right types of characters are entered in the right places. Typical uses are for dates, times, social security numbers, phone numbers, and credit card numbers. The user enters un-formatted input, and the mask takes care of adding dashes and other separators in appropriate places.

For example, in the United States most people use MM/DD/YY format to write dates. A well-written GUI application honors the user's locale and creates an appropriate input mask, such as ##/##/##, for date entry. The user types the numbers, and the program inserts the slashes. If the user types something other than a number, that character is discarded, not entered into the field.

### How to do this with JavaScript

There are several problems you need to solve to simulate this in a web browser. First things first: let's state the requirements.

1.  Help the user avoid entering invalid characters.
2.  Automatically insert separators as the user types.
3.  Constrain the length of the input.

Second, let's create a spec for the masking syntax. In Windows Forms programming, controls have a `Mask` property, and other GUI libraries have similar functionality. The full behavior of these masks is complex. For an example, see the [MSDN documentation for masked edit controls][1]. You can get a lot of that functionality with a simpler specification, though. The following will suffice for many uses:

1.  The mask only allows one type of character for the entire mask. For example, the mask can allow either all digits or all alphanumerics, but you can't constrain one character to be a digit while letting other characters accept alphanumerics.
2.  The mask specifies the placeholders for input with spaces, and separators as non-spaces.

An example mask, then, has two parts: the format, which says which places can accept user input, and the type, which says what type of character can go in those places. We'll see how to actually do this later.

The third problem is to unobtrusively attach the masking functionality to input fields, with gracefully degrading behavior if the browser doesn't support it, and without adding a lot of markup to your forms to specify the mask format and type. This is easy, using the principles I laid out in an earlier article on [using classes to specify data types][2]. This technique is 100% appropriate because classes aren't just hooks for CSS, they're general-purpose processing information. This lets you easily specify a) which inputs get masks, and b) which type of mask they get.

### How it works

To add masks to form fields, reference my library, then make the page's load event fire the `Xaprb.InputMask.setupElementMasks()` function in my library. This will find all elements with the class `input_mask`, which specifies that the element should get a mask. Each element should also have a `mask_???` class, where the ??? specifies which mask to attach. The library takes care of the rest.

By the way, this library depends on the [Prototype library][3], so you will also need to reference that in your page. If you don't, you won't get an error, but nothing will happen.

The setup function iterates over the elements and connects a callback to the `onkeypress` event. The callback is created by another function. To decide which mask to apply, it does a regular expression match against the element's `className`. If the element's `class` is "input\_mask mask\_**date_us**", the regular expression captures "date_us," and looks up the `date_us` mask. Here's how that is defined:

<pre>date_us: {
         format: '  /  /    ',
         regex:  /\d/,
      }</pre>

The `format` property is a string with spaces where input should go, and other characters get inserted automatically. The `regex` property is a regular expression that matches a valid character, in this case a digit.

Here's how the callback function works: when it fires, it checks each character in the form field's value. If there's a space in that place in the mask's format string, it looks to see if the character matches the mask's regular expression. If so, the character is valid for that place in the input; if not, the character is rejected. If there isn't a space in that place in the format string, the character from the format string is copied into the form field (this is how separators are automatically inserted).

### Demonstration

Enough talk, let's see it in action. This [demonstration of Javascript form input masks][4] shows a few of the masks I discussed above: US date, time, and phone number.

If you like the way the form input fields look, you can thank the fine folks at Particletree. I borrowed the styling from their article on [how to make forms suck less][5] (it makes the borders of the input areas easier to see).

### Limitations

Since this is really just a hack on top of existing HTML form inputs, there are some things that will never work quite as well as a natively designed widget (the same is true for my [JavaScript Combo Box][6] widget). Here are some of the limitations:

*   No unicode or international characters (this might be easy to fix).
*   No spaces as placeholders. Sometimes you might want spaces between user input, rather than non-space separators.
*   Only one type of character for the entire input; you can't constrain the first character to be a digit, and the second a letter.
*   It doesn't show the mask ahead of time and let the user 'fill in' the missing characters; instead, it reveals the mask as the user types.
*   You can't have two adjacent separators.
*   You can't type into the middle of the text; all input you type is appended to the end.
*   It hijacks things like Ctrl+A to select all.

Despite the length of that list, these are such minor things (except for maybe international characters) that it's practically a complete implementation. And as far as I know, everything here could be solved easily. I just haven't done it, because you haven't yet told me which things are problems for you (hint, hint: leave a comment, and patches are very welcome). I deliberately kept things really simple in this first version. Future versions can get fancier, or not.

### Conclusion

So that's it! Simple, lightweight, intuitive input masks. With a proper form validation library on the back-end, you should be able to use this to help your users enter data in the format you desire. Again, let me know what you think, and by all means improve this, and send me the results!

 *[HTML]: Hypertext Markup Language
 *[GUI]: Graphical User Interface

 [1]: http://msdn.microsoft.com/en-us/masked/html/vbproMask_MEdit.asp
 [2]: /blog/2006/01/02/tables-and-data-part-1/
 [3]: http://prototype.conio.net/
 [4]: /html-input-mask/html-form-input-mask.html
 [5]: http://particletree.com/notebook/how-to-make-firefox-forms-suck-less/
 [6]: /blog/2005/09/29/javascript-combo-box/
