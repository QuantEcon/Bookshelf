import React, {Component} from 'react';

import ThumbsUp from 'react-icons/lib/md/thumb-up';
import ThumbsDown from 'react-icons/lib/md/thumb-down';
import FlagIcon from 'react-icons/lib/md/flag';
import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';

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

        this.upvote = this
            .upvote
            .bind(this)
        this.downvote = this
            .downvote
            .bind(this);
        this.submitRepsonse = this
            .submitRepsonse
            .bind(this);
        this.replyTextChanged = this
            .replyTextChanged
            .bind(this);
        this.submitRepsonse = this
            .submitRepsonse
            .bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            comment: props.comment,
            replies: props.replies,
            author: props.author,
            showInsertReply: false,
            authors: props.authors,
            currentUser: props.currentUser,
            isReply: props.isReply
        })
    }

    replyText = '';

    upvote() {
        console.log('[Comment] - Upvote comment: ', this.props.comment._id);
        this
            .props
            .upvote(this.props.comment._id);
        this.forceUpdate();
    }

    downvote() {
        console.log('[Comment] - Downvote comment: ', this.props.comment._id);
        this
            .props
            .downvote(this.props.comment._id);
        this.forceUpdate();
    }

    submitRepsonse(e) {
        e.preventDefault();
        this
            .props
            .postReply({reply: this.state.replyText, commentID: this.props.comment._id});
    }

    replyTextChanged(e) {
        this.setState({replyText: e.target.value})
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
                            {this.props.currentUser && this
                                .props
                                .currentUser
                                .upvotes
                                .indexOf(this.props.comment._id) > -1
                                ? <a onClick={this.upvote} className='active'>
                                        <ThumbsUp/>
                                    </a>
                                : <a onClick={this.upvote}>
                                    <ThumbsUp/>
                                </a>}
                        </li>
                        <li>
                            {this.props.currentUser && this
                                .props
                                .currentUser
                                .downvotes
                                .indexOf(this.props.comment._id) > -1
                                ? <a onClick={this.downvote} className='active'>
                                        <ThumbsDown/>
                                    </a>
                                : <a onClick={this.downvote}>
                                    <ThumbsDown/>
                                </a>}
                        </li>
                    </ul>
                </div>

                <div className='comment-main'>
                    <div className='comment-header'>
                        <a href={'/user/' + this.state.author._id}>
                            {this.state.author.name}
                        </a>
                        <span className='time'>
                            <Time value={this.state.comment.timestamp} relative/>
                        </span>
                        {/* {this.state.comment.flagged
                            ? <FlagIcon/>
                            : <a onClick={this.flagComment}>
                                <FlagIcon/>
                            </a>} */}
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
                            {!this.state.isReply
                                ? <div>{this.state.showInsertReply
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
                                    </div>
                                : null}

                            {/* TODO: insert edit and delete options */}
                            {this.state.currentUser && this.state.currentUser._id === this.state.comment.author
                                ? <div>
                                        <a onClick={this.editComment}>
                                            <EditIcon/>
                                        </a>
                                        <a onClick={this.deleteComment}>
                                            <DeleteIcon/>
                                        </a>
                                    </div>
                                : null}
                        </ul>
                    </div>

                    {this.state.showInsertReply && !this.state.isReply
                        ? <div className='comment-reply'>
                                <form>
                                    <textarea
                                        placeholder='You can use markdown here...'
                                        onChange={this.replyTextChanged}></textarea>

                                    <div className='post-reply'>
                                        <button onClick={this.submitRepsonse} disabled={this.state.replyText === ''}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        : null}

                    {/*Render all replies for this comment*/}
                    {this.state.replies
                        ? <ReplyList replies={this.state.replies} authors={this.state.authors} currentUser={this.props.currentUser}/>
                        : null}
                </div>

            </div>
        )
    }
}

export default Comment;