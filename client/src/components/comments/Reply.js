import React, {Component} from 'react';
import PropTypes from 'prop-types'

import Comment from './Comment';

/**
 * Renders a reply to a comment. Wraps a {@link Comment} in a reply div.
 * 
 * Becuase replies to a reply is not available, passing `isReply: true` to the {@link Comment}
 * as a prop disables this functionality.
 */
class Reply extends Component {
    /**
     * @prop {Object} reply Comment object containing all data for the reply
     * @prop {Object} author User object containing all data for the author of the reply
     */
    static propTypes = {
        reply: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired
    }
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
                <Comment
                    comment={this.state.reply}
                    author={this.state.author}
                    isReply={true}
                    currentUser={this.props.currentUser}
                    upvote={this.props.upvote}
                    downvote={this.props.downvote}/>
            </div>
        )
    }
}

export default Reply;