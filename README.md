# QuantEconLib
Code for the site QuantEconLib

### Contributing
Please work in branches and make PR's

### Setup

#### Commands 
* Pull from repository using `git pull`
* Run `node run install-all` to install all dependencies.
* Run `npm start` to start the server
* Run `npm run start-client` to start the Webpack Development server for the client side React app
* Run `npm run build-client` to package the React client app for usage in production

NOTE: if you are working on the React client-side application, you will need to switch to the `react-client` branch using `git checkout react-client`

#### Needed files
There are some config files that are not on the repo because they contain sensitive information. These include:
* `./_config.js`
    * contains the `url` and `port` the server is running on:
        ```
        var port = YOUR-PORT-HERE;
        module.exports = {
            port: port,
            url: 'YOUR-URL-HERE' + port
        };
* `./js/db/_config.js`
    * contains the `url` to the mongo database:
        ```
            module.exports = {
                url: 'mongodb://localhost/DB-NAME-HERE'
            }
* `./js/auth/_config.js`
    * contains the OAuth `client ID's`, `client secrets`, and `callback url`'s for each of OAuth sites used (google, github, facebook, twitter)
    * You will need to create your own and export an object of the ids as such:
        ```
        var appConfig = require('../../_config');

        var ids = {
            github: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.url + '/auth/github/callback',
                addCallbackURL: appConfig.url + '/auth/github/callback/add'
            },
            twitter: {
                consumerKey: 'YOUR-KEY-HERE',
                consumerSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.url + '/auth/twitter/callback',
                addCallbackURL: appConfig.url + '/auth/twitter/callback/add'

            },
            google: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.url + '/auth/google/callback',
                addCallbackURL: appConfig.url + '/auth/google/callback/add'
            },
            facebook: {
                clientID: 'YOUR-ID-HERE',
                clientSecret: 'YOUR-SECRET-HERE',
                callbackURL: appConfig.url + '/auth/fb/callback',
                addCallbackURL: appConfig.url + '/auth/fb/callback/add'
            }
        };

        module.exports = ids;

Once you have made these files, you can use the commands to get the server up and running.

### Testing
Please review existing issues before submitting a new one. If no related issue exists, feel free to create a new one.
#### Bug/Error reporting:
* Label the issue with 'bug'
* Provide a detailed description of how to recreate the bug
* Include related browser console outputs
#### Enchancement requests:
* Label the issue with 'enchancement'
* Provide detailed description of what enchancement you would like
#### JS Library Requests
* If a notebook requires a specific JS library, open and issue with a link to the library
