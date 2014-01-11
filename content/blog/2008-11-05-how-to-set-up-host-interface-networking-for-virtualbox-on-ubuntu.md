---
title: How to set up host interface networking for VirtualBox on Ubuntu
date: "2008-11-05"
permalink: /2008/11/05/how-to-set-up-host-interface-networking-for-virtualbox-on-ubuntu/
categories:
  - Databases
  - Open Source
---
[VirtualBox][1] is really nice, but if you're like me, maybe you found the networking confusing. There are three ways to do it, as explained by the manual, and the best way is with host interfaces, which don't have limitations like the inability to ping and so on. I found what I think is a pretty good way to set up host interface networking.

<!--more-->

The manual explains a bunch of ways to set up host interface networking, generally involving complex modifications to your system's network configuration to add bridging and so on. This is necessary (contrary to what you might think, creating a virtual network interface won't work). But the way they explain to set it up is a lot more complex than it needs to be, and actually left my machine's networking nonfunctional.

I created a little shell script and put it into my $PATH. All I have to do is run this before I start my virtual machine, and it sets up bridging and so forth:

<pre>#!/bin/sh

set -e
set -u
set -x

sudo tunctl -t tap0 -u `whoami`
sudo chmod 666 /dev/net/tun
sudo /usr/sbin/brctl addbr br0
sudo /sbin/ifconfig eth0 0.0.0.0 promisc
sudo /usr/sbin/brctl addif br0 eth0
sudo /sbin/dhclient br0
sudo /usr/sbin/brctl addif br0 tap0
sudo ifconfig tap0 192.168.1.51 up
sudo bash -c 'echo 1 &gt; /proc/sys/net/ipv4/conf/tap0/proxy_arp'
IP=`ifconfig | grep 192 | head -n 1 | awk '{print $2}' | cut -d: -f2`
sudo route add -host $IP dev tap0
sudo arp -Ds $IP eth0 pub
</pre>

The script assumes that your machine's primary network device is named eth0. For this to work, you need a couple of packages installed:

<pre>sudo apt-get install uml-utilities bridge-utils</pre>

Specify 'tap0&#8242; as the network device in the VirtualBox machine's settings.

One of the biggest reasons I like this more than the methods in the manual is that it doesn't mess with my networking config in a permanent way. There are no surprises after a reboot, for example.

 [1]: http://www.virtualbox.org/
