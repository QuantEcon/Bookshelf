import axios from 'axios'
import store from '../store/store'
import {
    logRequestSubmissionEndAction,
    logRequestSubmissionStartAction
} from './utils'

import sizeof from 'object-sizeof'

export const DELETE_SUBMISSION = 'DELETE_SUBMISSION'
const deleteSubmissionAction = ({
    submissionID
}) => {
    return {
        type: DELETE_SUBMISSION,
        submissionID
    }
}
// import {fetch as authFetch} from 'redux-auth';
export const REQUEST_NB_INFO = 'REQUEST_NB_INFO';
export function requestNBInfo(notebookID = null) {
    // console.log('[Submission Actions] - request nb info: ', notebookID);
    return {
        type: REQUEST_NB_INFO,
        notebookID
    }
}

export const RECEIVE_NB_INFO = 'RECEIVE_NB_INFO';
export function receiveNBInfo({
    notebookID,
    json,
    error
}) {
    // console.log('[Submission Actions] - receive nb info: ', json);
    if (error) {
        return {
            type: RECEIVE_NB_INFO,
            notebookID,
            error,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: RECEIVE_NB_INFO,
            notebookID,
            data: json,
            receivedAt: Date.now(),
        }
    }
    
}

export const INVALIDATE_NB_INFO = 'INVALIDATE_NB_INFO';
export function invalidateNBInfo(notebookID) {
    return {
        type: INVALIDATE_NB_INFO,
        notebookID
    }
}

export const DOWNVOTE_SUBMISSION = 'DOWNVOTE_SUBMISSION'
export function downvoteSub(submissionID) {
    console.log('[SubmissionActions] - downvote sub: ', submissionID)
    return {
        type: DOWNVOTE_SUBMISSION,
        submissionID
    }
}

export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export function downvoteCom({
    commentID,
    submissionID
}) {
    console.log('[SubmissionActions] - downvoteCom: ', commentID);
    return {
        type: DOWNVOTE_COMMENT,
        commentID,
        submissionID
    }
}

export const UPVOTE_SUBMISSION = 'UPVOTE_SUBMISSION'
export function upvoteSub(submissionID) {
    return {
        type: UPVOTE_SUBMISSION,
        submissionID
    }
}

export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export function upvoteCom({
    commentID,
    submissionID
}) {
    console.log('[SubmissionActions] - upvoteCom: ', commentID);
    return {
        type: UPVOTE_COMMENT,
        commentID,
        submissionID
    }
}

export const POST_COMMENT = 'POST_COMMENT'
export function postComment({
    submissionID,
    comment
}) {
    return {
        type: POST_COMMENT,
        submissionID,
        comment
    }
}

export const POST_REPLY = 'POST_REPLY'
export function postReply(submissionID, commentID, reply) {
    return {
        type: POST_REPLY,
        submissionID,
        commentID,
        reply
    }
}

export const EDIT_SUBMISSION = 'EDIT_SUBMISSION'
const editSubmissionAction = ({
    submission,
    error
}) => {
    return {
        type: EDIT_SUBMISSION,
        submission,
        error
    }
}

export const editSubmission = ({
    formData,
    file,
    notebookJSON,
    submissionID
}, callback) => {
    return (dispatch) => {
        console.log("[EditSubmssion Action] - file: ", file)
        var submission = {
            ...formData,
            lastUpdated: Date.now(),
            _id: submissionID,
            author: store.getState().auth.user,
        };
        if (file) {
            //read and parse file
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                submission.notebookJSON = JSON.parse(event.target.result);
                submission.fileName = file.name
                axios.post('/api/submit/edit-submission', {
                    submissionData: submission
                }, {
                    headers: {
                        'authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(response => {
                    if (response.data.error) {
                        dispatch(editSubmissionAction({
                            error: response.data.error
                        }))
                        callback(false)
                    } else {
                        console.log("[EditSubmission] - received edited submission: ", submission)
                        dispatch(editSubmissionAction({
                            submission
                        }));
                        callback(true)
                    }
                })
            }
        } else if (notebookJSON) {
            submission.notebookJSON = notebookJSON
            axios.post('/api/submit/edit-submission', {
                submissionData: submission
            }, {
                headers: {
                    'authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(response => {
                if (response.data.error) {
                    dispatch(editSubmissionAction({
                        error: response.data.error
                    }))
                } else {
                    dispatch(editSubmissionAction({
                        submission
                    }));
                }
            })
        } else {
            dispatch(editSubmissionAction({
                error: 'No notebook given'
            }));
        }
    }
}

export const deleteSubmission = (submissionID, callback) => {
    console.log("Delete submission action")
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            //check if the submission is the user's
            if (store.getState().auth.user.submissions.indexOf(submissionID) > -1) {
                axios.post('/api/delete/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        console.error('[SubmissionActions] - Server returned an error when deleting a submission:', resp.error);
                        callback(false)
                    } else {
                        console.log("[SubmissionActions (DeleteSubmission)] - dispatch action")
                        dispatch(deleteSubmissionAction({
                            submissionID
                        }));
                        callback(true)
                    }
                }).catch(err => {
                    console.error('[SubmissionActions] - An error occurred while deleting a submission: ', err);
                    callback(false)
                })
            } else {
                console.log('[SubmissionActions] - Submission doesn\'t belong to the user. Can\'t delete');
                callback(false)
            }
        } else {
            console.warn("[SubmissionActions (DeleteSubmission)] - user not signed in")
        }
        
    }
}

export const fetchNBInfo = ({
    notebookID,
    forced
}) => {
    return function (dispatch) {
        if (needToFetch(store.getState(), notebookID) || forced) {
            console.log('[FetchSub] - fetching for ', notebookID)
            var request = {
                id: Date.now(),
                submissionID: notebookID
            }
            dispatch(requestNBInfo(notebookID));

            // logRequestSubmissionStart({
            //     request
            // })
            dispatch(logRequestSubmissionStartAction({
                submissionID: request.submissionID,
                id: request.id
            }))
            axios.get('/api/search/notebook/' + notebookID).then(
                resp => {
                    var sizeKB = sizeof(resp.data) / 1000;
                    console.log('size of response in KB: ', sizeKB);
                    request.size = sizeKB

                    //Used for network analysis
                    dispatch(logRequestSubmissionEndAction({
                        submissionID: request.submissionID,
                        id: request.id,
                        size: request.size
                    }))

                    dispatch(receiveNBInfo({
                        notebookID,
                        json: resp.data
                    }))
                },
                err => {
                    console.warn("[FetchNBInfo] error fetching: ", err.response);

                    dispatch(receiveNBInfo({
                        error: {
                            status: err.response.status,
                            message: err.response.data
                        },
                        notebookID
                    }))
                }
            )
        } else {
            console.log('[FetchSub] - don\'t need to fetch');
        }
    }
}

const needToFetch = (state, submissionID) => {
    return true;
    // if (!state.submissionByID[submissionID]) {
    //     return true;
    // } else if (state.submissionByID[submissionID].didInvalidate) {
    //     return true;
    // } else {
    //     return false;
    // }
}