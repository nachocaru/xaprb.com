---
title: How to block ads effectively with AdBlock regular expressions
date: "2005-10-26"
permalink: /2005/10/26/adblock-patterns/
---
One of the greatest things about Firefox is the ability to customize the browser with extensions. By far my favorite extension is [Adblock][1]. It allows you to specify arbitrary regular expression patterns to block your browser from fetching and displaying content. The regular expression syntax is standard JavaScript syntax, based on Perl 5.

Blocking content is a delicate dance. It's very easy to block too much, so the patterns need to be fairly specific. The following patterns will match almost any content I don't want to see on the Internet, and rarely block something I do want to see. Note that these are regular expressions.

*   <del datetime="2005-12-22T17:24:23+00:00">\.swf</del>
*   \bads\b
*   2o7
*   a1\.yimg
*   adbrite
*   adclick
*   adfarm
*   adrevolver
*   adserver
*   adtech
*   advert
*   atdmt
*   atwola
*   banner
*   bizrate
*   blogads
*   bluestreak
*   burstnet
*   casalemedia
*   coremetrics
*   doubleclick
*   falkag
*   fastclick
*   feedstermedia
*   googlesyndication
*   hitbox
*   httpads
*   imiclk
*   intellitxt
*   js\.overture
*   kanoodle
*   kontera
*   mediaplex
*   nextag
*   pointroll
*   qksrv
*   rightmedia
*   speedera
*   statcounter
*   tribalfusion
*   webtrends

To use it, join the entire list with <kbd>|</kbd> and start and end it with <kbd>/</kbd>. The following is everything together as a single regular expression. This is my one and only Adblock filter:

<pre>/\bads\b|2o7|a1\.yimg|adbrite|adclick|adfarm|adrevolver|adserver|adtech|advert|atdmt|atwola|banner|bizrate|blogads|bluestreak|burstnet|casalemedia|coremetrics|doubleclick|falkag|fastclick|feedstermedia|googlesyndication|hitbox|httpads|imiclk|intellitxt|js\.overture|kanoodle|kontera|mediaplex|nextag|pointroll|qksrv|rightmedia|speedera|statcounter|tribalfusion|webtrends/</pre>

If you're familiar with regular expressions, you will have realized some of the entries can be combined into one with grouping. Without taking this to extremes, here is the shorter version:

<pre>/\bads\b|2o7|a1\.yimg|ad(brite|click|farm|revolver|server|tech|vert)|at(dmt|wola)|banner|bizrate|blogads|bluestreak|burstnet|casalemedia|coremetrics|(double|fast)click|falkag|(feedster|right)media|googlesyndication|hitbox|httpads|imiclk|intellitxt|js\.overture|kanoodle|kontera|mediaplex|nextag|pointroll|qksrv|speedera|statcounter|tribalfusion|webtrends/</pre>

I don't block `swf` because the [flashblock][2] extension blocks Flash more conveniently than AdBlock, in my opinion.

 [1]: http://adblock.mozdev.org/
 [2]: http://flashblock.mozdev.org/
