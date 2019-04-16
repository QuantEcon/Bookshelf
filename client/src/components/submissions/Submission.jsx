import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'

// import {MarkdownRender} from '../MarkdownMathJax';
import MarkdownRender from '@nteract/markdown'
import Time from 'react-time';
import {NavLink, Link, Route, Switch} from 'react-router-dom'
import Modal from 'react-modal'
import {typesetMath} from "mathjax-electron"
import LazyLoad from 'react-lazyload';
import FileSaver from 'file-saver'

//Icons
import ThumbsUp from 'react-icons/lib/md/thumb-up'
import ThumbsDown from 'react-icons/lib/md/thumb-down'
// import GearIcon from 'react-icons/lib/fa/cog'
import DeleteIcon from 'react-icons/lib/md/delete';
import FlagIcon from 'react-icons/lib/md/flag'

//Components
import HeadContainer from '../../containers/HeadContainer';
import CommentsThread from '../comments/CommentsThread'
import Breadcrumbs from '../partials/Breadcrumbs'
import MetaTags from '../partials/MetaTags.jsx';
import Notebook from '../partials/Notebook.jsx';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import axios from 'axios';
import trimText from '../../utils/trimText';

const editStyle = {
  paddingTop:'2.5px',
  paddingBottom:'2.5px'
};

const flaggedReasons = {
    'inappropriate': 'Inappropriate Content',
    'spam': 'Spam',
    'copyright': 'Copyright Issue',
    'other': 'Other'
}

/**
 * Renders all data for the specified submission. The parent container ({@link SubmissionContainer}) retrieves
 * the necessary data from Redux and passes it to this component
 *
 * Children: {@link CommentsThread}
 */
class Submission extends Component {
    /**
     * @prop {Object}   actions         Contains all redux actions for the submission page (voting, commenting, etc...)
     * @prop {Object}   submission      Contains all data necessary to render the submission, (notebook, title, author, comments, etc...)
     *                                  This is obtained from the API and passed to the component via Redux
     * @prop {boolean}  isLoading       Flag to tell react if the data is still being loaded from the API
     * @prop {Object}   currentUser     Object containing the current user's information. If there is no user signed in, it will be `null`
     * @prop {Object}   history         Needed for navigation. Passed from the Submission Container

     */
    static propTypes = {
        actions: PropTypes.object.isRequired,
        submission: PropTypes.object,
        isLoading: PropTypes.bool,
        currentUser: PropTypes.object,
        history: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);

        this.state = {
            flipper: true,
            deleteModalOpen: false,
            flaggedReason: 'inappropriate',
            modalIsOpen: false,
						summary: null,
						firstHalfSummary: null,
						readMore: false,
						readLess: false,
            testing: [],
        }

        console.log('[Submission Information] - fetching about submission');

        axios.get('/api/submit/edit-submission').then(resp =>{
          console.log('[Submission Information] - returned resp: ', resp.body);
        })

        if(window.location.href.indexOf("comment") > -1) {
          this.state.showNotebook = false
        } else {
            this.state.showNotebook = true
        }

