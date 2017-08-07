import {
    REQUEST_NB_INFO,
    RECEIVE_NB_INFO,
    POST_COMMENT,
    POST_REPLY,
    UPVOTE_COMMENT,
    UPVOTE_SUBMISSION,
    DOWNVOTE_COMMENT,
    DOWNVOTE_SUBMISSION
} from '../actions/submission';

//notebook.comments
const CommentsReducer = (comments = {}, action) => {
    switch (action.type) {
        case POST_COMMENT:
            return Object.assign({}, comments, {
                [action.comment._id]: action.comment
            });
        case POST_REPLY:
            return Object.assign({}, comments, {
                [action.commentID]: [
                    ...comments,
                    action.reply._id
                ]
            })
        case UPVOTE_COMMENT:
            if (comments.commentID) {
                return Object.assign({}, comments, {
                    [action.commentID]: Object.assign({}, comments, {
                        score: comments[action.commentID].score + 1
                    })
                })
            } else {
                return comments;
            }
        case DOWNVOTE_COMMENT:
            if (comments.commentID) {
                return Object.assign({}, comments, {
                    [action.commentID]: Object.assign({}, comments, {
                        score: comments[action.commentID].score + 1
                    })
                })
            } else {
                return comments;
            }
        default:
            return comments;
    }
}

const RepliesReducer = (replies = {}, action) => {
    switch (action.type) {
        case POST_REPLY:
            return Object.assign({}, replies, {
                [action.reply._id]: action.reply
            })
        case UPVOTE_COMMENT:
            {
                if (replies.commentID) {
                    return Object.assign({}, replies, {
                        [action.commentID]: Object.assign({}, replies, {
                            score: replies[action.commentID].score + 1
                        })
                    })
                } else {
                    return replies;
                }
            }
        case DOWNVOTE_COMMENT:
            {
                if (replies.commentID) {
                    return Object.assign({}, replies, {
                        [action.commentID]: Object.assign({}, replies[action.commentID], {
                            score: replies[action.commentID].score - 1
                        })
                    })
                } else {
                    return replies;
                }
            }
        default:
            return replies;
    }
}

const SubmissionReducer = (state = {}, action) => {

    switch (action.type) {
        case REQUEST_NB_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                [action.notebookID]: {
                    isFetching: true,
                    didInvalidate: false
                }

            });
        case RECEIVE_NB_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                [action.notebookID]: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.receivedAt,
                    data: action.data
                }
            })
        case POST_COMMENT:
            return Object.assign({}, state, {
                [action.submissionID]: {
                    comments: CommentsReducer(state, action)
                }
            })
        case POST_REPLY:
            return Object.assign({}, state, {
                comments: CommentsReducer(state, action),
                replies: RepliesReducer(state, action)
            })
        case UPVOTE_COMMENT:
            return Object.assign({}, state, {
                comments: CommentsReducer(state, action),
                replies: RepliesReducer(state, action)
            })
        case UPVOTE_SUBMISSION:
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: Object.assign({}, state[action.submissionID].data, {
                        notebook: Object.assign({}, state[action.submissionID].data.notebook, {
                            score: state[action.submissionID].data.notebook.score + 1
                        })
                    })
                })
            })
        case DOWNVOTE_COMMENT:
            return Object.assign({}, state, {
                comments: CommentsReducer(state, action),
                replies: RepliesReducer(state, action)
            })
        case DOWNVOTE_SUBMISSION:
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: Object.assign({}, state[action.submissionID].data, {
                        notebook: Object.assign({}, state[action.submissionID].data.notebook, {
                            score: state[action.submissionID].data.notebook.score - 1
                        })
                    })
                })
            })
        default:
            return state;
    }
}

export default SubmissionReducer