import {
    REQUEST_USER_INFO,
    RECEIVE_USER_INFO
} from '../actions/user'

const UserReducer = (state = {}, action) => {
    switch(action.type){
        case REQUEST_USER_INFO:
            return Object({}, state, {
                isFetching: true,
                [action.userID]: {
                    idFetching: true,
                    didInvalidate: false
                }
            });
        case RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                [action.userID]: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                    data: action.data
                }
            })
        default: 
            return state
    }
}

export default UserReducer;