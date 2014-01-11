---
title: Five great Perl programming techniques to make your life fun again
author: Baron Schwartz
excerpt: "<p>If you're a programmer, you know the difference between a beginner and a master is the ability to write succinct code that does a great deal with very little work.  If you can do this, you can easily raise your productivity and the quality of your work by an order of magnitude.  Much more importantly, you can have a lot more fun writing code.  Read on to learn how.</p>"
layout: post
permalink: /2006/10/05/five-great-perl-programming-techniques-to-make-your-life-fun-again/
description:
  - "I demonstrate 5 ways to cut repetition and program declaratively.  It's fun and it's a better way to code."
---
If you&#8217;re a programmer, you know the difference between a beginner and a master is the ability to write succinct code that does a great deal with very little work. If you can do this, you can easily raise your productivity and the quality of your work by an order of magnitude. Much more importantly, you can have a lot more fun writing code. Read on to learn how.

Imagine writing a program with a tenth the code you currently use, ending up with ten times the features, getting fewer bugs, improving performance, and lowering maintenance costs. And imagine taking the tedious, repetitive work out, leaving you more time for inspiration and insight. I&#8217;ve spent my career doing that in many languages, more and more effectively with each new language I learn.

I&#8217;m going to use Perl to demonstrate some techniques to accomplish these goals. Perl is both my first language, and the language in which I&#8217;ve most recently gained some proficiency. It lends itself well to these types of discussions.

### Trick 1: `map` and `grep`

The `map` built-in function is one of the most useful tools in your toolkit. `map` takes a list and applies a code block to every element, returning the list. You can think of it as stream processing: you push the list in one side and get it back on the other side with some transformation applied. Inside the code block, you refer to the current element with the traditional `$_` variable. Here&#8217;s a really simple example: uppercase every element in a list.

<pre>my @lamps = qw(perl php python);
my @uc_lamps = map { uc($_) } @lamps;
# Result: PERL PHP PYTHON</pre>

I just shoved the list in the right side, and it travelled right to left until finally it popped out on the left side and got assigned into `@uc_lamps`. You can do a lot more with `map`, though. In fact, it&#8217;s pretty much infinitely powerful when it comes to transforming lists. It&#8217;s really just a glorified loop, but if you think of it as a transformation from input to output, you can really make some elegant code with it. Here&#8217;s another example &#8212; make a key-value hash out of a delimited string:

<pre>my $input = "a:1,b:2,d:3";
my %output = map { split(/:/, $_) } split(/,/, $input);</pre>

Do you see how that works? As before, start at the right. The `split` function splits the incoming string on the `,` character, and outputs a list. This list goes into the `map` block, which splits each element into key and value. This gets assigned to the hash. That&#8217;s a heck of a lot easier than writing loops, and once you are familiar with it, much easier to read, too.

It&#8217;s also unsafe code. Here&#8217;s why: it doesn&#8217;t check for an odd number of elements in the resulting list, which could happen with input that&#8217;s not delimited as expected, like this:

<pre>my $input = "a1,b:2,d:3,e:f:g";
my %output = map { split(/:/, $_) } split(/,/, $input);</pre>

Assigning an odd number of list elements to a hash breaks the association between keys and values. You should always be saying &#8220;use warnings FATAL => &#8216;all&#8217;&#8221; to catch this, but it&#8217;s better to fix the broken code than to make it throw an error. This is a perfect opportunity for another list-oriented construct, `grep`, which takes a list on the right-hand-side and outputs every element that passes a certain test. Let&#8217;s add a test for splittability, split only into two elements, and re-align the code for readability:

<pre>my $input = "a1,b:2,d:3";
my %output =
   map  { split(/:/, $_, 2) }
   grep { m/:/ }
   split(/,/, $input);</pre>

Now only the valid elements make it into the hash.

### Trick 2: implement defaults with `||=`

