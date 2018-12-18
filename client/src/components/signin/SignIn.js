import React, {Component} from 'react';
import {connect} from 'react-redux'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import GoogleIcon from 'react-icons/lib/fa/google'
// import {OAuthSignInButton} from 'redux-auth/bootstrap-theme'
import OAuthSignInButton from '../../containers/auth/OAuthSignInButton';

import * as config from '../../_config'

import HeadContainer from '../../containers/HeadContainer';
import Modal from 'react-modal';

// import Head from '../partials/Head';
class SignIn extends Component {
    //TODO: need to style the modal. Text is aligned left. Need align center
    constructor(props) {
        super(props);
        this.state = {
            showErrorMessage: props.authError ? true : false,
            modalOpen: false
        }

        this.onSignInEnd = this
            .onSignInEnd
            .bind(this);

    }

    componentDidMount() {
        document.title = 'Sign In - QuantEcon Notes'
    }

    showErrorMessage = true;

    onSignInEnd(didAuthenticate, isNew) {
        if (didAuthenticate) {
            if (isNew) {
                console.log('[SignIn] - brand new user. Move to registration page');
                this.props.history.push('/user/my-profile/edit');
            } else {
                this.props.history.push('/');
            }

        } else {
            console.log('[SignIn] - error authenticating');
            //TODO: display error banner
            this.showErrorMessage = true;
            console.log("props:" , this.props.authError.user)
            if(this.props.authError.user.deleted) {
                // toggle restore profile modal window
                this.toggleOpenModal();
            }
        }
    }

    toggleOpenModal = () => {
      this.setState({
        modalOpen: !this.state.modalOpen
      });
    }

    componentWillReceiveProps(props) {
        if (props.isSignedIn) {
          this.props.history.push('/');

        }
        if (this.props.authError) {
            this.setState({showErrorMessage: true});
        }
    }

    closeModal = () => {
      this.setState({
        modalOpen: false,
      })
    }

    restoreProfile = () => {
      // obtain current user data
      console.log("[ Restoring Profile ]", this.props)
    }

    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
              {/* Modal window for restore profile */}
              <Modal isOpen={this.state.modalOpen} contentLabel="Restore" className="modal-alert">
                  <div className="modal">
                    <div className="modal-header">
                      <h1 className='modal-title'>Restore Profile</h1>
                    </div>
                    <div className="modal-body">
                      <p><strong>Restoring...</strong></p>
                      <ul className="options">
                        <li>
                          <a className='alt' onClick={this.closeModal}>Cancel</a>
                        </li>
                        <li>
                          <a onClick={this.restoreProfile}>Restore</a>
                        </li>
                      </ul>
                      <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.toggleOpenModal}><span aria-hidden="true">×</span></button>
                    </div>
                  </div>
              </Modal>

                {this.props.loading
                ? "loading..."
                :<div className='modal'>
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
                            {config.url.includes('development')
                            ? null
                            :<li>
                                <OAuthSignInButton
                                    provider='Github'
                                    icon={GithubIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>}
                            <li>
                                <OAuthSignInButton
                                    provider='Google'
                                    icon={GoogleIcon()}
                                    next={this.onSignInEnd}></OAuthSignInButton>
                            </li>
                        </ul>
                        <p>Signing in allows you to
                            <strong>{' '}Vote</strong>,
                            <strong>{' '}Comment{' '}</strong>
                            and
                            <strong>{' '}Submit{' '}</strong>
                            Notebooks.</p>
                    </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {isSignedIn: state.auth.isSignedIn, authError: state.auth.error, user: state.auth.user, loading: state.auth.loading}
}

export default connect(mapStateToProps, null)(SignIn);
