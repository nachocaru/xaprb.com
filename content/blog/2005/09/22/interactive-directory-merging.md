---
title: Interactive directory merging
date: "2005-09-22"
url: /blog/2005/09/22/interactive-directory-merging/
categories:
  - Programming
---
Here's an 'interactive' directory merging tool that doesn't require GUI libraries, printer subsystems, and so forth. It is useful when you want to do things the easy way, at a terminal, without taking your hands off your keyboard. And it works on systems where you don't have access to install things yourself, such as a shared webhosting server.

<pre>#!/bin/bash
echo "#!/bin/bash" > /tmp/mergedir
diff --brief --recursive $1 $2 | awk '/differ/ {print "vimdiff " $2 " " $4 ";"}' >> /tmp/mergedir
chmod +x /tmp/mergedir
/tmp/mergedir</pre>

Create that as a shell script, `chmod +x` it, put it in your PATH, and invoke it like this, assuming you called it mergedir:

<pre>$ mergedir /some/directory /other/directory</pre>

When it finds files that differ, it will open vimdiff on them, and you can use the standard vimdiff commands to merge them (commands such as <kbd>dp</kbd>, <kbd>do</kbd>, <kbd>:w</kbd>, <kbd>:qa</kbd>, <kbd>]c</kbd> and so forth -- look in the Vim manual for more information).
