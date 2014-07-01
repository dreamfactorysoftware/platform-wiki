## Hardware Setup
1. Created two EC2 t2.micro instances.

| Instance ID | Public IP | Name |
|-------------|-----------|------|
| i-30a8c71b | 54.84.133.89 | [abbott.cloud.dreamfactory.com](https://abbott.cloud.dreamfactory.com/) |
| i-31a8c71a | 54.88.140.165 | [costello.cloud.dreamfactory.com](https://constello.cloud.dreamfactory.com/) |

2. DSP adminstrator setup: Created **dfadmin** user and added to same groups as **ubuntu**
3. Updated all system software
 * apt-get update && apt-get upgrade
4. Installed PHP5, Apache, MySQL, git, and git-flow
 * apt-get install php5 apache2 mysql-server git-all bash-completion git-flow
5. Installed required PHP extensions
 * apt-get install php5-curl php5-mcrypt mcrypt