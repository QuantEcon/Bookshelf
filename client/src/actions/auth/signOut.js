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