---
title: "Apsersa's summary tool supports Adaptec and MegaRAID controllers"
permalink: /2010/05/16/apsersas-summary-tool-supports-adaptec-and-megaraid-controllers/
categories:
  - Aspersa
  - Maatkit
  - SQL
tags:
  - Adaptec
  - LSI Megaraid
  - RAID
  - unit testing
---
I spent a little time yesterday doing some things with the "summary" tool from [Aspersa][1]. I added support for summarizing status and configuration of Adaptec and LSI MegaRAID controllers. I also figured out how to write a test suite for Bash scripts, so most major parts of the tool are fully tested now. I learned a lot more sed and awk this weekend.

There is really only one way to get status of Adaptec controllers (/usr/StorMan/arcconf), but the LSI controllers can be queried through multiple tools. I added support for MegaCli64, as long as it's located in the usual place at /opt/MegaRAID/MegaCli/MegaCli64. I am looking for feedback and/or help on supporting other methods of getting status from the LSI controllers, such as megarc and omreport. If you can contribute sample output from these tools, please attach them as a file to a new issue report on the project's issue tracker. (Don't paste them as text, please &#8212; formatting and whitespace will get mangled. Tabs and spaces need to be preserved.)

I am slowly gaining insight into how best to write a similar summary tool for MySQL servers. The goals of this tool are very specific &#8212; including things like diff'able output. I'm figuring out what went wrong with Maatkit's mk-audit tool and how to go about it differently.

 [1]: http://code.google.com/p/aspersa
