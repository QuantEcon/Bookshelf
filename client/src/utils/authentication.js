/**
 * @file Authentication utils
 * @author Trevor Lyon
 * 
 * @module authenticationUtils
 */
import openPopup from './popup';
import {
    parseResponse
} from './url';
import {
    getParamByName
} from './url'

import * as config from '../_config.js'


import store from '../store/store'

/**
 * @function authenticate
 * @description Opens a popup to `provider`'s OAuth authentication screen, and listens for the credentials in the url.
 *  
 * @param {String} provider Social provider (Github, Facebook, Twitter, Google)
 */
export const authenticate = (provider) => {
    //TODO: extract url to central config file
    console.log('[Authentication] - open popup')
    var popup;
    if(config.debug){
        console.log('[Authentication] - open popup with port: ', config.urlPlusPort)
        popup = openPopup(provider, config.urlPlusPort + `/api/auth/${provider}`, `${provider} authentication`);
    } else {
        popup = openPopup(provider, config.url + `/api/auth/${provider}`, `${provider} authentication`);
    }
    //wait for authentication to complete
    return listenForCredentials({
        popup,
        provider
    })
}

/**
 * @function authenticateNewSocial
 * @description Opens a popup to the `provider`'s OAuth authentication screen, and listens for the credentials in the url.
 * 
 * @param {String} provider Social provider to add (Github, Facebook, Twitter, Google)
 */
export const authenticateNewSocial = (provider) => {
    console.log('[Authentication] - add new social: ', provider);
    var popup
    if(config.urlPlusPort){
        popup = openPopup(provider, config.urlPlusPort + `/api/auth/${provider}/add?jwt=` + store.getState().auth.token, `${provider} authentication`);
        
    } else {
        popup = openPopup(provider, config.url + `/api/auth/${provider}/add?jwt=` + store.getState().auth.token, `${provider} authentication`);
    }

    return listenForCredentials({
        popup,
        provider,
        isAdd: true,
        profile: provider
    });
}


const getAllParams = (url) => {
    const token = getParamByName('token', url);
    const uid = getParamByName('uid', url);

    return {
        token,
        uid
    }
}

/**
 * @function listenForCredentials
 * @description Listens for credentials in the url. The only parameters that are passed to this method outside of it, are 
 * `popup` and `provider`. The other parameters are created in the method.
 * @param {Object} param0 
 * @param {Object} param0.popup Reference to the popup window
 * @param {String} param0.provider Social provider being used for OAuth
 */
const listenForCredentials = ({
    popup,
    provider,
    resolve,
    reject,
    isAdd,
    profile
}) => {
   
    if (!resolve) {
        console.log('No resolve');
        return new Promise((resolve, reject) => {
            listenForCredentials({
                popup,
                provider,
                resolve,
                reject,
                isAdd,
                profile
            });
        });
    } else {
        let credentials;
        try {
            credentials = getAllParams(popup.location) //get the credentials from the window location parameters
        } catch (err) {
            console.error('[ListenForCredentials] - err: ', err);
            // reject({
            //     errors: 'Error parsing credentials'
            // })
        }
        if (credentials && credentials.uid && credentials.token) {  //if we have credentials and a user id, continue
            popup.close();
            // validate token
            var url = '';
            if(isAdd && profile != null){
                url = '/api/auth/validate-token?isAdd=' + isAdd + '&profile=' + profile;
            } else {
                url = '/api/auth/validate-token'
            }
            fetch(url, {
                    headers: {
                        'Authorization': "JWT " + credentials.token
                    },
                })
                .then(parseResponse)
                .then(data => {
                    if(isAdd && data.status === 4){
                        resolve({
                            data,
                            credentials,
                            error: data.error
                        })
                    } else {
                        resolve({
                            data,
                            credentials
                        });
                    }
                    
                })
                .catch(error => {
                    reject({
                        error
                    });
                });
        } else if (popup.closed) { //check if the popup was closed by the user
            reject({
                errors: 'Authentication was cancelled'
            });
        } else { //loop until we get a response
            setTimeout(() => {
                listenForCredentials({
                    popup,
                    provider,
                    resolve,
                    reject,
                    isAdd,
                    profile
                })
            }, 1000);
        }
    }
}