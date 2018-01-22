import {
    REQUEST_FLAGGED_CONTENT,
    RECEIVE_FLAGGED_CONTENT,
    RECEIVE_ADMIN_USERS,
    REQUEST_ADMIN_USERS,
    SEARCH_USERS,
    ADD_ADMIN,
    REMOVE_ADMIN
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
                    flaggedSubmissions: action.flaggedSubmissions,
                    deletedSubmissions: action.deletedSubmissions,
                    flaggedComments: action.comments,
                    fetching: false
                })
            }
        case REQUEST_ADMIN_USERS:
            return Object.assign({}, state, {
                adminUsers: {
                    fetching: true
                }
            })
        case RECEIVE_ADMIN_USERS:
            if(action.error){
                return Object.assign({}, state, {
                    adminUsers: {
                        fetching: false,
                        error: action.error
                    }
                })
            } else {
                return Object.assign({}, state, {
                    adminUsers: {
                        fetching: false,
                        users: action.users
                    }
                })
            }
        case SEARCH_USERS:
            if(action.error){
                return Object.assign({}, state, {
                    searchResults: {
                        error: action.error
                    }
                })
            } else {
                return Object.assign({}, state, {
                    searchResults: {
                        users: action.users,
                        keywords: action.keywords
                    }
                })
            }
        case ADD_ADMIN:
            return Object.assign({}, state, {
                adminUsers: {
                    users: state.adminUsers.users.concat(action.user)
                }
            })
        
        case REMOVE_ADMIN:
            const newUsers = state.adminUsers.users.filter((user) => user._id != action.userID)
            return Object.assign({}, state, {
                adminUsers: {
                    users: newUsers
                }
            })

        default:
            return state
    }
}

export default AdminReducer