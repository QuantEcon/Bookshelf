import React, {Component} from 'react';

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
        this.setState({newCommentText: e.target.value});
    }

    submitNewComment() {
        console.log('submit new comment: ', this.state.newCommentText);
        this
            .props
            .postComment(this.state.newCommentText);
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
                                    postReply={this.postReply}
                                    currentUser={this.props.currentUser}/>
                            })}
                    </div>
                    <div className='comments-post'>
                        <label>Post a comment</label>
                        <textarea
                            name="newCommentContent"
                            id='newCommentTextarea'
                            placeholder='You can use markdown here...'
                            onChange={this.newCommentTextChange}></textarea>
                        <div className='submit-comment'>
                            <button onClick={this.submitNewComment} disabled={!this.state.newCommentText}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsThread;