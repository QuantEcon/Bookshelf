import store from '../../store/store';
import * as SubmissionActions from '../submission';
import axios from 'axios'
export const AUTH_POST_COMMENT = 'POST_COMMENT'
export function postComment({submissionID, comment}) {
    return {type: AUTH_POST_COMMENT, submissionID, comment}
}

export const AUTH_POST_REPLY = 'POST_REPLY'
export function postReply(submissionID, commentID, reply) {
    return {type: AUTH_POST_REPLY, submissionID, commentID, reply}
}
export const AUTH_REMOVE_UPVOTE = 'AUTH_REMOVE_UPVOTE'
export function removeUpvote(id) {
    return {type: AUTH_REMOVE_UPVOTE, id}
}

export const AUTH_ADD_UPVOTE = 'AUTH_ADD_UPVOTE'
export function addUpvote(id) {
    return {type: AUTH_ADD_UPVOTE, id}
}

export const AUTH_REMOVE_DOWNVOTE = 'AUTH_REMOVE_DOWNVOTE'
export function removeDownvote(id) {
    return {type: AUTH_REMOVE_DOWNVOTE, id}
}

export const AUTH_ADD_DOWNVOTE = 'AUTH_ADD_DOWNVOTE'
export function addDownvote(id) {
    return {type: AUTH_ADD_DOWNVOTE, id}
}

export const upvoteSubmission = ({submissionID}) => {
    console.log('[AuthActions] - upvote submission : ', submissionID)
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/upvote/submission', {
                submissionID
            }, {
                headers: {
                    'Authorization': 'JWT ' + store
                        .getState()
                        .auth
                        .token
                }
            }).then(response => {
                if (response.data.error) {
                    console.log('[AuthActions] - error upvote submission: ', response.data.message);
                }
                const currentUser = store
                    .getState()
                    .auth
                    .user;
                if (currentUser.upvotes.indexOf(submissionID) > -1) {
                    //TODO: remove from upvotes
                    dispatch(removeUpvote(submissionID));
                    dispatch(SubmissionActions.downvoteSub(submissionID) //has already downvoted
                    )
                } else if (currentUser.downvotes.indexOf(submissionID) > -1) {
                    //TODO: remove from downvotes
                    dispatch(removeDownvote(submissionID))
                    dispatch(addUpvote(submissionID))
                    dispatch(SubmissionActions.upvoteSub(submissionID))
                    dispatch(SubmissionActions.upvoteSub(submissionID) //hasn't downvoted or upvoted
                    )
                } else {
                    dispatch(addUpvote(submissionID))
                    dispatch(SubmissionActions.upvoteSub(submissionID))
                }
            }).catch(error => {
                console.log('[AuthActions] - error upvoting submission: ', error);
            })
        } else {
            //TODO: what to do if not authenticated?
            console.log('not signed in')
        }
    }
}

export const downvoteSubmission = ({submissionID}) => {
    console.log('[AuthActions] - downvote submission : ', submissionID)
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/downvote/submission', {
                submissionID
            }, {
                headers: {
                    'Authorization': 'JWT ' + store
                        .getState()
                        .auth
                        .token
                }
            }).then(response => {
                if (response.data.error) {
                    console.log('[AuthActions] - error downvote submission: ', response.data.message);
                    return;
                }
                const currentUser = store
                    .getState()
                    .auth
                    .user;
                if (currentUser.downvotes.indexOf(submissionID) > -1) {
                    //TODO: remove from downvotes
                    console.log('[AuthActions] - has already downvoted');
                    dispatch(removeDownvote(submissionID));
                    dispatch(SubmissionActions.upvoteSub(submissionID) //has already upvoted
                    )
                } else if (currentUser.upvotes.indexOf(submissionID) > -1) {
                    //TODO: remove from upvotes
                    console.log('[AuthActions] - has already upvoted')
                    dispatch(removeUpvote(submissionID))
                    dispatch(addDownvote(submissionID))
                    dispatch(SubmissionActions.downvoteSub(submissionID))
                    dispatch(SubmissionActions.downvoteSub(submissionID) //hasn't downvoted or upvoted
                    )
                } else {
                    dispatch(addDownvote(submissionID))
                    dispatch(SubmissionActions.downvoteSub(submissionID))
                }
            }).catch(error => {
                console.log('[AuthActions] - error downvoting submission: ', error);
            })

        } else {
            //TODO: what to do if not authenticated?
            console.log('not signed in')
        }
    }
}

