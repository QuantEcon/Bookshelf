#!/bin/bash

# Small utility script to install server & client NPM modules.
# Although this is (currently) a simple process, installation
# may become more complex, and so this is a good starting point.

# Options
# ./dev-install.sh --client     Install client only
# ./dev-install.sh --server     Install server only

# Current process:
# (in root dir)     npm install
# (in client dir)   npm install

# Install node modules in root directory
function install_server {
    echo "Installing server..."
    cd ../
    npm install --quiet
    cd scripts/
    echo "Finished installing server."
}

# Install node modules in /client subdirectory
function install_client {
    echo "Installing client..."
    cd ../
    cd client
    npm install --quiet
    cd ../scripts/
    echo "Finished installing client."
}

# By default, install both server & client
if [ $# == 0 ]
then
    install_server
    install_client
    exit
fi

# Flags for install JUST the server (--server) or client (--client)
case $1 in
    "--client")
        install_client
        ;;
    "--server")
        install_server
        ;;
esac

exit