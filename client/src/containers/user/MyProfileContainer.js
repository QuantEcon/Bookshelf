import React, { Component } from 'react';
import User from '../../components/user/User'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import * as UserActions from '../../actions/user'

class MyProfileContainer extends Component {
    render(){
        return (
            <div>
                <User data={this.props.user} isLoading={false} isMyProfile={true}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if(state.auth.isSignedIn){
        return {
            user: state.auth.user
        }
    } else {
        props.history.replace('/signin');
    }
}

export default connect(mapStateToProps, null)(MyProfileContainer);