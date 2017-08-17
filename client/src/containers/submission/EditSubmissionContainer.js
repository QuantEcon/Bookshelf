import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import EditSubmission from '../../components/submissions/EditSubmission'
import * as actions from '../../actions/editSubmission'

class EditSubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.preview = this
            .preview
            .bind(this);
    }

    preview = ({formData, file, notebookJSON}) => {
        this
            .props
            .actions
            .buildSubmissionPreview({formData, file, notebookJSON, submissionID: this.props.match.params.id});
        this.props.history.push('/edit-submission/' + this.props.match.params.id + '/preview');
    }

    render() {
        return (
            <div>
                <EditSubmission
                    submission={this.props.submission}
                    currentUser={this.props.currentUser}
                    preview={this.preview}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const submissionID = props.match.params.id;
    return {submission: state.submissionByID[submissionID], currentUser: state.auth.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSubmissionContainer);