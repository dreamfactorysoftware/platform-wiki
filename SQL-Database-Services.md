## <a name="top"></a>SQL Database Service Specifics

### <a name="contents"></a>Contents
* [Microsoft SQL Server](https://github.com/dreamfactorysoftware/dsp-core/wiki/SQL-Database-Services#sqlsrv)
* [PostgreSQL](https://github.com/dreamfactorysoftware/dsp-core/wiki/SQL-Database-Services#postgresql)

### <a name="sqlsrv"></a>Microsoft SQL Server

_We have tested connecting to MS SQL Server 2005 and above. Most testing is done on 2008 R2._

* Linux
  1. [Install DSP](Install-on-Linux). (The below steps assume a DSP install in `~/dsp/` with its PHP installed in `~/dsp/php/`.)
  2. DSP uses the PHP PDO_DBLIB driver and the FreeTDS library for SQL Server connections from Linux. Documentation on PDO_DBLIB is available [here](http://php.net/manual/en/ref.pdo-dblib.php) and on FreeTDS is available [here](http://www.freetds.org/docs.html). [Bitnami packages](https://github.com/dreamfactorysoftware/dsp-core/wiki/Install-on-Linux#bitnami-installer) come with dblib and FreeTDS already integrated with PHP and enabled.
  3. Install pdo_dblib
    1. For Ubuntu/Debian you can install from the command line
    ```bash
    $ sudo apt-get install php5-sybase
    ```
    2. For others: Check your PHP extensions directory to ensure pdo_dblib.so is present, and check `php.ini` to ensure the value `extension=pdo_dblib.so` is present and uncommented.
  4. Confirm PDO_DBLIB is configured in PHP.

    ```bash
    $~/dsp/php/bin/php -i
    PDO
    PDO support => enabled
    PDO drivers => mysql, sqlite, pgsql, dblib

    pdo_dblib
    PDO Driver for FreeTDS/Sybase DB-lib => enabled
    Flavour => freetds
    ```

  5. Confirm the PDO_DBLIB module is enabled in PHP.

    ```bash
    $~/dsp/php/bin/php -m | grep pdo_dblib
    pdo_dblib
    ```

  6. If you made any PHP configuration changes in the steps above, restart your web server to apply these changes.
  7. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your MS SQL Server DB
    * SQL Vendor: Microsoft SQL Server
    * Host: hostname or IP of your DB server (localhost if appropriate)
    * Database Name: name of the MS SQL Server DB
    * Connection String: you will need to specify the port, even if using the default of 1433. Add `:1433` (or replace 1433 with the non-default port number you plan to use) immediately after hostname/IP (e.g., `host=localhost:1433` or `host=192.168.1.1:1433`).
  8. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.

* Windows
  1. [Install DSP](Install-Microsoft-Windows). (The below steps assume a DSP install in `C:\dsp\` with its PHP installed in `C:\dsp\php\`.)
  2. Download and install Microsoft ODBC Driver 11 for SQL Server (if not already installed). Currently this is available [here](http://www.microsoft.com/en-us/download/details.aspx?id=36434). In 32-bit environments, install the x86 package. In 64-bit environments, install the x64 package.
  3. Download and install the appropriate SQL Server Native Client (if not already installed and SQL Server is not hosted on the same machine as DSP). In 32-bit environments, install the x86 package. In 64-bit environments, install the x64 package. Currently the Microsoft SQL Server 2012 Native Client is available [here](http://www.microsoft.com/en-us/download/details.aspx?id=29065), and the Microsoft SQL Server 2008 R2 Native Client is available [here](http://www.microsoft.com/en-us/download/details.aspx?id=16978).
  4. DSP uses PHP PDO drivers for DB connections. Full documentation on PDO_SQLSRV is available [here](http://php.net/manual/en/ref.pdo-sqlsrv.php). You will need to download and extract the Microsoft Drivers for PHP for SQL Server. Currently these are available [here](https://msdn.microsoft.com/en-us/sqlserver/ff657782.aspx).
  5. Copy the DLLs for your version of PHP into your PHP's extensions directory. E.g., for PHP 5.4, the DLLs are `php_pdo_sqlsrv_54_ts.dll` and `php_sqlsrv_54_ts.dll` (which were extracted from the download in step #3). (Rare case: if you are integrating with IIS as your web server, use the non-thread-safe DLLs instead (`php_pdo_sqlsrv_54_nts.dll` and `php_sqlsrv_54_nts.dll`).)
  6. Enable the copied DLLs in your `php.ini` file. Using the example DLLs from step #4, you would add the following lines to `C:\dsp\php\php.ini` and save:

    ```
    extension=php_pdo_sqlsrv_54_ts.dll
    extension=php_sqlsrv_54_ts.dll
    ```

  7. Restart your web server to apply these PHP configuration changes.
  8. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your MS SQL Server DB
    * SQL Vendor: Microsoft SQL Server
    * Host: hostname or IP of your DB server (localhost if appropriate)
    * Database Name: name of the MS SQL Server DB
    * Connection String: if using a port other than the default (1433), add `,####` (where #### is the actual port number) immediately after hostname/IP (e.g., `Server=localhost,4200` or `Server=192.168.1.1,4300`)
  9. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.

* Mac OS X

### <a name="postgresql"></a>PostgreSQL

* Linux
  1. [Install DSP](Install-on-Linux). (The below steps assume a DSP install in `~/dsp/` with its PHP installed in `~/dsp/php/`.)
  2. Check `~/dsp/php/etc/php.ini` to ensure the values `extension=pgsql.so` and `extension=pdo_pgsql.so` are present and uncommented. (In the Bitnami installer version 1.8.2-1 they already are.)
  3. Check `~/dsp/php/lib/php/extensions/` to ensure `pgsql.so` and `pdo_pgsql.so` are present. (These are included in the Bitnami package.)
  4. If you made any changes/additions in steps ii and iii, restart your Apache server.
  5. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your PostgreSQL DB
    * SQL Vendor: PostgreSQL
    * Host: hostname or IP of your PostgreSQL server (localhost if appropriate)
    * Database Name: name of the PostgreSQL DB
    * Connection String: if using a port other than the default (5432), add `;port=####` (where #### is the actual port number) to the end of your connection string
  6. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.

* Mac OS X
  1. [Install DSP](Install-Mac-OS-X). (The below steps assume a DSP install in `/Applications/dsp/` with its PHP installed in `/Applications/dsp/php/`.)
  2. Check `/Applications/dsp/php/etc/php.ini` to ensure the values `extension=pgsql.so` and `extension=pdo_pgsql.so` are present and uncommented. (In the Bitnami installer version 1.8.2-1 they already are.)
  3. Check `/Applications/dsp/php/lib/php/extensions/` to ensure `pgsql.so` and `pdo_pgsql.so` are present. (These are included in the Bitnami package.)
  4. If you made any changes/additions in steps ii and iii, restart your Apache server.
  5. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your PostgreSQL DB
    * SQL Vendor: PostgreSQL
    * Host: hostname or IP of your PostgreSQL server (localhost if appropriate)
    * Database Name: name of the PostgreSQL DB
    * Connection String: if using a port other than the default (5432), add `;port=####` (where #### is the actual port number) to the end of your connection string
  6. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.

* Windows
  1. [Install DSP](Install-Microsoft-Windows). (The below steps assume a DSP install in `C:\dsp\` with its PHP installed in `C:\dsp\php\`.)
  2. Check `C:\dsp\php\php.ini` to ensure the value `extension=php_pdo_pgsql.dll` is present and uncommented. (In the Bitnami installer version 1.8.2-1 it already is.)
  3. Check `C:\dsp\php\ext\` to ensure `php_pdo_pgsql.dll` is present. (This is included in the Bitnami package.)
  4. If you made any changes/additions in steps ii and iii, restart your Apache server.
  5. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your PostgreSQL DB
    * SQL Vendor: PostgreSQL
    * Host: hostname or IP of your PostgreSQL server (localhost if appropriate)
    * Database Name: name of the PostgreSQL DB
    * Connection String: if using a port other than the default (5432), add `;port=####` (where #### is the actual port number) to the end of your connection string
  6. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.