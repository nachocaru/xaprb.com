---
title: Using Devel::FastProf to find slow Perl code
permalink: /2009/02/23/using-develfastprof-to-find-slow-perl-code/
categories:
  - Coding
  - Perl
tags:
  - profiling
---
I've been profiling a Perl program recently with [Devel::FastProf][1], and I had a little bit of a hard time finding one of my hot spots. I had a construct like the following: 
<pre>if ( $condition_one ) {
  # some code
}
elsif ( $other_condition ) {
  # code
}
elsif ( my (@temp) = $text =~ m/(complex) (regex)/g ) {
  # some other code
}
elsif {
  # and so on
}
</pre>

Devel::FastProf showed me that my hot spot in the code was the very first line. I could not understand why. I tried a few different things &#8212; always the same result.

Then it hit me. The way I write the code and what the Perl compiler turns it into aren't the same things at all. Ever tried to debug an if/elsif/elsif statement in Perl's debugger? You get to step up to the first line, but then immediately afterwards you drop into the case that matched &#8212; you don't get to step over each condition check in turn.

Perl treats them all as one statement. And my hot spot was really the third conditional check. I fixed it by replacing that with a simple regular expression and doing the complex parsing inside the block.

 [1]: http://search.cpan.org/~salva/Devel-FastProf-0.08/lib/Devel/FastProf.pm
