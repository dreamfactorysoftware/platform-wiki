Installing DreamFactory on OpenShift:

1. Get OpenShift [account](https://www.openshift.com)

2. Install the [OpenShift client tools](https://developers.openshift.com/en/getting-started-client-tools.html)

3. Clone a new copy the DreamFactory application: 
`git clone https://github.com/dreamfactorysoftware/dsp-core`. 
Note: Do not use an existing install that you want to remain operational, as this will change the local config and git repositories.
Change directories into the cloned directory. Issue the following commands from that directory.

4. Create a new OpenShift application from the command line in the clone directory: 
`rhc create-app <your-app-name> php-5.4`
Note the name and remote repo location.

5. Add your new application as a git remote: 
`git remote add openshift <git remote from previous command>`

6. Add MySQL to your application: 
`rhc cartridge add mysql-5.5 -a <your-app-name>`
You should see output like the following...
MySQL 5.5 database added.  Please make note of these credentials:
  ```
   Root User: <user>
   Root Password: <password>
   Database Name: <db-name>
  ```
7. Set the MySQL credentials output by step 5 as environment variables: 
`rhc set-env OPENSHIFT_MYSQL_DB_USER=<user> OPENSHIFT_MYSQL_DB_PASS=<password> OPENSHIFT_MYSQL_DB_NAME=<db-name> -a <your-app-name>`

8. If not already, make the deploy script executable.
`chmod +x on .openshift/action_hooks/deploy`

9. Commit any local changes, if any, to the local repo.

10. Push the DSP application code to your instance: 
`git push openshift master`

Note, in my case, the push fails with being out of sync with the remote, even though nothing has been submitted to the remote. 
To fix this, do a `git pull openshift master` then try the push again. 

Your application should now be available at `http://dsp-<your-namespace>.rhcloud.com`.

