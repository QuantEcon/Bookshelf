export const editComment = ({
    commentID,
    newCommentText
}) => {
    return function (dispatch) {
        axios.post('/api/submit/comment/edit', {
            commentID,
            newCommentText
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
            console.log('[AuthActions] - edit comment returned: ', resp);
        }).catch(err => {

        })
    }
}

export const submitComment = ({
    submissionID,
    comment,
}) => {
    return function (dispatch) {
        axios.post('/api/submit/comment/', {
            submissionID: submissionID,
            content: comment
        }, {
            headers: {
                'Authorization': 'JWT ' + store
                    .getState()
                    .auth
                    .token
            }
        }).then(response => {
            console.log('[AuthActions] - submit comment reponse: ', response);
            if (response.data.error) {
                console.log('[AuthActions] - Server returned error submitting comment: ', response.data.error);
            }
            console.log('dispatch submission actions post comment');
            dispatch(SubmissionActions.postComment({
                submissionID: response.data.submissionID,
                comment: response.data.comment
            }))
        }).catch(error => {
            console.log('[AuthActions] - error submitting comment: ', error);
        })
    }
}

export const submitReply = ({
    submissionID,
    commentID,
    reply
}) => {
    return function (dispatch) {

        axios.post('/api/submit/reply/', {
            submissionID,
            commentID,
            reply
        }, {
            headers: {
                'Authorization': 'JWT ' + store.getState().auth.token
            }
        }).then(resp => {
            console.log('[AuthActions] - submit reply response: ', resp);
            if (resp.data.error) {
                console.log('[AuthActions] - submit reply error in response: ', resp.data.error);
                dispatch(authPostReply({
                    error: resp.data.error
                }))
            } else {
                dispatch(authPostReply({
                    submissionID: resp.data.submissionID,
                    commentID: resp.data.commentID,
                    reply: resp.data.reply
                }))
            }
        }).catch(error => {
            dispatch(authPostReply({
                error
            }))
        })
    }
}