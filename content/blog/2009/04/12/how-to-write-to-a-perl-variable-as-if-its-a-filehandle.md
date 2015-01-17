---
title: "How to write to a Perl variable as if it's a filehandle"
date: "2009-04-12"
url: /blog/2009/04/12/how-to-write-to-a-perl-variable-as-if-its-a-filehandle/
categories:
  - Open Source
  - Programming
---
This is really cool. I just learned this: you can treat a Perl variable just like a filehandle (read, write, etc).

<pre>my $buffer = "";
open my $fh, ">", \$buffer or die $OS_ERROR;
print $fh "hello, world\n";
</pre>

Now `$buffer` contains "hello, world\n". You can do the same kinds of things when reading from a variable.

I knew you could do it with IO::Scalar, but while refreshing my memory on that, I stumbled upon this -- who needs IO::Scalar anymore?

This is going to make a lot of tests in Maatkit easier to write.
