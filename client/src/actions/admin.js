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

export const RESTORE_SUBMISSION = "RESTORE_SUBMISSION"
const restoreSubmissionAction = ({
    submissionID,
    error
}) => {
    return {
        type: RESTORE_SUBMISSION,
        submissionID,
        error
    }
}

export const RESTORE_COMMENT = "RESTORE_COMMENT"
const restoreCommentAction = ({
    commentID,
    error
}) => {
    return {
        type: RESTORE_COMMENT,
        commentID,
        error
    }
}

export const RESTORE_USER = "RESTORE_USER"
const restoreUserAction = ({
    userID,
    error
}) => {
    return {
        type: RESTORE_USER,
        userID,
        error
    }
}

export const UNFLAG_USER = "UNFLAG_USER"
const unflagUserAction = ({
    userID,
    error
}) => {
    return {
        type: UNFLAG_USER,
        userID,
        error
    }
}

export const UNFLAG_SUBMISSION = "UNFLAG_SUBMISSION"
const unflagSubmissionAction = ({
    submissionID,
    error
}) => {
    return {
        type: UNFLAG_SUBMISSION,
        submissionID,
        error
    }
}

export const UNFLAG_COMMENT = "UNFLAG_COMNENT"
const unflagCommentAction = ({
    commentID,
    error
}) => {
    return {
        type: UNFLAG_COMMENT,
        commentID,
        error
    }
}

// Actions ================================================

export const fetchFlaggedContent = () => {
    console.log("Fetch flagged content...")
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

                    const deletedComments = resp.data.comments.filter(comment => comment.data.deleted)
                    const flaggedComments = resp.data.comments.filter(comment => comment.data.flagged)

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
    console.log("Fetch admin users...")
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
    console.log("[AdminActions] - remove submission: ", submissionID)
    return (dispatch) => {
        if(submissionID){
            axios.post("/api/admin/remove-submission", {submissionID}, {
                headers: {
                    "Authorization": "JWT " + store.getState().auth.token
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
            axios.post("/api/admin/remove-comment", {commentID}, {
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
            axios.post("/api/admin/remove-user", {userID}, {
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
                submissionID
            }, {
                headers: {
                    "Authorization": "JWT " + store.getState().auth.token
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

export const deleteComment = ({commentID, submissionID}) => {
    return (dispatch) => {
        if(commentID){
            axios.post("/api/admin/delete-comment", {
                commentID,
                submissionID
            }, {
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
                userID
            }, {
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

export const restoreSubmission = ({submissionID}) => {
    return (dispatch) => {
        if(submissionID) {
            axios.post("/api/admin/restore-submission", {
                submissionID
            }, {
                headers: {
                    "Authorization": "JWT " + store.getState().auth.token
                }
            }).then(
                resp => {
                    console.log("[AdminActions] - restore submission successful")
                    dispatch(restoreSubmissionAction({submissionID}))
                }, err => {
                    console.error("[AdminActions] - restore submission returned error: ", err)
                    dispatch(restoreSubmissionAction({error: err}))
                }
            )
        }
    }
}

export const restoreUser = ({userID}) => {
    return (dispatch) => {
        axios.post("/api/admin/restore-user", {
            userID
        }, {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(restoreUserAction({userID}))
            },
            err => {
                dispatch(restoreUserAction({error: err}))
            }
        )
    }
}

export const restoreComment = ({commentID}) => {
    return (dispatch) => {
        axios.post("/api/admin/restore-comment", {
            commentID
        }, {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(restoreCommentAction({commentID}))
            },
            err => {
                dispatch(restoreCommentAction({error: err}))
            }
        )
    }
}

export const unflagUser = ({userID}) => {
    return (dispatch) => {
        axios.post("/api/admin/unflag-user", {
            userID
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(unflagUserAction({userID}))
            },
            err => {
                dispatch(unflagUserAction({error: err}))
            }
        )
    }
}

export const unflagSubmission = ({submissionID}) => {
    return (dispatch) => {
        axios.post("/api/admin/unflag-submission",{
            submissionID
        }, {
            headers : {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(unflagSubmissionAction({submissionID}))
            },
            err => {
                dispatch(unflagSubmissionAction({error: err}))
            }
        )
    }
}

export const unflagComment = ({commentID}) => {
    return (dispatch) => {
        axios.post("/api/admin/unflag-comment", {
            commentID
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(unflagCommentAction({commentID}))
            },
            err => {
                dispatch(unflagCommentAction({error: err}))
            }
        )
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