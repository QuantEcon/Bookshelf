import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import notesLogo from '../../assets/img/notes-logo.png'
import Modal from 'react-modal';
import axios from 'axios';
import store from '../../store/store';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const errorStyle = {
  marginLeft : '23%',
  color : 'green'
};


var temp= [];


class Head extends Component {
    constructor(props) {
            super(props)

            this.redirectToHome = this
                .redirectToHome
                .bind(this)

            this.state = {
                modalIsOpen: false
            };

            this.state = {
              value: '',
              visibility: false,
              check : true,
              emailInvite: {
                 sentValue: false,
                 sentEmail: null,
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
        console.log("redirect to home")
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
      this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
      this.setState({modalIsOpen: false});
      this.setState({value:''});
    }

    handleChange = (event) => {
      this.setState({value: event.target.value});

    }

    handleSentSuccess = (inviteEmail) => {
      this.setState({emailInvite: {sentValue: true, sentEmail: inviteEmail}}, () => {
        this.props.emailSuccess(this.state.emailInvite);
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();

      var  inviteEmail = this.state.value;
      this.setState({value:''}); //Reset state of modal

      if (temp.includes(inviteEmail) && inviteEmail != '')
        {
        this.setState({visibility : true,
                      check : true})
        }

      else if (inviteEmail.includes('@') && inviteEmail !== '') {
        // Setting modal as false to close now that the invite is successful
        this.setState({modalIsOpen: false});
        this.handleSentSuccess(inviteEmail);
        //Send request to api endpoint /invite to send notification
        axios.post('/api/invite',{
        inviteEmail
        }, {
        headers: {
           'Authorization': 'JWT ' + store.getState().auth.token
        }
        }).then(response => {
        console.log(response);
        console.log('[InviteActions] - invite success: ');
        return true;

        }).catch(error => {
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

                            <p className="site-tag">Open notebook library for economic modeling</p>

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
                                                  style={customStyles}
                                                  contentLabel="Example Modal"
                                                >

                                                  <h3 className='invite-label' ref={subtitle => this.subtitle = subtitle}>Please enter the email of the person you would like to invite</h3>


                                                  <form onSubmit={this.handleSubmit}>
                                                    <label>

                                                      <input type="email" placeholder="Input the email" value={this.state.value} onChange={this.handleChange} required/>
                                                    </label>
                                                    <ul className="button-row">
                                                      <li>
                                                        <button className='invite-modal-button alt' onClick={this.closeModal}>Cancel</button>
                                                      </li>
                                                      <li>
                                                        <button className='invite-modal-button' onClick={this.handleSubmit}>Invite</button>
                                                      </li>
                                                    </ul>
                                                    <div className='inviteAlert'>
                                                      { this.state.visibility ? <h2 className='email-error' >This user is already part of QuantEcon Notes</h2> : null }
                                                      { this.state.check ? null : <h3 className='email-error' >Please enter a valid email address</h3> }
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
