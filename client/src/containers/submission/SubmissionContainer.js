import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Submission from '../../components/submissions/Submission';
import * as SubmissionActions from '../../actions/submission';

class SubmissionContainer extends Component {
    constructor(props) {
        super(props);
        // console.log('[SubmissionContainer] - props: ', props);
        this.props.actions.fetchNBInfo(props.match.params.id);
    }

    // componentWillReceiveProps(props){
    //     console.log('[SubmissionContainer] - received new props: ', props);
    // }

    render() {
        return (
            <div>
                <Submission submission={this.props.submission} isLoading={this.props.isLoading} myID={this.props.myID}/>
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
        myID: state.auth.isSignedIn ? state.auth.user._id : null,
        isLoading: il
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SubmissionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);