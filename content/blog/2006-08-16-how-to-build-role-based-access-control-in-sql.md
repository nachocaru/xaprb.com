---
title: How to build role-based access control in SQL
date: "2006-08-16"
url: /blog/2006/08/16/how-to-build-role-based-access-control-in-sql/
categories:
  - Databases
---
The posts I've been reading and writing recently have reminded me how Object-Relational Mapping (ORM) systems make it fun and convenient to interact with databases. For some of the reasons they're a developer's favorite, they can be a database administrator's nightmare (think surrogate keys). But designing tables with a consistent set of columns has its benefits. Just because the columns are meta-data that have no intrinsic **meaning** doesn't mean they have no **value**. In this series of articles I'll show you several ways to use such "meaningless" meta-data to enable powerful, efficient application-level role-based access control (RBAC) in the database, with a focus on web applications, though you could do this for any application.

The systems I've built are complex, so I'll split this into at least two articles. This first article will discuss other privilege systems I've seen in web applications, including Access Control Lists (ACL), and introduce a simplified row-only version of the privilege system I currently use. The second article will discuss the full scope of my current system, which is much more complex and powerful. Along the way I'll explain how to add or remove features and complexity, to achieve the right balance of control and simplicity for your application.

My goal is to explain the systems I've built so you can design your own, without taking years to learn how, as I did. I will present sample schemas and functional queries.

### Introduction

When people think of privilege systems, if they've been around computers and worked with security for a while, they typically think first of [Access Control Lists][1]. This is one of those concepts that means different things to different people. While there are some standards, not everyone agrees on them, and ideas about what ACLs really are and how they should work vary widely.

This article is about a tabular ACL implemented in a database to define privileges a user has on the data. This isn't about SQL privileges; this is about implementing your application's security model with database tables and queries. Specifically, it's about how to do this with the table designs you commonly see in an ORM system. This article is also not about authentication, it's about authorization. Your system should already be able to authenticate a user.

I'll use some terms interchangeably throughout this article. "Privilege" and "permission" generally mean the same thing. Since I assume your application uses ORM, "object" and "row" are basically the same thing from two viewpoints (in the code it's an object, in the database it's a row). An object's "type" or "class" has some direct relationship to the table in which the row is stored; the class is probably named the same as the table. Finally, "role" and "group" are similar, but not the same thing; a group is a role, but roles are a superset of groups.

### Requirements for my ACL system

The system I'll explain in these articles grew over the course of several years. It was driven by the need to manage an increasingly complex membership-based website in my university. Access control was always the Achilles heel until I found an elegant way to do it; then it became the system's greatest strength, allowing us to use [role-based access control][2] to enforce **row-level privileges on every row in the database**. Fine-grained, tightly integrated control was one goal. In fact, the ACL is so pervasive in the website, the user interface is built by asking the database "what can this user do here?" A single query tells the website what the user should see. Another important design goal was scalability. The complexity and speed should remain virtually constant, no matter how many rows are in the database.

My design has the following core features, some of which I'll save for the next article:

1.  Users are defined individually.
2.  Users can belong to one or several roles.
3.  Roles can be granted permissions to take actions.
4.  Privileges can be defined on individual objects, as well as classes and collections of objects.
5.  Built-in defaults handle nearly every privilege, and ACL entries are only needed to override or enhance the defaults.
6.  Actions aren't static; I can define whatever actions I need. The system contains definitions of actions, as well as defining what types of objects they apply to.

I omitted several features commonly found in other systems -- namely, the ability to deny privileges explicitly, and an inheritance tree of privileges. I've never found a need for denying privileges as long as roles are set up right, and hierarchies always make things more complex in relational systems. They also tend to make things less efficient to compute in a relational system, so for that reason my system is not hierarchical at all.

### What problems does my design solve?

Most of the privilege systems I've seen -- for example, those that control photo galleries, bulletin boards, shared calendars and the like -- are not very fine-grained. They usually take the form of a few database tables that define users, groups, and a mapping between the two. The table of groups usually has a few entries with a column for each privilege that applies. For example, you might get the following if you select everything from the groups table:

