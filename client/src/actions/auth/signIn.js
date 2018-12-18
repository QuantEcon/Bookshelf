/**
 * @file Actions used for sigining in
 * @author Trevor Lyon
 *
 * @module signInActions
 */

import store from '../../store/store'

import {
    authenticate,
    authenticateNewSocial
} from '../../utils/authentication'
import {
    loadState,
    saveState
} from '../../utils/localStorage'
import axios from 'axios';

export const BEGIN_USER_AUTHENTICATION = 'BEGIN_USER_AUTHENTICATION'
export const beginUserAuthentication = (provider) => {
    return {
        type: BEGIN_USER_AUTHENTICATION,
        provider
    }
}

export const END_USER_AUTHENTICATION = 'END_USER_AUTHENTICATION'
export const endUserAuthentication = (provider, user = {}, token, error, isAdmin) => {
    return {
        type: END_USER_AUTHENTICATION,
        provider,
        user,
        token,
        error,
        isAdmin
    }
}
export const BEGIN_ADD_SOCIAL = 'BEGIN_ADD_SOCIAL'
const beginAddSocial = ({
    provider
}) => {
    return {
        type: BEGIN_ADD_SOCIAL,
        provider
    }
}
export const END_ADD_SOCIAL = 'END_ADD_SOCIAL'
const endAddSocial = ({
    provider,
    profile,
    error,
    existingProfile,
    existingUser
}) => {
    return {
        type: END_ADD_SOCIAL,
        profile,
        provider,
        error,
        existingProfile,
        existingUser
    }
}

export const BEGIN_REAUTHENTICATION = 'BEGIN_REAUTHENTICATION'
const beginReauthentication = () => {
    return {
        type: BEGIN_REAUTHENTICATION
    }
}

export const END_REAUTHENTICATION = 'END_REAUTHENTICATION'
const endReauthentication = ({
    error,
    user,
    token,
    isAdmin
}) => {
    return {
        type: END_REAUTHENTICATION,
        error,
        user,
        token,
        isAdmin
    }
}

/**
 * @function reauthenticate
 *
 * @description If there is a current JWT scored in local storage, this makes an api request
 * to revalidate the token.
 *
 * If the token is valid, the user will be authenticated and signed in.
 *
 * If the token is invalid, it will be removed local storage.
 */
export const reauthenticate = (url) => {
    return (dispatch) => {
        dispatch(beginReauthentication());
        //get token from local storage
        var localState = loadState();
        if (localState && localState.token) {
            axios.get('/api/auth/validate-token', {
                headers: {
                    'Authorization': 'JWT ' + localState.token
                }
            }).then(response => {
                if (response.data.user) {
                    dispatch(endReauthentication({
                        user: response.data.user,
                        token: localState.token,
                        isAdmin: response.data.isAdmin
                    }))
                }
            }).catch(err => {
                dispatch(endReauthentication({
                    error: err
                }));
                localStorage.removeItem('token');
            })
        } else {
            dispatch(endReauthentication({
                error: 'No token saved'
            }));
        }
    }
}

/**
 * @function mergeAccounts
 * @description Sends an API request to merge two accounts.
 *
 * If the merge was successful, the API will return the social profile of the merged account,
 * and `next(true)` will be called
 *
 * If the merge was unsucessful an error will be logged and `next(false)` will be called
 *
 * @param {Object} param0
 * @param {Object} param0.accountToMerge Account to merge into the current account
 * @param {func} next Callback after the API request returns
 */
export const mergeAccounts = ({accountToMerge, next}) => {
    return function(dispatch){
        console.log("[MergeAccounts] - req.body: ", )
        axios.post('/api/edit-profile/merge-accounts',{
            accountToMerge,
            socialID: store.getState().auth.user[accountToMerge].id
            //for github auth.user.github.user.id
        }, {
            headers: {
                'Authorization' : 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
            console.log('[MergeAccounts] - resp:', resp)
            if(resp.data.error){
                console.error('[MergeAccounts] - error returned from server: ', resp.data.error);
                dispatch(endAddSocial({
                    provider: accountToMerge,
                    profile: null
                }))
                next(false)
            } else {
                dispatch(endAddSocial({
                    provider: accountToMerge,
                    profile: resp.data.profile
                }))
                next(true)
            }
        }).catch(err => {
            console.error('[MergeAccountsAction] - error occurred merging accounts: ', err);
        })
    }
}

/**
 * @function addSocial
 * @description Makes an API request to add a social account to the current one.
 *
 * If the add was successful, the API will return the updated user document and
 * `next(true)` will be called
 *
 * If the add was unsuccessful, an error will be logged and `next(false)` will be
 * called
 *
 * @param {String} provider Social to add (Github, Twitter, Facebook, Google)
 * @param {func} next Callback for after the API request returns
 */
export const addSocial = (provider, next) => {
    console.log('[SignIn] - provider:', provider);
    return function (dispatch) {
        dispatch(beginAddSocial(provider));
        switch (provider) {
            case 'Github':
                authenticateNewSocial('github').then(resp => {
                    console.log('[AddSocial] - resp: ', resp);
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            dispatch(endAddSocial({
                                provider: 'github',
                                existingUser: resp.data.user,
                                existingProfile: true

                            }))
                            next(false, 'github')
                        }
                    } else {
                        console.log('[AddSocial] - no error');
                        dispatch(endAddSocial({
                            provider: 'github',
                            profile: resp.data.profile,
                        }));
                        next(true);
                    }
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding github'
                    }))
                    next(false);
                })
                break
            case 'Twitter':
                authenticateNewSocial('twitter').then(resp => {
                    console.log('[AddSocial] - resp: ', resp);
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            console.log('[SignInActions] - user profile already exists');
                            dispatch(endAddSocial({
                                provider: 'twitter',
                                existingUser: resp.data.user,
                                existingProfile: true

                            }))
                            next(false, 'twitter')
                        }
                    } else {
                        console.log('[AddSocial] - no error');
                        dispatch(endAddSocial({
                            provider: 'twitter',
                            profile: resp.data.profile
                        }))
                        next(true);
                    }
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding twitter'
                    }))
                    next(false);
                })
                break
            case 'Google':
                authenticateNewSocial('google').then(resp => {
                    console.log('[AddSocial] - resp: ', resp);
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            console.log('[SignInActions] - user profile already exists');
                            console.log("[SignInActions: google user: ", resp.data.user);
                            dispatch(endAddSocial({
                                provider: 'google',
                                existingUser: resp.data.user,
                                existingProfile: true
                            }))
                            next(false, 'google')
                        }
                    } else {
                        console.log('[AddSocial] - no error');
                        dispatch(endAddSocial({
                            provider: 'google',
                            profile: resp.data.profile,
                        }))
                        next(true);
                    }
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding google'
                    }))
                    next(false);
                })
                break
            default:
                next(false);
        }
    }
}

/**
 * @function signIn
 * @description Makes an api request to sign in with the `provider`.
 *
 * On successful authentication, the `currentUser` will be set in the redux store and `next(true)`
 * will be called.
 *
 * On unsuccessful authentication, an error will be logged and `next(false)` will be called
 *
 * @param {String} provider Social provider to sign in with (Github, Twitter, Facebook, Google)
 * @param {func} next Callback to be called after API request
 */
export const signIn = (provider, next) => {
    return function (dispatch) {
        dispatch(beginUserAuthentication(provider));
        console.log('[SignInActions] - begin user authentcation using', provider)
        switch (provider) {
            case 'Github':
                authenticate('github').then(resp => {
                    dispatch(endUserAuthentication('Github', resp.data.user, resp.credentials.token, null, resp.data.isAdmin))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true, resp.data.user.new);
                }, error => {
                    console.log('[SignInActions] - error authenticating:')
                    console.log('\tprovider: ', provider);
                    console.log('\terror: ', error);
                    dispatch(endUserAuthentication(null, null, null, {
                        message: 'Error authenticating'
                    }))
                    next(false)
                });
                break;
            case 'Twitter':
                authenticate('twitter').then(resp => {
                    console.log('[SignIn] - resp: ', resp);
                    dispatch(endUserAuthentication('Twitter', resp.data.user, resp.credentials.token, null, resp.data.isAdmin))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true, resp.data.user.new)
                }, error => {
                    console.log('[SignInActions] - error authenticating:')
                    console.log('\tprovider: ', provider);
                    console.log('\terror: ', error);
                    dispatch(endUserAuthentication(null, null, null, {
                        message: 'Error authenticating'
                    }))
                    next(false)
                });
                break;
            case 'Google':
                authenticate('google').then(resp => {
                    console.log('[SignIn] - resp: ', resp);
                    if(resp.data.error.message == 'deleted') {
                        console.log('[SignInActions] - error authenticating:')
                        console.log('\tprovider: ', provider);
                        console.log('User', resp.data)
                        dispatch(endUserAuthentication(null, null, null, {
                            message: 'User deleted',
                            user: resp.data.user
                        }))
                        next(false)
                    } else if(resp.data.error.message == 'active') {
                        dispatch(endUserAuthentication('Google', resp.data.user, resp.credentials.token, null, resp.data.isAdmin))
                        saveState({
                            token: resp.credentials.token
                        });
                        next(true, resp.data.user.new)
                    }
                }, error => {
                    console.log('[SignInActions] - error authenticating:')
                    console.log('\tprovider: ', provider);
                    console.log('\terror: ', error);
                    dispatch(endUserAuthentication(null, null, null, {
                        message: 'Error authenticating'
                    }))
                    next(false)
                });
                break;
            case 'Facebook':
                authenticate('fb').then(resp => {
                    console.log('[SignIn] - resp: ', resp);
                    dispatch(endUserAuthentication('Facebook', resp.data.user, resp.credentials.token, null, resp.data.isAdmin))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true, resp.data.user.new)
                }, error => {
                    console.log('[SignInActions] - error authenticating:')
                    console.log('\tprovider: ', provider);
                    console.log('\terror: ', error);
                    dispatch(endUserAuthentication(null, null, null, {
                        message: 'Error authenticating'
                    }))
                    next(false)
                });
                break;
            default:
                dispatch(endUserAuthentication(null, null, null, {
                    message: 'Invalid auth provider'
                }));
        }
    }
}
