#!/bin/bash

# Small utility script to start the server & client.
# Although this is (currently) a simple process, launching
# may become more complex, and so this is a good starting point.

# Options
# ./dev-start.sh --client   Start client only
# ./dev-start.sh --server   Start server only

# Current process:
# (in root dir)     npm start
# (in client dir)   npm start

# Start the server
function start_server {
    echo "Starting server..."
    cd ../
    npm start
}

# Start the client
function start_client {
    echo "Starting client..."
    cd ../client/
    npm start
    exit
}

# Print finish message
function finish {
    echo -e "\nStopped."
}

# Call finish() on ctrl+c (SIGINT)
trap finish INT

# By default, start both server & client
# (This script calls itself to create 2 separate processes)
if [ $# == 0 ]
then
    ./$0 --server &
    ./$0 --client
    exit
fi

# Flags for install JUST the server (--server) or client (--client)
case $1 in
    "--client")
        start_client
        ;;
    "--server")
        start_server
        ;;
esac

exit