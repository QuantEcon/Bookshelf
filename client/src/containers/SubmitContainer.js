import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import Submit from '../components/submit/Submit'
import * as SubmitActions from '../actions/submit'

class SubmitContainer extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (formData, file) => {
        console.log('[SubmitContainer] - onsubmit: ', formData, file)
        this
            .props
            .actions
            .submit(formData, file);
        this.props.history.push('/submit/preview')
    }

    render() {
        return (
            <div>
                {this.props.user.currentSubmission
                    ? <Redirect
                            to={{
                            pathname: '/submit/preview',
                            state: {
                                from: this.props.location
                            }
                        }}/>
                    : <Submit user={this.props.user} submit={this.onSubmit}></Submit>}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {user: state.auth.user}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SubmitActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitContainer);