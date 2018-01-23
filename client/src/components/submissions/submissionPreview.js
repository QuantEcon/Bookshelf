import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import Time from 'react-time';

import Markdown from 'react-markdown';

class SubmissionPreview extends Component {
    constructor(props) {
        super(props);
        console.log("[SubmissionPreview] - props:", props)
        this.state = {
            submission: props.submission,
            author: props.author
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("[SubmissionPreview] - next props: ", nextProps)
        this.setState({submission: nextProps.submission, author: nextProps.author});
    }

    render() {
        return (
            <div className="notebook-summary">

                <div className="specs">
                    <h3 className="title">
                        <Link to={'/submission/' + this.state.submission._id}>
                            {this.state.submission.title}
                        </Link>
                    </h3>
                    <p className="date">
                        Published {' '}<Time value={this.state.submission.published} relative/>{' '}
                        by

                        <Link to={'/user/' + this.state.author._id}>
                            {' '}{this.state.author.name}{' '}
                        </Link>

                        in
                        <Link to={'/?lang=' + this.state.submission.lang}>{' '}{this.state.submission.lang}</Link>
                        {this.state.submission.deletedDate
                        ? <span>
                            {' (deleted '} <Time value={this.state.submission.deletedDate} relative/>{')'}
                        </span>
                        : null}
                    </p>
                    <Markdown
                        disallowedTypes={['heading']}
                        source={this.state.submission.summary
                        ? this.state.submission.summary
                        : '*No summary*'}
                        className='short'/>
                </div>

                <p className="avatar">
                    <Link to={'/user/' + this.state.author._id}>
                        <img src={this.state.author.avatar} alt="Author avatar"/>
                    </Link>
                </p>
                <div className="stats">
                    <ul>
                        <li className="views">
                            <span className="count">{this.state.submission.viewers
                                    ? this.state.submission.viewers.length
                                    : 0}</span>
                            Viewers</li>
                        <li className="comments">
                            <span className="count">{this.state.submission.totalComments}</span>
                            Comments
                        </li>
                        <li className="votes">
                            <span className="count">{this.state.submission.score}</span>
                            Votes</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SubmissionPreview;