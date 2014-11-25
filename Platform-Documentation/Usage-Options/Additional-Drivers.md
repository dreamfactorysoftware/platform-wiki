##Bitnami Installs

For DSP instances that used any of the Bitnami packages for installation, most of the required additional libraries, drivers, and/or packages are already installed by default. See the table below for whether the service is ready to use with no additional requirements. For 'NO' values, see the particular service type section below for how to install the additional requirements.

Environment / Service | Windows | Linux | OS X
--- | --- | ---
Server-Side Scripting | YES | YES | YES
NoSQL DB - MongoDB | YES | YES | YES
SQL DB - MySQL | YES | YES | YES
SQL DB - MS SQLSRV | NO | YES | YES
SQL DB - PostgreSQL | YES | YES | YES
SQL DB - Oracle | NO | NO | NO
SQL DB - IBM DB2 | NO | NO | NOT SUPPORTED
Email Service | NO | YES | YES


##Non-Bitnami Installs

For DSP instances that were installed directly from Github or by other means not using Bitnami installers, some services require additional libraries that may have to be installed in that environment. Below is a list of requirements and additional instructions for each service type.

###Server-Side Scripting

This service uses the V8js extension. Instructions on how to install it can be found [here](Installing-V8js).

###NoSQL DB Services

####MongoDB

###SQL DB Services

####MySQL

####MS SQLSRV

####PostgreSQL

####Oracle

####IBM DB2

###Email Services