export const REQUEST_NB_INFO = 'REQUEST_NB_INFO';
export function requestNBInfo(notebookID = null) {
    // console.log('[Submission Actions] - request nb info: ', notebookID);
    return {
        type: REQUEST_NB_INFO,
        notebookID
    }
}

export const RECEIVE_NB_INFO = 'RECEIVE_NB_INFO';
export function receiveNBInfo(notebookID, json){
    // console.log('[Submission Actions] - receive nb info: ', json);
    return {
        type: RECEIVE_NB_INFO,
        notebookID,
        data: json,
        receivedAt: Date.now(),
    }
}

export const INVALIDATE_NB_INFO = 'INVALIDATE_NB_INFO';
export function invalidateNBInfo(notebookID){
    return {
        type: INVALIDATE_NB_INFO,
        notebookID
    }
}

export const fetchNBInfo = (notebookID) => {
    return function(dispatch){
        dispatch(requestNBInfo(notebookID));
        fetch('/api/search/notebook/' + notebookID).then(
            response => response.json(),
            error => {
                console.log('An error occured: ', error);
            }
        ).then(data => {
            dispatch(receiveNBInfo(notebookID, data));
        })
    }
}