import {
    authenticate,
    authenticateNewSocial
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
    user,
    error
}) => {
    return {
        type: END_ADD_SOCIAL,
        user,
        provider,
        error
    }
}


export const addSocial = (provider, next) => {
    return function (dispatch) {
        dispatch(beginAddSocial(provider));
        switch (provider) {
            case 'Github':
                authenticateNewSocial('github').then(resp => {
                    dispatch(endAddSocial({
                        provider: 'github',
                        user: resp.data.user
                    }));
                    next(true);
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding github'
                    }))
                    next(false);
                })
                break
            case 'Twitter':
                authenticateNewSocial('twitter').then(resp => {
                    dispatch(endAddSocial({
                        provider: 'twitter',
                        user: resp.data.user
                    }))
                    next(true);
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding twitter'
                    }))
                    next(false);
                })
                break
            case 'Facebook':
                authenticateNewSocial('fb').then(resp => {
                    dispatch(endAddSocial({
                        provider: 'fb',
                        user: resp.data.user
                    }))
                    next(true);
                }, error => {
                    dispatch(endAddSocial({
                        error: 'Error adding fb'
                    }))
                    next(false);
                })
                break;
            case 'Google':
                authenticateNewSocial('google').then(resp => {
                    dispatch(endAddSocial({
                        provider: 'google',
                        user: resp.data.user
                    }))
                    next(true);
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
                    console.log('[SignIn] - resp: ', resp);
                    dispatch(endUserAuthentication('Github', resp.data.user, resp.credentials.token, null))
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