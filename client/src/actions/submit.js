import store from '../store/store'
import axios from 'axios'

export const BEGIN_SUBMIT = 'BEGIN_SUBMIT'
export const beginSubmit = () => {
    return {
        type: BEGIN_SUBMIT
    }
}

export const ADD_CURRENT_SUBMISSION = 'ADD_CURRENT_SUBMISSION'
export const addCurrentSubmission = ({
    error,
    submission
}) => {
    return {
        type: ADD_CURRENT_SUBMISSION,
        error,
        submission
    }
}

export const END_SUBMIT = 'END_SUBMIT'
export const endSubmit = ({
    error
}) => {
    return {
        type: END_SUBMIT,
        error
    }
}

export const CANCEL_SUBMIT = 'CANCEL_SUBMIT'
export const cancelSubmit = () => {
    return {
        type: CANCEL_SUBMIT
    }
}

export const CONFIRM_SUBMIT = 'CONFIRM_SUBMIT'
export const confirmSubmit = ({
    id
}) => {
    return {
        type: CONFIRM_SUBMIT,
        id
    }
}

export const submit = (formData, file) => {
    return function (dispatch) {
        console.log('[SubmitActions] - submit: ', formData, file);
        dispatch(beginSubmit());
        var submission = {
            ...formData,
            author: store.getState().auth.user,
            lastUpdated: Date.now(),
            published: Date.now(),
        }
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file);
            submission.fileName = file.name;
            reader.onload = (event) => {
                submission.notebookJSON = JSON.parse(event.target.result);
                dispatch(addCurrentSubmission({
                    submission
                }))
            }
        } else {
            dispatch(endSubmit({
                error: 'No file submitted!'
            }));
        }
    }
}

export const confirm = () => {
    return function (dispatch) {
        console.log('[SubmitActions] - confirm submit')
        //send confirm request to server
        axios.post('/api/submit/confirm', {
            submission: store.getState().auth.user.currentSubmission
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(response => {
            console.log('[SubmitActions] - confirmation success: ', response);
            dispatch(confirmSubmit({
                id: response.data.id
            }))
            return response.data.id;
        }).catch(error => {
            console.log('[SubmitActions] - error in confirm submit: ', error);
            dispatch(confirmSubmit({
                error
            }))
            return false;
        })
    }
}

export const cancel = () => {
    return function (dispatch) {
        console.log('[SubmitActions] - cancelSubmit');
        //send cancel request to server
        axios.get('/api/submit/cancel', {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(response => {
            console.log('[SubmitActions] - cancel success: ', response);
            dispatch(cancelSubmit())
            return true;

        }).catch(error => {
            console.log('[SubmitActions] - error in cancel submit: ', error);
            dispatch(cancelSubmit({
                error
            }))
            return false;
        })
    }
}