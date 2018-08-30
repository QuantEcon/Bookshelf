import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Head from '../components/partials/Head';
import {resetSearchParams} from '../actions/submissionList';
import CheckmarkIcon from 'react-icons/lib/fa/check-circle-o';

class HeadContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
          sentSuccess: null
        };

        this.handleSentSuccess = this.handleSentSuccess.bind(this)
        this.resetParams = this.resetParams.bind(this)
    }

    handleSentSuccess = (truthValue) => {
       this.setState({sentSuccess: truthValue});
     }

    resetParams = () => {
        console.log("[HeadContainer] - reset search params")
        this.props.actions.resetSearchParams()
    }

    render() {
        return (
            <div>
                <Head
                    emailSuccess={this.handleSentSuccess}
                    isSignedIn={this.props.isSignedIn}
                    user={this.props.user}
                    history={this.props.history}
                    resetSearchParams={this.resetParams}
                    showAdmin={this.props.isAdmin}/>
                    { this.state.sentSuccess && this.state.sentSuccess.sentValue ?
                    <div className="success callout">
                        <div className="container">
                            <p className="callout-message">
                                <CheckmarkIcon/>
                              Email was successfully sent to <b>{this.state.sentSuccess.sentEmail}</b>
                            </p>
                        </div>
                    </div>
                : null }
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
