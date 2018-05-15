import {
    REQUEST_ANNOUNCEMENTS,
    RECEIVE_ANNOUCEMENTS
} from '../actions/announcements'

const AnnoucnementsReducer = (announcements = {}, action) => {
    switch(action.type){
        case REQUEST_ANNOUNCEMENTS:
            return Object.assign({}, announcements, {
                isFetching: true
            })
        case RECEIVE_ANNOUCEMENTS:
            console.log('[RECIEVE_ANNOUNCEMENTS] - action: ', action)
            return Object.assign({}, announcements, {
                isFetching: false,
                announcements: action.announcements,
                error: action.error
            })

    }

    return Object.assign({}, announcements, )
}



export default AnnoucnementsReducer