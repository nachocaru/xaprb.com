---
title: How to monitor server load on GNU/Linux
date: "2006-06-08"
url: /blog/2006/06/08/how-to-monitor-server-load-on-gnulinux/
---
This article introduces six methods and 12 tools for monitoring system load, performance and related information on GNU/Linux and similar systems. I've seen many articles that mention one or two of these tools, but none that discusses and compares all the ones I find useful.

### Gkrellm

Gkrellm is the choice of the "g33k" types. It's a graphical program that monitors all sorts of statistics and displays them as numbers and charts. You can see examples of it in use on nearly every [GNU/Linux screenshot][1] website. It is very flexible and capable, and can monitor useful as well as ridiculous things via plugins. It can monitor the status of a remote system, since it's a client/server system.

The downsides, in my opinion, are

1.  the impact on the monitored system's performance (sometimes significant)
2.  the flashiness and eye candy make it seem more meaningful than it might be
3.  it's graphical, needs to run as a daemon, and isn't installed by default, so it's not optimal for monitoring a server

### "Task Manager" clones

`gnome-system-monitor` is a graphical program installed as part of the base Gnome system. It is somewhat similar to the Task Manager in Microsoft Windows. It isn't very full-featured, with only three tabs (Processes, Resources, Devices). The Devices tab just shows devices, Resources shows the history of CPU, memory, swap and network usage, and the Processes tab shows the processes. The Processes tab is the only one that really lets the user "do" anything, such as killing or re-nicing processes, or showing their memory maps.

Of course, this tool is only available on systems with Gnome installed, and requires an X server to be running. This makes it impractical for use on a server.

I know there's a similar tool on KDE systems, but I don't have one handy to examine at the moment.

### vmstat and related tools

`vmstat` is part of the base installation on most GNU/Linux systems. By default, it displays information about virtual memory, CPU usage, I/O, processes, and swap, and can print information about disks and more. It runs in a console. I find the command `vmstat -n 5` very helpful for printing a running status display in a tabular format.

It's great for figuring out how heavily loaded a system truly is, and what the problem (if any) is. For example, when I see a high number in the rightmost column (percent of CPU time spent waiting for I/O) on a database server, I know the system is I/O-bound.

`iostat` is part of the `sysstat` package on Gentoo, as are `mpstat` and `sar`. `iostat` prints similar statistics as `vmstat`, but gives more detail on specific devices and is geared toward understanding I/O usage in more detail than `vmstat` is. `mpstat` is a similar tool that prints processor statistics, and is multi-processor aware. `sar` collects, reports, and saves system activity information (for example, for later analysis).

All of these tools are very flexible and customizable. The user can choose what information to see and what format to see it in. These tools are not usually installed by default, except for `vmstat`.

### top

`top` is the classic tool for monitoring any UNIX-like system. It runs in a terminal and refreshes at intervals, displaying a list of processes in a tabular format. Each column is something like virtual memory size, processor usage, and so forth. It is highly customizable and has some interactive features, such as re-nicing or killing processes. Since it's the most widely known of the tools in this article, I won't go into much detail, other than to say there's a lot to know about it -- read the man page.

`top` is one of the programs in the `procps` package, along with `ps`, `vmstat`, `w`, `kill`, `free`, `slabtop`, and `skill`. All these tools are in a default installation on most distributions.

`<a href="http://htop.sourceforge.net/">htop</a>` is similar to `top`, except it is mouse-aware, has a color display, and displays little charts to help see statistics at a glance. It also has some features `top` doesn't have.

On a somwhat-related note, [mytop][2] is a handy monitor for MySQL servers. Take a look at [Jeremy Zawodny's website][3] while you're there. He is a smart cookie.

### tload

`tload` runs in a terminal and displays a text-only "graph" of current system load averages, garnered from `/proc/loadavg`. It is part of the base installation on most GNU/Linux systems. I find it extremely useful for watching a system's performance over SSH, often within a [GNU Screen][4] session.

My favorite technique is to start a terminal, connect over SSH, resize the terminal to 150&#215;80 or so, then start `tload` and shrink the window by CTRL-right-clicking and selecting "Unreadable" as the font size. The result looks like the following:

![Server load diagram][5]

I then set the terminal window as always-on-top and move it to a corner of my screen, where it prints a pretty little graph as time goes by.

The only trouble is, it's not really obvious what the graph means. The man page isn't terribly helpful; it just says `tload` gets its numbers from the `/proc/loadavg` file, and there's no man page for that file. I looked in the kernel source for the answer.

`Documentation/filesystems/proc.txt` says loadavg is "Load average of last 1, 5 &#038; 15 minutes," but not how it's calculated. Poking around in `source/fs/proc/proc_misc.c` and `kernel/timer.c` reveals the origin of the numbers: the number of running and uninterruptible processes (see <http://lxr.linux.no/source/kernel/timer.c#L832>).

### watch

`watch` isn't really a load-monitoring tool, but it's beastly handy because it takes any command as input and monitors the result of running that command. For example, if I wanted to monitor when the "foozle" program is executing, I could run

<pre>watch --interval=5 "ps aux | grep foozle | grep -v xaprb"</pre>

### Summary

I've given an overview of lots of tools above. Each has its use. I'm not a big fan of graphical tools, and they're not very practical for monitoring servers anyway. Therefore, I lean towards running `tload` over SSH to monitor systems, and use `vmstat`, `iostat` and friends to troubleshoot specific problems.

Do you have any favorite programs for monitoring and troubleshooting GNU/Linux systems that should be on this list? Leave a response!

 [1]: http://www.gentoo.org/main/en/shots.xml
 [2]: http://jeremy.zawodny.com/mysql/mytop/
 [3]: http://jeremy.zawodny.com/blog/
 [4]: http://www.gnu.org/software/screen/
 [5]: /articles/images/tload.png

 *[SSH]: Secure Shell
