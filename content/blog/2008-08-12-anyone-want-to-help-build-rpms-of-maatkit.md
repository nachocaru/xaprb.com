---
title: Anyone want to help build RPMs of Maatkit?
author: Baron Schwartz
layout: post
permalink: /2008/08/12/anyone-want-to-help-build-rpms-of-maatkit/
categories:
  - Maatkit
  - SQL
tags:
  - Debian
  - packaging
  - RPM
---
Dear LazyWeb, I want to use my Ubuntu laptop (on amd64 BTW) to build an RPM of Maatkit that will work on all RPM-based distros. Is it possible? Or are there enough differences between the RPM-based distros that I can't do it? Mind you, the finished RPM ought to just have some man pages and Perl scripts, so I don't think it will be platform- or distro-specific. But I am just not an expert on it.

The second question is, what do I need to put into my Makefile to do this? My 'make all' currently builds a .zip, a .tar.gz, and a .deb package &#8212; what needs to change to make that include .rpm?

Someone who is willing to help create .spec files, etc, etc will be immediately given commit rights to Maatkit's SVN repository!
