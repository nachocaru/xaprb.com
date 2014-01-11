---
title: Thoughts on ReiserFS
date: "2006-03-20"
permalink: /2006/03/20/thoughts-on-reiserfs/
---
I recently watched a [video of Hans Reiser's presentation on ReiserFS][1], a journalling filesystem. It piqued my curiosity, so I visited the [ReiserFS website][2] to read more about the filesystem. I ended up un-learning some things I thought I knew, and had some thoughts to share on ReiserFS in general.

*   The Reiser team believes [equal access to source code is a civil right][3]. I agree.
*   I've been using version 3 for a long time. As far as I'm concerned, it's been the best choice for a journalling filesystem since it was created. I've never lost any data whatsoever from a ReiserFS filesystem (though if my hard drive ever truly failed, the filesystem wouldn't matter). Version 4 is out of the oven now (ok, so I'm a few years behind&#8230;), and it looks absolutely amazing. I think I will upgrade going forward.
*   The performance enhancements in version 4 are stunning. Consider this: for the first time in history, a compressed filesystem is faster than an uncompressed one. What does that mean? It means the real bottleneck is reading/writing the data on the disk, and the compression and decompression is so fast that it's less expensive to do a bunch of computation and transfer less data, than to do less computation and transfer more data. That is remarkable.
*   ReiserFS is faster, scales better, and is more space-efficient than any other filesystem, according to the benchmarks on their website.

ReiserFS has a lot of implications not only for ordinary file-storage, but for special purpose systems too. It'll be interesting to see what the next few years bring.

 [1]: http://video.google.com/videoplay?docid=6866770590245111825
 [2]: http://www.namesys.com/
 [3]: http://www.namesys.com/v4/v4.html#civil_right
