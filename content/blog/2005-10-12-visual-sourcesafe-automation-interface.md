---
title: How to use the Visual SourceSafe automation interface
permalink: /2005/10/12/visual-sourcesafe-automation-interface/
---
Microsoft Visual SourceSafe provides an automation interface that can be used from within VBScript, VB6 and other languages. This article lists the options for automating SourceSafe, provides links to documentation, and discusses some bugs that are impossible to work around.

### Documentation

I am in the unenviable position of needing to write a VBScript program to interact with SourceSafe. Unfortunately the documentation is hard to find and not at all clear or user-friendly. Here are the two links I find useful:

*   [Visual SourceSafe 6.0 Automation][1] is a poorly-written, incomplete, hard-to-follow, unstructured attempt to jam documentation and an article together. A far cry from Microsoft's usually excellent documentation.
*   [Visual SourceSafe OLE Automation Constants][2]. You will need these constants because the previous article doesn't define values for any of the constants.

### Bugs

I notice a number of bugs. For instance, no matter what I do, I cannot get the IVSSItem.Get or IVSSItem.CheckOut methods working in VBScript (they do work in VB6). I just get strange errors about "Type mismatch" or "Invalid DOS path:" depending on how I call the method. I see others on the web have had the same problem, but no solution. It's pretty miserable.

### Command-line interface

There is a command-line tool, SS.EXE, but it is almost totally unusable for scripting purposes. It has strange dependencies on the Visual SourceSafe client program, requires environment variables instead of accepting command-line arguments, and does very frustrating things that cannot be overriden easily. For example, the "get" command gets the file into the *current directory* even if you specify a subdirectory; in other words, the command <kbd>ss Get dir/file.txt</kbd> will get the file into the current directory, not <tt>dir</tt>. This is a shame, as this is the command I really want to use because it doesn't work via the automation interface in VBScript.

 [1]: http://msdn.microsoft.com/library/en-us/dnvss/html/vssauto.asp
 [2]: http://web.archive.org/web/20041122082635/http://msdn.microsoft.com/vstudio/previous/ssafe/using/articles/oleauto/
