/**
 * @file Submit Actions
 * @author Trevor Lyon
 *
 * @module submitActions
 */

import store from '../store/store'
import axios from 'axios'
import {fetchSubmissions} from './submissionList';
import 'whatwg-fetch'; 

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

/**
 * @function submit
 * @description Creates a `submission` object to be sent to the API to create a new
 * submission document. If there is a file uploaded, the file will be read and the JSON
 * will be extracted.
 *
 * The method will then call `confirm` passing the created `submission` object
 *
 * @param {Object} formData Data filled out by the user in the submit form:
 * ```
 * {
 *      agreement: Boolean,
 *      title: String,
 *      summary: String,
 *      lang: String,
 *      topics: Array[String],
 *      coAuthors: Array[String]
 * }```
 * @param {file} file File uploaded by the user
 */
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
                confirm({submission})(dispatch)
            }
        } else {
            dispatch(endSubmit({
                error: 'No file submitted!'
            }));
        }
    }
}

/**
 * @function confirm
 * @description Makes an API request to create a new submission document in the database.
 * Called by `submit`
 *
 * If the submission is successful, the API will return the new submission docuement and
 * it will be added to the redux store
 *
 * @param {Object} param0
 * @param {Object} param0.submission Contains all the data necessary to create a new submission
 * document
 */
export const confirm = ({submission}) => {
    return function (dispatch) {
        console.log('[SubmitActions] - confirm submit: ', submission)
        //send confirm request to server
        axios.post('/api/submit/confirm', {
            submission: submission
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(response => {
            console.log('[SubmitActions] - confirmation success: ', response);
            dispatch(confirmSubmit({
                id: response.data.submissionID
            }))
            dispatch(fetchSubmissions({forced: true}));
            return response.data.submissionID;
        }).catch(error => {
            console.log('[SubmitActions] - error in confirm submit: ', error);
            dispatch(confirmSubmit({
                error
            }))
            return false;
        })
    }
}

/**
 * @function cancel
 * @description Cancels the submit action and returns the user to the homepage
 */
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
