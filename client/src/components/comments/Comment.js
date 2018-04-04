import React, {Component} from 'react';
import PropTypes from 'prop-types'
import FlagIcon from 'react-icons/lib/md/flag';
import EditIcon from 'react-icons/lib/md/edit';
import Modal from 'react-modal'

import Markdown from 'react-markdown';
import Time from 'react-time';

import ReplyList from './ReplyList';

/**
 * Component to render all data for a Comment. The {@link CommentsThread} component passes
 * all neccessary data down to this component.
 * 
 * Children: {@link ReplyList}
 */
class Comment extends Component {

    /**
     * @prop {Object} comment Comment object from the database
     * @prop {Array} replies Array of comment objets representing the replies to this comment
     * @prop {Object} author Data for the author of the comment
     * @prop {Array} authors Data for all authors of the replies to this comment
     * @prop {func} postReply Method called when the user clicks "Reply"
     * @prop {Object} currentUser Data representing the current user. If no user is signed in,
     * this will be `null`
     * @prop {func} editComment Method called when the user clicks "Edit"
     * @prop {bool} isReply Boolean flag if the comment is a reply or not. If true, replying to 
     * this comment is disabled
     */
    static propTypes = {
        comment: PropTypes.object.isRequired,
        replies: PropTypes.array,
        author: PropTypes.object.isRequired,
        authors: PropTypes.array,
        postReply: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        editComment: PropTypes.func,
        isReply: PropTypes.bool
    }

    constructor(props) {
        super(props);

        console.log('[Comment] - props: ', props);

        this.state = {
            comment: props.comment,
            replies: props.replies,
            author: props.author ? props.author : props.currentUser,
            showInsertReply: false,
            showEditComment: false,
            authors: props.authors,
            currentUser: props.currentUser,
            isReply: props.isReply
        }

        this.toggleInsertReply = this
            .toggleInsertReply
            .bind(this)
        this.submitRepsonse = this
            .submitRepsonse
            .bind(this);
        this.replyTextChanged = this
            .replyTextChanged
            .bind(this);
        this.submitRepsonse = this
            .submitRepsonse
            .bind(this);
        this.toggleShowEditComment = this
            .toggleShowEditComment
            .bind(this);
        this.editComment = this
            .editComment
            .bind(this);
        this.toggleDeleteModal = this
            .toggleDeleteModal
            .bind(this);
        this.deleteComment = this
            .deleteComment
            .bind(this);
        this.flagComment = this.flagComment.bind(this)
    }

    componentWillReceiveProps(props) {
        console.log('[Comment] - received new props: ', props);
        this.setState({
            comment: props.comment,
            replies: props.replies,
            author: props.author,
            showInsertReply: false,
            authors: props.authors,
            currentUser: props.currentUser,
            isReply: props.isReply,
        })
    }

    /**Toggles the visibility of the edit comment text input */
    toggleShowEditComment() {
        this.setState({
            showEditComment: !this.state.showEditComment
        })
    }

    /**Called when the user clicks edit comment.
     * 
     * @param {Object} e Event passed from the `onClick` listener
     * This method then calls the prop `editComment`
     */
    editComment(e) {
        e.preventDefault();
        var newText = document
            .getElementById('editCommentTextArea')
            .value;
        document
            .getElementById('editCommentTextArea')
            .value = '';
        console.log('[Comment] - edit comment. new text: ', newText);
        this.toggleShowEditComment();
        console.log("actions: " ,this.props)
        this
            .props
            .actions
            .editComment({commentID: this.props.comment._id, newCommentText: newText})
    }

    flagComment() {
        this.props.actions.flagComment({commentID: this.props.comment._id})
    }
    
    /**
     * Method called when the user clicks submit reply.
     * 
     * This method then calls the `postReply` method passed down as a prop.
     * 
     * @param {Object} e Event object passed from the `onClick` listener
     */
    submitRepsonse(e) {
        e.preventDefault();
        if (!this.state.currentUser) {
            this.setState({submitError: true});
            return;
        }
        this
            .props
            .actions
            .submitReply({reply: this.state.replyText, commentID: this.props.comment._id, submissionID: this.props.comment.submission});
    }

    /**
     * Listener for changes in the reply text field. Sets the state.replyText value
     * @param {Object} e Event object passed from the `onChange` listener
     */
    replyTextChanged(e) {
        this.setState({replyText: e.target.value})
    }

    /**Toggles the visibility of the reply text input field */
    toggleInsertReply() {
        this.setState({
            showInsertReply: !this.state.showInsertReply
        })
    }

    deleteComment() {
        console.log('[Comment] - delete comment clicked');
        alert('This hasn\'t been implemented yet' )
        this.toggleDeleteModal();
    }

