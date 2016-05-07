---
title: Website Security
layout: blog
date: 5-6-16
---
## Website Security
------

Almost all small to medium sized websites are running PHP and usually a CMS. According to Forbes there are [60 Million WordPress websites](http://www.forbes.com/sites/jjcolao/2012/09/05/the-internets-mother-tongue/).

### Shared Hosting

Most shared hosting platforms (godaddy, bluehost, hostgator, etc.), really anything using cPanel, lump all of your sites under the same linux user. This is a worst case scenario. If any of your sites are compromised, all of your sites are compromised. The security of the entire system is only as strong as the weakest security of any individual site.

It is often the case that for an entire shared hosting server Apache runs under one single user. It then serves all of the sites using the same Linux user permissions. This makes it easy for any single site to snoop on files from all of the other websites on the same server. In particular database passwords are visible. This provides read, write and delete access (minimum) to all of the databases on the server.

An even worse consequence is that the file system permission responsibilities are left up to each individual site to set correctly. The purpose and functionality of permissions are not at all obvious to beginners. Many forums recommend solving problems by (chmod -R 777 .) adding full read, write, and execute permissions for all users on the system on all files. When this happens even to a single file (let alone all of the files) the security of your site is only as secure as the least secure site on the entire shared hosting system.

There is a technique known as "jailing" which isolates each user from the others. It is shocking how rare this technique is actually put into practice.

### What Happens If Your Site Is Compromised

The longer a site is compromised the harder it is to restore.

There are a few types of malicious techniques that tend to be used once someone has compromised a server. The two most common:

* Spam may be sent out via backdoors scattered across the code base.
* Database content may be modified with malicious links.

If the first happens, manually removing all of the backdoors is difficult and not always 100% successful.

If the second happens, restoring the database will result in the loss of data added since the backup was created.

### Techniques Used To Compromise Your Website

By far the most common technique is to scan websites across the internet for known vulnerabilities.

In general vulnerabilities tend to be in third party software such as extensions, themes, or libraries. Once the server has been compromised backdoors are planted and left alone for six months or more. Then suddenly spam is sent out in volume. It is difficult to remove the backdoors at this point because all of the backups have long since expired.

The second most common technique is to brute force the server login. To "brute force" means to try lots of different passwords until one of them succeeds. It is far too common for server passwords to be weak. Here are [some](https://xkcd.com/936/) [resources](http://blog.codinghorror.com/your-password-is-too-damn-short/) for making better passwords.

### PHP

I think I will let PHP [speak](https://phpmanualmasterpieces.tumblr.com/) [for](http://hexatlas.com/entries/6) [itself](https://en.wikiquote.org/wiki/Rasmus_Lerdorf).

### Prevention

The best thing to do is to take preventative measures. In my experience three in every forty WordPress sites over the course of six years are compromised. This risk increases with time and neglected maintenance or third party software as described above.

Fun fact: if a theme or plugin is disabled in the admin it is still just as vulnerable as when it is enabled. All software should be removed that is not in use. Also consider using more secure technologies.