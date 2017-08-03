import queryString from 'query-string';
// import {fetch as authFetch} from 'redux-auth'

export const REQUEST_SUBMISSION_PREVIEWS = 'REQUEST_SUBMISSION_PREVIEWS'
export function requestSubmissionPreviews(searchParams = {
    lang: 'All',
    time: 'All time',
    topic: 'All',
    author: '',
    keywords: '',
    page: 1,
    sortBy: 'Trending'
}) {
    return {
        type: REQUEST_SUBMISSION_PREVIEWS,
        searchParams
    }
}

export const RECEIVE_SUBMISSION_PREVIEWS = 'RECEIVE_SUBMISSION_PREVIEWS';
export function receiveSubmissionPreviews(searchParams, json) {
    return {
        type: RECEIVE_SUBMISSION_PREVIEWS,
        searchParams,
        submissionList: json.submissions,
        authors: json.authors,
        totalSubmissions: json.totalSubmissions,
        receivedAt: Date.now()
    }
}

export const INVALIDATE_SUBMISSION_LIST = 'INVALIDATE_SUBMISSION_LIST';
export function invalidateSubmissionList(searchParams) {
    return {
        type: INVALIDATE_SUBMISSION_LIST,
        searchParams
    }
}

//TODO: Dispatch on error action

export const fetchSubmissions = (searchParams = {}) => {
    var sp = Object.assign({}, {
        lang: 'All',
        time: 'All time',
        topic: 'All',
        author: '',
        keywords: '',
        page: 1,
        sortBy: 'Trending'
    }, searchParams)
    return function (dispatch) {
        dispatch(requestSubmissionPreviews(sp));
        var qs = queryString.stringify(sp);
        return fetch('/api/search/all-submissions/?' + qs).then(resp => resp.json(), error => console.log('An error occured: ', error)).then(json => {
            dispatch(receiveSubmissionPreviews(sp, json));
        });
    }
}

export const shouldFetchSummaries = (state, searchParams) => {
    if (!state.submissionList) {
        return true;
    } else if (state.isFetching) {
        return false;
    } else if (state.didInvalidate) {
        return true;
    }
}