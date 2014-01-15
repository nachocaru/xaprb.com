---
title: How to digitize records with Ubuntu, a USB Turntable and Audacity
date: "2008-08-30"
url: /blog/2008/08/30/how-to-digitize-records-with-ubuntu-a-usb-turntable-and-audacity/
categories:
  - Music
  - Open Source
  - Reviews
---
<p>I've been digitizing my LP collection recently and thought I'd share a quick howto, since I haven't seen a good complete tutorial on the whole process online.  Hopefully this will show up on Google and people can find it.</p>

<!--more-->

<h3>It takes time</h3>

<p><a href="http://www.amazon.com/gp/product/B001B9SH4U?ie=UTF8&#038;tag=xaprb-20&#038;linkCode=as2&#038;camp=1789&#038;creative=9325&#038;creativeASIN=B001B9SH4U" style="float:right"><img src='http://www.xaprb.com/media/2008/08/ion_lp_to_cd.jpg' alt='Ion LP to CD converter' /></a>Before I begin, I want to make a few comments about the process overall.  I've borrowed the turntable I'm using (actually borrowed two, from different people) and read a lot on the Internet about this.  It strikes me that most people posting on the forums underestimate how much time it takes to convert LPs to digital form.  Sometimes there is no way to just replace the LP with a CD, but I've decided to do so in many cases.  I suppose another alternative is to get a system that's more automated, such as the one I've linked at the right.  Maybe that helps take some of the tedious time-consuming steps out of it.  But I haven't tried it.  I think it's worth it for some of my LPs that are not available on CD, or that cost upwards of $50 on CD.</p>

<p>I also read on the internet about someone who played their LPs at 45RPM and then pitch-shifted them back to normal speed.  This person reported there was no audible difference between doing this and recording the music at 33.3RPM.  I listened to the files they'd posted and I have to say I thought the difference was as plain as day.  Perhaps they were not listening over decent-quality speakers or headphones.  But the 45RPM file sounded utterly <em>horrible</em> to me.  I don't think this is a good technique at all.</p>

<p>In short, I doubt it can be sped up.  Just count on it taking time.</p>

<h3>Set up the equipment</h3>

<p><a href="http://www.amazon.com/gp/product/B000PZQPP4?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=B000PZQPP4" style="float:right"><img src='http://www.xaprb.com/media/2008/08/ion_usb_turntable.jpg' alt='Ion USB Turntable' /></a>Aside from your computer, you really need nothing else than a USB turntable.  The most popular ones seem to be those made by Ion, aka Numark.  I've pasted an Amazon product link to the right for one of the ones I am currently using.  The other I'm using is a slightly different model from the same company.</p>

<p>There are other ways -- you don't have to use a USB turntable.  You can use a higher-quality turntable and put the input into your sound card, and so on and so on.  But this is how I'm doing it.</p>

<p>When I plugged the turntable into my USB port, I saw the following in dmesg:</p>

<pre>[ 2813.605274] usb 4-1: new full speed USB device using ohci_hcd and address 2
[ 2813.694013] usb 4-1: configuration #1 chosen from 1 choice
[ 2813.697148] input: Burr-Brown from TI USB Audio CODEC  as /devices/pci0000:00/0000:00:13.3/usb4/4-1/4-1:1.3/input/input13
[ 2813.721924] input,hidraw3: USB HID v1.00 Device [Burr-Brown from TI USB Audio CODEC ] on usb-0000:00:13.3-1
[ 2813.901813] usbcore: registered new interface driver snd-usb-audio</pre>

<p>And that was it.  No further ado, no drivers required.  You may recognize the name <a href="http://en.wikipedia.org/wiki/Burr-Brown_Corporation">Burr-Brown</a>.  They make a lot of analog-to-digital (and vice versa) converters.</p>

<p>The next step is to get some recording software.  I used <a href="http://www.audacityteam.org/">Audacity</a> for recording the LPs.</p>

<pre>sudo apt-get install audacity</pre>

