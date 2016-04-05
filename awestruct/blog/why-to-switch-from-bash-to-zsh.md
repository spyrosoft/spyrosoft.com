---
title: Why To Switch From Bash To ZSH
layout: blog
date: 4-2-16
---
## Why To Switch From Bash To ZSH

_**Note**_: if you're interested in switching away from Bash and don't already know about [Fish](https://fishshell.com/), compare it to Zsh before taking the plunge.

### Built-In Config Setup Utility

When zsh starts it checks for configuration files. If none exist it prompts the following:

    This is the Z Shell configuration function for new users,
    zsh-newuser-install.
    You are seeing this message because you have no zsh startup files
    (the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
    ~).  This function can help you with a few settings that should
    make your use of the shell easier.
    
    You can:
    
    (q)  Quit and do nothing.  The function will be run again next time.
    
    (0)  Exit, creating the file ~/.zshrc containing just a comment.
    That will prevent this function being run again.
    
    (1)  Continue to the main menu.
    
    --- Type one of the keys in parentheses ---

It is well organized, straight forward, and worth the time to set everything up for your own preferences. This is certainly the first thing a new zsh user should do. Otherwise the default settings are quite bad. I think this is intentional to motivate users to actually use the setup utility.

Each of the features mentioned below are all found here in this utility.


### No More Need For The Cd Command

In Bash, when a user types a directory path and presses enter the following error displays:

    bash: /path/to/directory: Is a directory

Yes Bash. No shit it's a directory. What is the only possible thing a user would want to do with said directory?

Enter Zsh! Zsh is smart enough to know that the user wants to cd there and does so without complaint.


### Completion Cycling

As a comparison, Bash completion is accomplished by partially typing something to complete, then pressing \<tab> twice. This displays a list of available completions in the shell. The user then has to continue typing the correct completion until it is unique in the list of completions, at which time the completion is finally performed.

Zsh displays a completion list immediately upon pressing \<tab> the first time. If there is only one possibility it is completed right then and there in the same manner as Bash does. Otherwise and unlike Bash the user has the option to continue to press \<tab> to cycle through the rest of the available completions.

Zsh completions are only written out to the shell one time. If the user refines the completion search, the old completions are overwritten. Bash leaves the old completions up consuming quite a bit of vertical lines in the shell.


### Partial Directory Expansion

Zsh ships with an innovative method of moving around the file system. By typing the first part of a directory name and adding a slash afterwards, Zsh attempts to locate the corresponding directory expansion. For example:

    ~/p/g/s/t <tab>

Will expand to:

    ~/programming/go/src/testing-grounds/

On the condition that more than one directory expansion is possible for the given input, Zsh expands as many directories as it can then displays the the collisions at that directory level as completion options. Once the user has \<tab>ed to the desired completion, the user can choose that completion by typing a character and immediately deleting it again. The directory expansion can then be continued by pressing \<tab> again.


### Intelligent File Completion

The only file completions displayed are completions that would make sense for the given command. As an example using unzip only files with the .zip file extension or directories are shown.

    unzip <TAB>


### Fuzzy File Completion

Spell a filename wrong at the shell? That's OK. Zsh will do its best to figure out which file the user wanted and include its guesses as available completions.


### Fuzzy Directory Completion

Imagine that there is a directory:
/home/user/example/actual/directory

However it has been a while and the directory heirachy isn't very fresh in the user's memory. The user tries following instead:
/home/user/example/directory

Zsh knows that the user may have missed a directory and helps out by searching for the missing directory in each of the subdirectories starting at the missing directory's level. Zsh then suggests any matching directories as a completion.


### Command Syntax Completion

Trying to remember a command's flag? Begin typing the command as you remember it and press \<tab>. Completions for the available flags are shown consicely eliminating most of the need to refer to a reference such as the man page.


### Partial Command History Reverse Search

Rather than searhcing for a command through your entire command history by pressing the up arrow, you can type as much of the command as you remember and then press up. Only commands beginning with what you typed are displayed.


### $PROMPT

In Bash the variable PS1 is not very descriptive. The Zsh equivalent is appropriately named PROMPT.

There are all kinds of fancy things you can do with your prompt including colors. The available colors are as follows:

* green
* cyan
* white
* red
* blue
* yellow
* black
* magenta


### OH-MY-ZSH

A project to encourage people to switch to Zsh by easing the transition considerably exists called [Oh My Zsh!](https://github.com/robbyrussell/oh-my-zsh). The [creation story](https://medium.com/@robbyrussell/d-oh-my-zsh-af99ca54212c) is fascinating and worth the read.

Personally the thought of running unknown code downloaded from the internet each time the shell starts terrifies me. Especially as root or on a personal user's account. Think about it: the security of this is only as strong as Robby Russel's email password. However, realistically this risk is very low. And if you're not lazy like I am, you can read through the code line by line to see what it's doing and know for sure everything is fine.

Assuming you either don't mind the security issue I mentioned and just want to get Zsh up and off the ground as soon as possible or have gone to the effort of reading through the code, Oh My Zsh! is really great.