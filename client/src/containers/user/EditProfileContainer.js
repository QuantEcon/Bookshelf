import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeSocialAccount, setActiveAvatar, toggleSocial, editProfile} from '../../actions/auth/auth';
import EditProfile from '../../components/user/EditProfile'

class EditProfileContainer extends Component {
    saveProfile = ({name, website, position, email}) => {
        this
            .props
            .actions
            .editProfile({name, website, position, email});
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

    render() {
        return (
            <div>
                <EditProfile
                    user={this.props.user}
                    saveProfile={this.saveProfile}
                    cancel={this.cancel}
                    toggleSocial={this.toggleSocial}
                    setAvatar={this.setAvatar}
                    removeSocial={this.removeSocial}
                    editProfileError={this.props.editProfileError}
                    editProfileSuccess={this.props.editProfileSuccess}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    if (state.auth.isSignedIn) {
        return {
            user: state.auth.user,
            editProfileError: state.auth.editProfileError,
            editProfileSuccess: state.auth.editProfileSuccess
        }
    } else {
        props
            .history
            .replace('/signin')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            removeSocialAccount,
            setActiveAvatar,
            toggleSocial,
            editProfile
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);