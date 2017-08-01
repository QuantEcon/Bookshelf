import {combineReducers} from 'redux';
import SubmissionListReducer from './SubmissionList';
import SubmissionReducer from './Submission';
import UserReducer from './User'
// import {authStateReducer} from 'redux-auth';
import SignInReducer from './auth/SignInReducer'

const rootReducer = combineReducers({
    submissionList: SubmissionListReducer,
    submissionByID: SubmissionReducer,
    userByID: UserReducer,
    auth: SignInReducer
});

export default rootReducer;