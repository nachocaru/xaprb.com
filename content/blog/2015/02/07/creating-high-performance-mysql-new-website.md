---
title: "Making High Performance MySQL's New Website"
date: "2015-02-07"
categories:
  - Writing
---

![HPM Cover](/media/2015/02/hpm-cover-perspective.png)

I recently updated the [High Performance MySQL](http://www.highperfmysql.com)
website to modernize it. I am impressed at how easy it is these days to get a
great little brochure site hosted. It used to be a lot more work. I used a
variety of tools and services to do this and decided to share this for people
who are interested. Hopefully you'll add comments and point me towards more
tools and tips to make these things even easier for me in the future!

<!--more-->

### Before

The website used to be a WordPress blog. This used to be my go-to solution for
everything. It used to be the easiest way to whip together something quickly and
put it online.

But WordPress sites have a bunch of problems.

* They need a database. Database down, website down.
* They need care and feeding. WordPress is a major hack target and you have to
  update it or you're going to end up serving malware and ads without knowing
  it. You also have to update the plugins and themes. It's just a lot of hassle.
* They're not high performance, primarily because of the dynamic content.

I just can't make time to babysit sites like this anymore.
As a result I've been moving everything to good old static sites again. 
Static sites used to be a lot of work too. Not anymore.

### Static Site Generators

Static site generators like [Jekyll](http://jekyllrb.com/) are a whole new world
of writing ease. Write Markdown, run the generator, get a static site fully
rendered. It's great. Jekyll, though, still has some annoyances. It requires a
lot of dependencies (my nemesis is `bundle install`... I hate how often that
breaks and takes a long time to work around for whatever version of Ruby gems
and dependencies and compilers and stuff are involved) and Jekyll itself isn't
really a site, it's just the scaffolding for a site.

I use [Hugo](http://gohugo.io/) for this site because of the amount and
complexity of content on it. Hugo is nicer than Jekyll in my opinion, much
better actually. But for a site like High Performance MySQL, a one-page brochure
is really what's needed. For that, a simple static `index.html` is better. No
need for a site generator.

### Bootstrap and Bootstrap Themes

Probably the biggest part of making a site these days is creating a good design
that will look good on everything from a desktop browser to an old iPhone.
[Twitter Bootstrap](http://getbootstrap.com/) provides a foundation for doing a
lot of that. It's an amazing advancement over the bad old days.

Combine that with thousands of freely available designs/themes based on
Bootstrap, and you have lots of great options for a brochure site. For this
site, I chose the
[Pratt](http://www.blacktie.co/2013/10/pratt-app-landing-page/) theme from
[BlackTie](http://www.blacktie.co/about/). Thanks, Carlos! If you need a custom
theme, Carlos does freelance work too.

![Pratt](/media/2015/02/pratt-copia.png)

### Hosting On GitHub Pages

I'd say "GitHub Pages is the best-kept secret", but it's not really a secret
anymore among the people likely to be reading this blog. If you're not familiar
with GitHub Pages, you should really look into it. It's easily the best way to
host small sites these days. Anything that doesn't need to be highly dynamic,
and doesn't need HTTPS access, is a great fit. Even things like blogs that need
commenting functionality can work great this way. What you get is free, *fast*
hosting with a built-in CDN, and everything's taken care of for you. You can use
Gist to host your source code examples and snippets nicely. And
maintaining and publishing the site just couldn't be much easier, since GitHub
hosts the source code, issues, and so on for free as well. [Learn more about
GitHub pages](https://pages.github.com/).

### A Splash of Panache

The cover image you saw at the top of this post adds a dash of visual flair. If
you produce any content and want it to be more attractive and desirable, such as
ebooks or tutorials, an eye-catching cover image makes all the difference. If
you have a flat image of the cover, though, how do you turn it into something
more visually appealing? How do you do this?

![HPM Rendered](/media/2015/02/hpm-rendering.png)

I have access to Photoshop, and I found a great set of ready-made Photoshop
actions to do this. The site is called [PSD Covers](http://www.psdcovers.com/)
and it contains an action that's ready to use for practically any kind of cover
you can dream up. One caveat, it didn't initially work well for me due to a bug
in Photoshop CC 2014, but the
[workaround](http://www.psdcovers.com/photoshop-cc-2014-1-0-canvas-dpi-bug/) is
easy. I used the [Softcover Handbook](http://www.psdcovers.com/softcover019/)
action. Thanks very much to Simon Lord for sharing this great set of resources
freely.

### Making The Image Smaller

Whenever I use an image like the above of the book cover, I tend to run it
through [TinyPNG](http://tinypng.com/). I often reduce images to just 10% or 20%
of their original size with this great resource. This makes it a lot more
feasible to include high-resolution versions of such images so they'll look
really sharp on devices with very high-resolution screens, like a 
Retina or better Apple device, or even my own favorite Android tablet, the [B&N
Nook
HD+](/blog/2015/01/19/install-cyanogenmod-nook-hdplus/).
If you have a JPEG image, there's a [TinyJPEG](https://tinyjpg.com/) site too.
The resulting hi-res images look great and download fast.

### Writing The Content

This is the easy and fun part for me, because I like to write. In this case, I
mostly just copy-pasted the content off the old Wordpress site, and then
massaged it a bit. I did discard all of the old blog posts that used to exist on
that site, but I don't think anyone cares. It never should have been a "blog" to
begin with; a single-page brochureware site is all that's necessary.
