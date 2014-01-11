---
title: How to make software testable
author: Baron Schwartz
layout: post
permalink: /2011/05/16/how-to-make-software-testable/
categories:
  - Coding
tags:
  - Testing
---
I&#8217;m going to try to explain how to make software testable in really practical terms. I won&#8217;t use words like &#8220;dependency injection.&#8221; Those things annoy smart programmers and make them stop listening.

Here is a pseudocode snippet. There is some function that parses some IP address out of the output of the &#8220;ifconfig&#8221; command, and some other code that uses this to get an IP address and do something with it.

<pre>parse_ip_address() {
   hostname = system.execute("hostname");
   ifconfig = system.execute("/sbin/ifconfig");
   ip = regex.capture(ifconfig, "/some/regex/" + hostname + "/some/other/regex/");
   return ip;
}

// ... some other code ...

ip = parse_ip_address();
// do something with the ip address.
</pre>

This code is extremely hard to test. If someone says &#8220;it doesn&#8217;t work on my computer,&#8221; you can only respond &#8220;it works on mine and I can&#8217;t reproduce it.&#8221; The code relies on the server&#8217;s hostname and the output of the ifconfig command, so the only way you can reproduce it is if you get access to your reporter&#8217;s computer and run the code there. (Imagine if it relied on the time of day or the date!)

Let&#8217;s rewrite the code.

<pre>parse_ip_address(hostname, ifconfig) {
   ip = regex.capture(ifconfig, "/some/regex/" + hostname + "/some/other/regex/");
   return ip;
}

// ... some other code ...

hostname = system.execute("hostname");
ifconfig = system.execute("/sbin/ifconfig");
ip = parse_ip_address(hostname, ifconfig);
// do something with the ip address.
</pre>

Now you can write back to the person who reported the issue and say &#8220;please send me the output of /sbin/ifconfig, and your hostname.&#8221; You can write a test case, verify that it breaks, fix the code, and verify that all of your other tests still pass.

That is the absolutely essential core practice in testing: write code in units (be it functions, modules, programs, or something else) that accept input, cause no side effects, and return output. Then write test suites that begin with known input, execute the code, capture the output, and compare it to what is expected.

Now you&#8217;ve learned in ten minutes what took me many years to learn. When they taught me about software engineering in my Computer Science classes, they didn&#8217;t teach me how to test. They said &#8220;you must test rigorously!&#8221; and moved on to the next topic. They left me with the vague understanding that testing was an advanced practice that takes enormous time and effort. It turns out to be simple &#8212; if you start out right. And it saves enormous time and effort.

Testing has enabled me to avoid becoming a good programmer. I can&#8217;t write good code, but I can write good tests, and with good tests, you can see clearly how broken your code is.