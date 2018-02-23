#!/bin/bash

# CLI wizard to automatically create the required config files.
# Steps user through the different options.

# Options:
# ./dev-config.sh --default     Uses all default values

source util/util-input.sh

ROOT_DIR=$(cd ../ && pwd)
SCRIPT_DIR=$(pwd)

echo ${ROOT_DIR}

# Default values
hostname=localhost
port=8080
clientPort=3000
debug=n
db_host=mongodb://
db_port=27017
db_name=bookshelf
max_num_admins=5

# Run each config file creator
function start {
    web_config
    db_config
    oauth_config
    client_config
    echo "Finished creating required files."
}

# Print a caution before running the overwriting methods
function caution_start {
    echo -e "\033[1mCaution! This will overwrite the following files:\n\033[0m"
    echo -e "\t ./_config.js"
    echo -e "\t ./js/db/_config.js"
    echo -e "\t ./js/auth/_config.js"
    echo -e "\t ./client/src/_config.js\n"
    read -p "(Y/n) Would you like to continue? [n] " answer
    case ${answer} in
        y|Y)
            start
            ;;
        *)
            exit
            ;;
    esac
}

# ./_config.js
# Create the web address config file (host, url, port, session secret etc.)
function web_config {
    echo "--------------------------------------"
    echo -e "Creating web address config at ./_config.js"
    echo "--------------------------------------"

    hostname=$(input String Hostname: "${hostname}")
    port=$(input String Port: ${port})
    secret=$(input String "Session Secret:" secret)
    debug=$(input --bool Debug: ${debug})
    clientPort=$(input String "Client Port:" ${clientPort})
    mailgun_key=$(input String "Mailgun API Key:" ${mailgunKey})
    mailgun_domain=$(input String "Mailgun Domain:" ${mailgun_domain})

	cat > "${ROOT_DIR}/_config.js" <<- EOM
		const hostname = '${hostname}';
		const port     = '${port}';

		const secret   = '${secret}';
		const debug    = ${debug};
        const clientPort = ${clientPort};

        const mailgun_apiKey = '${mailgun_key}';
        const mailgun_domain = '${mailgun_domain}';

		module.exports = {
		    debug: debug,
		    port: port,
		    urlAndPort: 'http://' + hostname + ':' + port,            
		    hostName: hostname,
            clientHostName: hostname,
            clientPort: clientPort,
            clientHostNameAndPort: hostname + clientPort,
            redirectURL: 'http://' + hostname + ':' + clientPort + "/temp",
            preRender: false,            
		    url: 'http://' + hostname,
		    secret: secret,
            filesDirectory: '/files',
            rootDirectory: __dirname,
            mailgun: {
                apiKey: mailgun_apiKey,
                domain: mailgun_domain
            }
		};
	EOM

    echo -e "Finished creating web address config.\n"
}

# ./js/db/_config.js
# Create the database config file (database url)
function db_config {
    echo "--------------------------------------"
    echo -e "Creating database config at ./js/db/_config.js"
    echo "--------------------------------------"

    db_host=$(input String "Database host:" "${db_host}${hostname}")
    db_name=$(input String "Database name:" ${db_name})
    url="${db_host}:${db_port}/${db_name}"

	cat > "${ROOT_DIR}/js/db/_config.js" <<- EOM
		module.exports = {
		    url: '${url}'
		};
	EOM

	echo -e "Finished creating database config.\n"
}

# ./js/auth/_config.js
# Create the OAuth config file (e.g. client ID & secret for Google OAuth)
function oauth_config {
    echo "--------------------------------------"
    echo -e "Creating OAuth config at ./js/auth/_config.js"
    echo "--------------------------------------"
    echo -e "\nAnswer Y/N to the sites you have OAuth keys for."

    github_auth=$(input --bool "Authenticating with Github?" n)
    twitter_auth=$(input --bool "Authenticating with Twitter?" n)
    google_auth=$(input --bool "Authenticating with Google?" n)
    fb_auth=$(input --bool "Authenticating with Facebook?" n)
    echo

    github_id="YOUR_ID_HERE"
    github_secret="YOUR_SECRET_HERE"
    twitter_key="YOUR_KEY_HERE"
    twitter_secret="YOUR_SECRET_HERE"
    google_id="YOUR_ID_HERE"
    google_secret="YOUR_SECRET_HERE"
    fb_id="YOUR_ID_HERE"
    fb_secret="YOUR_SECRET_HERE"

    if [ ${github_auth} = true ]
    then
        github_id=$(input String "Github Client ID" "")
        github_secret=$(input String "Github Client Secret" "")
    fi

    if [ ${twitter_auth} = true ]
    then
        twitter_key=$(input String "Twitter Consumer Key" "")
        twitter_secret=$(input String "Twitter Consumer Secret" "")
    fi

    if [ ${google_auth} = true ]
    then
        google_id=$(input String "Google Client ID" "")
        google_secret=$(input String "Google Secret" "")
    fi

    if [ ${fb_auth} = true ]
    then
        fb_id=$(input String "Facebook Client ID" "")
        fb_secret=$(input String "Facebook Client Secret" "")
    fi

    cat > "${ROOT_DIR}/js/auth/_config.js" <<- EOM
		var appConfig = require('../../_config');

		var ids = {
		    github: {
		        clientID: '${github_id}',
		        clientSecret: '${github_secret}',
		        callbackURL: appConfig.urlAndPort + '/api/auth/github/callback',
		        addCallbackURL: appConfig.urlAndPort + '/api/auth/github/callback/add'
		    },
		    twitter: {
		        consumerKey: '${twitter_key}',
		        consumerSecret: '${twitter_secret}',
		        callbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback',
		        addCallbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback/add'

		    },
		    google: {
		        clientID: '${google_id}',
		        clientSecret: '${google_secret}',
		        callbackURL: appConfig.urlAndPort + '/api/auth/google/callback',
		        addCallbackURL: appConfig.urlAndPort + '/api/auth/google/callback/add'
		    },
		    facebook: {
		        clientID: '${fb_id}',
		        clientSecret: '${fb_secret}',
		        callbackURL: appConfig.urlAndPort + '/api/auth/fb/callback',
		        addCallbackURL: appConfig.urlAndPort + '/api/auth/fb/callback/add'
		    }
		};

		module.exports = ids;
	EOM

	echo -e "Finished creating OAuth config.\n"
}


# ./client/src/_config.js
function client_config {
    echo "--------------------------------------"
    echo -e "Creating client config at ./client/src/_config.js"
    echo "--------------------------------------"

    hostname=$(input String Hostname: "${hostname}")
    debug=$(input --bool Debug: n)
    max_num_admins=$(input String "Max Number of Admins:" ${max_num_admins})

	cat > "${ROOT_DIR}/client/src/_config.js" <<- EOM
		const hostname = '${hostname}';
		const port     = '${clientPort}';
		const debug    = ${debug};
        const serverPort = '${port}';
        const max_num_admins = ${max_num_admins};
		module.exports = {
		    debug: debug,
		    url: 'http://' + hostname,
		    urlPlusPort: 'http://' + hostname + ':' + serverPort,
            serverPort,
            max_num_admins,
            port
		};

	EOM

	echo -e "Finished creating database config.\n"

}

caution_start