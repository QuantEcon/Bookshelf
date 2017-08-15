import openPopup from './popup';
import {
    parseResponse
} from './url';
import {
    getParamByName
} from './url'


import store from '../store/store'

export const authenticate = (provider) => {
    //TODO: extract url to central config file
    const popup = openPopup(provider, `http://localhost:8080/api/auth/${provider}`, `${provider} authentication`);
    //wait for authentication to complete
    return listenForCredentials({
        popup,
        provider
    })
}

export const authenticateNewSocial = (provider) => {
    console.log('[Authentication] - add new social: ', provider);
    const popup = openPopup(provider, `http://localhost:8080/api/auth/${provider}/add?jwt=` + store.getState().auth.token, `${provider} authentication`);

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

// function ProccessChildMessage(message){
//     console.log('[Authentication] - received message from popup: ', message);
// }

// const listenForDone = ({
//     popup,
//     provider,
//     resolve,
//     reject,
//     isAdd
// }) => {
//     if (!resolve) {
//         return new Promise((resolve, reject) => {
//             listenForDone(popup, provider, resolve, reject);
//         });
//     } else {
//         let params
//         try {
//             params = getAllParams(popup.location);
//         } catch (err) {
//             console.error('[ListenForDone] - err: ', err);
//         }

//         if (params && params.success != null) {
//             if (params.success) {
//                 popup.close();
//                 axios.get('/api/auth/validate-token', {
//                     headers: {
//                         'Authorization': 'JWT ' + store.getState().auth.token
//                     }
//                 }).then(response => {
//                     console.log('[ListenForDone] - response: ', response);
//                     resolve({
//                         data: response.data.credentials
//                     })
//                 }).catch(error => {
//                     reject({
//                         error
//                     })
//                 })
//             } else {
//                 reject({
//                     error: 'Couldn\'t authenticate to add'
//                 })
//             }
//         } else if (popup.closed) {
//             reject({
//                 errors: 'Authentication was cancelled'
//             })
//         } else {
//             setTimeout(function () {
//                 listenForDone(popup, provider, resolve, reject);
//             }, 1000);
//         }
//     }
// }

const listenForCredentials = ({
    popup,
    provider,
    resolve,
    reject,
    isAdd,
    profile
}) => {
    console.log('[ListenForCredentials] - isAdd:',isAdd);
    console.log('[ListenForCredentials] - profile:',profile);
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
        console.log('[ListenForCredentials] - credentials:',credentials);
        if (credentials && credentials.uid && credentials.token) { //if we have credentials and a user id, continue
            popup.close();
            // validate token
            console.log('[ListenForCredentials] - /api/auth/validate-token?isAdd=' + isAdd + '&profile=' + profile);
            var url = '';
            if(isAdd && profile != null){
                console.log('[ListenForCredentials] - isAdd and profile');
                url = '/api/auth/validate-token?isAdd=' + isAdd + '&profile=' + profile;
            } else {
                url = '/api/auth/validate-token'
            }
            console.log('[ListenForCredentials] - fetch url: ', url);
            fetch(url, {
                    headers: {
                        'Authorization': "JWT " + credentials.token
                    },
                })
                .then(parseResponse)
                .then(data => {
                    console.log('[Authentication] - data: ', data);
                    resolve({
                        data,
                        credentials
                    });
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