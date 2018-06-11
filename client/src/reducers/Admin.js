import {
    REQUEST_FLAGGED_CONTENT,
    RECEIVE_FLAGGED_CONTENT,
    RECEIVE_ADMIN_USERS,
    REQUEST_ADMIN_USERS,
    SEARCH_USERS,
    ADD_ADMIN,
    REMOVE_ADMIN,
    RESTORE_SUBMISSION,
    UNFLAG_SUBMISSION,
    UNFLAG_USER,
    UNFLAG_COMMENT,
    REMOVE_SUBMISSION
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
                    flaggedUsers: action.flaggedUsers,
                    deletedUsers: action.deletedUsers,
                    flaggedSubmissions: action.flaggedSubmissions,
                    deletedSubmissions: action.deletedSubmissions,
                    flaggedComments: action.flaggedComments,
                    deletedComments: action.deletedComments,
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
            const newUsers = state.adminUsers.users.filter((user) => user._id !== action.userID)
            return Object.assign({}, state, {
                adminUsers: {
                    users: newUsers
                }
            })
        
        case RESTORE_SUBMISSION:
            const newSubmissions = state.deletedSubmissions.filter((submission) => submission.data._id !== action.submissionID)
            return Object.assign({}, state, {
                deletedSubmissions: newSubmissions
            })

        case UNFLAG_USER:
            const newFlaggedUsers = state.flaggedUsers.filter((user) => user._id !== action.userID)
            return Object.assign({}, state, {
                flaggedUsers: newFlaggedUsers
            })

        case UNFLAG_SUBMISSION:
            const newFlaggedSubmissions = state.flaggedSubmissions.filter((submission) => submission.data._id !== action.submissionID)
            return Object.assign({}, state, {
                flaggedSubmissions: newFlaggedSubmissions
            })

        case UNFLAG_COMMENT:
            const newFlaggedComments = state.flaggedComments.filter((comment) => comment.data._id !== action.commentID)
            console.log("Flagged comments: ", state.flaggedComments)
            console.log("new flagged comments: ", newFlaggedComments)
            return Object.assign({}, state, {
                flaggedComments: newFlaggedComments
            })

        case REMOVE_SUBMISSION:
            const newFSubmissions = state.flaggedSubmissions.filter((submission) => {
                return submission.data._id !== action.submissionID
            })
            const newDSubmissions = state.deletedSubmissions.filter((submission) => {
                return submission.data._id !== action.submissionID
            })

            return Object.assign({}, state, {
                flaggedSubmissions: newFSubmissions,
                deletedSubmissions: newDSubmissions
            })
            
        default:
            return state
    }
}

export default AdminReducer