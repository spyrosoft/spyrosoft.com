---
title: Website Security
layout: blog
date: 5-6-16
---
### What Does "Secure" Mean?

In the context of a secure connection, secure means https appears in front of the domain:

<img alt="Example image of https with the lock icon" src="/images/https-example.png">

When https is present, your browser sends information in a secret way across the internet. The information is secure in the sense that if people on the network are able to scan the information while it is on transit, they will not be able to tell what the contents are.

In the context of building a secure website, security means allowing only those who are authorized to make modifications to the website. The technologies used to build the majority of the websites on the internet today are not very secure. Almost all small to medium sized websites are running PHP and usually a CMS (Content Management System). According to Forbes there are [60 Million WordPress websites](http://www.forbes.com/sites/jjcolao/2012/09/05/the-internets-mother-tongue/). In my experience three in every forty WordPress websites become compromised every five years. Compromised means unwanted code is remotely planted in lots of files across a website.

### Shared Hosting

Most shared hosting platforms (godaddy, bluehost, hostgator, etc., really anything using cPanel) lump all of your sites under the same linux user. This is a worst case scenario. If any of your sites are compromised, all of your sites are compromised. The security of the entire system is only as strong as the weakest security of any individual site.

It is often the case that for an entire shared hosting server Apache runs under one single user. It then serves all of the sites using the same Linux user permissions. This makes it easy for any single site to snoop on files from all of the other websites on the same server. In particular database passwords are visible. This provides read, write and delete access (minimum) to all of the databases on the server.

An even worse consequence is that the file system permission responsibilities are left up to each individual site to set correctly. The purpose and functionality of permissions are not at all obvious to beginners. Many forums recommend solving problems by (chmod -R 777 .) adding full read, write, and execute permissions for all users on the system on all files. When this happens even to a single file (let alone all of the files) the security of your site is only as secure as the least secure site on the entire shared hosting system.

There is a technique known as "jailing" which isolates each user from the others. It is shocking how rare this technique is actually put into practice.

### What Happens If Your Site Is Compromised

A compromised website damages the image of the company and the search engine ranks of the website. It is expensive and time consuming to fix. Sometimes data is lost permanently. The longer a site is compromised the harder it is to restore.

There are a few types of malicious techniques that tend to be used once someone has compromised a server. The two most common:

* Spam may be sent out via the backdoors scattered across the code base.
* Database content may be modified with malicious links.

If the first happens, manually removing all of the backdoors is difficult and not always 100% successful.

If the second happens, restoring the database will result in the loss of data added since the backup was created.

### Techniques Used To Compromise Your Website

By far the most common technique is to scan websites across the internet for known vulnerabilities.

In general vulnerabilities tend to be in third party software such as extensions, themes, or libraries. Once the server has been compromised backdoors are planted and left alone for six months or more. Then suddenly the attacker does whatever they want. It is difficult to remove the backdoors at this point because all of the backups have long since expired.

The second most common technique is to brute force the server login. To "brute force" means to try lots of different passwords until one of them succeeds. It is far too common for server passwords to be weak. Here [are](/blog/good-passwords.html) [some](https://xkcd.com/936/) [resources](http://blog.codinghorror.com/your-password-is-too-damn-short/) for making better passwords.

These two are the most common because anyone connected to the internet can use them.

Another happens when someone logs into their website admin panel while using a wifi hotspot. Anyone else also using the same hotspot can see all of the data transferred back and forth from everyone else using the hotspot - the user and password fly by in plain text. This is not true if https in the URL.

### PHP

I will let PHP [speak](https://en.wikiquote.org/wiki/Rasmus_Lerdorf) [for](http://hexatlas.com/entries/6) [itself](https://phpmanualmasterpieces.tumblr.com/).

### Prevention

The best thing to do is to take preventative measures.

For PHP Content Management Systems in particular:

* Update your website software once every couple of months. "But it might break my website!" I hear you say. If that is the case the website was not set up properly. [Hire a different developer](/).
* Delete all unused plugins and themes. If a theme or plugin is disabled in the admin it is still just as vulnerable as when it is enabled.
* Only install plugins and themes that you trust. Ideally find someone who can read the code to review it and make sure that it is safe. Otherwise look at how many installations it has, what user ratings are saying, how recently it has been updated, and how many other plugins/themes that developer has made. Social proof is usually fairly trustworthy.
* Find [a good web host](https://www.dreamhost.com/hosting/).

For websites which are truly concerned about security (for example sensitive data is being stored on the server):

* Avoid Apache, PHP, and MySQL entirely.
* Don't reinvent the security wheel. Services are your best bet. When it comes to ecommerce, one of the best and most secure options available is [Shopify](https://www.shopify.com/pricing). [I am available](/contact.html).
* If services won't work and you need a custom solution, Less Software = More Security. Only install the software on your server that you absolutely need.