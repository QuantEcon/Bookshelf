import React, {Component} from 'react';

import Markdown from 'react-markdown';
import Time from 'react-time';
import {Link} from 'react-router-dom'
import Modal from 'react-modal'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import 'normalize-css'
import 'typeface-source-code-pro'
import 'typeface-source-sans-pro'
import 'codemirror/lib/codemirror.css';
import '@nteract/notebook-preview/styles/main.css';
import '@nteract/notebook-preview/styles/theme-light.css'
import '../../assets/css/notebookPreview.css'

import NotebookPreview from '@nteract/notebook-preview';

import FileSaver from 'file-saver'

import {transforms, displayOrder} from '@nteract/transforms-full';

//Icons
import ThumbsUp from 'react-icons/lib/md/thumb-up'
import ThumbsDown from 'react-icons/lib/md/thumb-down'
import GearIcon from 'react-icons/lib/fa/cog'
import DeleteIcon from 'react-icons/lib/md/delete';

//Components
import HeadContainer from '../../containers/HeadContainer';
import CommentsThread from '../comments/CommentsThread'
import Breadcrumbs from '../partials/Breadcrumbs'
import NotebookFromHTML from '../NotebookFromHTML';

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotebook: true,
            flipper: true,
            deleteModalOpen: false
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
        this.upvoteComment = this
            .upvoteComment
            .bind(this);
        this.downvoteComment = this
            .downvoteComment
            .bind(this);
        this.upvoteReply = this
            .upvoteReply
            .bind(this);
        this.downvoteReply = this
            .downvoteReply
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
    }

    componentDidMount() {
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        if (props.submission.data) {
            document.title = props.submission.data.notebook.title
        }
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

    upvote() {
        this
            .props
            .actions
            .upvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    downvote() {
        this
            .props
            .actions
            .downvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    upvoteComment(commentID) {
        this
            .props
            .actions
            .upvoteComment({commentID, submissionID: this.props.submissionID});
    }

    downvoteComment(commentID) {
        this
            .props
            .actions
            .downvoteComment({commentID, submissionID: this.props.submissionID});
    }
    upvoteReply({replyID, commentID}) {
        this
            .props
            .actions
            .upvoteReply({commentID, replyID, submissionID: this.props.submissionID});
    }

    downvoteReply({replyID, commentID}) {
        this
            .props
            .actions
            .downvoteReply({commentID, replyID, submissionID: this.props.submissionID});
    }

    encounteredURI(uri) {
        console.log('encountered uri in markdown: ', uri);
    }

    onSubmitComment(comment) {
        this
            .props
            .actions
            .submitComment(this.props.submissionID, comment);
    }

    submitReply({reply, commentID}) {
        this
            .props
            .actions
            .submitReply({reply, commentID, submissionID: this.props.submissionID})
    }

    toggleView() {
        this.setState({
            showNotebook: !this.state.showNotebook
        });
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    deleteSubmission() {
        console.log('[Submission] - delete submission clicked');
        this
            .props
            .actions
            .deleteSubmission(this.props.submissionID);
        this.toggleDeleteModal();
    }

    render() {
        return (
            <div>
                <HeadContainer/>
                <Modal
                    isOpen={this.state.deleteModalOpen}
                    contentLabel='Delete Submission'
                    className='overlay'>
                    <div className='my-modal'>
                        <div className='modal-header'>
                            <h1 className='modal-title'>Delete Submission</h1>
                        </div>
                        <div className='modal-body'>
                            <p className='text-center'>Are you sure you want to delete this submission?</p>
                            <ul className='button-row'>
                                <li>
                                    <button onClick={this.toggleDeleteModal} className='alt'>Cancel</button>
                                </li>
                                <li>
                                    <button onClick={this.deleteSubmission}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Modal>
                {this.props.isLoading
                    ? null
                    : <Breadcrumbs title={this.props.submission.data.notebook.title}/>}
                <div className='row'>
                    <div className='column'>

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
                                        ? <a onClick={this.upvote} className='active'>
                                                <ThumbsUp/>
                                            </a>
                                        : <a onClick={this.upvote}>
                                            <ThumbsUp/>
                                        </a>}

                                    {!this.props.isLoading
                                        ? <span className='score'>{this.props.submission.data.notebook.score}</span>
                                        : <p>loading</p>}

                                    {this.props.currentUser && this
                                        .props
                                        .currentUser
                                        .downvotes
                                        .indexOf(this.props.submissionID) > -1
                                        ? <a onClick={this.downvote} className='active'>
                                                <ThumbsDown/>
                                            </a>
                                        : <a onClick={this.downvote}>
                                            <ThumbsDown/>
                                        </a>}
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
                                                        <Link to={'/edit-submission/' + this.props.submissionID}><GearIcon/></Link>
                                                    </li>
                                                    <li>
                                                        <a onClick={this.toggleDeleteModal}><DeleteIcon/></a>
                                                    </li>
                                                </ul>
                                            : null}
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
                                                        ? <div>
                                                                <span className='count'>{this.props.submission.data.notebook.views + ' '}</span>
                                                                Views
                                                            </div>
                                                        : <p>Loading...</p>}
                                                </li>
                                                <li className='comments'>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span className='count'>{this.props.submission.data.comments.length + this.props.submission.data.replies.length}{' '}</span>
                                                                Comments
                                                            </div>
                                                        : <p>loading...</p>}
                                                </li>
                                                <li className='votes'>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span className='count'>{this.props.submission.data.notebook.score}{' '}</span>
                                                                Votes
                                                            </div>
                                                        : <p>loading...</p>}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='details-body'>
                                    <div className='details-primary'>
                                        {!this.props.isLoading
                                            ? <Markdown
                                                    source={this.props.submission.data.notebook.summary
                                                    ? this.props.submission.data.notebook.summary
                                                    : '*No summary*'}/>
                                            : <p>loading...</p>}

                                    </div>
                                    <div className='details-secondary'>
                                        <div className='side'>
                                            {!this.props.isLoading
                                                ? <p className='avatar'>
                                                        <Link to={'/user/' + this.props.submission.data.author._id}><img src={this.props.submission.data.author.avatar} alt="Author avatar"/></Link>
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
                                                <li>
                                                    <span>Co-Authors:</span>
                                                    {!this.props.isLoading && this.props.submission.data.coAuthors.length
                                                        ? <a>co-author name</a>
                                                        : <div>None</div>}
                                                </li>
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
                                                                {/* {' '}<Timestamp time={this.props.submission.data.notebook.published} format='date'/> */}
                                                                <Time
                                                                    value={this.props.submission.data.notebook.published}
                                                                    format='d MMM YYYY'/>
                                                            </div>
                                                        : <p>loading...</p>}

                                                </li>
                                                <li>
                                                    <span>Last update:</span>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                {/* {' '}<Timestamp time={this.props.submission.data.notebook.lastUpdated} format='date'/> */}
                                                                {this.props.submission.data.notebook.lastUpdated
                                                                    ? <Time
                                                                            value={this.props.submission.data.notebook.lastUpdated}
                                                                            format='d MMM YYYY'/>
                                                                    : <Time
                                                                        value={this.props.submission.data.notebook.published}
                                                                        format='d MMM YYYY'/>}
                                                            </div>
                                                        : <p>loading...</p>}

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* TODO: extract to Component? */}
                        <div className='tile'>
                            {this.props.isLoading
                                ? <h3>Loading...</h3>
                                : <div>
                                    {this.state.showNotebook
                                        ? <div>
                                                <div className='tile-header'>
                                                    <h2 className='tile-title'>Notebook</h2>
                                                    <ul className='tile-options'>
                                                        <li>
                                                            <a className='active'>Notebook</a>
                                                        </li>
                                                        <li>
                                                            <a onClick={this.toggleView}>Comments</a>
                                                        </li>
                                                        <li>
                                                            <a className='alt' onClick={this.download}>Download</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                {this.props.submission.data.html
                                                    ? <NotebookFromHTML html={this.props.submission.data.html}/>
                                                    : <div id='notebook'>
                                                        <NotebookPreview
                                                            notebook={this.props.submission.data.notebookJSON}
                                                            transforms={transforms}
                                                            displayOrder={displayOrder}/>
                                                    </div>}

                                            </div>
                                        : <div>
                                            <div className='tile-header'>
                                                <h2 className='tile-title'>Comments</h2>
                                                <ul className='tile-options'>
                                                    <li>
                                                        <a onClick={this.toggleView}>Notebook</a>
                                                    </li>
                                                    <li>
                                                        <a className='active'>Comments</a>
                                                    </li>
                                                    <li>
                                                        <a className='alt' onClick={this.download}>Download</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <CommentsThread
                                                comments={this.props.submission.data.comments}
                                                replies={this.props.submission.data.replies}
                                                commentAuthors={this.props.submission.data.commentAuthors}
                                                downvote={this.downvoteComment}
                                                upvote={this.upvoteComment}
                                                upvoteReply={this.upvoteReply}
                                                downvoteReply={this.downvoteReply}
                                                postComment={this.onSubmitComment}
                                                postReply={this.submitReply}
                                                currentUser={this.props.currentUser}
                                                editComment={this.props.actions.editComment}/>
                                        </div>}
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Submission;