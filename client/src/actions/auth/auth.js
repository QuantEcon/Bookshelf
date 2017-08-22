import store from '../../store/store';
import * as SubmissionActions from '../submission';
import axios from 'axios'

// export const AUTH_POST_COMMENT = 'POST_COMMENT'
// function authPostComment({
//     submissionID,
//     comment
// }) {
//     return {
//         type: AUTH_POST_COMMENT,
//         submissionID,
//         comment
//     }
// }

export const AUTH_POST_REPLY = 'POST_REPLY'
export function authPostReply({
    submissionID,
    commentID,
    reply,
    error
}) {
    return {
        type: AUTH_POST_REPLY,
        submissionID,
        commentID,
        reply,
        error
    }
}
export const AUTH_REMOVE_UPVOTE = 'AUTH_REMOVE_UPVOTE'
export function removeUpvote(id) {
    return {
        type: AUTH_REMOVE_UPVOTE,
        id
    }
}

export const AUTH_ADD_UPVOTE = 'AUTH_ADD_UPVOTE'
export function addUpvote(id) {
    return {
        type: AUTH_ADD_UPVOTE,
        id
    }
}

export const AUTH_REMOVE_DOWNVOTE = 'AUTH_REMOVE_DOWNVOTE'
export function removeDownvote(id) {
    return {
        type: AUTH_REMOVE_DOWNVOTE,
        id
    }
}

export const AUTH_ADD_DOWNVOTE = 'AUTH_ADD_DOWNVOTE'
export function addDownvote(id) {
    return {
        type: AUTH_ADD_DOWNVOTE,
        id
    }
}

export const BEGIN_EDIT_PROFILE = 'BEGIN_EDIT_PROFILE';
export const beginEditProfile = ({
    email,
    name,
    summary,
    website,
    error
}) => {
    if (error) {
        return {
            type: BEGIN_EDIT_PROFILE,
            error
        }
    } else {
        return {
            type: BEGIN_EDIT_PROFILE,
            email,
            name,
            summary,
            website
        }
    }
}

export const END_EDIT_PROFILE = 'END_EDIT_PROFILE';
export const endEditProfile = ({
    email,
    name,
    summary,
    website,
    error,
    oneSocial
}) => {
    if (error) {
        return {
            type: END_EDIT_PROFILE,
            error
        }
    } else {
        return {
            type: END_EDIT_PROFILE,
            email,
            name,
            summary,
            website,
            oneSocial
        }
    }
}

export const TOGGLE_SOCIAL_HIDDEN = 'TOGGLE_SOCIAL_HIDDEN'
const toggleSocialHidden = ({
    social
}) => {
    return {
        type: TOGGLE_SOCIAL_HIDDEN,
        social
    }
}

export const SET_AVATAR_PICTURE = 'SET_AVATAR_PICTURE'
const setAvatarPicutre = ({
    social
}) => {
    return {
        type: SET_AVATAR_PICTURE,
        social
    }
}

export const REMOVE_SOCIAL = 'REMOVE_SOCIAL'
const removeSocial = ({
    social
}) => {
    return {
        type: REMOVE_SOCIAL,
        social
    }
}

export const removeSocialAccount = ({
    social
}) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/edit-profile/remove-social', {
                social
            }, {
                headers: {
                    'Authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(response => {
                if (response.data.error) {
                    dispatch(removeSocial({
                        error: response.data.message
                    }));
                } else {
                    dispatch(removeSocial({
                        social
                    }));
                }
            }).catch(error => {
                dispatch(removeSocial({
                    error
                }));
            })
        }
    }
}

export const setActiveAvatar = ({
    social
}) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/edit-profile/set-avatar', {
                social
            }, {
                headers: {
                    'Authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(response => {
                if (response.data.error) {
                    dispatch(setAvatarPicutre({
                        error: response.data.message
                    }));
                } else {
                    dispatch(setAvatarPicutre({
                        social
                    }));
                }
            }).catch(error => {
                dispatch(setAvatarPicutre({
                    error
                }));
            })
        }
    }
}

