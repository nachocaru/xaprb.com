---
title: What is it like to write a technical book?
date: "2008-06-15"
url: /blog/2008/06/15/what-is-it-like-to-write-a-technical-book/
categories:
    - Writing
---
<p style="background:silver; border:1px solid black">Update, almost a year later: Take this with a grain of salt.  I wrote it after an incredible marathon of staying up most of the night for months on end.  My take on it now that I have some distance from the project is -- I'd definitely work with Andy Oram and O'Reilly again, and I'd be able to make the process a lot easier for myself the second time.</p>

<p>As you probably know, I recently finished <a href="http://www.highperfmysql.com/">writing a book</a> with a few co-authors.  I kept notes along the way and wanted to describe the process for those who are thinking about writing a book, too.</p>

<p><strong>Update</strong>: see <a href="http://www.xaprb.com/blog/2008/06/23/what-its-like-to-write-a-technical-book-continued/">the followup post for more of the story</a>, including my editor's responses.</p>

<p>I think it's important to be objective; my purpose here is to help prospective authors get a feeling of what it's like, and it's not all good (but I'd encourage people to do it anyway). Hopefully I won't come off as sounding peeved at anyone or like I'm trying to put people down. I'll have a lot to say about what went right and wrong, and how it helped and hindered the process.</p>

<p>Please excuse the rambling nature of this post.  I'd love to write it well, but there is a lot to say and it's a lot of work to write a long post in an organized fashion.</p>

<h3>In the beginning</h3>

<p><a href="http://www.percona.com/">Peter Zaitsev</a> contacted me about a year ago and asked if I'd like to help write the book.  In the earliest stages, the idea was that I'd write a couple of appendices and help transform Peter and Vadim's writing into book-quality material; I was to be sort of like a glorified technical editor.  At the time I didn't know who, but I knew there would be a fourth author.</p>

<p>When Peter contacted me, I asked about the schedule, the outline, and what was complete so far.  At that point, there was an outline in pretty basic form -- just chapters and headings, with a sentence or two to explain the outline in a couple of places.  The outline followed the first edition's outline to some extent, and the chapters on benchmarking, profiling, indexing, and query optimization were partially written.</p>

<p>The schedule was actually being slipped already, because the book was supposed to go to tech review in June of 2007.  The proposal was to revise the schedule so that everything would go to tech review by October of 2007.  I don't know when Peter started on the book, actually; Andy Oram had spent years trying to get authors for the second edition, and I think Peter had started quite some time before I came on board.  He had then added Vadim and Arjen later, but it was clear that it wasn't going to meet the original schedule no matter what.</p>

<p>I asked the editor to send me the contract, and took a look at it.  It was pretty vague.  Responsibilities and steps to completion were not specified.  I asked a friend of mine who'd written a book for <a href="http://apress.com/">Apress</a> to review it for me.  I asked him what the process was like.  He described a process that had been exactly specified; his contract had specified what he was responsible for and exactly what steps were involved in publishing the book, who would perform each step, and when they had to happen.  If he didn't get his chapters done, he was not responsible for his co-author's.  O'Reilly's contract, on the other hand, was really vague.  I mulled over it, decided the proposed schedule was amusing, and decided to go ahead with the book anyway, bad contract or no.</p>

<p>I did negotiate to be a full author, rather than just being mentioned in the credits as originally proposed by the O'Reilly team, who thought I wouldn't really be doing much work.  And I decided that to make this work, it was going to take a lot of time.  I spoke to my boss at the <a href="http://www.rimmkaufman.com/">Rimm-Kaufman Group</a>, and he was completely supportive of me taking time off work.  I went back to O'Reilly and asked for more advances on royalties to cover me working half-time, and that was approved.  I signed the contract and started working.  Actually, I may have started working first.</p>

<p>The tech publishing industry may work many ways, and I'm no expert on it, but the most surprising thing to me was that in the tech world, you generally don't write a book and then go look for a publisher who'll print it.  It works the other way around.  Generally, they do market research, decide they need a book on a topic, and go looking for people who are competent to write it.  Especially for a second edition when the first edition's authors aren't interested in being involved, I imagine this must be a challenge.</p>

<h3>The process</h3>

<p>The process of getting a book to print isn't as simple as just writing it and sending it away.  We drafted material, sent it to the editor, passed it around amongst ourselves, re-drafted, re-edited, ad nauseum.  And then it went to tech review, and we got back revisions and comments; then more revising and editing; more writing, and on and on it went.  Ultimately everything passes final editorial approval and "goes to production."  If you thought that was the end of the work, ha ha, it was nowhere close to being over.  There was a production copyeditor, then a production editor, a professional artist, proofreading, quality control, more proofreading, indexing, final quality control, revisions, and finally it went to press.  Each of these steps was a lot of work for me.</p>

<h3>Collaboration and tools</h3>

<p>We were geographically distributed pretty widely, from California to London, Ukraine, Virginia, and Australia.  Collaboration was probably what you'd expect: we never met face to face, though we did send a lot of email and we had weekly VOIP conference calls (at 6:30 AM my time, late late night Arjen's time).  We used a Subversion repository O'Reilly set up for us to store the chapters, figures, etc.  And we used <a href="http://www.openoffice.org/">OpenOffice.org</a> to write the chapters.  This was fine with me; I was afraid when I started that it would be in Word.  I don't like word processors of any type, but I was happier with OO.org than Microsoft Word.</p>

