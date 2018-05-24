MONGO_DATABASE="notes"
APP_NAME="Notes"

MONGO_HOST="127.0.0.1"
MONGO_PORT="27017"
TIMESTAMP=`date +%F-%H%M`
MONGODUMP_PATH="/usr/bin/mongodump"
BACKUPS_DIR="$HOME/db_backups"
BACKUP_NAME="$APP_NAME-$TIMESTAMP"

mongodump -d $MONGO_DATABASE

mkdir $BACKUPS_DIR
mv dump $BACKUP_NAME
tar -zcvf $BACKUPS_DIR/$BACKUP_NAME.tgz $BACKUP_NAME
rm -rf $BACKUP_NAME

cd $BACKUPS_DIR
# note: make sure the dir is setup correctly for the bitbucket repository
git add $BACKUP_NAME.tgz
git commit -m "Daily backup"