export const toggleSocial = ({
    social
}) => {
    return function (dispatch) {
        if (store.getState().auth.isSignedIn) {
            console.log('[AuthActions] - send toggle social request: ', social)
            axios.post('/api/edit-profile/toggle-social', {
                social
            }, {
                headers: {
                    'Authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(response => {
                if (response.data.error) {
                    dispatch(toggleSocialHidden({
                        error: response.data.message
                    }));
                } else {
                    dispatch(toggleSocialHidden({
                        social
                    }));
                }
            }).catch(error => {
                dispatch(toggleSocialHidden({
                    error
                }));
            })
        }
    }
}

export const editProfile = ({
    email,
    name,
    summary,
    website
}) => {
    return function (dispatch) {
        console.log('[AuthActions] edit profile data ', {
            email,
            name,
            summary,
            website
        })
        const state = store.getState();
        if (state.auth.isSignedIn) {
            dispatch(beginEditProfile({
                email,
                name,
                summary,
                website,
            }));
            axios.post('/api/edit-profile/', {
                email,
                name,
                summary,
                website,
                fb: state.auth.user.fb,
                google: state.auth.user.google,
                github: state.auth.user.github,
                twitter: state.auth.user.twitter,

            }, {
                headers: {
                    'Authorization': 'JWT ' + store.getState().auth.token
                }
            }).then(response => {
                if (response.data.error) {
                    console.log('[AuthActions] - edit profile. server returned error: ', response.data.message);
                    dispatch(endEditProfile({
                        error: response.data.message
                    }))
                } else {
                    dispatch(endEditProfile({
                        email: response.data.user.email,
                        name: response.data.user.name,
                        summary: response.data.user.summary,
                        website: response.data.user.website,
                        oneSocial: response.data.user.oneSocial
                    }))
                }
            }).catch(error => {
                console.log('[AuthActions] - edit profile error: ', error);

            })
        }
    }
}

export const upvoteSubmission = ({
    submissionID
}) => {
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
                console.log('[AuthActions] - upvote submission response: ', response);
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

export const downvoteSubmission = ({
    submissionID
}) => {
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
                    dispatch(SubmissionActions.upvoteSub(submissionID))
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

export const downvoteComment = ({
    submissionID,
    commentID
}) => {
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
                    dispatch(SubmissionActions.upvoteCom({
                            commentID,
                            submissionID
                        }) //has already upvoted
                    );
                } else if (currentUser.upvotes.indexOf(commentID) > -1) {
                    dispatch(removeUpvote(commentID));
                    dispatch(addDownvote(commentID));
                    dispatch(SubmissionActions.downvoteCom({
                        commentID,
                        submissionID
                    }));
                    dispatch(SubmissionActions.downvoteCom({
                            commentID,
                            submissionID
                        }) //hasn't upvoted or downvoted
                    );
                } else {
                    dispatch(addDownvote(commentID));
                    dispatch(SubmissionActions.downvoteCom({
                        commentID,
                        submissionID
                    }));
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

export const upvoteComment = ({
    submissionID,
    commentID
}) => {
    return function (dispatch) {
        console.log('[AuthActions] - upvote comment')
        if (store.getState().auth.isSignedIn) {
            axios.post('/api/upvote/comment', {
                commentID,
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
                    console.log('[AuthActions] - Server returned error upvoting comment: ', response.data.message);
                }
                const currentUser = store
                    .getState()
                    .auth
                    .user;
                if (currentUser.upvotes.indexOf(commentID) > -1) {
                    console.log('[AuthActions] - already upvoted comment')
                    dispatch(removeUpvote(commentID));
                    dispatch(SubmissionActions.downvoteCom({
                        commentID,
                        submissionID
                    }));
                } else if (currentUser.downvotes.indexOf(commentID) > -1) {
                    dispatch(removeDownvote(commentID));
                    dispatch(addUpvote(commentID));
                    dispatch(SubmissionActions.upvoteCom({
                        commentID,
                        submissionID
                    }));
                    dispatch(SubmissionActions.upvoteCom({
                        commentID,
                        submissionID
                    }));
                } else {
                    dispatch(addUpvote(commentID));
                    dispatch(SubmissionActions.upvoteCom({
                        commentID,
                        submissionID
                    }));
                }
            }).catch(error => {
                console.log('[AuthActions] - error upvoting comment: ', error);;
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
            // dispatch(authPostComment({
            //     submissionID: response.data.submissionID,
            //     comment: response.data.comment
            // }));
            console.log('dispatch submission actions post comment');
            dispatch(SubmissionActions.postComment({
                submissionID: response.data.submissionID,
                comment: response.data.comment
            }))
        }).catch(error => {
            console.log('[AuthActions] - error submitting comment: ', error);
        })
    }
}

export const submitReply = ({
    submissionID,
    commentID,
    reply
}) => {
    return function (dispatch) {

        axios.post('/api/submit/reply/', {
            submissionID,
            commentID,
            reply
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
            console.log('[AuthActions] - submit reply response: ', resp);
            if (resp.data.error) {
                console.log('[AuthActions] - submit reply error in response: ', resp.data.error);
                dispatch(authPostReply({
                    error: resp.data.error
                }))
            } else {
                dispatch(authPostReply({
                    submissionID: resp.data.submissionID,
                    commentID: resp.data.commentID,
                    reply: resp.data.reply
                }))
            }
        }).catch(error => {
            dispatch(authPostReply({
                error
            }))
        })
    }
}