export const downvoteComment = (commentID) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/downvote/comment', {
                commentID
            }, {
                headers: {
                    'Authorization': 'JWT ' + store
                        .getState()
                        .auth
                        .token
                }
            }).then(response => {
                if (response.data.error) {
                    console.log('[AuthActions] - server returned error downvoting comment: ', response.data.message)
                    return;
                }
                const currentUser = store
                    .getState()
                    .auth
                    .user;
                if (currentUser.downvotes.indexOf(commentID) > -1) {
                    dispatch(removeDownvote(commentID));
                    dispatch(SubmissionActions.upvoteCom(commentID) //has already upvoted
                    );
                } else if (currentUser.upvotes.indexOf(commentID) > -1) {
                    dispatch(removeUpvote(commentID));
                    dispatch(addDownvote(commentID));
                    dispatch(SubmissionActions.downvoteCom(commentID));
                    dispatch(SubmissionActions.downvoteCom(commentID) //hasn't upvoted or downvoted
                    );
                } else {
                    dispatch(addDownvote(commentID));
                    dispatch(SubmissionActions.downvoteCom(commentID));
                }
            }).catch(error => {
                console.log('[AuthActions] - error downvoting comment: ', error);
            })
        } else {
            //TODO: what to do if not authenticated?
            console.log('not signed in')
        }
    }
}

export const upvoteComment = (commentID) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/upvote/comment', {
                commentID
            }, {
                headers: {
                    'Authorization': 'JWT ' + store
                        .getState()
                        .auth
                        .token
                }
            }).then(response => {
                if (response.data.error) {
                    console.log('[AuthActions] - Server returned error upvoting comment: ', response.data.message);
                }
                const currentUser = store
                    .getState()
                    .auth
                    .user;
                if (currentUser.upvotes.indexOf(commentID) > -1) {
                    dispatch(removeUpvote(commentID));
                    dispatch(SubmissionActions.downvoteCom(commentID) //has already downvoted
                    );
                } else if (currentUser.downvotes.indexOf(commentID) > -1) {
                    dispatch(removeDownvote(commentID));
                    dispatch(addUpvote(commentID));
                    dispatch(SubmissionActions.upvoteCom(commentID));
                    dispatch(SubmissionActions.upvoteCom(commentID) //hasn't upvoted or downvoted
                    );
                } else {
                    dispatch(addUpvote(commentID));
                    dispatch(SubmissionActions.upvoteCom(commentID));
                }
            }).catch(error => {
                console.log('[AuthActions] - error upvoting comment');
            })
        } else {
            //TODO: what to do if not authenticated?
            console.log('not signed in')
        }
    }
}

export const submitComment = (submissionID, comment) => {
    return function (dispatch) {
        axios.post('/api/submit/comment/', {
            submissionID: submissionID,
            content: comment
        }, {
            headers: {
                'Authorization': 'JWT ' + store
                    .getState()
                    .auth
                    .token
            }
        }).then(response => {
            console.log('[AuthActions] - submit comment reponse: ', response);
            if (response.data.error) {
                console.log('[AuthActions] - Server returned error submitting comment: ', response.data.error);
            }
            dispatch(postComment({submissionID: response.data.submissionID, comment: response.data.comment}));
            console.log('dispatch submission actions post comment');
            dispatch(SubmissionActions.postComment({submissionID: response.data.submissionID, comment: response.data.comment}))
        }).catch(error => {
            console.log('[AuthActions] - error submitting comment: ', error);
        })
    }
}

export const submitReply = (submissionID, commentID, reply) => {
    return function (dispatch) {
        //TODO: fetch post reply
        fetch('/api/submit/comment/' + submissionID, {
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + store
                    .getState()
                    .auth
                    .token,
                'content-type': 'application/json'

            },
            body: {
                submissionID,
                commentID,
                reply
            }
        }).then(resp => {
            return resp.json()
        }, error => {
            console.log("Error submitting reply:", error);
        }).then(response => {
            console.log('Submit reply successful: ', response);
            dispatch(postReply({submissionID: response.body.submissionID, commentID: response.body.commentID, reply: response.body.reply}))
            dispatch(SubmissionActions.postReply({submissionID: response.body.submissionID, commentID: response.body.commentID, reply: response.body.reply}))
        })
    }
}