import store from '../../store/store'
import axios from 'axios'
import * as SubmissionActions from '../submission'

// DISPATCH =============================================================
export const AUTH_ADD_DOWNVOTE = 'AUTH_ADD_DOWNVOTE'
const addDownvote = (id) => {
    return {
        type: AUTH_ADD_DOWNVOTE,
        id
    }
}

export const AUTH_ADD_UPVOTE = 'AUTH_ADD_UPVOTE'
const addUpvote = (id) => {
    return {
        type: AUTH_ADD_UPVOTE,
        id
    }
}

export const AUTH_REMOVE_DOWNVOTE = 'AUTH_REMOVE_DOWNVOTE'
const removeDownvote = (id) => {
    return {
        type: AUTH_REMOVE_DOWNVOTE,
        id
    }
}

export const AUTH_REMOVE_UPVOTE = 'AUTH_REMOVE_UPVOTE'
const removeUpvote = (id) => {
    return {
        type: AUTH_REMOVE_UPVOTE,
        id
    }
}
// SUBMISSIONS ==========================================================

/*
 * PARAMETERS: 
 *   submissionID: the id of the submission being downvoted
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this submission and acts accordingly
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed and downvoted added
 *      The submission's score will also be reduced by 2
 *  If the user has alredy downvoted:
 *      The downvote will be removed
 *      The submission's score will be incremented by 1
 *  If the user has neither upvoted nor downvoted:
 *      The downvote will be added
 *      The submission's score will be decremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the submission are reversed
 * RETURN:
 *  None
 */
export const downvoteSubmission = ({
    submissionID
}) => {
    console.log('[VoteActions] - downvote submission: ', submissionID);
    return function (dispatch) {
        // already downvoted
        if (store.getState().auth.isSignedIn) {
            const user = store.getState().auth.user;

            if (didDownvote({
                    user,
                    id: submissionID
                })) {
                //remove downvote
                dispatch(removeDownvote(submissionID));
                //upvote submission use SubmissionActions
                dispatch(SubmissionActions.upvoteSub(submissionID));

                axios.post('/api/downvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(addDownvote(submissionID));
                        dispatch(SubmissionActions.downvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting submission: ', err);
                })
            }
            // already upvoted
            else if (didUpvote({
                    user,
                    id: submissionID
                })) {
                // swap upvote and downvote
                dispatch(removeUpvote(submissionID))
                dispatch(addDownvote(submissionID));
                dispatch(SubmissionActions.downvoteSub(submissionID));
                dispatch(SubmissionActions.downvoteSub(submissionID));
                axios.post('/api/downvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(removeDownvote(submissionID));
                        dispatch(addUpvote(submissionID));
                        dispatch(SubmissionActions.upvoteSub(submissionID));
                        dispatch(SubmissionActions.upvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting submission: ', err);
                })

            }
            // neither upvoted nor downvoted
            else {
                dispatch(addDownvote(submissionID))
                dispatch(SubmissionActions.downvoteSub(submissionID));
                axios.post('/api/downvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(removeDownvote(submissionID));
                        dispatch(SubmissionActions.upvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting submission: ', err);
                })
            }
        } else {
            console.log('[VoteActions] - user is not signed in');
        }
    }
}

/*
 * PARAMETERS: 
 *   submissionID: the id of the submission being upvoted
 * 
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this submission and acts accordingly:
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed
 *      The submission's score will be decremented by 1
 *  If the user has alredy downvoted:
 *      The downvote will be removed and the upvote added
 *      The submission's score will be incremented by 2
 *  If the user has neither upvoted nor downvoted:
 *      The upvote will be added
 *      The submission's score will be incremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the submission are reversed
 * 
 * RETURN:
 *  None
 */
export const upvoteSubmission = ({
    submissionID
}) => {
    console.log('[VoteActions] - upvote submissions: ', submissionID)
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            const user = store.getState().auth.user;
            if (didUpvote({
                    user,
                    id: submissionID
                })) {
                dispatch(removeUpvote(submissionID));
                dispatch(SubmissionActions.downvoteSub(submissionID));
                axios.post('/api/upvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(addUpvote(submissionID));
                        dispatch(SubmissionActions.upvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred while upvoting submission: ', err);
                })

            } else if (didDownvote({
                    user,
                    id: submissionID
                })) {
                dispatch(removeDownvote(submissionID));
                dispatch(addUpvote(submissionID));
                dispatch(SubmissionActions.upvoteSub(submissionID));
                dispatch(SubmissionActions.upvoteSub(submissionID));

                axios.post('/api/upvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(addDownvote(submissionID));
                        dispatch(removeUpvote(submissionID));
                        dispatch(SubmissionActions.downvoteSub(submissionID));
                        dispatch(SubmissionActions.downvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred while upvoting submission: ', err);
                })

            } else {
                dispatch(addUpvote(submissionID));
                dispatch(SubmissionActions.upvoteSub(submissionID));
                axios.post('/api/upvote/submission', {
                    submissionID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if (resp.error) {
                        dispatch(removeUpvote(submissionID));
                        dispatch(SubmissionActions.downvoteSub(submissionID));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred while upvoting submission: ', err);
                })
            }
        } else {
            console.log('[VoteActions] - user is not signed in');
        }
    }


}
// COMMENTS =============================================================

/*
 * PARAMETERS: 
 *   submissionID: the id of the submission the comment belongs to
 *   commentID: the id of the comment being downvoted
 * 
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this comment and acts accordingly
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed and downvoted added
 *      The comment's score will also be reduced by 2
 *  If the user has alredy downvoted:
 *      The downvote will be removed
 *      The comment's score will be incremented by 1
 *  If the user has neither upvoted nor downvoted:
 *      The downvote will be added
 *      The comment's score will be decremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the comment are reversed
 * 
 * RETURN:
 *  None
 */
