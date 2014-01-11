---
title: "What's a good benchmark?"
date: "2011-05-10"
permalink: /2011/05/10/whats-a-good-benchmark/
categories:
  - Databases
---
Vadim has taught me that valid benchmarks are both simple and complex. Simple, because the basic principles are few; complex, because the devil is in the details and it's a lot of work to satisfy the basic requirements. I'll give the simple version here.

*   Benchmarks must be appropriate. The workload, sample dataset, distribution of work and data, and so on must be relevant and meaningful for the intended purpose. Running the wrong benchmark rarely teaches anything.
*   Benchmarks must be fully documented. Another researcher must be able to determine exactly how you ran your benchmark, on what hardware, under what workload, what operating system, kernel version, all MySQL tuning parameters, and so on.
*   Benchmarks must be repeatable. Another researcher must be able to reproduce your results. Documentation is part of this, but you need to ensure that you can reproduce your own results. If you can't, no one else can either.
*   Benchmarks must be measured fully. All relevant data, such as I/O and CPU usage, memory usage, and so on must be collected for later analysis and to help respond to questions that other researchers may have.
*   Benchmarks must be analyzed. The results must be compared against what is expected, and verified against common sense. I recently ran an iozone benchmark on a 15k RPM disk in O\_DIRECT mode and got 14k random reads per second. I was under the gun in an emergency, so I didn't notice this in the flood of other data at the time, but Peter caught it right away when I called for a second opinion. What this tells me is that iozone isn't really doing O\_DIRECT, because that's physically impossible performance. Benchmark results must be put under a microscope and examined with a critical eye.
*   Benchmarks must be interpreted and explained. Any deviations must be examined and explained. Many benchmarks produce inexplicable results. They must not be published before understanding the results. There are rare exceptions, but that's the general principle to follow. It is quite likely that some unexpected result means the benchmark was set up wrong and needs to be redone or thrown away.

I suppose it should go without saying, but it's worth saying anyway: benchmarks must also not be deliberately manipulated, e.g. artificial throttling to make scalability appear to be a perfectly straight line. I've seen more than one benchmark that is simply too perfect to be true (each throughput measurement is an exact multiple of ten thousand, for example), and the original data is mysteriously not available anymore.
