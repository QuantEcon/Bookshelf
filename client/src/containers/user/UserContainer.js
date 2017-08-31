import React, { Component } from 'react';
import User from '../../components/user/User';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as UserActions from '../../actions/user'

class UserContainer extends Component {
    constructor(props){
        super(props);
        
        this.props.actions.fetchUserInfo(props.match.params.userID);
    }

    render(){
        return(
            <div>
                <User data={this.props.user ? this.props.user.data : {}} isLoading={this.props.isLoading}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    var il = true;
    if(state.userByID[props.match.params.userID]){
        il = state.userByID[props.match.params.userID].isFetching;
    }
    return {
        user: state.userByID[props.match.params.userID],
        isLoading: il
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);