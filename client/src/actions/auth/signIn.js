import {
    authenticate
} from '../../utils/authentication'

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

export const STORE_CREDENTIALS = 'STORE_CREDENTIALS'
export const storeCredentials = (credentials) => {
    return {
        type: STORE_CREDENTIALS,
        credentials
    }
}


export const signIn = (provider, next) => {
    return function (dispatch) {
        dispatch(beginUserAuthentication(provider));
        console.log('[SignInActions] - begin user authentcation using', provider)
        switch (provider) {
            case 'Github':
                authenticate('github').then(resp => {
                    console.log('[SignInActions] - success authenticating:', resp);
                    dispatch(endUserAuthentication('Github', resp.data.user, resp.data.token, null))
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
                    console.log('[SignInActions] - success authenticating:', resp);
                    dispatch(endUserAuthentication('Twitter', resp.data.user, resp.data.token, null))
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
                    console.log('[SignInActions] - success authenticating:', resp);
                    dispatch(endUserAuthentication('Google', resp.data.user, resp.data.token, null))
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
                    console.log('[SignInActions] - success authenticating:', resp);
                    dispatch(endUserAuthentication('Facebook', resp.data.user, resp.data.token, null))
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