import {
    BUILD_SUBMISSION_PREVIEW,
    PREVIEW,
    CANCEL_PREVIEW,
    SAVE_SUBMISSION
} from '../actions/editSubmission'

const SubmissionReducer = (submission = {}, action) => {
    switch (action.type) {
        case BUILD_SUBMISSION_PREVIEW:
            return Object.assign({}, submission, {
                ...action.submission,
                isLoading: false
            })
        case PREVIEW:
            return Object.assign({}, submission, {
                isLoading: true
            })
        case SAVE_SUBMISSION:
            return null
        default:
            return submission
    }

}

const EditSubmissionRecucer = (editSubmissionByID = {}, action) => {
    if (action.error) {
        return Object.assign({}, editSubmissionByID, {
            error: action.error
        })
    }
    switch (action.type) {
        case BUILD_SUBMISSION_PREVIEW:
            return Object.assign({}, editSubmissionByID, {
                [action.submission._id]: SubmissionReducer(editSubmissionByID[action.submission._id], action)
            })

        case CANCEL_PREVIEW:
            return Object.assign({}, editSubmissionByID, {
                [action.submissionID]: null
            })
        case SAVE_SUBMISSION:
            return Object.assign({}, editSubmissionByID, {
                [action.submissionID]: SubmissionReducer(editSubmissionByID[action.submissionID], action)
            })
        case PREVIEW:
            return Object.assign({}, editSubmissionByID, {
                [action.submissionID]: SubmissionReducer(editSubmissionByID[action.submissionID], action)
            })

        default:
            return editSubmissionByID
    }
}

export default EditSubmissionRecucer