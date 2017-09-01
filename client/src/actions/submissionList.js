import queryString from 'query-string';
import store from '../store/store'
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
        receivedAt: new Date()
    }
}

export const INVALIDATE_SUBMISSION_LIST = 'INVALIDATE_SUBMISSION_LIST';
export function invalidateSubmissionList() {
    return {
        type: INVALIDATE_SUBMISSION_LIST,
        
    }
}

//TODO: Dispatch on error action

export const fetchSubmissions = ({searchParams, forced}) => {
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
        if (shouldFetchSummaries(store.getState(), sp) || forced) {
            dispatch(requestSubmissionPreviews(sp));
            var qs = queryString.stringify(sp);
            return fetch('/api/search/all-submissions/?' + qs).then(resp => resp.json(), error => console.log('An error occured: ', error)).then(json => {
                dispatch(receiveSubmissionPreviews(sp, json));
            });
        } else {
            console.log('[FetchSubmissions] - don\'t need to fetch');
        }
    }
}

export const shouldFetchSummaries = (state, searchParams) => {
    return true;
    if (!state.submissionList) {
        console.log('[ShouldFetch] - !state.submissionList')
        return true;
    } else if (state.isFetching) {
        console.log('[ShouldFetch] - state.isFetching')
        return false;
    } else if (state.didInvalidate) {
        console.log('[ShouldFetch] - state.didInvalidate')
        return true;
    } else if(JSON.stringify(searchParams) !== JSON.stringify(state.submissionList.searchParams)){
        console.log('[ShouldFetch] - search params not equal: ');
        return true
    } else if(new Date() > new Date(state.submissionList.lastUpdated.getTime() + 5*60000)){
        console.log('[ShouldFetch] - time expired');
        return true;
    } else {
        var expiresAt = new Date(state.submissionList.lastUpdated.getTime() + 5*60000);
        console.log('[ShouldFetch] - expires at: ', expiresAt.getHours() + ':'+ expiresAt.getMinutes());
        return false;
    }
}