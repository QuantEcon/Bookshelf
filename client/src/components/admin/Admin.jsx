import React, {Component} from 'react';
import HeadContainer from '../../containers/HeadContainer';
import UserPreview from '../user/UserPreview'
import SubmissionPreview from '../submissions/submissionPreview'
import Comment from '../comments/Reply' 
import * as config from '../../_config'

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFlaggedUsers: true,
            showFlaggedSubmissions: true,
            showFlaggedComments: true,
            showDeletedSubmissions: true,
            showFlaggedContent: false,
            showDeletedContent: false,
            addAdminModalOpen: false
        }

        this.foldFlaggedUsers = this.foldFlaggedUsers.bind(this)
        this.foldDeletedUsers = this.foldDeletedUsers.bind(this)

        this.foldFlaggedSubmissions = this.foldFlaggedSubmissions.bind(this)
        this.foldDeletedSubmissions = this.foldDeletedSubmissions.bind(this)
        
        this.foldFlaggedComments = this.foldFlaggedComments.bind(this)
        this.foldDeletedComments = this.foldDeletedComments.bind(this)

        this.foldFlaggedContent = this.foldFlaggedContent.bind(this)
        this.foldDeletedContent = this.foldDeletedContent.bind(this)

        this.removeSubmission = this.removeSubmission.bind(this)
        this.removeUser = this.removeUser.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.unflagUser = this.unflagUser.bind(this)
        this.unflagSubmission = this.unflagSubmission.bind(this)
        this.unflagComment = this.unflagComment.bind(this)
        this.restoreUser = this.restoreUser.bind(this)
        this.restoreSubmission = this.restoreSubmission.bind(this)
        this.restoreComment = this.restoreComment.bind(this)

    }
    
    removeSubmission = (submissionID) => {
        console.log("Remove submission clicked: ", submissionID)
        this.props.actions.removeSubmission({submissionID})
    }

    removeUser = (userID) => {
        console.log("Remove user clicked: ", userID)
        this.props.actions.removeUser({userID})
    }

    removeComment = (commentID) => {
        console.log("Remove comment clicked: ", commentID)
        this.props.actions.removeComment({commentID})
    }

    unflagUser = (userID) => {
        console.log("Unflag user clicked: ", userID)
        this.props.actions.unflagUser({userID})
    }

    unflagComment = (commentID) => {
        console.log("Unflag comment clicked: ", commentID)
        this.props.actions.unflagComment({commentID})
    }

    unflagSubmission = (submissionID) => {
        console.log("Unflag submission clicked: ", submissionID)
        this.props.actions.unflagSubmission({submissionID})
    }

    restoreSubmission = (submissionID) => {
        console.log("Restore submission clicked: ", submissionID)
        this.props.actions.restoreSubmission({submissionID})
    }

    restoreComment = (commentID) => {
        console.log("Restore comment clicked: ", commentID)
        this.props.actions.restoreComment({commentID})
    }

    restoreUser = (userID) => {
        console.log("Restore user clicked: ", userID)
        this.props.actions.restoreUser({userID})
    }

    foldFlaggedUsers = () => {
        this.setState({
            showFlaggedUsers: !this.state.showFlaggedUsers
        })
    }

    foldDeletedUsers = () => {
        this.setState({
            showDeletedUsers: !this.state.showDeletedUsers
        })
    }

    foldFlaggedSubmissions = () => {
        this.setState({
            showFlaggedSubmissions: !this.state.showFlaggedSubmissions
        })
    }

    foldDeletedSubmissions = () => {
        this.setState({
            showDeletedSubmissions: !this.state.showDeletedSubmissions
        })
    }

    foldFlaggedComments = () => {
        this.setState({
            showFlaggedComments: !this.state.showFlaggedComments
        })
    }

    foldDeletedComments = () => {
        this.setState({
            showDeletedComments: !this.state.showDeletedComments
        })
    }
    
    foldFlaggedContent = () => {
        this.setState({
            showFlaggedContent: !this.state.showFlaggedContent
        })
    }

    foldDeletedContent = () => {
        this.setState({
            showDeletedContent: !this.state.showDeletedContent
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
                                    {/* Admin Users */}
                                    <div className="tile">
                                        <span className="section-header">
                                            <h2>Admin Users</h2>
                                        </span>
                                        <div className="summaries">
                                            {this.props.adminUsers.users.map((user, index) => {
                                                return <div key={index}>
                                                    <UserPreview user={user}/>
                                                    <ul className="admin-button-row">
                                                        <li>
                                                            <button onClick={()=>this.props.actions.removeAdmin({userID: user._id})} disabled={user._id ===this.props.currentUser._id}>Remove</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            })}
                                        </div>
                                        <hr/>
                                        <ul className="admin-button-row">
                                            <li>
                                                <button onClick={this.props.showAdminModal} disabled={this.props.adminUsers.users.length >= config.maxNumAdmins}>Add Admin</button>  
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Flagged Users */}
                                    <div className='tile'>
                                        <span className="section-header">
                                            <h2>Flagged Content ({this.props.flaggedComments.length + this.props.flaggedSubmissions.length + this.props.flaggedUsers.length})</h2>
                                            {this.state.showFlaggedContent
                                            ?<button onClick={this.foldFlaggedContent}>Hide</button>
                                            :<button onClick={this.foldFlaggedContent}>Show</button>
                                            }
                                        </span>
                                        {this.state.showFlaggedContent
                                        ? <div>
                                            <div className="tile">
                                                <span className="section-header">
                                                    <h2>
                                                        Users ({this.props.flaggedUsers.length})
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

                                                                <ul className="admin-button-row">
                                                                    <li>
                                                                        <button onClick={() => this.removeUser(user._id)}>
                                                                            Remove
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={() => this.unflagUser(user._id)}>
                                                                            Unflag
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        })}
                                                    </div>
                                                : null}
                                            </div>
                                        {/* Flagged Submissions */}
                                        <div className="tile">
                                            <span className="section-header">
                                                <h2>Submissions ({this.props.flaggedSubmissions.length})</h2>
                                                {this.state.showFlaggedSubmissions
                                                ?<button onClick={this.foldFlaggedSubmissions}>Hide</button>

                                                :<button onClick={this.foldFlaggedSubmissions}>Show</button>
                                                }
                                            </span>
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
                                                                <li>
                                                                    <button onClick={() => this.unflagSubmission(submission.data._id)}>
                                                                        Unflag
                                                                    </button>
                                                                </li>
                                                                
                                                            </ul>
                                                        </div>
                                                    })}
                                                </div>
                                                :null}
                                        </div>
                                        
                                        {/* Flagged Comments */}
                                        <div className="tile">
                                            <span className="section-header">
                                                <h2>Comments ({this.props.flaggedComments.length})</h2>
                                                {this.state.showFlaggedComments
                                                ?<button onClick={this.foldFlaggedComments}>Hide</button>
                                                :<button onClick={this.foldFlaggedComments}>Show</button>}
                                            </span>
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
                                                            <li>
                                                                <button onClick={() => this.unflagComment(comment.data._id)}>
                                                                    Unflag
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                })}
                                            </div>
                                            : null}
                                        </div>
                                        </div>
                                        : null}
                                        
                                    </div>

                                    <div className="tile">
                                        <span className="section-header">
                                            <h2>Deleted Content ({this.props.deletedUsers.length + this.props.deletedSubmissions.length + this.props.deletedComments.length})</h2>
                                            {this.state.showDeletedContent
                                            ? <button onClick={this.foldDeletedContent}>Hide</button>
                                            : <button onClick={this.foldDeletedContent}>Show</button>}
                                        </span>
                                        {this.state.showDeletedContent
                                        ? <div>
                                            {/* Deleted Users */}
                                            <div className="tile">
                                                <span className="section-header">
                                                    <h2>
                                                        Users ({this.props.deletedUsers.length})
                                                    </h2>
                                                    {this.state.showFlaggedUsers
                                                    ?<button onClick={this.foldDeletedUsers} className="section-header-button">
                                                        Hide
                                                    </button>
                                                    :<button onClick={this.foldDeletedUsers} className="section-header-button">
                                                        Show
                                                    </button>
                                                    }
                                                    
                                                </span>
                                                {this.state.showDeletedUsers
                                                ?
                                                    <div className="summaries">
                                                        {this.props.deletedUsers.map((user, index) => {
                                                            return <div key={index}>
                                                                <UserPreview  user={user}/>

                                                                <ul className="admin-button-row">
                                                                    <li>
                                                                        <button onClick={() => this.removeUser(user._id)}>
                                                                            Remove
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={() => this.restoreUser(user._id)}>
                                                                            Restore
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        })}
                                                    </div>
                                                : null}
                                            </div>

                                            {/* Deleted submissions */}
                                            <div className="tile">
                                                <span className="section-header">
                                                    <h2>Submissions ({this.props.deletedSubmissions.length})</h2>
                                                    {this.state.showDeletedSubmissions
                                                    ? <button onClick={this.foldDeletedSubmissions}>Hide</button>
                                                    : <button onClick={this.foldDeletedSubmissions}>Show</button>}
                                                </span>
                                                {this.state.showDeletedSubmissions
                                                ? <div className="summaries">
                                                    {this.props.deletedSubmissions.map((submission, index) => {
                                                            return <div key={index}>
                                                                <SubmissionPreview submission={submission.data} author={submission.author}/>
                                                                {/* TODO: add delete/remove/edit buttons */}
                                                                <ul className="admin-button-row">
                                                                    <li>
                                                                        <button onClick={() => this.removeSubmission(submission.data._id)}>
                                                                            Remove
                                                                        </button>
                                                                    </li>

                                                                    <li>
                                                                        <button onClick={() => this.restoreSubmission(submission.data._id)}>
                                                                            Restore
                                                                        </button>
                                                                    </li>
                                                                                                                        
                                                                </ul>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                                : null}
                                            </div>
                                            
                                            {/* Deleted Comments */}
                                            <div className="tile">
                                                <span className="section-header">
                                                    <h2>Comments ({this.props.deletedComments.length}</h2>
                                                    {this.state.showDeletedComments
                                                    ? <button onClick={this.foldDeletedComments}>Hide</button>
                                                    :<button onClick={this.foldDeletedComments}>Show</button>}
                                                </span>
                                                {this.state.showDeletedComments
                                                ? <div>
                                                        {this.props.deletedComments.map((comment, index) => {
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
                                                                    <li>
                                                                        <button onClick={() => this.restoreComment(comment.data._id)}>
                                                                            Restore
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        })}
                                                    </div>
                                                : null}
                                            </div>
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