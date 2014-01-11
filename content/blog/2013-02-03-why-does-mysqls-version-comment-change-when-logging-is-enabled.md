---
title: "Why does MySQL's version comment change when logging is enabled?"
date: "2013-02-03"
permalink: /2013/02/03/why-does-mysqls-version-comment-change-when-logging-is-enabled/
categories:
  - SQL
---
I wonder if the MySQL archaeologists out there would be willing to unearth some (presumably ancient) history for me. Why does the logging configuration merit special mention in the version_comment variable?

The more I think about this, the more bizarre it seems. I enabled logging. The version reported by the server changed. No, really, is my server somehow *a different version of MySQL* now?

    
    130203 15:39:55 [Note] ./bin/mysqld: ready for connections.
    Version: '5.6.7-rc-log'
    

I assume there's a good story behind this somewhere. I'm thinking a priest, a rabbi, and Monty walk into a bar, and black vodka is probably involved at some point too :-)
