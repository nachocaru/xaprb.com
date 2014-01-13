---
title: Review of Pro Nagios 2.0 and Nagios System and Network Monitoring
date: "2007-02-14"
url: /blog/2007/02/14/review-of-pro-nagios-20-and-nagios-system-and-network-monitoring/
---
Last week I read two books on Nagios. I found one easy to use and the other difficult.

### The books

[<img src="/articles/images/nagios_cov.jpg" width="125" height="165" alt="Cover of Nagios System and Network Monitoring" style="float:left; padding:5px" />][1][Nagios System and Network Monitoring (Wolfgang Barth, No Starch Press, 2006)][1] is a delight. It explained Nagios briefly and clearly, showed me how to get it running, and continues to be a useful reference. I rate it 4 out of 5 stars.

<p style="clear:left">
  <a href="http://www.amazon.com/gp/product/1590596099?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1590596099"><img src="/articles/images/pro-nagios.gif" style="float:left; padding:5px" alt="Cover of Pro Nagios 2.0" width="125" height="168" /></a><a href="http://www.amazon.com/gp/product/1590596099?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1590596099">Pro Nagios 2.0 (James Turnbull, Apress, 2006)</a> is hard for me to read, understand and use. Mr. Turnbull is clearly an expert on Nagios, but the book doesn't communicate his knowledge effectively. I give it two stars.
</p>

<p style="clear:left">
  Despite the differences, the books are identical in many ways. Both have chapters on the same topics. They cover exactly the same subject matter in the same level of detail, have the same target audiences, were written about the same time, are about the same size, and so on. The differences are in organization and writing style.
</p>

Mr. Barth's book lets me do a breadth-first search of the subject matter, and Mr. Turnbull's makes me do a depth-first search. Breadth-first is a better way to learn a topic like Nagios.

### Pro Nagios 2.0 (James Turnbull)

I read James Turnbull's Pro Nagios 2.0 first. I brought it home for the weekend, and read past page 200 -- more than half the book -- but I did not learn much about Nagios. Here's why I found it hard to use:

*   It explains difficult concepts abstractly. Here are some of the first sentences from Chapter 2&#8242;s introductory paragraph:
    
    > You do this by defining a series of objects that represent the characteristics of the environment being monitored. You begin by defining your assets to the Nagios server. Nagios calls them *hosts*. Then you define the attributes and functions of these assets&#8230;
    
    The book would have been clearer if it used the concrete Nagios metaphors (hosts, services, contacts), but it describes many things in object-oriented programming terms.

*   It's hard to skim because it's organized depth-first. It usually begins a topic with a few sentences, then interrupts with a tip, note or caution. Then the text resumes with specific details, and demonstrates them with code, usually a configuration sample or a shell script.
    
    There are few unbroken paragraphs of prose. This makes it hard to scan for headings, because they don't stand out visually.

*   It puts unimportant material before important topics, but you don't know that in advance. Here's an example: if a service is okay, Nagios assumes the service's host is too, so it's generally unnecessary to monitor hosts. Turnbull writes about how to monitor the hosts in detail *before* saying it's not important -- for instance, beginning on page 39; then on page 42 he writes, "Remember: don't schedule regular checks of your hosts!" Again in the beginning of Chapter 5, "Monitoring Hosts and Services," the section on hosts is before the section on services.

*   Its confusing sentences and passive voice make it hard to understand. For instance,
    
    > These directives can either be unique to the type of object being defined -- for example, a host object has a directive that defines its address, or generic and applicable to a number of object definitions.
    
    This confuses me because I can't immediately find the "or" that should correspond to the "either," and when I do it seems to go with the "for example," where it makes no sense.

*   It's too verbose, often using a paragraph when a few words would be clearer. Here is an example from page 37:
    
    > Table 2-2 contains four columns. The first two columns indicate the directive name and description. The third and fourth columns indicate if the directive's value can be used as a macro and whether it is mandatory to the object definition. An object definition must have all the required mandatory directives included in the definition to be valid. An invalid object definition will result in Nagios failing to start. I'll discuss macros in a bit and in the "Defining Commands" section later in this chapter.
    
    I can count the columns myself, so I don't need the first sentence, and the columns have headings, so I don't need the next two either. The fourth is redundant both to the column headings and to itself. The fifth is in the passive voice, and the sixth is a forward reference. The paragraph's essence is "Nagios will not start if you omit a mandatory directive," which states the obvious. I'd delete the whole paragraph.

*   It's self-contradictory. For example, on page 44 the book shows how to enable "freshness" checks:
    
    > In order to enable freshness checking, there are some other directives in the main nagios.cfg file that also need to be set. These control freshness checks for hosts. I've listed these directives in Example 2-8.
    > 
    > **Example 2-8.** The nagios.cfg Freshness Items
    > 
    > `check_host_freshness=0<br />
host_freshness_check_interval=60`
    
    This talks about *enabling* freshness checks and then shows the configuration setting that *disables* them. It makes me backtrack to be sure I read it right. This happens fairly often.

