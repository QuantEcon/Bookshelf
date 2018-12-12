import axios from 'axios'
import store from "../../store/store"
import {authPostReply} from '../auth/auth'
import {postComment, editedComment} from '../submission'

/**
 * @file Actions for comments
 * @author Trevor Lyon
 * 
 * @module commentActions
 */

/**
 * @function editComment
 * @description Makes an API request to modify the `text` value in the Comment object
 * in the database
 * 
 * @param {Object} param0 
 * @param {String} param0.commentID ID of the comment being edited
 * @param {String} param0.newCommentText New contents to replace the comment text
 */
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
            dispatch(editedComment({
                editedComment: resp.data.comment
            }))
        }).catch(err => {

        })
    }
}

/**
 * @function submitComment
 * @description Makes an API request to create a new comment in the database
 * 
 * @param {Object} param0 
 * @param {String} param0.submissionID ID of the submission being commented on
 * @param {String} param0.comment Content of the new comment
 */
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
            dispatch(postComment({
                submissionID: response.data.submissionID,
                comment: response.data.comment
            }))
        }).catch(error => {
            console.log('[AuthActions] - error submitting comment: ', error);
        })
    }
}

/**
 * @function submitReply
 * @description Makes an API request to create a new reply in the database
 * 
 * @param {Object} param0 
 * @param {String} param0.submissionID ID of the submission the reply belongs to
 * @param {String} param0.commentID ID of the comment the reply belongs to
 * @param {String} param0.reply Content of the new reply
 */
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