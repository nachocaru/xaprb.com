---
title: "What it's like to write a technical book, continued"
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
My post on [what it's like to write a technical book][1] was a stream-of-consciousness look at the process of writing [High Performance MySQL, Second Edition][2]. I got a lot of responses from it and learned some neat things I wouldn't have learned if I hadn't written the post. I also got a lot of questions, and [my editor wrote a response][3] too. I want to follow up on these things.

### Was I fair, balanced and honest?

I really intended to write the post as just "here's what it's like, just so you're prepared." But at some point I got really deep into it and lost my context. That's when I started to write about the things that didn't go so smoothly with the publisher, and some of these things had a little extra sting in them that I would have done well to edit out.

All of us are human and the process wasn't that bad, all things considered &#8212; the book was just a massive project that put huge demands on all of us and stressed everything from the capabilities of our chosen tools to our patience. As the [editor points out in his response to my blog post][3], this is precisely why nobody else has ever been able to pull this off. This book stands head and shoulders above the crowd. It's just hard to write, and very few people in the world actually have the knowledge to do it, much less the time, inclination, and ability.

Everything I said was (I believe) factual and correct, although as the editor points out there are different stories behind them. I also want to mention that I'd shared all those concerns with my editor; I avoid criticizing people behind their backs. In hindsight, throwing all of my concerns onto a blog post without warning isn't the kind of thing I like to do either.

So I believe I was honest, but unfair to the editor. I've apologized to him. And by the way, yes I would work with him again, and I fully expect that it would be easier because I have learned more about the process.

I ran this post by my editor before publishing it.

### A deeper explanation of my heuristics

Several people asked me to say more about my heuristics for improving the quality of the writing. I've already explained many of them, but here's more:

(were|was|is|are|has been|be)( [a-zA-Z]+)? [a-zA-Z]+ed\>
:   This regular expression can help find some occurrences of passive voice. It finds a word or phrase that's some variation on the verb "to be," usually in the past tense; followed by an optional word (probably an adjective); followed by another word that ends in "-ed," which is also potentially a verb in the past tense. This is not the only way to write in the passive voice, but it's kind of the classic. Here are some examples: "the blog post was posted," "the benchmark was rapidly created."

(were|was|is|are|ha[sd] been|be)( [a-zA-Z]+)? [a-zA-Z]+e[dn]\>
:   An enhanced version. As I looked at the preceding point, I saw some other simple examples it doesn't catch. For example, it doesn't catch "had been" and it doesn't catch verbs like "written." Ironically, the first thing that came to mind as I thought about examples was "the book had been written."

while|since
:   There's nothing wrong with these words, except when they're used in lieu of "because" to indicate causality. This is a problem for non-native English speakers, because these words have a temporal meaning too. For example, "Since MySQL 4.1 has no stored procedures, you have to use MySQL 5.0 if you want stored procedures." If you aren't a native English speaker, and even if you are, it's easy to read that as "MySQL has had no stored procedures since version 4.1, &#8230;" and then when your eyes reach the part about MySQL 5.0, it makes no sense. My rule for this is to say "because" when I mean "because."

using
:   Real examples: "Using MyISAM tables works very well" can become "MyISAM tables work very well." And "A final possibility is simply to switch to using a table" can become "Finally, you can use a table" instead.

in order
:   The phrase "in order to" can almost always be replaced by "to." It also tends to show a rough transition between the first and second phrases in a sentence. Perhaps these phrases should be integrated into a single phrase. "You can use this regex in order to find poorly constructed sentences" can become "this regex can find poorly constructed sentences" or "You can find poorly constructed sentences with this regex." I prefer the latter; it is very direct, and that straightforward, simple writing style is really important in complex subject matter.

of course|without saying|obviously|clearly|needless
:   It goes **without saying**, but **of course** these words **obviously** point out when I'm writing stupid things that I **clearly** need to take a closer look at. **Needless to say**, most of the phrases in this paragraph are indeed needless to say. They are a red flag for lazy writing, such as glossing over a difficult point that should instead be explained &#8212; hard work, but necessary.

whether
:   I found quite a few places where the phrase "whether or not" was used. This can be shortened: "to see whether or not the disk is the problem" can become "to see whether the disk is the problem." But better yet, the phrase often glues together poorly written phrases into an awkward sentence, just as "in order to" does. Can "whether" be replaced by "if?" Or does the sentence or paragraph just need to be reworked completely?

allow
:   This word can usually be replaced by "let." "The remaining settings allow MySQL to allocate more RAM" can become "The remaining settings let MySQL allocate more RAM." Occasionally, it is part of a larger phrase or thought needs to be shortened and clarified. "When nobody is writing, readers obtain read locks that allow other readers to do the same" became "When nobody is writing, readers can obtain read locks, which don't conflict with other read locks."</p> 
    ensure
    :   I found that this word is often subtly misused. It really means "guarantee" but is often used as "double-check" or "make sure." I don't want to be too dogmatic about this word: its usage in modern English is complex ([see the usage note on assure here][4]; that in itself might be a reason to avoid it). But I found many places where I wanted to remove it in favor of an explicit instruction that tells the reader to take action. "Ensure" as an instruction is kind of a politically correct way to tell someone to do something, and I'm not afraid to just tell you to do it if I think you need to. I don't want you to miss my meaning.
    
    only
    :   I have a habit of using this word incorrectly. "I only have ten fingers" should be "I have only ten fingers."
    
    as (we|you)|again,
    :   These phrases usually show a place where the writing is confused and redundant. They show up in places like "as we already said, you should tune your server" and "again, you should tune your server." Any instruction to the reader to break the narrative flow is a place to examine whether the concepts are in the right order. Cross-references, footnotes, and reminders are not always evil, but they're to be regarded with suspicion.</dl> 
    ### Readability metrics
    
    The tools I used to find sentences and phrases that score badly on some readability metric were pretty helpful to me as I tightened the writing up more and more. Nobody has reviewed the book yet, but I think when they do, they'll be unlikely to mention "oh, and by the way the writing is wonderfully compact!" If we pulled this off right, you won't notice that the writing is clear and compact. Writing is like a stereo system: you're supposed to hear the music, not the speakers.
    
    Anyway, my point is that we expanded the first edition's actual coverage many times over, and ended up with only 658 pages of actual material. So the writing is much more compressed, and to do that you have to find and eliminate confusing writing. Confusing writing usually means that the concepts don't flow clearly, and it takes more words to say the same thing because you're kind of bumbling about, gesturing at your meaning from several angles instead of saying it clearly just once.
    
    Here's how I analyzed each chapter:
    
    *   I used OpenOffice's export feature to export the file to MediaWiki format. This is a plain-text markup format. I forget now why I didn't just export to text, but there was something about MediaWiki format that made it easier to munge with Perl.
    *   I ran my clean_text.pl program against the exported file to convert the format to a simpler one without special characters and markup. Some of the markup (footnotes, for example) stayed in the text and confused the metrics, but that's life.
    *   I ran my analyze_text.pl program against this to find the "worst" places.
    
    As I wrote in my previous post, the analyzer uses a combination of readability metrics and "other stuff" to measure the badness of each sentence and paragraph. It aggregates sentences and paragraphs by the metrics. I calculated the number of words, percent of complex words, syllables per word, number of sentences, words per sentence, and a bunch of other things, as well as the standard readability metrics. Each sentence and paragraph got scored on these. Then I printed overall metrics, and sorted the sentences and paragraphs worst-first and printed out a snippet of the offending text. Here's a [sample of chapter 3&#8242;s metrics][5] (originally numbered chapter 4) at some intermediate stage in the writing process.
    
    This was a lot of work. If I had been writing with Vim, I could have done better. I could have used the compiler integration and set my "make" program to the analysis program. If you use Vim and you don't know about this, it's a pity. My next book will be written in Vim, by the way.
    
    Actually, I probably could have done better regardless, but this was good enough. I just searched for the snippets and then examined what was going on.
    
    There were some false positives. For example, bullet-points often scored badly on the readability metrics, and so a five-word bullet point item would look like terrible writing just because it was short enough that it had a high percentage of complex words. It's not an exact science. Maybe next time will be better.
    
    If you'd like to see the source code, here's the [clean_text.pl][6] and here's the [analyze_text.pl][7]. Enjoy!

 [1]: http://www.xaprb.com/blog/2008/06/15/what-is-it-like-to-write-a-technical-book/
 [2]: http://www.highperfmysql.com/
 [3]: http://toc.oreilly.com/2008/06/oreilly-author-and-editor-air.html
 [4]: http://dictionary.reference.com/browse/assure
 [5]: http://www.xaprb.com/articles/ch04.txt
 [6]: http://www.xaprb.com/articles/clean_text.txt
 [7]: http://www.xaprb.com/articles/analyze_text.txt
