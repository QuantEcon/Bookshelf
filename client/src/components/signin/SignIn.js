import React, {Component} from 'react';

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import GoogleIcon from 'react-icons/lib/fa/google'
// import {OAuthSignInButton} from 'redux-auth/bootstrap-theme'
import OAuthSignInButton from '../../containers/auth/OAuthSignInButton';

import HeadContainer from '../../containers/HeadContainer';

// import Head from '../partials/Head';
class SignIn extends Component {
    //TODO: need to style the modal. Text is aligned left. Need align center
    constructor(props) {
        super(props);

        this.signInFB = this
            .signInFB
            .bind(this);
        this.signInGoogle = this
            .signInGoogle
            .bind(this);
        this.signInGithub = this
            .signInGithub
            .bind(this);
        this.signInTwitter = this
            .signInTwitter
            .bind(this);

        this.onSignInEnd = this
            .onSignInEnd
            .bind(this);

    }

    signInFB() {
        console.log('Sign in fb');
        fetch('/api/auth/fb', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(results => {
            console.log('results: ', results);
        })

    }

    signInGithub() {
        console.log('Sign in github');
        fetch('/api/auth/github').then(results => {
            console.log('results: ', results);
        })
    }

    signInGoogle() {
        fetch('/api/auth/google', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(results => {
            console.log('results: ', results);
        })
    }

    signInTwitter() {
        console.log('Sign in twitter');
        fetch('/api/auth/twitter', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(results => {
            console.log('results: ', results);
        })
    }

    onSignInEnd(didAuthenticate) {
        console.log('[SignIn] - did authenticate:', didAuthenticate);
        if (didAuthenticate) {
            console.log('[SignIn] - history: ', this.props.history)
            this
                .props
                .history
                .push('/');
        } else {
            console.log('[SignIn] - error authenticating');
            //TODO: display error banner
        }

    }

    render() {
        return (
            <div>
                <HeadContainer/>
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

export default SignIn;