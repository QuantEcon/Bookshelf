import React, {Component} from 'react';
import Modal from 'react-modal'
import axios from 'axios'
import CheckmarkIcon from 'react-icons/lib/fa/check-circle-o'
import ErrorIcon from 'react-icons/lib/md/error-outline'

class BetaBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            emailValid: false,
            email: '',
            submitted: false
        }
        this.toggleShowModal = this
            .toggleShowModal
            .bind(this);
        this.validateEmail = this
            .validateEmail
            .bind(this);
        this.emailTextChanged = this
            .emailTextChanged
            .bind(this);
        this.submit = this
            .submit
            .bind(this);
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailTextChanged = (event) => {
        this.setState({
            emailValid: this.validateEmail(event.target.value),
            email: event.target.value
        })
    }

    toggleShowModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    submit(e) {
        e.preventDefault();
        console.log('[BetaBanner] - submit clicked: ', this.state.email)
        axios
            .post('/add-notify-email', {email: this.state.email})
            .then(resp => {
                console.log('[NotifyModal] - success adding email notify list: ', resp);
                this.setState({showModal: false, email: '', submitted: true, error: false})
            })
            .catch(err => {
                console.log('[NotifyModal] - there was an error: ', err);
                this.setState({showModal: false, email: '', submitted: true, error: true})
            })
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel='Notify Me'
                    className='overlay'>
                    <div className='my-modal'>
                        <div className='modal-header'>
                            <h1 className='modal-title'>
                                Notify Me
                            </h1>
                        </div>
                        <div className='modal-body'>
                            <p className='padded-below'>
                                If you would like to be notified when version 1.0 is released, please enter your
                                email in here and submit.
                            </p>
                            <input
                                className='center'
                                type="text"
                                placeholder='Email'
                                onChange={this.emailTextChanged}/>
                            <ul className='button-row'>
                                <li>
                                    <button className='alt' onClick={this.toggleShowModal}>
                                        Cancel
                                    </button>
                                </li>
                                <li>
                                    <button disabled={!this.state.emailValid} onClick={this.submit}>
                                        Submit
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
                {this.state.submitted && !this.state.error
                    ? <div className="success callout">
                            <div className="row columns">
                                <p className="callout-message">
                                    <CheckmarkIcon/>
                                    Thank you! We'll email you when version 1.0 is released
                                </p>
                            </div>
                        </div>
                    : null}

                {this.state.submitted && this.state.error
                    ? <div className="warning callout">
                            <div className="row columns">
                                <p className="callout-message">
                                    <ErrorIcon/>
                                    Sorry! An error has occurred
                                </p>
                            </div>
                        </div>
                    : null}
                <div className='row'>
                    <div className='column'>

                        <ul className='horizontal'>
                            <li className='center'>
                                <p className='banner-center'>
                                    The website is currently in the beta stages. If you would like to be notified
                                    when the full website is released, please click the 'Notify Me' button.
                                </p>
                            </li>
                            <li className='vertical-center'>
                                <button className='orange-block' onClick={this.toggleShowModal}>
                                    Notify Me
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default BetaBanner