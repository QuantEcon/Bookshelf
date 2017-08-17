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

//Components
import HeadContainer from '../../containers/HeadContainer';
class Preview extends Component {
    constructor(props) {
        super(props)
        this.onCancel = this
            .onCancel
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    onCancel() {
        console.log('[Preview] - clicked cancel');
        this
            .props
            .cancel()
    }

    onSubmit() {
        console.log('[Preview] - clicked submit');
        if(this.props.isEdit){
            this.props.save();
        } else {
            this
                .props
                .confirm()
        }
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

                                    <a>
                                        <ThumbsUp/>
                                    </a>

                                    {!this.props.isLoading
                                        ? <span className='score'>{this.props.submission.score}</span>
                                        : <p>loading</p>}

                                    <a>
                                        <ThumbsDown/>
                                    </a>

                                </div>

                                {/*TODO: Admin options*/}

                            </div>
                            <div className='details-main'>

                                <div className='details-header'>

                                    <div className='details-title'>

                                        {!this.props.isLoading
                                            ? <h1 className='title'>{this.props.submission.title}</h1>
                                            : <p>loading...</p>}

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
                                                                <span className='count'>0</span>
                                                                Views
                                                            </div>
                                                        : <p>Loading...</p>}
                                                </li>
                                                <li className='comments'>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span className='count'>0</span>
                                                                Comments
                                                            </div>
                                                        : <p>loading...</p>}
                                                </li>
                                                <li className='votes'>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span className='count'>0</span>
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
                                            ? <div>
                                                    {this.props.submission.summary
                                                        ? <Markdown
                                                                source={this.props.submission.summary}
                                                                transformLinkUri={this.encounteredURI}/>
                                                        : null}
                                                </div>
                                            : <p>loading...</p>}

                                    </div>
                                    <div className='details-secondary'>
                                        <div className='side'>
                                            {!this.props.isLoading
                                                ? <p className='avatar'>
                                                        <a href={'/user/' + this.props.author._id}><img src={this.props.author.avatar} alt="Author avatar"/></a>
                                                    </p>
                                                : <p>loading</p>}
                                        </div>
                                        <div className='main'>
                                            <ul className='specs'>
                                                <li>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                <span>Author: {' '}</span>
                                                                <a href={'/user/' + this.props.author._id}>{this.props.author.name}</a>
                                                            </div>
                                                        : <p>loading...</p>}

                                                </li>
                                                <li>
                                                    <span>Co-Authors:</span>
                                                    {!this.props.isLoading && this.props.submission.coAuthors && this.props.submission.coAuthors.length
                                                        ? <a>co-author name</a>
                                                        : <div>None</div>}
                                                </li>
                                                <li>
                                                    <span>Language:</span>
                                                    {/*TODO: Link to homepage with language search query*/}
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                {' '}<a>{this.props.submission.lang}</a>
                                                            </div>

                                                        : <p>loading...</p>}

                                                </li>
                                                <li>
                                                    <span>Published:</span>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                {/* {' '}<Timestamp time={this.props.submission.data.notebook.published} format='date'/> */}
                                                                <Time value={this.props.submission.published} format='d MMM YYYY'/>
                                                            </div>
                                                        : <p>loading...</p>}

                                                </li>
                                                <li>
                                                    <span>Last update:</span>
                                                    {!this.props.isLoading
                                                        ? <div>
                                                                {/* {' '}<Timestamp time={this.props.submission.data.notebook.lastUpdated} format='date'/> */}
                                                                {this.props.submission.lastUpdated
                                                                    ? <Time value={this.props.submission.lastUpdated} format='d MMM YYYY'/>
                                                                    : <Time value={this.props.submission.published} format='d MMM YYYY'/>}
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
                                    <div>
                                        <NotebookPreview
                                            notebook={this.props.submission.notebookJSON}
                                            transforms={transforms}
                                            displayOrder={displayOrder}/>
                                    </div>
                                </div>}
                        </div>
                        <ul className="button-row">
                            <li>
                                <a className="alt" onClick={this.onCancel}>Cancel</a>
                            </li>
                            <li>
                                <button onClick={this.onSubmit}>
                                    {this.props.isEdit
                                    ? 'Save'
                                    : 'Submit'}
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default Preview
