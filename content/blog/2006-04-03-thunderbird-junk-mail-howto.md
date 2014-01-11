---
title: How to train Thunderbird to detect junk mail
date: "2006-04-03"
permalink: /2006/04/03/thunderbird-junk-mail-howto/
---
Mozilla Thunderbird has an excellent spam filter built into it, but if you don't understand how it works, it may just frustrate you. In this article I'll show you how to use it to its full advantage.

### Overview

There are several different ways to distinguish good mail from junk mail. One of the most popular is a [Bayesian filter][1], which is sometimes combined with other techniques as well. [Mozilla Thunderbird][2] has a built-in Bayesian filter. It can learn the difference between good and junk mail, and then Thunderbird can handle the junk mail as desired.

To get the most out of junk mail filtering, you need to turn filtering on, train your filter, and configure Thunderbird to handle junk mail as you wish.

### Turn filtering on

There are several steps to enabling filtering. Here's how I do it. First, I open the Tools/Junk Mail Controls dialog. I select my email account in the pull-down menu, then check the following options:

*   WhiteLists &#8212; I check the "Do not mark&#8230;" option
*   Handling &#8212; I check the "Move the&#8230;" option, and select a folder to move the messages to. I don't want to delete the junk mail yet. I need it to train the filter. I check the "When I manually&#8230;" option, and again select to move them. Thunderbird is a bit weird about handling messages when I mark them as junk; it's like having the rug pulled out from under me, so sometimes I mark the wrong one by accident.
*   I don't use logging, because I don't have Thunderbird delete messages for me automatically.

I switch to the "Adaptive Filter" tab and check the "Enable adaptive junk mail detection" option. This is the real magic. It turns on the Bayesian filter and starts it learning.

### Train the filter

Bayesian filters are "learning" filters; they need to be taught to recognize **both good and junk mail**. They learn not only the probability of an email being junk, but the probability it is good, and use both to determine whether to mark an email as junk.

Once I turn the filters on, I run them. By default Thunderbird examines new messages as they come into my inbox, but I have folder after folder of saved messages I know to be good, which is a great way to train the filter. I simply go to each folder and run the filter with the "Tools/Run Junk Mail Controls&#8230;" menu option, then correct each message it thinks is junk. By doing so, I'm telling it how to recognize good messages.

When my Junk folder has a few messages in it, I look through them and correct the filter if it got any wrong. When I see junk mail in my Inbox that isn't detected as junk, I mark it as junk and teach the filter the error of its ways.

### Sit back and enjoy

This sounds tedious, but in reality it only takes a few tries for the filter to get good, very good indeed. After a day or two, the filter worked so well for me that I've very rarely had to correct it since. It identifies thousands of junk messages almost without fail. Occasionally I open my Junk folder and sort it by sender. This makes it easy to see if there are any messages I want to keep. I can't remember the last time there were any. Then I select "Tools/Delete Mail Marked as Junk in Folder" and delete all the junk.

If junk mail plagues you, and you don't want to rely on some program that might delete something important, you might give Thunderbird a try. You might find it works better than you imagined.

 [1]: http://en.wikipedia.org/wiki/Bayesian_filtering
 [2]: http://www.mozilla.com/thunderbird/
