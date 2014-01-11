---
title: Keeping docs and program options in sync
date: "2011-02-02"
permalink: /2011/02/02/keeping-docs-and-program-options-in-sync/
categories:
  - Open Source
  - Programming
---
One of my pet peeves is when documentation is wrong. Another pet peeve is keeping documentation right. Crack open a source tarball for many programs and you'll see a chunk of text that gets printed out when you use the &#8211;help option, and elsewhere in the program's source code you'll see the definitions of the command-line options. Maintaining a program like this is miserable. Using it is bad, too. I can name a lot of programs that say one thing and do another.

For Maatkit, we solved this problem by making the tool read its own source code and generate command-line options, default values, behaviors, dependencies, data types, and so on directly from its own embedded documentation. This is the same documentation that gets converted into man pages. So when you run the program, view its documentation, ask it for &#8211;help, or whatever you do, you get the same information. The documentation is part of the program, and if you change the documentation, you change the program.

For a while I was very unhappy with using Perl to reach outside the boundaries of Perl. It turns out that executing another program, capturing its output, controlling it, capturing its return code, etc is very buggy. So I started to write scripts that need this capability in bash, because it is obviously very good at these tasks. But it's a bit harder to handle command-line options in bash, and the tools available for it differ or are unavailable on various platforms. So I ended up with usage information in a block of text, and program options defined in program code. Yuck!

I fixed that recently. I wrote a short script that reads the usage text and generates code to implement the options, including default values and options that are constrained to certain valid inputs. Life is good again.
