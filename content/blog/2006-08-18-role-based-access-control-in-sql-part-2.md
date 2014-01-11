---
title: Role-based access control in SQL, part 2
author: Baron Schwartz
excerpt: |
  <p>This is my second article on how to build a role-based access control
  system in SQL.  In the first article I gave a high-level overview of access
  control systems in general, especially in the web-application context, and
  talked about how some are implemented.   I introduced the problems I designed
  my system to solve, and gave a roadmap for where this series of articles will
  end.  I finished that article with a sketch of some basics to provide
  row-level read, write, and delete access control.</p>
  
  <p>This article picks up where I left off.  I want to revisit some things I
  swept under the rug in the first article, because I didn't want to throw all
  the complexity in at once.  I'll explain my current system's full
  functionality, which includes roles, type checking, table-level and
  set-level privileges, and more.  I will show you the design in great detail,
  and give working examples and ready-to-run SQL queries.  I'll also explore
  ideas for extending or restricting functionality, because your
  application isn't likely to be the same as mine.  I'll discuss possible
  optimizations, because performance and
  scalability are important design goals.  I'll end with a brief explanation of
  how I've used this system to make my own web applications simpler and more
  secure.</p>
layout: post
permalink: /2006/08/18/role-based-access-control-in-sql-part-2/
description:
  - >
    Explains how to build a fast, flexible role-based access control system (ACL)
    with a SQL database, suitable for web and other applications.
---
This is my second article on how to build a role-based access control system in SQL. In the first article I gave a high-level overview of access control systems in general, especially in the web-application context, and talked about how some ACLs are implemented. I introduced the problems I designed my system to solve, and gave a roadmap for where this series of articles will end. I finished that article with a sketch of some basics to provide row-level read, write, and delete access control.

This article picks up where I left off. I want to revisit some things I swept under the rug in the first article, because I didn&#8217;t want to throw all the complexity in at once. I&#8217;ll explain my current system&#8217;s full functionality, which includes roles, status, type checking, and table-level and set-level privileges. I will show you the design in detail, and give working examples and ready-to-run SQL queries. I&#8217;ll also explore ideas for extending or restricting functionality, because your application isn&#8217;t likely to be the same as mine. I&#8217;ll mention possible optimizations, because performance and scalability are important design goals. I&#8217;ll end with a brief explanation of how I&#8217;ve used this system to make my own web applications simpler and more secure.

If you haven&#8217;t already, you should <a href="/blog/2006/08/16/how-to-build-role-based-access-control-in-sql/">read the first article</a> before continuing with the rest of this article, because I&#8217;ll assume you have the context it provides.

### Roles

Let&#8217;s finish the discussion about roles I pushed aside in the first article. When a user acts in a role, it &#8220;acts in the capacity of&#8221; that role. When a user is a member of a group, my system permits the user to act in that capacity &#8212; to assume that role. I don&#8217;t want to go into the details of roles and role-based access control, partly because it&#8217;s way outside my expertise, but I want to point out that acting as a member of a group is *only one way* to implement roles. There are others.

The trick to making roles work well is finding the right level of granularity. To accomplish this, I&#8217;ve defined some special roles in my system. In this article I&#8217;ll demonstrate how to implement the &#8220;self&#8221; role, but many others are possible. Anything you can deduce about the relationship between a user and an object is a candidate for a role, should you need it. For example, if your system records who creates each row, you could implement a &#8220;creator&#8221; role. If your schema tracks who supervises employees, you could have a &#8220;supervisor&#8221; role.

As I said, groups are subsets of roles, which is why they are often a convenient way to implement a role. To carry the example a bit farther, you can implement the &#8220;supervisor&#8221; role by looking at data to determine if the user is in a supervisory relationship to the object, **or** you can just add all supervisors to the &#8220;supervisor&#8221; group. The latter approach is a bit coarser, because it would allow a user to act as a supervisor on a user she doesn&#8217;t actually supervise, but you gain simplicity and speed. The &#8220;self&#8221; role is similar, but in this case you obviously want the fine-grained control of saying &#8220;a user is *only* allowed to act in the self role upon herself.&#8221; Adding everyone to the &#8220;self&#8221; group would accomplish nothing.