<p>Using Subversion with binary files wasn't ideal.  By default Subversion doesn't lock files for editing, so it was possible for us to edit the same file at the same time, and OO.org's files are binary, so they're not merge-able.  We set the svn:needs-lock property on the files so only one person could edit at a time.  While that seems like a problem, there was enough work to do that I don't think we ended up waiting for other people to release locks more than once or twice.  Each chapter was in a separate file.  We had a few files of meta-data indicating completion, TODO items, and so on.  Here's a sample from our Status file:</p>

<pre>4 Schema Optimization and indexing (ch04-Schema_Optimization.odt)

   * Baron has written nearly everything.
   * Baron is waiting for feedback on one section.
   * Baron moved redundant material to other chapters.
   * Peter has reviewed and commented.
   * Baron reviewed Peter's comments and revised.
   * Baron reviewed for EXPLAIN appendix.
   * Sent to TR Jan 2nd.
   * Baron rewrote completely.
   * Baron reviewed for grammar and readability.
   * Peter reviewed again.
   * Baron reviewed Peter's comments and revised.
   * Baron revised as per Sheeri.
   * Baron revised as per Igor.
   * Andy edited again.
   * Baron revised.
</pre>

<p>That's the final state of the file; as we went, we had sub-sections in this text file indicating next steps, who needed to do what, and so on.  Predictably, at various points each section would be changed to say something like "final draft complete" when in hindsight it was probably about 25% complete.</p>

<p>Back to the tools: in fact you can actually compare and merge files from within OO.org, but it's a crude way to do it.  OO.org was annoying in several ways; it has a lot of bugs that got in the way.  Some were simple, like the way the find-and-replace dialog doesn't remember that you want to use regular expressions from search to search.  Others were more serious, and crashed the program upon applying style definitions, for example.  O'Reilly has a template, which has macros that help you format things with the styles they want so they'll be able to convert the files to their own formats later.  These were kind of clunky, and OO.org didn't work so well with them in many cases.  I did learn some ways to use them better; eventually I found various toolbars and dialog windows in Writer, and got them to mostly behave the way I wanted so I could write as I wished.  But there were still a lot of annoying things, like the inability to have an outline view.  I'm not sure that OO.org can't do outlines one way or another, but O'Reilly's custom styles weren't recognized as outline-able heading levels.</p>

<p>When Andy edited files, he initially put comments in them using the Comment feature.  This didn't work well.  OO.org's commenting and reviewing features, at least in that version, were hideous.  Finding comments in the text was really hard -- there seemed to be no relationship between the comment order and the order they appear in the text.  And once I found them, I couldn't actually read them, because the interface doesn't even line-wrap them, so you can see only a couple of words at a time.  So I quickly convinced Andy to put his comments in the text instead.  He turned on Track Changes, which works pretty well, and I just had to review and accept them.</p>

<p>At the beginning, I had in mind that I would be revising and editing, not writing new material.  So I also began by enabling Track Changes.  But this made the program really sloooooow, and I found that I was a) writing much more than editing, and b) when editing, I was basically rewriting.  So I just turned it off.  There were a few times I worried that I was losing the original meaning, but asking other authors to review my changes was too slow.  The other authors had so much work to do that ultimately we were only able to get Peter to write the initial outline, review what I wrote from it, and in some cases review again.  I had to face up to the reality of this and come up with another plan: snip out the relevant bits that really, really needed to be reviewed and put them into emails, which are much less work for other authors to browse through and respond, but caused more work for me.</p>

<p>There are some other things that really cut into my productivity: you can't split panes and see/edit two parts of the document at once; and so on and so on.  I'd insert figures and they'd disappear after someone else opened and saved the file.  Ultimately I just coped.  Getting the job done was most important.</p>

<h3>Revising, rewriting, and starting from scratch</h3>

<p>The book was a second edition.  As such, technically we were revising and updating the first edition.</p>

<p>In reality we didn't keep much of the first edition -- just a bit of text and most of the outline and overall structure.  I want to be careful how I say this, because I don't want to criticize the first edition, but obviously our job was to make it better.  I've heard people say they loved the first edition, and people say they thought it was not in-depth enough.  (For those people hopefully the second edition will satisfy.)</p>

<p>I actually found that except for the outline, I preferred not to refer to the first edition's material if possible.  It is much more work to rewrite than to write from scratch, unless the changes are going to be really minimal.  In a few places, we thought the changes should be really cosmetic; those almost always ended up being a lot of work.  Oops!</p>

<p>The original idea was that Peter and Vadim would try to write the material, and then I'd rewrite/edit (and in some cases it would be Arjen instead of me), and Peter would review, and Andy would edit, and we'd go around and around until it was done.  I quickly realized that this would not work.  Rewriting is far more work than just writing from a detailed outline.  I timed it a few times, and found that it takes about 4 times as long to rewrite and tweak text than it takes to get the paragraphs onto the page.</p>

