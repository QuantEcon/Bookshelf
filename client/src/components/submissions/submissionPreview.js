import React, {Component} from 'react';

import Time from 'react-time';

import Markdown from 'react-markdown';

class SubmissionPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submission: props.submission,
            author: props.author
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            submission: nextProps.submission,
            author: nextProps.author
        });
    }

    render() {
        return (
            <div className="notebook-summary">

                <div className="specs">
                    <h3 className="title">
                        <a href={"/submission/" + this.state.submission._id}>{this.state.submission.title}</a>
                    </h3>
                    <p className="date">
                        Published {' '}<Time value={this.state.submission.published} relative/>{' '}
                        by
                        <a href="/user/authorid">
                            {' '}{this.state.author.name}{' '}
                        </a>
                        in
                        <a>{' '}{this.state.submission.lang}</a>
                    </p>
                    <Markdown source={this.state.submission.summary?this.state.submission.summary:'*No summary*'} className='short'/>
                </div>

                <p className="avatar">
                    <a>
                        <img src={this.state.author.avatar} alt="Author avatar"/>
                    </a>
                </p>
                <div className="stats">
                    <a href="/notebook/">
                        <ul>
                            <li className="views">
                                <span className="count">{this.state.submission.views}</span>
                                Views</li>
                            <li className="comments">
                                <span className="count">{this.state.submission.totalComments}</span>
                                Comments
                            </li>
                            <li className="votes">
                                <span className="count">{this.state.submission.score}</span>
                                Votes</li>
                        </ul>
                    </a>
                </div>
            </div>
        )
    }
}

export default SubmissionPreview;