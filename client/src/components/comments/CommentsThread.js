import React, {Component} from 'react';
import {Link} from 'react-router-dom'


import Comment from './Comment';

class CommentsThread extends Component {
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
            replies: props.replies
        };
    }

    componentWillReceiveProps(props) {
        this.setState({comments: props.comments, commentAuthors: props.commentAuthors, replies: props.replies})
    }

    newCommentTextChange(e) {
        this.newCommentText = e.target.value
        this.forceUpdate();
    }

    newCommentText = "";

    submitNewComment() {
        if(!this.props.currentUser){
            this.setState({
                submitError: true
            })
        }
        console.log('submit new comment: ', this.state.newCommentText);
        this
            .props
            .postComment(this.newCommentText);
        this.newCommentText="";
        document.getElementById('newCommentTextArea').value = '';
    }

    postReply({reply, commentID}) {
        this
            .props
            .postReply({reply, commentID});
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
                                return <Comment
                                    comment={comment}
                                    replies={replies}
                                    author={author}
                                    key={index}
                                    authors={this.state.commentAuthors}
                                    upvote={this.props.upvote}
                                    downvote={this.props.downvote}
                                    upvoteReply={this.props.upvoteReply}
                                    downvoteReply={this.props.downvoteReply}
                                    postReply={this.postReply}
                                    currentUser={this.props.currentUser}
                                    editComment={this.props.editComment}/>
                            })}
                    </div>
                    <div className='comments-post'>
                        <label>Post a comment</label>
                        <textarea
                            name="newCommentContent"
                            id='newCommentTextArea'
                            placeholder='You can use markdown here...'
                            onChange={this.newCommentTextChange}></textarea>
                        <div className='submit-comment'>
                            <button onClick={this.submitNewComment} disabled={!this.newCommentText}>Submit</button>
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