<pre>+-------+------------+------------+
| group | can_delete | can_update |
+-------+------------+------------+
| admin | 1          | 1          | 
| user  | 0          | 1          | 
+-------+------------+------------+</pre>

The application code often looks like this:

<pre>if ( $user-&gt;is_in_group("admin") ) {
   $message-&gt;delete();
}
else {
   print_error("Sorry, you can't delete messages.");
}

if ( $user-&gt;is_in_group("users" || $user-&gt;is_in_group("officers") ) {
   // display some link here... ad nauseum
}</pre>

Does that look familiar? That's how a lot of applications start, but as it grows larger, I guarantee it will become a disaster. Such systems tend to get extremely buggy and hard to work on, and may perform very badly. I've written before about [separation of concerns][3]; for example, today's web programmers know about using CSS to separate content and presentation. Separating your privilege system from the other logic in your code is a very good thing too; perhaps one of the most important design decisions you can make. It should be the foundation of your system, rather than woven through it.

One thing that's wrong with the code above, though it may not stand out, is that *the code has to know what an "admin" user can do*. In other words, the code is asking what group the user is in, and then deciding whether to let the user delete the message. This is not a good way to do things. Instead, the code should be asking for permission to do what it needs -- delete the message -- and *let the privilege system decide*. The code shouldn't know what groups have what privileges, because then any change in privileges requires the code to change, making the system very brittle (hard to change, easy to break). This may seem like an unimportant point, but separation of logic and privileges becomes crucial as time passes. One way you can tell if you have a good separation is if any of your code refers to a group. If you have any calls like `if ( $user->is_in_group("admin") )`, you already have a problem. If it doesn't seem like a serious problem, give it some time and you'll probably see :-)

Some web application frameworks, such as [CakePHP][4], have a more traditional ACL. There's also [a PHP implementation of generic access control lists, phpGACL][5]. Used properly, these separate concerns very nicely, which is a Good Thing.

People have clearly built good privilege systems before, but when I started building the website that led me to my current design, web searches for these concepts turned up nothing. Even today there's a relative dearth of good, comprehensible information about this subject. Why is this? I think it's because it's very hard to do well. If you're an operating systems programmer, or you work with filesystem security, you've probably been exposed to it (especially to standards like POSIX), but most web application developers haven't, and it's frankly something most people can't be expected to do well.

I know, because I didn't do it well at first either (and some of you, after reading this, will think I'm still not doing it well). My first attempts were many lines of code that made round trips to the database and had recursive calls and nested `if` statements six ways to Tuesday. It was slow, it consumed a lot of memory and CPU, and as the database got more and more data, it grew too large to perform well. And boy, it was buggy -- it was just too complex for me. In fact, it wasn't till I designed the present system that I finally found some of the bugs I'd had for years!

Some of these problems are common even in well-implemented systems. For example, the phpGACL demo site runs out of memory when I use it:

**Fatal error: Allowed memory size of 524288000 bytes exhausted (tried to allocate 57958 bytes) in [snip]/gacl_api.class.php on line 1359**

Why is phpGACL trying to allocate tens of megabytes of memory just to check whether something is permitted? <del datetime="2006-08-17T12:29:00+00:00">It's manipulating tree structures, recursing, and so forth.</del> [Update: this is incorrect; see the comments -- however, you'll see more about this in the next article] It's a complex approach, and can be inefficient. I don't say that to dismiss the developer's hard work. Trees are wonderful in theory. But it's like the difference between [DOM][6] and [SAX][7] parsing in XML -- if you're parsing very large XML files, you almost certainly want to use SAX or another incremental parser. The system I've designed used to work like DOM parsing -- like phpGACL, in fact. Now it works more like SAX.

The end result is that, for me at least, my design solves these problems:

1.  It provides table-level and row-level control.
2.  It keeps the privilege system and the code separated.
3.  It is easy to make correct.
4.  It is efficient and scales well with the number of objects (not linear scaling, *constant* scaling).

