---
title: How I hacked the HP Media Vault to support OGG and FLAC files
date: "2008-08-02"
url: /blog/2008/08/02/how-i-hacked-the-hp-media-vault-to-support-ogg-and-flac-files/
categories:
  - Hardware
---
Let me begin by saying "I am so not a gadget guy." I don't have an iPhone. Heck, I didn't have a cellphone at all until April when I joined Percona as a consultant. I don't ooh and aah over other people's gadgets most of the time. I don't have, you know, that kind of envy. I'm sure you see where this is going: I got a gadget and I think it's really cool.

Anyway, my wife and I have a bunch of computers (desktops and laptops) and we had been feeling the pain for a long time: the files were only on one computer, and we wanted them available. I built a file server and then realized that it was going to be really expensive in terms of power alone, so I went back to USB drives for backups, and kept thinking about it.

<a href="http://www.amazon.com/gp/product/B0015313O8?tag=xaprb-20"><img border="0" src="http://www.xaprb.com/media/2008/08/HPMediaVault.jpg" width="160" height="160" alt="HP Media Vault" /></a>

After a long time I decided to buy an <a href="http://www.amazon.com/gp/product/B0015313O8?tag=xaprb-20">HP Media Vault</a> and install ultra-low-power, oversized disks in it -- I did that, and will write about it elsewhere. And then I discovered that it has a media server in it. And not being a gadget guy, I had honestly never heard about these things before. Really. I read up on it a little bit and decided hell, sharing files is nice, but I have about a thousand CDs that could go on this thing, and my wife has hundreds too. That's even better than file sharing! I copied the music from her iTunes library to the shared Music folder on the server and boom, Rhythmbox magically saw it all. I couldn't believe I'd never heard about this before. Best thing since sliced bread.
  
I even had all my music ripped already to my <a href="http://www.xaprb.com/blog/2005/10/05/review-of-the-iriver-hd340/">iRiver HD340</a>. In OGG format. And then I found out the HP Media Vault doesn't support OGG format. <a href="http://www.imdb.com/title/tt0093779/">Boo! Boo! Rubbish! Filth! Slime!</a>

So I fixed that. Now I'll show you how.
  
### Disclaimer
  
If you try what's on this page and something breaks, it is your fault, not mine. I make this information available without any warranties or representations.
  
### The basics: log into the server
  
The HP documentation for the Media Vault is totally incomplete and assumes you want to install their GUI program and control the thing from your Windows desktop. There's a much better way. The Media Vault has a full-featured web interface. Log into the web console. I'm going to assume that your HP Media Vault's DNS name is hpmediavault, so you can <a href="http://hpmediavault/">log into it with this URL</a>. Once you do, set the admin password to secure the server. Remember it.

The next fun thing: the server runs GNU/Linux and has SSH enabled by default. Yes, that's right: you can just SSH into the thing! The password you set in the previous step is now your SSH password. Your SSH username is root, no matter what you set the admin username to.

Next, open up a terminal and SSH right in:
  
<pre>ssh root@hpmediavault</pre>
  
Type the password you chose in the previous step. You should see the following:
  
<pre>baron@kanga:~$ ssh root@hpmediavault
root@hpmediavault's password: 


BusyBox v1.01 (2008.02.08-22:41+0000) Built-in shell (ash)
Enter 'help' for a list of built-in commands.

-sh: can't access tty; job control turned off
# 
</pre>
  
As you can see, the server runs with a stripped-down set of command-line tools called BusyBox. You're golden. Let's get working on installing OGG and FLAC support. This will not be hard at all if you can use a command-line editor.
  
### Step 1: install ipkg
  
Behind the scenes, the Media Vault's media streaming is provided by <a href="http://fireflymediaserver.org/">Firefly</a>, formerly known as mt-daapd (<a href="http://en.wikipedia.org/wiki/Digital_Audio_Access_Protocol">DAAP</a> is the iTunes server protocol). This is a Free Software media server, and it's highly capable. But the version that ships on the device is old and doesn't support OGG. You're going to fix that by installing a newer version. But first, you have to install a package management system that will install the newest Firefly software for you.

The package management system is <a href="http://handhelds.org/moin/moin.cgi/Ipkg">ipkg, the Itsy Package Management System</a>. It's really easy to install. First, let's see where your hard drives are mounted:
  
<pre># mount
/dev/md6 on /share/1000 type ext3 (data=writeback)
</pre>
  
If yours isn't /share/1000, use a different value in the following commands. Now you want to make an installation directory and change to that directory:
  
<pre># mkdir -p /share/1000/tmp &#038;&#038; cd /share/1000/tmp</pre>
  
Now let's find the installation image to download. Go look here for the latest version of the image:
  
<a href="http://ipkg.nslu2-linux.org/feeds/optware/cs05q3armel/cross/unstable/">http://ipkg.nslu2-linux.org/feeds/optware/cs05q3armel/cross/unstable/</a>
  
Search for "hpmv2-bootstrap" on that page. You should find a file something like this: hpmv2-bootstrap_1.2-4_arm.xsh. Copy the link location for that, and go back to your command prompt. Now download the file to the Media Vault, substituting the correct URL into the command below:
  
<pre>
# wget http://ipkg.nslu2-linux.org/feeds/optware/cs05q3armel/cross/unstable/hpmv2-bootstrap_1.2-4_arm.xsh
</pre>
  
And now, just execute it:
  
<pre># sh ./hpmv2-bootstrap_1.2-4_arm.xsh</pre>
  
