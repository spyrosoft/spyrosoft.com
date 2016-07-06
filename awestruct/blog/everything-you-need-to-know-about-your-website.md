---
title: Everything You Need To Know About Your Website
layout: blog
date: 6-15-16
---
## Registrars Vs Hosts

A **registrar** is where you purchase a **domain name**. A **domain name** is something like spyrosoft.com. **Domain names** cost approximately $10 per year.

A **host** is where you put your website files. Most **hosts** cost approximately $120 per year, though this cost can vary quite a bit.

## Who Offers The Best Service?

Good **registrars** are very rarely good **hosts** and vice versa. I recommend **registering** your **domain names** separately from your **host**.

A great **registrar** is [internet.bs](https://internetbs.net/). The price is right and it has all the bells and whistles you might need including free **private whois**. The user experience is a bit lacking, but it's worth it.

For php website **shared hosting** [DreamHost](https://www.dreamhost.com/) is the best option available. A single account offers unlimited domain names, email accounts, linux users (awesome), databases, bandwidth, and free SSL certificates.

For WordPress **hosting** [This Is Tap](https://thisistap.com/) is an awesome startup providing managed WordPress **hosting** for a third as much as anywhere else. They also offer free SSL certificates.

If you know of any better services out there, please [let me know](/contact.html).

## Which Services Should I Avoid?

Often people will come to me for help after having attempted to set up their own website. While I approve of this valiant effort, it almost always saves beginners money and their rebound developer headaches if they ask for advice first.

Let's talk about cPanel. If you don't already know, cPanel is an open source project written in php with the goal of making it easier for the average person to manage **host** settings for their websites. Almost all php **hosts** use cPanel. (godaddy, bluehost, hostgator, etc.)

A serious security issue arises when cPanel is used. All of the websites are placed together in the same directory. This makes all of the websites only as secure as the weakest website. In general it is a good idea to avoid cPanel altogether for this reason.

**Horror Story Time!**

Some friends of mine had an account at BlueHost. There were ten or so WordPress websites. One of the sites got hacked, then all of the sites got hacked. The hacker began sending out massive amounts of spam and replaced much of the website content with malicious content. After a while BlueHost shut down the account. Which is reasonable. However, BlueHost makes no distinction between web hosting accounts and email accounts. Everyone's email went down. Additionally, it turned out that the backup restoration button did absolutely nothing. Backups are a "feature" that costs an extra monthly fee. Most of the website content is gone forever.

## The Basic Inner Workings Of The Internet

### Servers

A **server** is a computer, albeit a weird looking one:

<a href="https://en.wikipedia.org/wiki/File:Inside_and_Rear_of_Webserver.jpg"><img src="/images/blog/server.jpg" alt="Photograph of a server."></a>

It can be anywhere in the world, connected to the Internet. Most **servers** use the Linux operating system.

### What Happens When You Visit A Webpage

Quite a lot happens every time you visit a webpage. Let's walk through it step by step:

1. The **browser** uses the **domain name** in the URL to look up the address to send messages to. For example: 107.170.216.160
1. The **browser** sends a message to the **server** using this IP Address (Internet Protocol Address).
1. The http:// at the beginning of the URL indicates that we are using Hyper Text Transfer Protocol. (There will be a quiz at the end. ;)
1. When the message arrives at the **server**, the **server** checks to see if it is set up for that **domain name**.
1. The **server** sends the message along to the software set up for that **domain name**.
1. The software composes and sends a message back to the **browser**.
1. The **browser** receives the message, reads it, and displays it as a web page.

It's not quite this simple. If you would like further details, please [ask me](/contact.html).

## Web Platforms

In the context of the web, a platform is an online service which offers a web interface for creating and modifying your own websites.

* [Squarespace](https://www.squarespace.com/pricing) offers sleek looking websites for mostly small or medium sized businesses at $16 per month. It supports basic ecommerce.
* [Shopify](https://www.shopify.com/pricing) offers a fast, secure ecommerce platform at $29 per month.

## Web Programming Languages

The **client side** (or the **front end**) refers to everything that happens in the **browser**. In particular:

* **HTML** (Hyper Text Markup Language) - Take a moment to right click on this text and select View Page Source. It is used to describe the containers and content of web pages.
* **CSS** (Cascading Style Sheets) - As an example, take a look at [the CSS used on spyrosoft.com](/css/app.css). CSS is used to specify the positions, colors, fonts, etc. of the HTML content. If you are intersted also take a look at the fascinating technical [history of CSS](https://eager.io/blog/the-languages-which-almost-were-css/).
* **JavaScript** - As an example, take a look at the JavaScript used on the [spyrosoft.com contact page](/js/contact.js).

The **server side** (or the **back end**) refers to everything that happens on the **server**. As opposed to the **client side**, the **server side** is able to run any type of software. Some common web programming languages are:

* **PHP** - One of the most commonly used programming languages for the web. It's greatest strength is its community. Since so many people use it, there is a lot of code available to accomplish common tasks. Facebook and Twitter use it. Pretty much any forum you've ever seen uses it. This is remarkable considering how poorly designed the language is. I can't think of another language which acts this way; for every single page load the following happens:
  * The **browser** message is received
  * All of the PHP files are read from disk
  * All of the PHP files are parsed
  * All of the PHP files are compiled
  * The compiled code runs
  * Page content is generated and sent back to the browser
  * The compiled code is freed from memory (deleted)
* **Ruby** - A beautiful programming language. It also has an incredibly strong community, much of which is devoted to web programming.
* **Python** - A wonderful language. It is beginner friendly and expert friendly. It has a thriving web community despite it's being smaller than those of Ruby and PHP.
* **Go** - An exceptionally speedy programming language. It is relatively new. It was designed by three Google engineers for web programming and as a replacement for C++.
* **Node.js** - Another fairly young programming language. Its strengths are the ability to use the same code on the server as in the **browser**.

## Web Frameworks

Rather than create a great deal of code every single time a website is created, it makes more sense to create a **framework** which can be reused over and over again for lots of different websites.

The most popular framework for the every day person's website is WordPress. Drupal is up there.

New languages are created when programmers find they do not have the correct tools to accomplish a certain, usually specific, type of goal. Frameworks are created when the community using a language finds they do not have the correct tools to accomplish a certain, usually specific, type of goal.

## What Exactly Is A Database?

A **database** is very similar to a collection of spreadsheets. In **database** terms each spreadsheet is known as a **table**. **Tables** have **columns** and **rows**. When a **table** is created each of the **columns** is set up to store a certain type of information in order to speed things up and save disk space.

## Different Types Of Hosting

Most websites are on **shared hosting**. This means that there is one **server** which **hosts** lots of different people's websites. Access to the **server** configuration itself is unavailable. Instead the **server** is set up for a specific type of **hosting** which everyone uses. It can handle a low to medium sized amount of traffic.

The second most common type of **hosting** is **vps** (**virtual private server**). This means that a **server** is running multiple virtual machines. The processing power and memory of the **server** are shared between them. This service is useful if your developer needs full control over the inner workings of the **server**. It can handle a medium amount of traffic.

The third type of **hosting** is called **dedicated**. An entire server is dedicated to you. It can handle a large amount of traffic.

Beyond this is the use of multiple servers in a **cluster**. Each server is set up to display the same information and traffic is split up between them. It can handle a very large amount of traffic.

## The Advanced Inner Workings Of The Internet

### Certificate Authorities

Why does the https in the URL matter so much?

When you send sensitive information such as your credit card number over the internet it has to be concealed from anyone who can see the data while it is on transit.

Without going into too much technical detail, the technique to accomplish this is called public key cryptography. The receiving end creates a Public Key which the rest of the world has access to. At the same time it creates a Private Key which no one else has access to.

Whenever person A (we'll call her Alice), wants to send secret information to person B (Bob), Alice uses Bob's Public Key to jumble the sensitive data into seemingly random 1s and 0s. (Wizardry, I know.) The random looking data can then safely be sent across the network. Even if someone were to intercept the data along the way, there is nothing that can be done with the random looking data. (As of 2016, but that's a conversation for another time.)

When the random looking 1s and 0s reach their destination, Bob uses his Private Key to convert the data back into meaningful content.

This is all fine and dandy, right? Well, what would happen if this is the first time you receive a copy of a Public Key? Couldn't a theif on the network intercept it, swap it out with their own Public Key, and pretend to be the person you are corresponding with?

This is called a Man In The Middle Attack. This is why Certificate Authorities exist. Everyone on the network has an official copy of the Certificate Authorities' Public Keys. These are uptaded every six months or so. Your computer communicates with the Certificate Authority to make sure you have recieved the proper Public Key from the receiving end with no funny business. Then everything proceeds as described above.

## The Internet

[It is Tubes](https://www.youtube.com/watch?v=f99PcP0aFNE)