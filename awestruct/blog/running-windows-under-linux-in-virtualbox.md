---
title: Running Windows Under Linux in VirtualBox
layout: blog
date: 4-27-16
---
_Note:_ Requires a Windows License Key

Dual booting is not ideal for running two different operating systems. It requires quite a bit of effort to switch back and forth and sharing files between the two is not always easy. Sometimes it makes more sense to use virtual machines.

In the case of running Windows under Linux forums here and there strongly indicate both sides of whether or not this works. In particular the chatter regarding OEM licenses vs retail licenses is true. An OEM license that comes with your computer is not valid as a virtual machine license... Sadface. You'll have to buy an entirely new license for this to work.

When ready download a blank bloatware-free Windows ISO file matching the type of license you own. Create a new virtual machine for your version of Windows. Run through the Windows installation. Windows will probably reboot multiple times during the installation process. Ultimately it will ask you for your license key.

To make the virtual machine run full screen, install the VirtualBox Guest Additions by clicking Devices > Install Guest Additions. Follow the instructions there.

\*Clap* And you're done.