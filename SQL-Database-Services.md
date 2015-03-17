## <a name="top"></a>SQL Database Service Specifics

### <a name="sqlsrv"></a>Microsoft SQL Server

_We have tested connecting to MS SQL Server 2005 and above. Most testing is done on 2008 R2._

* Linux

* Windows
  1. [Install DSP](Install-Microsoft-Windows). (The below steps assume a DSP install in `C:\dsp\` with its PHP installed in `C:\dsp\php\`.)
  2. Download and install Microsoft ODBC Driver 11 for SQL Server (if not already installed). Currently this is available [here](http://www.microsoft.com/en-us/download/details.aspx?id=36434). In 32-bit environments, install the x86 package. In 64-bit environments, install the x64 package.
  3. DSP uses PHP PDO drivers for DB connections. Full documentation on PDO_SQLSRV is available [here](http://php.net/manual/en/ref.pdo-sqlsrv.php). You will need to download and extract the Microsoft Drivers for PHP for SQL Server. Currently these are available [here](https://msdn.microsoft.com/en-us/sqlserver/ff657782.aspx).
  4. Copy the DLLs for your version of PHP into your PHP's extensions directory. E.g., for PHP 5.4, the DLLs are `php_pdo_sqlsrv_54_ts.dll` and `php_sqlsrv_54_ts.dll` (which were extracted from the download in step #3). (Rare case: if you are integrating with IIS as your web server, use the non-thread-safe DLLs instead (`php_pdo_sqlsrv_54_nts.dll` and `php_sqlsrv_54_nts.dll`).)
  5. Enable the copied DLLs in your `php.ini` file. Using the example DLLs from step #4, you would add the following lines to `C:\dsp\php\php.ini` and save:

    ```
    extension=php_pdo_sqlsrv_54_ts.dll
    extension=php_sqlsrv_54_ts.dll
    ```

  6. Restart your web server to apply these PHP configuration changes.
  7. Login to your DSP's Admin Console and create a new [service](Services). Enter the following, then click Save at the bottom of the page.
    * Type: Remote SQL DB
    * Username and Password: valid credentials to your MS SQL Server DB
    * SQL Vendor: Microsoft SQL Server
    * Host: hostname or IP of your DB server (localhost if appropriate)
    * Database Name: name of the MS SQL Server DB
    * Connection String: if using a port other than the default (1433), add `,####` (where #### is the actual port number) immediately after hostname/IP (e.g., `Server=localhost,4200` or `Server=192.168.1.1,4300`)
  8. Click over to the "API Docs" tab, expand your new service, and perform a simple GET request to verify connectivity.

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