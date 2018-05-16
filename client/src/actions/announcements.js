import Axios from "axios";
import store from '../store/store'

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
        announcements,
        error
    }
}

export const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT'
export const addAnnouncementAction = ({
    error, 
    announcement
}) => {
    return {
        type: ADD_ANNOUNCEMENT,
        announcement,
        error
    }
}

export const fetchAnnouncements = () => {
    return function (dispatch) {
        dispatch(requestAnnoucementsAction())

        Axios.get('/api/announcements/recent').then(
            resp => {
                if(resp.err){
                    dispatch(receiveAnnouncementsAction({
                        error: resp.data.message
                    }))
                } else {
                    dispatch(receiveAnnouncementsAction({
                        announcements: [resp.data]
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

export const addAnnouncement = (content) => {
    return function (dispatch) {
        Axios.post('/api/announcements/add', {
            content
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(resp => {
            dispatch(addAnnouncementAction({
                announcement: resp.data
            }))
        }).catch(err => {
            console.warn("[Announcements-Add] - error adding announcement: ", err)
            dispatch(addAnnouncementAction({
                error: err,
                announcements: []
            }))
        })
    }
}
