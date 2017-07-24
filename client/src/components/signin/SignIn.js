import React, {Component} from 'react';

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import GoogleIcon from 'react-icons/lib/fa/google'

import Head from '../partials/Head';
class SignIn extends Component {
    //TODO: need to style the modal. Text is aligned left. Need align center
    constructor(props) {
        super(props);

        this.signInFB=this.signInFB.bind(this);
        this.signInGoogle=this.signInGoogle.bind(this);
        this.signInGithub=this.signInGithub.bind(this);
        this.signInTwitter=this.signInTwitter.bind(this);

    }

    signInFB() {
        console.log('Sign in fb');
        fetch('/api/auth/fb', {
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        }).then(results => {
            console.log('results: ', results);
        })
        
    }

    signInGithub() {
        console.log('Sign in github');
        fetch('/api/auth/github', {
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        }).then(results => {
            console.log('results: ', results);
        })
    }

    signInGoogle() {
        fetch('/api/auth/google', {
            headers: {
                'Access-Control-Allow-Origin':'*',
            }
        }).then(results => {
            console.log('results: ', results);
        })
    }

    signInTwitter() {
        console.log('Sign in twitter');
        fetch('/api/auth/twitter', {
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        }).then(results => {
            console.log('results: ', results);
        })
    }

    render() {
        return (
            <div>
                <Head/>
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
                                <a onClick={this.signInGithub}>
                                    <span><GithubIcon/></span>
                                    GitHub</a>
                            </li>
                            <li>
                                <a onClick={this.signInGoogle}>
                                    <span><GoogleIcon/></span>
                                    Google</a>
                            </li>
                            <li>
                                <a onClick={this.signInTwitter}>
                                    <span><TwitterIcon/></span>
                                    Twitter</a>
                            </li>
                            <li>
                                <a onClick={this.signInFB}>
                                    <span><FacebookIcon/></span>
                                    Facebook</a>
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