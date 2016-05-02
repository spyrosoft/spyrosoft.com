---
title: Three Delimiter Characters
layout: blog
date: 5-2-16
---
## Three Delimiter Characters
------

Let's standardize three characters whose sole purpose is exactly that: to delimit.

Why three? One open delimiter, one close delimiter, and one separator delimiter.

As it stands today regular characters such as quotes, tabs, brackets, etc. are used as delimiters. That's fine. However these characters are common in text data that needs to be packed into data transfer formats (e.g. json) and end up needing to be cancelled properly. Maybe there is another way.

### Nesting

If we know for certain that the data has matching open and close delimiters a door opens to leave characters as they are rather than cancel them. On a small scale, this is a non-issue. It is more important for large scale, minimum latency dependent systems. It trades a data size benefit for a computation hit (assuming validation happens).

An example of an existing technique which accomplishes nesting perfectly is the s-expression. S-expressions use parens as end delimiters and spaces as the separator delimiter.

### The Separator Delimiter

In particular let's take a look at the .csv (comma separated value) format. Comma is a silly character to choose as a delimiter for spreadsheets. Commas will appear all the time in the content. Why not something like pipe \| ? I have to wonder how much money and productivity would have been saved through the years if this one simple thing had been different.

### Conclusion

Pretend for a moment that we could start over with a blank slate and make all of these decisions for the first and final time. The characters could look like anything.

Since that option isn't very practical :) I propose standardizing on curlies and pipes.