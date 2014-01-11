---
title: 'Handling MySQL's warnings in Go code'
author: Baron Schwartz
layout: post
permalink: /2012/12/23/handling-mysqls-warnings-in-go-code/
categories:
  - SQL
---
I was just bitten by failing to catch a MySQL warning. It's the old familiar tune: I inserted 100 characters into a VARCHAR(50) and it didn't throw an error*. Of course, then subsequent SELECT statements didn't find the value I inserted.

What's different this time is that I was using Go as the client. There is no single official MySQL driver for Go, although there are several good-quality community-maintained ones. I was using one of those through the [official Go database interface][1], which is a simple and lightweight way to interact with relational databases. This interface will generate errors, but I didn't think about warnings. This is funny, because usually I'm paranoid about capturing warnings from MySQL and treating them as errors.

After I discovered my mistake, I realized that Go's database interface doesn't provide a way to observe the warnings at all, because they are driver-specific. I suppose the underlying driver could promote warnings to errors, but that is probably not the right way to do things, just in terms of following the principle of least surprise. It would immediately break a lot of functioning applications. For new applications like the one I'm developing, it is arguably the right way to go, because I would have been a lot less surprised if I'd caught the error up front.

What are my options? I can modify the driver as just mentioned, or I can change SQL_MODE to be more strict. I think I'm going to do both, because I want the database not to lie to me about inserting my data, AND I know that's, ahem, less than perfectly implemented. There are other cases where MySQL will proceed and "warn" the client application, and there's no way to turn that into an error. I do wish there was a "all warnings are errors" setting in MySQL.

The root cause of this problem is me: I was developing the application on my laptop, and running MySQL with default settings because it's "just a laptop." This is how applications end up depending on stupid defaults. I recently revisited some code that I wrote for a company in 2006, trying to clean up a reliance on a buggy GROUP BY setting, and in 2012 the company still has the comment in the code: "TODO, change this setting in production and clean up all the SQL that relies on it." It'll never happen if it hasn't happened in 6 years. You'd think I'd have learned not to start a new app's development with stupid buggy settings, but you'd only be partially right!

* Yes, I know this is fixed in Drizzle, and PostgreSQL doesn't allow it, and neither does SQL Server, etc etc.

 [1]: http://golang.org/pkg/database/sql/
