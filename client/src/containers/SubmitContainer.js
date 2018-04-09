import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import Submit from '../components/submit/Submit'
import * as SubmitActions from '../actions/submit'

/**
 * Parent container for {@link Submit}. Retrives the current user from the redux store, 
 * retrieves the Submit Actions and passes them to the child component
 */
class SubmitContainer extends Component {
    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * Dispatches a submit action. Called by the {@link Submit} component when the user clicks
     * the submit button
     * @param {Object} formData All data the user entered in the submission form
     * @param {File} file File the user uploaded for the submission
     */
    onSubmit (formData, file){
        console.log('[SubmitContainer] - onsubmit: ', formData, file)
        this
            .props
            .actions
            .submit(formData, file);
        this.props.history.push('/')
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
                    : <Submit user={this.props.user} submit={this.onSubmit} history={this.props.history}></Submit>}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {user: state.auth.user}
}

function mapDispatchToProps(dispatch) {
    console.log("map dispatch to props: ", SubmitActions);
    return {
        actions: bindActionCreators(SubmitActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitContainer);