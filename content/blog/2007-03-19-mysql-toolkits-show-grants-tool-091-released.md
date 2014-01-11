---
title: "MySQL Toolkit's Show Grants tool 0.9.1 released"
date: "2007-03-19"
permalink: /2007/03/19/mysql-toolkits-show-grants-tool-091-released/
description:
  - "MySQL Toolkit's Show Grants tool can now separate grants and convert them into REVOKE statements to help you remove grants and users."
---
<p class="download">
  <a href="http://code.google.com/p/maatkit/">Download MySQL Show Grants</a>
</p>

MySQL Toolkit's Show Grants tool can now separate grants into individual statements, convert them into `REVOKE` statements, and help you remove users from a server, even if your server doesn't support `DROP USER`.

### Changes

The comment on my last post, combined with my need to revoke some grants today on a server that accidentally got grants replicated to it, prompted me to add more functionality to this tool. It can now:

*   Separate grants into individual statements, one grant per line. Instead of a line with `GRANT SELECT, INSERT...` you can now see one line for each grant, if you wish. This makes it easier to pipe the output through other tools to select only the grants you want, and actually makes the output more diff-friendly too.
*   Convert `GRANT` statements into equivalent `REVOKE` statements (also one at a time if you wish). This makes it easier to remove specific grants from a user.
*   Add `DROP USER` and other statements to help you completely remove a user's account. MySQL historically has three ways to do this. In recent versions you can just say `DROP USER` and it gets rid of the user and all the user's grants. In older versions this command didn't remove the grants, so you still had to manually remove those &#8212; a tedious process. And in even older versions there's no `DROP USER` command at all; you have to `REVOKE` everything, then `DELETE` from the user table and `FLUSH PRIVILEGES`. The tool now has options to create these statements for you.

### The temptation I resisted

I had to resist the temptation to add more options, for example to entirely remove the `GRANT` statements so the tool will merely output the statements required to remove a user. But I think that's feature creep; you can easily pipe the output through `grep -v "^GRANT"` and do it yourself.

Still, if you'd find this or other features useful, let me know.

### About MySQL Toolkit

[MySQL Toolkit][1] is a set of essential tools for MySQL users, developers and administrators. The project's goal is to make high-quality command-line tools that follow the UNIX philosophy of doing one thing and doing it well. They are designed for scriptability and ease of processing with standard command-line utilities such as `awk` and `sed`. Other tools in the toolkit include a table checksummer and a duplicate key checker.

 [1]: http://code.google.com/p/maatkit
