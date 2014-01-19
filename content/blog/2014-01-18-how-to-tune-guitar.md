---
title: "How to Tune A Guitar (Or Any Instrument)"
date: "2014-01-18"
url: /blog/2014/01/18/how-to-tune-guitar/
categories:
  - Music
---
Do you know how to tune a guitar? I mean, do you *really* know how to tune a
guitar?

![Guitar Closeup][1]

I've met very few people who do. Most people pick some notes, crank the
tuners, play some chords, and endlessly fidget back and forth until they either
get something that doesn't sound awful, or they give up. I can't recall ever
seeing a professional musician look like a tuning pro on stage, either.

There's a secret to tuning an instrument. Very few people seem to know it. It's
surprisingly simple, it isn't at all what you might expect, and it makes it easy
and quick to tune an instrument *accurately* without guesswork. However, even
though it's really simple and logical, it is actually difficult at first, and
requires training your ear. This is a neurological, physical, and mental process
that takes some time and practice. It does *not* require "perfect pitch," however.

In this blog post I'll explain how it works. There's a surprising amount of
depth to it. If you're looking for "the short version," you won't find it here,
because I find the math, physics, and theory of tuning to be fascinating, and I
want to hold forth at length.

### My Back-Story

When I was a child my mother found a piano tuner who practiced the "lost art" of
tuning entirely by ear. His name was [Lee Flory][2]. He was quite a character;
he'd tuned for famous concert pianists all over the world, toured with many of
them, and had endless stories to tell about his involvement with all sorts of
musicians in many genres, including bluegrass and country/western greats. My
mother loved the way the piano sounded when he tuned it. It sang. It was alive.
It was joyous.

For whatever reason, Lee took an interest in me, and not only tolerated but
encouraged my fascination with tuning. I didn't think about it at the time, but
I'm pretty sure he scheduled his visits differently to our house. I think he
allowed extra time so that he could spend an hour or more explaining everything
to me, playing notes, coaching me to hear subtleties.

And thus my love affair with the math, physics, and practice of tuning began.

### Beats

The first great secret is that tuning isn't about listening to the pitch of
notes. While tuning, you don't try to judge whether a note is too high or too
low. You listen to something called *beats* instead.

Beats are fluctuations in volume created by two notes that are almost the same
frequency.

When notes are not quite the same frequency, they'll reinforce each other when
the peaks occur together, and cancel each other out when the peaks are
misaligned. Here's a diagram of two sine waves of slightly different
frequencies, and the sum of the two (in red).

![Beats][3]

Your ear will not hear two distinct notes if they're close together. It'll hear
the sum.

Notice how the summed wave (the red wave) fluctuates in magnitude.
To the human ear, this sounds like a note going "wow, wow, wow, wow."

This is the foundation of all tuning by ear that isn't based on guesswork.

Before you go on, tune two strings close together on your guitar or other
instrument, and listen until you can hear it. Or, just fret one string so it
plays the same note as an open string, and strike them together. Bend the string
you've fretted, a little less, a little more. Listen until you hear the beats.

![Bending String][4]

### The Math of Pitch

Musical notes have mathematical relationships to one another. The exact
relationships depend on the tuning. There are many tunings, but in this article
I'll focus on the tuning used for nearly all music in modern Western cultures:
the [12-tone equal temperament][5] tuning.

In this tuning, the octave is the fundamental interval of pitch. Notes double in
frequency as they rise an octave, and the ratio of frequencies between each
adjacent pair of notes is constant. Since there are twelve half-steps in an
octave, the frequency increase from one note to the next is the twelfth root of
2, or about 1.059463094359293.

Staying with Western music, where we define the A above middle C to have the
frequency of 440Hz, the scale from A220 to A440 is as follows:

<pre>
Note     Frequency
=======  =========
A220     220.0000
A-sharp  233.0819
B        246.9417
C        261.6256
C-sharp  277.1826
D        293.6648
D-sharp  311.1270
E        329.6276
F        349.2282
F-sharp  369.9944
G        391.9954
G-sharp  415.3047
A440     440.0000
</pre>

We'll refer back to this later.

### The Math Of Intervals

If you've ever sung in harmony or played a chord, you've used intervals.
Intervals are named for the relative distance between two notes: a minor third,
a fifth, and so on.  These are a little confusing, because they sound like
fractions. They're not. A fifth doesn't mean that one note is five times the
frequency of another. A fifth means that if you start on the first note and
count upwards five notes on a major scale, you'll reach the second note in the
interval. Here's the C scale, with the intervals between the lowest C and the
given note listed at the right:

<pre>
Note         Interval from C
C            Unison
D            Major 2nd
E            Major 3rd
F            4th (sometimes called Perfect 4th)
G            5th (a.k.a. Perfect 5th)
A            Major 6th
B            Major 7th
C            Octave (8th)
</pre>

On the guitar, adjacent strings form intervals of major fourths, except for the
interval between the G and B strings, which is a major third.

Some intervals "sound good." A major chord, for example, is composed of the root
(first note), major third, major fifth, and octave. The chord sounds good
because the intervals between the notes sound good. There's a variety of
intervals at play: between the third and fifth is a minor third, between the
fifth and octave is a fourth, and so on.

It turns out that the intervals that sound the best are the ones whose
frequencies have the simplest relationships. In order of increasing complexity,
we have:

* Unison: two notes of the same frequency.
* Octave: the higher note is double the frequency.
* Fifth: the higher note is 3/2s the frequency.
* Fourth: the higher note is 4/3rds the frequency.
* Third: the higher note is 5/4ths the frequency.
* Further intervals (minor thirds, sixths, etc) have various relationships, but
  the pattern of N/(N-1) doesn't hold beyond the third.

