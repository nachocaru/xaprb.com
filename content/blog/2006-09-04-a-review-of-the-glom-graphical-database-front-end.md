---
title: A review of the Glom graphical database front-end
date: "2006-09-04"
url: /blog/2006/09/04/a-review-of-the-glom-graphical-database-front-end/
categories:
  - Databases
---
[Glom][1] is an interesting graphical database front-end I've been meaning to try out for some time. Someone asked about graphical database front-ends on the #mysql IRC channel recently, and that prompted me to install Glom and learn how to use it. My overall impressions? It lands squarely in the middle of its target audience's needs, but still has a quirk here and there. With a bit of polish it will be a fine product, and it's already a winner over Microsoft Access and Filemaker, two similar programs with which you might be familiar. In this article I'll walk through installing and configuring Glom, a simple database design, a quick peek under the hood, an archaeologist's experiences using it, and give my opinions about Glom in detail.

### Introduction to Glom

Glom is a [GTK+][2] front-end to [PostgreSQL][3], advanced open-source relational database software that is used widely for mission-critical business applications. Having a powerful relational back-end means it is built on serious technology, with all the advantages that gives. The choice of front-end technology gives it a very nice cross-platform graphical interface that runs natively on the [Gnome][4] desktop, and can run on Microsoft Windows and other platforms (though I don't think Glom itself has been ported to anything besides GNU/Linux).

Glom lets you create simple database interfaces in a manner similar to Filemaker Pro or Microsoft Access, though it is far easier to use and has a true relational database behind it. With Glom you create the database and the interface together, not separately. Glom requires no programming -- it just requires understanding your data model, which of course is a prerequisite to doing quality work in any similar product. If you know Python and want to add more functionality to your interface, you can add Python code to buttons and for generating calculated fields.

Glom has just one developer at this time, the talented [Murray Cumming][5], who is also a developer or lead developer for several other important Free/Open-Source projects.

### Installation

As I said, a message on an IRC channel spurred me to set aside time to install and use Glom. I've been reading articles about it for quite a while, with mounting interest each time, but never made time to try it out. I decided I would write an article about my experience, so I approached the project with the goal of doing a "typical" installation and creating some "typical" database just for fun. I searched the web for information about Glom and found very little written about it ahead of time, so I decided to try to fill in some gaps in what I did find.

Glom is packaged for installation on [Ubuntu GNU/Linux][6], and is said to be dead simple to install. I decided not to install it on my Ubuntu laptop, and take the road slightly less travelled -- I installed it on my [Gentoo][7] desktop machine instead. I did this because it seems people who install Glom on Ubuntu generally have a smooth experience, but I couldn't find much written about installing it elsewhere.

Glom's website has information about installing it on Gentoo by using the popular [Break My Gentoo][8] unofficial e-build repository. Though it sounds like an invitation to disaster, in fact it is just a repository of e-builds that have not yet gotten into the main Gentoo Portage tree, and you should not fear it. That said, this was my first experience using a Portage overlay. Assuming your Gentoo system has [Subversion][9] installed, and you don't yet have any Portage overlays either, the following commands (executed as root) should do the trick:

<pre>cd /usr/local/
svn co https://svn.breakmygentoo.org/bmg-main/
echo 'PORTDIR_OVERLAY="/usr/local/bmg-main"' >> /etc/make.conf
echo dev-db/glom >> /etc/portage/package.keywords
echo dev-cpp/bakery >> /etc/portage/package.keywords
echo dev-cpp/libgdamm >> /etc/portage/package.keywords
emerge -av dev-db/glom</pre>

In words: I checked out the Break My Gentoo tree to `/usr/local/bmg-main`, added that directory as a Portage overlay, unmasked Glom and two of its dependencies, and then started the `emerge` process. I ran this on my AMD64 system on 2006-09-01 and it worked fine for me. I ended up with version 1.0.4 of Glom, 2.4.0 of bakery, and 1.3.7 of libgdamm from the Break My Gentoo tree. Everything else was installed from the standard Gentoo Portage tree.

After I added the Portage overlay directory, newer packages for much of my system became available, and I don't want to stray outside Portage for most of my system software, so I removed the overlay from `/etc/make.conf`.

I already had the latest stable PostgreSQL installed from Portage, which is version 8.0.8. I decided to stay with this version instead of upgrading to version 8.1, which is considered stable on many other distributions, because I wanted to do a fairly "conservative" installation, mimicking the type of system a risk-averse business might want to build.

### Configuring PostgreSQL

You need to create a database user that can create and edit databases. Glom also requires PostgreSQL to accept connections over TCP/IP, which it doesn't do by default. If you already have PostgreSQL configured to allow remote connections, you can skip this step. Otherwise, you should follow the instructions on Glom's website, which you can find by following a link from the Download page. Here's what I did to set everything up correctly:

First I started PostgreSQL and added it to the default runlevel, so it will start automatically: 

<pre>/etc/init.d/postgresql start
rc-update add postgresql default</pre>

I added a PostgreSQL user called `glom`. For reasons I'll explain in a bit, I also created a `glom` database:

<pre>xaprb@tigger ~ $ su -
root@tigger ~ # su - postgres
postgres@tigger ~ $ createuser -P
Enter name of user to add: glom
Enter password for new user: 
Enter it again: 
Shall the new user be allowed to create databases? (y/n) y
Shall the new user be allowed to create more new users? (y/n) y
CREATE USER
postgres@tigger ~ $ createdb glom
CREATE DATABASE
postgres@tigger ~ $ exit</pre>

You don't have to create the     `glom` database, but it makes it easier to verify your user is set up correctly, as you'll see later.

As root, I edited the PostgreSQL configuration files to allow TCP/IP connections: 

<pre>root@tigger ~ # vim /var/lib/postgresql/data/postgresql.conf
# I added the following line:
listen_addresses = '*'
root@tigger ~ # vim /var/lib/postgresql/data/pg_hba.conf
# I added the following line:
host    all         all         0.0.0.0 0.0.0.0               md5</pre>

These steps took a careful eye; I made some mistakes at first, because I'm not that familiar with configuring PostgreSQL.

I restarted PostgreSQL. It is **not** necessary to restart the computer: 

<pre>/etc/init.d/postgresql restart</pre>

If you made mistakes, as I did, you may think it restarted, but it actually didn't. I took a look at the log to see what was the matter: 

<pre>root@tigger ~ # tail /var/lib/postgresql/data/postgresql.log
FATAL:  unrecognized configuration parameter "listen_address"
FATAL:  unrecognized configuration parameter "listen_address"</pre>

I needed to say `listen_address<strong>es</strong>` in postgresql.conf. Unfortunately Gentoo thought PostgreSQL was already started, so trying to start or stop it failed; I had to "zap" it to proceed:

<pre>/etc/init.d/postgresql zap</pre>

Eventually I got the user and database created, and PostgreSQL listening for TCP/IP connections.

At this point, I recommend you make sure the user you created can connect to PostgreSQL. If it can't, you may have misconfigured PostgreSQL, created the user wrong, or had some other trouble. To verify all is well, connect via the command-line client:

<pre>xaprb@tigger ~ $ psql -h localhost -W -U glom
Password: 
Welcome to psql 8.0.8, the PostgreSQL interactive terminal.</pre>

If you see the welcome message, everything is fine. Explicitly specifying `-h localhost` causes `psql` to connect via TCP/IP, so this is a good way to verify your configuration is correct. This is why I created a `glom` database before, by the way. If I didn't do that, my connection attempt would be rejected because it automatically tries to connect to a database named the same as the user. Maybe a PostgreSQL expert can write in a better way to do this, but I'm still new at this, so I just took the simple route.

### Starting Glom

Once the configuration is all done, you're ready to start Glom. I recommend you do this by opening a terminal and typing `glom`, so you have a place to see any debugging output, instead of starting it from a system menu. This helped me troubleshoot configuration issues.

In [Xfce][10], my preferred graphical environment, Glom appears under the "Office" entry in the desktop menu. I don't know where it is in Gnome or [KDE][11].

If all is well, Glom will start and ask you if you want to create a new database, create a new database from a sample, or open an existing database.

### Configuration troubles

At this point, I ran into some troubles. The first issue was Glom couldn't connect to PostgreSQL, even though I could connect on the command-line. Fortunately a quick web search turned up the issue: libgda, which Glom uses as a database abstraction library, wasn't compiled with support for PostgreSQL. This is my fault. I have the `postgresql` USE flag turned off globally in `/etc/make.conf`, to avoid building extra dependencies for many packages. I added the USE flag and re-compiled the library:

<pre>root@tigger ~ # echo gnome-extra/libgda postgres >> /etc/portage/package.use
root@tigger ~ # emerge libgda</pre>

This solved the connection issues. Now I could log in as the `glom` user I created before, and I was able to create a new database, but I couldn't switch Glom from Operator mode to Developer mode. I could create an empty database, but pretty much nothing else. I couldn't create tables, and many menus and menu entries were grayed out. When I tried to use the User Level menu to switch from Operator to Developer mode, Glom displayed an error dialog saying "Developer mode not available. Developer mode is not available. Check that you have sufficient database access rights and that the glom file is not read-only." Here's a screenshot:

[<img src="/media/2006/09/thumb-glom-developer-mode-not-available.png" width="200" height="66" alt=""Developer mode is not available. Check that you have sufficient database access rights and that the glom file is not read-only />][12]

This also turned out to be a minor configuration issue, but Glom's documentation is a bit thin at the time of writing, so it took me a while to understand what was wrong. Fortunately, because I'd started Glom from a terminal, I was also able to see some debugging output, which gave me a hint:

<pre>DEBUG: User=glom is _not_ in the developer group on the server.</pre>

My first attempt to solve this was just to add a `developer` group in PostgreSQL, and add the `glom` user to the group:

<pre>xaprb@tigger ~ $ psql -h localhost -W -U glom
   [ snipped  some output ]
glom=# create group developer;
CREATE GROUP
glom=# alter group developer add user glom;
ALTER GROUP
glom=# \q</pre>

This didn't solve the problem. I dropped the `developer` group to clean up the clutter I'd just created, and tried web searches. I saw some messages on the Glom mailing list about the same problem, starting with this thread about [problems with Glom not letting the user switch to Developer mode][13]. According to the message and its follow-ups, Glom wanted my user to belong to a group called `glom-developer`, not just `developer`. This still didn't solve the issue, though!

I was getting a bit frustrated with the lack of documentation, and was just about to go read the source code and find the problem, but I stumbled upon another message on the mailing list. This message said the issues could be solved by creating a new database *from the provided sample file*, which would set up any needed groups in PostgreSQL. I opened the example, which was in `/usr/share/glom/doc/examples/`, and it added a group called `glom_developer` (underscore, not hyphen). This fixed the problem at last.

Though this was a minor issue, it really was annoying. I've since edited the installation documentation to indicate the required group memberships. If you want to configure PostgreSQL correctly without using the example database, run the following from within `psql`:

<pre>glom=# create group glom_developer;
CREATE GROUP
glom=# alter group glom_developer add user glom;
ALTER GROUP</pre>

This is for PostgreSQL prior to version 8.1, which has a significantly different permission system; I imagine in 8.1 you would say `CREATE ROLE... ALTER ROLE`, though I've not tried it.

### Creating a simple database

Finally, I was really ready to create a simple database project. I decided to create a database that would keep track of servers and software in a corporate network. I wanted to store information about servers, software, and which software is installed on which servers. When Glom showed me the initial screen, I chose "New," typed the name of the XML file defining the database ("servertest"), and accepted the default database title ("Servertest"). Glom next presented me with a login dialog, asking me to connect to PostgreSQL:

[<img src="/media/2006/09/thumb-glom-connect.png" width="200" height="127" alt="Glom screenshot: connecting to the database" />][14]

It filled the username field with my Unix username, not "glom," so I changed that to "glom" and typed the PostgreSQL password. The next screen I saw was the "Tables in database" dialog, which showed no tables. I created three tables: Server, Program, and Installation. This screen doesn't allow you to define columns for tables; all you can do is create named tables:

[<img src="/media/2006/09/thumb-glom-tables-in-database.png" width="142" height="142" alt="Glom screenshot: tables in database" />][15]

After I closed this dialog, Glom displayed the Installation table in list view, I guess because it's the first table in alphabetical order:

[<img src="/media/2006/09/thumb-glom-list-mode.png" width="200" height="145" alt="Glom screenshot: table contents in list mode" />][16]

Glom creates three columns for every table by default: description, comments, and an auto-incrementing integer ID field. I decided not to change the `Server` and `Program` tables, and just accepted the defaults, but I needed to record which machine and program an installation represents. I chose the Developer->Fields menu to edit the `Installation` table, and added columns called `server` and `program`:

[<img src="/media/2006/09/thumb-glom-define-fields.png" width="200" height="118" alt="Glom screenshot: defining fields in a table" />][17]

Then I switched to the Details view of the Installation table, which will eventually allow me to enter information about where a program is installed:

[<img src="/media/2006/09/thumb-glom-details-mode.png" width="200" height="145" alt="Glom screenshot: table contents in details mode" />][18]

This isn't very useful for entering data as it is. I want a pull-down menu of servers and programs, and I want those fields first in the display, before the `Description` and `Comments` fields. To create the pull-down menus, I first defined relationships between the tables. I selected the "Developer->Relationships for this table" menu entry, which showed the Relationships dialog. I added relationships from my newly added columns to the ID columns of the `Program` and `Server` tables:

[<img src="/media/2006/09/thumb-glom-relationships.png" width="200" height="75" alt="Glom screenshot: defining relationships" />][19]

Next I chose the Developer->Layout menu, which shows the fields and some controls for formatting and editing them:

[<img src="/media/2006/09/thumb-glom-layout.png" width="200" height="129" alt="Glom screenshot: layout mode" />][20]

I selected the `server` field and clicked the Formatting button to control how it's presented. I chose "Use custom formatting" and selected "Choices from Related Records," then chose the `Installation_To_Server` relationship. I also chose to restrict the data to these choices, so a user can't enter a server that doesn't exist:

[<img src="/media/2006/09/thumb-glom-formatting.png" width="105" height="200" alt="Glom screenshot: defining field formatting" />][21]

I repeated the process for the `program` field. Next, I brought those fields up to the front of the display, by selecting them in the Layout dialog and using the Up buttons. After I accepted these changes, the Details view looks much more usable:

[<img src="/media/2006/09/thumb-glom-details-mode-improved.png" width="200" height="145" alt="Glom screenshot: details mode after changing field formatting" />][22]

If I had not restricted the data to the choices in the related records, the pull-down menus would have been combo boxes, and if I had selected the checkbox in the Relationships dialog to allow editing related records, changes made by typing in the combo boxes could be propagated through to the related records. I chose not to use these more advanced features for this simple demo, though. I also chose not to use a wealth of other advanced features, such as date fields, which automatically generate a GTK+ date chooser, etc etc.

In order to create entries in the `Installation` table, I need to create some entries in `Server` and `Program`. I did this easily from the list views of those tables, but first, I edited the tables so their ID columns are auto-incrementing. If I'm going to have a surrogate key, it might as well auto-increment! Once I created those entries, my pull-down menus were nicely populated:

[<img src="/media/2006/09/thumb-glom-details-editing.png" width="200" height="125" alt="Glom screenshot: details mode, editing a record" />][23]

And the resulting data, in list mode:

[<img src="/media/2006/09/thumb-glom-list-mode-with-data.png" width="200" height="125" alt="Glom screenshot: list mode, showing the newly entered data" />][24]

That's as far as I'll go with this basic intro to designing and using databases with Glom. If you are interested in the more advanced features, you should take a look at the sample applications that come with it.

### How the backend is created

I poked around to see what Glom really does behind the scenes. This is something I'm always curious about when I use any abstraction or front-end, especially a front-end to a database, which I'm used to tuning and tweaking to my exact specifications.

First of all, when creating a new database, Glom names it with a `glom_` prefix, and creates two tables as soon as you submit your password. It never shows you these tables, but I looked at the newly created database through `psql` to see what was there before I created any user-defined tables. In my case the database is called `glom_servertest`. Here are the two default tables:

<pre>glom_servertest=# \d
                  List of relations
 Schema |            Name            | Type  | Owner 
--------+----------------------------+-------+-------
 public | glom_system_autoincrements | table | glom
 public | glom_system_preferences    | table | glom
(2 rows)</pre>

The user-defined tables aren't named with a prefix, so after I defined tables for my sample application, I had the following tables:

<pre>glom_servertest=# \d
                  List of relations
 Schema |            Name            | Type  | Owner 
--------+----------------------------+-------+-------
 public | Installation               | table | glom
 public | Program                    | table | glom
 public | Server                     | table | glom
 public | glom_system_autoincrements | table | glom
 public | glom_system_preferences    | table | glom
(5 rows)</pre>

I looked at the columns in the tables. In every case a hidden `glom_lock` column was added to the table. Otherwise the tables look pretty straightforward, and the columns use generic data types.

I don't understand why Glom creates these extra tables. It stores so much data in the .glom XML file, I'd expect it to put this data there, too. Either that, or put it all into the database. I find the mixture a little strange.

### Quirks, bugs, and annoyances

Glom is not perfect. I found many areas where something could be improved, but I don't want to give the impression that I didn't like it. Nevertheless, the list is pretty long:

1.  Documentation is skimpy. The best documentation on what Glom can do, and how to do it, is hidden in the "screenshots" section of the Glom website. Fortunately, it's a wiki, so anyone can edit it (hint, hint).
2.  The interface sometimes does things you don't expect. It's easy to create spurious records, for example. Likewise, it's easy to think you've edited something in the designer interface, and navigate away from a screen, then discover later your work didn't get saved.
3.  The designer interface isn't quite consistent everywhere. For instance, it's possible to open the Formatting dialog from a couple different places, but I've only found one way to have the changes really saved.
4.  The editing interface seems to assume every table will have an auto-incrementing numeric primary key, but the primary key field the table editor creates isn't auto-increment; you have to drill down into an editor dialog to assign that property, even though the field appears in a list of auto-increment fields in the Developer->Database Preferences dialog.
5.  The database user always defaults to my Unix login, even after I've logged in as a different user. This can be changed by hand-editing the .glom XML file, but apparently nothing in Glom sets this value through a preference setting or anything like that.
6.  Some features can crash the program completely, for instance certain functions while creating reports.
7.  Reports are related to tables, so it can be confusing to not find the reports you expect just because you have a different table selected. In fact, at first it seemed the reports were appearing and disappearing randomly.
8.  When I tried to create a new database called Glom-test-1, there was a database error, which leads me to believe Glom may not be quoting things correctly when it sends SQL to the database server.
9.  Glom doesn't like multi-column primary keys. When I tried changing a PK to be multi-column, Glom completely crashed: 
    <pre>Glom  Base_DB::query_execute(): Error while executing SQL
  ALTER TABLE "Installation" ADD PRIMARY KEY ("server")
Internal error (Database): ERROR:  multiple primary keys for table "Installation" are not allowed</pre>

10. Apparently Glom wants everything to have a single auto-incrementing numeric primary key. I tried to remove the auto-increment columns, and just use natural data for the keys, but then it had issues entering records in Details mode, giving me errors about not being able to save the data because no primary key was defined. In fact it did save the entry, but not the non-primary-key data, which is very strange. I also noticed that sometimes when I'm in list view and switch to details view, it creates a new entry I don't intend it to make. And it won't let me delete it from there because it says the entry has no primary key. I think it just has issues with non-numeric primary keys.
11. The relationship editor has some issues showing the proper fields in the parent table; I chose the `Server` table and it showed me available columns from `Program`. Clicking around to other items in the dialog, then returning to that relationship editor, solved the problem; apparently it just needed to freshen its view of the data or something.

At this point, Glom has many features and capabilities, and some need improvement, but how does this really affect its usability? To answer this question, I conducted rigorous usability testing.

### Usability from a novice's point of view

Okay, so I didn't really conduct rigorous tests. Okay, I didn't even "conduct tests." What actually happened was my wife looked over my shoulder and asked what I was doing. She's an archaeologist and longtime Mac user, and when I said I was testing out a program that is similar to Filemaker, she got very excited and stole the mouse and keyboard from me. To keep up appearances and pretend it was really my idea to do this anyway, I got a piece of paper and a clipboard, stood behind her and wrote down what happened as she tried to use the program.

You may not think an archaeologist is a good person to do this kind of test, but archaeologists are ideal users for Glom. Archaeologists record tons of data about what they find, and in my experience, many of them use Filemaker to do it. Glom's developer likens Glom to Filemaker Pro, so getting someone familiar with Filemaker Pro to test-drive it is a great test. Not only did my wife know what she wanted to do, she also had preconceptions about how she ought to be able to do it, which was revealing.

One thing I did right in the test: I let her do it on her own. Okay, I mostly did. This actually happened just at the instant I got everything configured correctly, so I hadn't had a chance to form any of my own preconceived notions. I really couldn't give her good guidance even if I wanted to.

She alternately designed, fought, and went in circles for about half an hour, trying to create a simple database that would keep track of our travels together, when they happened, and how much we spent on them. She bumped into lots of Glom's bugs, caused it to crash a lot, and got very confused by her notions about "files" (I'm not sure whether her idea of "file" maps to a table, a database, or something else). It was a bit painful to watch her struggle with the interface quirks, her limited knowledge of relational design, and the program's bugs. However, at the end of the half-hour, she had a database that essentially did what she wanted, and she knew the program well enough that she'd probably be fine if she had to use it for her work.

