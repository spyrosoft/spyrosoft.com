---
title: Text Editors For Code
layout: blog
date: 4-3-16
---
## Text Editors For Code

* Notepad
* Notepad++
* Visual Studio
* Komodo Edit
* Text Edit
* XCode
* Eclipse
* Nano
* Gedit
* DrJava
* Vim
* TextWrangler
* BBEdit
* Aptana Studio 3
* NetBeans
* Sublime Text 3
* Emacs
* Kwrite
* RStudio
* Atom
* IntelliJ
* Leafpad

If you are a developer this list probably looks familiar. You may have experience using some or most of these. How could there be so many code editors? If you are like me, every time you venture out to try a new editor the result is the same. The editor has somehow fallen short. To this day I continue my search for the one editor to rule them all.

It is maybe due to the fact that all of the effort of editor creators is spread over so many different editors that no single editor is able to sprint ahead. The biggest issues in particular preventing editors from living up to my standards are (in no particular order):

### Customizability

Most editors have at least one or two nice features that the rest tend not to have. The ideal editor needs to be able to absorb any and all of this functionality in a beginner-friendly, straight forward, modular way. This means a few things:

1. The scripting language must be able to call any and all functions that the editor can
2. Once new functionality has been created by users it must be exceedingly easy to share it with other users and the community in general
3. The community must be able to easily contribute back to the shared code
4. The community must be large enough for it even to matter

The settings also need to be set as optimally as possible right from the get-go. A good way to accomplish this is to accept anonymous user feedback on how their settings are - paying attention to how the default settings have been changed and evolving the default settings over time based on popularity.

Some things I have never seen done before that I would really like to see:

1. A set of default settings the user can choose from when setting up the editor for the first time. For example it could contain settings similar to other editors or platforms. Or it could contain options for specific styles of programming or languages.
2. Portable configuration settings which follow the user around to whatever device the user is using and remain constantly up-to-date. Editor settings do not contain sensitive information - there is no reason to make them publicly readable for the world to see. On the same note why not make it easy to switch between different configuration settings at run time, maybe via a keyboard shortcut. This way two people could do extreme programming and still have highly customized configuration settings. This could be through a central server supported by the editor (traffic would be minimal) or github or something to this effect.

### Low Entry Barrier

The editor must be as straight forward as notepad.exe. The fancy underlying functionality must not get in the way of the bare minimum basics. Ever. Anything extra should be added on top, not the other way around.

### Tabs And Spaces

One of the biggest issues by far with almost all editors is their spectacular inability to deal with indentation. Autodetection must work as flawlessly as possible. Files with mixed tabs and spaces should prompt the user when opened for normalization. Formatting entire projects should be a snap. Making it easy peasy to use community coding standards would encourage users to write cleaner code.

### Code Formatting

In a similar manner to indentation, code formatting functionality should be thorough and work mostly automatically. The user needs to be able to customize the code formatting in any way. Previously used code formatting settings should be available via save/load.

As the code is created, the editor should try to help the user as much as possible but still get out of the user's way when he or she wants something specific. For example, after a user types something exactly as they want it and makes a newline, often editors will auto-format the code on the previous line. This is fine, but the ideal editor should include the formatting as an additional undo option. When the user does so, the editor should prompt the user in a non-obtrusive way to redefine the existing standard to match the previous line. When possible, the redefinition should be performed automatically without the need for the user to do so manually. If inconsistencies are found, only the inconsistencies should prompt the user further.

A setting should exist making it possible for the user to have their code formatted whenever it is saved.

### Language Awareness

Interacting with code as it is written is essential. This means a number of things. Ideally there would (optionally) be a connection to the programming language itself. This may require some setup. Streamlining the setup for the user is important.

Web programming should integrate directly with a browser. Front end code should update as it is written and back end code on save. Automation techniques similar to macros or selenium take this from somewhat annoying to can't live without. Hooks need to be available for key events and file save events for the user to decide based on how heavy the page load is, etc.

Turning language awareness up or down while programming should be a snap. Sometimes a programmer just wants to hack and doesn't need constant reminders that the code isn't working yet.

### Keyboard Shortcuts

The less programmers have to move their hands the healthier their hands are and the more effective they are at working. To this end chording should be introduced as a core concept very early on.

### Tutorials

Whenever someone creates new functionality to share with the rest of the community, it would help everyone if a working interactive tutorial shipped with it. This should be built into the framework from the very beginning rendering the help section actually be helpful.

### Conclusion

This is just a short list. Quite a bit of this is somewhat esoteric and won't be used by everyone. There are lots of things that other people want out of their editors which aren't listed here. The whole point is: editors should do what users want.