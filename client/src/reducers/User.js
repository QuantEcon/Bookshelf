import {
    REQUEST_USER_INFO,
    RECEIVE_USER_INFO,
    REQUIRE_SIGN_IN
} from '../actions/user'

const UserReducer = (state = {}, action) => {
    switch(action.type){
        case REQUEST_USER_INFO:
            var newState = Object.assign({}, state, {
                isFetching: true,
                [action.userID]: {
                    isFetching: true,
                    didInvalidate: false
                }
            });
            return newState;
        case RECEIVE_USER_INFO:
            var receiveNewState = Object.assign({}, state, {
                isFetching: false,
                [action.userID]: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                    data: action.data
                }
            })
            return receiveNewState;
        case REQUIRE_SIGN_IN:
            return Object.assign({}, state, {
                isFetching: false,
                [action.userID]: {
                    isFetching: false,
                    didInvalidate: false
                },
            })
        default: 
            return state
    }
}

export default UserReducer;