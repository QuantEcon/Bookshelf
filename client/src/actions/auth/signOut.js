export const START_SIGN_OUT = 'START_SIGN_OUT';
export const startSignOut = () => {
    return {
        type: START_SIGN_OUT
    }
}

export const END_SIGN_OUT = 'END_SIGN_OUT';
export const endSignOut = () => {
    return {
        type: END_SIGN_OUT
    }
}

export const signOut = () => {
    return function(dispatch) {
        dispatch(startSignOut());
        fetch('/api/auth/signout').then(
            resp => {return resp.json();},
            error => {console.log('[UserActions] - Error occurred signing out: ', error)}
        ).then(results => {
            console.log('[UserActions] - successfully signed out');
            dispatch(endSignOut());
        });
    }
}