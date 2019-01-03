import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import notesLogo from '../../assets/img/notes-logo.png';
import Modal from 'react-modal';
import axios from 'axios';
import store from '../../store/store';
import classnames from 'classnames';

var temp= [];

class Head extends Component {
    constructor(props) {
            super(props)

            this.redirectToHome = this
                .redirectToHome
                .bind(this)

            this.state = {
              value: '',
              visibility: false,
              check : true,
              modalIsOpen: false,
              emailInvite: {
                 sentValue: false,
                 sentEmail: null,
              },
              errors: {
                invalidEmail: '',
                emailTruthValue: null,
              }
             };

            this.inviteClick = this
                .inviteClick
                .bind(this)

            this.openModal = this
                .openModal
                .bind(this);

            this.afterOpenModal = this
                .afterOpenModal
                .bind(this);

            this.closeModal = this
                .closeModal
                .bind(this);

            this.handleChange = this
                .handleChange
                .bind(this);

            this.handleSubmit = this
                .handleSubmit
                .bind(this);


    }

    redirectToHome = () => {
        console.log("Redirect to home")
        //reset search params
        this.props.resetSearchParams()
        if(this.props.history){
            this.props.history.replace("/")
        } else {
            window.location.href = '/'
        }
    }

    inviteClick = () => {
        this.setState({
        visibility : false,
        check : true
        })
        var userID=this.props.user._id;
        axios.get('/api/search/userList/?_id=' + userID).then(response => {
          var p = response.data;
          for (var key in p) {
          if (p.hasOwnProperty(key)) {

            temp.push(p[key].email);
            }
          }

          return true;

        }).catch(error => {
          console.log('error in adding Co-Author: ', error);
          return false;
        })
        this.openModal();

    }

    openModal = () => {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
      this.setState({modalIsOpen: false, value: '', errors: {invalidEmail: '', emailTruthValue: null}});
    }

    handleChange = (event) => {
      this.setState({value: event.target.value});

    }

    handleSentSuccess = (response) => {
      console.log("[HandleSentSuccess] - ", response);
      this.setState({emailInvite: {sentValue: response.emailTruthValue, sentEmail: response.validEmail}}, () => {
        this.props.emailSuccess(this.state.emailInvite);
      });
      // Setting modal as false to close now that the invite is successful
      this.closeModal();
    }

    handleSentError = (error) => {
      console.log("[HandleSentError] - ", error.response.data);
      // Set check as in false to display the invalid error message in modal
      this.setState({check: false});
      this.setState({errors: {invalidEmail: error.response.data.emailError, emailTruthValue: error.response.data.emailTruthValue}});
    }

    handleSubmit = (event) => {
      event.preventDefault(); // Prevent the form from actually submitting

      const inviteEmail = this.state.value;

      this.setState({value:''}); //Reset email input state in modal

      // Checking if the email already exists or has been sent previously
      if (temp.includes(inviteEmail) && inviteEmail !== '')
        {
        this.setState({visibility : true,
                      check : true})
        }

      else if (inviteEmail !== '') {

        //Send POST request to /api/invite
        axios.post('/api/invite',{
        inviteEmail
        }, {
        headers: {
           'Authorization': 'JWT ' + store.getState().auth.token
        }
        }).then(response => {
        this.handleSentSuccess(response.data);
        console.log(response);
        console.log('[InviteActions] - invite success: ');
        return true;

        }).catch(error => {
        this.handleSentError(error);
        console.log('[SubmitActions] - error in invite submit: ', error);
        return false;
        })
      }

      else {
        this.setState({check : false,
                      visibility : false})
      }
    }

    render() {
        const {errors} = this.state;

        return (
            <div>
                {/* <div className="corner-ribbon">Beta</div> */}

                {/* <a
                    className="submit-feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://discourse.quantecon.org/c/notes-feedback">Submit Feedback</a> */}

                <header className="header">

                    <div className="container">

                        <div className="header-container">

                            <div className="site-title">
                                <a onClick={this.redirectToHome}>
                                    <span>
                                        <img src={notesLogo} alt="Notes Logo" className="notes-logo"/>
                                        <div>
                                            <h2 className="site-name">Quant<span>Econ</span>
                                                <strong>Notes</strong>
                                            </h2>
                                        </div>
                                    </span>
                                </a>

                            </div>
{/* 
                            <p className="site-tag">An open Jupyter notebook library for economics and finance
                                <img src={sloanLogo} alt="Sloan Logo" className="sloan-logo"/>
                            </p> */}

                            <div className="site-nav">
                                <div className="site-links">
                                    <ul>
                                        <li>
                                            <Link to='/'>Home</Link>
                                        </li>
                                        <li>
                                            <Link to='/about'>About</Link>
                                        </li>
                                        <li>
                                            <Link to='/contact'>Contact</Link>
                                        </li>
                                        {this.props.showAdmin && this.props.isSignedIn
                                        ? <li>
                                            <Link to='/admin'>Admin</Link>
                                        </li>
                                        : null}
                                    </ul>
                                </div>

                                {this.props.isSignedIn
                                    ? <ul className='site-menu'>
                                            <li className='menu-user'>
                                                <Link to="/user/my-profile">
                                                    <div className='avatar'>
                                                        <img src={this.props.user.avatar} alt="My Avatar"/>
                                                    </div>
                                                    <span>My Profile</span>
                                                </Link>
                                            </li>
                                            <li className='menu-submit'>
                                                <Link to="/submit">Submit Notebook</Link>
                                            </li>
                                            <li className='menu-submit invite-button'>
                                                <a onClick={() => {this.inviteClick()}}> + Invite</a>
                                                <Modal
                                                  isOpen={this.state.modalIsOpen}
                                                  onAfterOpen={this.afterOpenModal}
                                                  onRequestClose={this.closeModal}
                                                  className="modal-alert"
                                                  contentLabel="Example Modal"
                                                >
                                                  <form onSubmit={this.handleSubmit}>
                                                    <div className="modal">
                                                      <div className="modal-header">
                                                        <h1 className='modal-title'>Invite User</h1>
                                                      </div>
                                                      <div className="modal-body">
                                                        <p><strong>Enter the email address of the person you would like to invite</strong></p>
                                                        <label>
                                                          <input type="email" placeholder="Input the email" value={this.state.value} className={classnames('invite-email-input', {'is-invalid': errors.invalidEmail})} onChange={this.handleChange} required/>
                                                        </label>
                                                        <ul className="options">
                                                          <li>
                                                            <a className='alt' onClick={this.closeModal}>Cancel</a>
                                                          </li>
                                                          <li>
                                                            <a onClick={this.handleSubmit}>Invite</a>
                                                          </li>
                                                        </ul>
                                                        <div className='inviteAlert'>
                                                          { this.state.visibility ? <p className='email-error' >This user is already part of QuantEcon Notes</p> : null }
                                                          { this.state.check ? null : <p className='email-error' >Please enter a valid email address</p> }
                                                        </div>
                                                        <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.closeModal}><span aria-hidden="true">×</span></button>
                                                      </div>
                                                    </div>
                                                  </form>
                                                </Modal>
                                            </li>
                                        </ul>
                                    : <ul className='site-menu'>
                                        <li className="menu-signin">
                                            <Link to='/signin'>Sign In</Link>
                                        </li>
                                        <li className='menu-submit'>
                                            <Link to="/signin">Submit Notebook</Link>
                                        </li>
                                        <li className='menu-submit invite-button'>
                                            <Link to="/signin">+ Invite</Link>
                                        </li>
                                    </ul>}
                            </div>

                        </div>

                    </div>

                </header>
            </div>
        );
    };
}

export default Head;
