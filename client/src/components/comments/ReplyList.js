import React, {Component} from 'react';

import Reply from './Reply';

class ReplyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replies: props.replies,
            authors: props.authors
        }

    }

    render() {
        return (
            <div>
                {this
                    .state
                    .replies
                    .map((reply, index) => {
                        var author = this
                            .state
                            .authors
                            .filter(function (user) {
                                return user._id === reply.author;
                            });
                        return <Reply reply={reply} author={author[0]} key={index}/>
                    })}
            </div>
        )
    }
}

export default ReplyList;