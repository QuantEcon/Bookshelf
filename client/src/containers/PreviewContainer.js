import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux'

// import {bindActionCreators} from 'redux';
import Preview from '../components/submit/Preview'
import {confirm, cancel} from '../actions/submit';

class PreviewContainer extends Component {
    constructor(props) {
        super(props);

        this.onCancel = this
            .onCancel
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    onCancel() {
        if (this.props.actions.cancel()) {
            this
                .props
                .history
                .push('/');
        } else {
            console.log('[PreviewContainer] - error cancelling submission')
        }
    }

    onSubmit() {
        //TODO: this isn't waiting for return from API.
        var id = this
            .props
            .actions
            .confirm();
        if (id) {
            console.log('[PreviewContainer] - success submitting');
            this
                .props
                .history
                .push('/submission/' + id);
        } else {
            console.log('[PreviewContainer] - error confirming submission')
        }
    }

    componentWillReceiveProps(props) {
        console.log('[PreviewContainer] - new props: ', props);
    }
    render() {
        return (

            <div>
                {this.props.submission
                    ? <Preview
                            author={this.props.author}
                            submission={this.props.submission}
                            isLoading={this.props.isLoading}
                            cancel={this.onCancel}
                            confirm={this.onSubmit}></Preview>
                    : <Redirect
                        to={{
                        pathname: '/submit',
                        state: {
                            from: this.props.location
                        }
                    }}/>}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {author: state.auth.user, submission: state.auth.user.currentSubmission, isLoading: state.auth.user.currentSubmission ? state.auth.user.currentSubmission.isLoading : true}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            confirm,
            cancel
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);