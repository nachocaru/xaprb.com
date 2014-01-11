---
title: When documentation is code
permalink: /2011/11/07/when-documentation-is-code/
categories:
  - SQL
---
One of the things I think we did right with Maatkit (and now with Percona Toolkit) is making the documentation part of the code itself. So much redundancy and wrong documentation has been eliminated by making the tool actually read its own documentation when it starts up. As an example, the default value of the &#8211;shorten option is defined in the documentation (it's Perldoc) like this:

    =item --shorten
    
    type: int; default: 1024
    

Not only is the documentation part of the code, but the tool's &#8211;help output is generated from it too. The existence, type, defaults, and even the behavior of the command-line options is defined in the documentation. If I execute the tool with the &#8211;help option, you can see that default value:

    
    [baron@ginger bin]$ ./pt-query-digest --help | grep  -- --shorten
      --shorten=i                    Shorten long statements in reports (default
      --shorten                      1024
    

If I change the tool's documentation to say the default is 2048, you'll see it in the output:

    
    [baron@ginger bin]$ ./pt-query-digest --help | grep  -- --shorten
      --shorten=i                    Shorten long statements in reports (default
      --shorten                      2048
    

We even have tests for the documentation. If the documentation is code, and code should be tested, then the documentation should be tested too. I updated the documentation for the new version of pt-table-checksum the other day without testing it, and pushed the code back to Daniel, who merged it and ran the tests &#8212; and found that I'd changed a bit of the documentation that said one option disables another option. A statement like that needs to be tested formally.

We have many thousands of unit tests for Percona Toolkit last time I checked. One of them guarantees that this little bit of documentation is correct. What a great thing. I continue to try to find ways to make the tools' documentation formally verifiable as much as possible. It's not possible to do 100% of it, but a surprising amount can be tested.
