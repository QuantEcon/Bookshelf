import {
    REQUEST_FLAGGED_CONTENT,
    RECEIVE_FLAGGED_CONTENT
} from '../actions/admin'

const AdminReducer = (state = {}, action) => {
    switch(action.type){
        case REQUEST_FLAGGED_CONTENT:
            return Object.assign({}, state, {
                fetching: true
            })
        case RECEIVE_FLAGGED_CONTENT:
            console.log("[AdminReducer] - action: ", action)
            if(action.error){
                return Object.assign({}, state, {
                    error: action.error,
                    fetching: false
                })
            } else {
                return Object.assign({}, state, {
                    flaggedUsers: action.users,
                    flaggedSubmissions: action.submissions,
                    flaggedComments: action.comments,
                    fetching: false
                })
            }
        default:
            return state
    }
}

export default AdminReducer