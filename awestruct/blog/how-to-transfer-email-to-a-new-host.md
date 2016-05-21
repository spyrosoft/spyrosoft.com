---
title: How To Transfer Email To A New Host
layout: blog
date: 5-5-16
---
## How To Transfer Email To A New Host
------

_Note_: A Linux command line utility exists called imapsync. The [official website](http://imapsync.lamiral.info/) will have you believe that it is for sale for €50. Although I was unable to find it in the Debian repository when I checked last (did I spell something wrong?) it is definitely in EPEL for Red Hat and its variants. I did not have success with imapsync because I was transferring away from Google Mail. Google Mail has not marked it is a "secure application" so I eventually abandoned this approach. In your case you may have better luck. See the [bottom of the page](#imapsync-example) for an example command.

### Forward

There is more than one way to transfer email. For this tutorial Thunderbird will be used as the email client.

### Checklist

1. If it doesn't already exist create the email account on the new server
1. Connect your email client to the new account
1. Send a test email to verify outgoing mail is working
1. Instruct the person whose account is being transferred (the user) to add the new account to their email client
1. Instruct the user to send a test email to you from the new account to verify that they are able to send outgoing mail
1. Instruct the user to select all of the emails in their inbox and in their sent messages and drag them to the corresponding folders in the new account
1. Instruct the user to click and drag each of their additional email folders into the new account's inbox
1. Change the MX records in DNS to point to the new mail server
1. Wait a week - in the mean time instruct the user to continue clicking and dragging all email that comes in on the old account to the new account
1. Instruct the user that when email has stopped trickling in to remove their old account from their email client

### Conclusion

This technique avoids the pitfalls of:

* Having the user change their existing account settings and losing access to their email until they are able to connect to the new server successfully
* Leaving some emails dangling in the old account
* Trying to coordinate the DNS switch with the user updating their account settings in their email client

Good luck. Email is a hairy beast.

### Imapsync Example

The files password-username and password-username-dreamhost are plaintext files containing only the account passwords.

In this example, the first host is Google Mail and the second DreamHost.

    imapsync \
    --user1 "username@example.com" \
    --host1 imap.gmail.com \
    --passfile1 password-username \
    --port1 993 \
    --ssl1 \
    --authmech1 LOGIN \
    --user2 "username@example.com" \
    --host2 sub4.mail.dreamhost.com \
    --passfile2 password-username-dreamhost \
    --authmech2 LOGIN \