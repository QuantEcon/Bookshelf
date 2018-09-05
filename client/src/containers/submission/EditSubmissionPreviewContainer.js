import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Preview from '../../components/submit/Preview';
import * as editSubmissionActions from '../../actions/editSubmission'
import {editSubmission} from '../../actions/submission'

class EditSubmissionPreviewContainer extends Component {
    constructor(props) {
        super(props);
        this.cancelPreview = this
            .cancelPreview
            .bind(this);
        this.save = this
            .save
            .bind(this);
    }

    cancelPreview = () => {
        console.log('[EditSubmissionPreviewContainer] - submission id: ', this.props.match.params.id);
        this
            .props
            .editSubmissionActions
            .cancelPreview({submissionID: this.props.match.params.id});
        this
            .props
            .history
            .replace('/submission/' + this.props.match.params.id);
    }

    save = () => {
        console.log('[EditSubmissionPreviewContainer] - save clicked');
        this
            .props
            .editSubmissionActions
            .saveSubmission({submissionID: this.props.match.params.id})
        this
            .props
            .submissionActions
            .editSubmission({submissionData: this.props.submission});
        this.props.history.replace('/submission/' + this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Preview
                    isEdit={true}
                    submission={this.props.submission}
                    author={this.props.currentUser}
                    isLoading={this.props.submission.isLoading}
                    cancel={this.cancelPreview}
                    save={this.save}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    return {
        currentUser: state.auth.user,
        submission: state.editSubmissionByID[props.match.params.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editSubmissionActions: bindActionCreators(editSubmissionActions, dispatch),
        submissionActions: bindActionCreators({
            editSubmission
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSubmissionPreviewContainer);