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
    emailSettings,
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
            website,
            emailSettings
        }
    }
}

export const END_EDIT_PROFILE = 'END_EDIT_PROFILE';
export const endEditProfile = ({
    email,
    name,
    summary,
    website,
    emailSettings,
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
            oneSocial,
            emailSettings
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

// ==============================================================================================

/**
 * REDUX ACTION: Makes an API request call to remove the given social account from the user's account.
 * Then dispatches an action to modify the local chagnes in redux
 * 
 * @param {Object} data
 * @param {String} data.social - The name of the social account to remove. This can be "fb", "google", "github", or "twitter"
 */
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

/**
 * REDUX ACTION: Makes an API call to set the user's avatar picture to the provided social account's profile picture. A `SET_AVATAR_PICTURE` 
 * action is then dispatched to update the redux data
 * 
 * @param {Object} data
 * @param {Object} data.social - The name of the social account. This can be "fb", "google", "github", or "twitter". 
 */

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

/**
 * REDUX ACTION: Toggles the visibility to others of a user's social account. Makes an API call to toggle the visibility.
 * Then dispatches a `TOGGLE_SOCIAL` action to update the local redux data.
 * 
 * @param {Object} data
 * @param {String} data.social - The name of the social account to hide. This can be "fb", "google", "github", or "twitter".
 */

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

/**
 * REDUX ACTION: Dispatches a `BEGIN_EDIT_PROFILE` action to let redux know to wait for a response from the API. Then makes an API 
 * call to update the user's database document with the provided `data`. The API will return the updated information for the user
 * and an `END_EDIT_PROFILE` action is dispatched to update the local redux data.
 * 
 * @param {Object} data - The data to update the user's information.
 * @param {String} data.email - The user's email
 * @param {String} data.name - The user's name
 * @param {String} data.summary - The user's summary
 * @param {String} data.website - The url to the user's website. This is not the link to the user's page on Bookshelf. 
 * It is the user's own website they want to display a link to.
 */

export const editProfile = ({
    email,
    name,
    summary,
    website,
    emailSettings
}) => {
    return function (dispatch) {
        console.log('[AuthActions] edit profile data ', {
            email,
            name,
            summary,
            website,
            emailSettings
        })
        const state = store.getState();
        if (state.auth.isSignedIn) {
            dispatch(beginEditProfile({
                email,
                name,
                summary,
                website,
                emailSettings
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
                emailSettings
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
                        oneSocial: response.data.user.oneSocial,
                        emailSettings
                    }))
                }
            }).catch(error => {
                console.log('[AuthActions] - edit profile error: ', error);

            })
        }
    }
}

/**
 * This method takes in a SubmissionID and a Comment object and makes a POST request to the API. 
 * 
 * The request must have an Authorization header with the user's JWT in order for the request to be valid.
 * 
 * On success, the API will return the Comment object and the SubmissionID, and an action is dispatched with 
 * SubmissionID and Comment to updat the local redux data
 * 
 * On failure, the API will return an Error object with a message describing what went wrong, and no action is 
 * dispatched.
 * 
 * @param {Sting} submissionID - The ID of the submission being commented on
 * @param {Object} comment 
 */

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

