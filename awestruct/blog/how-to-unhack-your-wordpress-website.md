---
title: How To Unhack Your WordPress Website
layout: blog
date: 9-1-17
---
1. Make a backup of your database
    1. Open up yoursite.com/wp-config.php and make note of the DB_NAME, DB_USER, DB_PASSWORD, and DB_HOST
    1. Download Adminer
       https://github.com/vrana/adminer/releases/download/v4.3.1/adminer-4.3.1-mysql-en.php
    1. Open up cPanel's file explorer or your favorite ftp program
    1. Upload the adminer file to yoursite.com/adminer.php
    1. Visit that url: yoursite.com/adminer.php
    1. Enter your credentials
    1. Click on the Export link on the left, the Save radio button, and then the Export button
    1. Save a copy of the database to your computer just in case!
1. In the file explorer or ftp program move yoursite.com to yoursite.com.old
1. Create a new directory called yoursite.com
1. Unzip a fresh installation of WordPress there:
1. https://wordpress.org/latest
1. Copy wp-config-sample.php to wp-config.php and populate the four values as was done above: DB_NAME, DB_USER, DB_PASSWORD, and DB_HOST
1. Now reinstall each plugin and theme from /wp-admin/

This way you know for sure all of the files are clean again. It's worth it to go to the trouble.