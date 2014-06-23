## Instance

1. Create Instance -- m3.large type instance with a 40GB 2nd drive
2. Create dfadmin user and add to sudoers
3. Create file system on /dev/xvdb (sudo mkfs -t ext4 /dev/xvdb)
4. Mount file system at /data. Added to /etc/fstab for auto-remount upon boot

## Software

1. Install `git-all` package
2. Install `php5 php-pear php5-dev apache2` packages
3. Install the supporting packages `php5-curl php5-gd php5-mcrypt php5-memcache php5-memcached php5-mongo php5-mysql php5-mssql mcrypt memcached`