### How can you keep your privilege system small and fast?

The trick is asking a different question. A traditional ACL asks "given this user (ARO, or 'Access Request Object'), and this object (ACO, or 'Access Control Object'), can the user do such-and-such?" The answer, and how much work has to be done to get it, depends on a lot of factors, and if you want to ask about another action, you usually have to make another call to the ACL system. Instead, my current system asks "what can this user do with this row?" and touches a small, essentially constant amount of data, but gets back a complete answer of everything the user can do, which can be cached for future calls.

To help minimize extra data, my system is modelled after a blend of UNIX-style privileges, which I'll introduce in this article, and a more conventional (but not hierachical) ACL, which I'll save for the next article. Not only is it a very powerful model, but it's familiar to a lot of people, which makes it easier to understand and administer.

Here are the ways in which it's like UNIX:

1.  Every object (row in a table) is owned by both a user and a group.
2.  Users can belong to multiple groups.
3.  Privileges can be granted to a row's owner, or to its group-owner.
4.  Privileges can be granted not only on rows, but on tables too (in UNIX, privileges apply to both files and directories).
5.  There is a "root" group which always has permission to do everything.
6.  By default, an object (row) stores its own minimal set of read/write/delete privileges, which are sufficient for most common tasks. These are similar to UNIX's read, write, and execute privileges.
7.  The minimal read/write/delete privileges specify User, Group, and Other, just as in UNIX.
8.  Schema defaults (default column values) are similar to "sticky bits" in UNIX directories.

If these concepts aren't familiar to you, I always point people to the [`ls` man page][8]. The hardest thing for people to grasp is usually the concept of a group owner.

And here are the ways it's unlike UNIX, topics I'll cover in the next article:

1.  There are no primary and secondary groups; all group memberships are equal.
2.  Privileges are dependent on the object's type (i.e. the table in which it's stored).
3.  Users and ACL entries are objects just like any other, because they're stored as rows in the database, and thus subject to privileges too.
4.  Privileges can be granted on rows and tables, as I said above, but a special class of privileges can also be granted on all rows in a given table. Not the row itself, not the table itself, but all rows in the table. This is essentially the same as extending object and class privileges to set privileges.
5.  Privileges can be contingent on external factors, such as an object's status.
6.  Most people think of groups and roles as the same thing, but they're not quite the same in my system. Special types of roles can be defined, which are not directly related to groups. For example, because a user of a website or similar system usually needs special privileges to "itself," there's a special "self" role that grants a user rights to do things to itself that it doesn't have to any other user. These roles aren't static; you can define more, such as "creator" if you want. Privileges can also be granted to an arbitrary group, which can be a different group than the object's owner group.

As you'll see in the next article, these properties permit O(1) scaling by letting one entry in the ACL apply default privileges to an entire set of objects, instead of having one entry per object that needs a privilege. For example, the "self" role can allow a user to update its own password -- a privilege it shouldn't have on other users. Without the "self" role, every user might require an ACL entry to allow it to change its own password.

### The database schema

I'll start with a simplified system to control access to rows (you'll see how to control access to tables in the next article). My system treats every row uniformly, which requires every table to have some extra columns to support the ACL.

A word on naming: In this article I'll use a prefix of `t_` for tables and `c_` for columns. Not only does this keep the queries clear, as you'll see later, but it lets me use reserved words as identifiers (such as `c_group`). I'll also use MySQL as an example, though of course you could use other databases. Here is the basic table schema:

<pre>create table t_foo (
    c_uid             int not null auto_increment primary key,
    c_owner           int not null default 1,
    c_group           int not null default 1,
    c_unixperms       int not null default 500,
    -- other columns ...
);</pre>

You need these columns in every table. I'll introduce the columns here, and explain them in more detail as I go.