And that concludes my, ahem, rigorous testing.

### The three bears: is Glom too simple, too complex, or just right?

What is Glom's target audience? It seems to be small businesses, archaeologists and similar professionals or academics who need a graphical interface, and individuals who want to design a database and data-entry interface that is simplified, but powerful enough to serve basic needs. Another way to look at it is that Glom should be a replacement for Microsoft Access and Filemaker Pro, but in the Free Software world. How well does it achieve these goals?

First of all, consider how Glom hides the database back-end. Glom is an abstraction over PostgreSQL, and as Joel Spolsky famously points out, [every abstraction leaks][25] (worth reading if you're not familiar with that article). Glom tries to protect the developer or operator from really knowing what a database is all about. Data types are genericized; relationships are too. And for the target audience, this really helps. But when things go wrong -- when the underlying database leaks through the abstraction -- it gets frustrating and confusing. I'm no PostgreSQL expert, but I know enough that if it takes me hours to troubleshoot the issues I ran into, an archaeologist really doesn't stand a chance. This would be OK if more of the quirks and bugs were fixed. It's OK to have the abstraction leak very occasionally. In this sense, Glom is too complex. There are still too many things that can go wrong installing and using it. Once more of the bugs are fixed and there's better documentation, I think it will be "just right."

Next, consider the interface itself. How much power does it give the user? Not enough, too much, or just right? I'd have to say "just right." Consider this: if a user needs more power, or has more specific needs for the data, the user either a) is a data expert, and can either make Glom sing and dance as desired, b) is an expert, and can design and use databases directly, or b) needs to hire an expert. One similar system that gives the user significantly more power and complexity is Microsoft Access. I would strongly argue this is a problem. I've used Access for really complex things, such as to design a system to track patient information at a health clinic (I know, I know&#8230; I didn't want to use Access either). Access is a real mess. It's a hodgepodge of Visual Basic and spreadsheets, with a healthy dose of unreliability and stupidity, mixed together with highly complex features. This has led to it being used where it *never* should be used, such as health clinics for example. *If you need that much power, you need to use a **real** relational database.* At some point it's time to stop over-extending simple tools. Likewise, if you need more power than Glom gives you, just use PostgreSQL.

On the flip side, one of Glom's design decisions is not to let the user arrange the interface with infinite precision. This is both a blessing and a curse. It's a blessing because it simplifies, and it's a curse because it simplifies. If you need to make a field a little bit narrower, and move it next to another field, and turn its background bright orange, and&#8230; you can't do it, as far as I can see. Those of you who've used "databases" that look like Halloween decorations will agree this is a blessing, especially since these features are like clip-art -- if you provide them, people will use them lavishly and tastelessly (witness the ubiquitous garishness of most applications developed in-house at my last employer). Besides, Glom actually does a pretty good job of laying out fields nicely -- much better than most people will do by hand, in my experience. And it does give you limited control over grouping fields together, ordering them, and so on. All in all, I think again it's more than good enough for most people's needs.

I have one gripe with Glom's auto-layout, and I expect Filemaker Pro users will agree with this one: to make data entry easy and efficient, one must be able not only to define field order, but tab order as well. Often the tab order and field order must be different. And multi-line text fields in Glom, at least on my system, can be tabbed *to*, but pressing the tab key doesn't leave the field; it enters a tab character in it. This makes Glom cumbersome for rapid data entry.

On the whole, I think Glom is a well-balanced compromise between simplicity and power, and with a bit more polish and documentation, it'll be even better.

### Other similar programs

I'm actually surprised about this, but there don't seem to be many other similar products for the Free Software world. The only other one I found is [Bond][26]: <blockquote cite="http://www.treshna.com/bond/">
  <p>
    Bond is a rapid application development framework for building applications for the linux desktop and the web. Using bond you can quickly build database forms for Gnome Linux, or the web via standard HTML and AJAX or for windows using our win32 version.
  </p>
</blockquote>

I haven't used Bond, so I really can't comment on it other than to say it looks like it's more complex and has more features than Glom.

Another surprise is that neither Glom nor Bond uses MySQL as a back-end, though both say it would be possible.

### Conclusion

As I've shown you, Glom is a simple yet powerful front-end to PostgreSQL, which I think is a good match for many database users' needs in the Free Software world. It has some quirks and lacks good documentation, but is a very promising product. Even though there are still bugs, my wife's experience proved the 1.0.4 version number isn't inflated or boastful; it really is ready for competent users. And since it's built on PostgreSQL instead of just being a front-end to a file, it's potentially much more powerful and useful than proprietary, expensive, non-Free alternatives built on inferior technology.

I hope this article has given you a good overview of Glom. If you found it useful, you should [subscribe][27] to stay current with my upcoming articles.

 [1]: http://www.glom.org/
 [2]: http://www.gtk.org/
 [3]: http://www.postgresql.org/
 [4]: http://www.gnome.org/
 [5]: http://www.murrayc.com/
 [6]: http://www.ubuntu.com/
 [7]: http://www.gentoo.org/
 [8]: http://www.breakmygentoo.net/
 [9]: http://subversion.tigris.org/
 [10]: http://www.xfce.org/
 [11]: http://www.kde.org
 [12]: http://www.xaprb.com/media/2006/09/glom-developer-mode-not-available.png
 [13]: http://mail.gnome.org/archives/glom-devel-list/2006-March/msg00001.html
 [14]: http://www.xaprb.com/media/2006/09/glom-connect.png
 [15]: http://www.xaprb.com/media/2006/09/glom-tables-in-database.png
 [16]: http://www.xaprb.com/media/2006/09/glom-list-mode.png
 [17]: http://www.xaprb.com/media/2006/09/glom-define-fields.png
 [18]: http://www.xaprb.com/media/2006/09/glom-details-mode.png
 [19]: http://www.xaprb.com/media/2006/09/glom-relationships.png
 [20]: http://www.xaprb.com/media/2006/09/glom-layout.png
 [21]: http://www.xaprb.com/media/2006/09/glom-formatting.png
 [22]: http://www.xaprb.com/media/2006/09/glom-details-mode-improved.png
 [23]: http://www.xaprb.com/media/2006/09/glom-details-editing.png
 [24]: http://www.xaprb.com/media/2006/09/glom-list-mode-with-data.png
 [25]: http://www.joelonsoftware.com/articles/LeakyAbstractions.html
 [26]: http://www.treshna.com/bond/
 [27]: http://www.xaprb.com/blog/subscribe/
