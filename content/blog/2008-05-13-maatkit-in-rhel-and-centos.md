---
title: Maatkit in RHEL and CentOS
author: Baron Schwartz
layout: post
permalink: /2008/05/13/maatkit-in-rhel-and-centos/
description:
  - Do you want Maatkit to get into the CentOS-Extras repository?
categories:
  - GNU/Linux
  - Maatkit
  - Perl
  - SQL
tags:
  - CentOS
  - Karanbir Singh
  - RHEL
---
**Update: ** Karanbir says "Just one thing to keep in mind is that we dont want too many people using it from the Testing repository &#8211; we only need enough feedback to move it from testing to stable ( and to be honest, there are already 8 people who have said yes it works &#8211; so move to stable should happen within the next 24 &#8211; 48 hrs ). Once the package is in stable, users on CentOS4 and 5 wont need to do anything more than just 'yum install maatkit' and it will install for them."

At least one person (Karanbir Singh) is working to get [Maatkit][1] into the [CentOS][2] repositories, and I believe there might be movement towards [RHEL][3] also. From an email to the Maatkit discussion list a little while ago,

<blockquote cite="http://sourceforge.net/mailarchive/message.php?msg_name=4821C7FC.5070801%40karan.org">
  <p>
    I am in the process of getting maatkit into the CentOS-Extras repositories. The first step for that is that every package needs to go into a CentOS-Testing repo and feedback is required from the project and users on its stability / usability and packaging quality.
  </p>
  
  <p>
    maatkit-1887 is now available in the CentOS-Testing[*] repo's and as soon as we can get some feedback ( needs to be 5 different people, none of whom can be CentOS Developers ) &#8211; the packages will move into the main repository so that all users can get access.
  </p>
  
  <p>
    I'd appreciate it if people on this were able to give those packages a go and let me know if there are any issues. You can leave feedback :
  </p>
  
  <ul>
    <li>
      via the maatkit-discuss mailing list (http://sourceforge.net/mailarchive/forum.php?forum_name=maatkit-discuss)
    </li>
    <li>
      on the centos-devel list ( http://lists.centos.org ) or
    </li>
    <li>
      http://bugs.centos.org/ against category 'maatkit'
    </li>
  </ul>
  
  <p>
    [*] : Info about the Testing repo and howto set it up on your machine : http://wiki.centos.org/Repositories
  </p>
</blockquote>

If you're interested in getting Maatkit into these repositories, please take a moment and give the requested feedback. I can't do it because it would be a conflict of interest for the main developer to assert that the code is stable and usable.

 [1]: http://www.maatkit.org/
 [2]: http://www.centos.org/
 [3]: http://www.redhat.com/rhel/
