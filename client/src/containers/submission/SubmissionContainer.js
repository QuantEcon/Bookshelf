import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Submission from '../../components/submissions/Submission';
import * as AuthActions from '../../actions/auth/auth';
import {downvoteSubmission, upvoteSubmission} from '../../actions/auth/vote'
import {fetchNBInfo, deleteSubmission} from '../../actions/submission'
import NotFound from '../../components/NotFound'

const actions = {
    ...AuthActions,
    fetchNBInfo,
    downvoteSubmission,
    upvoteSubmission,
    deleteSubmission
}

/**
 * Submission Container
 * 
 * Parent container for {@link Submission}. Retrieves all data from the Redux store
 * and passes it to the child Submission component. 
 */
class SubmissionContainer extends Component {
    /**
     * @prop {Object} actions Contains the actions required for the submission page.
     */
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this
            .props
            .actions
            .fetchNBInfo({notebookID: props.match.params.id});
    }

    render() {
        if(this.props.submission && this.props.submission.error){
            return (
                <div>
                    <NotFound/>
                </div>
            )
        } else {
            return (
                <div>
                    <Submission
                        submission={this.props.submission}
                        submissionID={this.props.match.params.id}
                        isLoading={this.props.isLoading}
                        currentUser={this.props.currentUser}
                        actions={this.props.actions}
                        history={this.props.history}/>
                </div>
            )
        }
        

    }
}

function mapStateToProps(state, props) {
    var il = true;
    if (state.submissionByID[props.match.params.id]) {
        il = state.submissionByID[props.match.params.id].isFetching
    }
    console.log("[SubmissionComponent] - map state to props: ", state)
    return {
        submission: state.submissionByID[props.match.params.id],
        currentUser: state.auth.isSignedIn
            ? state.auth.user
            : null,
        isLoading: il
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);