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
export const confirmSubmit = ({id}) => {
    return {
        type: CONFIRM_SUBMIT,
        id
    }
}

export const submit = (formData, file) => {
    return function (dispatch) {
        console.log('[SubmitActions] - submit: ', formData, file);
        dispatch(beginSubmit());
        let data = new FormData();
        data.append('file', file);
        data.append('formData', JSON.stringify(formData));
        axios
            .post('/api/submit/', data, {
                headers: {
                    'authorization': 'JWT ' + store
                        .getState()
                        .auth
                        .token
                }
            })
            .then(response => {
                console.log('[SubmitActions] - sucess: ', response);
                //TODO: support for multiple dispatches not working
                // dispatch(endSubmit({
                //     error: false
                // }));
                dispatch(addCurrentSubmission({
                    submission: response.data.submission
                }))
            })
            .catch(error => {
                console.log('[SubmitActions] - error submitting: ', error)
                dispatch(endSubmit({
                    error
                }))
            })

    }
}

export const confirm = () => {
    return function (dispatch) {
        console.log('[SubmitActions] - confirm submit')
        //send confirm request to server
        axios.get('/api/submit/confirm', {
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