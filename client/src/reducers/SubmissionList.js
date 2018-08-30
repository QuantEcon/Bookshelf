import {
    REQUEST_SUBMISSION_PREVIEWS,
    RECEIVE_SUBMISSION_PREVIEWS,
    INVALIDATE_SUBMISSION_LIST,
    RESET_SEARCH_PARAMS
} from '../actions/submissionList';

const defaultSearchParams = {
    lang: 'All',
    time: 'All time',
    topic: 'All',
    author: '',
    keywords: '',
    page: 1,
    sortBy: 'Trending'
}

const SubmissionList = (state = {
    isFetching: false,
    didInvalidate: false,
    submissionByID: {},
    submissionList: {}
}, action) => {
    switch (action.type) {
        case INVALIDATE_SUBMISSION_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            });

        case REQUEST_SUBMISSION_PREVIEWS:
            // console.log('[Middleware] - State: ', state);
            // console.log('[Middleware] - Action: ', action);
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });

        case RESET_SEARCH_PARAMS: 
            return Object.assign({}, state, {
                searchParams: defaultSearchParams
            }) 
        case RECEIVE_SUBMISSION_PREVIEWS:
            // console.log('[Middleware] - State: ', state);
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                previews: action.submissionList,
                    searchParams: action.searchParams,
                    totalSubmissions: action.totalSubmissions,
                    authors: action.authors,
                lastUpdated: action.receivedAt
            });

        default:
            return state;
    }
}

const SubmissionListReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_SUBMISSION_PREVIEWS:
            return SubmissionList(state, action);
        case RECEIVE_SUBMISSION_PREVIEWS:
            return SubmissionList(state, action);
        case RESET_SEARCH_PARAMS:
            return SubmissionList(state, action)
        case INVALIDATE_SUBMISSION_LIST:
            break;
        default:
            return state;
    }
}

export default SubmissionListReducer;