<p>Prospective authors, take note of this point!  <strong>The "final tweaking" is vastly more work than the initial, satisfying process of getting the words down</strong>.  You can cut your work down by about 75% if you keep working on more and more detailed outlines, long past the point you think you ought to start "writing."  That's my experience anyway.</p>

<p>After some thought, I decided that it's because rewriting is sort of like reverse engineering and then re-compiling.  Let's take this for an example:</p>

<blockquote><p>Good performance depends on both an optimal schema and optimal indexing.  Optimizing server settings can improve performance from a few percent to several times, but optimizing a poorly designed or badly indexed schema can improve performance several orders of magnitude. </p></blockquote>

<p>This paragraph is not very clear, but it's not very unclear, either.  What's to be done to fix it?  Well, let's see&#8230; you have to find what's good and bad about it.  What's confusing?  I think "from a few percent to several times" is pretty unclear.  What are we trying to say here?  Zoom out: what is the point of the whole paragraph?  I'd say the main points in this paragraph are a) you need both optimal schema and indexing; b) settings can give a little improvement, but schema can give a lot.  Now we'll try to figure out how to say that succinctly, and what to leave in and what to leave out.  What eventually went to print was this:</p>

<blockquote><p>
Optimizing a poorly designed or badly indexed schema can improve performance by
orders of magnitude. If you require high performance, you must design your schema
and indexes for the specific queries you will run.</p></blockquote>

<p>Pretty different, huh?  There were probably 4 to 6 revisions in between.  Here's another before/after:</p>

<blockquote><p>Generosity can be Unwise</p>
<p>A common mistake is assuming that since space consumption for short strings is the same for VARCHAR(10) and VARCHAR(200), you can simply set the maximum length to some higher value. In fact this has a severe performance penalty, because strings are often internally allocated as a fixed size object.  Thus VARCHAR(200) will use much more space in memory, especially for sorting or operations which use in-memory temporary tables. The same thing happens with filesorts that use on-disk temporary tables.  The best strategy is to allocate the space you really need. </p></blockquote>

<p>&#8230; and after:</p>

<blockquote><p>                             Generosity Can Be Unwise</p>
<p>Storing the value 'hello' requires the same amount of space in a VARCHAR(5) and a
VARCHAR(200) column. Is there any advantage to using the shorter column?</p>
<p>As it turns out, there is a big advantage. The larger column can use much more memory, because MySQL often allocates fixed-size chunks of memory to hold values internally. This is especially bad for sorting or operations that use in-memory temporary
tables. The same thing happens with filesorts that use on-disk temporary tables.
The best strategy is to allocate only as much space as you really need.</p></blockquote>

<p>This process takes an amazing amount of time, and though you may think it's an editor's job, in my experience writing this book, this was mostly my job, not the editor's.  If I hadn't done it, either a) the editor would have and I'd have had to do a ton of work reviewing the edits (this is no small task) or b) the book would have been lower quality.</p>

<p>As a result, we quickly scrapped the idea that Peter and Vadim would write a first draft and I'd take it from there.  The several chapters that had already been written in this fashion were a mind-boggling amount of work to do, and I had to come back to them again and again.  Instead, I asked Peter to write detailed bullet-point outlines and fragments of thoughts.  This was much easier to write from.  Essentially, I was asking him to iteratively fill in an outline for me, which I now believe is a much better way to write this type of complex hierarchical material.  (I do not believe it's a good way to write a complex narrative, though; this is not a one-size-fits-all approach).</p>

<p>I can't find a sample of the rough outline anymore, but I think you get the idea.</p>

<p>Another thing that caused extra work was when the outline wasn't sufficiently detailed to start with.  For example, we initially lumped the chapters on replication, scaling, high availability and so on together.  It looked reasonable, but that's because we hadn't outlined in enough detail.  After beginning to flesh it out, it was clear this would be a monster chapter, and we split it apart -- more work.  We also removed the "Back to Basics" chapter from the first edition, and ended up removing or moving a lot of material that was in the wrong place or was duplicated.  All of this was more and more work.</p>

<p>I would say that avoiding the temptation to write, and outlining in fanatical detail, is a very high-value activity for writing a book that's hierarchically organized like this.  Do not write prose.  The moment you start writing sentences, you begin structuring your thoughts in ways that create complex relationships between words, sentences, and paragraphs.  Teasing this apart and putting it back together is brutally hard sometimes.  There were times when I stared at something and just knew it was terrible but could not for the life of me figure out how to say it differently.  I had tunnel vision because I was locked into what was already there.</p>

<p>Quite often we wrote about things in some way that seemed to make sense, but then discovered that a few paragraphs or pages needed to be swapped.  The order in which we wrote things initially made the text flow a certain way that didn't make sense after physically moving it. Cleaning this up was really hard.  I'd advise prospective authors to plan for a lot of re-jiggering in the outline, so <strong>outline in much more detail than you think you have to</strong>.  It's a lot less work to rearrange part of a chapter when it's in outline form.</p>

