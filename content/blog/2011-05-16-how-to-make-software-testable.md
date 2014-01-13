---
title: How to make software testable
date: "2011-05-16"
url: /blog/2011/05/16/how-to-make-software-testable/
categories:
  - Programming
---
I'm going to try to explain how to make software testable in really practical terms. I won't use words like "dependency injection." Those things annoy smart programmers and make them stop listening.

Here is a pseudocode snippet. There is some function that parses some IP address out of the output of the "ifconfig" command, and some other code that uses this to get an IP address and do something with it.

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

This code is extremely hard to test. If someone says "it doesn't work on my computer," you can only respond "it works on mine and I can't reproduce it." The code relies on the server's hostname and the output of the ifconfig command, so the only way you can reproduce it is if you get access to your reporter's computer and run the code there. (Imagine if it relied on the time of day or the date!)

Let's rewrite the code.

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

Now you can write back to the person who reported the issue and say "please send me the output of /sbin/ifconfig, and your hostname." You can write a test case, verify that it breaks, fix the code, and verify that all of your other tests still pass.

That is the absolutely essential core practice in testing: write code in units (be it functions, modules, programs, or something else) that accept input, cause no side effects, and return output. Then write test suites that begin with known input, execute the code, capture the output, and compare it to what is expected.

Now you've learned in ten minutes what took me many years to learn. When they taught me about software engineering in my Computer Science classes, they didn't teach me how to test. They said "you must test rigorously!" and moved on to the next topic. They left me with the vague understanding that testing was an advanced practice that takes enormous time and effort. It turns out to be simple -- if you start out right. And it saves enormous time and effort.

Testing has enabled me to avoid becoming a good programmer. I can't write good code, but I can write good tests, and with good tests, you can see clearly how broken your code is.