One of the most annoying and tedious things you have to do as a programmer is check your inputs. Let&#8217;s just say you&#8217;re doing really basic checking to make sure you even *have* the input you&#8217;re expecting, and if you don&#8217;t, you&#8217;re going to fill it in with defaults. How do you do this? In most languages, you do it with the equivalent of this Perl code:

<pre>sub some_func {
   my ( $a, $b, $c ) = @_;
   if ( !$a ) {
      $a = 5;
   }
   # Real code here
}</pre>

Any experienced programmer knows these one-line `if` statements tend to take up a lot of code. In fact, they are veritable screen hogs, with a lower substance-to-lines ratio than most other programming constructs. Your screen fills with code that does nothing much functional, leaving you less space to see the real code, and less brain-power to think about it too. What can you do to fix this?

In Perl, you can use the `||=` operator. Its precedence rules are such that it&#8217;ll only do an assignment if the value is false (&#8216;false&#8217; generally means zero, undefined, or the empty string):

<pre>$a ||= 5;</pre>

&#8220;But wait just a dang minute!&#8221; you say. There are a bunch of other ways to do this, such as these:

<pre>$a = $a || 5;
$a = 5 unless $a;</pre>

(Rhetorical question: how many other languages even have these alternatives?)

So what&#8217;s so great about the `||=` stuff, if there are so many other good ways to do things? Well, I&#8217;ve only shown you one place you can put `||=` to work. There are a million. Like `map`, once you start using it, you can&#8217;t stop. You can use it for caches, for example:

<pre>my %cache;
sub expensive_operation {
   my ( $key ) = @_;
   $cache{$key} ||= get_from_database($key);
   return $cache{$key};
}</pre>

In this example, getting something from the database is really expensive, so you want to cache it for future calls. The function uses `||=` to check the cache and fetch from the database only if the desired value isn&#8217;t already cached. This is so idiomatic in Perl, it&#8217;s actually called &#8220;the Orcish maneuver&#8221; (for **or cache**). But as I said, it&#8217;s not the only thing you can do. You can use `||=` for sorting on multiple keys, changing light bulbs, and generally achieving world peace.

(Another rhetorical question: why is Visual Basic code so slow to write, so hard to understand, and so verbose? Hint: think about the lack of early termination in `If` statements. `||=` is analogous to early termination.)

### Trick 3: hash and array slices

Have you ever passed around hashes and arrays and wanted to extract only certain elements from them? Let&#8217;s say you have a subroutine that accepts a hash reference. Its job is to reverse the query-string parsing I showed you above. In many languages, you&#8217;d have to loop through the hash&#8217;s keys, concatenating the key and value with `&`, then concatenating these together with `=`. You can use `map()` and `join()` to do this much more simply in Perl, like so:

<pre>sub make_query_string {
   my ( $vals ) = @_;
   return join("&", map { "$_=$vals-&gt;{$_}" } keys %$vals);
}
my %query_params = (
   a =&gt; 1,
   b =&gt; 2,
   c =&gt; 3,
   d =&gt; 4,
);
my $query_string = make_query_string(\%query_params);</pre>

That&#8217;s already a great improvement over looping, especially since doing it with loops requires keeping track of whether you&#8217;re at the first or the last iteration, so you know whether to insert a separator between elements. But what happens when you have a hash that has more keys and values than you want in the query string? This happens a lot. Coincidentally, my boss and I were pair programming *today* and needed to do this exact thing (maybe that&#8217;s why it&#8217;s so fresh in my mind).

The most obvious thing to do is build a new hash with only the keys you want, and send that hash to the subroutine:

<pre>my @desired = qw(a c);
my %new_params;
foreach my $key ( @desired ) {
   $new_params{$key} = $query_params{$key};
}
my $query_string = make_query_string(\%new_params);</pre>

Ooooh, that&#8217;s ugly. We can at least use `map` to get rid of the loop while building the new hash:

<pre>my %new_params = map { $_ =&gt; $query_params{$_} } @desired;</pre>

A hash slice is still better, though. It essentially does what that `map` does, but it&#8217;s easier and clearer:

<pre>my %new_params;
@new_params{@desired} = @query_params{@desired};</pre>

I just read a slice of the values from `%query_params` on the right, and assigned them into another slice with the same keys on the left. Here&#8217;s the whole thing, rewritten:

<pre>sub make_query_string {
   my ( $vals ) = @_;
   return join("&", map { "$_=$vals-&gt;{$_}" } keys %$vals);
}
my %query_params = (
   a =&gt; 1,
   b =&gt; 2,
   c =&gt; 3,
   d =&gt; 4,
);
my @desired = qw(a c);
my %new_params;
@new_params{@desired} = @query_params{@desired};
my $query_string = make_query_string(\%new_params);

print "$query_string\n";</pre>

Though this is a somewhat contrived example in this article, in real life it&#8217;s the furthest thing from contrived. When you write code at a high level of abstraction, many of your subroutines will just receive a hash of this and a list of that, and be expected to &#8220;do the right thing&#8221; without a lot of fuss. Hash slices make this a lot easier.

Array slices are a related concept. You access a subset of the array elements as an entire list by simply defining the indexes you want:

<pre>my @letters = qw(a b c d e f);
my @slice = @letters[1, 4, 3];
# @slice is now b, e, d
@slice = @letters[0..3, 4];
# @slice is now a, b, c, d, f</pre>

### Trick 4: executable regular expressions

If you&#8217;ve programmed in Perl, you&#8217;ve used regular expressions. Perl&#8217;s regular expressions are so powerful, Perl really redefined what it means to process text with a programming language, and regular expressions in most other languages owe a lot to Perl. But even other languages that implement Perl-compatible regular expressions may not implement some of Perl&#8217;s features, because in Perl, regular expressions are an integral part of the language.

One example is the ability to execute the result of a match as code, with the `/e` modifier at the end of a substitution. Here&#8217;s a real-world example. Let&#8217;s search a MySQL foreign key definition for column names and reorder them alphabetically, all in place:

<pre>my $fk = "FOREIGN KEY (`seq`, `name`) REFERENCES `tbl` (`seq`, `name`)";
$fk =~ s#(?&lt;=\()([^\)]+)(?=\))#join(', ', sort(split(/, /, $1)))#ge;
# $fk is now "FOREIGN KEY (`name`, `seq`) REFERENCES `tbl` (`name`, `seq`)";</pre>

If you want to know how that works, read the comments on my earlier post about a [duplicate index and foreign key checker for MySQL][1].

If you&#8217;re like me five years ago, you might think that&#8217;s scary as hell at first. &#8220;Execute arbitrary text as though it&#8217;s Perl code!?!? What moron thought up that security exploit waiting to happen and made it part of the language?!?!?&#8221;

Wait a minute, though. Is it really insecure to match some text and execute it? No, it&#8217;s not. In fact, text you&#8217;ve matched with a regular expression is likely to be far better checked, just by the fact that you&#8217;ve specified what it has to look like, than most other input to your program. This is much more true than you think. In fact, one of the very safest ways to check *any* input to your program is by pattern matching. This is such a powerful way to validate input, it&#8217;s the main way to untaint data when you&#8217;re running in taint mode. This is from the [perlsec][2] man page:

<blockquote cite="http://search.cpan.org/dist/perl/pod/perlsec.pod">
  <p>
    Values may be untainted by using them as keys in a hash; otherwise the only way to bypass the tainting mechanism is by referencing subpatterns from a regular expression match. Perl presumes that if you reference a substring using $1, $2, etc., that you knew what you were doing when you wrote the pattern.<p>
      </blockquote> <p>
        I won&#8217;t go any further into why it&#8217;s inherently safe to use the executable-regular-expression feature, but if you&#8217;re not convinced, talk to an experienced programmer about it. I <em>do</em> want to convince you this is incredibly powerful. My example above implements this pseudo-code:
      </p>
      
      <pre>search text for a string of column names
for each string,
   split it around the delimiters
   sort it
   join it back together around the delimiters
   substitute it back into the original string
