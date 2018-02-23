# QuantEconLib
Code for the site QuantEconLib

### Contributing
Please work in branches and make PR's

### Building Documentation
* API Docs: run `npm run api-docs` to build the API documentation. Output will be in `/docs/`
* Client Docs: run `npm run client-docs` to build the client documentation. Output will be in `/client/docs/`

### Setup

#### Installation Commands 
Ensure you have `npm v5+` and `node v8+` installed. I am currently using `npm 5.6.0` and `node v9.5.0`
1. Pull from repository using `git pull`
2. Update npm using the command `node install -g npm`
3. Run `npm install -g create-react-app`
4. Run `npm run install-all` to install all dependencies.
5. Follow instructions in `client/src/assets/sccss/README.md` to set up the css

#### Running Commands
If you are in developement mode, you will need to have _both_ the webpack developement server for the React client _and_ the node express server running. To do this, run these commands:

1. `npm start` from the `/` directory
2. `npm start-client` **_OR_** `cd client && npm start` from the `/` directory

You then will be able to connect to the website through the React client's port (default is 3000)

If you get a `Could not proxy request` error, then you are either not running the API backend, or the ports are not matching. Ensure the port that the API is running on matches the one declared in the config files.

If you would like to test a production build, run `npm run build` from inside the `/client/` directory.

**Warning**: This takes a _long_ time (15+ min) and shouldn't be used until you actually need it.

1. Run `npm run build-client` **_OR_** `cd client && npm run build` from the `/` directory
2. Run `npm start` to start the server

If you get an error `Error: ENOENT: no such file or directory, stat '.../Bookshelf/client/build/index.html'`, then you haven't built the React application. Run step 1 again and wait for it to finish before starting the Express server


#### Needed files
There are some config files that are not on the repo because they contain sensitive information. You can create these manually or run the `scripts/dev-config.sh` to setup these config files:
* `./_config.js`
    * contains the `url` and `port` the server is running on:
        ```
        const hostname = 'localhost';
        const port = '8080';

         const secret = 'YOUR_SECRET_HERE';
         const debug = true;
         const clientPort = 3000;

         const mailgun_apiKey = 'YOUR-MAILGUN-API-KEY-HERE';
         const mailgun_domain = 'YOUR-MAILGUN-DOMAIN-HERE';

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

* `./js/db/_config.js`
    * contains the `url` to the mongo database:
        ```
            module.exports = {
                url: 'mongodb://localhost/DB-NAME-HERE'
            }
* `./js/auth/_config.js`
    * contains the OAuth `client ID's`, `client secrets`, and `callback url`'s for each of OAuth sites used (google, github, facebook, twitter)
    * You will need to create your own OAuth applications for each of the sites and export an object of the ids as such:
        ```
        var appConfig = require('../../_config');

        var ids = {
            github: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.urlAndPort + '/api/auth/github/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/github/callback/add'
            },
            twitter: {
                consumerKey: 'YOUR-KEY-HERE',
                consumerSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/twitter/callback/add'

            },
            google: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.urlAndPort + '/api/auth/google/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/google/callback/add'
            },
            facebook: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.urlAndPort + '/api/auth/fb/callback',
                addCallbackURL: appConfig.urlAndPort + '/api/auth/fb/callback/add'
            }
        };

        module.exports = ids;
* `./client/src/_config.js`
    * contains url and port for the React as well as the API
        ```
       const hostname = 'localhost';
         const port = '3000';
         const debug = true;
         const serverPort = '8080';
         const max_num_admins = 5;
         module.exports = {
           debug: debug,
             url: 'http://' + hostname,
             urlPlusPort: 'http://' + hostname + ':' + serverPort,
             serverPort,
             max_num_admins,
             port
         };

In addition to these files, you will need to spin up your own instance of a Mongo database.

Once you have done this, you can use the commands to get the server up and running.

### Testing
Please review existing issues before submitting a new one. If no related issue exists, feel free to create a new one.
#### Bug/Error reporting:
* Label the issue with 'bug'
* Provide a detailed description of how to recreate the bug
* Include related browser console outputs
#### Enchancement requests:
* Label the issue with 'enchancement'
* Provide detailed description of what enchancement you would like
