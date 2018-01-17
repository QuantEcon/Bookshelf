import React, {Component} from 'react';
import HeadContainer from '../../containers/HeadContainer';
import UserPreview from '../user/UserPreview'
import SubmissionPreview from '../submissions/submissionPreview'
import Comment from '../comments/Reply'

class AdminPage extends Component {
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
                    <div className='column'>
                        {this.props.isLoading
                            ? <h3>Loading...</h3>
                            :<div>
                                {/* Flagged Users */}
                                <div>
                                    <h2>Flagged Users</h2>
                                    <div className="summaries">
                                        {this.props.flaggedUsers.map((user, index) => {
                                            return <div key={index}>
                                                <UserPreview  user={user}/>
                                                {/* TODO: add delete/remove buttons */}
                                            </div>
                                        })}
                                    </div>
                                </div>
                                {/* Flagged Submissions */}
                                <div>
                                    <h2>Flagged Submissions</h2>
                                    <div className="summaries">
                                        {this.props.flaggedSubmissions.map((submission, index) => {
                                            return <div key={index}>
                                                <SubmissionPreview submission={submission.data} author={submission.author}/>
                                                {/* TODO: add delete/remove/edit buttons */}
                                            </div>
                                        })}
                                    </div>
                                </div>
                                
                                {/* Flagged Comments */}
                                <div>
                                    <h2>Flagged Comments</h2>
                                    <div>
                                        {this.props.flaggedComments.map((comment, index) => {
                                            return <div key={index}>
                                                <Comment 
                                                    comment={comment.data} 
                                                    replies={[]} 
                                                    author={comment.author}/>
                                                {/* TODO: add delete/remove/edit buttons */}
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage