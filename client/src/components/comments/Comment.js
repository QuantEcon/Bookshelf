import React, {Component} from 'react';

import ThumbsUp from 'react-icons/lib/md/thumb-down';
import ThumbsDown from 'react-icons/lib/md/thumb-up';
import FlagIcon from 'react-icons/lib/md/flag';

import Markdown from 'react-markdown';
import Time from 'react-time';

import ReplyList from './ReplyList';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: props.comment,
            replies: props.replies,
            author: props.author,
            showInsertReply: false,
            authors: props.authors,
            currentUser: props.currentUser,
            isReply: props.isReply
        }

        this.toggleInsertReply = this
            .toggleInsertReply
            .bind(this)
    }

    toggleInsertReply() {
        this.setState({
            showInsertReply: !this.state.showInsertReply
        })
    }

    render() {
        return (
            <div className='comment'>
                <div className='comment-side'>
                    <div className='comment-avatar'>
                        <a href={'/user/' + this.state.author._id}>
                            <img src={this.state.author.avatar} alt="Author avatar"/>
                        </a>
                    </div>

                    <div className='comment-score'>{this.state.comment.score}</div>

                    <ul className='comment-vote'>
                        <li>
                            <a onClick={this.upvote}>
                                <ThumbsUp></ThumbsUp>
                            </a>
                        </li>
                        <li>
                            <a onClick={this.downvote}>
                                <ThumbsDown></ThumbsDown>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='comment-main'>
                    <div className='comment-header'>
                        <a href={'/user/' + this.state.author._id}>
                            {this.state.author.name}
                        </a>
                        <span className='time'>
                            <Time value={this.state.comment.timestamp} relative></Time>
                        </span>
                        <a onClick={this.flagComment}>
                            <FlagIcon/>
                        </a>
                    </div>

                    <div className='comment-body'>
                        <Markdown source={this.state.comment.content}/>
                        <div>
                            {this.state.comment.edited
                                ? <p className='edited-tag'><Time value={this.comment.editedDate} relative/></p>
                                : null}
                        </div>

                    </div>

                    <div className='comment-footer'>
                        <ul className='options'>
                            {this.state.showInsertReply && !this.state.isReply
                                ? <div>
                                        <li>
                                            <a onClick={this.toggleInsertReply}>Close</a>
                                        </li>
                                    </div>
                                : <div>
                                    <li>
                                        <a onClick={this.toggleInsertReply}>Reply</a>
                                    </li>
                                </div>}

                            {/* TODO: insert edit and delete options */}
                        </ul>
                    </div>

                    {this.state.showInsertReply && !this.state.isReply
                        ? <div className='comment-reply'>
                                <form>
                                    <textarea placeholder='You can use markdown here...'></textarea>

                                    <div className='post-reply'>
                                        <button onClick={this.submitRepsonse}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        : null}
                    {this.state.replies
                        ? <ReplyList replies={this.state.replies} authors={this.state.authors}/>
                        : null}
                </div>

            </div>
        )
    }
}

export default Comment;