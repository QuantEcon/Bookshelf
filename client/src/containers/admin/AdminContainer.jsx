import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

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
    deleteUser
} from '../../actions/admin'

const actions = { 
    fetchFlaggedContent,
    removeComment,
    removeSubmission,
    removeUser,
    deleteComment,
    deleteSubmission,
    deleteUser
}

class AdminContainer extends Component {
    constructor(props){
        super(props)
        this.props.actions.fetchFlaggedContent()
    }

    componentWillReceiveProps(props){
        console.log("[AdminContainer] - new props: ", props)
    }

    render() {
        return (
            <div>
                <AdminPage
                    flaggedComments={this.props.flaggedComments}
                    flaggedSubmissions={this.props.flaggedSubmissions}
                    flaggedUsers={this.props.flaggedUsers}
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
        flaggedSubmissions: state.adminData.flaggedSubmissions,
        flaggedUsers: state.adminData.flaggedUsers,
        isLoading: state.adminData.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)