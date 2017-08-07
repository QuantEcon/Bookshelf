import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Submit from '../components/submit/Submit'
import * as SubmitActions from '../actions/submit'

class SubmitContainer extends Component {
    constructor(props) {
        super(props);
        console.log('[SubmitContainer] - props: ', props);
    }

    onSubmit = (formData, file) => {
        console.log('[SubmitContainer] - onsubmit: ', formData, file)
    }

    render() {
        return (
            <div>
                <Submit user={this.props.user} submit={this.onSubmit}></Submit>
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