## Hardware Setup
1. Created two EC2 t2.micro instances.

| Instance ID | Public IP | Name | MySQL ID |
|-------------|-----------|------| --------------- |
| i-30a8c71b | 54.84.133.89 | [abbott.cloud.dreamfactory.com](https://abbott.cloud.dreamfactory.com/) | 1 |
| i-31a8c71a | 54.88.140.165 | [costello.cloud.dreamfactory.com](https://constello.cloud.dreamfactory.com/) | 2|

2. DSP adminstrator setup: Created **dfadmin** user and added to same groups as **ubuntu**
3. Updated all system software
 * apt-get update && apt-get upgrade
4. Installed PHP5, Apache, MySQL, git, and git-flow
 * apt-get install php5 apache2 mysql-server git-all bash-completion git-flow
5. Installed required PHP extensions
 * apt-get install php5-curl php5-mcrypt mcrypt

### Database Configuration
The standard MySQL distribution/install is being used for this demonstration. The configuration file `/etc/mysql/my.cnf` was changed to reflect the correct server number for clustering. `abbott` was assigned #1 and `costello` was assigned #2.

Abbott:

```mysql
server-id = 1
```

Costello: 

```mysql
server-id = 2
```

#### Defaults
On `abbott`, the DSP database and user were created:

```mysql
mysql> create database dreamfactory;
mysql> grant all privileges on dreamfactory.* to 'dsp_user'@'localhost' identified by 'dsp_user';
```

#### Setting Up Replication
Now that both databases are up and the master (#1) is configured and has the dreamfactory database and the dsp_user, we can set up replication to our slave (#2).