import {
    BEGIN_USER_AUTHENTICATION,
    END_USER_AUTHENTICATION,
    STORE_CREDENTIALS
} from '../../actions/auth/signIn'
import {
    START_SIGN_OUT,
    END_SIGN_OUT
} from '../../actions/auth/signOut'

const SignInReducer = (state = {}, action) => {
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
                valid: action.error ? false : true,
                isSignedIn: action.error ? false : true
            })
        case STORE_CREDENTIALS:
            return Object.assign({}, state, {
                token: action.credentials.token,
                uid: action.credentials.uid
            })
        case START_SIGN_OUT:
            return Object.assign({}, state, {
                loading: true
            })
        case END_SIGN_OUT:
            return Object.assign({}, state, {
                token: null,
                uid: null,
                user: {},
                provider: null,
                error: null,
                valid: null,
                isSignedIn: false
            })
        default:
            return state;
    }
}

export default SignInReducer