These relationships are important for tuning, but beyond here it gets
significantly more complex. This is where things are most interesting!

### Overtones and Intervals

As a guitar player, you no doubt know about "harmonics," also called overtones.
You produce a harmonic by touching a string gently at a specific place (above
the 5th, 7th, or 12th fret, for example) and plucking the string. The note that
results sounds pure, and is higher pitched than the open string.

Strings vibrate at a base frequency, but these harmonics (they're actually
partials, but I'll cover that later) are always present. In fact, much of the
sound energy of a stringed instrument is in overtones, not in the fundamental
frequency. When you "play a harmonic" you're really just damping out most of the
frequencies and putting more energy into simpler multiples of the fundamental
frequency.

Overtones are basically multiples of the fundamental frequency. The octave, for
example, is twice the frequency of the open string. Touching the string at the
12th fret is touching it at its halfway point. This essentially divides the
string into two strings of half the length. The frequency of the note is
inversely dependent on the string's length, so half the length makes a note
that's twice the frequency. The seventh fret is at 1/3rd the length of the
string, so the note is three times the frequency; the 5th fret is 1/4th the
length, so you hear a note two octaves higher, and so on.

The overtones give the instrument its characteristic sound. How many of them
there are, their frequencies, their volumes, and their attack and decay
determines how the instrument sounds. There are usually many overtones, all
mixing together into what you usually think of as a single note.

Tuning depends on overtones, because you can tune an interval by listening to
the beats in its overtones.

Take a fifth, for example. Recall from before that the second note in the fifth
is 3/2 the frequency of the first. Let's use A220 as an example; a fifth up from
A220 is E330.  E330 times two is E660, and A220 times three is E660 also. So by
listening to the first overtone of the E, and the second overtone of the A, you
can "hear a fifth."

You're not really hearing the fifth, of course; you're really hearing the beats
in the overtones of the two notes.

Practice hearing this.  Pick up your guitar and de-tune the lowest E string down
to a D. Practice hearing its overtones. Pluck a harmonic at the 12th string and
strike your open D string; listen to the beats between the notes. Now play both
strings open, with no harmonics, at the same time. Listen again to the
overtones, and practice hearing the beats between them. De-tune slightly if you
need to, to make the "wow, wow, wow, wow" effect easier to notice.

Take a break; don't overdo it. Your ear will probably fatigue quickly and you'll
be unable to hear the overtones, especially as you experiment more with complex
intervals. In the beginning, you should not be surprised if you can focus on
these overtones for only a few minutes before it gets hard to pick them out and
things sound jumbled together. Rest for a few hours. I would not suggest doing
this more than a couple of times a day in the beginning.

The fatigue is real, by the way. As I said, being able to hear beats and ignore
the richness of the sound to pick out weak overtones is partially physical,
partially mental and partially neurological --- at a minimum. I'd be interested
in seeing brain scans of an accomplished tuner at work. When I knew Lee Flory he
told me that his ear doctor told him his hearing had not decayed with age, which
was surprising because he spent his life listening to loud sounds. Lee
attributed this to daily training of his hearing, and told me that the ear is
like any other part of the body: it can be exercised.

Back to the topic: When you're ready, pluck a harmonic on the lowest D string
(formerly the E string) at the 7th fret, and the A string at the 12th fret, and
listen to the beats between them. Again, practice hearing the same overtones
(ignoring the base notes) when you strike both open strings at the same time.

When you've heard this, you can move on to a 4th. You can strike the harmonic at
the 5th fret of the A string and th 7th fret of the D string, for example, and
listen to the beats; then practice hearing the same frequencies by just
strumming those two open strings together.

### Imperfect Intervals and Counting Beats

You may have noticed that intervals in the equal-tempered 12-tone tuning don't
have exactly the simple relationships I listed before. If you look at the table
of frequencies above, for example, you'll see that in steps of the 12th root of
2, E has a frequency of 329.6276Hz, not 330Hz.

Oh no! Was it all a lie? Without these relationships, does tuning fall apart?

Not really. In the equal-tempered tuning, in fact, there is only one perfect
interval: the octave. All other intervals are imperfect, or "tempered."

* The 5th is a little "narrow" -- the higher note in the interval is slightly
  flat
* The 4th is a little "wide" -- the higher note is sharp
* The major 3rd is even "wider"

Other intervals are wide or flat, just depending on where their frequencies fall
on the equal-tempered tuning. (In practice, you will rarely or never tune other
intervals.)

What this means is that not only do you need to hear beats, but you need to
*count* them. Counting is done in beats per second. It sounds insanely hard at
first (how the heck can you count 11-and-a-half beats a second!?) but it will
come with practice.

You also need to know how many beats wide or narrow a given interval will be.
You can calculate it easily enough. After a while of tuning a given instrument
you'll just memorize how many beats to count for specific intervals, because
as you'll see, there's a system for tuning any instrument, and you generally
don't need to have every arbitrary interval memorized. You will use only a
handful of intervals and you'll learn their beats.

### The Guitar Scale
### The Ultimate Guitar Tuning Guide

### Systems for Tuning Arbitrary Instruments
### Partials, Stretching
### False Beats
### Imperfect Frets
### Tuning Pegs, Friction
### Temperature, Humidity

### Picture Credits

* http://www.flickr.com/photos/angelocesare/249168890/
* http://www.flickr.com/photos/locomosquito/5540678403/

[1]: /media/2014/01/guitar-tuning.jpg
[2]: http://www.genealogybuff.com/va/state/webbbs_config.pl/read/298
[3]: /media/2014/01/beats.png
[4]: /media/2014/01/bending.jpg
[5]: http://en.wikipedia.org/wiki/Equal_temperament
