---
title: Maatkit version 4334 released
permalink: /2009/08/03/maatkit-version-4334-released/
categories:
  - Perl
  - SQL
  - Tools
---
[Maatkit version 4334 is ready for download][1]. I see that I missed posting a release announcement about last month's release of Maatkit. I'll try to cover the important bits about the last two releases here. Daniel has been posting the release announcements to the mailing list recently, so I'll do a bit of copy and paste of what he said too.

We've released two new tools. These are mk-upgrade and mk-log-player. These are not actually new scripts, but we only just added them to the releases. mk-upgrade is the tool that I've been blogging and writing about recently. We got several people to sponsor the development on it, and some of our clients are using it to mitigate the risk of an upgrade or other change to their production environments. mk-log-player is also an old tool that has actually been around for something like a year, and was used by one of our clients who makes a high-performance appliance. The intention of the tool is to apply a realistic production load to a system in a predictable fashion.

As always, mk-query-digest is one of the tools that we apply the most work to. There are several new features in this release, including the ability to parse binary logs, the ability to optimize memcached traffic, and a ton of work on parsing TCP dumps.

We also realized that when we added configuration files to all the tools, we failed to test on Windows. Naturally, any time you don't test something, that means that you have broken it. And indeed, all the tools immediately failed to run on Windows, but none of us use them on Windows, so we didn't notice it until much later. We have fixed that.

At the last minute this month we also added a section to the documentation in each tool, which explains the risks of using that tool. These are power tools for power users, but I still felt that it was appropriate to disclose all the risks involved with using the tool.

Now on to last month's release.

Last month the big news was that we finished all the cleanup of commandline options that we had been doing for several months previously. A lot of the tools changed in ways that were not backwards compatible as a result of this. However, we have a documented command line convention, and going forward all of the tools will be very consistent and easy to understand. Maatkit users voted for this on the mailing list, so we felt pretty good about making this incompatible change.

I'm not going to duplicate the change logs as I usually do in these blog posts. I think I'll leave that for the mailing list announcements. At some point, we are also going to try to get the change logs online on maatkit.org.

Here are links to the two threads on the mailing list that explain the exact changes:

*   <http://groups.google.com/group/maatkit-discuss/t/5dfc2e5b16b657b3>
*   <http://groups.google.com/group/maatkit-discuss/t/2825a80522d3aad3>

 [1]: http://code.google.com/p/maatkit/downloads/list
