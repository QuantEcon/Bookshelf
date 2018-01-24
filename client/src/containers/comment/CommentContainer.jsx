import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Comment from '../../components/comments/Comment'

import {editComment, submitReply} from '../../actions/auth/comment'
import {flagComment} from '../../actions/submission'

var actions = {
    editComment,
    flagComment,
    submitReply
}

class CommentContainer extends Component {
    constructor(props){
        super(props);
        console.log("[CommentContainer] - constructor props: ", props)
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
                    comment={this.props.comment}
                    replies={this.state.replies}
                    author={this.state.author}
                    authors={this.state.authors}
                    currentUser={this.state.currentUser}
                    actions={this.props.actions}
                    showAdmin={this.props.isAdmin}
                    isReply={this.props.isReply}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        isAdmin: state.auth.isAdmin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);