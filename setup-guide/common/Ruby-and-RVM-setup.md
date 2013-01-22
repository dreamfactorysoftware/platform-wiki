# Ruby setup

## Overview

This is a short guide showing you how to setup [Ruby] [ruby] with [RVM] [rvm] (Ruby Version Manager), the recommended environment for running the SnowPlow Ruby applications in.

This guide was written for [Ubuntu Server 12.10] [ubuntu], but should work with minor changes in Debian or other Linux distributions.

## 1. Install dependencies

First we want to install all the pre-requisites for RVM. Namely:

	$ sudo apt-get update
	$ sudo apt-get install curl
	$ sudo apt-get install build-essential bison openssl libreadline5 \
		libreadline-dev curl git-core zlib1g zlib1g-dev libssl-dev \
		libxslt-dev libxml2-dev git-core subversion autoconf	

(A list of these can be printed by entering `rvm notes` at the command prompt once you have RVM installed.)

## 2. Install RVM

Now install RVM:
	
	$ curl -L https://get.rvm.io | bash -s stable

Edit `~/.bashrc` or `~/.zshrc` file by adding the following line to the end of the file:

	source $HOME/.rvm/scripts/rvm

Save the above file and restart the terminal. (So the file loads.) 

## 3. Install a specific version of Ruby

Now we can install all the required version of Ruby simply. The SnowPlow Ruby applications use Ruby 1.9.3, so let's install this:

	$ rvm install 1.9.3

(Optional) To use a particular version enter:

	$ rvm use 1.9.3
	$ ruby -v # To check the version

## 4. Project-specific settings

Any SnowPlow Ruby projects should have a `.rvmrc` file in their root, which specifies the Gem file name and the Ruby version to use.

That's it! You are now ready to install any SnowPlow Ruby application, such as:

1. [EmrEtlRunner](EmrEtlRunner-setup)
2. [StorageLoader](StorageLoader-setup)

[ruby]: http://www.ruby-lang.org/en/
[rvm]: https://rvm.io/

[ubuntu]: http://www.ubuntu.com/download/server