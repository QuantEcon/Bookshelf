import React, {Component} from 'react';

import Markdown from 'react-markdown';
import Time from 'react-time';
import {Link} from 'react-router-dom'

// import Linkify from 'react-linkify';
import NotebookPreview from '@nteract/notebook-preview';
import '@nteract/notebook-preview/styles/main.css';
import '@nteract/notebook-preview/styles/theme-light.css';
import 'codemirror/lib/codemirror.css';
import fileDownload from 'react-file-download';

import {transforms, displayOrder} from '@nteract/transforms-full';

//Icons
import ThumbsUp from 'react-icons/lib/md/thumb-up'
import ThumbsDown from 'react-icons/lib/md/thumb-down'
import GearIcon from 'react-icons/lib/fa/cog'

//Components
import HeadContainer from '../../containers/HeadContainer';
import CommentsThread from '../comments/CommentsThread'

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotebook: true
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
        this.download = this
            .download
            .bind(this);
        this.submitReply = this
            .submitReply
            .bind(this);
        this.printProps = this
            .printProps
            .bind(this);
    }

    printProps() {
        console.log('[Submission] - props: ', this.props);
    }

    download() {
        console.log('[Submission] - downloading notebook...');
        fileDownload(JSON.stringify(this.props.submission.data.notebookJSON), this.props.submission.data.fileName)
    }

    upvote() {
        console.log('upvote: ', this.props.submissionID);
        this
            .props
            .actions
            .upvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    downvote() {
        console.log('downvote');
        this
            .props
            .actions
            .downvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    upvoteComment(commentID) {
        console.log('[Submission] - upvote comment: ', commentID);
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

    encounteredURI(uri) {
        console.log('encountered uri in markdown: ', uri);
    }

    onSubmitComment(comment) {
        console.log('[Submission] - submit new comment: ', comment);
        this
            .props
            .actions
            .submitComment(this.props.submissionID, comment);
    }

    submitReply({reply, commentID}) {
        console.log('[Submission] - reply and commentID:', reply, commentID)
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

    editSubmission() {
        console.log('[Submission] - edit submission clicked');
    }

    render() {
        return (
            <div>
                <HeadContainer/>
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
                                                                    <a>{topic}</a>
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
                                                    source={this.props.submission.data.notebook.summary}
                                                    transformLinkUri={this.encounteredURI}/>
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
                                                                {' '}<a>{this.props.submission.data.notebook.lang}</a>
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
                                                {/* {this.state.notebook.notebookJSON
                                                        ? <NotebookPreview notebook='../../assets/files/UN_demography.ipynb'/>
                                                        : null} */}
                                                <div id='notebook'>
                                                    <NotebookPreview
                                                        notebook={this.props.submission.data.notebookJSON}
                                                        transforms={transforms}
                                                        displayOrder={displayOrder}/>
                                                </div>
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
                                                postComment={this.onSubmitComment}
                                                postReply={this.submitReply}
                                                currentUser={this.props.currentUser}/>
                                        </div>}

                                </div>
}

                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default Submission;