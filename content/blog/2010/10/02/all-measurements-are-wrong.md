---
title: All measurements are wrong
date: "2010-10-02"
url: /blog/2010/10/02/all-measurements-are-wrong/
categories:
  - Programming
---
I had the privilege to meet [Neil Gunther][1] and listen to him speak this week at [Surge][2]. During his talk, he brought up the point that all measurements are wrong by definition. I thought I knew what he meant, but I was stuck with tunnel vision about floating-point precision and such. I had it all wrong. The real answer is obvious and simple.

The point is that the process of measuring, and therefore the answer that comes out of the measurement process, is imprecise. And further, that we need to treat a measurement as a measurement, not as the true value of whatever it is we tried to measure. So although we may say "the CPU was 70% utilized," we should really be thinking "the measurements of CPU busy-time totaled 70% of the measurements of elapsed-time." There's more, but I won't repeat his whole talk. You might enjoy [his book][3].

Neil mentioned that this way of thinking isn't foreign -- we learn it in physical sciences. Indeed, I immediately remembered all my chemistry and physics labs, and mechanical engineering classes, and.... But that's a whole education away now. Somehow between then and now, I educated myself to think that computers manipulate numbers, and the numbers are somehow mathematically pure.

When computers store and retrieve numbers, that's often *imprecise*, and that *is* continually present in my mind -- but that's a whole different matter.

 [1]: http://www.perfdynamics.com/
 [2]: http://omniti.com/surge/2010
 [3]: http://www.xaprb.com/blog/2010/07/06/a-review-of-guerrilla-capacity-planning-by-neil-gunther/
