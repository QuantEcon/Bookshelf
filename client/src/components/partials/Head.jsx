import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import bookshelfLogo from '../../assets/img/bookshelf-logo.png'
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


class Head extends Component {
    constructor(props) {
            super(props)

            this.redirectToHome = this
                .redirectToHome
                .bind(this)

            this.state = {
                modalIsOpen: false
            };

            this.state = {value: ''};

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
      console.log('in inviteClick method');
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({modalIsOpen: false});
        var  inviteEmail = this.state.value;
        console.log('Invite a friend initiated')
        console.log(this.state.value)

        this.setState({value:''}); //Reset state of modal

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

    render() {
        return (
            <div>
                {/* <div className="corner-ribbon">Beta</div> */}

                {/* <a
                    className="submit-feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://discourse.quantecon.org/c/bookshelf-feedback">Submit Feedback</a> */}

                <header className="header">

                    <div className="container">

                        <div className="header-container">

                            <div className="site-title">
                                <a onClick={this.redirectToHome}>
                                    <span>
                                        <img src={bookshelfLogo} alt="Bookshelf Logo" className="bookshelf-logo"/>
                                        <div>
                                            <h2 className="site-name">Quant<span>Econ</span>
                                                <strong>Notes</strong>
                                            </h2>
                                        </div>
                                    </span>
                                </a>

                            </div>

                            <div className="site-nav">
                                <p className="site-tag">Open notebook library for economic modeling</p>
                                <ul>
                                    <li>
                                        <Link to='/'>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/faq'>FAQ</Link>
                                    </li>
                                    <li>
                                        <Link to='/about'>About</Link>
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

                                              <h2 ref={subtitle => this.subtitle = subtitle}>Please enter the email of the person you would like to invite</h2>


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

                </header>
            </div>
        );
    };
}

export default Head;
