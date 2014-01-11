---
title: RAISERROR severity levels demystified
author: Baron Schwartz
excerpt: "<p><code>RAISERROR</code>'s severity levels are defined in the Sql Server Books On Line, and give vague guidance about which severity level is best.  This article explains why it's a good idea to make your own standards about their usage.</p>"
layout: post
permalink: /2005/11/23/be-consistent-with-raiserror-severitites/
---
`RAISERROR`&#8216;s severity levels are defined in the Sql Server Books On Line, and give vague guidance about which severity level is best. The short and sweet is as follows:

*   below 11 are warnings, not errors
*   11-16 are available for use
*   above 16 are system errors
*   there is no behavioral difference among 11-16

The best thing to do is just get everyone to use the same value and reduce confusion. It may be useful to use different values, to signal a desired behavior to the code that catches the error. In this case, a company standard or policy is in order. Also, keep in mind even though you may not use severities this way now, you very well might someday &#8212; in which case, you&#8217;ll be happy you started using them consistently now.