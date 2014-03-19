<a name="top" />

[**HOME**](Home) > [**PROJECT & COMMUNITY**](DreamFactory-project-and-community) > [**CONTRIBUTING**](Contributing) > [Documentation](Contributing-to-documentation)

We welcome contributors to the DreamFactory documentation with open arms - just as we welcome contributors to the DreamFactory codebase!

We have two main stores of documentation currently:

* Our wiki: https://github.com/dreamfactorysoftware/dsp-core/wiki
* Our website: http://dreamfactory.com/ including the [Analytics Cookbook] [analytics-cookbook] at: http://dreamfactory.com/analytics/index.html

<a name="wiki" />
## 1. Contributing to the wiki

To make edits to the wiki, fork the repo (git://github.com/dreamfactory/dreamfactory.wiki.git), make edits and then submit a pull request. The wiki is powered by [Gollum] [gollum]: to date the best documentation we've found on using Gollum (particularly embedding code, generating sidebars etc.) is from the [Gollum Readme][gollum-readme].

All the wiki documentation is stored in Markdown format. Good tools for editing markdown include [Markdownpad] (http://markdownpad.com/) on Windows, or [Mou] (http://mouapp.com/) for Mac. We also like [Sublime Text] (http://www.sublimetext.com/).

Going forwards we intend to start hosting the wiki ourselves: this will give us the opportunity to give contributors permission to edit the wiki directly.

<a name="website" />
## 2. Contributing to the website

The DreamFactory website is hosted also hosted on Github (via [Github Pages][github-pages]). The repo is on [https://github.com/dreamfactory/dreamfactory.github.com](https://github.com/dreamfactory/dreamfactory.github.com). As with the wiki, you can contribute by forking the repo, making edits and then submitting a pull request.

Please note that the setup on the website is a bit complicated, because it uses a number of Jekyll features that are not supported by Github pages. As a result:

* Jekyll source files (mostly in markdown) are stored in the source branch of the directory
* These are compiled using Jekyll locally
* Compiled `.html` files are then copied to the master branch where they are served directly via Github without Jekyll. (Because they've already been compiled locally.)

Full instructions on how to work with this setup, including all the software you need to have available locally, can be found on the [repo README][website-repo-readme].

[analytics-cookbook]: http://dreamfactory.com/analytics/index.html
[gollum-readme]: https://github.com/github/gollum/blob/master/README.md
[gollum]: https://github.com/github/gollum
[github-pages]: http://pages.github.com/
[website-repo-readme]: https://github.com/dreamfactory/dreamfactory.github.com/blob/master/README.md