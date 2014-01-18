---
title: An alternative to canonical URIs
date: "2006-06-02"
url: /blog/2006/06/02/an-alternative-to-canonical-uris/
categories:
  - Web
---
There's been much discussion about canonicalizing URIs for search engines and other purposes. Here's a possibility: instead of specifying the exact canonical URI for a page, just indicate which parts of it are important.

The issue usually comes up with regards to product pages in e-commerce, for example. Many e-commerce sites use query strings to specify the product to display. This is not a problem, because search engines like Google usually pay attention to several query string parameters. The problem comes when the e-commerce site starts adding other query string parameters onto the URI for session identifiers, tracking codes, navigational aids, and so forth. These are all important for site functionality, but seldom have much to do with the real content of the page. Search engine spiders don't like lots and lots of parameters, so they may only pay attention to the first few, causing problems for the e-commerce site.

That's where URI canonicalization strategies come into play. The usual strategy is to detect when a spider is requesting the page, and redirect it to the canonical version of the page, with only the relevant parameters in exactly the right order. This can require a lot of programming.

How about a META tag instead?

<pre>&lt;meta name="significant-query-params" content="itemno categoryno" /&gt;</pre>

Of course, search engines would have to agree upon this as a standard, but it seems reasonable to me. The search spider would then compare any query parameters to the significant ones, and ignore the page if it's already in the search cache.

I know it's more complex than this. I'm sure there are lots of issues that would make it harder for search engines to implement this scheme, and I can think of some right away (repeated parameters with different values, issues with how the cache is really structured, etc). I'm just tossing it out there for someone to mull upon it, if anyone wants to.