done</pre>
      
      <p>
        You can write any valid Perl code on the right-hand side. Probably the clearest thing to do is just call a subroutine with the captured text, and do the work there, instead of inlining it all. Here&#8217;s my example rewritten with a subroutine, and reformatted with the <code>/x</code> modifier:
      </p>
      
      <pre>sub split_sort_join {
   my ($text) = @_;
   return join( ', ', sort( split( /, /, $text ) ) );
}
$fk =~ s/
        (?&lt;=\()               # Find an opening paren
        ([^\)]+)              # Find everything inside parens
        (?=\))                # Find a closing paren
        /split_sort_join($1)  # Call split_sort_join on the match
        /gex;</pre>
      
      <p>
        You can imagine how useful this is if your desired substition is not hard-coded into the right-hand-side of the substitution, too. For example, you could pass a callback function to a subroutine, and use that instead:
      </p>
      
      <pre>sub process_column_names {
   my ( $fk, $callback ) = @_;
   $fk =~ s/
           (?&lt;=\()           # Find an opening paren
           ([^\)]+)          # Find everything inside parens
           (?=\))            # Find a closing paren
           /$callback-&gt;($1)  # Call $callback on the match
           /gex;
   return $fk;
}

print process_column_names(
   "FOREIGN KEY (`seq`, `name`) REFERENCES `tbl` (`seq`, `name`)",
   \&#038;split_sort_join
), "\n";</pre>
      
      <p>
        If you&#8217;re not a Perl wizard, your head is probably spinning at this point, so I&#8217;ll ease off, even though I&#8217;m thinking of several other things I want to write about this. Here&#8217;s the take-away: it&#8217;s safe. It&#8217;s powerful. Use it. Once you learn it, you&#8217;ll be a much more capable programmer.
      </p>
      
      <h3>
        Trick 5: dispatch tables of coderefs
      </h3>
      
      <p>
        Newcomers to Perl often wonder where the <code>switch</code> statement is. If you really, really want to write something that looks like a <code>case</code> or <code>switch</code> block, you&#8217;re a lost soul, but okay, <code>man perlfaq7</code>. And before you go there, since I know you&#8217;re a lost soul, I&#8217;ll give you this ticket to get a slightly cooler room in you-know-where: basically anything you&#8217;ll ever want to do is explained in the Perl manual pages. Start with <code>man perlfaq</code> and go from there. Even if I can&#8217;t convert you away from <code>switch</code>, perhaps I&#8217;ve made a difference by pointing you towards these man pages. Fare thee well! I hardly knew ye, gentle reader&#8230;
      </p>
      
      <p>
        If you&#8217;re still reading, you&#8217;re one of the ones walking the narrow path that leads to victory. Good! Let&#8217;s talk about how to execute some code branch depending on the value of a variable. My favorite technique for this is to use a dispatch table of coderefs &#8212; references to subroutines. This is a succinct way to dispatch execution to somewhere or other in your program, without the mess and tedious coding you get with <code>switch</code> statements. Believe me, if you&#8217;ve ever tried to maintain someone else&#8217;s <code>switch</code> of any size, you&#8217;re going to appreciate this.
      </p>
      
      <p>
        Let&#8217;s say we have a hypothetical interactive program that waits for you to press a key and then does some function.
      </p>
      
      <p>
        Okay, I lied. It&#8217;s not hypothetical. I use this technique extensively in <a href="/innotop/">innotop</a>. Innotop has many dozens of key mappings, and they are mapped to different things depending on what mode you&#8217;re in. &#8220;You pressed <code>c</code>? Oh wait, let me scroll through my big honkin&#8217; <code>switch</code> statement and see what that does&#8230; hang on, I&#8217;m getting there&#8230; can&#8217;t find it&#8230; oh, you were in <em>that</em> mode! No wonder. Well, let me look at the <code>switch</code> statement for that mode, then&#8230;&#8221;
      </p>
      
      <p>
        Can you imagine? There&#8217;s no way I&#8217;d have added so many features to innotop if it were this much of a pain to write, debug and understand. It doesn&#8217;t really matter that I wrote it &#8212; six months from now, I won&#8217;t have a clue what all that code is doing. But I <em>will</em> be able to figure out what a keypress does, because I used a dispatch table.
      </p>
      
      <p>
        What exactly is a dispatch table? It&#8217;s a hash of references to executable code. Let&#8217;s make a simple example: a program that has just two modes, <code>display_a</code> and <code>display_b</code>. Each of these is handled by a subroutine of the same name. Here is a complete program that&#8217;ll loop forever until you press <code>'q'</code>:
      </p>
      
      <pre>#!/usr/bin/perl

