import {combineReducers} from 'redux';
import SubmissionListReducer from './SubmissionList';
import SubmissionReducer from './Submission';
import UserReducer from './User'

const rootReducer = combineReducers({
    submissionList: SubmissionListReducer,
    submissionByID: SubmissionReducer,
    userByID: UserReducer
});

export default rootReducer;