I&#8217;ve already used roles in the previous article, though I didn&#8217;t encourage you to think of them that way yet. The roles I demonstrated are &#8220;owner,&#8221; &#8220;owner_group,&#8221; and &#8220;other.&#8221; These are implicit in UNIX privileges. Later I&#8217;ll show you how privileges are assigned to roles explicitly.

### Actions

Another topic I put aside, but used implicitly, was actions. Actions are important because they&#8217;re the verbs in the &#8220;can user X do Y to object Z&#8221; question. The three basic UNIX-style actions I introduced in the first article are &#8220;read,&#8221; &#8220;write,&#8221; and &#8220;delete.&#8221; As with roles, I&#8217;m going to make them explicit in this article.

I&#8217;ve already introduced the &#8220;event&#8221; data type. What actions can a user take on an event, besides the basic three? I can think of &#8220;join&#8221; and &#8220;withdraw.&#8221; Since actions are verbs, chances are your application already defines a lot of actions as class methods, and you may even maintain a list of actions as part of your design process.

Actions are the first place where type matters. I&#8217;ve mentioned that objects in my system are both typed and identified; that is, you need to know both the table and the ID of a row to apply privileges to it (you didn&#8217;t need to know the table in the last article). Certain actions will apply to all types, such as read/write/delete, but others will only apply to specific types &#8211; a natural concept in object-oriented programming, which I assume you&#8217;re doing if you&#8217;re using an ORM system.
I find it useful to define a generic set of semi-UNIX-ish actions, which can be applied uniformly to *every* type by common code. These let me build &#8220;property pages&#8221; automatically, which are important when I need to administer the properties of different types of objects. Some examples are &#8220;stat&#8221;, &#8220;chmod&#8221;, &#8220;chgrp&#8221;, &#8220;chown&#8221;, &#8220;chmeta&#8221;, &#8220;view\_acl&#8221;, and &#8220;add\_privilege.&#8221; Other actions apply only to specific types.

Actions are stored in the database, because they need to be involved in some of the queries I&#8217;ll show you later. This means they could theoretically be subject to ACL privileges like other objects, but in practice I find this is needless complexity (what good would it do to define a new action in the database, unless there is application code to implement it? Perhaps in an application with plug-in functionality this would be useful, but I&#8217;m not doing that.) For that reason I don&#8217;t give them extra columns like other tables, and I exclude them from my ORM system. Here&#8217;s the basic schema:

<pre>create table t_action (
    c_title           varchar(100) not null primary key,
    c_apply_object    tinyint      not null
);</pre>

The `c_apply_object` column specifies whether an action applies to objects or tables. Certain actions, like &#8220;create,&#8221; apply only to tables. I find the system is easier to manage if I choose my actions so they can only apply to one or the other, not both.

In my applications I typically add more columns to define user-interface labels and so on, but I omit them here. Actions will return soon, but I want to talk about statuses first.

### Status

Your privilege system can represent reality better if it respects the object&#8217;s status, because some things can only be done when an object is in a certain status. Flashback to the imaginary application code:

<pre>if ( $user-&gt;can('join', $event) ) {
   if ( $event-&gt;status() == 'active' ) {
      // the user joins the event
   }
   else {
      print_error("Sorry, this event isn't active");
   }
}</pre>

It&#8217;s happening again &#8212; the code is taking too much responsibility. Shouldn&#8217;t the code just be asking if the event is joinable? In fact, isn&#8217;t it cleaner to make privileges contingent upon the event&#8217;s status? If you haven&#8217;t really explored this possibility in your own code, I encourage you to do so. My personal experience is it&#8217;s a much better way to do it. Think about the places in your code where you could omit checking something&#8217;s status before doing something to it. You might get rid of a lot of code.

