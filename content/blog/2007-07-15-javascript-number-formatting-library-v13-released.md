---
title: JavaScript Number Formatting Library v1.3 released
date: "2007-07-15"
url: /blog/2007/07/15/javascript-number-formatting-library-v13-released/
categories:
  - Web
---

I've updated my JavaScript Number Formatting Library to version 1.3. This release adds the ability to customize how not-a-number (NaN), positive infinity and negative infinity are formatted. All you need to do is set the appropriate constant in `Number.prototype`:

*   `Number.prototype.NaN`
*   `Number.prototype.posInfinity`
*   `Number.prototype.negInfinity`

For more documentation, see the [original article on JavaScript number formatting][1].

 [1]: http://www.xaprb.com/blog/2006/01/05/javascript-number-formatting/
