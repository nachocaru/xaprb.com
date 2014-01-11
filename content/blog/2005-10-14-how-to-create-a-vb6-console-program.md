---
title: "How to  create a VB6 console program"
permalink: /2005/10/14/how-to-create-a-vb6-console-program/
---
Visual Basic 6 programs can be run as console programs, if configured correctly. There are four basic requirements to create a useful console program in VB6:

*   Remove all forms and dialogs
*   Provide access to standard input, output, and error streams
*   Provide access to the command-line arguments
*   Re-link the program for the Windows Console subsystem

### Remove forms and dialogs

By default, a VB6 project has "forms" or "windows," which can contain application code. When running a program in the console, you don't want anything but the console, ever. When you create a VB6 project, just remove all the forms from it, and add a module. You need at least one module, which will contain a subroutine called `Main()`. When you look at the project properties, you will see the "startup object" set to `Sub Main`.

There is still a possibility that some dialogs can be created. For example, a runtime error will pop up a dialog. To avoid this, choose the "Unattended Execution" checkbox in the Project Properties dialog. By default, dialogs will now be shunted to the Windows Event Log. You can control this with the `App.StartLogging` method, if desired.

### Get access to `stdio` streams

A console app usually needs to work with standard input and output. There are at least two ways to accomplish this: by using the Win32 API, and by using the `Scripting.FileSystemObject`'s text streams. In either case, the streams will not be available when running the app in the debugger, so it may be a good idea to create a wrapper around the calls and only try to use them if they are available. The Win32 API calls are easy to use, and I have posted [sample code][1] for your reading pleasure. The `Scripting.FileSystemObject`'s text streams are equally easy to use. Microsoft's [FileSystemObject documentation][2] should help you get started on those. You will need to add a reference to "Microsoft Scripting Runtime" in your project to use the `FileSystemObject`.

### Get access to command-line arguments

The text of the command-line arguments with which the VB6 console app was invoked is available by calling the `Command()` function, but it is non-trivial to parse the text into individual arguments such as those C programmers are used to using. It's not impossible; depending on your needs you may be able to use regular expressions, the `Split()` function, a tokenizer (finite state machine), or invoke the Win32 API again by calling the [CommandLineToArgvW][3] function. The latter uses Unicode, so you will need to convert between VB strings and Unicode. The `StrConv()` function will help here, but on the reverse conversion you will need to do a bit more. Google will provide many links to examples of using these two functions for this job.

### Re-link the program for the Windows Console subsystem

There seems to be no option in the VB project properties or compile options to do this automatically when making the program, so you will need to re-link after compilation. If you don't do this, your program will not run correctly. The standard streams will not be available, for one thing. Fortunately, it is quite easy to do:

`"C:\Program Files\Microsoft Visual Studio\vb98\LINK.EXE" /EDIT /SUBSYSTEM:CONSOLE <yourfile.exe>` (this code should all be on one line).

A handy shortcut is to create a batch file with the command in it. You can then drag your .EXE file onto the batch file. Assuming `LINK.EXE` is in your path, the following will work:

`LINK.EXE /EDIT /SUBSYSTEM:CONSOLE %1`

Don't name the batch file "link.bat" or it will call itself! Another of Microsoft's insecure default behaviors.

### Acknowledgements

I have gleaned this code from all over the Internet. Very little of it is my own.

 [1]: /articles/ModStdIO.bas.txt
 [2]: http://msdn.microsoft.com/library/en-us/script56/html/FSOoriFileSystemObject.asp
 [3]: http://msdn.microsoft.com/library/en-us/shellcc/platform/shell/reference/functions/commandlinetoargv.asp
