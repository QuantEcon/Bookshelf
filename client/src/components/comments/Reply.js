import React, {Component} from 'react';

import CommentContainer from "../../containers/comment/CommentContainer";

class Reply extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reply: props.reply,
            author: props.author
        }
    }

    render() {
        return (
            <div className='comment-nested'>
                <CommentContainer
                    comment={this.state.reply}
                    author={this.state.author}
                    isReply={true}
                    currentUser={this.props.currentUser}/>
            </div>
        )
    }
}

export default Reply;