---
title: Using AdBlock to clean up the UI on sites I use a lot
date: "2013-04-06"
permalink: /2013/04/06/using-adblock-to-clean-up-the-ui-on-sites-i-use-a-lot/
categories:
  - Web
---
I use LinkedIn a lot. I also use various Google properties a lot. Both of them have a bunch of distracting and annoying UI features that just get in my way. I know Google and LinkedIn have a vested interest in catching my attention and trying to get me to use their products in the ways that will make them the most money, but as a user, I don't care what they want. I care what I want.

So I've used AdBlock to clean up the elements I don't want. Here's how.

I'm assuming you use one of the many excellent AdBlock extensions for whatever browser you use. If not, you need to do that &#8212; reclaim your browser and view the web the way you want it. Every time I use someone else's computer and they don't have an AdBlock extension it blows my mind.

### LinkedIn Endorsements

LinkedIn has a new endorsement feature. They show me a big banner at the top of the page every time I view a connection's profile page.

[<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/04/linked-in-endorsements.png" alt="linked-in-endorsements" width="655" height="207" class="aligncenter size-full wp-image-3133" />][1]

I don't care. I don't know enough about most of my connections to endorse them publicly, and I don't want to see that nonsense. So I AdBlock it. This is easy to do &#8212; just right-click and select the context menu item to block that whole banner.

I've also hidden the endorsements on my profile. It's nice that people want to endorse me (although I think LinkedIn is almost bullying them into it by putting the obnoxious endorsement box in their faces), but most of the endorsements are for things I'm not actually expert in. Some of them I literally know nothing about. It's interesting to see the difference between what people think I know and what I actually know.

### Google+ Notifications

Somewhere I read that Google+ has quietly become a significantly large social network, with a large fraction of the number of users that Facebook has. I know why that is: it's because Google has tied a Google+ account into nearly all of their services, and most people I know have multiple Google profiles. I have seven, and a couple months ago I had eight. Google can count me multiple times if they wish; that's their business.

What's my business is whether I let them annoy me with notifications. You know that irritating notification bar at the top of the page in all of the pages on Google's domains? This one?

[<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/04/google-plus-notification1.png" alt="google-plus-notification" width="283" height="167" class="aligncenter size-full wp-image-3137" />][2]

As far as I can tell, Google doesn't allow you to disable notifications. The only way I know to get rid of that irritating red animated 1 button is to click on it so it turns back into a faint gray 0:

[<img src="http://www.xaprb.com/blog/wp-content/uploads/2013/04/google-plus-notification-22.png" alt="google-plus-notification-2" width="444" height="118" class="aligncenter size-full wp-image-3138" />][3]

No offense, guys, I do consider you friends, but I don't care that you added me to your circles :-\ I don't use Google+, regardless of what Google tries to make you believe. I bet you were probably bullied into adding me, just to make some annoying suggestion box go away.

The Google+ notifications box is a little harder to hide, because it uses CSS classes to generate the numbers in the box. But a little digging into the page source yielded the following custom AdBlock rules:

`<pre>
google.com##DIV[id*="gbgs"]
google.com##SPAN[id*="gbgs"]</pre>` 
And now all of my Google pages are free of one more time-wasting, attention-disrupting, productivity-killing distraction.

 [1]: http://www.xaprb.com/blog/wp-content/uploads/2013/04/linked-in-endorsements.png
 [2]: http://www.xaprb.com/blog/wp-content/uploads/2013/04/google-plus-notification1.png
 [3]: http://www.xaprb.com/blog/wp-content/uploads/2013/04/google-plus-notification-22.png
