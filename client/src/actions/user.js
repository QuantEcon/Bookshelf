export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const requestUserInfo = (userID = null) => {
    return {
        type: REQUEST_USER_INFO,
        userID
    }
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const receiveUserInfo = (userID, json) => {
    console.log('[User Actions] - json', json);
    return {
        type: RECEIVE_USER_INFO,
        userID,
        data: json[0],
        receivedAt: Date.now()
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
        fetch('/api/search/users/?_id=' + userID).then(
            results => {return results.json();},
            error => {console.log('An error ocurred: ', error)}
        ).then(data => {
            dispatch(receiveUserInfo(userID, data))
        });
    }
}