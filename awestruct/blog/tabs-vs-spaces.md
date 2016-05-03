---
title: Tabs Vs Spaces
layout: blog
date: 5-3-16
---
## Tabs Vs Spaces
------

The most important thing is consistency. If a project is using seven spaces and a new developer on the team comes in and starts using anything else it is going to cause issues.

That said, using spaces says "I use X number of spaces per tab. I am right and you are wrong so I am going to force you to use my way."

Using tabs says "Even though I say tomato, you may say tomato. Go forth and display as many spaces per tab as you want and the code will still be formatted properly and make perfect sense."

However, using tabs rather than spaces is a fundamentally different philosophy and needs to be treated that way. When a new line is created, the number of tabs represents the number of blocks in. That's all. There are lots of benefits to this philosophy.

* Simplicity
* Ease of rapidly identifying code blocks
* Less incentive to use shorter, less descriptive variable names in order to avoid line wrapping
* No reformatting necessary when renaming function names

Using one character per indentation reduces the amount of effort to change code block indentation dramatically. One might argue that the editor should be responsible for that. How many editors do this out of the box? If they look like tabs, why not just use tabs? It also makes it easier for less experienced programmers to write dirty code.

One of the most common arguments to using spaces is to allow for variables that line up:

    do_stuff_with_things( first_variable,
	                      second_variable
                          third_variable )

But does that actually help? Doesn't this say the same thing?

    do_stuff_with_things( first_variable,
        second_variable, third_variable )

And now for the obligatory pointing out of why mixing tabs and spaces is the worst of both worlds. Mixing tabs and spaces is like saying 