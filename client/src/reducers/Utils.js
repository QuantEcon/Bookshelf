import {
    LOG_REQUEST_SUBMISSION_START,
    LOG_REQUEST_SUBMISSION_END
} from '../actions/utils'

export const LogReducer = (logs = {}, action) => {
    switch (action.type) {
        case LOG_REQUEST_SUBMISSION_START:
            console.log('[LogReducer] - request submission start')
            return Object.assign({}, logs, {
                [action.submissionID]: RequestReducer(logs[action.submissionID], action)
            })
        case LOG_REQUEST_SUBMISSION_END:
            console.log('[LogReducer] - request submission end: ', action);
            return Object.assign({}, logs, {
                [action.submissionID]: RequestReducer(logs[action.submissionID], action)

            })
        default:
            return logs
    }
}

const RequestReducer = (request = {}, action) => {
    switch (action.type) {
        case LOG_REQUEST_SUBMISSION_START:
            return Object.assign({}, request, {
                [action.id]: TimeReducer(request[action.id], action)
            })
        case LOG_REQUEST_SUBMISSION_END:
            return Object.assign({}, request, {
                [action.id]: TimeReducer(request[action.id], action)
            })
        default:
            return request
    }
}

const TimeReducer = (timeLogs = {}, action) => {
    switch (action.type) {
        case LOG_REQUEST_SUBMISSION_START:
            return Object.assign({}, timeLogs, {
                start: action.time
            })
        case LOG_REQUEST_SUBMISSION_END:
            var start = new Date(timeLogs.start);
            var end = new Date(action.time);
            var timeDifference = (end.getTime() - start.getTime()) / 1000
            return Object.assign({}, timeLogs, {
                end: action.time,
                size: action.size,
                timeDifference
            })
        default:
            return timeLogs
    }
}