/**
 * @file Sign out actions
 * @author Trevor Lyon
 * 
 * @module signOutActions
 */
import axios from 'axios'
import store from '../../store/store';

export const SIGN_OUT = 'SIGN_OUT'
const signOutAction = ({
    error
}) => {
    return {
        type: SIGN_OUT,
        error
    }
}

/**
 * @function signOut
 * @description
 * Makes an api request to invalidate the token. Then removes the token from local storage
 * and sets the `currentUser` in the redux store to `null`
 */
export const signOut = () => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.get('/api/auth/sign-out', {
                headers: {
                    'authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(resp => {
                if(resp.data.error){
                    console.log('[AuthActions] - error signing out: ', resp.data.error);
                    dispatch(signOutAction({error: resp.data.error}));
                } else {
                    dispatch(signOutAction());
                }
            }).catch(error => {
                dispatch(signOutAction({error}));
            })
        } else {
            dispatch(signOutAction({
                error: 'Not signed in'
            }))
        }
    }
}