---
title: Why you should take microformats seriously
date: "2006-08-30"
url: /blog/2006/08/30/why-you-should-take-microformats-seriously/
---
[Microformats][1] are getting some attention from the group of people who are clueful about the semantic web, but some people are not yet convinced they're useful. While microformats aren't as robust and complex as some more fully-featured technologies, some apparent limitations are actually possible to overcome, but with different methods than might be expected. In this article I'll address some common concerns about microformats, and explain how they are either solvable or already solved.

### The problem in a nutshell

The problem many see with microformats is they apparently don't identify themselves as such; they rely on conventions, which are not yet agreed-upon. To recognize a microformat, you might think that you have to look for some markup such as `<div class="bio vcard">`. That's not as formal as some standards, like XML, which require a DTD, a schema, or something equivalent (for the rest of this article, I'll just call it a doctype).

A doctype is important for several reasons. Lack of a doctype means microformats can't:

*   be discovered automatically
*   be validated automatically
*   be versioned

These could be show-stopping reasons not to use microformats for some applications. Fortunately, as I'll explain, microformats can have the equivalent of a doctype -- the mechanism is just a bit different from XML.

### But wait, there *are* specs, right?

Yes, there are [microformat specifications][1]. The people at microformats.org have done lots of hard work, but these specs are not doctypes. They lack

*   a formal grammar
*   a formal means of identifying and locating the grammar given an instance document
*   a formal means of identifying the very presence of a microformat in the instance document

I'm a purist. Maybe it's silly, but I've seen a lot of data, parsed a lot of data, done a lot of work with interoperability and interchange, and I've seen and used a lot of both good and bad data and programs to work with data. People like me are the reason many of the WC3 specs are so complicated. We want data that machines can know how to handle, automatically, without preconceived notions. The specifications at microformats.org explain things to humans, but that doesn't automatically make them usable as doctypes.

### What does "automatic" mean, and why do we need it?

It's relatively easy to write, for example, a [parser for hCards][2], because they're pretty simple. It's pretty easy to take such a parser and give it an XHTML document, and have it figure out whether there are any hCards in the document. So far, so good -- one goal of a doctype is achieved, without even needing a doctype.

However, this isn't everything a doctype gives you. In the example I just gave, the hCard parser has some things built into it. It knows what an hCard looks like, and it has the smarts to find one. In fact, it is built with a pre-conceived notion: "I am an hCard parser, and I look for hCards." Notice, "hCard parser," not "microformat parser." That's important. This is a "type one" parser (that's my own naming convention, which I'm inventing just for this article).

Imagine for a moment that I upgrade the hCard parser to a microformat parser. I can give it an instance document, and it can detect the presence of *any* microformat in the document, parse it, and deliver it to me -- suppose it's a C library and it delivers it to me as a struct of the appropriate type. Still not too hard to do, right? There are only a few different types of microformats as I write this -- fewer than twenty. The C library can certainly check for the presence of each. No big deal. Now I have a type two parser.

Now imagine that I have a microformat parser, *and it knows nothing about any specific type of microformat*, yet it can accept an instance document, find all microformats in it, and deliver them all to me in an appropriate struct. How can it do this? With a formal grammar, of course. That's what a doctype is for. My new microformat parser is not so much a microformat parser as it is a doctype interpreter. It reads a doctype, generates some way to recognize microformats, and then does it. This is a type three parser.

This third parser is infinitely more powerful than the second and first. From type one to two is really not much of a difference; it's just incremental enhancement. From two to three, though, is a quantum leap. Type three is a totally different animal. It's like the difference between writing functions in a procedural language, and writing lambda functions in a functional language (if you're curious about this, you may want to read about my [Javascript date functions][3]).

You cannot do this without a doctype.

### Isn't that too complicated?

That's a good question. I just said I'm a purist, and many W3C specs are written by purists too, but I'll be the first to say [SOAP][4] is way over-engineered (and [don't even mention all the WS-* specs][5]). On the other hand, the microformats folks are actually creating [highly complex specs][6], so maybe they're not really trying to avoid complex specs like SOAP and WS-*. In that case, the lack of a doctype could be seen as a serious imbalance -- all that complexity, and no doctype to show for it?

In my opinion, the microformat work is going in the right direction -- it just isn't at the stage where uber-formalism has set in, partly because microformats are not ubiquitously used yet. To create microformats, then [create uses for them and demonstrate their effectiveness and usefulness][7], is a very good idea, even if it can't all be as automated as I said above. I do *not* think microformat work should start with a committee, and produce a standard before anything else happens. That is an approach some have taken in the past, and it's flawed. Tim Bray says it well:

<blockquote cite="http://www.tbray.org/ongoing/When/200x/2004/09/18/WS-Oppo">
  <p>
    I'm deeply suspicious of 'standards' built by committees in advance of industry experience&#8230;
  </p>
</blockquote>

And Bruce Eckel:

<blockquote cite="http://www.artima.com/weblogs/viewpost.jsp?thread=165293">
  <p>
    A standards body should formalize existing practice, rather than inventing new practice without experience.
  </p>
</blockquote>

In any case, you could easily argue that doctypes for microformats are not the right thing to do, at least not yet. And I'd agree with you, but I'd also point out that many things doctypes enable are already possible with microformats -- you just have to do them a bit differently than you'd think, depending on your background.

### Who wants doctypes?

Lots of people, like [Steve Farrell][8], have raised these issues in conversations, on the web, and in mailing lists. In fact, a lot of the discussion has started since I started drafting this article about seven months ago. Unfortunately, there's some PR work to be done. Some discussions I see are sometimes phrased as a bolt-on solution, or a means of appeasing the purists, which defeats the point. And the existing solutions can be hard for experts in data interoperability to understand -- probably because of their expertise -- so they sometimes don't take them seriously enough, thinking the solutions are bolt-on, appease-the-purist jokes.

I hope people don't continue to be pessimistic about the future of microformats. Many standards have failed because of some show-stopping problem or other, sure, but the world hasn't ended. One excellent example is [the IPv6 mess][9]. Even if there are some shortcomings to microformats, whatever they are will be addressed somehow.

### To a man with a hammer&#8230;

Microformats are built on XHTML, and therefore XML, so there's a huge pre-existing toolset for addressing the requirement for a doctype. If you come from the XML world, as I do, your first thought might be "we need to use XML tools to solve this XML problem." And the first places you'd probably look are XML Schema and good old-fashioned DTDs. These have been proven over and over again, especially DTDs. Let me explain these a bit, and show you why they're not the solution for microformats.

XML itself, and DTDs, upon which XML is built, also provide methods for extending any document type. One is simply to redefine the DTD through extensions or referring to external DTDs. I'll give an example of this done brilliantly: [TEI, the Text Encoding Initiative][10]. Most web programmers, even those who are hip to the latest and greatest, have never heard of TEI, but behind the scenes, it's widely used in text encoding, and has been hugely successful; vast quantities of information have been marked up with MEI. For example, historians, librarians, and other academic types use it lots. And I do mean vast quantities, even on the scale of things *you* consider vast, whoever you are.

DTDs and XML Schema serve similar purposes, so I won't go into Schema, especially since XHTML is defined by a DTD, not an XML Schema instance. Both tools really do what I'm talking about -- doctypes. But we're talking about X**HTML** here. Yes, by its nature the X part of it is meant to be extensible, but in practice, web browsers do not read the XHTML doctype to tell them how to parse and render web pages. Web browsers are specialized parsers that know XHTML only. You can't just feed a browser some arbitrary XML, give it a doctype, and expect it to somehow render this. You also can't extend XHTML and expect browsers to continue parsing and rendering it correctly, because they are not "type three" parsers in my informal taxonomy. You need to work within the constraints of the technology's end users, and the place you have some degree of freedom is in the meta-data allowed in XHTML documents. I refer to the [`class` attribute][11], of course -- and remember, one of its official purposes is "general purpose processing by user agents." This is exactly where microformats are targeted.

Another tool is XML Namespaces, which are partially a formal means of doing what many web programmers try to do informally (using "semantic class names"). I suspect most web programmers don't know what XML Namespaces are, and probably many who do consider them black magic. There's definitely a steep learning curve, but they *do* make sense and are absolutely necessary, so I hope more web programmers will take the time to understand them. (By the way, XML Namespaces and namespaces for a variable in a programming language, for example JavaScript, are not the same thing; there's been lots of thought lately on scoping and namespaces in JavaScript libraries, but I don't want you to read this article and think you already know what XML Namespaces are just because you're a Prototype expert. It's totally different.)

