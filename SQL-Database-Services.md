## <a name="top"></a>SQL Database Service Specifics

## <a name="postgresql"></a>PostgreSQL

* Linux
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
  6. Click the "Explore this service" icon next to your new service's name, and perform a simple GET request to verify connectivity.
* Windows