1.  `c_uid` is the primary or surrogate key for each row (it doesn't have to be meaningless auto_increment, as long as it's an integer).
2.  `c_owner` is the ID of the row's owner. This corresponds to `c_uid` in the `t_user` table.
3.  `c_group` defines which group owns the object. As I mentioned above, this is frequently a source of confusion, because people tend to think this defines a user's group memberships. That's a special case I'll cover later.
4.  `c_unixperms` defines the object's UNIX-style read/write/delete permissions.

### Groups and group membership

Groups could be defined in the database, but in practice I find them so static that it's better to hard-code a lookup table or enumeration in the application code, eliminating a trip to the database to fetch the group definitions for every request. Here's a typical definition for PHP:

<pre>$groups = array(
   "root"          =&gt; 1,
   "officer"       =&gt; 2,
   "user"          =&gt; 4,
   "wheel"         =&gt; 8
);</pre>

Notice these are powers of two. That's because I'm going to use a lot of [bitwise arithmetic][9] to do the queries for groups. This limits the number of groups to the number of bits in an integer, but for simplicity and speed, I've found it better to accept that limitation (I've never needed more than 8 groups to define a nicely granular system of privileges, and an unsigned integer allows 32). One thing to keep in mind here is that groups and roles do not have a one-to-one relationship, so this design doesn't limit your total *roles* to the number of bits in the column, just your *groups*.

A row's `c_group` column contains the ID of the group that owns the row; so if the officer group owns a row, it will have the value 2.

A user's group memberships are handled differently. Since group IDs are powers of two, instead of being normalized into a separate table, they can be packed into a single integer. This is stored in the `c_group_memberships` column on the `t_user` table. This de-normalization removes complexity and data from your system, and makes queries much more efficient. I'll be using the bit-packing optimization a lot, as you'll see.

People often get confused about group memberships, because the `t_user` table also has a `c_groups` column like every table, but that has nothing to do with which groups the user is a member of; it stores the group that owns the user.

A user who is in both the "root" and "user" groups has a `c_group_memberships` value of 5.

### UNIX-style read/write/delete permissions

The UNIX-style read, write, and delete permissions are defined in another array in the code, and packed into each row's `c_unixperms` column:

<pre>$permissions = array(
   "owner_read"   =&gt; 256,
   "owner_write"  =&gt; 128,
   "owner_delete" =&gt; 64,
   "group_read"   =&gt; 32,
   "group_write"  =&gt; 16,
   "group_delete" =&gt; 8,
   "other_read"   =&gt; 4,
   "other_write"  =&gt; 2,
   "other_delete" =&gt; 1
);</pre>

A row whose `c_unixperms` column has the value 500 (decimal) has the value 111110100 in binary, so that means, from most to least significant bit, the owner can read, write and delete; members of the owner group can read and write; and other users can just read. This is probably familiar to you if you know UNIX filesystem permissions.

### Sample schema

Sample data is helpful at this point, so I'm going to script out a minimal schema and populate it for some queries. Here's the script:

<pre>drop table if exists t_user;
create table t_user (
   c_uid             int             not null auto_increment primary key,
   c_owner           int             not null default 1,
   c_group           int             not null default 1,
   c_unixperms       int             not null default 500,
   c_username        varchar(50)     not null,
   c_group_memberships int           not null
);

insert into t_user (c_username, c_group_memberships)
   values('root', 1), ('xaprb', 4), ('sakila', 5);

drop table if exists t_event;
create table t_event (
   c_uid             int             not null auto_increment primary key,
   c_owner           int             not null default 1,
   c_group           int             not null default 1,
   c_unixperms       int             not null default 500,
   c_description     varchar(50)     not null
);

insert into t_event(c_owner, c_group, c_description) values
   (1, 1, 'MySQL Camp'), (1, 4, 'Microsoft Keynote');</pre>

### How to determine whether a user can take an action

That's a complete set of data, so now you can start asking questions about whether a user is allowed to do things to an object. To figure this out, you need the following information:

*   The user's ID and group memberships.
*   The **type and identity** of the thing in question. Since this article deals only with objects, you need to know the table it lives in, and its `c_uid`.
*   The desired action (read, write, delete).