export const downvoteComment = ({
    submissionID,
    commentID
}) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            const user = store.getState().auth.user;
            if (didDownvote({
                    user,
                    id: commentID
                })) {
                dispatch(removeDownvote(commentID));
                dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));

                axios.post('/api/downvote/comment', {
                    commentID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState()
                    }
                }).then(resp => {
                    dispatch(addDownvote(commentID));
                    dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                    //TODO: dispatch vote error
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting comment: ', err);
                })
            } else if (didUpvote({
                    user,
                    id: commentID
                })) {
                dispatch(removeUpvote(commentID));
                dispatch(addDownvote(commentID));
                dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                
                axios.post('/api/downvote/comment', {
                    commentID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState()
                    }
                }).then(resp => {
                    dispatch(addUpvote(commentID));
                    dispatch(removeDownvote(commentID));
                    dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));
                    //TODO: dispatch vote error
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting comment: ', err);
                })

            } else {
                dispatch(addDownvote(commentID));
                dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                axios.post('/api/downvote/comment', {
                    commentID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState()
                    }
                }).then(resp => {
                    dispatch(removeDownvote(commentID));
                    dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));
                    //TODO: dispatch vote error
                }).catch(err => {
                    console.error('[VoteActions] - error ocurred downvoting comment: ', err);
                })

            }
        } else {
            console.log('[VoteActions] - user is not signed in');
        }
    }

}

/*
 * PARAMETERS: 
 *   replyID: the id of the reply being downvoted
 *   submissionID: the id of the submission the comment belongs to
 *   commentID: the id of the comment the reply belongs to
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this reply and acts accordingly
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed and downvoted added
 *      The reply's score will also be reduced by 2
 *  If the user has alredy downvoted:
 *      The downvote will be removed
 *      The reply's score will be incremented by 1
 *  If the user has neither upvoted nor downvoted:
 *      The downvote will be added
 *      The reply's score will be decremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the reply are reversed
 * RETURN:
 *  None
 */
export const downvoteReply = ({
    commentID,
    replyID,
    submissionID
}) => {
    return (dispatch) => {
        console.log('[AuthActions] - downvote reply: ', commentID, replyID, submissionID);
    }
}

/*
 * PARAMETERS: 
 *   submissionID: the id of the submission the comment belongs to
 *   commentID: the id of the comment being upvoted
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this comment and acts accordingly:
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed
 *      The comment's score will be decremented by 1
 *  If the user has alredy downvoted:
 *      The downvote will be removed and the upvote added
 *      The comment's score will be incremented by 2
 *  If the user has neither upvoted nor downvoted:
 *      The upvote will be added
 *      The comment's score will be incremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the comment are reversed
 * RETURN:
 *  None
 */
export const upvoteComment = ({
    submissionID,
    commentID
}) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            const user = store.getState().auth.user
            if (didUpvote({
                    user,
                    id: commentID
                })) {
                dispatch(removeUpvote(commentID));
                dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                axios.post('/api/upvote/comment', {
                    commentID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if(resp.error){
                        dispatch(addUpvote(commentID));
                        dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error occurred upvoting comment: ', err);
                })
            } else if (didDownvote({
                    user,
                    id: commentID
                })) {
                dispatch(removeDownvote(commentID));
                dispatch(addUpvote(commentID));
                dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));
                dispatch(SubmissionActions.upvoteCom({commentID, submissionID}));
                axios.post('/api/upvote/comment', {
                    commentID
                }, {
                    headers: {
                        'Authorization': 'JWT ' + store.getState().auth.token
                    }
                }).then(resp => {
                    if(resp.error){
                        dispatch(removeUpvote(commentID));
                        dispatch(addDownvote(commentID));
                        dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                        dispatch(SubmissionActions.downvoteCom({commentID, submissionID}))
                        //TODO: dispatch vote error
                    }
                }).catch(err => {
                    console.error('[VoteActions] - error occurred upvoting comment: ', err);
                })
            } else {

            }
        } else {
            console.log('[VoteActions] - user is not signed in');
        }
    }
}

/*
 * PARAMETERS: 
 *   commentID: the id of the comment the reply belongs to
 *   replyID: the id of the reply to be upvoted
 *   submissionID: the id of the submission that the comment belongs to
 * METHOD:
 *  This method first checks if the user has already downvoted or upvoted
 * this reply and acts accordingly:
 * 
 *  If the user has already upvoted:
 *      The upvote will be removed
 *      The reply's score will be decremented by 1
 *  If the user has alredy downvoted:
 *      The downvote will be removed and the upvote added
 *      The reply's score will be incremented by 2
 *  If the user has neither upvoted nor downvoted:
 *      The upvote will be added
 *      The reply's score will be incremented by 1
 * 
 *  The method then makes an http request to the API. If the API returns an error
 * the changes to the reply are reversed
 * RETURN:
 *  None
 */
export const upvoteReply = ({
    commentID,
    replyID,
    submissionID
}) => {
    return (dipatch) => {
        console.log('[AuthActions] - upvote reply: ', commentID, replyID, submissionID);
    }
}

// HELPER FUNCTIONS =====================================================
/*
 *   Returns true if the user has alread downvoted item with the id
 */
const didDownvote = ({
    user,
    id
}) => {
    return user.downvotes.indexOf(id) > -1
}

/*
 *   Returns true if the user has alread upvoted item with the id
 */
const didUpvote = ({
    user,
    id
}) => {
    return user.upvotes.indexOf(id) > -1
}