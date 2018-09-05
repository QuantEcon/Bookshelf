import sys

print("Caution! This will overwite the following files:")
print("\t./server/_config.js")
print("\t./server/js/auth/_config.js")
print("\t./server/js/db/_config.js")
print("\t./client/_config.js")
cont = input("(Y/n) Would you like to continue? [n]: ")

# Default values
default_hostname = "localhost"
default_server_port = 8080
default_client_port = 3000
default_secret = "secret"

default_db_url = 'mongodb://127.0.0.1/Bookshelf'

default_admins = '5'

if cont == 'y' or cont == 'Y':
    # Rewrite ./server/_config/js
    overwite_server = input("(Y/n) Overwrite ./server/_config.js? [n]: ")
    if overwite_server == 'Y' or overwite_server == 'y':
        hostname = input("Enter the server hostname [localhost]: ")
        server_port = input("Enter the server port [8080]: ")
        client_port = input("Enter the client port [3000]: ")
        secret = input("Enter the session secret: [secret]: ")
        debug = input("(Y/n) Run in debug mode? [n]: ")
        mailgun_key = input("Enter the mailgun api key: ")
        mailgun_domain = input("Enter the mailgun domain: ")
        max_num_admins = input("Enter the maximum number of admins [5]: ")

        if not hostname:
            hostname = default_hostname
        if not server_port:
            server_port = default_server_port
        if not client_port:
            client_port = default_client_port
        if not secret:
            secret = default_secret
        if not max_num_admins:
            max_num_admins = default_admins
        if debug == 'y' or debug == 'Y':
            debug = "true"
        else:
            debug = "false"

        server_output = """
        const hostname = '%s';
        const port = '%s';
        const clientPort = '%s';

        const secret = '%s'
        const debug = %s;

        var clientHostNameAndPort
        var clientHostName
        var redirectURL

        const maxNumAdmins = '%s'

        const mailgun = {
            apiKey: '%s',
            domain: '%s'
        }

        if(debug){
            clientHostName = "http://localhost"
            clientHostNameAndPort = clientHostName + clientPort
            redirectURL = "http://localhost:" + clientPort + "/temp"            
        } else {
            clientHostName = hostname
            clientHostNameAndPort = clientHostName + clientPort
            if(hostname == 'localhost'){
                redirectURL = "http://localhost:" + port + "/temp"
            } else {
                redirectURL = "http://" + hostname + "/temp"            
            }
        }

		module.exports = {
		    debug: debug,
		    port: port,
		    hostName: hostname,
		    url: 'http://' + hostname,
		    urlAndPort: 'http://' + hostname + ':' + port,
            clientPort: clientPort,
            clientHostNameAndPort: clientHostNameAndPort,
            redirectURL: redirectURL,
            preRender: false,
            filesDirectory: "/files",
            rootDirectory: __dirname,
		    secret: secret,
            mailgun: mailgun
		};
        """ % (hostname, server_port, client_port, secret, debug, max_num_admins, mailgun_key, mailgun_domain)

        server_config_file = open('../server/_config.js', 'w')
        server_config_file.write(server_output)

        print("Writing ./server/_config.js...\n")
    
    # Overwrite ./server/js/auth/_config.js
    overwrite_auth = input("(Y/n) Overwrite ./server/js/auth/_config.js? [n]: ")
    if overwrite_auth == 'y' or overwrite_auth == 'Y':
        # Setup github
        github_clientID = input("Enter Github OAuth clientID: ")
        github_secret = input("Enter Github OAuth secret: ")
        
        # Setup twitter
        twitter_key = input("Enter Twitter OAuth consumer key: ")
        twitter_secret = input("Enter Twitter OAuth consumer secret: ")

        # Setup Google
        google_id = input("Enter Google OAuth client ID: ")
        google_secret = input("Enter Google OAuth client secret: ")

        # # Setup Facebook
        # facebook_id = input("Enter Facebook OAuth client ID: ")
        # facebook_secret = input("Enter Facebook OAuth client secret: ")

        auth_output = """
        var appConfig = require('../../_config');

        var ids = {
            github: {
                clientID: '%s',
                clientSecret: '%s',
                callbackURL: appConfig.urlAndPort + '/api/auth/github/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/github/callback/add'
            },
            twitter: {
                consumerKey: '%s',
                consumerSecret: '%s',
                callbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback/add'

            },
            google: {
                clientID: '%s',
                clientSecret: '%s',
                callbackURL: appConfig.urlAndPort + '/api/auth/google/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/google/callback/add'
            },
        };

        module.exports = ids;

        """ % (github_clientID, github_secret, twitter_key, twitter_secret, google_id, google_secret, facebook_id, facebook_secret)

        auth_file = open ("../server/js/auth/_config.js", 'w')

        auth_file.write(auth_output)

        print("Writing ./server/js/auth/_config.js...\n")

    # Overwrite ./server/js/db/_config.js
    overwrite_db = input("(Y/n) Overwrite ./server/js/db/_config.js? [n]: ")
    if overwrite_db == 'Y' or overwrite_db == 'y':
        url = input("Enter MongoDB url [mongodb://localhost/Bookshelf]: ")

        if url == 'localhost':
            url = "127.0.0.1"
        elif not url:
            url = default_db_url

        db_file = open("../server/js/db/_config.js", 'w')

        db_output = """
        module.exports = {
            url: '%s'
        };

        """ % url
    
        db_file.write(db_output)
        print("Writing ./server/js/db/_config.js...\n")

    # if overwite_server:
    #     print("Overwriting ./client/_config.js")
    #     num_admins = input("Enter the maxmim number of admins [5]: ")

    #     if not num_admins:
    #         num_admins = default_admins

    #     client_output = """
    #     const hostname = '%s';
    #     const port = '%s';
    #     const debug = %s;
    #     const serverPort = '%s';
    #     const max_num_admins = %s;
    #     module.exports = {
    #         debug: debug,
    #         url: 'http://' + hostname,
    #         urlPlusPort: 'http://' + hostname + ':' + serverPort,
    #         serverPort,
    #         max_num_admins,
    #         port
    #     };
    #     """ % (hostname, client_port, debug, server_port, num_admins)

    #     client_file = open("../client/src/_config.js", 'w')
    #     client_file.write(client_output)
    # else:
    overwrite_client = input("(Y/n) Overwrite ./client/_config.js? [n]: ")
    if overwrite_client == 'Y' or overwrite_client == 'y':
        hostname = input("Enter server hostname [localhost]: ")
        client_port = input ("Enter the client port [3000]: ")
        debug = input("(Y/n) Run in debug mode? [Y]: ")
        server_port = input("Enter server port [8080]: ")
        if not overwite_server:
            num_admins = input("Enter the maxmimum number of admin users [5]: ")
        else:
            num_admins = max_num_admins

        if not hostname:
            hostname = default_hostname
        if not client_port:
            client_port = default_client_port
        if not debug:
            debug = 'true'
        else:
            debug = 'false'
        if not server_port:
            server_port = default_server_port
        if not num_admins:
            num_admins = default_admins

        client_output = """
        const hostname = '%s';
        const port = '%s';
        const debug = %s;
        const serverPort = '%s';
        const max_num_admins = %s;
        module.exports = {
            debug: debug,
            url: 'http://' + hostname,
            urlPlusPort: 'http://' + hostname + ':' + serverPort,
            serverPort,
            max_num_admins,
            port
        };
        """ % (hostname, client_port, debug, server_port, num_admins)

        client_file = open("../client/src/_config.js", 'w')
        client_file.write(client_output)

    