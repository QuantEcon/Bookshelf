export const REQUEST_NB_INFO = 'REQUEST_NB_INFO';

export function requestNBInfo(notebookID = null) {
    return {
        type: REQUEST_NB_INFO,
        notebookID
    }
}