<p>At some point, when you get a large amount of text written, it's hard to keep track of what's where.  I found myself thinking "I've written about this somewhere" and searching for it, but was unable to find it.  Later, I'd be editing another chapter and I'd see what I was looking for, but then I couldn't remember where the other place was anymore.  Sometimes I'd used different words in the two places, so finding one by searching on the keywords in the other was impossible.  We had a lot of duplicate material in some places, and this was just really hard to deal with.  Part of this is because the book is hierarchically organized, and the old single-hierarchy problem started to bite us.  Things belong in multiple places, but they can only go in one place.  A good example is the server settings and status variables.  Should we discuss them in the server tuning chapter, or in the place where we show you how to interpret the status variables?  They belong in both places, and eventually we ended up with some overlap.  Dealing with this is a lot of work.  I don't know how to mitigate this, other than with a good outline view -- something lacking in OO.org.</p>

<h3>Research</h3>

<p>A lot of what we wrote about required deep research.  Some of the time it was enough to go look at the MySQL manual (which is not always correct, so everything has to be verified), but just as often we had to go read source code or contact a program's author.  And occasionally, we had to run lengthy tests or benchmarks.</p>

<p>What I learned from this is that research can take forever.  You're either trying to understand something, or you're waiting on some poor programmer who has thousands of emails in his inbox.</p>

<p>Here's an example: what does avgrq-sz really mean in iostat?  The man page is confusing.  It says "The average size (in sectors) of the requests that were issued to the device." To find out what this really meant, I had to read the iostat source, kernel source, and kernel documentation.  That took a long time.  Then I confirmed my findings with iostat's author.</p>

<p>We did a lot of research into MySQL's advanced features, such as stored procedures, the query cache, etc.  And a lot -- a lot! -- into InnoDB. We especially wanted to learn how these features interact with each other.  For example, how does InnoDB interact with the query cache?  That's not documented at all.  Each thing took a long time.</p>

<p>We also did a lot of benchmarking.  Benchmarking is time-consuming, too.</p>

<p>Plan for research to take much more time than you think it should.  Jay Pipes told me to plan for about a half-page a day, and I think that might be about right when you have to research much of the material on any given page.</p>

<h3>Writing clearly</h3>

<p>Working with the editor was an educational experience.  I knew I had weak spots in my writing (and I still do) but I didn't know what they were.  I was determined that this book should be clear and easy to understand.  This is hard when you have a really deep, complex book -- but it's even more important then.</p>

<p>As a result, I created a set of heuristics to help me find places where something needed attention.  It wasn't a perfect process, but it helped a lot.  Then I made a text file with regular expression patterns, and searched for matches.  When I found them, I thought about what to do with them.</p>

<p>Here's an example: the word "only".  I have a habit of using it badly, and I didn't know that.  But I learned, because I watched what Andy corrected, and noticed the pattern.  I added the word "only" to my text file of regexps.  Here's an example of how I use it badly:</p>

<blockquote><p>Things belong in multiple places, but they can only go in one place.</p></blockquote>

<p>(Hmmm, that's a sentence I wrote in this blog post!)  Here's what it should say:</p>

<blockquote><p>Things belong in multiple places, but they can go in only one place.</p></blockquote>

<p>Ultimately, my file of regular expressions looked like this:</p>

<pre>Passive voice:

(were|was|is|are|has been|be)( [a-zA-Z]+)? [a-zA-Z]+ed\>

Repeated words:

\&lt;([a-zA-Z]+) +\1\&gt;

Confusing possessives:

the ([a-zA-Z]+) of the

Things to look out for:

while|since|\&lt;using|in order|of course|whether|allow|ensure|only|as (we|you)|without saying|obviously|clearly|needless|again,

Finding pseudo-cross-references:

((Figure|Table) [0-9])|TODO|XREF|MARK_

An awkward phrase that showed up a lot:

\&lt;by [a-zA-Z]+ing\&gt;</pre>

<p>These expressions helped me catch constructions such as "the tail of the dog," which can be shortened to "the dog's tail."  Or something I noticed a lot from existing content: "By using mysqldump, you can dump data" becomes "You can dump data with mysqldump."  (The last line in the file catches that one.)  I tried to make my sentences say, as plainly as possible, "who does what to what."  If you can't answer that question about a sentence, it's not clear in my opinion.  I tried to use shorter words when possible: "allow" can often be "let," and as a bonus it usually turns a phrase into a single word: "This setting allows you to &#8230;" becomes "This setting lets you&#8230;."</p>

<p>Phrases like "of course" usually alert me that I'm being sloppy.  "Of course" really means "this is obvious, but I'm stating it anyway."  So why write it, then?  However, far more often "of course" is a proxy for "I believe this, but I don't know why and it feels hard to explain, so I'm going to just imply that it's obvious and you shouldn't have to ask me to explain it."  A lot of other phrases in my list are just mental bad habits I get into -- such as "in order to," which can usually be shortened to "to."</p>

<p>My father taught me that I use "that" too much.  "She said that the pie was good" becomes "She said the pie was good."  Sometimes I take this too far.  For example, "My father taught me I use 'that' too much" is overkill; it needs an extra "that" to flow well.  The editor put quite a few "that"s back into the text.</p>

<p>Passive voice is an absolute killer -- it confuses the reader, even if s/he doesn't notice, and makes it much harder to comprehend and retain what you're reading.  Here's an example I found with my regular expression: "For some organizations this problem is solved using a combination of" becomes "Some organizations solve this problem with a combination of."  Sentence clarity is made worse by few things more than when passive voice is used by the author.  (You're supposed to laugh.)</p>