Back to namespaces -- you might be inclined to define an XML Namespace for microformats, define them with that namespace, and think that somehow this provides what you need. Unfortunately, this will break things even worse than extending the XHTML DTD, because a `<div>` with a custom namespace is, to an XML parser, *totally unrelated to an XHTML `<div>`*. The fact that they happen to have the same element name is a coincidence, and an unhappy coincidence at that -- hence the need for a namespace to disambiguate and prevent name clashes. *That* is the problem XML Namespaces are designed to solve, not "semantic extensions" or some such. XML Namespaces gain you nothing here.

If you're an XML expert, I hope by this point I've convinced you that you need to put down your XML tools. Just because you have a hammer doesn't mean everything is a nail. By the way, I originally started drafting this article because I thought XML tools would be the solution, but I've changed my mind. It has been difficult for me to see and understand new ways of defining doctypes for microformats. Now you know why I've been drafting this for so long!

### So, what's the solution?

I think, but I'm not sure, the solution is [XHTML Meta Data Profiles (XMDP)][12].

It might look like a "hey, would this work?" idea got an acronym, and maybe that's true. I'm not really clear on where the [GMPG][13] work is going to end up, but at this point it looks more promising to me than anything else (digression: Their homepage sounds like an artist's statement. "&#8230;GMPG efforts provoke optimism and empowerment, nevertheless reawakening criticism of complexity&#8230;" Go read the whole thing. I still don't know whether it's a joke. If it's a joke, it's wicked funny. If they're serious, it's wicked funny).

Anyway, I want to mention some of the background for this idea of meta-data profiles. This is not something made up out of whole cloth. HTML has many un-explored possibilities. A famous one is the `class` attribute, which didn't get recognition as a meta-data container for a long time, and was just relegated to the role of CSS beast of burden. Similarly, HTML 4 defines the [`profile` attribute][14], which is -- like the mechanisms built into DTD and XML Schema -- a means of extending (X)HTML, *without changing or extending the doctype*. This is exactly what's needed for extensions like microformats, which embed documents within documents. The `profile` extension mechanism is a generic hook. When an HTML document defines a meta-data profile, it is really saying "hey, there's more you can find out about me. Go to such-and-such URI to learn more." And at the referenced URI can be a [meta-data definition][15], which is completely outside the scope of the HTML specification. This is important, because it means the HTML document's meaning can be extended arbitrarily, not just in the ways the HTML spec's authors might have foreseen.

This is the furthest thing from a bolt-on solution. If and when the microformat work progresses to the point it's needed, that's exactly how doctypes for microformats could be defined.

### How does this solve the problems?

Recall my three problems. I said doctypes are needed so microformats can:

*   be discovered automatically
*   be validated automatically
*   be versioned

If you haven't already, please go read the parts of the HTML spec I linked in the previous section. Then you will understand a great deal more.

Meta-data profiles already solve the problem of automatic discoverability, so the first point is taken care of. If someone creates doctypes for microformats, the second two can be addressed then. That's not to say they will be, or will be addressed adequately -- for instance, someone could create doctypes without a versioning mechanism, which would be an unfortunate oversight. But it can be done.

### Conclusion

There's no need to be pessimistic about microformats. Sure, not everything is formalized yet, but that's the way it should be! People are proving that microformats are useful before writing formal specs, which is a great thing. And when the formalities are needed, nothing stands in the way. It's just a question of when and how it happens, and who does it, and whether they do it well or not.

 [1]: http://microformats.org
 [2]: http://microformats.org/wiki/hcard-parsing
 [3]: http://www.xaprb.com/blog/2006/05/14/javascript-date-formatting-benchmarks/
 [4]: http://www.w3.org/TR/soap/
 [5]: http://www.tbray.org/ongoing/When/200x/2004/09/18/WS-Oppo
 [6]: http://microformats.org/wiki/hcard
 [7]: http://ylocalblog.com/blog/2006/06/21/we-now-support-microformats/
 [8]: http://smackman.com/2006/06/01/an-old-idea/
 [9]: http://cr.yp.to/djbdns/ipv6mess.html
 [10]: http://www.tei-c.org/
 [11]: http://www.w3.org/TR/html4/struct/global.html#adef-class
 [12]: http://www.gmpg.org/xmdp/
 [13]: http://www.gmpg.org/
 [14]: http://www.w3.org/TR/1999/REC-html401-19991224/struct/global.html#profiles
 [15]: http://www.w3.org/TR/1999/REC-html401-19991224/struct/global.html#meta-data

 *[XML]: Extensible Markup Language
 *[DTD]: Document Type Definition
 *[SOAP]: Simple Object Access Protocol
 *[XHTML]: Extensible Hypertext Markup Language
 *[TEI]: Text Encoding Initiative
