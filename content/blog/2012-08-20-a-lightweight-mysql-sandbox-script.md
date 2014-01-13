---
title: A lightweight MySQL sandbox script
date: "2012-08-20"
permalink: /blog/2012/08/20/a-lightweight-mysql-sandbox-script/
categories:
  - Databases
---
For a long time I've been maintaining a set of scripts inspired by [Giuseppe Maxia's MySQL Sandbox][1], which is a Swiss Army Knife for starting and stopping server instances for jobs such as testing, development, trying out a new version, and so on. My scripts are unpublished, until now. I've just kept them in my Dropbox's `bin` folder, which I add to my $PATH.

It's not worth explaining why I use my own scripts, except for saying that I keep dozens or even more MySQL versions unpacked in my home directory at any given time, and I find it a little easier to use these lightweight scripts than the more fully-featured MySQL Sandbox tools.

Usage assumes some conventions are followed. I "install" each version of the server by downloading the generic tarball. Then I unpack it and move it to $HOME/mysql/servers/VERSION, where VERSION is something like 5.5.27. If it is a Percona Server or MariaDB version, I make VERSION include the '-rel' suffix. Then I clean out all of the extra directories and files, so that the bin directory basically includes only the mysqld executable, the share directory has little more than the English message files, and so on. I usually don't need things like the test files, and tools such as the `mysql` command-line client vary little between server versions in most cases, so I just use the system's installed versions or place a single copy of these into my $PATH. With this many versions of the server unpacked, I want to save disk space. I use the mysql\_install\_db script to create a data directory inside the unpacked server directory, and I'm ready to go.

To start a server, all I have to do is say `ms VERSION` and it boots directly in my terminal. To stop it, I simply send it a kill signal.

To connect to it and execute commands, I use the mc command. This will find a running server and then pass along the command-line arguments; to connect to a specific server I use the -P option with a port number. The scripts choose a port based on the server's version number, such as 5527 for version 5.5.27. Socket files are a hassle in a scenario like this; ports are easier for me to use. Therefore I connect over TCP only, and I put `protocol=tcp` in the `client` section in my `$HOME/.my.cnf` file.

To sum up: unpack and trim down the server versions, naming them according to a naming convention, set up a data directory, set up $HOME/.my.cnf, and then create two programs in the $PATH. Here is the `ms` script:

<pre>
#!/bin/bash

which="$1"; shift
if [ -z "${which}" ]; then
   echo "Specify a server"
   exit
fi

cd ~/mysql/server

server="$(ls | grep "${which}" | head -n1)"
if [ ! -d "${server}" ]; then
   echo "No such server ${which}"
   exit
fi
cd "${server}"

MSG=$(find . -name english);
BIN=$(find . -name mysqld);
PLUG=$(find . -name ha_innodb_plugin.so.*);
if [ "$PLUG" ]; then
   PLUG=$(basename "$PLUG")
   PLG_USE="ignore-builtin-innodb"
   PLG_ARG="plugin-load=innodb=$PLUG;innodb_trx=$PLUG;innodb_locks=$PLUG;innodb_cmp=$PLUG;innodb_cmp_reset=$PLUG;innodb_cmpmem=$PLUG;innodb_cmpmem_reset=$PLUG"
fi
BASEDIR=$(pwd);

PORT=$(pwd | awk -F/ &#39;{print $NF}&#39; | sed -e &#39;s/\.\([1-9]\)$/.0\1/&#39; | cut -d- -f1 | tr -d .);
if [[ "$BASEDIR" = *rel* ]]; then
   PORT=$((PORT + 10000));
fi

# write out the my.cnf
cat &gt; my.cnf &lt;&lt;EOF
[client]
user     = root
port     = $PORT
protocol = tcp
socket   = $BASEDIR/data/mysql.sock
[mysql]
prompt   = "$PORT> "
[mysqld]
datadir  = $BASEDIR/data/
port     = $PORT
server_id= $PORT
socket   = $BASEDIR/data/mysql.sock
language = $MSG
basedir  = $BASEDIR
skip-slave-start
log-slave-updates
log-bin  = mysql-bin
relay-log = relay-bin
table_cache = 100
$PLG_USE
$PLG_ARG
EOF

echo "$PORT" > "/tmp/mysql-$PORT"
$BIN --defaults-file=my.cnf --pid-file=/tmp/mysql.$PORT.pid "$@"
rm "/tmp/mysql-$PORT"
</pre>

And here is the `mc` command, which I've tweaked a little to run on Mac OSX as well as Linux:

<pre>#!/bin/sh
# Discover which server is currently running, and use it
case $(uname) in
Linux)
   port="$(netstat -antp 2>/dev/null | awk &#39;/mysqld/{print $4}&#39; | cut -d: -f2 | head -n1)"
   mysql --port=$port "$@"
   ;;
Darwin)
   port=$(ls /tmp/mysql-* | cut -d- -f2 | sort -n | head -n1)
   mysql --port=$port "$@"
   ;;
esac
</pre>

This is pretty basic, and certainly not something I'd promote as [generically useful][2] or ready for the masses, but perhaps it will help someone else who has the (unusual?) usage requirements I have.

 [1]: http://mysqlsandbox.net/
 [2]: http://www.xaprb.com/blog/2012/04/24/the-mysql-init-script-mess/
