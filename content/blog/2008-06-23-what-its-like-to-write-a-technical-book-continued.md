---
title: 'What it&#8217;s like to write a technical book, continued'
author: Baron Schwartz
layout: post
permalink: /2008/06/23/what-its-like-to-write-a-technical-book-continued/
categories:
  - High Performance MySQL
  - Perl
  - SQL
  - Tools
tags:
  - Perl
  - writing
---
My post on [what it&#8217;s like to write a technical book][1] was a stream-of-consciousness look at the process of writing [High Performance MySQL, Second Edition][2]. I got a lot of responses from it and learned some neat things I wouldn&#8217;t have learned if I hadn&#8217;t written the post. I also got a lot of questions, and [my editor wrote a response][3] too. I want to follow up on these things.

### Was I fair, balanced and honest?

I really intended to write the post as just &#8220;here&#8217;s what it&#8217;s like, just so you&#8217;re prepared.&#8221; But at some point I got really deep into it and lost my context. That&#8217;s when I started to write about the things that didn&#8217;t go so smoothly with the publisher, and some of these things had a little extra sting in them that I would have done well to edit out.

All of us are human and the process wasn&#8217;t that bad, all things considered &#8212; the book was just a massive project that put huge demands on all of us and stressed everything from the capabilities of our chosen tools to our patience. As the [editor points out in his response to my blog post][3], this is precisely why nobody else has ever been able to pull this off. This book stands head and shoulders above the crowd. It&#8217;s just hard to write, and very few people in the world actually have the knowledge to do it, much less the time, inclination, and ability.

Everything I said was (I believe) factual and correct, although as the editor points out there are different stories behind them. I also want to mention that I&#8217;d shared all those concerns with my editor; I avoid criticizing people behind their backs. In hindsight, throwing all of my concerns onto a blog post without warning isn&#8217;t the kind of thing I like to do either.

So I believe I was honest, but unfair to the editor. I&#8217;ve apologized to him. And by the way, yes I would work with him again, and I fully expect that it would be easier because I have learned more about the process.

I ran this post by my editor before publishing it.

### A deeper explanation of my heuristics

Several people asked me to say more about my heuristics for improving the quality of the writing. I&#8217;ve already explained many of them, but here&#8217;s more:

(were|was|is|are|has been|be)( [a-zA-Z]+)? [a-zA-Z]+ed\>
:   This regular expression can help find some occurrences of passive voice. It finds a word or phrase that&#8217;s some variation on the verb &#8220;to be,&#8221; usually in the past tense; followed by an optional word (probably an adjective); followed by another word that ends in &#8220;-ed,&#8221; which is also potentially a verb in the past tense. This is not the only way to write in the passive voice, but it&#8217;s kind of the classic. Here are some examples: &#8220;the blog post was posted,&#8221; &#8220;the benchmark was rapidly created.&#8221;

(were|was|is|are|ha[sd] been|be)( [a-zA-Z]+)? [a-zA-Z]+e[dn]\>
:   An enhanced version. As I looked at the preceding point, I saw some other simple examples it doesn&#8217;t catch. For example, it doesn&#8217;t catch &#8220;had been&#8221; and it doesn&#8217;t catch verbs like &#8220;written.&#8221; Ironically, the first thing that came to mind as I thought about examples was &#8220;the book had been written.&#8221;

while|since
:   There&#8217;s nothing wrong with these words, except when they&#8217;re used in lieu of &#8220;because&#8221; to indicate causality. This is a problem for non-native English speakers, because these words have a temporal meaning too. For example, &#8220;Since MySQL 4.1 has no stored procedures, you have to use MySQL 5.0 if you want stored procedures.&#8221; If you aren&#8217;t a native English speaker, and even if you are, it&#8217;s easy to read that as &#8220;MySQL has had no stored procedures since version 4.1, &#8230;&#8221; and then when your eyes reach the part about MySQL 5.0, it makes no sense. My rule for this is to say &#8220;because&#8221; when I mean &#8220;because.&#8221;

using
:   Real examples: &#8220;Using MyISAM tables works very well&#8221; can become &#8220;MyISAM tables work very well.&#8221; And &#8220;A final possibility is simply to switch to using a table&#8221; can become &#8220;Finally, you can use a table&#8221; instead.

in order
:   The phrase &#8220;in order to&#8221; can almost always be replaced by &#8220;to.&#8221; It also tends to show a rough transition between the first and second phrases in a sentence. Perhaps these phrases should be integrated into a single phrase. &#8220;You can use this regex in order to find poorly constructed sentences&#8221; can become &#8220;this regex can find poorly constructed sentences&#8221; or &#8220;You can find poorly constructed sentences with this regex.&#8221; I prefer the latter; it is very direct, and that straightforward, simple writing style is really important in complex subject matter.

of course|without saying|obviously|clearly|needless
:   It goes **without saying**, but **of course** these words **obviously** point out when I&#8217;m writing stupid things that I **clearly** need to take a closer look at. **Needless to say**, most of the phrases in this paragraph are indeed needless to say. They are a red flag for lazy writing, such as glossing over a difficult point that should instead be explained &#8212; hard work, but necessary.

whether
:   I found quite a few places where the phrase &#8220;whether or not&#8221; was used. This can be shortened: &#8220;to see whether or not the disk is the problem&#8221; can become &#8220;to see whether the disk is the problem.&#8221; But better yet, the phrase often glues together poorly written phrases into an awkward sentence, just as &#8220;in order to&#8221; does. Can &#8220;whether&#8221; be replaced by &#8220;if?&#8221; Or does the sentence or paragraph just need to be reworked completely?

allow
:   This word can usually be replaced by &#8220;let.&#8221; &#8220;The remaining settings allow MySQL to allocate more RAM&#8221; can become &#8220;The remaining settings let MySQL allocate more RAM.&#8221; Occasionally, it is part of a larger phrase or thought needs to be shortened and clarified. &#8220;When nobody is writing, readers obtain read locks that allow other readers to do the same&#8221; became &#8220;When nobody is writing, readers can obtain read locks, which don&#8217;t conflict with other read locks.&#8221;</p> 
    ensure
    :   I found that this word is often subtly misused. It really means &#8220;guarantee&#8221; but is often used as &#8220;double-check&#8221; or &#8220;make sure.&#8221; I don&#8217;t want to be too dogmatic about this word: its usage in modern English is complex ([see the usage note on assure here][4]; that in itself might be a reason to avoid it). But I found many places where I wanted to remove it in favor of an explicit instruction that tells the reader to take action. &#8220;Ensure&#8221; as an instruction is kind of a politically correct way to tell someone to do something, and I&#8217;m not afraid to just tell you to do it if I think you need to. I don&#8217;t want you to miss my meaning.
    
    only
    :   I have a habit of using this word incorrectly. &#8220;I only have ten fingers&#8221; should be &#8220;I have only ten fingers.&#8221;
    
    as (we|you)|again,
    :   These phrases usually show a place where the writing is confused and redundant. They show up in places like &#8220;as we already said, you should tune your server&#8221; and &#8220;again, you should tune your server.&#8221; Any instruction to the reader to break the narrative flow is a place to examine whether the concepts are in the right order. Cross-references, footnotes, and reminders are not always evil, but they&#8217;re to be regarded with suspicion.</dl> 
    ### Readability metrics
    
    The tools I used to find sentences and phrases that score badly on some readability metric were pretty helpful to me as I tightened the writing up more and more. Nobody has reviewed the book yet, but I think when they do, they&#8217;ll be unlikely to mention &#8220;oh, and by the way the writing is wonderfully compact!&#8221; If we pulled this off right, you won&#8217;t notice that the writing is clear and compact. Writing is like a stereo system: you&#8217;re supposed to hear the music, not the speakers.
    
    Anyway, my point is that we expanded the first edition&#8217;s actual coverage many times over, and ended up with only 658 pages of actual material. So the writing is much more compressed, and to do that you have to find and eliminate confusing writing. Confusing writing usually means that the concepts don&#8217;t flow clearly, and it takes more words to say the same thing because you&#8217;re kind of bumbling about, gesturing at your meaning from several angles instead of saying it clearly just once.
    
    Here&#8217;s how I analyzed each chapter:
    
    *   I used OpenOffice&#8217;s export feature to export the file to MediaWiki format. This is a plain-text markup format. I forget now why I didn&#8217;t just export to text, but there was something about MediaWiki format that made it easier to munge with Perl.
    *   I ran my clean_text.pl program against the exported file to convert the format to a simpler one without special characters and markup. Some of the markup (footnotes, for example) stayed in the text and confused the metrics, but that&#8217;s life.
    *   I ran my analyze_text.pl program against this to find the &#8220;worst&#8221; places.
    
    As I wrote in my previous post, the analyzer uses a combination of readability metrics and &#8220;other stuff&#8221; to measure the badness of each sentence and paragraph. It aggregates sentences and paragraphs by the metrics. I calculated the number of words, percent of complex words, syllables per word, number of sentences, words per sentence, and a bunch of other things, as well as the standard readability metrics. Each sentence and paragraph got scored on these. Then I printed overall metrics, and sorted the sentences and paragraphs worst-first and printed out a snippet of the offending text. Here&#8217;s a [sample of chapter 3&#8242;s metrics][5] (originally numbered chapter 4) at some intermediate stage in the writing process.
    
    This was a lot of work. If I had been writing with Vim, I could have done better. I could have used the compiler integration and set my &#8220;make&#8221; program to the analysis program. If you use Vim and you don&#8217;t know about this, it&#8217;s a pity. My next book will be written in Vim, by the way.
    
    Actually, I probably could have done better regardless, but this was good enough. I just searched for the snippets and then examined what was going on.
    
    There were some false positives. For example, bullet-points often scored badly on the readability metrics, and so a five-word bullet point item would look like terrible writing just because it was short enough that it had a high percentage of complex words. It&#8217;s not an exact science. Maybe next time will be better.
    
    If you&#8217;d like to see the source code, here&#8217;s the [clean_text.pl][6] and here&#8217;s the [analyze_text.pl][7]. Enjoy!

 [1]: http://www.xaprb.com/blog/2008/06/15/what-is-it-like-to-write-a-technical-book/
 [2]: http://www.highperfmysql.com/
 [3]: http://toc.oreilly.com/2008/06/oreilly-author-and-editor-air.html
 [4]: http://dictionary.reference.com/browse/assure
 [5]: http://www.xaprb.com/articles/ch04.txt
 [6]: http://www.xaprb.com/articles/clean_text.txt
 [7]: http://www.xaprb.com/articles/analyze_text.txt