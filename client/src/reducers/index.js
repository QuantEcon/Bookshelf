import {combineReducers} from 'redux';
import SubmissionListReducer from './SubmissionList';
import SubmissionReducer from './Submission';
import UserReducer from './User'
// import {authStateReducer} from 'redux-auth';
import AuthReducer from './auth/AuthReducer'

const rootReducer = combineReducers({
    submissionList: SubmissionListReducer,
    submissionByID: SubmissionReducer,
    userByID: UserReducer,
    auth: AuthReducer
});

export default rootReducer;