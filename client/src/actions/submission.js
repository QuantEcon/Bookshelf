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
export function receiveNBInfo(notebookID, json) {
    // console.log('[Submission Actions] - receive nb info: ', json);
    return {
        type: RECEIVE_NB_INFO,
        notebookID,
        data: json,
        receivedAt: Date.now(),
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
export function downvoteCom(commentID) {
    return {
        type: DOWNVOTE_COMMENT,
        commentID
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
export function upvoteCom(commentID) {
    return {
        type: upvoteCom,
        commentID
    }
}

export const POST_COMMENT = 'POST_COMMENT'
export function postComment({submissionID, comment}) {
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

export const fetchNBInfo = (notebookID) => {
    return function (dispatch) {
        dispatch(requestNBInfo(notebookID));
        fetch('/api/search/notebook/' + notebookID).then(
            response => response.json(),
            error => {
                console.log('An error occured: ', error);
            }
        ).then(data => {
            dispatch(receiveNBInfo(notebookID, data));
        })
    }
}