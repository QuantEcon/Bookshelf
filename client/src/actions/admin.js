import axios from 'axios'
import store from '../store/store'

// Dispatch Objects ========================================

export const REQUEST_FLAGGED_CONTENT = 'REQUEST_FLAGGED_CONTENT'
const requestFlaggedContentAction = () => {
    return {
        type: REQUEST_FLAGGED_CONTENT
    }
}

export const RECEIVE_FLAGGED_CONTENT = 'RECEIVE_FLAGGED_CONTENT'
const receiveFlaggedContentAction = ({
    flaggedUsers,
    deletedUsers,
    flaggedSubmissions,
    deletedSubmissions,
    flaggedComments,
    deletedComments,
    error
}) => {
    return {
        type: RECEIVE_FLAGGED_CONTENT,
        flaggedUsers,
        deletedUsers,
        flaggedSubmissions,
        deletedSubmissions,
        flaggedComments,
        deletedComments,
        error
    }
}

export const REQUEST_ADMIN_USERS = "REQUEST_ADMIN_USERS"
const requestAdminUsersAction = () => {
    return {
        type: REQUEST_ADMIN_USERS
    }
}

export const RECEIVE_ADMIN_USERS = "RECEIVE_ADMIN_USERS"
const receiveAdminUsersAction = ({
    users,
    error
}) => {
    return {
        type: RECEIVE_ADMIN_USERS,
        users,
        error
    }
}

export const REMOVE_SUBMISSION = "REMOVE_SUBMISSION"
const removeSubmissionAction = ({
    submissionID,
    error
}) => {
    return {
        type: REMOVE_SUBMISSION,
        error,
        submissionID
    }
}

export const REMOVE_COMMENT = "REMOVE_COMMENT"
const removeCommentAction = ({
    commentID,
    error
}) => {
    return {
        type: REMOVE_COMMENT,
        error,
        commentID
    }
}

export const REMOVE_USER = "REMOVE_USER"
const removeUserAction = ({
    userID,
    error
}) => {
     return {
         type: REMOVE_USER,
         userID,
         error
     }
 }

 export const DELETE_SUBMISSION = "DELETE_SUBMISSION"
const deleteSubmissionAction = ({
    submissionID,
    error
}) => {
    return {
        type: DELETE_SUBMISSION,
        error,
        submissionID
    }
}

export const DELETE_COMMENT = "DELETE_COMMENT"
const deleteCommentAction = ({
    commentID,
    error
}) => {
    return {
        type: DELETE_COMMENT,
        error,
        commentID
    }
}

export const DELETE_USER = "DELETE_USER"
const deleteUserAction = ({
    userID,
    error
}) => {
     return {
         type: DELETE_USER,
         userID,
         error
     }
 }
 
export const SEARCH_USERS = "SEARCH_USERS"
const searchUsersAction = ({
    keywords,
    users,
    error
}) => {
    return {
        type: SEARCH_USERS,
        keywords,
        users,
        error
    }
}

export const ADD_ADMIN = "ADD_ADMIN"
const addAdminAction = ({
    user,
    error
}) => {
    return {
        type: ADD_ADMIN,
        user,
        error
    }
}

export const REMOVE_ADMIN = "REMOVE_ADMIN"
const removeAdminAction = ({
    userID,
    error
}) => {
    return {
        type: REMOVE_ADMIN,
        userID,
        error
    }
}

// Actions ================================================

export const fetchFlaggedContent = () => {
    return (dispatch) => {
        dispatch(requestFlaggedContentAction())

        axios.get('/api/admin/flagged-content', {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                if(resp.data.error){
                    console.log("[AdminActions] - error fetching admin data: ", resp.data.message)
                    dispatch(receiveFlaggedContentAction({
                        error: resp.data.message
                    }))
                } else {
                    console.log("[AdminActions] - request returned: ", resp)

                    const deletedSubmissions = resp.data.submissions.filter(submission => submission.data.deleted)
                    const flaggedSubmissions = resp.data.submissions.filter(submission => submission.data.flagged)

                    const deletedComments = resp.data.comments.filter(comment => comment.deleted)
                    const flaggedComments = resp.data.comments.filter(comment => comment.flagged)

                    const deletedUsers = resp.data.users.filter(user => user.deleted)
                    const flaggedUsers = resp.data.users.filter(user => user.flagged)

                    console.log("[AdminActions] - flaggedSubmissions: ", flaggedSubmissions)
                    console.log("[AdminActions] - deletedSubmissions: ", deletedSubmissions)

                    dispatch(receiveFlaggedContentAction({
                        deletedUsers,
                        flaggedUsers,
                        deletedComments,
                        flaggedComments,
                        deletedSubmissions,
                        flaggedSubmissions
                    }))
                }
            },
            err => {
                console.log("[AdminActions] - error fetching admin data: ", err)
                dispatch(receiveFlaggedContentAction({
                    error: err
                }))
            }
        )
    }
}

export const fetchAdminUsers = () => {
    return (dispatch) => {
        dispatch(requestAdminUsersAction())

        axios.get('/api/admin/admin-users', {
            headers: {
                'Authorization' : "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                console.log("[AdminActions] (fetchAdminUsers) - resp: ", resp)
                if(resp.data.error){
                    dispatch(receiveAdminUsersAction({error: resp.data.message}))
                } else {
                    dispatch(receiveAdminUsersAction({users: resp.data}))
                }
            },
            err => {
                console.log("[AdminActions (fetchAdminUsers)] - error occured fetching admin users: ", err)
                dispatch(receiveAdminUsersAction({error: err}))
            }
        )
    }
}

export const removeSubmission = ({submissionID}) => {
    return (dispatch) => {
        if(submissionID){
            axios.post("/api/admin/remove-submission", {
                headers: {
                    "Authorization": "JWT " + store.getState().token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(removeSubmissionAction({error: resp.data.message}))
                    } else {
                        dispatch(removeSubmissionAction({submissionID}))
                    }
                },
                err => {
                    dispatch(removeSubmissionAction({error: err}))
                }
            )
        } else {
            dispatch(removeSubmissionAction({error: "No submissionID provided"}))
        }
    }
}

export const removeComment = ({commentID}) => {
    return (dispatch) => {
        if(commentID){
            axios.post("/api/admin/remove-comment", {
                headers: {
                    "Authorization" : "JWT " + store.getState().auth.token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(removeCommentAction({error: resp.data.message}))
                    } else {
                        dispatch(removeCommentAction({commentID}))
                    }
                },
                err => {
                    dispatch(removeCommentAction({error: err}))
                }
            )
        } else {
            dispatch(removeCommentAction({error: "No commentID was provided"}))
        }
    }
}

export const removeUser = ({userID}) => {
    return (dispatch) => {
        if(userID){
            axios.post("/api/admin/remove-user", {
                headers: {
                    "Authorization" : "JWT " + store.getState().auth.token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(removeUserAction({error: resp.data.message}))
                    } else {
                        dispatch(removeUserAction({userID}))
                    }  
                },
                err => {
                    dispatch(removeUserAction({error: err}))
                }
            )
        } else {
            dispatch(removeUserAction({error: "No userID was provided"}))
        }
    }
}

export const deleteSubmission = ({submissionID}) => {
    return (dispatch) => {
        if(submissionID){
            axios.post("/api/admin/delete-submission", {
                headers: {
                    "Authorization": "JWT " + store.getState().token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(deleteSubmissionAction({error: resp.data.message}))
                    } else {
                        dispatch(deleteSubmissionAction({submissionID}))
                    }
                },
                err => {
                    dispatch(deleteSubmissionAction({error: err}))
                }
            )
        } else {
            dispatch(deleteSubmissionAction({error: "No submissionID provided"}))
        }
    }
}

export const deleteComment = ({commentID}) => {
    return (dispatch) => {
        if(commentID){
            axios.post("/api/admin/delete-comment", {
                headers: {
                    "Authorization" : "JWT " + store.getState().auth.token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(deleteCommentAction({error: resp.data.message}))
                    } else {
                        dispatch(deleteCommentAction({commentID}))
                    }
                },
                err => {
                    dispatch(deleteCommentAction({error: err}))
                }
            )
        } else {
            dispatch(deleteCommentAction({error: "No commentID was provided"}))
        }
    }
}

export const deleteUser = ({userID}) => {
    return (dispatch) => {
        if(userID){
            axios.post("/api/admin/delete-user", {
                headers: {
                    "Authorization" : "JWT " + store.getState().auth.token
                }
            }).then(
                resp => {
                    if(resp.data.error){
                        dispatch(deleteUserAction({error: resp.data.message}))
                    } else {
                        dispatch(deleteUserAction({userID}))
                    }  
                },
                err => {
                    dispatch(deleteUserAction({error: err}))
                }
            )
        } else {
            dispatch(deleteUserAction({error: "No userID was provided"}))
        }
    }
}

export const searchUsers = ({keywords}) => {
    return (dispatch) => {
        console.log("[AdminActions] - searching users: ", keywords)
        axios.post("/api/admin/search-users", {
            keywords
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                console.log("[AdminActions] - search returned: ", resp)
                dispatch(searchUsersAction({users: resp.data, keywords}))
            },
            err => {
                console.log("[AdminActions] - search returned error: ", err)
            }
        )
    }
}

export const addAdmin = ({userID}) => {
    return (dispatch) => {
        axios.post("/api/admin/make-admin", {
            userID
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                console.log("[AdminActions] - make admin returned: ", resp)
                dispatch(addAdminAction({
                    user: resp.data
                }))
            },
            err => {
                console.log("[AdminActions] - make admin returned err: ", err)
                dispatch(addAdminAction({
                    error: err
                }))
            }
        )
    }
}

export const removeAdmin = ({userID}) => {
    return (dispatch) => {
        console.log("[AdminActions] - remove admin: ", userID)
        axios.post("/api/admin/remove-admin", {
            userID
        }, {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(removeAdminAction({userID}))
            }, 
            err => {
                dispatch(removeAdminAction({error: err}))
            }
        )
    }
}