While this represents reality better in one way, it mis-represents it another way. What if `$user->can('join', $event)` returns false? Is permission denied? Maybe not; maybe the event just isn&#8217;t active. This makes it a little harder to understand why a user can&#8217;t join an event, but in practice I find this almost never happens in my applications. The applications are built by asking what the user can do, so no user ever gets a link to join an event that&#8217;s not &#8220;joinable,&#8221; whatever that means. Mashing status and privileges together is a trade-off, but the upside (performance and managability) is so great, I think it&#8217;s overwhelmingly worth the slightly unfaithful representation. In a bit I&#8217;ll show you how to do this.

Now that I&#8217;ve explained my decision to include status in the privilege system, let&#8217;s look at status values themselves. They&#8217;re like groups and permissions: they are so static in the applications I use, they probably ought to be defined in the code. What statuses should you define? Well, for the &#8220;event&#8221; data type, maybe you need &#8220;active,&#8221; &#8220;inactive,&#8221; &#8220;cancelled,&#8221; and so forth. A membership, for example, might be &#8220;pending&#8221; when the user signs up, and &#8220;active&#8221; when the administrators receive payment and activate it. Statuses are powers of two, like groups:

<pre>$statuses = array(
   "deleted"     =&gt; 1,
   "inactive"    =&gt; 2,
   "active"      =&gt; 4,
   "cancelled"   =&gt; 16,
   "pending"     =&gt; 32
);</pre>

An object&#8217;s status is stored in its `c_status` column, which I need to add to my generic set of columns. Now my table template looks like this:

<pre>create table t_foo (
    c_uid             int not null auto_increment primary key,
    c_owner           int not null default 1,
    c_group           int not null default 1,
    c_unixperms       int not null default 500,
    c_status          int not null default 0,
    -- other columns ...
);</pre>

### Where&#8217;s the type information?

I said actions are only valid for certain types of objects, but that&#8217;s not represented anywhere in the privilege system. I&#8217;ve said I&#8217;m going to mix privileges and status together for the many benefits it gives. Should I also mix types into the recipe?

There could be one good reason not to do this: <a href="http://c2.com/xp/OnceAndOnlyOnce.html">Once And Only Once</a>. The code might already define what actions are valid for what types, if your system is very object-oriented. On the other hand, your code might not be that strictly object-oriented, and you might want the application to be able to take actions that don&#8217;t correspond to an object method. I find this is the case in my code, because I don&#8217;t live in the [Kingdom of Nouns][1]. In this case you do want the privilege system to know which actions are valid for which types.

But there&#8217;s another reason, too: your types probably share some actions. Here&#8217;s one example from my application: memberships and events can both be activated, so the &#8216;activate&#8217; action applies in more than one place. In fact, some actions are even shared more than twice in my system, and *in some cases they don&#8217;t apply in the same statuses*. In this case, I think the relational database is the best place to store this information.

The type-action-status information lives in `t_implemented_action`, another &#8220;system table&#8221; that doesn&#8217;t get all the auto-increment baggage, like `t_action`:

<pre>create table t_implemented_action (
    c_table           varchar(100)    not null,
    c_action          varchar(100)    not null,
    c_status          int             not null default 0, 
    primary key (c_table, c_action)
);</pre>

This is the first place I&#8217;ve shown you where a column contains a table name. Remember, in the ORM worldview, a table&#8217;s name is its data type (I hope your code has an easy way to translate between an object&#8217;s data type and the name of the table it lives in). A row in `t_implemented_action`, then, says &#8220;this type of object implements this action in this status.&#8221;

