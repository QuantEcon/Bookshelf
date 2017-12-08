export const LOG_REQUEST_SUBMISSION_START = 'LOG_REQUEST_SUBMISSION_START'
export const logRequestSubmissionStartAction = ({
    submissionID,
    id
}) => {
    return {
        type: LOG_REQUEST_SUBMISSION_START,
        submissionID,
        time: Date.now(),
        id
    }
}

export const logRequestSubmissionStart = ({
    request
}) => {
    console.log('log request submission start');
    return (dispatch) => {
        dispatch(logRequestSubmissionStartAction({
            submissionID: request.submissionID,
            id: request.id
        }))

    }
}

export const LOG_REQUEST_SUBMISSION_END = 'LOG_REQUEST_SUBMISSION_END'
export const logRequestSubmissionEndAction = ({
    submissionID,
    size,
    id
}) => {
    return {
        type: LOG_REQUEST_SUBMISSION_END,
        submissionID,
        time: Date.now(),
        size,
        id
    }
}

export const logRequestSubmissionEnd = ({
    request
}) => {
    return (dispatch) => {
        dispatch(logRequestSubmissionEndAction({
            submissionID: request.submissionID,
            id: request.id
        }))

    }
}

export const LOG_RENDER_START = 'LOG_RENDER_START'
export const logRenderStartAction = ({request}) => {
    return {
        type: LOG_RENDER_START,
        submissionID: request.submissionID,
        id: request.id
    }
}

export const LOG_RENDER_END = 'LOG_RENDER_END'
export const logRenderEndAction = ({request}) => {
    return {
        type: LOG_RENDER_END,
        submissionID: request.submissionID,
        id: request.id
    }
}