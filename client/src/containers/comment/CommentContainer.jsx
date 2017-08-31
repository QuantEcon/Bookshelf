import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Comment from '../../components/comments/Comment'

import {upvoteComment, downvoteComment} from '../../actions/auth/vote';
var actions = {
    upvoteComment,
    downvoteComment
}

class CommentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: this.props.comment,
            replies: this.props.replies,
            author: this.props.author,
            authors: this.props.authors,
            currentUser: this.props.currentUser,
        }
    }
    render(){
        return(
            <div>
                <Comment
                    comment={this.state.comment}
                    replies={this.state.replies}
                    author={this.state.author}
                    authors={this.state.authors}
                    currentUser={this.state.currentUser}
                    actions={this.props.actions}
                />
            </div>
        )
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CommentContainer);