You should see "Setup complete" when it's done. That's it. It installs itself and mounts the installation directory as /opt, which is where all your software will appear in the future. This will persist after a reboot. You can see the changes with the mount command:
  
<pre># mount
/dev/md6 on /share/1000 type ext3 (data=writeback)
/share/1000/.optware on /opt type ext3 (rw)
</pre>
  
Before you move on, update its cache of available software:
  
<pre># ipkg update</pre>
  
I got this installation procedure from <a href="http://tech.groups.yahoo.com/group/hackingthemediavault/message/259">the Yahoo group on hacking the Media Vault</a>.
  
### Step 2: Install Firefly Nightly
  
I wasn't able to determine whether the latest stable Firefly release has OGG streaming enabled, so I installed the latest nightly release. At some point in the future I'm sure a stable release will have it, but I breathed a prayer to Saint Hewlett and installed the nightly, following <a href="http://tech.groups.yahoo.com/group/hackingthemediavault/message/338">instructions I also found on Hacking the Media Vault</a>. Fortunately it seems to work fine for me. Here's how I did it:
  
<pre># ipkg install mt-daapd-svn</pre>
  
Pretty easy. After you do this, it will download a bunch of things and install them until it says "Successfully terminated." Now you need to configure it.

You probably noticed that the installation said "To complete this installation, make any necessary changes to the config file in /opt/etc/mt-daapd/mt-daapd.conf, and start the daemon by running /opt/etc/init.d/S60mt-daapd". Here's how to do that.
  
<pre># vi /opt/etc/mt-daapd/mt-daapd.conf</pre>
  
If you like a different editor, feel free to use it. I like vi. Here are the lines that you need to change:
  
<pre>
mp3_dir = /share/1000/Music                                            
servername = HPMediaVault                                              
extensions = .mp3,.m4a,.m4p,.ogg,.flac                                 
</pre>
  
I'm assuming you are keeping the defaults, as I did on mine. All my music is in the Music share, I want to keep the same server name (what shows up in iTunes/Rhythmbox), and I want to add .ogg and .flac to the extensions Firefly will index and stream.

### Step 3: Stop the built-in server, start the new one

Next you need to stop the built-in media server and start the one you just installed. Here's how to see what's running:
  
<pre># ps -eaf | grep daap
32530 nobody     1096 S &lt; /usr/sbin/mt-daapd 
32531 nobody     1984 S &lt; /usr/sbin/mt-daapd 
32160 root        488 S   grep daap 
</pre>
  
There are two processes running. This is normal. Let's stop them:

<pre># killall mt-daapd</pre>

If you now run the ps command above, you shouldn't see anything running. You can start the new server:

<pre># /opt/etc/init.d/S60mt-daapd</pre>

Now you should be able to see the daemon running:
  
<pre># ps -eaf | grep daap
32681 nobody     3796 S   /opt/sbin/mt-daapd -c /opt/etc/mt-daapd/mt-daapd.conf
32682 nobody     4512 D   /opt/sbin/mt-daapd -c /opt/etc/mt-daapd/mt-daapd.conf
32703 root        488 S   grep daap 
</pre>
  
Notice that it's a different binary running -- not the one in /usr/sbin.

At this point you ought to be able to start up your favorite music player (iTunes, Rhythmbox) and stream OGG and FLAC files from the media server. Test that before you go on to the next little bit.

### Step 4: Change which media server starts on boot
  
There's one last little detail. If you shut down your Media Vault and restart it, the old media server will start instead of the new one. The GNU/Linux variant on the Media Vault doesn't have any nice init scripts, so I had to hunt around to find out how to do this.

After a bit of poking, I found that the /etc/inc/func_daapd.inc script has the start and stop commands. The startup process for the Media Vault is written in PHP, oddly enough. Here are the relevant lines:
  
<pre>
   144         $ret=mwexec("/usr/sbin/mt-daapd -k");
   147         killbyname("mt-daapd","");
   162         $ret=mwexec("/usr/sbin/mt-daapd");
</pre>
  
I commented them out and changed them to
  
<pre>
   143          $ret=mwexec("/opt/etc/init.d/S60mt-daapd -k");
   144  #       $ret=mwexec("/usr/sbin/mt-daapd -k");
   161          $ret=mwexec("/opt/etc/init.d/S60mt-daapd");
   162  #        $ret=mwexec("/usr/sbin/mt-daapd");
</pre>
  
Notice I didn't change the killbyname command, since once it is started the binary has the same command name as the old one did. I tested restarting the Media Vault and after restart, it was working OK again. I do not know whether the built-in command to reset the media server will work with these changes; I suspect not. But if you want to do that, you can log in and do it from the command line.

### Conclusion

If you followed the steps I listed above, your Media Vault ought to be serving FLAC and OGG files in WAV format to your music player (audiophiles, rejoice: your FLAC is not downconverted to MP3!).

After doing this, I have to say I think this piece of equipment is pretty darned awesome, and I'm really happy I bought a low-power, quiet, small, fun gadget that I have full control over. And I haven't even talked about sharing files yet! That'll be another post.

### Postscript

A few miscellaneous things I've learned:

The default mt-daapd configuration file doesn't have a defined rescan_interval. This means it'll never notice when you add music to your filesystem. But you can poke it via the web interface (http://hpmediavault:3689/index.html; the username is empty, the password is defined in your config file) to make it update. Also, and I'm not sure how well this works, there's an option to gzip the list of songs, which might make startup quite a bit faster when your iTunes/Rhythmbox connects and gets the song list. This is documented in the config file too. <strong>Update: I've been running my server this way for a while and it seems to run fine.</strong>
