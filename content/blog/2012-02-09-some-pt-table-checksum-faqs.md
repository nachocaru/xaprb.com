---
title: Some pt-table-checksum FAQs
date: "2012-02-09"
permalink: /2012/02/09/some-pt-table-checksum-faqs/
categories:
  - SQL
---
After the recent update to pt-table-checksum, I've seen a few FAQs about it.

Q: is it still multi-threaded/parallel? A: No, that was a pile of bugs and complexity. If you need to run the tool in parallel to take advantage of powerful hardware, you can run several instances, say, one per database.

Q: what chunk size should I use? A: None, let the tool adjust itself dynamically.

Q: what if it skips a table or chunk because it's oversized? A: this should be rare unless you have tables without any indexes; if you want to do the table in one chunk, run the tool again and specify to checksum only that table, with an appropriately large chunk size. This is one of the rare cases where you will need to specify a chunk size.

Q: what commandline options should I use after upgrading? A: It has sensible defaults for everything, and is designed to run without any options at all in most cases. If you're upgrading from version 1, a few options are simply not available anymore, and most others should be removed unless you know you need them. In particular, **remove the &#8211;chunk-size option and let it dynamically adapt to your server's workload.**

Hopefully that helps :)
