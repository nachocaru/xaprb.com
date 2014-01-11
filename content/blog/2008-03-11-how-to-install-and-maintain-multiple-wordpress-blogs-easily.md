---
title: How to install and maintain multiple WordPress blogs easily
author: Baron Schwartz
excerpt: |
  <p>My wife has a site that needs two WordPress blog installations.  The URLs differ by a subdirectory name.  Both blogs need to be (URL-wise) subdirectories of /blog/.  They need to be completely independent of each other, yet use the same custom theme.  And there used to be just a single blog, which was <em>not</em> in a subdirectory; its permalinks must not break.  (It has nice URLs with the date and title in them, not post ID-style URLs).  And because I'm the husband, I get to maintain it, so tack "easy to maintain" onto the requirements  (it must be easy to upgrade WP in both blogs, for example).  In this article I'll show you how I did it with a single .htaccess file, a single copy of WordPress, two MySQL databases, and a single configuration file.</p>
layout: post
permalink: /2008/03/11/how-to-install-and-maintain-multiple-wordpress-blogs-easily/
description:
  - Multiple WordPress blogs made easy, with backwards compatibility built in.
tags:
  - Apache
  - htaccess
  - mod_rewrite
  - WordPress
---
My wife has a site that needs two WordPress blog installations. The URLs differ by a subdirectory name. Both blogs need to be (URL-wise) subdirectories of /blog/. They need to be completely independent of each other, yet use the same custom theme. And there used to be just a single blog, which was *not* in a subdirectory; its permalinks must not break. (It has nice URLs with the date and title in them, not post ID-style URLs). And because I'm the husband, I get to maintain it, so tack "easy to maintain" onto the requirements (it must be easy to upgrade WP in both blogs, for example). In this article I'll show you how I did it with a single .htaccess file, a single copy of WordPress, two MySQL databases, and a single configuration file.

### Fixing URLs

As I mentioned, there used to be a blog at /blog/ which must not break. Suppose this blog was about dogs and my wife has recently started blogging about cats. She wants two completely independent blogs: /blog/dogs/ and /blog/cats/. Now the old permalinks structure, e.g. /blog/2006/03/01/dogs-are-great/, must redirect to /blog/**dogs/**2006/03/01/dogs-are-great/. How to do this?

I'm not a mod_rewrite wizard, but I figured there must be a way. And indeed there is: if an incoming URL doesn't contain dogs or cats, it can be rewritten and redirected to the new URL. Here's the code, which goes in /blog/.htaccess:

<pre>RewriteBase /blog/
RewriteCond %{REQUEST_URI} !dogs|cats
RewriteRule ^(.*)$ http://www.furryfriends.org/blog/dogs/$1 [R]
</pre>

(By the way, the furryfriends thing is just an example, not the real site name).

So far, so good. That works just fine: when I access a URL without dogs or cats in it, it redirects me. But I need to do more: I need rewrite rules to match the date-and-title permalinks both blogs will use. I accomplish that like so:

<pre>RewriteCond %{REQUEST_URI} dogs|cats
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (dogs|cats) /blog/$1/index.php [L]
</pre>

This is basically the same thing WordPress usually does, but I've made it tolerate either dogs or cats and figure out which installation should get the request. The .htaccess file lives in /blog/, not inside /dogs/ or /cats/ where it would be hard to maintain (it would get wiped out with upgrades). I can see different ways of doing this, but this is the way I chose. So here's the whole file:

<pre>&lt;IfModule mod_rewrite.c>
RewriteEngine On

# Anything to the old address (e.g. /blog/foo/bar) goes to the new address
# (e.g. /blog/dogs/foo/bar)
RewriteBase /blog/
RewriteCond %{REQUEST_URI} !dogs|cats
RewriteRule ^(.*)$ http://www.furryfriends.org/blog/dogs/$1 [R]

# If that fired, then we didn't reach this code.  If we did, then this rule
# should do what a normal WP rule does.
RewriteCond %{REQUEST_URI} dogs|cats
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (dogs|cats) /blog/$1/index.php [L]
&lt;/IfModule>
</pre>

Are there any better ways of doing this? I'm curious. Leave a comment if you know of one.

### Fixing the maintenance headache

Installing two copies of WordPress, then customizing both is a pain. And it makes upgrades harder, too. I'd have to upgrade them both, fiddle with plugins (some of them are customized, too) etc etc. Even backups would be more complicated. It would be all too easy to screw up and delete some data. There are just so many ways this is a bad idea.

It occurred to me that I could use a single copy and turn the dogs/ and cats/ subdirectories in the filesystem into symbolic links. (Windows users, you can stop reading now: this won't work for you).

To make the blogs, the WordPress installation, and the custom blog theme all independent of each other, I created the following filesystem hierarchy:

<pre>blog/
   wordpress/
      2.3.2/
         [The usual WP files are here]
      wp_content/
         plugins/
         uploads/
         themes/
            my_custom_theme/
</pre>

What I've done is separate the custom bits &#8212; the parts that don't ship with WordPress &#8212; away from the files I want to upgrade when I upgrade WordPress. How will this work, though?

I'll make symbolic links from the dogs/ and cats/ directories to the currently installed version of WordPress. So, from the root directory of the website, I type the following at the command line:

<pre>$ ln -s wordpress/2.3.2/ dogs
$ ln -s wordpress/2.3.2/ cats
$ cd wordpress/2.3.2/
$ rm -rf wp-content/
$ ln -s ../wp-content wp-content
</pre>

The directory hierarchy now looks like this: 
<pre>blog/
   cats/ -&gt; wordpress/
   dogs/ -&gt; wordpress/
   wordpress/
      2.3.2/
         [The usual WP files are here]
         wp-content/ -&gt; ../wp-content
      wp_content/
         plugins/
         uploads/
         themes/
            my_custom_theme/
</pre>

This is looking pretty good! There's only one minor detail missing: because both blogs are running literally the same code via the magic of symlinks, each blog is trying to access the same database tables. I need to customize the WordPress configuration file, too. I'll just give each installation a different table name prefix in wp-config.php: 
<pre>$table_prefix  = strpos($_SERVER['REQUEST_URI'], 'blog/cats/') ? 'wp_cats_' : 'wp_dogs';
</pre>

And voila, it works perfectly now. I accessed the two URLs, ran through the installation procedure twice, and have two completely independent blogs running the same code in the same database.

### The upgrade procedure

So, this is all a little complicated, right? What if I've forgotten how I did it when I upgrade next time, or what if someone else does it instead of me? I wrote myself a little README file to fix this. Here's what it says:

<pre>This is how to upgrade Lynn's blog.

The two blogs are actually using shared files, which are symlinked to make
it so there is only one copy of files.  You can't change the files in one
without changing them in the other.

The wp-content subdirectory is symlinked.

The wp-config file is customized so it will work in either blog:

$table_prefix  = strpos($_SERVER['REQUEST_URI'], 'blog/cats/') ? 'wp_cats_' : 'wp_dogs';

To upgrade, 

 1. Download the latest version and unpack it inside wordpress/ as 2.3.2/
    or whatever version it is.
 2. Then go into that directory.
 3. Remove the wp-content/ directory completely.
 4. Then symlink it like this: ln -s ../wp-content wp-content
 5. Now re-customize wp-config.php
 6. Go back to the blog/ directory.  rm dogs cats
 7. ln -s wordpress/2.3.2/ dogs
 8. ln -s wordpress/2.3.2/ cats
</pre>

It's still a manual process, but it should take me all of thirty seconds. I'm okay with that. As long as I remember there's a README file, that is!
