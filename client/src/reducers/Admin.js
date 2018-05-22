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
    REMOVE_SUBMISSION,
    DELETE_COMMENT,
    DELETE_SUBMISSION,
    DELETE_USER,
    REMOVE_COMMENT
} from '../actions/admin'

const AdminReducer = (state = {}, action) => {
    console.log("[AdminReducer] - action: ", action)
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
            const newFlaggedComments = state.flaggedComments.filter((comment) => comment._id !== action.commentID)
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
        case REMOVE_COMMENT:
            const newFComments = state.flaggedComments.filter((comment) => {
                return comment.data._id !== action.commentID
            })
            const newDComments = state.deletedComments.filter((comment) => {
                return comment.data._id !== action.commentID
            })

            return Object.assign({}, state, {
                flaggedComments: newFComments,
                deletedComments: newDComments
            })
        case DELETE_COMMENT:
            const newF1Comments = state.flaggedComments.filter((comment) => {
                return comment.data._id !== action.commentID
            })

            return Object.assign({}, state, {
                flaggedComments: newF1Comments,
            })
        case DELETE_SUBMISSION:
            const newF1Submissions = state.flaggedSubmissions.filter((submission) => {
                return submission.data._id !== action.submissionID
            })
        
            return Object.assign({}, state, {
                flaggedSubmissions: newF1Submissions,
            })
        case DELETE_USER:
            const newF1Users = state.flaggedUsers.filter((user) => {
                return user._id !== action.userID
            })

            return Object.assign({}, state, {
                flaggedUsers: newF1Users,
            })
        default:
            return state
    }
}

export default AdminReducer