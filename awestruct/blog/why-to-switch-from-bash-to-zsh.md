---
title: Why To Switch From Bash To ZSH
layout: blog
---
_**Note**_: if you're interested in switching away from Bash and don't already know about [Fish](https://fishshell.com/), compare it to Zsh before taking the plunge.

### Built-In Config Setup Utility

Each time zsh starts up it checks for existing zsh configuration files. If none exist then the setup utility is opened:

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

It is well organized, straight forward, and worth the time to set everything up to your preferences. This is for certain the first thing a new zsh user should do. Otherwise the default settings are attrocious. I think this is intentional to motivate users to actually use the setup utility.

### No More Need For The Cd Command

In Bash, when a user types a directory by itself and presses enter the following error displays:

    bash: /path/to/directory: Is a directory

Yes Bash. No shit it's a directory. Why don't you go there?

Enter Zsh! This behavior can be added the .zshrc file with the following line:

    setopt autocd

### Partial Directory Completion

    ~/p/g/s/t <tab> <enter>

Now you're in ~/programming/go/src/testing-grounds/.

### Intelligent completion
unzip <TAB>

### Fuzzy File Completion

### Fuzzy Directory Completion
  %br
  \/home/user/example/actual/directory - exists
  %br
  \/home/user/example/directory - doesn't exists, but will look through subdirectories and suggest the one that does

### Command Syntax Completion

### $PROMPT

### OH-MY-ZSH