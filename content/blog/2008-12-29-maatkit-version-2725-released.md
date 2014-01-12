---
title: Maatkit version 2725 released
date: "2008-12-29"
permalink: /2008/12/29/maatkit-version-2725-released/
categories:
  - Databases
  - Open Source
---
This release of [Maatkit][1] is basically all about [mk-log-parser][2], our new log analysis tool. Daniel and I have been working hard on it all month, adding killer new features like &#8211;review, fixing tons of bugs, and making it twice as fast. I believe it's far and away the best slow-log analysis tool in existence, both in terms of functionality and quality. (Do any of the other tools even have test suites&#8230;?) But you should take it for a spin and see yourself. If you run it into something it won't parse, or find anything else wrong, please use the [Google Code project][3] and the [mailing list][4] (*not the comments on this blog!*) for support.

Major changes:

<pre>* Added --analyze option to combine analysis and --review (issue 162).
   * Added --fingerprints (-f) option (issue 160).
   * Trying to take log of 0 caused a crash (issue 141).
   * Improved performance of log parsing and fingerprinting about 2x (issue 137).
   * Slow log parsing was buggy (issue 136 and many smaller issues discovered).
   * Converted a lot of hardcoded things into dynamically built functions.
   * Added more information to the default output and reformatted it.
   * Incompatible changes to fingerprint; old reviews will lose their history.
   * Much enhanced --review functionality.
   * Default --top to 95% to analyze the top 95% of the load (issue 171).
</pre>

That's just the major stuff. Note that it's in very active development, and [that will probably continue][5]. However, the documentation is now up-to-date and pretty complete.

Big thanks to [Pythian][6], who together with Percona have co-sponsored some of the &#8211;review improvements. In fact, the entire &#8211;review functionality was born from a combination of [Sheeri][7]'s ideas, ideas from Percona consultants, and perhaps a few others who don't get credit where it is due ;).

 [1]: http://www.maatkit.org/
 [2]: http://www.maatkit.org/doc/mk-log-parser.html
 [3]: http://code.google.com/p/maatkit/
 [4]: http://groups.google.com/group/maatkit-discuss
 [5]: http://code.google.com/p/maatkit/issues/list?q=tool:mk_log_parser
 [6]: http://www.pythian.com/
 [7]: http://sheeri.com/
