import React, {Component} from 'react';

import Reply from './Reply';

/**
 * Simliar to {@link CommentsThread} but used for replies. Renders all 
 * replies to comments
 * 
 * Children: {@link Reply}
 */
class ReplyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replies: props.replies,
            authors: props.authors
        }

    }

    componentWillReceiveProps(props) {
        console.log('[ReplyList] - will receive props: ', props);
        this.setState({replies: props.replies, authors: props.authors})
    }
    render() {
        return (
            <div>
                {/*Render each reply*/}
                {this
                    .state
                    .replies
                    .map((reply, index) => {
                        if (reply) {
                            var author = this
                                .state
                                .authors
                                .filter(function (user) {
                                    return user._id === reply.author;
                                });
                            return <Reply
                                reply={reply}
                                author={author[0]}
                                key={index}
                                currentUser={this.props.currentUser}/>
                        }
                    })}
            </div>
        )
    }
}

export default ReplyList;