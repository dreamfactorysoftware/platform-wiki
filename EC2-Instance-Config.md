## Instance

1. Create Instance -- m3.large type instance with a 40GB 2nd drive
2. Create dfadmin user and add to sudoers
3. Create file system on `/dev/xvdb` (sudo mkfs -t ext4 /dev/xvdb)
4. Mount file system at `/data`. Added to `/etc/fstab` for auto-remount upon boot
5. Created directory `/data/www` (dfadmin:www-data mode 2775)
6. Renamed `/var/www` to `/var/www.original` (sudo mv /var/www /var/www.original)
7. Symlinked `/data/www` to `/var/www` (cd /var; sudo ln -s /data/www/)
8. Created directory `/var/www/next` for site

## Software

1. Install `git-all php5 php-pear php5-dev apache2` packages
2. Install the supporting packages `php5-curl php5-gd php5-mcrypt php5-memcache php5-memcached php5-mongo php5-mysql php5-mssql mcrypt memcached`
3. Cloned bitbucket web-csp develop branch into `/var/www/next`
4. Run installer (cd /var/www/next; sudo ./scripts/installer.sh -cv)

## Apache

1. Create apache site files (`100-next.conf` and `100-next-ssl.conf`)
2. All apache log files directed to `/var/www/next/log`
3. Enable sites (sudo a2ensite 100-next && sudo a2ensite 100-next-ssl)
