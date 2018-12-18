# QuantEcon Notes

Code for the QuantEcon Notes Project

### Contributing
Please work in branches and make PR's

To make PR's cleaner and quicker, please merge the master branch into your branch (not the other way around!!!),
then test to make sure your code is still working as intended. This way, all merge conflicts will already be resolved in the PR.

### Building Documentation
* API Docs: run `npm run api-docs` to build the API documentation. Output will be in `/docs/`
* Client Docs: run `npm run client-docs` to build the client documentation. Output will be in `/client/docs/`

### Setup
##### Prerequisites
1. **npm 5+** : `node install -g npm`
2. **node v8+**
3. **reactjs v16+** : `npm install -g create-react-app`

#### Installation Commands
Ensure you have `npm v5+` and `node v8+` installed.
1. Pull from repository using `git pull`.
2. Cd into project root directory.
3. Run `npm run install-all` to install all dependencies.
4. Follow instructions in `client/src/assets/sccss/README.md` to set up the css

#### Running Commands
If you are in development mode, you will need to have _both_ the webpack development server for the React client _and_ the node express server running. To do this, run these commands:

1. `npm start` from the `/` directory
2. `npm start-client` **_OR_** `cd client && npm start` from the `/` directory

You then will be able to connect to the website through the React client's port (default is 3000).

Instead of of running `npm start` in both the client and server side with two terminals opened up, the project has set up `npm run dev` which uses **concurrently** to run both the client and server at the same time within one terminal.
 You then will be able to connect to the website through the React client's port (default is 3000).

If you get a `Could not proxy request` error, then you are either not running the API backend, or the ports are not matching. Ensure the port that the API is running on matches the one declared in the config files.

If you would like to test a production build, run `npm run build` from inside the `/client/` directory.

1. Run `npm run build-client` **_OR_** `cd client && npm run build` from the `/` directory
2. Run `npm start` to start the server

If you get an error `Error: ENOENT: no such file or directory, stat '.../Bookshelf/client/build/index.html'`, then you haven't built the React application. Run step 1 again and wait for it to finish before starting the Express server

**UPDATE AS OF 17 DEC 2018:**
* `nodemon` has been added to watch changes for the server. Run `npm start` on client and server folder.
* Running `nodemon` no longer require you to restart the server when you make changes. 

#### Updating the Instance
NOTE: Paths are relative to the root of the project

First stop the instance:
1. `npm run stop-docker`

Then pull the latest code:
1. `git pull`

Then you'll need to rebuild the client application:
1. `cd /client`
2. `npm run build`

Then you'll need to update the docker image:
1. `cd /`
2. `npm run build-docker-server`

Finally restart the instance:
1. `npm run docker-daemon`

#### How-To
Inside the client directory, there is an extensive README.md on client-side.

**UPDATE AS OF 29 MAR 2018:**

The server and mongo requirements now exist inside a Docker container. To run the server and mongo through docker,
ensure you have Docker [installed on your machine](https://docs.docker.com/install/), then run `npm run build-docker-server`.
Once that process finishes, run `npm run docker` to start both mongo and the server.

#### Needed files
There are some config files that are not on the repo because they contain sensitive information. You can create these manually or run `npm run config` to setup these config files:
* `./server/_config.js`
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

* `./server/js/db/_config.js`
    * contains the `url` to the mongo database:
        ```
            module.exports = {
                url: 'mongodb://localhost/DB-NAME-HERE'
            }
* `./server/js/auth/_config.js`
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
To install and start Mongo database on your respective Operating System go to https://docs.mongodb.com/manual/administration/install-community/

Once you have done this, you can use the commands to get the server up and running.

### Database

#### [Dump & Restore MongoDB](http://www.chovy.com/nosql/backing-up-and-restoring-a-mongodb-to-a-different-database/) 
To transfer the database from the main site to development or local, follow the below steps: 
1. `mongodump --db Database_Name`. 
2. `tar czf ./dump.tgz ./dump`.
3. Run `scp -r remote_machine:database_backups/db_file ~/local_machine`
4. In your local machine or development machine, `tar xzf ./dump.tgz` file.
5. `cd ./dump`.
6. `mongorestore --db Database_Name ./New_Dumped_Database`.



### Testing
Please review existing issues before submitting a new one. If no related issue exists, feel free to create a new one.
#### Bug/Error reporting:
* Label the issue with 'bug'
* Provide a detailed description of how to recreate the bug
* Include related browser console outputs
#### Enhancement requests:
* Label the issue with 'enhancement'
* Provide detailed description of what enhancement you would like
