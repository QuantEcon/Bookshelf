import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {typesetMath} from "mathjax-electron"

import Time from 'react-time';

// import {MarkdownRender} from '../MarkdownMathJax';
import MarkdownRender from '@nteract/markdown'
import LazyLoad from 'react-lazyload';

class SubmissionPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submission: props.submission,
            author: props.author,
            limitSummary: '',
            maxStringLimit: null,
        }
        // this.renderMathJax = this.renderMathJax.bind(this);
        this.limitCharacter = this.limitCharacter.bind(this);
    }

    // Limit the number of characters for each submission preview in home page
    limitCharacter() {
      const maxLength = 50;
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
            const overMaxLimit = maxString + ' ...';
            this.setState({limitSummary: overMaxLimit });
        }
        else {
            this.setState({limitSummary: maxString });
        }
      }
    }

    // renderMathJax() {
    //     if(window.MathJax){
    //         console.log("Rendering math...")
    //         typesetMath(this.rendered)
    //     } else {
    //         console.log("No mathjax")
    //         this.renderMathJax()
    //     }
    // }

    componentDidMount() {
        // Call limitCharacter to display each submission summary
        this.limitCharacter();
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
        // {this.state.limitSummary = this.limitCharacter()}
   
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
                        {this.state.submission.totalComments || this.state.submission.views 
                            ? <span>
                                <span className="dot"></span>
                                   { this.state.submission.views ? <span>{this.state.submission.views} {this.state.submission.views > 1?<span>views</span>:<span>view</span>}</span> : ''}
                                   {this.state.submission.totalComments && this.state.submission.views ? <span style={{margin: '2px'}}><span className="dot" style={{margin: "2px 3px"}}></span></span>: ''}
                                   { this.state.submission.totalComments ? <span>{this.state.submission.totalComments} {this.state.submission.totalComments > 1?<span>comments</span>:<span>comment</span>}</span> : ''} 
                            </span> : 
                        ''}
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
                        <LazyLoad width={50}>
                            <img src={this.state.author.avatar} alt="Author avatar"/>
                        </LazyLoad>
                    </Link>
                </p> 
                {/* <div className="stats">
                    <ul>
                        <li className="views">
                            {this.state.submission.views > 1 || this.state.submission.views == 0?
                              <span className="count">{this.state.submission.views}<p className="stats display">Views</p></span> :
                              <span className="count">{this.state.submission.views}<p className="stats display">View</p></span>
                            }
                        </li>
                        <li className="comments">
                            {this.state.submission.totalComments > 1 || this.state.submission.totalComments == 0 ?
                              <span className="count">{this.state.submission.totalComments}<p className="stats display">Comments</p></span> :
                              <span className="count">{this.state.submission.totalComments}<p className="stats display">Comment</p></span>
                            }
                        </li>
                        <li className="votes">
                          {this.state.submission.score > 1 || this.state.submission.score == 0?
                            <span className="count">{this.state.submission.score}<p className="stats display">Votes</p></span> :
                            <span className="count">{this.state.submission.score}<p className="stats display">Vote</p></span>
                          }
                        </li>
                    </ul>
                </div> */}
            </div>
        )
    }
}

export default SubmissionPreview;
