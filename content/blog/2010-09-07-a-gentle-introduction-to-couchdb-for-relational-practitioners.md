---
title: A gentle introduction to CouchDB for relational practitioners
author: Baron Schwartz
layout: post
permalink: /2010/09/07/a-gentle-introduction-to-couchdb-for-relational-practitioners/
categories:
  - CouchDB
  - SQL
tags:
  - NoSQL
---
CouchDB is a document-oriented database written in Erlang that addresses a particular "sweet spot" in data storage and retrieval needs. This blog post is an introduction to CouchDB for those of us who have a relational database background.

A CouchDB database doesn't have tables. It has a collection of documents, stored in a B+Tree. A document is a collection of attributes and values. Values can be atomic, or complex nested structures such as arrays and sub-documents. When you add a document to a database, CouchDB stores it in the B+Tree, indexed by two attributes with special meaning: \_id and \_rev.

CouchDB lets you store related data together even if it isn't all the same type of data; you can store documents representing blog posts, users, and comments &#8212; all in the same database. This is not as chaotic as it sounds. To get your data back out of CouchDB in sensible ways, you define views over the database. A view stores a subset of the database's documents. You can think of them as materialized partial indexes. You can create a view of blog posts, and a view of comments, and so on. Each view is another B+Tree. It stays up-to-date with the changes you make to the database.

You can structure your documents any way you want. There is no fixed schema. If you decide after a while that you want to add tags to your blog posts, you can simply write new posts with a collection of tags and save them into the database. Old posts won't have tags, but that's OK; if your application code can read the old format and write the new format, you have an application that doesn't need a fixed schema.

Updates are never done in-place. Everything is copy-on-write. New revisions are saved into the database as new documents, obsoleting old ones, and CouchDB increments the \_rev property each time. To update a document, you fetch it, change it, and send it back, specifying the \_id and the most recent \_rev. If someone else changed the document in the meantime, your \_rev is stale, and your update fails. You must re-fetch and re-save; you can't lock a document.
CouchDB runs on HTTP and JSON. All of its operations, such as store and retrieve, are standard HTTP requests. The documents themselves are represented in JSON. You can talk directly to CouchDB with curl, Ajax, and anything else that can speak HTTP. There is no "protocol" other than this. CouchDB isn't just Web-friendly, it is actually made of the same technologies that the Web is made of. You query CouchDB by specifying the database, document ID, view name, and so forth directly in the URL. For example, to fetch a blog post document from the "blog" database, you might issue a `GET /blog/helloworld`. Queries against views and other objects have simple clean URLs, too.

CouchDB uses special documents, called "design documents," to store JavaScript code in the database. The code defines the views I mentioned earlier. Another thing you can store is validation functions. This is code that CouchDB executes when you save a document to the database. It accepts a document as input, and can reject it, so you do have control over the schema of documents &#8212; it doesn't have to be a free-for-all. In the blog application, you can have a validation function that starts by enforcing "every document must have a 'type' property, and its content must be one of (post,user,comment)." Then you can have separate validation logic for each type of document.

Design documents can also contain something called "show functions." CouchDB will execute the function's code in response to HTTP requests to that URL, and send the resulting data back as an HTTP response (as usual). With show functions, you can store entire applications inside the database. Your browser might never even know that it's talking to a database directly, instead of a web server with a database behind it.

CouchDB isn't designed for arbitrary queries at runtime. You can only query one view, show function, or database at a time. You can't do joins. You can't do arbitrary GROUP BY and ORDER BY. You have to decide in advance what operations you're going to need, and build views for them. You can then issue requests to those views, essentially the equivalent of key lookups and range scans with a few basic options such as an offset, limit, and reverse order. Now, having said that, you *can* define views that reduce the database down to aggregates, create a custom ordering, and so on. You *can* define the equivalent of the relational "project" operation inside your view code.

Here's how: a view is a map-reduce operation. A view is defined in two parts, the map and the reduce. The map is not optional; it generates the contents of the view. It is a JavaScript function. CouchDB iterates over the database and feeds each document into the function, collects the results, and inserts them into the view's B+Tree index. Inside the view function's code, you emit key-value 2-tuples.

*   The key will identify the tuple in the index that's built to store this view. It can be simple or complex, so you can create a view that's keyed by [this,that,the\_other\_thing]. The view will be ordered by the same thing; that's how B+Trees work.
*   The value you emit is whatever you want the B+Tree to store at its leaf nodes, and can also be complex (it's a document, like any other).

The "reduce" part of the operation is optional. It computes what is stored in the non-leaf nodes of the B+Tree index. For example, you can use it to create aggregates, such as summing up counts of comments. In addition to the reduce part of the code, there is a "rereduce". The rereduce is called as the operation is invoked on higher and higher non-leaf nodes, all the way to the root of the tree. CouchDB knows how to take advantage of the data that's stored by these reduce and rereduce operations, so for example, it doesn't necessarily have to descend all the way to the leaf nodes and scan in order to count how many documents match a particular query.

An important thing to know about all this code is that nothing is allowed to have side effects. You can't modify the database in a view definition, for example. Documents are immutable; it's all copy-on-write. You get input; you can specify output; that's it, period. It's a form of functional programming. Why do we care? Because it keeps things simple and elegant, and enables all kinds of nice properties and functionality, such as replication and eventual consistency and cache expiry and scaling to multiple nodes and so on.

The database file is append-only. Old versions don't automatically get cleaned up. The database grows forever until you compact it. This process builds a new database and then does a swap-and-discard. The append-only, copy-on-write design makes backups easy, and data corruption unlikely.

CouchDB comes with a "graphical user interface" called Futon. It's built right into the database, and surprise! &#8212; it works through HTTP and Ajax. You just fire up CouchDB, point your Web browser to /_utils, and go. It's a fun way to explore CouchDB.

With all that in mind, why would you want to use CouchDB instead of a relational database? For most things I'm involved with, I want a relational database. But I got asked recently to help with a database that'll store records about people. Although nobody has implemented anything yet, it's a terrible match for a relational database, and an excellent fit for a document-oriented one. The inputs are going to be arbitrary documents with different structures, such as census records, birth records, tax records, estate and probate records, marriage records, and so on. Nobody knows what it's going to store in the future. When people build "flexible schemas" in relational databases, they usually go for the so-called EAV or EBLOB models. In other words, they aren't using the database relationally at all, and it simply doesn't work well. This type of project needs a document-oriented database.

I've left out a lot of important details, but the point of this post is to understand the high-level CouchDB concepts and how they're implemented, so you can reason for yourself about it. If you've read this far and you think that CouchDB might be a good fit for your needs, I encourage you to take a look at [CouchDB, The Definitive Guide][1].

**Update:** CouchOne adapted the above post as a [white paper][2] and [guest-posted it on their own blog][3].

 [1]: http://www.amazon.com/dp/0596155891/?tag=xaprb-20
 [2]: http://www.couchone.com/gentle-introduction
 [3]: http://blog.couchone.com/post/1167966323/a-gentle-introduction-to-couchdb-for-relational
