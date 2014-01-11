---
title: Interactive directory merging
author: Baron Schwartz
excerpt: '<p>A simple shell script that recursively finds and merges files that differ between two directories.</p>'
layout: post
permalink: /2005/09/22/interactive-directory-merging/
---
Hereâ€™s an &#8216;interactive&#8217; directory merging tool that doesn&#8217;t require GUI libraries, printer subsystems, and so forth. It is useful when you want to do things the easy way, at a terminal, without taking your hands off your keyboard. And it works on systems where you don&#8217;t have access to install things yourself, such as a shared webhosting server.

<pre>#!/bin/bash
echo "#!/bin/bash" > /tmp/mergedir
diff --brief --recursive $1 $2 | awk '/differ/ {print "vimdiff " $2 " " $4 ";"}' >> /tmp/mergedir
chmod +x /tmp/mergedir
/tmp/mergedir</pre>

Create that as a shell script, `chmod +x` it, put it in your PATH, and invoke it like this, assuming you called it mergedir:

<pre>$ mergedir /some/directory /other/directory</pre>

When it finds files that differ, it will open vimdiff on them, and you can use the standard vimdiff commands to merge them (commands such as <kbd>dp</kbd>, <kbd>do</kbd>, <kbd>:w</kbd>, <kbd>:qa</kbd>, <kbd>]c</kbd> and so forth &#8212; look in the Vim manual for more information).