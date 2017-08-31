import store from '../../store/store';
import * as SubmissionActions from '../submission';
import axios from 'axios'

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

export const editComment =({
    commentID,
    newCommentText
}) => {
    return function(dispatch){
        console.log('[EditComment]')
        axios.post('/api/submit/comment/edit', {
            commentID,
            newCommentText
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
            console.log('[AuthActions] - edit comment returned: ', resp);
        }).catch(err => {
    
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
