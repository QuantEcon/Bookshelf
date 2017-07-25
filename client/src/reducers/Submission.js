import {
    REQUEST_NB_INFO,
    RECEIVE_NB_INFO
} from '../actions/submission';

const SubmissionReducer = (state = {}, action) => {

    switch (action.type) {
        case REQUEST_NB_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                [action.notebookID]: {
                    isFetching: true,
                    didInvalidate: false
                }

            });
        case RECEIVE_NB_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                [action.notebookID]: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                    data: action.data
                }
            })
        default:
            return state;
    }
}

export default SubmissionReducer