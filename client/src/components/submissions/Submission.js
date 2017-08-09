import React, {Component} from 'react';

import Markdown from 'react-markdown';
import Time from 'react-time';
// import Linkify from 'react-linkify';
import NotebookPreview from '@nteract/notebook-preview';
import '@nteract/notebook-preview/styles/main.css';
import '@nteract/notebook-preview/styles/theme-light.css';
import 'codemirror/lib/codemirror.css';

import {transforms, displayOrder} from '@nteract/transforms-full';

//Icons
import ThumbsUp from 'react-icons/lib/md/thumb-up'
import ThumbsDown from 'react-icons/lib/md/thumb-down'
import Gear from 'react-icons/lib/fa/cog'

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
    }

    // componentWillReceiveProps(props) {     console.log('[Submission] - received
    // new props: ', props);     // console.log('Did upvote: ',
    // this.props.currentUser &&
    // this.props.currentUser.upvotes.indexOf(this.props.submissionID) > -1)     //
    // if(this.props.currentUser){     //     console.log('Upvotes: ',
    // this.props.currentUser.upvotes);     // } }

    upvote() {
        console.log('upvote: ', this.props.submissionID);
        this
            .props
            .actions
            .upvoteSubmission({submissionID:this.props.submissionID});
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

    encounteredURI(uri) {
        console.log('encountered uri in markdown: ', uri);
    }

    toggleView() {
        this.setState({
            showNotebook: !this.state.showNotebook
        });
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
                                        {!this.props.isLoading && this.props.myID && this.props.myID === this.props.submission.data.author._id
                                            ? <ul className='details-options'>
                                                    <li>
                                                        <a>
                                                            <Gear/>
                                                        </a>
                                                    </li>
                                                </ul>
                                            : null}

                                        <ul className='topics'>
                                            {/*Repeat for each topic in list*/}
                                        </ul>

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
                                                        <a href={'/user/' + this.props.submission.data.author._id}><img src={this.props.submission.data.author.avatar} alt="Author avatar"/></a>
                                                    </p>
                                                : <p>loading</p>}
                                        </div>
                                        <div className='main'>
                                            <ul className='specs'>
                                                <li>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span>Author: {' '}</span>
                                                                <a href={'/user/' + this.props.submission.data.author._id}>{this.props.submission.data.author.name}</a>
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
                                                <NotebookPreview
                                                    notebook={this.props.submission.data.notebookJSON}
                                                    transforms={transforms}
                                                    displayOrder={displayOrder}/>
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
                                                downvote={this.props.actions.downvoteCom}
                                                upvote={this.props.actions.upvoteCom}/>
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