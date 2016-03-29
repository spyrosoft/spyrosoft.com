---
title: Why To Switch From Bash To ZSH
layout: blog
---
First off, if you're interested in switching away from Bash and don't already know about Fish, compare Zsh to
  %a{href: 'https://fishshell.com/'} Fish
  before taking the plunge.

#### Partial completion /e/n/v

#### Intelligent completion
unzip <TAB>

#### Fuzzy File Completion

#### Fuzzy Directory Completion
  %br
  \/home/user/example/actual/directory - exists
  %br
  \/home/user/example/directory - doesn't exists, but will look through subdirectories and suggest the one that does

#### Command Syntax Completion

#### $PROMPT

#### Built-In Config Setup Wizard
```
This is the Z Shell configuration function for new users,
zsh-newuser-install.
You are seeing this message because you have no zsh startup files
(the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
\~).  This function can help you with a few settings that should
make your use of the shell easier.


You can:


(q)  Quit and do nothing.  The function will be run again next time.


(0)  Exit, creating the file ~/.zshrc containing just a comment.
That will prevent this function being run again.


(1)  Continue to the main menu.


\--- Type one of the keys in parentheses ---
```

#### OH-MY-ZSH