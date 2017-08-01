import openPopup from './popup';
import {parseResponse} from './url';
import {
    getParamByName
} from './url'
import {
    storeCredentials
} from '../actions/auth/signIn';

export const authenticate = (provider) => {
    //TODO: extract url to central config file
    const popup = openPopup(provider, `http://localhost:8080/api/auth/${provider}`, `${provider} authentication`);
    //wait for authentication to complete
    return listenForCredentials(popup, provider)
}

const getAllParams = (url) => {
    const token = getParamByName('token', url);
    const uid = getParamByName('uid', url);

    return {
        token,
        uid
    }
}

const listenForCredentials = (popup, provider, resolve, reject) => {
    if (!resolve) {
        return new Promise((resolve, reject) => {
            listenForCredentials(popup, provider, resolve, reject);
        });
    } else {
        let credentials;
        try {
            credentials = getAllParams(popup.location) //get the credentials from the window location parameters
        } catch (err) {
            reject({
                errors: 'Error parsing credentials'
            })
        }
        if (credentials && credentials.uid) { //if we have credentials and a user id, continue
            popup.close();
            //save token and uid
            storeCredentials(credentials);
            //TODO: fetch validate token url
            fetch('/api/auth/validate-token', {
                    headers: {
                        'access-token': credentials.token
                    }
                })
                .then(parseResponse)
                .then(data => {
                    resolve({
                        data
                    });
                })
                .catch(error => {
                    reject({error});
                });
        } else if (popup.closed) { //check if the popup was closed by the user
            reject({
                errors: 'Authentication was cancelled'
            });
        } else { //loop until we get a response
            setTimeout(() => {
                listenForCredentials(popup, provider, resolve, reject)
            }, 0);
        }
    }
}