*   It interrupts with frequent references, which rarely have page or chapter numbers with them and usually introduce repeated material. Since they don't have page numbers, you can't find where they refer to; in one case I couldn't find a reference even after looking for quite a while and consulting the index. Again, it's hard to locate sections by scanning for headings, so the lack of page numbers makes the references nearly useless. Forward references are especially distracting.
*   It over-uses Note, Tip, and Caution sections. Chapter 2 has at least 47 of them in 52 pages, and there are seven in pages 220-223. They are highlighted with whitespace and two horizontal rules that span the page from edge to edge, so they're very intrusive. Some examples: on page 59, while explaining equations that control a scheduling algorithm, a note says "`ceil` indicates that you need to round up the result to the nearest integer." And on page 221, while discussing third-party tools, a note says "The NAN client and daemon are written in Perl," which is irrelevant. Some of these would have been okay as footnotes, but many should have been omitted.

After a while I tried to skim through and read the book at a higher level, but I found it very difficult.

It's not impossible to use, and I don't mean to criticize too much. For example, once I was familiar with Nagios I found it useful for reference a few times. If you know what you want to find, it's easy to navigate the book with the table of contents or the index (though the index doesn't seem to be complete). I remembered seeing something about how to organize configuration files in various ways, and I referred back to that since Mr. Barth's book didn't mention it. This discussion, on pages 32-35, helped me think about how to arrange configuration files into subdirectories with the `cfg_dir` directive.

On the whole, I found the book a poor introduction to Nagios.

### Nagios System and Network Monitoring (Wolfgang Barth)

Mr. Barth's book succeeds through clarity, organization, detail, and ease of use. His first language is apparently German, so his English is not always elegant, but it is concise and communicates his knowledge of Nagios well.

The best thing about the book is the organization. The first part, "From Source Code to a Running Installation," is three compact chapters on everything you need to get Nagios working. The first chapter is about compiling, installing, and basic web interface configuration. The second is an overview of general Nagios configuration -- the stuff you need to actually monitor things. The third is about checking your configuration and starting Nagios.

By page 55 I understood more about Nagios than I was able to glean from Pro Nagios 2.0. When I finished the first three chapters, I had Nagios running and monitoring itself.

The second part is called "In More Detail," and it was very helpful while I configured Nagios to monitor other servers. It was a useful reference when I looked up specific topics, and easy to skim for important instructions and pitfalls. The good introductory sentences make it easy to decide whether I need to read a section, and the uninterrupted text makes it easy to skip if I don't. Large blocks of text make headings stand out, so there's less need to use the table of contents. References have page numbers.

There are few footnotes, and no interruptions in the text. When there are configuration examples, the book shows the whole configuration definition for context, but makes the relevant parts bold, so they're easy to see. There are lots of diagrams, which clearly show concepts that would require hundreds of words to explain. Captions are in the margins so they don't interrupt the text.

I could go on, but suffice to say it's a delight to read and use this book.

On the downside, I dislike the typeface the Barth book uses. Though I'm no expert on typefaces, I think it has a hard-on-the-eyes combination of shapes, heavy line-weights in odd places, and internal white-space. The typeface is sans-serif, so the letters are harder to recognize; for example, the "c" looks a lot like the "e." It is difficult to speed-read. On the other hand, the text is fully justified and hyphenated (the publisher told me he believes it was typeset with LaTeX, which explains a lot -- I love LaTeX). This makes it easier to read than Apress's standard ragged-right typesetting.

### The difference between the books

Let me show you the differences between the two books by comparing how they explain "flapping," a Nagios feature to prevent a flood of notifications from services that are cycling between states.

The earliest index entry for flapping in the Turnbull book is on page 47. On pages 47 and 48, Turnbull explains the algorithm in detail:

> So how does Nagios determine if a host or service is flapping? When you enable flap detection, Nagios keeps a record of the last 21 states of the host or service in an array. It then counts the number of times the states in the array have changed. This is calculated as a percentage. For example, with 21 states recorded we have a possible 20 state changes. For a normal-behaving host or service, it may be that the last recorded 21 states were OK. Hence, the percentage of states change is 0 percent. If, however, during the last 21 recorded states the host or service changed state 9 times, then the percentage of state change is 45 percent. But there is another added layer of complexity in this calculation. The states in this array are weighted -- the newest state is considered 50 percent more important than the oldest state. This is because Nagios considers that the newer states are more indicative of the current behavior of the host or service than the older states.

Compare those 175 words to page 219 in the Barth book:

> If a regular test shows that service or computer is changing its data continuously, this is called *flapping* in Nagios.

The Barth book says no more on the topic, but refers interested readers to the appendix on page 401, where it explains flapping with a nice diagram.

This illustrates the major differences between the books:

1.  The Barth book tells you where to learn more, if you want to know. The Turnbull book practically forces you to read through irrelevant details.
2.  The Barth book presents minor concepts like flapping later in the book (page 219 and 401). The Turnbull book puts the trivia in the beginning (page 47).
3.  The Barth book uses a dozen or so words, or a diagram. The Turnbull book uses hundreds of words instead.

### Summary

I like Wolfgang Barth's [Nagios System and Network Monitoring][1] better than James Turnbull's [Pro Nagios 2.0][2].

[Subscribe][3] to get my future articles conveniently delivered to you via email or feeds.

 [1]: http://www.amazon.com/gp/product/1593270704?ie=UTF8&#038;tag=xaprb-20&#038;linkCode=as2&#038;camp=1789&#038;creative=9325&#038;creativeASIN=1593270704
 [2]: http://www.amazon.com/gp/product/1590596099?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=1590596099
 [3]: http://www.xaprb.com/blog/subscribe/
