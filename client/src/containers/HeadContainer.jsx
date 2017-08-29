import React, { Component } from 'react';
import {connect} from 'react-redux';
import Head from '../components/partials/Head';
import QENavBar from '../components/partials/QENavBar'


class HeadContainer extends Component {
    render(){
        return(
            <div>
                <QENavBar/>
                <Head isSignedIn={this.props.isSignedIn} user={this.props.user}/>
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return {
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
    }
}


export default connect(mapStateToProps, null)(HeadContainer); 