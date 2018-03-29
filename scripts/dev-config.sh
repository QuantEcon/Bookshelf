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
port=2701
debug=n
db_host=mongo://
db_name=bookshelf

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
    echo -e "\t ./server/_config.js"
    echo -e "\t ./server/js/db/_config.js"
    echo -e "\t ./server/js/auth/_config.js"
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
    echo -e "Creating web address config at ./server/_config.js"
    echo "--------------------------------------"

    hostname=$(input String Hostname: "${hostname}")
    port=$(input String Port: ${port})
    secret=$(input String "Session Secret:" secret)
    debug=$(input --bool Debug: ${debug})
    mailgunAPIKey=$(input String "Mailgun API Key: " ${apiKey})
    mailgunDomain=$(input String "Mailgun domain: " ${domain})

	cat > "${ROOT_DIR}/server/_config.js" <<- EOM
		const hostname = '${hostname}';
		const port     = '${port}';
        const clientPort = 3000

		const secret   = '${secret}';
		const debug    = ${debug};

        const mailgun  = {
            apiKey: ${mailgunAPIKey},
            domain: ${maingunDomain}
        }

        if(debug){
            const clientHostName = "http://localhost"
            const clientHostNameAndPort = clientHostName + clientPort
        } else {
            const clientHostName = hostname,
            const clientHostNameAndPort = clientHostName + clientPort
        }

		module.exports = {
		    debug: debug,
		    port: port,
		    hostName: hostname,
		    url: 'http://' + hostname,
		    urlAndPort: 'http://' + hostname + ':' + port,
            clientPort: clientPort,
            clientHostNameAndPort: clientHostNameAndPort,
            redirectURL: 'http://' + hostname + "/temp",
            preRender: false,
            filesDirectory: "/files",
            rootDirectory: __dirname,
		    secret: secret,
            mailgun: mailgun
		};
	EOM

    echo -e "Finished creating web address config.\n"
}

# ./js/db/_config.js
# Create the database config file (database url)
function db_config {
    echo "--------------------------------------"
    echo -e "Creating database config at ./server/js/db/_config.js"
    echo "--------------------------------------"

    db_host=$(input String "Database host:" "${db_host}${hostname}")
    db_name=$(input String "Database name:" ${db_name})
    url="${db_host}/${db_name}"

	cat > "${ROOT_DIR}/server/js/db/_config.js" <<- EOM
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
    echo -e "Creating OAuth config at ./server/js/auth/_config.js"
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

    cat > "${ROOT_DIR}/server/js/auth/_config.js" <<- EOM
		var appConfig = require('../../_config');

		var ids = {
		    github: {
		        clientID: '${github_id}',
		        clientSecret: '${github_secret}',
		        callbackURL: appConfig.urlAndPort + '/auth/github/callback',
		        addCallbackURL: appConfig.urlAndPort + '/auth/github/callback/add'
		    },
		    twitter: {
		        consumerKey: '${twitter_key}',
		        consumerSecret: '${twitter_secret}',
		        callbackURL: appConfig.urlAndPort + '/auth/twitter/callback',
		        addCallbackURL: appConfig.urlAndPort + '/auth/twitter/callback/add'

		    },
		    google: {
		        clientID: '${google_id}',
		        clientSecret: '${google_secret}',
		        callbackURL: appConfig.urlAndPort + '/auth/google/callback',
		        addCallbackURL: appConfig.urlAndPort + '/auth/google/callback/add'
		    },
		    facebook: {
		        clientID: '${fb_id}',
		        clientSecret: '${fb_secret}',
		        callbackURL: appConfig.urlAndPort + '/auth/fb/callback',
		        addCallbackURL: appConfig.urlAndPort + '/auth/fb/callback/add'
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
    port=$(input String Port: "${port}")
    debug=$(input --bool Debug: n)
    numAdmins=$(input String "Maximum number of admins: " ${numAdmins})

	cat > "${ROOT_DIR}/client/src/_config.js" <<- EOM
		const hostname = '${hostname}';
		const port     = '${port}';
		const debug    = ${debug};
        const numAdmins = ${numAdmins}
        const serverPort = ${serverPort}

		module.exports = {
		    debug: debug,
		    url: 'http://' + hostname,
		    urlPlusPort: 'http://' + hostname + ':' + port,
            maxNumAdmins = numAdmins
		};

	EOM

	echo -e "Finished creating database config.\n"

}

caution_start