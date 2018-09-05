import Axios from "axios";
import store from '../store/store'
import 'whatwg-fetch'; 

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

export const CHANGE_ANNOUNCEMENT = 'CHANGE_ANNOUNCEMENT'
export const changeAnnouncementAction = ({
    error,
    announcement
}) => {
    return {
        type: CHANGE_ANNOUNCEMENT,
        announcement,
        error
    }
}

export const RECEIVE_RECENT = 'RECEIVE_RECENT'
export const receiveRecentAction = ({
    error,
    announcement
}) => {
    return {
        type: RECEIVE_RECENT,
        announcement,
        error
    }
}

export const DELETE_RECENT = 'DELETE_RECENT'
export const deleteRecentAction = ({
    error
}) => {
    return {
        type: DELETE_RECENT,
        error
    }
}

export const deleteRecent = () => {
    return function(dispatch){
        Axios.post('/api/announcements/delete').then(
            resp => {
                if(resp.err){
                    dispatch(deleteRecentAction({
                        error: resp.data.message
                    }))
                } else {
                    dispatch(deleteRecentAction({}))
                }
            },
            err => {
                dispatch(deleteRecentAction({
                    error: err.response
                }))
            }
        )
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
                    console.log("resp.data: ", resp.data, " END")

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

export const fetchRecent = () => {
    return function (dispatch) {
        dispatch(requestAnnoucementsAction())

        Axios.get('/api/announcements/recent').then(
            resp => {
                console.log("resp: ", resp)
                if(resp.err){
                    dispatch(receiveRecentAction({
                        error: resp.data.message
                    }))
                } else {
                    dispatch(receiveRecentAction({
                        announcement: resp.data
                    }))
                }
            },
            err => {
                console.warn('[Announcements] - error fetching announcements: ', err.response)

                dispatch(receiveRecentAction({
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

export const editRecent = (content) => {
    return function (dispatch) {
        Axios.post('/api/announcements/change', {
            content
        }, {
            headers: {
                "Authorization" : "JWT " + store.getState().auth.token
            }
        }).then(resp => {
            dispatch(changeAnnouncementAction({
                announcement: resp.data
            }))
        }).catch(err => {
            console.warn("[Announcements-Add] - error adding announcement: ", err)
            dispatch(changeAnnouncementAction({
                error: err,
            }))
        })
    }
}
