import store from '../store/store'

// export const BUILD_SUBMISSION_PREVIEW = 'BUILD_SUBMISSION_PREVIEW'
// const buildSubmissionPreviewAction = ({
//     submission,
//     error
// }) => {
//     return {
//         type: BUILD_SUBMISSION_PREVIEW,
//         submission,
//         error
//     }
// }

// export const CANCEL_PREVIEW = 'CANCEL_PREVIEW'
// const cancelPreviewAction = ({
//     submissionID
// }) => {
//     return {
//         type: CANCEL_PREVIEW,
//         submissionID
//     }
// }

// export const PREVIEW = 'PREVIEW'
// const previewAction = ({
//     submissionID
// }) => {
//     return {
//         type: PREVIEW,
//         submissionID
//     }
// }

export const SAVE_SUBMISSION = 'SAVE_SUBMISSION';
const saveSubmissionAction = ({
    submission
}) => {
    return {
        type: SAVE_SUBMISSION,
        submission
    }
}

//==========================================================================================================================

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

export const buildAndSave = ({
    formData,
    file,
    notebookJSON,
    submissionID
}) => {
    return (dispatch) => {
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
                dispatch(saveSubmissionAction({
                    submission
                }))
            }
        } else if (notebookJSON) {
            submission.notebookJSON = notebookJSON
            dispatch(saveSubmissionAction({
                submission
            }));
        } else {
            dispatch(saveSubmissionAction({
                error: 'No notebook given'
            }));
        }
    }
}

// export const saveSubmission = ({
//     submissionID
// }) => {
//     return (dispatch) => {
//         dispatch(saveSubmissionAction(submissionID));
//     }
// }

// export const cancelPreview = ({
//     submissionID
// }) => {
//     return (dispatch) => {
//         dispatch(cancelPreviewAction({
//             submissionID
//         }));
//     }
// }