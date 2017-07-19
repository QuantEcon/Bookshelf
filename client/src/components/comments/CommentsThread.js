import React, {Component} from 'react';

import Comment from './Comment';

class CommentsThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments,
            commentAuthors: props.commentAuthors,
            replies: props.replies
        };
    }
    render() {
        return (
            <div className='comments'>
                <div className='comments-thread'>
                    {this
                        .state
                        .comments
                        .map((comment, index) => {
                            var author = this.state.commentAuthors.filter(function(a){
                                return a._id === comment.author;
                            });
                            var replies = [];
                            comment.replies.forEach(function(replyID) {

                                replies.push(this.state.replies.filter(function(reply){
                                    return reply._id === replyID
                                })[0]);
                            }, this);
                            return <Comment comment={comment} replies={replies} author={author[0]} key={index} authors={this.state.commentAuthors}/>
                        })}
                </div>
            </div>
        )
    }
}

export default CommentsThread;