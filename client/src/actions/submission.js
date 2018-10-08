/**
 * @file Submission actions
 * @author Trevor Lyon
 *
 * @module submissionActions
 */
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

export const REQUEST_NB = 'REQUEST_NB'
export const requestNBAction = (notebookID) => {
    return {
        type: REQUEST_NB,
        notebookID
    }
}

export const RECEIVE_NB = 'RECEIVE_NB'
export const receiveNBAction = ({
    notebookID,
    json,
    error
}) => {
    if (error) {
        return {
            type: RECEIVE_NB,
            error: true,
            message: error,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: RECEIVE_NB,
            notebookID,
            json,
            receivedAt: Date.now()
        }
    }
}

export const NB_PROGRESS = "NB_PROGRESS"
export const nbProgressAction = (dataReceived, totalData, notebookID) => {
    return {
        type: NB_PROGRESS,
        dataReceived,
        totalData,
        notebookID
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
    comment,
    author
}) {
    return {
        type: POST_COMMENT,
        submissionID,
        comment,
        author
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

export const FLAG_SUBMISSION = 'FLAG_SUBMISSION'
const flagSubmissionAction = ({
    submissionID,
    flaggedReason,
    error
}) => {
    return {
        type: FLAG_SUBMISSION,
        submissionID,
        flaggedReason,
        error
    }
}

export const FLAG_COMMENT = "FLAG_COMMENT"
const flagCommentAction = ({
    commentID,
    flaggedReason,
    error
}) => {
    return {
        type: FLAG_COMMENT,
        commentID,
        flaggedReason,
        error
    }
}

// ============================================================

/**
 * @function editSubmission
 * @description Makes an API request to edit a submission. Will replace any data supplied
 * with the data in the database.
 * @param {Object} param0
 * @param {Object} param0.formData Data the user filled out in the submit form
 * @param {File} param0.file File the user uploaded. (Can be null if `notebookJSON` is provided)
 * @param {Object} param0.notebookJSON JSON object representing the ipynb file. (can by null if
 * a new file was uploaded)
 * @param {String} param0.submissionID ID of the submission being edited
 * @param {func} callback Method to call when the API returns
 */
export const editSubmission = ({
    formData,
    file,
    notebookJSON,
    submissionID
}, callback) => {
    return (dispatch) => {
        console.log("[EditSubmission Action] - file: ", file)
        var submission = {
            ...formData,
            lastUpdated: Date.now(),
            _id: submissionID,
            author: store.getState().auth.user,
        };

        if (file) {
            submission.fileName = file.name
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
                        console.log("false callback")
                        callback(false)
                    } else {
                        console.log("[EditSubmission] - received edited submission: ", submission)
                        dispatch(editSubmissionAction({
                            submission
                        }));
                        console.log("true callback")
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
                    callback(false)
                } else {
                    dispatch(editSubmissionAction({
                        submission
                    }));
                    callback(true)
                }
            })
        } else {
            dispatch(editSubmissionAction({
                error: 'No notebook given'
            }));
        }
    }
}

/**
 * @function deleteSubmission
 * @description Makes an API request to flag the submission as deleted
 * @param {String} submissionID ID of the submission being deleted
 * @param {func} callback Function to call after the API request returns
 */
export const deleteSubmission = (submissionID, callback) => {
    console.log("Delete submission action")
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            //check if the submission is the user's
            console.log('index of submission: ', store.getState().auth.user.submissions.indexOf(submissionID))
            if (store.getState().auth.isAdmin || store.getState().auth.user.submissions.indexOf(submissionID) > -1) {
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

/**
 * @function fetchNBInfo
 * @description Makes an API request to get all data for the submission specified by the
 * notebookID
 * @param {Object} param0
 * @param {String} param0.notebookID ID of the notebook being requested
 * @param {bool} forced Flag to bypass the needToFetch check
 */
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

            dispatch(requestNBAction(notebookID))

            var nbJSONReqConfig = {
                onDownloadProgress: function (progressEvent) {
                    dispatch(nbProgressAction(progressEvent.loaded, progressEvent.total, notebookID))
                }
            }

            axios.get('/api/search/notebook_json/' + notebookID, nbJSONReqConfig).then(
                resp => {
                    dispatch(receiveNBAction({
                        notebookID,
                        json: resp.data.json
                    }))
                },
                err => {
                    console.log("[FetchNBJSON] - error fetching notebook json: ", err.response)

                    dispatch(receiveNBAction({
                        error: err,
                        notebookID
                    }))
                }
            )


        } else {
            console.log('[FetchSub] - don\'t need to fetch');
        }
    }
}

export const flagSubmission = ({
    submissionID,
    flaggedReason
}) => {
    console.log("[SubmissionActions] - flag submission: ", submissionID, flaggedReason)
    return (dispatch) => {
        axios.post("/api/flag/submission", {
            submissionID,
            flaggedReason
        }, {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                dispatch(flagSubmissionAction({
                    submissionID,
                    flaggedReason
                }))
            },
            err => {
                dispatch(flagSubmissionAction({
                    error: err
                }))
            }
        )
    }
}

export const flagComment = ({
    commentID,
    flaggedReason
}) => {
    console.log("[CommentActions] - flag comment: ", commentID, flaggedReason)
    return (dispatch) => {
        axios.post("/api/flag/comment", {
            commentID,
            flaggedReason
        }).then(
            resp => {
                dispatch(flagCommentAction({
                    commentID,
                    flaggedReason
                }))
            },
            err => {
                dispatch(flagCommentAction({
                    error: err
                }))
            }
        )
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