<p>No matter how good you think your writing is, prepare to put your ego aside.  An editor will always find ways to make it better.</p>

<p>After applying my heuristics to help me find the weakest spots, I thought I could do better.  I'm a Perl programmer, right?  Right.  So I grabbed a few modules from CPAN, wrote a little process to extract the text from the files and clean it up, and ran sentence analysis on the files.  I used several standard metrics of readability to analyze individual sentences and whole paragraphs: Fog, Flesch, and Flesch-Kincaid.  But these were not good enough, and the hyphenation algorithms were not good enough to measure the number of syllables accurately.  So I turned to the ultimate system for hyphenating the English language: TeX.  It has rules to hyphenate extremely accurately, with all sorts of special cases.  ("The-rapists who pre-ached on wee-knights" is a classic example of bad hyphenation.)  I broke sentences into syllables with a custom process to hook Perl into TeX's hyphenation routines through another CPAN module, and ranked sentences and paragraphs by the number of syllables.  Then I combined all of these metrics and created a report on which parts were the worst.  I looked at the top 30 phrases that scored badly, and found a lot of problems.</p>

<p>This was a valuable exercise; it helped me get a fresh look at the text I'd been staring at for months, and really did help me find the bad spots in the text.  But it wasn't enough, ultimately.  More on this in the next section.</p>

<h3>From concept to completion</h3>

<p>The high-level process to get a chapter to tech review looked like this:</p>

<ul>
	<li>Outline</li>
	<li>Re-outline</li>
	<li>Fill in the outline</li>
	<li>Initial editing</li>
	<li>Send to other authors for review</li>
	<li>Revise</li>
	<li>Send to the editor</li>
	<li>Revise</li>
	<li>Repeat, repeat, repeat&#8230;</li>
</ul>

