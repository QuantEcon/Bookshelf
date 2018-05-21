import React, {Component} from 'react';
import User from '../../components/user/User'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as AuthActions from '../../actions/auth/signOut'

class MyProfileContainer extends Component {
    componentWillReceiveProps(props){
        if(!props.loading && !props.isSignedIn){
            props.history.replace('/')
        }
    }

    render() {
        return (
            <div>
                {this.props.loading 
                ? "loading..."
                : <User
                    data={this.props.user}
                    isLoading={false}
                    isMyProfile={true}
                    signOut={this.props.actions.signOut}
                    history={this.props.history}/>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.auth.user, 
        loading: state.auth.loading, 
        isSignedIn: state.auth.isSignedIn
    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer);