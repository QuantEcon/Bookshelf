import {combineReducers} from 'redux';
import SubmissionListReducer from './SubmissionList';
import SubmissionReducer from './Submission';
import UserReducer from './User'
import {authStateReducer} from 'redux-auth';

const rootReducer = combineReducers({
    submissionList: SubmissionListReducer,
    submissionByID: SubmissionReducer,
    userByID: UserReducer,
    auth: authStateReducer
});

export default rootReducer;