        this.toggleView = this
            .toggleView
            .bind(this);
        this.upvote = this
            .upvote
            .bind(this);
        this.downvote = this
            .downvote
            .bind(this);
        this.onSubmitComment = this
            .onSubmitComment
            .bind(this);
        this.download = this
            .download
            .bind(this);
        this.submitReply = this
            .submitReply
            .bind(this);
        this.printProps = this
            .printProps
            .bind(this);
        this.toggleDeleteModal = this
            .toggleDeleteModal
            .bind(this);
        this.deleteSubmission = this
            .deleteSubmission
            .bind(this);
        this.deleteCallback = this
            .deleteCallback
            .bind(this)
        this.renderMathJax = this
            .renderMathJax
            .bind(this)
        this.openModal = this
            .openModal
            .bind(this);
        this.closeModal = this
            .closeModal
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
						.bind(this);
				this.readBefore = this.readBefore.bind(this);
				this.readAfter = this.readAfter.bind(this);
				this.toggleReadMore = this.toggleReadMore.bind(this);
    }

    componentDidMount() {

        this.forceUpdate();
        // Wait half a second for things to load, then render mathjax
        console.log('[Submission] - props: ', this.props);
    
        setTimeout(() => {
            this.renderMathJax()
        }, 500);

        Modal.setAppElement('body');
    }

		readBefore = (summary) => {
			let textArray = trimText(summary, 100, 200, 500);
			return textArray[0];
		} 

		readAfter = (summary) => {
			let textArray = trimText(summary, 100, 200, 500);
			return textArray[1];
		} 

		toggleReadMore = () => {
			this.setState({
				readMore: !this.state.readMore
			});
		}

    renderMathJax(numTimes) {
        if(window.MathJax){
            console.log("Rendering math...")
            typesetMath(this.rendered)
        } else if(numTimes < 3){
            console.log("No mathjax")
            setTimeout(() => {
                this.renderMathJax(numTimes ? numTimes++ : 1)
            }, 500)
        } else {
            console.warn("Mathjax couldn't be loaded");
        }
    }


    componentWillReceiveProps(props) {
        this.setState({
            flipper: !this.state.flipper
        })
        this.forceUpdate();
    }

    printProps() {
        console.log('[Submission] - props: ', this.props);
    }

    download() {
        console.log('[Submission] - downloading notebook...');
        var file = new File([JSON.stringify(this.props.submission.data.notebookJSON)], this.props.submission.data.fileName, {type: 'text/plain'});
        FileSaver.saveAs(file)
    }

    /**
     * Dispatches an upvote submission action
     */
    upvote() {
        this
            .props
            .actions
            .upvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click : changes on line 237 solves this problem
    }
    /**
     * Dispatches a downvote submission action
     */
    downvote() {
        this.props.actions.downvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click : changes on line 253 solves the problem
    }

    flagSubmission = (flaggedReason) => {
        console.log("[Submission] - flag submission clicked: ", flaggedReason)
        this.props.actions.flagSubmission({submissionID: this.props.submission.data.notebook._id, flaggedReason:flaggedReason})
    }

    flagClick = () => {
        console.log('in inviteClick method');
        this.openModal();
    }

    encounteredURI(uri) {
        console.log('encountered uri in markdown: ', uri);
    }

    /**
     * Dispatches a submit comment action
     * @param {String} comment Text of the new comment entered in the form
     */
    onSubmitComment(comment) {
        this
            .props
            .actions
            .submitComment(this.props.submissionID, comment);
    }

    /**
     *
     * @param {Object} param0
     * @param {String} param0.reply Text of the reply entered in the form
     * @param {String} param0.commentID ID of the comment being replied to
     */
    submitReply({reply, commentID}) {
        this.props.actions.submitReply({reply, commentID, submissionID: this.props.submissionID})
    }

    /**
     * Toggles the view between the notebook and the comments thread
     */
    toggleView() {
        this.setState({
            showNotebook: !this.state.showNotebook
        });
    }

    /**
     * Toggles the visiblity of the delete submission modal
     */
    toggleDeleteModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    /**
     * Dispatches a delete submission action, then closes the modal. Once the action
     * is completed `deleteCallback` will be called
     */
    deleteSubmission() {
        console.log('[Submission] - delete submission clicked');
        this
            .props
            .actions
            .deleteSubmission(this.props.submissionID, this.deleteCallback);
        this.toggleDeleteModal();
    }

    /**
     * Called by redux after the call to the api compeletes. If there was an error
     * deleting the submission, `successful` will be false, otherwise, it will be true.
     * @param {boolean} successful Deletion was successful or not
     */
    deleteCallback(successful) {
        console.log("Deletion callback: ", successful)
        // Redirect if successful
        if (successful) {
            console.log("Deletion successful")
            this.setState({showDeletionError: false})
            this.props.history.replace("/")

        } else { // display error message if unsuccessful
            console.error("Error deleting submission")
            this.setState({showDeletionError: true})
        }
    }

    /* modal for flagging Reason */
    openModal = () => {
      this.setState({modalIsOpen: true});
      console.log('state: ', this.state)
    }

    closeModal = () => {
      this.setState({modalIsOpen: false});
      this.setState({value:''});
    }

    handleChange = (event) => {
        console.log("event: ", event.target.value)
        this.setState({flaggedReason: event.target.value});

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({modalIsOpen: false});

        console.log("flaggedReasons: ", flaggedReasons)
        console.log("reason: ", this.state.flaggedReason)
        var flaggedReason = flaggedReasons[this.state.flaggedReason]

        console.log('flag option initiated: ', flaggedReason)
        console.log(this.state.value)

        this.setState({value:''}); //Reset state of modal

        this.flagSubmission(flaggedReason)

    }

    render() {
        return (
            <div>
                {!this.props.isLoading && this.props.submission.data && this.props.submission.data.notebook
                ?<MetaTags description={this.props.submission.data.notebook.summary} title={this.props.submission.data.notebook.title + " - QuantEcon Notes"}/>: null }
                <HeadContainer history={this.props.history}/>
                <Modal
                    isOpen={this.state.deleteModalOpen}
                    onRequestClose={this.toggleDeleteModal}
                    contentLabel='Delete Submission'
                    className='modal-alert'
                    shouldCloseOnOverlayClick={false}>
                    <div className="modal">
                      <div className="modal-header">
                        <h1 className='modal-title'>Delete Submission</h1>
                      </div>
                      <div className="modal-body">
                        <p><strong>Are you sure you want to delete this submission?</strong></p>
                        <ul className="options">
                          <li>
                            <a className='alt' onClick={this.toggleDeleteModal}>Cancel</a>
                          </li>
                          <li>
                            <a onClick={this.deleteSubmission}>Delete</a>
                          </li>
                        </ul>
                        <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.toggleDeleteModal}><span aria-hidden="true">×</span></button>
                      </div>
                    </div>
                </Modal>
                {!this.props.isLoading ? <Breadcrumbs title={this.props.submission.data.notebook.title}/> : null }
                {this.state.showDeletionError
                    ? <div className="alert callout">
                            <div className="container">
                                An error occurred while deleting the submission
                            </div>
                        </div>
                    : null}
                <div className='container'>

                    {/* TODO: extract to component? */}
                    <div className='details'>
                        <div className="details-side">
                            <div className="vote">
                                {/*TODO:Loading spinners?*/}

                               {this.props.currentUser && this
                                    .props
                                    .currentUser
                                    .upvotes
                                    .indexOf(this.props.submissionID) > -1
                                    ? <div>
                                    {this.props.isSignedIn
                                        ? <a title="This is a good submission" onClick={this.upvote} className='active'>
                                            <ThumbsUp/>
                                          </a>
                                        :<Link to='/signin'><ThumbsUp/></Link>
                                      }
                                      </div>
                                    : <div>
                                     {this.props.isSignedIn
                                        ? <a title="This is a good submission" onClick={this.upvote}>
                                        <ThumbsUp/>
                                        </a>
                                        :<Link to='/signin'><ThumbsUp/></Link>}
                                        </div>
                                        }

                                {!this.props.isLoading
                                    ? <span className='score'>{this.props.submission.data.notebook.score}</span>
                                    : <p>loading</p>}

                               {this.props.currentUser && this
                                    .props
                                    .currentUser
                                    .downvotes
                                    .indexOf(this.props.submissionID) > -1
                                    ? <div>
                                    {this.props.isSignedIn
                                            ? <a title="This submission could use some work" onClick={this.downvote} className='active'>
                                            <ThumbsDown/></a>
                                            : <Link to='/signin'><ThumbsDown/></Link>}
                                      </div>
                                    : <div>{
                                    this.props.isSignedIn
                                        ?
                                        <a title="This submission could use some work" onClick={this.downvote}>
                                        <ThumbsDown/>
                                        </a>
                                        :<Link to='/signin'><ThumbsDown/></Link>}
                                    </div>
                                    }
                            </div>

                            {/*TODO: Admin options*/}

                        </div>
                        <div className='details-main'>
                            <div className='details-header'>
                                <div className='details-title'>
                                    {!this.props.isLoading
                                        ? <h1 className='title'>{this.props.submission.data.notebook.title}</h1>
                                        : <p>loading...</p>}

                                    {/*TODO: check current user id == notebook.author*/}
                                    {!this.props.isLoading && (this.props.currentUser && this.props.currentUser._id === this.props.submission.data.author._id)
                                        ? <ul className='details-options'>
                                                <li>
                                                    <Link to={'/edit-submission/' + this.props.submissionID} style={editStyle}>Edit</Link>
                                                </li>
                                                <li>
                                                    <a onClick={this.toggleDeleteModal}><DeleteIcon/></a>
                                                </li>
                                            </ul>
                                        : null}
                                    <ul className='details-flag'>
                                        <li>
                                            {!this.props.isLoading && this.props.submission.data.flagged
                                            ?  <a onClick={this.flagClick} className="active"><FlagIcon/></a>
                                            :  <a onClick={this.flagClick}><FlagIcon/></a>}
                                             <Modal
                                              isOpen={this.state.modalIsOpen}
                                              onRequestClose={this.closeModal}
                                              className='modal-alert'
                                              contentLabel="Example Modal"
                                              shouldCloseOnOverlayClick={false}>
                                              <form onSubmit={this.handleSubmit}>
                                                <div className="modal">
                                                  <div className="modal-header">
                                                    <h1 className='modal-title'>Report the Content</h1>
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
                                                        <a onClick={this.handleSubmit}>Report</a>
                                                      </li>
                                                    </ul>
                                                    <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.closeModal}><span aria-hidden="true">×</span></button>
                                                  </div>
                                                </div>
                                              </form>
                                            </Modal>
                                        </li>
                                        <li>
                                            {this.props.currentUser && this.props.currentUser.isAdmin ? <div>{!this.props.isLoading && this.props.submission.data.deleted
                                                ?  <a onClick={this.toggleDeleteModal} className="active"><DeleteIcon/></a>
                                                :  <a onClick={this.toggleDeleteModal}><DeleteIcon/></a>} </div> : false }
                                        </li>
                                    </ul>
                                    {!this.props.isLoading
                                        ? <ul className='topics'>
                                                {this
                                                    .props
                                                    .submission
                                                    .data
                                                    .notebook
                                                    .topics
                                                    .map((topic, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link to={'/?topic=' + encodeURIComponent(topic)}>{topic}</Link>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        : null}

                                </div>

                                <div className='details-counts'>
                                    <div className='counts'>
                                        <ul>
                                            <li className='views'>
                                                {!this.props.isLoading
                                                    ? this.props.submission.data.notebook.views > 1 || this.props.submission.data.notebook.views === 0
                                                      ? <div>
                                                            <span className='count'>{this.props.submission.data.notebook.views + ' '}</span>
                                                            Views
                                                        </div>
                                                      : <div>
                                                            <span className='count'>{this.props.submission.data.notebook.views + ' '}</span>
                                                            View
                                                        </div>
                                                    : <p>Loading...</p>}
                                            </li>
                                            <li className='comments'>
                                                {!this.props.isLoading
                                                    ? this.props.submission.data.comments.length + this.props.submission.data.replies.length > 1 || this.props.submission.data.comments.length + this.props.submission.data.replies.length === 0
                                                      ? <div>
                                                            <span className='count'>{this.props.submission.data.comments.length + this.props.submission.data.replies.length}{' '}</span>
                                                            Comments
                                                        </div>
                                                      :<div>
                                                            <span className='count'>{this.props.submission.data.comments.length + this.props.submission.data.replies.length}{' '}</span>
                                                            Comment
                                                        </div>
                                                    : <p>loading...</p>}
                                            </li>
                                            <li className='votes'>
                                                {!this.props.isLoading
                                                    ? this.props.submission.data.notebook.score > 1 || this.props.submission.data.notebook.score === 0
                                                      ? <div>
                                                          <span className='count'>{this.props.submission.data.notebook.score}{' '}</span>
                                                            Votes
                                                          </div> :
                                                          <div>
                                                            <span className='count'>{this.props.submission.data.notebook.score}{' '}</span>
                                                              Vote
                                                          </div>
                                                  : <p>loading...</p>}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className='details-body'>
                                <div className='details-primary'>
                                    {!this.props.isLoading && this.state.firstHalfSummary !== undefined
                                        ? 	
																				<MarkdownRender
																					disallowedTypes={['heading']}
																					source={this.props.submission.data.notebook.summary
																					? this.props.submission.data.notebook.summary
																					: '*No summary*'}/>	
                                        : <p>loading...</p>}

                                </div>
                                <div className='details-secondary'>
                                    <div className='side'>
                                        {!this.props.isLoading
                                            ? <p className='avatar'>
                                                    <Link to={'/user/' + this.props.submission.data.author._id}><LazyLoad width={50}><img src={this.props.submission.data.author.avatar} alt="Author avatar"/></LazyLoad></Link>
                                                </p>
                                            : <p>loading</p>}
                                    </div>
                                    <div className='main'>
                                        <ul className='specs'>
                                            <li>
                                                {!this.props.isLoading
                                                    ? <div>
                                                            <span>Author: {' '}</span>
                                                            <Link to={'/user/' + this.props.submission.data.author._id}>{this.props.submission.data.author.name}</Link>
                                                        </div>
                                                    : <p>loading...</p>}

                                            </li>
                                            {/* <li>
                                                <div>
                                                <span>Co-Authors:</span>
                                                {!this.props.isLoading && this.props.submission.data.coAuthors.length
                                                    ? <div className="co-authors">
                                                        {this.props.submission.data.coAuthors.map((coAuthor) => {
                                                            if(coAuthor._id){
                                                                return <Link to={'/user/' + coAuthor._id}>{coAuthor.name}</Link>
                                                            } else {
                                                                return <a href={'mailto:' + coAuthor.email}>{coAuthor.email}</a>
                                                            }
                                                        })}
                                                    </div>
                                                    : <div>None</div>}
                                                </div>

                                            </li> */}
                                            <li>
                                                <span>Language:</span>
                                                {/*TODO: Link to homepage with language search query*/}
                                                {!this.props.isLoading
                                                    ? <div>
                                                            {' '}<Link to={'/?lang=' + this.props.submission.data.notebook.lang}>{this.props.submission.data.notebook.lang}</Link>
                                                        </div>

                                                    : <p>loading...</p>}

                                            </li>
                                            <li>
                                                <span>Published:</span>
                                                {!this.props.isLoading
                                                    ? <div>
                                                            <Time
                                                                value={this.props.submission.data.notebook.published}
                                                                format='D MMM YYYY'/>
                                                        </div>
                                                    : <p>loading...</p>}

                                            </li>
                                            <li>
                                                <span>Last update:</span>
                                                {!this.props.isLoading
                                                    ? <div>
                                                            {this.props.submission.data.notebook.lastUpdated !== undefined && this.props.submission.data.notebook.lastUpdated !== ' '
                                                                ?  <Time
                                                                      value={this.props.submission.data.notebook.lastUpdated}
                                                                      format='D MMM YYYY'/>
                                                                : <Time
                                                                    value={this.props.submission.data.notebook.published}
                                                                    format='D MMM YYYY'/>}
                                                        </div>
                                                    : <p>loading...</p>}

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='tile'>
                    <div>
                        <div className='tile-header'>
                            <ul className='tile-options'>
                                <li>
                                    <NavLink exact to={`/submission/${this.props.submissionID}`} activeClassName="active">Notebook</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={`/submission/${this.props.submissionID}/comments`} activeClassName="active">Comments { this.props.submission && this.props.submission.data && this.props.submission.data.comments && this.props.submission.data.comments.length ? <span>({this.props.submission.data.comments.length + this.props.submission.data.replies.length})</span>: ''}</NavLink>
                                </li>
                                <li>
                                    <a className='alt' onClick={this.download}>Download</a>
                                </li>
                            </ul>
                        </div>
                        <Switch>
                            <Route exact path='/submission/:submissionID' component={ () => {
                                return  <Notebook submission={this.props.submission} nbLoading={this.props.nbLoading}/>
                            }} />
                            { this.props.submission && this.props.submission.data?
                            <Route exact path='/submission/:submissionID/comments' component={ () => { return <CommentsThread 
                                comments={this.props.submission.data.comments}
                                replies={this.props.submission.data.replies}
                                commentAuthors={this.props.submission.data.commentAuthors}
                                postComment={this.onSubmitComment}
                                postReply={this.submitReply}
                                location={this.props.location}
                                currentUser={this.props.currentUser}
                                editComment={this.props.actions.editComment}/>}}/>
                                : <p>Loading</p> }
                        </Switch></div> </div>
                    </div>
                    {/* TODO: extract to Component? */}
                </div>
        )
    }
}

export default Submission;
