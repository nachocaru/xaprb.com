---
title: Setting up a Go build system in Sublime Text 2
date: "2013-02-15"
permalink: /blog/2013/02/15/setting-up-a-go-build-system-in-sublime-text-2/
categories:
  - Programming
---
Sublime Text 2 is really nice, but the documentation is truly awful. There are at least 3 versions of it, all of them wrong and incomplete. This blog post shows how I set up a Go build system.

I am using GoSublime, but that is completely independent of the build system. The goal of GoSublime is nice auto-completion and snippets and so on; the build system is just supposed to invoke a command with Control-B (or Command-B), capture the output, and recognize file/line in the output so you can navigate between build errors easily.

Here's how I did it. Using the Tools/Build System/New Build System menu, I pasted the following into the resulting file that opened:

    {
    	"cmd": ["/bin/bash", "--login", "-c", "go build ${directory}"],
    	"file_regex": "^([^:]*):([0-9]+):"
    }
    

And then save the result as Go.sublime-build in the directory it suggests. On my Mac, that is /Users/baron/Library/Application Support/Sublime Text 2/Packages/User/Go.sublime-build.

That's all folks.
