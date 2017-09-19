import React, {Component} from 'react';
import {connect} from 'react-redux'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import GoogleIcon from 'react-icons/lib/fa/google'
import ErrorIcon from 'react-icons/lib/md/error-outline'
// import {OAuthSignInButton} from 'redux-auth/bootstrap-theme'
import OAuthSignInButton from '../../containers/auth/OAuthSignInButton';

import HeadContainer from '../../containers/HeadContainer';

// import Head from '../partials/Head';
class SignIn extends Component {
    //TODO: need to style the modal. Text is aligned left. Need align center
    constructor(props) {
        super(props);
        this.state = {
            showErrorMessage: false
        }

        this.onSignInEnd = this
            .onSignInEnd
            .bind(this);

    }

    componentDidMount() {
        document.title = 'Sign In'
    }

    showErrorMessage = false;

    onSignInEnd(didAuthenticate) {
        if (didAuthenticate) {
            if (this.props.user.isNew) {
                console.log('[SignIn] - brand new user. Move to registration page');
                this
                    .props
                    .history
                    .push('/user/my-profile/edit')
            } else {
                this
                    .props
                    .history
                    .push('/');
            }

        } else {
            console.log('[SignIn] - error authenticating');
            //TODO: display error banner
            this.showErrorMessage = true;
        }

    }

    componentWillReceiveProps(props) {
        if (props.isSignedIn) {
            this
                .props
                .history
                .push('/')
        }
        if (this.props.authError) {
            this.setState({showErrorMessage: true});
        }
    }

    render() {
        return (
            <div>
                <HeadContainer/> {this.state.showErrorMessage
                    ? <div className="warning callout">
                            <div className="row columns">
                                <p className="callout-message">
                                    <ErrorIcon/>
                                    An error occurred while trying to login
                                </p>
                            </div>
                        </div>
                    : null}

                <div className='modal'>
                    <div className='modal-header'>
                        <h1 className='modal-title'>Sign In</h1>
                    </div>
                    <div className='modal-body'>
                        <p>
                            <strong>Sign in</strong>{' '}
                            using a social media account.</p>
                        <p>We won't share any of your personal data without your permission</p>
                        <ul className='social-login'>
                            <li>
                                <OAuthSignInButton
                                    provider='Twitter'
                                    icon={TwitterIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>
                            <li>
                                <OAuthSignInButton
                                    provider='Github'
                                    icon={GithubIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>
                            <li>
                                <OAuthSignInButton
                                    provider='Facebook'
                                    icon={FacebookIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>
                            <li>
                                <OAuthSignInButton
                                    provider='Google'
                                    icon={GoogleIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>
                        </ul>
                        <p>Singing in allows you to
                            <strong>{' '}Vote</strong>,
                            <strong>{' '}Comment{' '}</strong>
                            and
                            <strong>{' '}Submit{' '}</strong>
                            Notebooks.</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {isSignedIn: state.auth.isSignedIn, authError: state.auth.error, user: state.auth.user}
}

export default connect(mapStateToProps, null)(SignIn);