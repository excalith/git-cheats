# Contributing To Interactive Git Cheatsheet

:octocat: Thanks for taking the time to contribute! 

The following is a set of guidelines for contributing to this repository.
#### Table Of Contents
[Code of Conduct](#code-of-conduct)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)
  * [Commit Messages](#commit-messages)

## Code of Conduct
This project and everyone participating in it is governed by the [Interactive Git Cheatsheet Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?
### Reporting Bugs
Before creating bug reports, please perform a [cursory search](https://github.com/excalith/Interactive-Git-Cheatsheet/issues) to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one. When you are creating a bug report, please include as many details as possible. Fill out [the required template](ISSUE_TEMPLATE.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.


### Suggesting Enhancements
Before suggesting an enhancement, please perform a [cursory search](https://github.com/excalith/Interactive-Git-Cheatsheet/issues) to see if the suggestion has already been submitted.

* **User a clear descriptive title** for the suggestion
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why
* **Do not request complicated commands** since this project is to help people get the basic commands

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues](https://github.com/excalith/Interactive-Git-Cheatsheet/labels/beginner) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/excalith/Interactive-Git-Cheatsheet/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

### Localization
In order to localize this app, you only need to modify [commands.json](../assets/commands.json) file.

To start localization;
* Declare your language in `languages` with key / value first and use this convention for your localization.
* Translations are needed in keys:
##### GUI
  * `search` : Search Bar placeholder
  * `advancedCommands` : Dropdown checkbox for advanced commands
  * `readMore` : Read More links for documentations
  * `settings` : Settings title
  * `options` : Command options title within cards
 ##### Cards (throughout all json file)
  * `category` : Category title for command card
  * `desc` : Both command and command option descriptions

### Pull Requests
While creating a Pull Request, fill out the [the required template](PULL_REQUEST_TEMPLATE.md)

* With v1.1.0 you can add complicated commands!
* **Do not** change design into a complicated and / or overwhelming piece of junk
* **Do not** include issue numbers in the PR title
* **Include** screenshots or animated GIFs in your pull request whenever possible


### Commit Messages
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
