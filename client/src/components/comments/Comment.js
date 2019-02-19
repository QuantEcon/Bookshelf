import React, {Component} from 'react';
import PropTypes from 'prop-types'
import FlagIcon from 'react-icons/lib/md/flag';
import EditIcon from 'react-icons/lib/md/edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import AlertCircledIcon from 'react-icons/lib/io/alert-circled';
import Modal from 'react-modal'
import MarkdownRender from '@nteract/markdown'
import Time from 'react-time';
import ReplyList from './ReplyList';
import {Link} from 'react-router-dom';
import avatarPlaceHolder from '../../assets/img/avatar/10.jpg';

/**
 * Component to render all data for a Comment. The {@link CommentsThread} component passes
 * all neccessary data down to this component.
 *
 * Children: {@link ReplyList}
 */
 const flaggedReasons = {
     'inappropriate': 'Inappropriate Content',
     'spam': 'Spam',
     'copyright': 'Copyright Issue',
     'other': 'Other'
 }

class Comment extends Component {

    /**
     * @prop {Object} comment Comment object from the database
     * @prop {Array} replies Array of comment objets representing the replies to this comment
     * @prop {Object} author Data for the author of the comment
     * @prop {Array} authors Data for all authors of the replies to this comment
     * @prop {Object} currentUser Data representing the current user. If no user is signed in,
     * this will be `null`
     * @prop {func} editComment Method called when the user clicks "Edit"
     * @prop {func} deleteComment Method called when the user clicks "Delete"
     * @prop {bool} isReply Boolean flag if the comment is a reply or not. If true, replying to
     * this comment is disabled
     */
    static propTypes = {
        comment: PropTypes.object.isRequired,
        replies: PropTypes.array,
        author: PropTypes.object.isRequired,
        authors: PropTypes.array,
        currentUser: PropTypes.object,
        editComment: PropTypes.func,
        deleteComment: PropTypes.func,
        isReply: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment,
            replies: props.replies,
            author: props.author ? props.author : props.currentUser,
            showInsertReply: false,
            showEditComment: false,
            showError: false,
            authors: props.authors,
            currentUser: props.currentUser,
            isReply: props.isReply,
            modalIsOpen: false,
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
        this.flagComment = this
            .flagComment
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.openModal = this
            .openModal
            .bind(this);
        this.closeModal = this
            .closeModal
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);

    }

    componentWillReceiveProps(props) {
        console.log('[Comment] - received new props: ', props);
        this.setState({
            comment: props.comment,
            replies: props.replies,
            author: props.author,
            showInsertReply: false,
            showError: false,
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
        var newText = document.getElementById('editCommentTextArea').value;
        document.getElementById('editCommentTextArea').value = '';

        this.toggleShowEditComment();
        this.props.actions.editComment({commentID: this.props.comment._id, newCommentText: newText});
    }

    /* modal for flagging comments */
    openModal = () => {
      this.setState({modalIsOpen: true});
    }

    closeModal = () => {
      this.setState({modalIsOpen: false});
      this.setState({value:''});
    }

    // flagged comment reason 
    flagComment(flaggedReason) {
        this.props.actions.flagComment({commentID: this.props.comment._id, flaggedReason: flaggedReason});
    }

    // flagged comment click method
    flagClick = () => {
        this.openModal();
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({modalIsOpen: false});
      var flaggedReason = flaggedReasons[this.state.flaggedReason]
      this.flagComment(flaggedReason);
    }

    handleChange = (event) => {
      this.setState({flaggedReason: event.target.value});
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
      if(this.state.currentUser) {
        this.setState({
            showInsertReply: !this.state.showInsertReply
        })
      }
      else {
        // show error if user is not logged in
        this.setState({
          showError: true
        });
      }
    }

    deleteComment() {
        console.log('[Comment] - delete comment clicked');
        let submissionID = this.props.comment.submission
        if (!this.props.comment.submission) {
            submissionID = this.props.location.pathname.split('/')[2];
        }
        this
            .props
            .actions
            .deleteComment({commentID: this.props.comment._id, submissionID})
        this.toggleDeleteModal();
    }

    /**Toggles the visibility of the comment deletion modal */
    toggleDeleteModal() {
        console.log('[Comment] - toggle delete modal: ', this.state.deleteModalOpen);
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    render() {
        return (
            <div className='comment'>
                {/* Modal window for deleting comment */}
                <Modal 
                    isOpen={this.state.deleteModalOpen} 
                    className="modal-alert" 
                    contentLabel="Delete Comment">
                    <div className="modal">
                        <div className="modal-header">
                        <h1 className='modal-title'>Delete Comment</h1>
                        </div>
                        <div className="modal-body">
                        <p><strong>Are you sure you want to delete this comment?</strong></p>
                        <ul className="options">
                            <li>
                            <a className='alt' onClick={this.toggleDeleteModal}>Cancel</a>
                            </li>
                            <li>
                            <a onClick={this.deleteComment}>Delete</a>
                            </li>
                        </ul>
                        <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.deleteComment}><span aria-hidden="true">×</span></button>
                        </div>
                    </div>
                </Modal>
                <div className='comment-side'>
                    <div className='comment-avatar'>
                        <a href={'/user/' + this.state.author._id}>
                            {this.state.author.deleted ? <img src={avatarPlaceHolder} alt="Author avatar"/> :
                            <img src={this.state.author.avatar} alt="Author avatar"/>}
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
                    <Modal
                     isOpen={this.state.modalIsOpen}
                     onRequestClose={this.closeModal}
                     className="modal-alert"
                     contentLabel="Example Modal"
                     shouldCloseOnOverlayClick={false}>
                     <form onSubmit={this.handleSubmit}>
                       <div className="modal">
                         <div className="modal-header">
                           <h1 className='modal-title'>Report the Comment</h1>
                         </div>
                         <div className="modal-body">
                           <p><strong>Why would you like to report the content ?</strong></p>
                            <label>
                              <select value={this.state.flaggedReason} onChange={this.handleChange} required>
                                <option value="inappropriate" selected>Inappropriate Content</option>
                                <option value="spam" >Spam</option>
                                <option value="copyright">Violates Copyright</option>
                                <option value="other">Other</option>
                              </select>
                            </label>
                           <ul className="options">
                             <li>
                               <a className='alt' onClick={this.closeModal}>Cancel</a>
                             </li>
                             <li>
                               <a onClick={this.handleSubmit}>Yes</a>
                             </li>
                           </ul>
                           <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.closeModal}><span aria-hidden="true">×</span></button>
                         </div>
                       </div>
                     </form>
                   </Modal>
                    <div className='comment-header'>
                        <a href={'/user/' + this.state.author._id}>
                            {this.state.author.deleted ? 'deleted' : this.state.author.name}
                        </a>
                        <span className='time'>
                            <Time value={this.state.comment.timestamp} relative/>
                        </span>
                        <a onClick={this.flagClick}>
                            <FlagIcon/>
                        </a>
                    </div>

                    <div className='comment-body'>
                        {this.props.error ? <div className='error-div'>
                            <p className='error-text'><AlertCircledIcon/> Comment update failed. Please try again</p>
                        </div>: ''}
                        <MarkdownRender
                          disallowedTypes={['heading']}
                          source={this.state.comment.content
                          ? this.state.comment.content
                          : '*No comment*'}/>
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

                                      :
                                          <div>
                                              <li>
                                                  <a onClick={this.toggleInsertReply}>Reply</a>
                                              </li>
                                          </div>
                                      }
                                    </div>
                                : null}

                            {/* TODO: insert edit and delete options */}
                            {this.state.currentUser && this.state.currentUser._id === this.state.comment.author
                                ? <div>
                                        <a onClick={this.toggleShowEditComment}>
                                            <EditIcon/>
                                        </a>
                                        <a onClick={this.toggleDeleteModal} className='ml-6'>
                                            <DeleteIcon/>
                                        </a>
                                    </div>
                                : null}
                        </ul>

                    </div>
                    {/*Display the sign in error message if user is not logged in*/}
                    {this.state.showError && !this.state.currentUser
                       ? <p className="error-help-text">
                               You must
                               {' '}<Link to='/signin'>sign in</Link>{' '}
                               to reply
                           </p>
                       : null}

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
                                location={this.props.location}
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
