import {
    BEGIN_USER_AUTHENTICATION,
    END_USER_AUTHENTICATION
} from '../../actions/auth/signIn'
import {
    START_SIGN_OUT,
    END_SIGN_OUT
} from '../../actions/auth/signOut'
import {
    BEGIN_SUBMIT,
    ADD_CURRENT_SUBMISSION,
    END_SUBMIT,
    CONFIRM_SUBMIT,
    CANCEL_SUBMIT
} from '../../actions/submit';
import {
    AUTH_POST_COMMENT,
    AUTH_POST_REPLY,
    AUTH_REMOVE_UPVOTE,
    AUTH_ADD_UPVOTE,
    AUTH_REMOVE_DOWNVOTE,
    AUTH_ADD_DOWNVOTE
} from '../../actions/auth/auth'

var REMOVE_CURRENT_SUBMISSION = 'REMOVE_CURRENT_SUBMISSION'

const UserReducer = (user = {}, action) => {
    switch (action.type) {
        case AUTH_REMOVE_UPVOTE:
            const indexUp = user
                .upvotes
                .indexOf(action.id);
            if (indexUp > -1) {
                var newUpvotes = JSON.parse(JSON.stringify(user.upvotes))
                newUpvotes.splice(indexUp, 1)
                return Object.assign({}, user, {
                    upvotes: newUpvotes
                })
            } else {
                return user
            }

        case AUTH_ADD_UPVOTE:
            return Object.assign({}, user, {
                upvotes: [
                    ...user.upvotes,
                    action.id
                ]
            })

        case AUTH_REMOVE_DOWNVOTE:
            const indexDown = user
                .downvotes
                .indexOf(action.id);
            if (indexDown > -1) {
                var newDownvotes = JSON.parse(JSON.stringify(user.downvotes))
                newDownvotes.splice(indexDown, 1)
                return Object.assign({}, user, {
                    downvotes: newDownvotes
                })
            } else {
                return user
            }

        case AUTH_ADD_DOWNVOTE:
            return Object.assign({}, user, {
                downvotes: [
                    ...user.downvotes,
                    action.id
                ]
            })

        case BEGIN_SUBMIT:
            return Object.assign({}, user, {
                currentSubmission: {
                    ...user.currentSubmission,
                    isLoading: true
                }
            })
        case END_SUBMIT:
            console.log('[AuthActions] - end submit: ', action);
            return Object.assign({}, user, {
                currentSubmission: {
                    ...user.currentSubmission,
                    isLoading: false
                }
            })
        case ADD_CURRENT_SUBMISSION:
            console.log('[AuthActions] - add current submission: ', action);
            if (action.error) {
                return user
            }
            return Object.assign({}, user, {
                currentSubmission: Object.assign({}, user.currentSubmission, action.submission, {
                    isLoading: false,
                })
            })
        case REMOVE_CURRENT_SUBMISSION:
            if (action.error) {
                return user
            }
            return Object.assign({}, user, {
                currentSubmission: null
            })
        case CONFIRM_SUBMIT:
            if(action.error){
                return user
            }
            return Object.assign({}, user, {
                currentSubmission: null,
                //add to submissions
                submissions: [
                    ...user.submissions,
                    action.id
                ]
            })    
        case CANCEL_SUBMIT:
            if(action.error){
                return user
            }
            return Object.assign({}, user, {
                currentSubmission: null
            })

        default:
            return user;
    }
}

const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case BEGIN_USER_AUTHENTICATION:
            return Object.assign({}, state, {
                loading: true,
                provider: action.provider
            })
        case END_USER_AUTHENTICATION:
            return Object.assign({}, state, {
                loading: false,
                user: action.user,
                error: action.error,
                token: action.token,
                valid: action.error ?
                    false :
                    true,
                isSignedIn: action.error ?
                    false :
                    true
            })
        case START_SIGN_OUT:
            return Object.assign({}, state, {
                loading: true
            })
        case END_SIGN_OUT:
            return Object.assign({}, state, {
                loading: false,
                token: null,
                uid: null,
                user: {},
                provider: null,
                error: null,
                valid: null,
                isSignedIn: false
            })

        case BEGIN_SUBMIT:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case END_SUBMIT: 
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })

        case AUTH_POST_COMMENT:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case AUTH_POST_REPLY:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case AUTH_REMOVE_UPVOTE:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case AUTH_ADD_UPVOTE:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case AUTH_REMOVE_DOWNVOTE:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case AUTH_ADD_DOWNVOTE:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case ADD_CURRENT_SUBMISSION:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case CONFIRM_SUBMIT:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        case CANCEL_SUBMIT:
            return Object.assign({}, state, {
                user: UserReducer(state.user, action)
            })
        default:
            return state;
    }
}

export default AuthReducer