use strict;
use warnings FATAL =&gt; 'all';

use Term::ReadKey;

sub display_a {
   print "I am in display_a\n";
}

sub display_b {
   print "I am in display_b\n";
}

my $dispatch_for = {
   a =&gt; \&display_a,
   b =&gt; \&display_b,
   q =&gt; sub { ReadMode('normal'); exit(0) },
};

while ( 1 ) {
   print "Press a key!\n";
   ReadMode('cbreak');
   my $char = ReadKey(10);
   defined $dispatch_for-&gt;{$char} && $dispatch_for-&gt;{$char}-&gt;();
}</pre>
      
      <p>
        Innotop has tons of such dispatch tables. They&#8217;re so simple to use; you just look to see if there&#8217;s an entry for whatever your input is, and if so, you call that to do the work. It can be an anonymous subroutine, such as the anonymous &#8216;quit&#8217; subroutine in the example, or it can be a reference to a named subroutine. If you want a &#8216;default&#8217; entry, you can do that easily, too:
      </p>
      
      <pre>my $dispatch_for = {
   a =&gt; \&display_a,
   b =&gt; \&display_b,
   q =&gt; sub { ReadMode('normal'); exit(0) },
   DEFAULT =&gt; sub { print "That key does nothing\n"; },
};

# Later
   my $func = $dispatch_for-&gt;{$char} || $dispatch_for-&gt;{DEFAULT};
   $func-&gt;();
