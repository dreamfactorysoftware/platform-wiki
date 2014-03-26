In order to enable Javascript handlers for your DSP, you must install the [V8js](http://pecl.php.net/package/v8js) extension from [PECL](http://pecl.php.net). At the time of this writing (March 2014), the current PECL extension does not compile and is not installable.

If you wish to enable server-side Javascript event handlers, you must compile and install an earlier version of the V8 library.

The following instructions are one way to get the PECL extension to install. It is assumed you have **sudo** rights and the necessary tools on your box to compile C/C++ programs. You should also be familiar with **git** but having it installed on your system works too.

> Help with using git, and cloning the V8 library, is available in the [repository's wiki](https://code.google.com/p/v8/wiki/UsingGit).

In a nutshell, this is what needs to happen...

 * Create a new, or change to a, directory where you can clone a repository.
 * Clone the V8 repository and then we need to check out the [tagged branch 3.15.5](https://github.com/v8/v8/tree/3.15.4) which we've determined as **working**
 * Make the **dependencies** target
 * Make the **native** target
 * Copy the include files and libraries to your system directories

Here's the command list for the entire process:

```bash
	sandman@cloud9:~/forks $ git clone https://github.com/v8/v8
	Cloning into 'v8'...
	remote: Reusing existing pack: 145780, done.
	remote: Counting objects: 431, done.
	remote: Compressing objects: 100% (430/430), done.
	remote: Total 146211 (delta 256), reused 0 (delta 0)
	Receiving objects: 100% (146211/146211), 103.23 MiB | 402.00 KiB/s, done.
	Resolving deltas: 100% (126167/126167), done.
	Checking connectivity... done
	Checking out files: 100% (3718/3718), done.
	sandman@cloud9:~/forks $ cd v8
	sandman@cloud9:~/forks/v8 $ git checkout tags/3.15.4
	sandman@cloud9:~/forks/v8 $ make dependencies
	svn checkout --force http://gyp.googlecode.com/svn/trunk build/gyp --revision 1501
	A    build/gyp/pylib
	A    build/gyp/pylib/gyp
	... blah blah blah ...
    A    build/gyp/OWNERS
    Checked out revision 1501.
	sandman@cloud9:~/forks/v8 $ make native library=shared
	GYP_GENERATORS=make \
		build/gyp/gyp --generator-output="out" build/all.gyp \
					  -Ibuild/standalone.gypi --depth=. -S.native  -Dcomponent=shared_library -Dv8_can_use_vfp3_instructions=true
	make[1]: Entering directory `~/forks/v8/out'
	... blah blah blah...
	  TOUCH /opt/forks/v8/out/native/obj.target/build/All.stamp
	make[1]: Leaving directory `/opt/forks/v8/out'
	sandman@cloud9:~/forks/v8 $ sudo cp include/v8*.h /usr/include/
	sandman@cloud9:~/forks/v8 $ sudo cp native/out/lib.target/libv8.so /usr/lib/libv8.so
	sandman@cloud9:~/forks/v8 $ sudo pecl install v8js-0.1.3
	downloading v8js-0.1.3.tgz ...
	Starting to download v8js-0.1.3.tgz (17,968 bytes)
	......done: 17,968 bytes
	8 source files, building
	*... blah blah blah ...*
	Build process completed successfully
	Installing '/usr/lib/php5/20121212/v8js.so'
	install ok: channel://pecl.php.net/v8js-0.1.3
	configuration option "php_ini" is not set to php.ini location
	You should add "extension=v8js.so" to php.ini
```

At this point you've created the shared library for PHP called `v8js.so`. This file will be installed (by pecl) into the proper directory. Now you must either edit your `php.ini` file and add `extension=v8js.so` to the end or add a module extension file if your operating system has such things. For instance, in Ubuntu, you'd do this:

```bash
	$ echo "extension=v8js.so" | sudo tee /etc/php5/mods-available/v8js.ini
	$ sudo php5enmod v8js
 	$ sudo service apache2 restart
```

Restarting **apache** is a good plan as well.

To check if V8js is loaded, you can do this:

```bash
	$ php -i | grep v8js
	/etc/php5/cli/conf.d/20-v8js.ini,
	v8js
	v8js.flags => no value => no value
	v8js.max_disposed_contexts => 25 => 25
```

The fact that you get output validates that the extension is loaded and available.

Enjoy!