    /**Toggles thi visibility of the comment deletion modal */
    toggleDeleteModal() {
        console.log('[Comment] - toggle delete modal: ', this.state.deleteModalOpen);
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    render() {
        return (
            <div className='comment'>
                <Modal
                    isOpen={this.state.deleteModalOpen}
                    contentLabel='Delete Comment'
                    className='overlay'>
                    <div className='my-modal'>
                        <div className='modal-header'>
                            <h1 className='modal-title'>Delete Comment</h1>
                        </div>
                        <div className='modal-body'>
                            <p className='text-center'>Are you sure you want to delete this comment?</p>
                            <ul className='button-row'>
                                <li>
                                    <button onClick={this.toggleDeleteModal} className='alt'>Cancel</button>
                                </li>
                                <li>
                                    <button onClick={this.deleteComment}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Modal>
                <div className='comment-side'>
                    <div className='comment-avatar'>
                        <a href={'/user/' + this.state.author._id}>
                            <img src={this.state.author.avatar} alt="Author avatar"/>
                        </a>
                    </div>

                    {/* <div className='comment-score'>{this.state.comment.score}</div>

                    <ul className='comment-vote'>
                        <li>
                            {this.props.currentUser && this
                                .props
                                .currentUser
                                .upvotes
                                .indexOf(this.props.comment._id) > -1
                                ? <a onClick={this.upvote} className='active'>
                                        <ThumbsUp/>
                                    </a>
                                : <a onClick={this.upvote}>
                                    <ThumbsUp/>
                                </a>}
                        </li>
                        <li>
                            {this.props.currentUser && this
                                .props
                                .currentUser
                                .downvotes
                                .indexOf(this.props.comment._id) > -1
                                ? <a onClick={this.downvote} className='active'>
                                        <ThumbsDown/>
                                    </a>
                                : <a onClick={this.downvote}>
                                    <ThumbsDown/>
                                </a>}
                        </li>
                    </ul> */}
                </div>

                <div className='comment-main'>
                    <div className='comment-header'>
                        <a href={'/user/' + this.state.author._id}>
                            {this.state.author.name}
                        </a>
                        <span className='time'>
                            <Time value={this.state.comment.timestamp} relative/>
                        </span>
                        {/* {this.state.comment.flagged
                            ? <FlagIcon/>
                            : <a onClick={this.flagComment}>
                                <FlagIcon/>
                            </a>} */}
                        <a onClick={this.flagComment}>
                            <FlagIcon/>
                        </a>

                    </div>

                    <div className='comment-body'>
                        <Markdown disallowedTypes={['headings']} source={this.state.comment.content}/>
                        <div>
                            {this.state.comment.edited
                                ? <p className='edited-tag'>Edited {' '}<Time value={this.state.comment.editedDate} relative/></p>
                                : null}
                        </div>

                    </div>

                    <div className='comment-footer'>
                        <ul className='options'>
                            {!this.state.isReply
                                ? <div>{this.state.showInsertReply
                                            ? <div>
                                                    <li>
                                                        <a onClick={this.toggleInsertReply}>Close</a>
                                                    </li>
                                                </div>
                                            : <div>
                                                <li>
                                                    <a onClick={this.toggleInsertReply}>Reply</a>
                                                </li>
                                            </div>}
                                    </div>
                                : null}

                            {/* TODO: insert edit and delete options */}
                            {this.state.currentUser && this.state.currentUser._id === this.state.comment.author
                                ? <div>
                                        <a onClick={this.toggleShowEditComment}>
                                            <EditIcon/>
                                        </a>
                                        {/* <a onClick={this.toggleDeleteModal}>
                                            <DeleteIcon/>
                                        </a> */}
                                    </div>
                                : null}
                        </ul>
                    </div>

                    {this.state.showInsertReply && !this.state.isReply
                        ? <div className='comment-reply'>
                                <form>
                                    <textarea
                                        placeholder='You can use markdown here...'
                                        onChange={this.replyTextChanged}></textarea>

                                    <div className='post-reply'>
                                        <button onClick={this.submitRepsonse} disabled={this.state.replyText === ''}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        : null}
                    {this.state.showEditComment
                        ? <div className='comment-reply'>
                                <form>
                                    <textarea id='editCommentTextArea' placeholder='You can use markdown here...' defaultValue={this.state.comment.content}></textarea>

                                    <div className='post-reply'>
                                        <button onClick={this.editComment} disabled={this.state.replyText === ''}>
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>
                        : null}

                    {/*Render all replies for this comment*/}
                    {this.state.replies
                        ? <ReplyList
                                replies={this.state.replies}
                                authors={this.state.authors}
                                currentUser={this.props.currentUser}
                                upvote={this.props.upvoteReply}
                                downvote={this.props.downvoteReply}/>
                        : null}
                </div>

            </div>
        )
    }
}

export default Comment;