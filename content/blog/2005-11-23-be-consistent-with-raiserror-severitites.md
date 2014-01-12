---
title: RAISERROR severity levels demystified
date: "2005-11-23"
permalink: /2005/11/23/be-consistent-with-raiserror-severitites/
---
`RAISERROR`'s severity levels are defined in the Sql Server Books On Line, and give vague guidance about which severity level is best. The short and sweet is as follows:

*   below 11 are warnings, not errors
*   11-16 are available for use
*   above 16 are system errors
*   there is no behavioral difference among 11-16

The best thing to do is just get everyone to use the same value and reduce confusion. It may be useful to use different values, to signal a desired behavior to the code that catches the error. In this case, a company standard or policy is in order. Also, keep in mind even though you may not use severities this way now, you very well might someday -- in which case, you'll be happy you started using them consistently now.