I'll start by asking questions the way a traditional ACL does: can user X do Y to object Z? For example, let's see if user 'xaprb' has the right to read the 'MySQL Camp' event:

1.  xaprb's user ID is 2 and `c_group_memberships` is 4.
2.  The event's `c_unixperms` column is 500, which grants owner\_read, owner\_write, owner\_delete, group\_read, group\_write, and other\_read.
3.  The event's `c_owner` column is 1, so xaprb is not the object's owner, and none of the owner read/write/delete privileges applies.
4.  The event's `c_group` column is 1, and xaprb is not in the group that owns the object. None of the group privileges applies.
5.  xaprb is in the 'other' role (everyone always is). So the other_read privilege applies.

Therefore, xaprb can read the event. Can user 'sakila' update (write) the 'Microsoft Keynote' event? Let's see:

1.  sakila isn't the event's owner, so none of the owner privileges applies.
2.  sakila is in group 1 and 4, and the event's group owner is 1, so group\_read and group\_write apply.

So sakila can update the event.

Because the privileges are packed into bits, you can reduce this to logical and bitwise operators. Assuming `$u` is the user and `$e` is the event, this expression determines whether the user can write the event:

<pre>$can_write
   =  (( $e->owner == $u->id ) 
         && ( $e->unixperms & $permissions['owner_write'] ))
   || (( $e->group & $u->group_memberships )
         && ( $e->unixperms & $permissions['group_write'] ))
   ||       ( $e->unixperms & $permissions['other_write'] );</pre>

And so it goes; you can do similar calculations for read and delete permissions. You would probably want to write a class method that would allow you to express this as `$u->can('write', $e)` or something similar. This is also an easy query to write in SQL, although you don't need to go to the database to find data you already have in your objects.

Notice how the code doesn't have to know anything about whether a user is in a particular group! That knowledge is completely encapsulated in the integers the objects carry around with them. This is part of the separation of code and privileges I mentioned above.

### What's next?

You can begin to see how powerful the system is just from this humble beginning. Read, write and delete access are by far the most used privileges, so just by emulating UNIX file permissions I've shown you how to get the basics with very little work.

The above is not how you will ultimately determine privileges, however. As I said above, asking the question in this fashion is eventually not scalable. You want to be able to ask a question such as `$privs = $e->permits($u)` and get everything at once. That capability is a superset of what I've shown you above, so when you have that capability, you can ask the question both ways if it makes sense for your code.

We're not ready for that yet. It will involve quite a bit more complexity, which I don't want to introduce in this article. The next article will expand this system greatly, explaining the extra capabilities I've mentioned throughout this article, and then some. What I've shown you here only scratches the surface. I'll also discuss how to pick and choose features you need, a bunch of optimizations for size and speed, and how you can build your own customizations into the full-blown system so it does exactly what you need.

Finally, the next article will explain how to build truly role-based access control. What I've shown you so far doesn't really have to be implemented as role-based, though you'll see how it fits into the role-based paradigm in the next article.

 *[ORM]: Object-Relational Mapping
 *[RBAC]: Role-Based Access Control
 *[ACL]: Access Control Lists
 *[DOM]: Document Object Model
 *[SAX]: Simple API for XML
 *[XML]: eXtensible Markup Language
 *[ARO]: Access Request Object
 *[ACO]: Access Control Object

 [1]: http://en.wikipedia.org/wiki/Access_control_lists
 [2]: http://en.wikipedia.org/wiki/Role-Based_Access_Control
 [3]: http://www.xaprb.com/blog/2005/12/15/css-good-practice-separate-layout-and-presentation/
 [4]: http://manual.cakephp.org/chapter/acl
 [5]: http://phpgacl.sourceforge.net/
 [6]: http://en.wikipedia.org/wiki/Document_Object_Model
 [7]: http://en.wikipedia.org/wiki/Simple_API_for_XML
 [8]: http://www.freebsd.org/cgi/man.cgi?query=ls
 [9]: http://www.xaprb.com/blog/2005/09/28/bitwise-arithmetic/
