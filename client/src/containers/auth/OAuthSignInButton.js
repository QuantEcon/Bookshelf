import React, {Component} from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as AuthActions from '../../actions/auth/signIn'

import SignInButton from '../../components/auth/SignInButton';

class OAuthSignInButton extends Component {
    constructor(props) {
        super(props);
        // console.log('[OAuthSignInButton] - props:', props);
        this.signIn = this
            .signIn
            .bind(this);
    }

    signIn() {
        console.log('[OAuthSignInButton] - provider: ', this.props.provider);
        if (this.props.isAdd) {
            this
                .props
                .actions
                .addSocial(this.props.provider, this.props.next);
        } else {
            this
                .props
                .actions
                .signIn(this.props.provider, this.props.next);
        }

    }

    render() {
        return (<SignInButton
            provider={this.props.isAdd
            ? 'Add ' + this.props.provider
            : this.props.provider}
            icon={this.props.icon}
            onClick={this.signIn}/>)
    }
}

function mapDispathToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(null, mapDispathToProps)(OAuthSignInButton);