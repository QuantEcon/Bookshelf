import {
    BEGIN_USER_AUTHENTICATION,
    END_USER_AUTHENTICATION
} from '../../actions/auth/signIn'

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

        default:
            return state;
    }
}

export default SignInReducer