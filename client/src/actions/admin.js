import axios from 'axios'
import store from '../store/store'

// Dispatch Objects ========================================

export const REQUEST_FLAGGED_CONTENT = 'REQUEST_FLAGGED_CONTENT'
const requestFlaggedContentAction = () => {
    return {
        type: REQUEST_FLAGGED_CONTENT
    }
}

export const RECEIVE_FLAGGED_CONTENT = 'RECEIVE_FLAGGED_CONTENT'
const receiveFlaggedContentAction = ({
    users,
    submissions,
    comments,
    error
}) => {
    return {
        type: RECEIVE_FLAGGED_CONTENT,
        users,
        submissions,
        comments,
        error
    }
}

// Actions ================================================

export const fetchFlaggedContent = () => {
    return (dispatch) => {
        dispatch(requestFlaggedContentAction())

        axios.get('/api/admin/flagged-content', {
            headers: {
                "Authorization": "JWT " + store.getState().auth.token
            }
        }).then(
            resp => {
                if(resp.data.error){
                    console.log("[AdminActions] - error fetching admin data: ", resp.data.message)
                    dispatch(receiveFlaggedContentAction({
                        error: resp.data.message
                    }))
                } else {
                    console.log("[AdminActions] - request returned: ", resp)
                    dispatch(receiveFlaggedContentAction({
                        users: resp.data.users,
                        submissions: resp.data.submissions,
                        comments: resp.data.comments
                    }))
                }
            },
            err => {
                console.log("[AdminActions] - error fetching admin data: ", err)
                dispatch(receiveFlaggedContentAction({
                    error: err
                }))
            }
        )
    }
}