<p>That's roughly what it takes to get something ready for tech review.  Each chapter went to the editor or assistant editor about three times, and back to Peter at least once or twice.  Peter's revisions were exhaustive (and exhausting) and sometimes a lot of work to figure out what to do with.  He also added a lot of depth in many cases, which required rewriting and re-outlining.  (Remember my advice about outlining to an insane level of detail before beginning to write&#8230;?).  All of these steps also took a lot of time, because it was a lot of work for Peter, too.  He was also doing a lot of onsite consulting, moving his whole family to the USA, and keeping Percona going at the same time.  I honestly have no idea how he did it.</p>

<p>At the "end" of this process, the chapters were reasonably feature-complete, but with large sections marked TODO because they were waiting on one of the authors, an "external network call" to Heikki or someone, or a benchmark.  Still, things have to go to the tech reviewers at some point.  From then on, the process was</p>

<ul>	<li>Send to tech review</li>
	<li>Keep working</li>
	<li>Get back comments</li>
	<li>Revise, wait, wait, wait</li>
	<li>Get back comments from another reviewer, revise again, repeat till done</li>
</ul>

<p>Everyone has busy lives, and we didn't get the first chapters to tech review until the holidays -- the worst time to ask people to do it.  And there was so much to do that I could not possibly wait for all the reviews to come back before beginning to revise.  As a result, I'd get back comments from Sheeri, and I'd have to try to reconcile them against the edits I'd made in response to Roland, and then Pascal's comments would come in and I'd be up at 2AM thinking "why is he telling me this!  I've fixed that already!"  This response was a function of how tired I was and how long I was working on this book, not how I really felt about Pascal.</p>

<p>We also didn't make it clear to the reviewers that they were supposed to be reviewing, not editing.  I'd try not to make this mistake again.  Some of the reviewers spent a lot of time editing grammar and style.  Unfortunately, this was wasted effort -- the material was nowhere near good enough quality to be editing for style and grammar (and the style is up to the author and editor, not tech reviewers).  It's also impossible to actually accept people's changes to the files -- there's no way to merge 5 tech reviewer's changes together, so I only opened the reviewed files separately and looked back and forth between them and my working copy.  The edits added a lot more things I had to look through; this is just the wrong stage to do anything but very high-level editing (at the level of overall organization, for example).  The tech review stage is simply to check for factual errors or things that are technically ambiguous or questionable.  As you'll see, the editing stage was to come much later.</p>

<p>After the tech review and many more iterations of editing and revisions, the chapters were deemed ready for production. There is no way to prepare for how much work it takes to get to this stage.  Well, maybe it's a function of starting with relatively low-fidelity material (the raw content from Peter and Vadim, I mean -- not from the first edition -- some of the material was sort of like a hex dump combined with snippets from blog posts, post-filtered through an obfuscator).  Anyway, the most bizarre thing kept happening: I'd mark a chapter as ready for production in the Status meta-file, and then I'd go back and look at it and find all sorts of TODO notes that were not fixed.  I swear, I thought I fixed them all.  And many of them were a very large amount of work.  And I'd have to admit to myself that the chapter was nowhere close to being done, and go back to work on it.</p>

<p>Finally,  though, they all got done.  And we bundled them up and sent them off to production.  And for the 99th time, I told everyone the book was done.  And I was not even close to being right.</p>

<p>At this point, for the first time, I thought I kind of had an idea of what to expect.  I knew there was a production editor, and then it would go to a team who'd transform it into some typesetting program, and ultimately to a printing press.  But still, no one really told me, even though I asked.  Anyway, hindsight is 20/20, so here's what happened:</p>

<ul>	<li>Production editor</li>
	<li>Revision</li>
	<li>Back to production editor</li>
	<li>Revision</li>
	<li>To the rest of the production team</li>
</ul>

<p>The production editor was going to just check for spelling and grammar, right?  I think someone told me that.  Instead, she went through the book in such incredible detail I couldn't believe it.  And she proposed major changes to just about every paragraph in the whole book.  She made so many changes that it took me at least a day, sometimes two or three, to review each chapter.  That's weeks of work I never saw coming -- every weekend, every night, all the time -- just like when I was writing.  And these were necessary changes.  She found every little ambiguous phrase, every contradiction between parts of the book, missing curly braces in code samples, paragraphs that belonged in other chapters, sentences that needed to be moved, commas in the wrong place, and much more.   She was an absolute editing machine.  Here's an example:</p>

<p><a href='http://www.xaprb.com/media/2008/06/production_editing.png' title='Production editing'><img src='http://www.xaprb.com/media/2008/06/production_editing.thumbnail.png' alt='Production editing' /></a></p>

<p>Remember, this is <em>after</em> the editor and the assistant editor have had about five passes through the material.   I really didn't expect this much revision at this point; I thought it was going to be just fixing commas and quotes in the wrong place.</p>

<p>She went through the entire book in that kind of detail -- that is not a particularly heavily edited section, it's representative.  It was good that she did, but this was way more work than I thought I would still need to do at this stage.</p>

<p>This was made worse by the fact that the production editing process was done in Microsoft Word.  I don't have or use Word.  That would have been OK, but as I already mentioned, OO.org's markup and review capabilities are pretty limited.  The editor used markup comments extensively to clarify a lot of questions she had.  These are precisely OO.org's weakest point.  So I ended up using my wife's laptop, which has Word on it, to review the files.  This refreshed my memory on how buggy Word is -- I would say even buggier than OO.org.  Word crashed I can't tell you how many times, and the display and formatting issues were just ridiculous.  Sometimes entire pages were lost or scrambled.  I'd see the middle of a paragraph at the end of one page, scroll to the beginning of the next page, and see some content that belonged much later in the book.  I'd click something to insert a note or edit a change, and it would freak out and put my cursor at the very top of the file; or just plain crash.  This process was much slower than it should have been.  I stand by my assertion that a word processing program is a terrible tool for writing a book.</p>

<p>But eventually, I got through it.  And then, after that, I was really done.  Right?  Eh&#8230; no.  At this point I got an actual schedule of the remaining steps.</p>

<ul>
	<li>Copyedit</li>
	<li>Copyedit review</li>
	<li>Enter Copyedits</li>
	<li>Conversion</li>
	<li>Source check</li>
	<li>Launch</li>
	<li>QC1/Proofread</li>
	<li>Indexing</li>
	<li>Input QC1 edits/Pagebreaking</li>
	<li>Back cover copy due to Production/Design</li>
	<li>QC2</li>
	<li>Input QC2 edits</li>
	<li>Index review</li>
	<li>Page estimate complete</li>
	<li>Final index complete</li>
	<li>Cover to printer</li>
	<li>OTD QC</li>
	<li>Book to printer</li>
	<li>Bound-book date</li>
	<li>In-stock date</li>
</ul>

<p>Not all of this was my job, but I had to be involved in a lot of it, and that happened within a few weeks.  Would you like to guess how many of these steps required me to do a lot of work?</p>

<p>Hint: I was sitting at my brother's college graduation reviewing the index to try not to slip the schedule again.  And I spent my weekends and evenings proofreading and making sure everything converted to the final page layout correctly.</p>

<p>Something else came in here.  The illustration artist didn't start to draw the figures until after the production copyedit and QC mentioned in the list above.  What that essentially meant is that unlike the text, the figures didn't get 10 or 15 rounds of revisions, comments, and reworking.  It was very much last-minute.  Fortunately, the artist was able to pull some really impressive work out of thin air.  Unfortunately, it meant one or two of the figures are not really that great -- at least by my standards -- even though they were really professionally drawn.  I mean, the content of the figures, not how they're drawn.  I'd like some of the figures to present the concepts more clearly.  I tried to use figures to show what text could not describe well; one or two of the figures could be better.  Alas.</p>

<h3>Scheduling and project management</h3>

<p>The schedule was never defined from the start, except for the unreachable goal of going to tech review in October.  Here's where I get a little unflattering.  I don't have any hard feelings, but I want to write about what went wrong.</p>

<p>I frequently asked people at O'Reilly to help me understand what would be involved in writing this book.  (This is why I'm writing this for you now -- in case no one will tell you, either).  It was as if they had never helped anyone write a book and had no idea themselves what it entailed.  As a result, I had no way to know what was realistic, and of course the schedule was a death march.  The deadlines slipped, and slipped and slipped.  To November, then December, then February -- and ultimately far beyond.  Each time the editor told me he thought we were on track to make the schedule.  Remember, I didn't know whether to believe this or not.  The amount of work involved shocked me time after time -- I thought I saw the light at the end of the tunnel and then discovered it was much farther away than I thought.</p>

