---
title: How to exploit an insecure order of access to resources
date: "2005-11-03"
url: /blog/2005/11/03/insecure-default-order-of-access-to-resources/
categories:
    - Security
---
When gaining access to resources, such as loading a DLL or invoking a program, beware of default order of access. Insecure defaults can result in using the wrong resource. I find this particularly a problem on the Microsoft platform. Here are two cases where the Microsoft approach, designed to "make it easy," ends up making it insecure instead.

### Invoking an executable program

If you do not specify the absolute location of the executable, where does the OS look for it? In Microsoft Windows, the search path is first in the current directory, then in the $PATH environment variable. This leads to a very easy exploit: find out the current directory, then place a compromised executable in that location, named the same as a standard executable like notepad.exe. Now when the user types <kbd>notepad file.txt</kbd>, the fake "notepad" executes and does whatever it wants.

UNIX solves this problem by forcing you to explicitly specify "I mean the executable in the current directory." If you want to execute <kbd>prog</kbd> in the current directory, you must type <kbd>./prog</kbd>. Otherwise the search path is in $PATH only. You can override this by adding "." to $PATH, but only a very foolish user would do that.

### The .NET Global Application Cache

The Microsoft .NET platform's Global Application Cache (GAC) is often misunderstood and misused. I attribute this to under-skilled developers having access to powerful programming tools. (I continue to believe programming should NOT be "made easy." This is one way security flaws happen.) I think these under-educated programmers are very likely to misuse the GAC and leave openings for exploits like the one I just demonstrated. In my personal experience, I've seen quite a few people use the GAC just because they can, when in fact what they are putting in the GAC should NOT be made available to every application, and should just be put in the local directory with the executable.

### Loading a library

Again, by default the OS looks for libraries in the same directory as the executable. If you want to force an executable to load a tainted library instead of a system-provided DLL, all you have to do is place a bogus file in the executable's directory. You can protect yourself from this by always installing the DLL in the executable's directory and not allowing it to look in the system's own directories, but then you lose the benefit of sharing code between applications.

### How to break Internet Explorer's content rating system

Here is a simple exploit that demonstrates the above technique by breaking Internet Explorer's rating defaults (thanks to James Whittaker for showing me this).

1.  Open Internet Explorer and view any website, such as Google's homepage.
2.  Enable Content Advisor and block Google. 
    1.  Open the Tools:Internet Options dialog, and click on the Content tab.
    2.  Click on "Enable" to turn Content Advisor on.
    3.  It will ask you for a username and password; enter some values you can easily remember. The point here is simply to turn the Content Advisor on, not to try to crack the password you enter.
    4.  Once you have enabled it, click on Settings (it will ask for your password again).
    5.  Enter www.google.com into your list of disapproved sites by typing the address into the "Allow this Web site" box, then clicking "Never."
    6.  You have now blocked Google.
3.  Restart IE and try to view Google's homepage. Content Advisor should block it.
4.  Block IE's access to the DLL that implements Content Advisor, thereby disabling the functionality. 
    1.  IE uses msrating.dll to implement Content Advisor. This is a system DLL, so we can force IE to try to load the DLL from the wrong location by putting a file called msrating.dll in the IE executable's directory.
    2.  Create a bogus "DLL" in `c:\Program Files\Internet Explorer` with the following command in the Run dialog: `notepad c:\program files\Internet Explorer\msrating.dll`. Notepad will say the file does not exist, and ask if you want to create it. Say Yes, and save the file (you can put something in it or leave it empty, it doesn't matter).
    3.  As James Whittaker says, who knew it was so easy to write a DLL?
5.  Restart Internet Explorer and go to Google's homepage. It will NOT block access to the site, indicating that when IE tried to load msrating.dll it failed (because it tried to load a text file, thinking it was a DLL!). The Content Advisor functionality is not available, as you can see by opening the Internet Options dialog and noticing the Content Advisor settings are grayed out.
6.  When you are finished amazing your friends and coworkers, you should delete the bogus msrating.dll file.