<p>This installed libflac++6 also.  I configured Audacity by selecting Edit-Preferences, and in "Recording" selected the "ALSA: USB Audio CODEC: USB Audio (hw:1,0)" input.  On my computer I had trouble enabling playthrough (a feature that lets you listen to what you're recording).  So I left that unchecked.</p>

<h3>Record the LP</h3>

<p>Actually recording the LP is straightforward.  Just start Audacity recording, then start the turntable and lower the needle.  I'm not going to tell you about cleaning the LP and all that&#8230; you probably know it already.</p>

<p>Once you have recorded some music, you probably want to chop it up into individual songs and export them as MP3, OGG, or FLAC.  (I'm loving FLAC.  <a href="http://www.xaprb.com/blog/2008/08/02/how-i-hacked-the-hp-media-vault-to-support-ogg-and-flac-files/">My HP Media Vault streams FLAC</a> to me via iTunes or Rhythmbox just fine.)  I experimented with a variety of ways to do that.  I settled on the following method.</p>

<ol>
<li>Record the first side, then press Stop and flip the LP over.  Press Record again and record the other side.  I do this because when I export the songs, Audacity embeds the song number in the song's meta-data, and if I record one side at a time I get two sets of songs which begin at track number 1, which is a hassle.  Each side will be recorded in a separate track in Audacity.</li>
<li>Trim the silence (and the noise of the needle dropping, etc) from the start and end of each side's music.  You can just highlight it with your mouse and press Delete.</li>
<li>Find the start of each song.  (Hint: you can use the Home and End keys to move the cursor all the way to the start and end of the whole recording.)  Put the cursor where you want in the track by clicking into the track.  You can use the arrow keys to move it to the left and right for fine adjustments, and zooming in and out is helpful too of course.</li>
<li>Label the start of each song by pressing Ctrl-B and typing the song's name.</li>
</ol>

<p><a style="float:right" href='http://www.xaprb.com/media/2008/08/audacity_vinyl_digital.png' title='Audacity after recording both sides and labelling songs'><img src='http://www.xaprb.com/media/2008/08/audacity_vinyl_digital.thumbnail.png' alt='Audacity after recording both sides and labelling songs' /></a> When you're done, the result should look like the image on the right.  Now you're ready to export the files.  </p>

<p>Use File-Export Multiple to do this.  Choose the type of files you want to create and adjust the settings if you wish.  To make sure each labeled song becomes its own file, select the option to split the file based on labels, and name the files using the label/track name.</p>

<p>During the export process you'll also get the chance to edit the recording's meta-data, such as the artist and album name.  This is fine, but the dialog box to do this is touchy -- if you press Enter it will assume you're done and just start exporting files even if you're not ready.  If you cancel the export and restart, it won't show the meta-data dialog box again, but you can get to it via File &#8211; Open Metadata Editor.  I got into the habit of editing the meta-data that way to begin with so I didn't have to fuss with the dialog later.</p>

<p>Audacity names the files after the tracks, but it doesn't have any flexibility about file naming.  So you can't tell it to place the song number at the beginning of the filenames, for example; and thus the files won't sort in the right order when you view them in your file browser.  I just use <a href="http://easytag.sourceforge.net/">easyTAG</a> to quickly fix the track names after the export is done.  I also use it to insert the year meta-data, since Audacity doesn't seem to do this in a way other programs understand.  There are a few settings you might want to tweak with easyTAG too; I disabled the auto-scan at startup and a few others to make it behave the way I wanted.</p>

<p>I found easyTAG a little confusing so I have uploaded a screenshot of it with labeled steps.  Once I've selected the directory containing my files, I press the button to select all the files, then the green scan button; that pops up the scanner dialog.  On this dialog (this took me a long time to figure out!) I press the green scan button once again; then I press the Save button on the main toolbar once again and it applies the changes I made (renaming, filling in the album year, etc).  (To fill in the album year, select all the files and fill in the year, then press the small dot to the right of the year to apply the change to all selected files.)</p>

<p><a href='http://www.xaprb.com/media/2008/08/easytag.png' title='How to rename files and fix meta-data with easytag'><img src='http://www.xaprb.com/media/2008/08/easytag.thumbnail.png' alt='How to rename files and fix meta-data with easytag' /></a></p>

<p>And that's about all.  I had a few incidents with Audacity where I tried to play tracks from one recording while another window was recording, but the good thing is it recovers from crashes beautifully; I didn't lose any recordings.</p>

<h3>Audio quality</h3>

<p><a style="float:right" href="http://www.amazon.com/gp/product/B0001FTVE0?ie=UTF8&#038;tag=xaprb-20&#038;link_code=as3&#038;camp=211189&#038;creative=373489&#038;creativeASIN=B0001FTVE0"><img src='http://www.xaprb.com/media/2008/08/sennheiser_595.jpg' alt='Sennheiser 595' /></a>The audio quality sounds pretty good to me, by most counts.  I mean, there's the inevitable record noise and some clicks (a lot of my records are things like old Mike Oldfield albums and early Tangerine Dream, Jeff Beck, and the like).  But even though there are ways to remove this noise, I'd rather have all the noise and all the music, than some of the noise and only some of the music.  I'm not listening to the noise, I'm listening to the music.  I have a beautiful pair of Sennheiser HD 590s (linked the 595s at right -- the 590s are discontinued, but they're the nicest headphones I've ever owned; very bright, but easy to drive from a portable music player (no dedicated amp needed) and extremely light and comfortable) and it really sounds good.  You can probably guess that I'm not saving the files as crummy low-bit-rate MP3 files.</p>

<p>The USB turntables I'm using aren't audiophile-quality.  There is some wow and flutter.  It's acceptable to me.  If you think you'll be bothered, use higher-end equipment.  Personally, I don't go down this path, because for me it's a road with no end.  I know people who spend many thousands (or tens of thousands) of dollars on each piece of their system: pre-amps, turntables, tone arms, cartridges and needles.  (Got a $6000 needle anyone?)  I don't see myself ever spending the price of a small house on audio equipment; I'd rather put the money into buying more music, rather than more equipment.  But if you're that kind of person, you probably aren't reading this article anyway.</p>

<h3>Summary</h3>

<p>Converting LPs into digital form the way I've shown is fairly time-consuming and tedious.  You have to record the LP; then trim out the unwanted parts of the recording; then find the start of each song and type in the song name; then the artist and album information.  I multitask while I'm doing other things, but I still notice the amount of time I'm spending on it.  Hopefully this article helps you cut some of the repetitive work out yourself, or decide whether you want to get into this before you buy the equipment.</p>
