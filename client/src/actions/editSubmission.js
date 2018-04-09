/**
 * @file Actions for editing a submission
 * @author Trevor Lyon
 * 
 * @module editSubmissionActions
 */

import store from '../store/store'

export const SAVE_SUBMISSION = 'SAVE_SUBMISSION';
const saveSubmissionAction = ({
    submission
}) => {
    return {
        type: SAVE_SUBMISSION,
        submission
    }
}

/**
 * @function
 * @name buildSubmissionPreview
 * 
 * @description Builds a submission JSON object that is used for rendering in the modal that is displayed when the user clicks on the 
 * Preview button.
 * 
 * Note: only one of the parameters `file` and `notebookJSON` should be used. The other should be `null`. If the user supplies
 * a new file, then `file` will be used and `notebookJSON` should be `null`. If no new file is supplied, then the existing 
 * `notebookJSON` is used and `file` should be `null`
 * 
 * @param {Object} data
 * @param {Object} data.formData - A JSON Object of the data filled out by the form. This object should contain the following:
 * ```
 * {
 *      agreement: Boolean,
 *      title: String,
 *      summary: String,
 *      lang: String,
 *      topics: Array[String],
 *      coAuthors: Array[String]
 * }```
 * @param {File} data.file - The file of the notebook. This should be a file with an .ipynb file extension
 * @param {Object} data.notebookJSON - The JSON of the notebook
 * @param {String} data.submissionID - The ID of the submission being edited
 * 
 * @returns {Object} The submission object that contains all data necessary to render a submission page                           
 */
export const buildSubmissionPreview = ({
    formData,
    file,
    notebookJSON,
    submissionID
}) => {

    var submission = {
        ...formData,
        lastUpdated: Date.now(),
        _id: submissionID,
        author: store.getState().auth.user
    };
    if (file) {
        //read and parse file
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => {
            submission.notebookJSON = JSON.parse(event.target.result);
            return submission
        }
    } else if (notebookJSON) {
        submission.notebookJSON = notebookJSON
        return submission
    } else {
        return {
            error: 'No notebook given'
        }
    }

}

/**
 * @function buildAndSave
 * @description REDUX ACTION: Builds the submission object and dispatches an action to save the changes
 * 
 * @param {Object} data - Data used to build the submission preview. Contains `formData`, `file`, `notebookJSON`, `submissionID`
 * @param {Object} data.formData - A JSON Object of the data filled out by the form. This object should contain the following:
 * ```
 * {
 *      agreement: Boolean,
 *      title: String,
 *      summary: String,
 *      lang: String,
 *      topics: Array[String],
 *      coAuthors: Array[String]
 * }```
 * @param {File} data.file - The file of the notebook. This should be a file with an .ipynb file extension
 * @param {Object} data.notebookJSON - The JSON of the notebook. This is used incase the user didn't select a new file but is using
 * the existing file
 * @param {String} data.submissionID - The ID of the submission being edited
 */
export const buildAndSave = ({
    formData,
    file,
    notebookJSON,
    submissionID
}) => {
    return (dispatch) => {
        var submission = buildSubmissionPreview({formData, file, notebookJSON, submissionID})
        if (submission.error){
            dispatch(saveSubmissionAction({
                error: 'No notebook given'
            }));
        } else {
            dispatch(saveSubmissionAction({submission}));
        }
    }
}