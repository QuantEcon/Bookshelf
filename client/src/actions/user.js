import store from '../store/store';

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const requestUserInfo = (userID = null) => {
    return {
        type: REQUEST_USER_INFO,
        userID
    }
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const receiveUserInfo = (userID, json) => {
    return {
        type: RECEIVE_USER_INFO,
        userID,
        data: json[0],
        receivedAt: Date.now()
    }
}

export const REQUIRE_SIGN_IN = 'REQUIRE_SIGN_IN'
export const requireSignIn = () => {
    return {
        type: REQUIRE_SIGN_IN,
        userID: 'my-profile'
    }
}

export const INVALIDATE_USER_INFO = 'INVALIDATE_USER_INFO'
export const invalidateUserInfo = (userID) => {
    return {
        type: INVALIDATE_USER_INFO,
        userID
    }
}

export const fetchUserInfo = (userID) => {
    return function(dispatch) {
        dispatch(requestUserInfo(userID));
        const state = store.getState();
        if(userID === 'my-profile'){
            if(!state.auth.isSignedIn){
                dispatch(requireSignIn());
                return;
            }
            userID = state.auth.user._id;
        }
        fetch('/api/search/users/?_id=' + userID).then(
            results => {return results.json();},
            error => {console.log('An error ocurred: ', error)}
        ).then(data => {
            dispatch(receiveUserInfo(userID, data))
        });
    }
}