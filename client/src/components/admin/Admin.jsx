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
            addAdminModalOpen: false
        }

        this.foldFlaggedUsers = this.foldFlaggedUsers.bind(this)
        this.foldFlaggedSubmissions = this.foldFlaggedSubmissions.bind(this)
        this.foldFlaggedComments = this.foldFlaggedComments.bind(this)
        this.foldDeletedSubmissions = this.foldDeletedSubmissions.bind(this)
        this.foldFlaggedContent = this.foldFlaggedContent.bind(this)
    }

    componentWillReceiveProps(props){
        console.log("[AdminPage] - will receive props: ", props)
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
    
    foldFlaggedContent = () => {
        this.setState({
            showFlaggedContent: !this.state.showFlaggedContent
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

                                                                {submission.data.deleted 
                                                                ?   <li>
                                                                    <button onClick={() => this.restoreSubmission(submission.data._id)}>
                                                                        Restore
                                                                    </button>
                                                                </li>
                                                                : null}

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
                                        : null}
                                        
                                    </div>
                                    

                                    {/* Deleted submissions */}
                                    <div className="tile">
                                        <span className="section-header">
                                            <h2>Deleted Submissions ({this.props.deletedSubmissions.length})</h2>
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