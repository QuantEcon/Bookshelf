import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {typesetMath} from "mathjax-electron"

import Time from 'react-time';

// import {MarkdownRender} from '../MarkdownMathJax';
import MarkdownRender from '@nteract/markdown'

class SubmissionPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submission: props.submission,
            author: props.author,
            limitSummary: '',
        }
        this.renderMathJax = this.renderMathJax.bind(this);
    }

    limitCharacter() {
      const maxLength = 25;
      // Create an array storage to store the long summary
      const arr = []
      if (this.props.submission !== undefined) {
        // Push the summary into the array
        arr.push(this.props.submission.summary)
        // Splitting each word from the array
        const eachWord = arr[0].split(' ');
        // Retrieve the first 25 words
        const maxString = eachWord.splice(0,maxLength).join(' ');
        // If the length of the summary is greater than maxLength, then add ... at the end
        if(arr[0].split(' ').length > maxLength) {
          return maxString + ' ...'
        }
        else {
          return maxString;
        }
      }
    }

    renderMathJax() {
        if(window.MathJax){
            console.log("Rendering math...")
            typesetMath(this.rendered)
        } else {
            console.log("No mathjax")
            this.renderMathJax()
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderMathJax()
        }, 500);

        this.state.limitSummary = this.limitCharacter();

    }

    componentDidUpdate() {
        setTimeout(() => {
            typesetMath(this.rendered)
        }, 500)
    }

    componentWillReceiveProps(nextProps) {
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
                    <MarkdownRender
                        disallowedTypes={['heading']}
                        source={this.state.submission.summary
                        ? this.state.limitSummary
                        : '*No summary*'}
                        className='short'/> {/* This causes the original LaTex to remain */}
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
