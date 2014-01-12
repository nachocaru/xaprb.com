---
title: Why high-availability is hard with databases
date: "2010-04-26"
permalink: /2010/04/26/why-high-availability-is-hard-with-databases/
categories:
  - Databases
  - High Availability
---
A lot of systems are relatively easy to make HA (highly available). You just slap them into a well-known HA framework such as Linux-HA and you're done. But databases are different, especially replicated databases, *especially* replicated MySQL.

<img src="http://www.xaprb.com/blog/wp-content/uploads/2010/04/matchbox_car-300x200.jpg" alt="Matchbox Car" title="Matchbox Car" width="300" height="200" class="alignnone size-medium wp-image-1779" style="float:right" />The reason has to do with some properties that hold for many systems, but not for most databases. Most systems that you want to make HA are relatively lightweight and interchangeable, with little to zero statefulness, easy to start, easy to stop, don't care a lot about storage (or at least don't write a lot of data; that's usually delegated to the database), and there's little or no harm done if you ruthlessly behead them. The classic example is a web server or even most application servers. Most of the time these things are all about CPU power and network bandwidth. If I were to compare them to a car, I'd say they are like matchbox cars: there are many of them, and they are cheap and easy to replace.

<img style="float:right" src="http://www.xaprb.com/blog/wp-content/uploads/2010/04/mining-truck-300x242.jpg" alt="Mining Truck" title="Mining Truck" width="300" height="242" class="alignnone size-medium wp-image-1783" />Databases are different. With or without replication, you're looking at a system that is complex, stateful, heavyweight, and cares a lot about storage. It runs on bigger hardware with fast disks and a lot of memory. It's usually disk-bound, and it does a lot of writes. It's hard to start -- it takes a long time to warm up and really get ready to serve production workloads (many minutes, hours, or even days). It tends to run with a lot of data in memory in a dirty state, so shutdown is slow, because a clean shutdown requires flushing a bunch of data to disk. If you yank its power plug or kill-dash-nine it, it'll have to perform recovery on startup, which slows the startup process even more. If I were to compare a database server to a car, I wouldn't even use a car as the analogy: I'd use one of those big-ass mining trucks. If your mining truck breaks down, you don't just toss it in the trash and pull another off the shelf.

The problem with a lot of HA solutions is that they want to deal with inconsistencies or irregularities by killing the resource and replacing it in another location. This works fine with web servers, but not with database servers. Doing that will cause serious pain and downtime, defeating the point of HA. And when you add replication into the mix, it gets even worse. A system that wants to manage replication needs to deal with very complex conditions. A lot of replication failures are delicate matters that require skilled human intervention to solve. The HA solution must insulate the application from the misbehaving resource, but leave it running so the human can handle things.

This is not the way most applications are made HA. It's different with databases, and it's much harder.
