import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {editComment, submitReply, deleteComment} from '../../actions/auth/comment';
import {flagComment} from '../../actions/submission';

import Comment from '../../components/comments/Comment';

var actions = {
    editComment,
    deleteComment,
    flagComment,
    submitReply
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
            error: this.props.error
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.error !== nextProps.error) {
            // updates the error /
            this.setState({
                error: nextProps.error
            })
        }
        if (nextProps.editedComment && nextProps.editedComment._id === nextProps.comment._id) {
            // updates the state of the comment if there is any editing /
                if ((!this.props.editedComment && nextProps.editedComment) || (nextProps.editedComment.content !== this.props.editedComment.content)) {
                this.setState({
                        comment: nextProps.editedComment
                }) 
            }
        }
        if (nextProps.deletedComment && nextProps.deletedComment._id === nextProps.comment._id) {
            // updates the state of the comment if there is any deleting
            this.setState({
                comment: nextProps.deletedComment
            })
        }
        if (nextProps.replies && this.props.replies && (nextProps.replies.length !== this.props.replies.length)) {
            // updates the replies array state if there is any addition/
            this.setState({
                replies: nextProps.replies
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // allows the component to render if there is any additional reply
        if (nextProps.replies && (nextProps.replies.length !== this.props.replies.length)) {
            return true;
        }
        // in case of editing comments, updates only the comment which has been edited
        if ((nextProps.editedComment || nextProps.error) && (nextProps.commentID !== nextState.comment._id)) {
            return false;
        }
        return true;
    }
    render(){
        return(
            <Fragment>
                { this.state.comment.deleted ? '' :
                <div key={this.state.comment._id}>
                    <Comment
                        location={this.props.location}
                        comment={this.state.comment}
                        replies={this.state.replies}
                        author={this.state.author}
                        authors={this.state.authors}
                        currentUser={this.state.currentUser}
                        actions={this.props.actions}
                        showAdmin={this.props.isAdmin}
                        isReply={this.props.isReply}
                        error={this.state.error}
                    />
                </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        isAdmin: state.auth.isAdmin,
        editedComment: state.submissionByID.editedComment,
        deletedComment: state.submissionByID.deletedComment,
        error: state.submissionByID.error,
        commentID: state.submissionByID.commentID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