<p>In all fairness, I think everyone was shocked, including the editor.  He had no idea the outline he saw was so rough (but he could have put more work into it and found out!).  As we got into it, the amount of information that needed to go into each little bullet point expanded from a paragraph to a page to a section.  The initial contract called for 384 pages; the book is over 700 pages (and we actually omitted quite a bit of stuff so we could finish the book).  In contrast, the first book was 236 pages I think.  We didn't know it was going to get this big.</p>

<p>Still, there was really a lot of room for improvement.  For example, I asked the editor to send the figures from chapter 2 to the artist in February.  And asked, and asked.  And it never happened, and ended up being a last minute job.  I asked, and asked, and asked for a counter-signed contract.  I finally got one about six months later, after asking maybe a dozen or 15 times.  Advances were late, too.  There were several instances of what looked like lack of project management from O'Reilly's side.  It seemed to me that the editor was heavily over-committed.  I tried to make up for it and do it myself, but you have to know what's involved in the project before you can manage.</p>

<p>On December 20th, the editor said "I want this book in production in early February."  On January 10th, "We should then be able to go to production late this month."  On January 17th, "We might not be able to get the book to the MySQL conference. I
pointed out that this is not a time of heavy work in production, but we're cutting it very close. But don't feel bad if the book doesn't come to the conference: it will be at Velocity which is directly related,  and at OSCon."</p>

<p>That was a complete surprise.  In the space of 7 days, the story turned around completely.  Then a few weeks later, we got an email that said O'Reilly were getting a bunch of titles into production that they didn't anticipate, and wouldn't be able to fit ours in until much later.  Seriously, how can you not anticipate titles coming to production, when they've been in progress for months or years?  That led me to believe that <strong>none</strong> of their titles had good project management.</p>

<p>Let me be clear: the publisher is not why the book didn't come out sooner.  A book is like a baby: it's done when it's done, and not before.  What I'm pointing out here is that at no point in the process did I have an idea how far from completion we were, despite a lot of effort to find out.</p>

<p>There were times when I told the editor basic things, like the page count so far, and he seemed completely surprised even though I kept a file with a table of chapters and page count, and sent email constantly about it.  Even in March I was getting emails that said "Because the page count is a little higher than we originally anticipated&#8230;" and then "You're right about page count! The copy-editor says the Word files come to 600 without preface, index, foreword, etc."  I don't know where all my emails were going -- it seemed like everything I told them went into /dev/null.  Their lack of knowledge about the book's status was not due to my lack of telling them.</p>

<p>Another thing that was frustrating was the process of choosing technical reviewers.  It was never clear whose responsibility this really was.  I thought (and still believe) it was the publisher's.  I asked about finding people pretty early on, but my question just kind of fell on the floor.  So I asked again, and again; I proposed a list of people; I asked the editor to contact them; I contacted them myself; nobody would decide which of the people were actually the ones we wanted to use; I finally made a decision and said "OK, these people X Y and Z are the ones I want."  And then I waited, and after a bit asked about progress, and back came the reply "maybe we should talk about who we should ask to be technical reviewers."  Pretty frustrating, but ultimately we did get chapters ready, so we had to send them to the reviewers.</p>

<p>And then the publisher sent the chapters off to the list of technical reviewers, but had apparently not really asked them if they would/could do the work.  One of them was upset, and wrote me to ask what was going on because he actually couldn't do it; he was too busy.  I ended up having to apologize to some of my friends because someone else didn't seem to have paid attention.  I've talked to other authors and they said their publisher had the technical reviewers lined up before the project even started, and they never had to think about it.  That was not the experience I had.</p>

<p>Back to the schedule: ultimately my attitude was that it takes the time it takes, and any predictions I got from O'Reilly were just guesses.  But it would have been nice to have had more guidance about what I was getting myself into.  That's what a publisher's experience and wisdom is for, right?</p>

<h3>How much time did it take?</h3>

<p>I used <a href="http://www.toggl.com/">Toggl</a> to keep track of the time I spent on the book.  I'd say I captured about 3/4 of the time I actually spent on it.  I tracked things by chapter.  I recorded just under 800 hours of work on the book; so make it at least 1000 hours to account for the time I didn't track correctly.  That's roughly equivalent to 6 months working on it full-time.  Here's a quick breakdown of the hours I actually recorded for each task/chapter:</p>

