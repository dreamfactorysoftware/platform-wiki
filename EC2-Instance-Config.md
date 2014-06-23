1. Create Instance -- m3.large type instance with a 40GB 2nd drive
2. Create dfadmin user and add to sudoers
3. Create file system on /dev/xvdb (sudo mkfs -t ext4 /dev/xvdb)
4. Mount file system at /data. Added to /etc/fstab for auto-remount upon boot
