import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import MarkdownRender from '@nteract/markdown'
import {typesetMath} from 'mathjax-electron'
import Modal from 'react-modal';
import CloseIcon from 'react-icons/lib/fa/close'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CommentContainer from "../../containers/comment/CommentContainer"

/**
 * Contains and renders all comments for the submission
 *
 * Children: {@link Comment}
 */
class CommentsThread extends Component {
    /**
     * @prop {Array} comments Array of Comment objects for all comments on the submission
     * @prop {Array} commentAuthors Array of User objects for all authors of all comments
     * @prop {Array} replies Array of Comment objects for all replies on the submission
     * @prop {func}  postComment Method called when the user submits a new comment
     * @prop {func}  postReply Method called when the user submits a new reply
     */
    static propTypes = {
        comments: PropTypes.array,
        commentAuthors: PropTypes.array,
        replies: PropTypes.array,
        postComment: PropTypes.func.isRequired,
        postReply: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.newCommentTextChange = this
            .newCommentTextChange
            .bind(this);

        this.submitNewComment = this
            .submitNewComment
            .bind(this);
        this.postReply = this
            .postReply
            .bind(this);

        this.state = {
            comments: props.comments,
            commentAuthors: props.commentAuthors,
            replies: props.replies,
            submitDisabled: true,
            showSummaryPreview: false,
            newCommentText: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({comments: props.comments, commentAuthors: props.commentAuthors, replies: props.replies})
    }

    /**
     * Listens for changes in the new comment text field.
     * @param {Object} e Event passed from the `onChange` listener
     */
    newCommentTextChange = (e) => {

        if(e){
            this.setState({newCommentText: e.target.value});
            e.preventDefault();
        }

        if(e.target.value && this.state.submitDisabled){
            this.setState({
                submitDisabled: false
            })
        } else if(!e.target.value && !this.state.submitDisabled){
            this.setState({
                submitDisabled: true
            })
        }

        this.newCommentText = e.target.value
        // this.forceUpdate();
    }

    /**Dispatches a postComment action  */
    submitNewComment() {
        console.log("Inside of Props:", this.props);
        // if currentUser is null or do not exists, then display error message
        if(!this.props.currentUser){

            this.setState({
                submitError: true
            })
        }
        console.log('submit new comment: ', this.newCommentText);
        this
            .props
            .postComment(this.newCommentText);
        this.newCommentText="";
        document.getElementById('newCommentTextArea').value = '';
    }

    /**
     * Dispatches a postReply action
     * @param {Object} param0
     * @param {String} param0.reply Content of the reply
     * @param {String} param0.commentID ID of the comment being replied to
     */
    postReply({reply, commentID}) {
        this
            .props
            .postReply({reply, commentID});
    }


    toggleSummaryPreview = () => {
        this.setState({
            showSummaryPreview: !this.state.showSummaryPreview
        });
        setTimeout(() => {
            typesetMath(this.rendered)
        }, 20);
    }

    render() {
        return (
            <div className='comments'>
                <div className='comments-thread'>
                    <div>
                        {/*Render each comment*/}
                        {this
                            .state
                            .comments
                            .map((comment, index) => {
                                var author = this
                                    .state
                                    .commentAuthors
                                    .filter(function (a) {
                                        return a._id === comment.author;
                                    })[0];
                                var replies = [];
                                comment
                                    .replies
                                    .forEach(function (replyID) {
                                        replies.push(this.state.replies.filter(function (reply) {
                                            return reply._id === replyID
                                        })[0]);
                                    }, this);
                                return <CommentContainer
                                    comment={comment}
                                    replies={replies}
                                    author={author}
                                    key={index}
                                    authors={this.state.commentAuthors}
                                    postReply={this.postReply}
                                    currentUser={this.props.currentUser}
                                    editComment={this.props.editComment}/>
                            })}
                    </div>
                    <div className='comments-post'>
                        <label>Post a comment</label>
                        <p className="input-hint">
                            You can use{' '}
                            <a href="http://commonmark.org/help/" target="_blank"><b>markdown</b></a>{' '}here.
                        </p>
                        <Tabs>
                          <TabList>
                            <Tab>Write</Tab>
                            <Tab>Preview</Tab>
                          </TabList>
                          <TabPanel>
                            <textarea
                                name="newCommentContent"
                                id='newCommentTextArea'
                                placeholder='You can use markdown here...'
                                defaultValue={this.newCommentText}
                                onChange={this.newCommentTextChange}></textarea>
                          </TabPanel>
                          <TabPanel>
                            <MarkdownRender
                                disallowedTypes={['heading']}
                                source={this.newCommentText
                                ? this.newCommentText
                                : '*No comment*'}/>
                          </TabPanel>
                        </Tabs>

                        <div className='submit-comment'>
                            <button onClick={this.submitNewComment} disabled={this.state.submitDisabled}>Submit</button>
                        </div>
                        {this.state.submitError && !this.props.currentUser
                                    ? <p className="error-help-text">
                                            You must
                                            {' '}<Link to='/signin'>sign in</Link>{' '}
                                            to comment
                                        </p>
                                    : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsThread;
