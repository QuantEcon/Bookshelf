import React, {Component} from 'react';
import HeadContainer from '../../containers/HeadContainer';
import UserPreview from '../user/UserPreview'
import SubmissionPreview from '../submissions/submissionPreview'
import Comment from '../comments/Reply'

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFlaggedUsers: true,
            showFlaggedSubmissions: true,
            showFlaggedComments: true,
        }

        this.foldFlaggedUsers = this.foldFlaggedUsers.bind(this)
        this.foldFlaggedSubmissions = this.foldFlaggedSubmissions.bind(this)
        this.foldFlaggedComments = this.foldFlaggedComments.bind(this)
    }
    removeSubmission = (submissionID) => {
        console.log("Remove submission clicked: ", submissionID)
    }

    removeUser = (userID) => {
        console.log("Remove user clicked: ", userID)
    }

    removeComment = (commentID) => {

    }

    unflagUser = (userID) => {
        console.log("Unflag user clicked: ", userID)
    }

    unflagComment = (commentID) => {

    }

    unflagSubmission = (submissionID) => {
        console.log("Unflag submission clicked: ", submissionID)
    }

    restoreSubmission = (submissionID) => {
        console.log("Restore submission clicked: ", submissionID)
    }

    foldFlaggedUsers = () => {
        this.setState({
            showFlaggedUsers: !this.state.showFlaggedUsers
        })
    }

    foldFlaggedSubmissions = () => {
        this.setState({
            showFlaggedSubmissions: !this.state.showFlaggedSubmissions
        })
    }

    foldFlaggedComments = () => {
        this.setState({
            showFlaggedComments: !this.state.showFlaggedComments
        })
    }

    render(){
        return(
            <div>
                <HeadContainer history={this.props.history}/>
                <div className='row'>
                    <div className='page-title'>
                        <h2 className='title-name'>
                            Admin
                        </h2>
                    </div>
                    <div className="container">
                        <div className='column'>
                            {this.props.isLoading
                                ? <h3>Loading...</h3>
                                :<div>
                                    {/* Flagged Users */}
                                    <div className="tile">
                                        <span className="section-header">
                                            <h2>
                                                Flagged Users ({this.props.flaggedUsers.length})
                                            </h2>
                                            {this.state.showFlaggedUsers
                                            ?<button onClick={this.foldFlaggedUsers} className="section-header-button">
                                                Hide
                                            </button>
                                            :<button onClick={this.foldFlaggedUsers} className="section-header-button">
                                                Show
                                            </button>
                                            }
                                            
                                        </span>
                                        {this.state.showFlaggedUsers
                                        ?
                                            <div className="summaries">
                                                {this.props.flaggedUsers.map((user, index) => {
                                                    return <div key={index}>
                                                        <UserPreview  user={user}/>
                                                        {/* TODO: add delete/remove buttons */}
                                                        <ul className="admin-button-row">
                                                            <li>
                                                                <button onClick={() => this.removeUser(user._id)}>
                                                                    Remove
                                                                </button>
                                                            </li>

                                                            {user.deleted 
                                                            ?   <li>
                                                                <button onClick={() => this.restoreUser(user._id)}>
                                                                    Restore
                                                                </button>
                                                            </li>
                                                            : null}

                                                            {user.flagged
                                                            ?<li>
                                                                <button onClick={() => this.unflagUser(user._id)}>
                                                                    Unflag
                                                                </button>
                                                            </li>
                                                            : null}
                                                        </ul>
                                                    </div>
                                                })}
                                            </div>
                                        : null}
                                    </div>
                                    {/* Flagged Submissions */}
                                    <div className="tile">
                                        <h2>Flagged Submissions ({this.props.flaggedSubmissions.length})</h2>
                                        {this.state.showFlaggedSubmissions
                                        ?<button onClick={this.foldFlaggedSubmissions}>Hide</button>

                                        :<button onClick={this.foldFlaggedSubmissions}>Show</button>
                                        }
                                            {this.state.showFlaggedSubmissions
                                            ?<div className="summaries">
                                                {this.props.flaggedSubmissions.map((submission, index) => {
                                                    return <div key={index}>
                                                        <SubmissionPreview submission={submission.data} author={submission.author}/>
                                                        {/* TODO: add delete/remove/edit buttons */}
                                                        <ul className="admin-button-row">
                                                            <li>
                                                                <button onClick={() => this.removeSubmission(submission.data._id)}>
                                                                    Remove
                                                                </button>
                                                            </li>

                                                            {submission.data.deleted 
                                                            ?   <li>
                                                                <button onClick={() => this.restoreSubmission(submission.data._id)}>
                                                                    Restore
                                                                </button>
                                                            </li>
                                                            : null}

                                                            {submission.data.flagged
                                                            ?<li>
                                                                <button onClick={() => this.unflagSubmission(submission.data._id)}>
                                                                    Unflag
                                                                </button>
                                                            </li>
                                                            : null}
                                                        </ul>
                                                    </div>
                                                })}
                                            </div>
                                            :null}
                                    </div>
                                    
                                    {/* Flagged Comments */}
                                    <div className="tile">
                                        <h2>Flagged Comments ({this.props.flaggedComments.length})</h2>
                                        {this.state.showFlaggedComments
                                        ?<button onClick={this.foldFlaggedComments}>Hide</button>
                                        :<button onClick={this.foldFlaggedComments}>Show</button>}
                                        
                                        {this.state.showFlaggedComments
                                        ?<div>
                                            {this.props.flaggedComments.map((comment, index) => {
                                                return <div key={index}>
                                                    <Comment 
                                                        comment={comment.data} 
                                                        replies={[]} 
                                                        author={comment.author}/>
                                                    {/* TODO: add delete/remove/edit buttons */}
                                                    <ul className="admin-button-row">
                                                        <li>
                                                            <button onClick={() => this.removeComment(comment.data._id)}>
                                                                Remove
                                                            </button>
                                                        </li>
                                                        {comment.data.deleted 
                                                            ?   <li>
                                                                <button onClick={() => this.restoreComment(comment.data._id)}>
                                                                    Restore
                                                                </button>
                                                            </li>
                                                            : null}

                                                        {comment.data.flagged
                                                            ?<li>
                                                                <button onClick={() => this.unflagComment(comment.data._id)}>
                                                                    Unflag
                                                                </button>
                                                            </li>
                                                            : null}
                                                    </ul>
                                                </div>
                                            })}
                                        </div>
                                        : null}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage