import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AddAdminModal from "../../components/admin/AddAdminModal"
import RemoveSubmissionModal from "../../components/admin/RemoveSubmissionModal"

// Child component
import AdminPage from '../../components/admin/Admin'

// Actions
// TODO: import admin actions here
import {
    fetchFlaggedContent,
    removeComment,
    removeSubmission,
    removeUser,
    deleteComment,
    deleteSubmission,
    deleteUser,
    unflagUser,
    unflagSubmission,
    unflagComment,
    restoreSubmission,
    fetchAdminUsers,
    searchUsers,
    addAdmin,
    removeAdmin
} from '../../actions/admin'

const actions = { 
    fetchFlaggedContent,
    removeComment,
    removeSubmission,
    removeUser,
    deleteComment,
    deleteSubmission,
    deleteUser,
    unflagUser,
    unflagSubmission,
    unflagComment,
    restoreSubmission,
    fetchAdminUsers,
    searchUsers,
    addAdmin,
    removeAdmin
}

class AdminContainer extends Component {
    constructor(props){
        super(props)
        if(props.isSignedIn && props.isAdmin){
            this.props.actions.fetchFlaggedContent()
            this.props.actions.fetchAdminUsers()
        }
        this.state = {
            addAdminModalOpen: false,
            removeSubmissionModalOpen: false
        }

        this.toggleAddAdminModal = this.toggleAddAdminModal.bind(this)
        this.toggleRemoveSubmissionModal = this.toggleRemoveSubmissionModal.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.makeAdmin = this.makeAdmin.bind(this)
    }

    toggleAddAdminModal = () => {
        this.setState({
            addAdminModalOpen: !this.state.addAdminModalOpen
        })
    }

    toggleRemoveSubmissionModal = (submissionID) => {
        var submissionToRemove = this.props.flaggedSubmissions.filter((submission) => submission.data._id === submissionID)
        if(submissionToRemove[0]){
            this.setState({
                removeSubmissionID: submissionID,
                removeSubmissionModalOpen: true,
                submissionToRemove: submissionToRemove[0]
            })
        } else {
            this.setState({
                removeSubmissionID: submissionID,
                removeSubmissionModalOpen: true,
                submissionToRemove: this.props.deletedSubmissions.filter((submission) => submission.data._id === submissionID)[0]
            })
        }
    }

    onRemove = (submissionID) => {
        this.props.actions.removeSubmission({submissionID: this.state.submissionToRemove.data._id})
        this.setState({
            removeSubmissionID: null,
            removeSubmissionModalOpen: false,
            submissionToRemove: null
        })
    }

    onRemoveCancel = () => {
        this.setState({
            removeSubmissionID: null,
            removeSubmissionModalOpen: false,
            submissionToRemove: null
        })
    }

    searchUsers = (keywords) => {
        console.log("[AdminContainer] - searching users: ", keywords)
        this.props.actions.searchUsers({keywords})
    }

    makeAdmin = (userID) => {
        this.toggleAddAdminModal()
        this.props.actions.addAdmin({userID})
    }

    componentWillReceiveProps(props){
        
    }

    render() {
        return (
            <div>
                {this.props.authIsLoading
                ? "auth is loading..."
                : <div>
                     {/* Add admin modal */}
                    <AddAdminModal isOpen={this.state.addAdminModalOpen}
                        onCancel={this.toggleAddAdminModal}
                        onSearch={this.searchUsers}
                        searchResults={this.props.searchResults}
                        makeAdmin={this.makeAdmin}/>
                    {this.state.removeSubmissionModalOpen
                    ?<RemoveSubmissionModal isOpen={this.state.removeSubmissionModalOpen}
                        onCancel={this.onRemoveCancel}
                        onRemove={this.onRemove}
                        submission={this.state.submissionToRemove}/>
                    : null}
                    

                    <AdminPage
                        flaggedComments={this.props.flaggedComments}
                        deletedComments={this.props.deletedComments}
                        flaggedSubmissions={this.props.flaggedSubmissions}
                        flaggedUsers={this.props.flaggedUsers}
                        deletedUsers={this.props.deletedUsers}
                        deletedSubmissions={this.props.deletedSubmissions}
                        adminUsers={this.props.adminUsers}
                        showAdminModal={this.toggleAddAdminModal}
                        showRemoveModal={this.toggleRemoveSubmissionModal}
                        currentUser={this.props.currentUser}
                        isLoading={this.props.isLoading}
                        history={this.props.history}
                        actions={this.props.actions}
                        authIsLoading={this.props.authIsLoading}
                    />
                </div> }
                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log('state: ', state)
    return {
        authIsLoading: state.auth.loading,
        flaggedComments: state.adminData.flaggedComments,
        deletedComments: state.adminData.deletedComments,
        flaggedSubmissions: state.adminData.flaggedSubmissions,
        deletedSubmissions: state.adminData.deletedSubmissions,
        flaggedUsers: state.adminData.flaggedUsers,
        deletedUsers: state.adminData.deletedUsers,
        adminUsers: state.adminData.adminUsers,
        currentUser: state.auth.user,
        searchResults: state.adminData.searchResults,
        isLoading: state.adminData.fetching || state.adminData.adminUsers.fetching,
        isSignedIn: state.auth.isSignedIn,
        isAdmin: state.auth.isAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)