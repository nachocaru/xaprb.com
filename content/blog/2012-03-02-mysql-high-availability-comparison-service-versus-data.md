---
title: 'MySQL high availability comparison: service versus data'
author: Baron Schwartz
layout: post
permalink: /2012/03/02/mysql-high-availability-comparison-service-versus-data/
categories:
  - SQL
---
When people ask me about high availability, I often suggest that it's helpful to understand whether you're most interested in service availability, data availability, or both. Of course, you want both &#8212; but if cost is an object, you may end up relaxing your requirements.

The typical example of an application that needs service availability but doesn't have strong data availability requirements is something that's ad-supported. Who cares if the last few comments on funny cat photos are lost? What's important is that the users can see the photos, and the ads next to them.

On the other hand, if you're selling something, it's a big deal to lose records about orders or payments. In this case, if you can't have both kinds of availability, you might prefer downtime over data loss.

Here's a quick comparison of some MySQL high availability technologies. All opinions are mine alone:

<table>
  <tr>
    <th>
      Technology
    </th>
    
    <th>
      Data Availability
    </th>
    
    <th>
      Service Availability
    </th>
    
    <th>
      Notes
    </th>
  </tr>
  
  <tr>
    <th>
      MySQL Replication
    </th>
    
    <td>
      Poor
    </td>
    
    <td>
      Fair
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <th>
      MySQL Semi-Sync Replication
    </th>
    
    <td>
      Fair
    </td>
    
    <td>
      Fair
    </td>
    
    <td>
      <a href="http://www.mysqlperformanceblog.com/2012/01/19/how-does-semisynchronous-mysql-replication-work/">[1]</a>
    </td>
  </tr>
  
  <tr>
    <th>
      MySQL Cluster (NDB)
    </th>
    
    <td>
      Good
    </td>
    
    <td>
      Good
    </td>
  </tr>
  
  <tr>
    <th>
      Percona XtraDB Cluster (Galera)
    </th>
    
    <td>
      Good
    </td>
    
    <td>
      Good
    </td>
    
    <td>
      <a href="http://www.percona.com/software/percona-xtradb-cluster/">[2]</a>
    </td>
  </tr>
  
  <tr>
    <th>
      DRBD
    </th>
    
    <td>
      Good
    </td>
    
    <td>
      Fair
    </td>
  </tr>
  
  <tr>
    <th>
      SAN Replication
    </th>
    
    <td>
      Good
    </td>
    
    <td>
      Fair
    </td>
  </tr>
</table>

In a lot of cases the answer should really be "it depends." For example, depending on how you set it up, the amount of service downtime you'll experience during a DRBD failover can be quite long or quite short, due to factors such as the need to warm up the MySQL server before it's actually usable. Hopefully this (admittedly broad-brush) overview is helpful in understanding the possibilities.
