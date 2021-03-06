/**
 * @file User actions
 * @author Trevor Lyon
 * 
 * @module userActions
 */

import store from '../store/store';
import axios from 'axios'

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

export const FLAG_USER = "FLAG_USER"
const flagUserAction = ({userID, error}) => {
    return {
        type: FLAG_USER,
        error,
        userID
    }
}

// ==================================================

export const flagUser = ({userID}) => {
    return (dispatch) => {
        axios.post("/api/flag/user", {userID}).then(
            resp => {
                dispatch(flagUserAction({userID}))
            },
            err => {
                dispatch(flagUserAction({error: err}))
            }
        )
    }
}


/**
 * @function fetchUserInfo
 * @description Makes an API request to fetch all the data for the user with the matching ID
 * @param {String} userID ID of the user being searched for
 */
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