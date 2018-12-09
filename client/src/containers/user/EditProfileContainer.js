import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeSocialAccount, setActiveAvatar, toggleSocial, editProfile} from '../../actions/auth/auth';
import {mergeAccounts} from '../../actions/auth/signIn'
import EditProfile from '../../components/user/EditProfile'
import * as AuthActions from '../../actions/auth/signOut'

class EditProfileContainer extends Component {
    saveProfile = ({name, website, summary, email, emailSettings}) => {
        this
            .props
            .actions
            .editProfile({name, website, summary, email, emailSettings});
    }

    cancel = () => {
        console.log('[EditProfileContainer] - cancel')
        this
            .props
            .history
            .push('/user/my-profile');
    }

    toggleSocial = ({social}) => {
        console.log('[EditProfileContainer] - toggle social: ', social);
        this
            .props
            .actions
            .toggleSocial({social});
    }

    setAvatar = ({social}) => {
        this
            .props
            .actions
            .setActiveAvatar({social});
    }

    removeSocial = ({social}) => {
        this
            .props
            .actions
            .removeSocialAccount({social});
    }

    mergeAccounts = ({accountToMerge, next}) => {
        this.props.actions.mergeAccounts({
            accountToMerge,
            next
        })
    }

    componentWillReceiveProps(props){
        if(!props.loading && !props.isSignedIn){
            props.history.push('/signin')
        }
    }

    render() {
        return (
            <div>
                {this.props.loading
                ? "loading..."
                : <EditProfile
                    user={this.props.user}
                    saveProfile={this.saveProfile}
                    cancel={this.cancel}
                    toggleSocial={this.toggleSocial}
                    setAvatar={this.setAvatar}
                    removeSocial={this.removeSocial}
                    editProfileError={this.props.editProfileError}
                    editProfileSuccess={this.props.editProfileSuccess}
                    mergeAccounts={this.mergeAccounts}
                    signOut={this.props.actions.signOut}
                    history={this.props.history}/>}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.auth.user,
        editProfileError: state.auth.editProfileError,
        editProfileSuccess: state.auth.editProfileSuccess,
        loading: state.auth.loading,
        isSignedIn: state.auth.isSignedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            removeSocialAccount,
            setActiveAvatar,
            toggleSocial,
            editProfile,
            mergeAccounts,
            ...AuthActions,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
