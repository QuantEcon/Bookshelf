import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Head from '../components/partials/Head';
import QENavBar from '../components/partials/QENavBar'
import {resetSearchParams} from '../actions/submissionList'
class HeadContainer extends Component {

    constructor(props){
        super(props)
        this.resetParams = this.resetParams.bind(this)
    }

    resetParams = () => {
        console.log("[HeadContainer] - reset search params")
        this.props.actions.resetSearchParams()
    }

    render() {
        return (
            <div>
                <QENavBar/>
                <Head
                    isSignedIn={this.props.isSignedIn}
                    user={this.props.user}
                    history={this.props.history}
                    resetSearchParams={this.resetParams}
                    showAdmin={this.props.isAdmin}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {isSignedIn: state.auth.isSignedIn, user: state.auth.user, isAdmin: state.auth.isAdmin}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            resetSearchParams
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);