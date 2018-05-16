import {
    REQUEST_ANNOUNCEMENTS,
    RECEIVE_ANNOUCEMENTS,
    ADD_ANNOUNCEMENT
} from '../actions/announcements'

const AnnoucnementsReducer = (announcements = {}, action) => {
    switch(action.type){
        case REQUEST_ANNOUNCEMENTS:
            return Object.assign({}, announcements, {
                isFetching: true
            })
        case RECEIVE_ANNOUCEMENTS:
            return Object.assign({}, announcements, {
                isFetching: false,
                announcements: action.announcements,
                error: action.error
            })
        case ADD_ANNOUNCEMENT:
            if(action.error){
                console.warn('[AnnouncementsReducers] - api returned error: ', action.error)
            }

            return Object.assign({}, announcements, {
                // For now, just replace the array
                announcements: [action.announcement],
                error: action.error
            })
        default:
            return announcements

    }
}



export default AnnoucnementsReducer