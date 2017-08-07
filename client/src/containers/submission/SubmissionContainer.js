import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Submission from '../../components/submissions/Submission';
import * as AuthActions from '../../actions/auth/auth';
import {fetchNBInfo} from '../../actions/submission'

const actions = {
    ...AuthActions,
    fetchNBInfo
}

class SubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.props.actions.fetchNBInfo(props.match.params.id);
    }

    // componentWillReceiveProps(props){
    //     console.log('[SubmissionContainer] - received new props: ', props);
    // }

    render() {
        return (
            <div>
                <Submission submission={this.props.submission} 
                submissionID={this.props.match.params.id} 
                isLoading={this.props.isLoading} 
                currentUser={this.props.currentUser}
                actions={this.props.actions}/>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    var il = true;
    if(state.submissionByID[props.match.params.id]){
        il = state.submissionByID[props.match.params.id].isFetching
    } 
    return {
        submission: state.submissionByID[props.match.params.id],
        currentUser: state.auth.isSignedIn ? state.auth.user : null,
        isLoading: il
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);