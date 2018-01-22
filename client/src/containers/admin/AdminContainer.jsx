import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AddAdminModal from "../../components/admin/AddAdminModal"


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
    fetchAdminUsers,
    searchUsers,
    addAdmin,
    removeAdmin
}

class AdminContainer extends Component {
    constructor(props){
        super(props)
        this.props.actions.fetchFlaggedContent()
        this.props.actions.fetchAdminUsers()
        this.state = {
            addAdminModalOpen: false
        }

        this.toggleAddAdminModal = this.toggleAddAdminModal.bind(this)
        this.makeAdmin = this.makeAdmin.bind(this)
    }

    toggleAddAdminModal = () => {
        this.setState({
            addAdminModalOpen: !this.state.addAdminModalOpen
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

    render() {
        return (
            <div>
                 {/* Add admin modal */}
                 <AddAdminModal isOpen={this.state.addAdminModalOpen}
                    onCancel={this.toggleAddAdminModal}
                    onSearch={this.searchUsers}
                    searchResults={this.props.searchResults}
                    makeAdmin={this.makeAdmin}/>
                <AdminPage
                    flaggedComments={this.props.flaggedComments}
                    deletedComments={this.props.deletedComments}
                    flaggedSubmissions={this.props.flaggedSubmissions}
                    flaggedUsers={this.props.flaggedUsers}
                    deletedUsers={this.props.deletedUsers}
                    deletedSubmissions={this.props.deletedSubmissions}
                    adminUsers={this.props.adminUsers}
                    showAdminModal={this.toggleAddAdminModal}
                    currentUser={this.props.currentUser}
                    isLoading={this.props.isLoading}
                    history={this.props.history}
                    actions={this.props.actions}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        flaggedComments: state.adminData.flaggedComments,
        deletedComments: state.adminData.deletedComments,
        flaggedSubmissions: state.adminData.flaggedSubmissions,
        deletedSubmissions: state.adminData.deletedSubmissions,
        flaggedUsers: state.adminData.flaggedUsers,
        deletedUsers: state.adminData.deletedUsers,
        adminUsers: state.adminData.adminUsers,
        currentUser: state.auth.user,
        searchResults: state.adminData.searchResults,
        isLoading: state.adminData.fetching || state.adminData.adminUsers.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)