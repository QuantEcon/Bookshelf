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
    users,
    submissions,
    comments,
    error
}) => {
    return {
        type: RECEIVE_FLAGGED_CONTENT,
        users,
        submissions,
        comments,
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
                    dispatch(receiveFlaggedContentAction({
                        users: resp.data.users,
                        submissions: resp.data.submissions,
                        comments: resp.data.comments
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