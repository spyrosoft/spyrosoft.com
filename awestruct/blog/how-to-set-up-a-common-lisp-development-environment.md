---
title: How To Set Up A Common Lisp Development Environment
layout: blog
date: 4-29-16
---
## How To Set Up A Common Lisp Development Environment
------

### SBCL

Steel Bank Common Lisp (sbcl) is a good implementation to use. It is cross platform and a mountain of effort has gone into its development. Do not use clisp - benchmarks compared with sbcl are very poor and many implementation decisions are not optimal (no optimized tail recursion to name one).

### Choose Your Editor

The first thing you will need is a text editor that integrates a development environment for Common Lisp. This pretty much comes down to three available choices:

#### Emacs

If you plan to use Common Lisp for a long time Emacs is likely the best choice. It was created by Richard Stallman largely for the purpose of writing Lisp code. It is currently written in a dialect called Elisp which is a close relative of Common Lisp.

##### Linux

All Linux package managers that I know of will install Emacs with the minimum amount of effort. When run from within a desktop environment a graphical user interface is displayed (which I recommend disabling immediately - see my [dotfiles](https://github.com/spyrosoft/.files/tree/master/.emacs.d)). Otherwise the shell version is more minimal.

##### Mac

[Aquamacs](http://aquamacs.org/) is the way to go.

##### Windows

[Emacs64](http://emacsbinw64.sourceforge.net/) is the way to go. (Or 32 if you're still in the stone age :)

#### Vim

[Slimv](https://github.com/kovisoft/slimv) according to my good friend and [Common Lisp expert](http://github-awards.com/users/search?login=orthecreedence) works very well.

#### LispWorks

To be straight with you, I went to a fair amount of trouble to install [LispWorks](http://www.lispworks.com/downloads/) on Linux and was unable to do so. I gave up and ultimately chose Emacs. Additionally if it is ever used for commercial use, they want you to upgrade from the Personal Edition to the Commercial Edition which is prohibitively expensive.

### SLIME

If you chose Emacs something you won't be able to live without is SLIME. It is an open source integrated development environment. [Clone it](https://github.com/slime/slime) somewhere convenient. I put mine here: ~/.emacs.d/packages/slime/.

Add the following lines to your .emacs.d/init.el or .emacs file:

    (add-to-list 'load-path "~/.emacs.d/packages/slime")
    (setq inferior-lisp-program "/usr/bin/sbcl")
    (setq slime-contribs '(slime-fancy))
    (require 'slime-autoloads)

If your instance of /usr/bin/sbcl is somewhere else, please change the inferior-lisp-program path in the above code appropriately.

Open Emacs, type M-x slime, and you're up and running!

It is worth taking the time to [read the Slime manual](https://common-lisp.net/project/slime/doc/html/).

### Rainbow Delimiters

It is cumbersome trying to determine which parentheses match which. Fortunately an Emacs package exists called rainbow-delimiters to fix this problem.

Visit http://www.emacswiki.org/emacs/RainbowDelimiters and click the link under Download: entitled rainbow-delimiters.el.

Save this file somewhere convenient. I put mine in ~/.emacs.d/packages/.

Open Emacs and add the following lines:

    (add-to-list 'load-path "~/.emacs.d/packages/")
    (require 'rainbow-delimiters)
    (global-rainbow-delimiters-mode)

Now parentheses, brackets, and braces alternate color in your code. I chose a [more rainbow styled color theme](https://github.com/spyrosoft/.files/blob/master/.emacs.d/individual-packages/lisp.el).