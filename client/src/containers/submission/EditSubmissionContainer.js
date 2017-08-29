import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import EditSubmission from '../../components/submissions/EditSubmission'
import {editSubmission} from '../../actions/submission'

class EditSubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.save = this
            .save
            .bind(this);
    }

    save = ({formData, file, notebookJSON}) => {
        this
            .props
            .actions
            .editSubmission({formData, file, notebookJSON, submissionID: this.props.match.params.id});
        this.props.history.push('/submission/' + this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <EditSubmission
                    submission={this.props.submission}
                    currentUser={this.props.currentUser}
                    save={this.save}/>
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
        actions: bindActionCreators({editSubmission}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSubmissionContainer);