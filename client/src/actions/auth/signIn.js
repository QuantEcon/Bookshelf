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
export const endUserAuthentication = (provider, user = {}, token, error) => {
    return {
        type: END_USER_AUTHENTICATION,
        provider,
        user,
        token,
        error
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
    token
}) => {
    return {
        type: END_REAUTHENTICATION,
        error,
        user,
        token
    }
}

export const reauthenticate = () => {
    console.log('REAUTHENTICATE');
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
                        token: localState.token
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

export const mergeAccounts = ({accountToMerge, next}) => {
    return function(dispatch){
        axios.post('/api/edit-profile/merge-accounts',{
            accountToMerge,
            socialID: store.getState().auth.user[accountToMerge].id
        }, {
            headers: {
                'Authorization' : 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
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

export const addSocial = (provider, next) => {
    console.log('[SignIn] - provider:', provider);
    return function (dispatch) {
        dispatch(beginAddSocial(provider));
        switch (provider) {
            case 'Github':
                authenticateNewSocial('github').then(resp => {
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            dispatch(endAddSocial({
                                provider: 'github',
                                profile: resp.data.user['github'],
                                existingProfile: true
                                
                            }))
                            next(false, 'github')
                        }
                    } else {
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
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            console.log('[SignInActions] - user profile already exists');
                            dispatch(endAddSocial({
                                provider: 'twitter',
                                profile: resp.data.user['twitter'],
                                existingProfile: true
                                
                            }))
                            next(false, 'twitter')
                        }
                    } else {
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
            case 'Facebook':
                authenticateNewSocial('fb').then(resp => {
                    if (resp.data.error) {
                        if (resp.data.error.staus === 4) {
                            console.log('[SignInActions] - user profile already exists');
                            //TODO: ask user if he/she wants to merge accounts
                            dispatch(endAddSocial({
                                provider: 'fb',
                                profile: resp.data.user['fb'],
                                existingProfile: true
                            }))
                            next(false, 'fb')
                        }
                    } else {
                        dispatch(endAddSocial({
                            provider: 'fb',
                            profile: resp.data.profile
                        }))
                        next(true);
                    }

                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding fb'
                    }))
                    next(false);
                })
                break;
            case 'Google':
                authenticateNewSocial('google').then(resp => {
                    if (resp.data.error) {
                        if (resp.data.error.status === 4) {
                            console.log('[SignInActions] - user profile already exists');
                            dispatch(endAddSocial({
                                provider: 'google',
                                existingUser: resp.data.user,
                                existingProfile: true
                            }))
                            next(false, 'google')
                        }
                    } else {
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

export const signIn = (provider, next) => {
    return function (dispatch) {
        dispatch(beginUserAuthentication(provider));
        console.log('[SignInActions] - begin user authentcation using', provider)
        switch (provider) {
            case 'Github':
                authenticate('github').then(resp => {
                    dispatch(endUserAuthentication('Github', resp.data.user, resp.credentials.token, null))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true);
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
                    dispatch(endUserAuthentication('Twitter', resp.data.user, resp.credentials.token, null))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true)
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
                    dispatch(endUserAuthentication('Google', resp.data.user, resp.credentials.token, null))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true)
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
                    dispatch(endUserAuthentication('Facebook', resp.data.user, resp.credentials.token, null))
                    saveState({
                        token: resp.credentials.token
                    });
                    next(true)
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