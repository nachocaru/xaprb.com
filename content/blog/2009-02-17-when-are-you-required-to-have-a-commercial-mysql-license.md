---
title: When are you required to have a commercial MySQL license?
date: "2009-02-17"
permalink: /2009/02/17/when-are-you-required-to-have-a-commercial-mysql-license/
categories:
  - Databases
---
As you may know, MySQL has a dual-licensing model. You can get the source under the [GPL version 2][1], or you can buy a commercial license.

I've recently been hearing a lot of confusion about when you have to buy a commercial license. People I've spoken to wrongly believe that they're required to purchase a license if they're going to use MySQL in anything but a not-for-profit business, for example. I don't know how these notions get started, but they do.

So when are you required to buy a commercial license? It's very simple: when you want to do something with MySQL that the GPL doesn't permit.

<!--more-->

I am not a lawyer, and you should do your own legal research, but misinterpretation of the GPL is *rampant* and I think I should try to counteract the misinformation about it if I can. Note that in this article I will [use the word "Free" very carefully, as used by the Free Software Foundation][2]. *If you do not know what Free Software is, you should learn.*

Here are some things the GPL allows:

*   The GPL allows you to run a for-profit business on MySQL.
*   The GPL allows you to modify the MySQL source code in any way you want.
*   The GPL allows you to sell MySQL.
*   The GPL allows you to redistribute MySQL.
*   The GPL allows you to redistribute your modifications of MySQL.

And you **don't have to ask anyone's permission or pay anyone** for the right to do this. Are you shocked? You shouldn't be.

The above come with some restrictions, but those restrictions are (broadly speaking) only to prevent you from making the software less Free. So, for example, if you sell or redistribute, you have to do it under the GPL too. You cannot strip the GPL or encumber part of the software and then pass on a less-Free version of the software to others.

Here are some things the GPL does *not* require:

*   The GPL doesn't require you to redistribute your modifications to MySQL.
*   The GPL doesn't require you to GPL-license any software that merely connects to MySQL.
*   The GPL doesn't require you to GPL-license all the software in your company.

So if you have to buy a commercial license for things the GPL doesn't permit, what are those? Here are a couple of scenarios I can think of.

*   You need a commercial license if you want to modify MySQL and redistribute the result as non-Free software.
*   You need a commercial license if you want to embed MySQL within your non-Free program. Note that *embed* is not the same as "make a connection to."

Since these things are not permitted under the GPL, you need to buy the right to use the MySQL source code under a non-GPL license. That's where the dual-licensing comes in.

MySQL is very careful in their marketing materials. So far I cannot recall hearing anyone from MySQL say that you have to have a commercial license for some purpose that doesn't require it. Sometimes they say things like "MySQL Enterprise is for people who want to make money with MySQL." This marketing message may be unclear to a person who doesn't know the freedoms guaranteed by Free Software licenses (i.e. it may leave them with the false impression they have to pay for MySQL if they want to use it to make a profit). But such people can always learn the truth by spending the few minutes necessary to educate themselves about the wonderful freedoms guaranteed by the GPL.

My lists above are just short samples. For examples and demonstrative text that will help clarify the GPL further, you should read the [GPL FAQ][3].

 [1]: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 [2]: http://www.gnu.org/philosophy/free-sw.html
 [3]: http://www.gnu.org/licenses/old-licenses/gpl-2.0-faq.html
