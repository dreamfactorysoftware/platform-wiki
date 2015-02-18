You can install DreamFactory on a Windows server or Windows desktop.

### Bitnami Installer

An easy way to install on Windows is to use the Bitnami installer. Just follow the instructions on Bitnami's website.

* [Bitnami Installer for Windows](https://bitnami.com/stack/dreamfactory/installer#windows)

If you already use a Bitnami WAMP stack, include the DreamFactory module by going to the stack module listing here:

* [DreamFactory Module for Bitnami WAMP Stack](https://bitnami.com/stack/wamp/modules#dreamfactory)

### Direct from GitHub

For the engineer familiar with server-side installations and web server implementations, DreamFactory code may be deployed directly from [github.com](http://github.com/dreamfactorysoftware/dsp-core) onto a web server. This will allow the use of existing cloud or onsite infrastructure to deploy production applications with DSP, including adding customizations to our code base and controlling every detail of the process.

Below are installation instructions for DreamFactory's open source code base for Windows:

0. Deploy your WAMP/WNMP/WIMP stack of choice. This guide will assume a WAMP stack with MySQL.
1. Create a database for your DSP. The DSP will populate it later.
```cmd
C:\>C:\Program Files\MySQL\MySQL Server 5.6\bin\mysql.exe -u root -p
```
```sql
mysql> create database dreamfactory;
Query OK, 1 row affected (0.00 sec)
mysql> grant all privileges on dreamfactory.* to 'dsp_user'@'localhost' identified by 'dsp_user';
Query OK, 0 rows affected (0.05 sec)
mysql> quit
Bye
```
2. Ensure these PHP modules are installed and enabled: `curl`, `openssl`, `mysql`, and `gd`.
3. Install and configure a git client, such as [GitHub for Windows](https://windows.github.com/).
4. Clone the dsp-core repository. From the Git Shell:
```cmd
C:\>git clone https://github.com/dreamfactorysoftware/dsp-core.git C:\dsp\
```
5. Create required directories in the cloned repository's root path:
```cmd
C:\dsp\>mkdir log storage vendor web assets
```
6. Run Composer in Git Shell *from your DSP install directory:*
```cmd
C:\dsp\>C:\php54\php.exe C:\php54\composer.phar update --no-dev
```
7. Configure your web server to serve up DSP. The directory intended to be served is `C:\dsp\web\`