In this table, the `c_status` column is not a single-valued integer; since an object might support a given action (such as &#8220;delete&#8221;) in several statuses, the statuses are packed in bitwise. If an action is always valid for a given data type, I set the `c_status` to 0.

Rows only need to be in this table if the action applies to objects, because tables don&#8217;t have a type (they *are* a type!) or status in my worldview.
### Privileges

I&#8217;ve now covered enough background to explain how my system represents privileges. There are three types of privileges:

1.  &#8220;object&#8221;: a regular object-level (row-level) privilege.
2.  &#8220;table&#8221;: a privilege granted upon a table itself, as opposed to its contents. For example, &#8220;create&#8221; cannot be applied to an object, because an object has to exist for a privilege to apply to it. &#8220;create&#8221; can be granted upon a table, which allows a user to create a row in that table.
3.  &#8220;global&#8221;: a privilege granted on all rows in a given table. For example, officers ought to be able to view details on every user &#8212; details which might be hidden from other users. A single global privilege in the ACL can grant this.

I store privileges two different ways. First, there are the UNIX-style privileges I&#8217;ve already explained. These are clearly object privileges, because they are defined directly in the row. I find these take care of nearly all my needs.

Next, if I need additional granularity, there&#8217;s the `t_privilege` table. I have denormalized the design for performance and space efficiency, and crammed all three privilege types into one table:

<pre>create table t_privilege (
    c_role            varchar(30)     not null,
    c_who             int             not null default 0,
    c_action          varchar(100)    not null,
    c_type            varchar(30)     not null,
    c_related_table   varchar(100)    not null,
    c_related_uid     int             not null default 0,
    primary key(c_role, c_who, c_action, c_type, c_related_table, c_related_uid)
);</pre>

From top to bottom, these columns mean the following:

*   `c_role` specifies whether the privilege is granted to a user, a group, or in the case of an &#8220;object&#8221; privilege, the object&#8217;s owner or owner_group. A further special case, in my system, is &#8220;self.&#8221;
*   `c_who` is needed if `c_role` is user or group, and holds the user or group ID to which the privilege is granted.
*   `c_action` is the action the privilege grants. This is always required.
*   `c_type` specifies whether the privilege is &#8220;object&#8221;, &#8220;table&#8221;, or &#8220;global.&#8221;
*   `c_related_table` holds the name of the table to which the privilege applies. This is always required, though in the case of a &#8220;self&#8221; privilege it&#8217;s redundant because a &#8220;self&#8221; privilege always applies to the `t_user` table.
*   `c_related_uid` stores the ID of the object to which the privilege applies, if it&#8217;s an object privilege. This has no meaning for table and global privileges, of course. The one applies to a table, not an object, and the second applies to all rows in a table, so an ID is immaterial. This is also not used for self privileges, because by definition a self privilege has to apply to the user requesting permission to do something.

It&#8217;s a fairly complex table because of all the different types of things it holds. I generally hate columns that mean one thing sometimes and something else other times. When I first designed this system, I put different types and roles in different tables, which ended up being almost but not quite identical. I&#8217;ll let you imagine how horrible that was to actually work with. This is much better, and having a single table is more efficient for querying.

### Example privileges

Examples might help understand the table structure. Suppose I have the following entries in `t_privilege`:

<table class="borders collapsed">
  <tr>
    <th>
      c_role
    </th>
    
    <th>
      c_who
    </th>
    
    <th>
      c_action
    </th>
    
    <th>
      c_type
    </th>
    
    <th>
      c_related_table
    </th>
    
    <th>
      c_related_uid
    </th>
  </tr>
  
  <tr>
    <td>
      group
    </td>
    
    <td>
      4
    </td>
    
    <td>
      join
    </td>
    
    <td>
      global
    </td>
    
    <td>
      t_event
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      group
    </td>
    
    <td>
      4
    </td>
    
    <td>
      list_all
    </td>
    
    <td>
      table
    </td>
    
    <td>
      t_event
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      self
    </td>
    
    <td>
    </td>
    
    <td>
      passwd
    </td>
    
    <td>
      object
    </td>
    
    <td>
      t_user
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      user
    </td>
    
    <td>
      3
    </td>
    
    <td>
      delete
    </td>
    
    <td>
      object
    </td>
    
    <td>
      t_event
    </td>
    
    <td>
      1
    </td>
  </tr>
</table>

*   The first row grants group 4 (users) the privilege to join every event (all rows in the `t_event` table).
*   The second row grants all users the right to list the contents of the `t_event` table. This is the first example of a table-level privilege I&#8217;ve given. This is equivalent to setting the executable bit on a directory in UNIX.
*   The third row grants everyone the privilege to change our own password.
*   The fourth row grants user 3 the right to delete event 1.

### Sample schema

Here&#8217;s a complete script (again, for MySQL) to create and populate a sample schema with some sample data. This is what I&#8217;ll run queries against later:

<pre>drop table if exists t_user;
create table t_user (
   c_uid             int             not null auto_increment primary key,
   c_owner           int             not null default 1,
   c_group           int             not null default 1,
   c_unixperms       int             not null default 500,
   c_status          int             not null default 0,
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
   c_status          int             not null default 2,
   c_description     varchar(50)     not null
);

insert into t_event(c_owner, c_group, c_status, c_description) values
   (1, 1, 2, 'MySQL Camp'), (1, 4, 4, 'Microsoft Keynote');

drop table if exists t_action;
create table t_action (
   c_title           varchar(100) not null primary key,
   c_apply_object    tinyint      not null
);

insert into t_action(c_title, c_apply_object) values
   ('read',     1),
   ('write',    1),
   ('delete',   1),
   ('join',     1),
   ('activate', 1),
   ('passwd',   1),
   ('list_all', 0);

drop table if exists t_implemented_action;
create table t_implemented_action (
   c_table           varchar(100)    not null,
   c_action          varchar(100)    not null,
   c_status          int             not null default 0, 
   primary key (c_table, c_action)   
);

insert into t_implemented_action(c_table, c_action, c_status) values
   ('t_user',       'read',     0),
   ('t_user',       'write',    0),
   ('t_user',       'delete',   0),
   ('t_user',       'passwd',   0),
   ('t_event',      'read',     0),
   ('t_event',      'write',    0),
   ('t_event',      'delete',   0),
   ('t_event',      'join',     4),
   ('t_event',      'activate', 2),
   ('t_membership', 'read',     0),
   ('t_membership', 'write',    0),
   ('t_membership', 'delete',   0),
   ('t_membership', 'activate', 2);

drop table if exists t_privilege;
create table t_privilege (
   c_role            varchar(30)     not null default 'other',
   c_who             int             not null default 0,
   c_action          varchar(100)    not null,
   c_type            varchar(30)     not null default '',
   c_related_table   varchar(100)    not null default '',
   c_related_uid     int             not null default 0,
   primary key(c_role, c_who, c_action, c_type, c_related_table, c_related_uid)
);

insert into t_privilege
   (c_role, c_who, c_action, c_type, c_related_table, c_related_uid)
   values
   ('self',  0, 'passwd',   'object', 't_user',  0),
   ('group', 4, 'join',     'global', 't_event', 0),
   ('group', 4, 'list_all', 'table',  't_event', 0),
   ('user',  3, 'delete',   'object', 't_event', 1);</pre>

One note on this schema &#8212; I have not included the indexes good performance will require. I&#8217;ve only included primary keys to ensure data validity. My real application has more indexes on `t_implemented_action` and `t_privilege`.

### How to determine whether a user can take an action

It is now a much more complex process to determine whether a user can take a given action on an object or table. You need to start with some of the same information as in the last article:

*   The user&#8217;s ID and group memberships.
*   The type and identity of the thing in question. In case it&#8217;s an object, you need to know the table it lives in, and its `c_uid`. In case it&#8217;s a table, you just need to know the table name.
*   The desired action.

How about seeing if &#8216;xaprb&#8217; can join the &#8216;MySQL Camp&#8217; event:

1.  The UNIX-style permissions don&#8217;t specify anything about the &#8220;join&#8221; action, so I&#8217;ll skip them.
2.  The &#8220;join&#8221; action is valid for objects.
3.  The object&#8217;s type is &#8220;t_event,&#8221; and the &#8220;join&#8221; action is defined for that type, but not in status 2 &#8212; only in status 4.

xaprb cannot join the event. Can he join the &#8216;Microsoft Keynote&#8217; event?

1.  The first two steps are the same, and this time the event&#8217;s status matches, so we can go to the next step.
2.  We need to look in the `t_privilege` table for a row that matches any of the following: 
    *   c\_role is &#8216;user&#8217;, c\_who is 2, c\_action is &#8216;join&#8217;, c\_type is &#8216;object&#8217;, c\_related\_table is &#8216;t\_event&#8217;, and c\_related_uid is 2,
    *   or, c\_role is &#8216;user&#8217;, c\_who is 2, c\_action is &#8216;join&#8217;, c\_type is &#8216;global&#8217;, and c\_related\_table is &#8216;t_event&#8217;,
    *   &#8230; this goes on for a long time.

I&#8217;m not going to type all the possible combinations of columns and values. This is exactly why my old privilege system was buggy and bloated. Fortunately, it&#8217;s really not bad to express this in SQL.

### How to determine privileges with an SQL query

I&#8217;ve mentioned several times that the trick to doing this easily is to ask the question the right way. Instead of trying to enumerate every possible way a privilege could be granted, as I did above, it&#8217;s much easier to simply ask &#8220;tell me every privilege this user has on this object.&#8221; Maybe it doesn&#8217;t sound simpler, but it ends up being true. The query is a bit lengthy, but nothing in it is complicated. Here are links to view and download queries:

*   [All object privileges][2] shows you every privilege a given user has on an object.
*   [All table privileges][3] shows you every privilege a given user has on a table.
*   [All ACL entries][4] shows you all ACL entries defined for a particular object.
*   **Update:** a new query &#8212; [All actionable objects][5] shows you all objects a user can take a particular action on.

The queries are built dynamically with a few substitution variables. You can test these queries by saving them to a .php file and piping their output directly into mysql, like so:

<pre>php all-object-privileges.php | mysql</pre>

### How efficient is it, really?

Pretty darn efficient. The all-object-privileges query really only needs to join a single row (the object) through the `t_implemented_action` table to the `t_privileges` table, so the query is only as big as those two tables. My sample queries include the `t_action` table, because I tend to use it to define GUI labels for my application, but otherwise `t_action` really isn&#8217;t used in these queries.

Remember, one of my design goals is to keep the privileges table small. That&#8217;s why I built in the complex, but efficient, self roles and global privilege types. You can really say a lot with a single global privilege.

If you need to optimize this system further, there are lots of opportunities to omit information, shrink column sizes if you don&#8217;t need 32 bits (for example, you may only have a few groups), and so forth. You can also pick and choose which features you want; drop the UNIX-style permissions if you need to, for example.

If anyone wants to benchmark this system, I&#8217;d be interested in the results. I have never done it. All I know is it works better than it used to, and when I run the queries, they are fast. The largest application I use this on has 122 rows in `t_privilege` and 672 in `t_implemented_action`. This is really what determines the size of the query; you should be able to have ten or ten million rows in the tables that store your objects, and that should make no difference.

If you do want to benchmark the system, please don&#8217;t do it without putting indexes on tables. As I&#8217;ve said, I only included primary keys in this article.

### What&#8217;s ugly about this system?

I&#8217;ve just shown you essentially the same design I use in my production system. It is a strange mixture of different things that don&#8217;t always make much sense together. For example, why not just drop the UNIX-style privileges and put a couple extra rows in `t_privilege` instead? I could do that easily, and my queries would be simpler. The entire system would be more consistent. In fact, if I were starting from scratch, I might do that. I&#8217;ve let you see this design in this article so you can make up your own mind about which features you want to include.

One thing I&#8217;d be reluctant to give up is the laziness the UNIX-style privileges give my code. For the vast majority of uses, my code just wants to know whether the user is allowed to read or update an object. That can be answered without a trip to the database, so it&#8217;s an efficiency.

I have also never really needed the &#8220;other&#8221; role in the `t_privilege` table, so I haven&#8217;t written the queries for it (check the queries!). That means my &#8220;other&#8221; role is implemented in the UNIX-style privileges only. It works for me, though it&#8217;s slightly inconsistent.

### What&#8217;s missing? How can you extend this system?

I&#8217;ve deliberately omitted a few things. One is negative privileges, which deny someone the right to do something. This would not be hard to add &#8212; I&#8217;ve just never needed it! You could do an <a href="/blog/2005/09/23/how-to-write-a-sql-exclusion-join/">exclusion self-join</a> against negative privileges to implement this, and store the negative privileges in the same table. Another possibility would be using more bitwise logic to negate privileges. I&#8217;ve honestly never put too much thought into it.

I hope my sample queries (which are almost identical to my production queries, by the way) give you enough insight to figure out other special things you may need, such as the &#8220;creator&#8221; or &#8220;supervisor&#8221; roles I mentioned. Another possibility is packing more bits into the UNIX-style permissions. My examples only use 9 bits. If your application is constantly asking whether some other action, besides read/write/delete, is possible &#8212; hey, use those extra bits. Or if you want, put another role besides user/group_owner/other into the UNIX-style bits. Just because I modelled after UNIX doesn&#8217;t mean you can&#8217;t do it differently.

There&#8217;s lots of room to play with the table structures. For example, my production system has extra columns on `t_action` and `t_implemented_action` to define labels and other things my user interface wants.

### How does this compare to other systems?

I hate comparisons for their own sake, so I&#8217;ll only say my table schema is as simple as I could make it and still jam all the special cases in. There are only a couple of tables, and no complex hierachical relationships between them &#8212; everything is flattened out and de-normalized as much as I can think to do. By comparison, [phpGACL][6] uses 18 tables to represent relationships among ACOs and ARO. Here&#8217;s another system I&#8217;ve found on the web at <a href="http://www.sqlrecipes.com/article_4.html">sqlrecipes.com</a>. Its schema is also more complex.

These systems may work better for you, especially if you need a more traditional hierarchical ACL. Fortunately, I&#8217;ve always been able to accomplish what I need without hierarchy and with just a few groups, some custom roles, column defaults, lots of bitwise arithmetic, and special types of privileges. And I have managed quite complex data with this schema, such as inventory and accounting systems together in the same application.

### How can you integrate this with a web application?

I currently use this system to implement a lot of the logic behind my web application. Between the privileges, type checking in the queries, and status-awareness, all my web application needs to do is ask the database what the user can do, and then display it. For example, I often use a &#8220;tab&#8221; metaphor, and the tabs are generated from the query. Here&#8217;s a screenshot of the property pages I mentioned:

[<img src="/articles/images/thumb-property-pages-screenshot.png" width="200" height="" alt="Property Pages Screenshot" />][7]

I use the same query to populate drop-down menus and so on.

My web app also uses url rewriting to funnel requests through a central dispatcher, which reads the URL and decides what file should handle the request. Before that happens, though, it verifies that the user is authorized to do what the URL requests! For example, my URLs look like &#8220;http://www.site.com/event/list_all/&#8221;. The dispatcher looks at the URL and realizes the user is trying to take the `list_all` action on the `event` type. It runs the appropriate fetch-all query and sees if `list_all` is allowed. If so, it dispatches the request. The file that handles the request can focus on business logic instead of handling authorization, because it knows the user is pre-authorized. This is what I meant in my first article, when I said access control should be at the heart of the application, not bolted on. As a result of this design, most of the pages that actually do something only need a few lines of very focused code. This approach has also allowed me to factor out virtually all common code. I can&#8217;t think of any duplicated code at all right now, though I&#8217;m sure there is some.

I&#8217;m not trying to brag; I just want to share with you how this has been a success for me.

### Summary

It&#8217;s pretty hard to summarize such a complex article, but I&#8217;d like to wrap up by saying I&#8217;m keen to hear your comments. Suggestions for improvements are especially welcome. I hope this article has been helpful for you.

And of course, if you did find it helpful, you might like to [subscribe and receive free, convenient updates][8] by email or feeds when I post new articles.

 *[ACL]: Access Control List
 *[ORM]: Object-Relational Mapping
 *[ACOs]: Access Control Objects
 *[ARO]: Access Request Objects

 [1]: http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html
 [2]: /articles/all-object-privileges.phps
 [3]: /articles/all-table-privileges.phps
 [4]: /articles/all-acl-entries.phps
 [5]: /articles/all-actionable-objects.phps
 [6]: http://phpgacl.sourceforge.net/
 [7]: /articles/images/property-pages-screenshot.png
 [8]: /blog/subscribe/