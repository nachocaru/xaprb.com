---
title: How triggers affect ROWCOUNT and IDENTITY in SQL Server 2000
date: "2005-12-23"
permalink: /2005/12/23/rowcount-and-identity/
description:
  - >
    This article explains how to use ROWCOUNT and IDENTITY safely in SQL Server 2000
    when there is a trigger on the base table.
---
It's safe to use `@@ROWCOUNT` in SQL Server 2000 even when there is a trigger on the base table. The trigger will not skew your results; you'll get what you expect. `@@ROWCOUNT` works correctly even when `NOCOUNT` is set.

<p style="text-align:center">
  <img src="/articles/images/rowcount.png" width="215" height="136" alt="Silly rowcount/identity graphic" />
</p>

To quote the documentation:

> @@ROWCOUNT
> 
> Returns the number of rows affected by the last statement.

Couldn't be much simpler. Getting the last `IDENTITY` value is not as straightforward though. There are several options: `@@IDENTITY`, `SCOPE_IDENTITY()`, and `IDENT_CURRENT()`. You can read up on the differences, but the one you probably want to use is `SCOPE_IDENTITY()`. It gives you the last value in the current scope, which means it won't be affected by triggers or other connections. The other two methods could give bizarre results depending on what else is going on in the database. They have their uses, but only in specialized cases.
