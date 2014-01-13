---
title: How to implement CAPTCHAs without images
date: "2006-01-28"
url: /blog/2006/01/28/captchas-done-better/
---
I've started getting a lot of spam comments, so I decided the time has come to put a simple system in place to foil the spam robots. In an earlier article I asserted [CAPTCHAs are terrible][1] and there are easy ways to foil naive robots without making the site inaccessible or unusable. I've implemented a simple question-and-answer system to prove my point. Comment forms show a randomly chosen predefined question (I've only put three in the system) and display several predefined answers, only one of which is correct. This took about 30 minutes and maybe 20 lines of actual code to do. Right now the questions and answers are hard-coded in a new include file, but it would be trivial to database them too.

### How I did it

Create a new file, say `captchas.php`. Fill it with an array of entries, one per question:

<pre>&lt;?php
$captchas = Array();

# Create a single entry
$captchas[] = array(
    "question" =&gt; "What color is the sky?",
    "answer" =&gt; "blue",
    "options" =&gt; array("blue", "red", "orange"));

# Create as many as desired by copy-and-paste...
?&gt;</pre>

Modify the comment form. Include the above file in `wp-content/themes/default/comments.php`, and change a few lines where the form is displayed. At the top of the file:

<pre>&lt;?php require_once("captchas.php"); ?&gt;</pre>

Then, just before the SUBMIT button for the form, 
    
<pre>&lt;?php
$tabindex = 5;
$captcha_index = rand(0, count($captchas) - 1);
?&gt;
&lt;input type="hidden"
    name="captcha_index" value="&lt;?php echo $captcha_index; ?&gt;" /&gt;
&lt;p&gt;&lt;?php echo $captchas[$captcha_index]["question"]; ?&gt;
&lt;?php foreach ($captchas[$captcha_index]["options"] as $captcha_answer) { ?&gt;
&lt;br /&gt;&lt;label for="captcha_&lt;?php echo $captcha_answer; ?&gt;"&gt;
&lt;input tabindex="&lt;?php echo $tabindex++; ?&gt;"
    id="captcha_&lt;?php echo $captcha_answer; ?&gt;" type="radio"
    name="captcha" value="&lt;?php echo $captcha_answer; ?&gt;"
    /&gt;&lt;?php echo $captcha_answer; ?&gt;&lt;/label&gt;
&lt;?php } ?&gt;&lt;/p&gt;</pre>

Now the randomly chosen question's ID and the user's answer are submitted along with the form.

On the receiving end of the form, which is in `wp-comments-post.php`, all I have to do is check the answer against the correct answer for the question. First, I include the `captchas.php` file as before. Then I grab the two new inputs where the rest of the input is grabbed:

<pre>$comment_author       = trim($_POST['author']);
$comment_author_email = trim($_POST['email']);
$comment_author_url   = trim($_POST['url']);
$comment_content      = trim($_POST['comment']);
$comment_captcha_idx  = trim($_POST['captcha_index']);
$comment_captcha      = trim($_POST['captcha']);</pre>

Only the last two lines are changed in that code sample -- I included the first lines for context. I use the input a bit later, where the input checking occurs:
    
<pre>if ( !is_numeric($comment_captcha_idx) || !$comment_captcha
    || $captchas[$comment_captcha_idx]["answer"] != $comment_captcha)
{
        die( __("Error: wrong answer to the CAPTCHA question"));
}</pre>

That's it. I'm done. It took longer to explain than to actually write the code.

### How hard is it to circumvent this?

If you're a human, or if you're trying to bypass *just my site*, it would be easy to do, but if you're a spam robot, bypassing the system means learning something about my site (the questions and answers) that is different from other sites. I'm counting on spam robots to be dumber than that, and assume all WordPress sites are the same. Time will tell if I'm right; I anticipate not getting any more spam comments, though. I think the crucial thing is to get it "right enough" that humans find it easy and it's just a *little too hard* for spam robots to make it worth anyone's while. This is, in my opinion, the essential trade-off in security and any other application where you want to stop the Wrong Thing from happening. You can never truly guarantee the Wrong Thing won't happen, but you can make yourself a less attractive target so all the easy targets will get the heat instead.

 [1]: http://www.xaprb.com/blog/2005/11/03/captchas-are-a-terrible-thing/
