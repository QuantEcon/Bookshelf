import {
    REQUEST_NB_INFO,
    RECEIVE_NB_INFO,
    POST_COMMENT,
    POST_REPLY,
    UPVOTE_COMMENT,
    UPVOTE_SUBMISSION,
    DOWNVOTE_COMMENT,
    DOWNVOTE_SUBMISSION,
    EDIT_SUBMISSION,
    REQUEST_NB,
    RECEIVE_NB,
    NB_PROGRESS,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../actions/submission';

import { processEnv } from '../utils/envPreProcessor'

//notebook.comments
const CommentsReducer = (comments = [], action) => {
    switch (action.type) {
        case POST_REPLY:
            for (var index = 0; index < comments.length; index++) {
                var comment = comments[index];
                if (comment._id === action.commentID) {
                    var newCommentsArray = JSON.parse(JSON.stringify(comments));
                    newCommentsArray[index] = Object.assign({}, comment, {
                        replies: [
                            ...comment.replies,
                            action.reply._id
                        ]
                    })
                    console.log('[CommentsReducer] - new comments array: ', newCommentsArray);
                    return newCommentsArray;
                }
            }
            comments.forEach(function(comment, index) {
                if(comment._id === action.commentID){
                    var newCommentsArray = JSON.parse(JSON.stringify(comments));
                    newCommentsArray[index] = Object.assign({}, comment, {
                        replies: [
                            ...comment.replies,
                            action.reply._id
                        ]
                    })
                    console.log('[CommentsReducer] - new comments array: ', newCommentsArray);
                    return newCommentsArray;
                }
            }, this);
            console.log('got here')
            return comments;
        case UPVOTE_COMMENT:
            comments.forEach(function (comment, index) {
                console.log('comment: ', comment);
                console.log('index: ', index);
                if (comment._id === action.commentID)
                    return Object.assign({}, comments, {
                        index: Object.assign({}, comments[index], {
                            score: comment.score + 1
                        })
                    })
            }, this);
            return comments;
        case DOWNVOTE_COMMENT:
            comments.forEach(function (comment, index) {
                console.log('[CommentsReducer] - downvote comment: ', comment);
                console.log('index: ', index);
                if (comment._id === action.commentID)
                    return Object.assign({}, comments, {
                        index: Object.assign({}, comments[index], {
                            score: comment.score - 1
                        })
                    })
            }, this);
            return comments;
        default:
            return comments;
    }
}

const RepliesReducer = (replies = [], action) => {
    console.log('[RepliesReducer] - replies: ', replies);
    console.log('[RepliesReducer] - action: ', action);
    switch (action.type) {
        case POST_REPLY:
            return Object.assign({}, replies, {
                [action.reply._id]: action.reply
            })
        case UPVOTE_COMMENT:
            if (replies[action.commentID]) {
                return Object.assign({}, replies, {
                    [action.commentID]: Object.assign({}, replies, {
                        score: replies[action.commentID].score + 1
                    })
                })
            } else {
                return replies;
            }
        case DOWNVOTE_COMMENT:
            if (replies[action.commentID]) {
                return Object.assign({}, replies, {
                    [action.commentID]: Object.assign({}, replies[action.commentID], {
                        score: replies[action.commentID].score - 1
                    })
                })
            } else {
                return replies;
            }
        default:
            return replies;
    }
}

const DataReducer = (data = {}, action) => {
    switch (action.type) {
        case POST_COMMENT:
            console.log('POST_COMMENT - ', data.commentAuthors);
            var authorExits = false
            for(var i=0; i<data.commentAuthors.length; i++){
                if(data.commentAuthors[i]._id === action.author._id){
                    authorExits = true
                    break;
                }
            }

            if(authorExits){
                return Object.assign({}, data, {
                    comments: [
                        ...data.comments,
                        action.comment
                    ]
                })
            } else {
                return Object.assign({}, data, {
                    comments: [
                        ...data.comments,
                        action.comment
                    ],
                    commentAuthors: [
                        ...data.commentAuthors,
                        action.author
                    ]
                })
            }


        case POST_REPLY:
            console.log('[SubmissionDataReducer] - old state: ', data);

            var newState = Object.assign({}, data, {
                comments: CommentsReducer(data.comments, action),
                replies: [
                    ...data.replies,
                    action.reply
                ]
            });
            console.log('[SubmissionDataReducer] - new state: ', newState);
            return newState;
        case UPVOTE_COMMENT:
            console.log('[DataReducer] - upvote comment ', data, action)
            return Object.assign({}, data, {
                comments: CommentsReducer(data.comments, action),
                replies: RepliesReducer(data.replies, action)
            })
        case DOWNVOTE_COMMENT:
            console.log('[DataReducer] - downvote comment', data, action);
            return Object.assign({}, data, {
                comments: CommentsReducer(data.comments, action),
                replies: RepliesReducer(data.replies, action)
            })
        default:
            return data
    }
}

const SubmissionReducer = (state = {}, action) => {

    switch (action.type) {
        case REQUEST_NB_INFO:
            return Object.assign({}, state, {
                isFetching: true,
                [action.notebookID]: Object.assign({}, state[action.notebookID],{
                    isFetching: true,
                    didInvalidate: false
                })

            });

        case RECEIVE_NB_INFO:
            if(action.error){
                return Object.assign({}, state, {
                    isFetching: false,
                    [action.notebookID]: Object.assign({}, state[action.notebookID],{
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: action.receivedAt,
                        error: action.error,
                    })
                })
            } else {

                return Object.assign({}, state, {
                    isFetching: false,
                    [action.notebookID]: Object.assign({}, state[action.notebookID], {
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: action.receivedAt,
                        data: Object.assign({}, state[action.notebookID].data, action.data),
                        totalData: action.data.nbLength
                    })
                })
            }

        case REQUEST_NB:
            return Object.assign({}, state, {
                [action.notebookID]: Object.assign({},state[action.notebookID], {
                    isFetchingNB: true,
                })
            })

        case RECEIVE_NB:
              // pre-process environments here
            action.json.cells.forEach(cell => {
                if(cell.cell_type === "markdown"){
                    var joinedSource = (typeof(cell.source) === "string") ? cell.source : cell.source.join("")

                    var processSource = processEnv(joinedSource);

                    if(processSource.error){
                        console.log("processEnv returned and error!")
                        console.log("processedSource: ", processSource)
                    } else {
                        cell.source = processSource
                    }


                }
            });

            return Object.assign({}, state, {

                [action.notebookID]: Object.assign({}, state[action.notebookID], {
                    isFetchingNB: false,
                    data: Object.assign({}, state[action.notebookID].data, {
                        notebookJSON: action.json
                    })
                })
            })

        case NB_PROGRESS:
            return Object.assign({}, state, {
                [action.notebookID]: Object.assign({}, state[action.notebookID], {
                    dataReceived: action.dataReceived,
                })
            })

        case POST_COMMENT:
            console.log('[SubmissionActions] - post comment action: ', action);
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: DataReducer(state[action.submissionID].data, action)
                })
            })
        case POST_REPLY:
            console.log('[SubmissionActions] - post reply action:', action);
            console.log('[SubmissionActions] - state: ', state);
            console.log('[SubmissionActions] - submission: ', state[action.submissionID]);
            if (action.error) {
                return Object.assign({}, state, {
                    error: action.error,
                    commentID: action.commentID
                });
            }
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: DataReducer(state[action.submissionID].data, action),
                })
            })
        case UPVOTE_COMMENT:
            //TODO: use DataReducer
            console.log('[SubmissionReducer] - upvote comment: ', action);
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: DataReducer(state[action.submissionID].data, action),
                })
            })
        case UPVOTE_SUBMISSION:
            console.log('[SubmissionReducer] - upvote submission action: ', action);
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
            console.log('[SubmissionReducer] - downvote comment: ', action);
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: DataReducer(state[action.submissionID].data, action),
                })
            })
        case DOWNVOTE_SUBMISSION:
            console.log('[SubmissionReducer] - downvote submission action: ', action);
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    data: Object.assign({}, state[action.submissionID].data, {
                        notebook: Object.assign({}, state[action.submissionID].data.notebook, {
                            score: state[action.submissionID].data.notebook.score - 1
                        })
                    })
                })
            })
        case EDIT_SUBMISSION:
            if (action.error) {
                console.log('[SubmissionReducer] - error editing submission: ', action.error);
                return state;
            }
            return Object.assign({}, state, {
                [action.submissionID]: Object.assign({}, state[action.submissionID], {
                    didInvalidate: true
                })
            })
        case EDIT_COMMENT:
            if (action.error) {
                console.log('[SubmissionReducer] - error editing comment: ', action.error);
                return Object.assign({}, state, {
                    error: action.error,
                    commentID: action.commentID
                });
            }
            return Object.assign({},state,{
                editedComment: action.editedComment,
                error: false,
                commentID: action.commentID
            })
        case DELETE_COMMENT:
            if (action.error) {
                console.log('[SubmissionReducer] - error deleting comment: ', action.error);
                return Object.assign({}, state, {
                    error: action.error,
                    commentID: action.commentID
                });
            }
            let submissionData;
            if (state[action.submissionID] && state[action.submissionID].data ) {
                submissionData =  JSON.parse(JSON.stringify(state[action.submissionID])); // since Object.assign does not do deep copy
                submissionData.data.replies = submissionData.data.replies.map((reply) => {
                    if (reply._id === action.deletedComment._id) {
                        reply.deleted = true;
                    }
                    return reply;
                })
                submissionData.data.comments = submissionData.data.comments.map((comment) => {
                    if (comment._id === action.deletedComment._id) {
                        comment.deleted = true;
                    }
                    return comment;
                })
            }
            return Object.assign({},state,{
                [action.submissionID]: submissionData,
                deletedComment: action.deletedComment,
                error: false,
                commentID: action.commentID
            })
        default:
            return state;
    }
}

export default SubmissionReducer