<pre>01 	27.83
02 	42.75
03 	84.28
04 	55.33
05 	69.42
06 	56.33
07 	36.67
08 	67.4
09 	48
10 	11.47
11 	64.22
12 	15.18
13 	30.07
14 	17.15
A 	0.97
B 	11.8
C 	11.67
D 	5
general 	143.22</pre>

<p>I did spend several months at half-time work on my regular job, so theoretically working at least 20 hours a week (but probably more like 50) on the book.  Otherwise, all of this time was spent on evenings and weekends.</p>

<p>It takes a lot of time, there's no escaping it.</p>

<p>A lot of things surprised me in this book.  For example, cross-references.  I tried and tried, but could not find a way to do them automatically.  Within a chapter, sure; but not between chapters.  (Did I ever mention that I wished I were writing in LaTeX?)  So this meant that I had to do a little system of putting a magic XREF word in the text, like this: "See Chapter 10 for more on this topic. (XREF: application optimization)."  Ultimately, nothing was automatically numbered or referenced; every cross-reference, figure, and table had to be checked manually.  And we re-numbered the chapters at some point, so it all had to be done again.  This was a lot of unnecessary work, but I didn't see a way around it; it was too late to fix it.</p>

<p>If you're thinking about writing a book, I'd suggest you spend some time visualizing how much time it's really going to take.  You can use my hours-per-page ratio as a rough guide if you wish, but realize that a) I'm not the only author, so this book was a lot more than just 1000 hours of work and b) I may be a faster writer than you are.  Unless you've written a book before, don't try to estimate on your gut feeling.  A 200-page book will take a lot more than twice as much as a 100-page.  There's a non-linear relationship between pages and work, and pages that are going into print are going to take a lot more work than your senior thesis or dissertation, believe me.  Anyway, however it works for you, try to get a sense of the hours it'll need.  Now mentally visualize where you're going to get those hours from.  Really, how much time do you think you can spend in evenings and weekends?  You still have to do all the ordinary things like paying bills and washing dishes, too.</p>

<p>Do you have a quiet place completely free from interruptions where you can work?  Don't be surprised if you lose 15 or 30 minutes of flow every time you're interrupted.  That seems like a lot, but if you're keeping a lot of stuff in your mental workspace, and someone calls or pops in to ask if you can help them with something, you might find yourself becoming extremely irritable and impatient -- I do anyway -- and that feeling itself is as much of a productivity killer as the interruption.  Know thyself, as they say.  Ultimately, I think your psychological makeup is a lot of what determines how fast you can write.</p>

<h3>So why did I do it?</h3>

<p>After all this work, I often joke, this book will probably make me <em>hundreds</em> of dollars.  I recently did some more rough calculations and found that it might pay back my royalty advances more quickly than I thought, but I'm still not going to make nearly enough money from royalties to make the time worthwhile, financially.  I think if you look at the time I spent, I am working for less than minimum wage.  However, it's not about getting rich or getting onto the New York Times best-seller list.</p>

<p>For me, this book was a chance to do something I love -- writing -- and share/teach what I know, which I think is a good thing to do.  It also got my foot in the door as an author, so to speak; if I want to write in the future, I'll know what it's about and I'll hopefully be able to make the process better for myself and negotiate more strongly in my favor.  It builds my personal brand, and may help drive some business to my consulting practice.  This is all theory, of course; the better the book sells, the more likely it is that these good things will come to pass.</p>

<p>These days, since I'm in high demand as a consultant, I also see the book as a way to help people help themselves.  There's way too much work to do, but people who buy and read the book will be able to get thousands of dollars' worth of advice for very little money.  In other words, it offers an alternative to people who have time but not money.  That lets me concentrate on helping the people who have money but not time.</p>

<h3>Conclusions</h3>

<p>This was a long, hard project that really opened my eyes to a lot of things.  I wasn't clueless about what I was getting into, but I still had unrealistic expectations. There were a lot of learning experiences I would not have predicted, many in the area of other people not conforming to my silly ideas of what they "ought" to do.  The process was rewarding, and I would do it again; but not right away.  The people who really took it on the chin were the ones I deprived of quality time, like my wife, family, and rock-climbing friends.  And my boss and co-workers.</p>

<p>The other major thing I wasn't prepared for was how much time it took.  Enough said.</p>

<p>If I write another book in the future, I think I'll be pretty well prepared for the process, and I'll try to make sure it's on my terms so I can be as productive as possible (e.g. no writing a book with a word processor).  I think this is reasonable because the author is doing the vast majority of the work, so the process should really favor the author.  Finally, I'll make sure responsibilities and schedules are clearly and appropriately laid out.  Not everything can be scheduled exactly, but at least I'll know what steps are involved, who is going to do them and when as much as possible (many steps can be scheduled relative to the completion of ambiguously scheduled things, such as "after the tech review revisions are committed, the editor will commit the edited result within 14 days"), and it'll be on paper with a signature at the bottom.</p>

<p>For those who are thinking about writing a book, I'd encourage you to do it.  I hope my thoughts are helpful to you and that your book turns out well.</p>

<h3>Postscript</h3>

<p>As it turns out, the book wasn't done when it was done.  What remains?  Errata, proofreading the printed copy so it can be tweaked in time for a second printing, and a lot of work to promote it.</p>
