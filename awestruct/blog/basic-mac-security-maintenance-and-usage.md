---
title: Basic Mac Security, Maintenance, and Usage
layout: blog
date: 6-6-16
---
## Basic Mac Security, Maintenance, and Usage
------

This article covers:

* How to create and store good passwords
* How to prevent unwanted programs from starting when your computer starts
* Browser specific security tips
* Useful keyboard shortcuts and settings

------

### Every Day

#### Good Passwords

**Pronunciation:** /ɡo͝od ˈpasˌwərds/

_ADJECTIVE NOUN_

Defined as the use of the maximum length and randomization allowed.

See the [Good Passwords](/blog/good-passwords.html) blog entry for details.

Most importantly, use a password manager ([Keychain](http://www.macworld.com/article/2013756/how-to-manage-passwords-with-keychain-access.html)/[LastPass](https://lastpass.com/)/[1Password](https://www.1password.com/)) to generate and store your passwords.

If you forget the password to your password manager, all of your passwords are lost forever. (That's a good thing.) All you have to do is reset them.

Which brings me to my next point. All of your passwords are only as strong as your email password.

For creating passwords you would like to be able to remember and type in use this strategy:  
[XKCD Password Strength](https://xkcd.com/936/)

When using Keychain, create new keychains with a password different from your login password for extra security.

When sharing passwords with other people have them sign up for LastPass (It's Free!).

#### Updates

A great deal of the time updates ship with security patches. Keep your computer up to date.

#### Computer Viruses

Contrary to popular opinion, Mac computers are not invulnerable. The common term you will hear is "virus" but usually it is actually "malware".

* Virus: Code that replicates by copying itself to other computers
* Trojan: Software designed to be installed by convincing people to type in admin credentials
* Malware: Software designed for malicious purposes
* Adware: Software which makes ads appear where they shouldn't

To avoid malware never type in your administrator password unless you are intentionally going out of your way to install new software.

To weed out the small fry install [Malwarebytes](https://www.malwarebytes.org/).

#### Backups

There are two types of people: those who have lost data and those who will.

Time Machine is easy and awesome. Turn on Time Machine, hook up an external drive, and your computer will prompt you to convert it to a Time Machine drive. It is worth it to take the time to add directories you do not want backed up such as Downloads and Applications.

Now what if your house burns down and both your backup and original are destroyed at the same time? All of your data is gone forever. [Enter Cloud Backup with SOS](https://www.sosonlinebackup.com/pricing-features/).

#### Login Items

System Preferences > User Accounts > Your User > Login Items

Select each item one at a time that should not be booting with your computer then click the Minus button to remove it.

#### Keyboard Shortcuts

* **Command + C** : Copy
* **Command + V** : Paste
* **Command + Z** : Undo
* **Command + Space** : Spotlight
* **Command + Tab** : Switch Applications  
(Hold down Command and continue to tap tab to cycle.)
* **Command + Shift + Tab** : Switch Applications in reverse
* **Command + Tick** : Switch windows in the current Application
* **Command + Shift + Tick** : Switch windows in the current Application in reverse

------

### Yellow Belt

#### Key Repeat Rate

System Preferences > Keyboard > Repeat Rate & Repeat Delay

#### TextEdit Autocompletion

TextEdit > Preferences > Turn off all "helpful" autocompletion

#### Browser Specific Tips And Tricks

* Command + L : Select the URL
* Command + Shift + R : Clear the cache for this page and reload

##### Firefox

Settings > Add-ons > Plugins > Check Your Plugins

##### Chrome

chrome://plugins/

Remove all plugins which should not be there.

#### Keyboard Shortcuts

* **System Preferences > Keyboard > Shortcuts** : View and modify global keyboard shortcuts
* **Command + W** : Close the current window
* **Command + Option + Escape** : Force Quit Applications dialog
* **Command + Comma** : Open Preferences for the current Application
* **Alt + Shut Down** : ????
* Underlined letters on buttons while holding Alt
* Function
  * **Delete** : Delete forwards
  * Arrow Keys
    * **Up** : Page Up
	* **Down** : Page Down
	* **Left** : Home
	* **Right** : End
* **Option Delete** : Delete Full Word (forward or backward)
* Mouse Selection
  * **Double Click** : Highlight Word
  * **Triple Click** : Highlight Sentence including Newline
  * **Double Click + Drag** : Highlight whole words

------

### Hard Core Nerd

#### Keyboard Shortcuts

* **Command + Shift + V** : Paste with no formatting
* **Click, Shift + Click** : Highlight everything in a range without clicking and dragging
* **Alt + Green Button** : Maximize Window rather than Full Screen
* **Command + Left/Right Arrow Keys** : Navigate to the Beginning or the End of the current sentence
* **Alt + Arrow Keys** : Navigate forward or backward one word
* **Ctrl + A** : Navigate to the beginning of the sentence
* **Ctrl + E** : Navigate to the end of the sentence
* **Ctrl + K** : Delete from cursor to the end of the sentence and place the contents on a secret separate clipboard
* **Ctrl + Y** : Paste from the secret separate clipboard at the cursor's position

#### Turn Off Startup Programs

Open a new Finder window.

Create a directory called delete-me-after-[one month from now]. For example, delete-me-after-7-6-16. Create two directories in here named "root" and "user".

Open another Finder window.

Finder > Go > Go To Folder (Command + Shift + G)

We are looking for directories called LaunchAgents, LaunchDaemons and StartupItems. They are located in:

* ~/Library/
* /Library/

Locate them one by one and copy each into the corresponding delete-me directory.

Visit each one again and delete all of their contents which does not have the word "License" in the file name. Especially make sure to delete all Adobe files - they are memory and cpu hogs.