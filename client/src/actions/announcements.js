import Axios from "axios";

export const REQUEST_ANNOUNCEMENTS = 'REQUEST_ANNOUNCEMENTS'
export const requestAnnoucementsAction = () => {
    return {
        type: REQUEST_ANNOUNCEMENTS
    }
}

export const RECEIVE_ANNOUCEMENTS = 'RECEIVE_ANNOUNCEMENTS'
export const receiveAnnouncementsAction = ({
    announcements,
    error
}) => {
    return {
        type: RECEIVE_ANNOUCEMENTS, 
        announcements
    }
}

export const fetchAnnouncements = () => {
    return function (dispatch) {
        dispatch(requestAnnoucementsAction())

        Axios.get('/api/announcements').then(
            resp => {
                console.log("[Announcements] - resp: ", resp)
                if(resp.err){
                    dispatch(receiveAnnouncementsAction({
                        error: resp.data.message
                    }))
                } else {
                    dispatch(receiveAnnouncementsAction({
                        announcements: resp.data
                    }))
                }
            },
            err => {
                console.warn('[Announcements] - error fetching announcements: ', err.response)

                dispatch(receiveAnnouncementsAction({
                    error: err.response
                }))
            }
        )
    }
   
}
