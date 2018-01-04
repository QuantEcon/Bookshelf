import React, {Component} from 'react';
import User from '../../components/user/User'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as AuthActions from '../../actions/auth/signOut'

class MyProfileContainer extends Component {
    render() {
        return (
            <div>
                <User
                    data={this.props.user}
                    isLoading={false}
                    isMyProfile={true}
                    signOut={this.props.actions.signOut}
                    history={this.props.history}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (state.auth.isSignedIn) {
        return {user: state.auth.user}
    } else {
        props
            .history
            .replace('/signin');
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer);