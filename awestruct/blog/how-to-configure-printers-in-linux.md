---
title: How to Configure Printers in Linux
layout: blog
date: 4-28-16
---
### CUPS

There is more than one utility out there which can be used to configure printers under Linux. CUPS is the one you will hear about the most these days (2014). Install CUPS and the third party system-config-printer package if you have not already done so.

If you use Arch, you will need to systemctl start cups. If you would like, systemctl enable cups instead.

Run system-config-printer. Click the Add button and enter an admin’s credentials.

If you are using a network printer, expand the Network Printer section.

### LPD/LPR

The Line Print protocol is recognized by pretty much all printers. It is one of the earliest printer protocols used by UNIX and is so basic that there is no reason for printer companies not to include it.

Enter your printer’s device URI as demonstrated.

### The Printer Queue

Your printer expects traffic to a specific queue. Queue names are about as standard as cell phone chargers. To identify yours, search for yours in this list of printer queues. Common ones include “queue” and “printer”. Mine Canon MX870 uses “L1″. If you can’t find yours, search for “your printer model queue” in Google.

Congratulations, you can now print from your Linux computer!