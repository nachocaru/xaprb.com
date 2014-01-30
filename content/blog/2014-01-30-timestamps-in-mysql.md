---
title: "A simple rule for sane timestamps in MySQL"
date: "2014-01-30"
url: /blog/2014/01/30/timestamps-in-mysql/
categories:
  - Databases
---
Do you store date or time values in MySQL?

Would you like to know how to avoid many possible types of pain,
most of which you cannot even begin to imagine until you
experience them in really fun ways?

Then this blog post is for you. Here is a complete set of rules for how you can
avoid aforementioned pain:

1. All date and time columns shall be `INT UNSIGNED NOT NULL`, and shall store
	a Unix timestamp in UTC.

Enjoy all the spare time you'll have to do actually useful things as a result.