</pre>
      
      <p>
        This is much, much simpler than writing <code>switch</code> statements, nested <code>if/else/else if</code> statements, or many other common programming constructs.
      </p>
      
      <h3>
        What am I getting at?
      </h3>
      
      <p>
        There is something common to all five of the tricks I listed. It&#8217;s somewhat arbitrary that I listed five (I wanted to keep the article small enough to digest), and it&#8217;s a bit arbitrary <em>which</em> five I chose, because I have many more ideas, but can you see the thread running through them?
      </p>
      
      <p>
        It&#8217;s elimination of repetition.
      </p>
      
      <p>
        Whether it&#8217;s repetitive typing, or coding constructs that obviously iterate over something, I&#8217;m trying to show you ways to a) avoid writing the same code over and over b) avoid reading code that does the same thing over and over.
      </p>
      
      <p>
        Why?
      </p>
      
      <p>
        Because repetition kills brain cells. When you&#8217;re typing nearly the same loop or copy-pasting nearly the same code, your brain is not engaged and productive. You had a moment of insight about how to do something. In a flash, you saw the way to the end product. Now you have to write the code to implement it. Let&#8217;s just pretend that takes an hour (on a good day), and you follow it with another insight, and so on, and so on. You only had eight interested, stimulated, excited moments in the whole work day? Shoot yourself now and get it over with!
      </p>
      
      <p>
        By the same token, when you&#8217;re reading code, you have to follow the program&#8217;s logic to understand it. When most programmers study a <code>for</code> loop, I&#8217;d bet money they mentally &#8220;execute the loop,&#8221; starting at the beginning and ending at the end, to understand the start, middle and end of the loop. Every careful coder I&#8217;ve known does this, at least sometimes, because it&#8217;s how you understand what the computer is doing. Mentally executing loops is incredibly draining. It&#8217;s just as bad as typing loops!
      </p>
      
      <p>
        The reality is probably even worse, because you&#8217;re doing both at the same time. As soon as you type a loop, you&#8217;re immediately reading it. Reading it. Reading it. As soon as you type &#8212; Reading it. As &#8212; Reading it. As soon as you &#8212; as soon as you type &#8212; type &#8212; Reading it.
      </p>
      
      <p>
        I&#8217;m not making this up. Studies show this is how people read any type of written material, on screen or off. In fact, one of the most important and difficult techniques to master in speed reading is to stop re-reading things you&#8217;ve just read. I&#8217;m doing it right now as I write this, backtracking and editing my writing (sometimes I type with my eyes closed so I can escape this trap more easily).
      </p>
      
      <p>
        The combination of writing and reading iterative code is tedious and boring, and if you&#8217;re like me, you have a curious and lively mind, and you hate &#8220;tedious and boring.&#8221; That&#8217;s why I love writing code that doesn&#8217;t force me to circle like a tiger pacing a cage.
      </p>
      
      <p>
        There&#8217;s another common thread to everything I wrote, too.
      </p>
      
      <p>
        I&#8217;m showing you ways to code in a more declarative style.
      </p>
      
      <p>
        This is subtle, but after you code in this style for a little while, you&#8217;ll come to understand it: it&#8217;s not a procedural programming style. It&#8217;s declarative, where you say <em>what</em> to do instead of <em>how</em>. It feels much more like writing a specification of the program&#8217;s desired behavior, instead of writing how to accomplish that behavior. And when you go back to the code later and read it, or maintain someone else&#8217;s code, you appreciate that even more. The program really does become a spec instead of just an implementation. It&#8217;s not that obvious at first, or with small programs, but take my word for it, it&#8217;s true.
      </p>
      
      <p>
        Back to that moment of insight: what if, at the point of inspiration, you could just say &#8220;okay computer, do what I want, and you figure out <em>how</em> to do it.&#8221; That&#8217;s declarative. Really, once you had the inspiration that showed you the way to solve the problem, you didn&#8217;t need to write down the code, did you? You understood everything in that moment, and the rest was just tedium. Writing declaratively helps you get through the tedium that much faster.
      </p>
      
      <ul>
        <li>
          The <code>map</code> function is declarative because you specify a transformation and let Perl map it onto each element of a list.
        </li>
        <li>
          Hash and array slices are declarative because you specify what elements you want to read or assign, and let Perl figure out how.
        </li>
        <li>
          <code>||=</code> is declarative because you let Perl figure out whether the value exists, and whether to fetch a new one if it doesn&#8217;t.
        </li>
        <li>
          Executable regular expressions are declarative because you just write a specification (pattern) of what you want to transform, and provide the transformation, and let Perl figure out how to do it.
        </li>
        <li>
          Dispatch tables are declarative because you specify a mapping between some input and some code, and let Perl do the lookup and dispatch.
        </li>
      </ul>
      
      <p>
        You can apply these techniques, one way or another, to any programming language. Another great example is the <a href="http://bennolan.com/behaviour/">Behaviour JavaScript library</a>, and the techniques it encourages. Or my own <a href="/blog/2006/05/14/javascript-date-formatting-benchmarks/">JavaScript date formatting and parsing library</a>, which are not only clearer and simpler to use than their alternatives, but much more powerful and waaaay more efficient.
      </p>
      
      <h3>
        Conclusion
      </h3>
      
      <p>
        I hope you&#8217;ve enjoyed thinking about some different ways to reduce repetition, increase productivity, and make coding more fun. If you liked this article, you should <a href="/blog/subscribe/">subscribe</a> to stay current with new ones. And if you want to work in a place where coding is this much fun, <a href="/blog/work-with-me/">come work with me</a>.
      </p>

 [1]: http://www.xaprb.com/blog/2006/09/17/duplicate-index-checker-version-18-released/
 [2]: http://search.cpan.org/dist/perl/pod/perlsec.pod