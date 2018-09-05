import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import EditSubmission from '../../components/submissions/EditSubmission'
import {editSubmission} from '../../actions/submission'

/**
 * Parent container for the {@link EditSubmission} component. Retrieves data and actions
 * from the Redux store and passes to the child component
 */
class EditSubmissionContainer extends Component {
    /**
     * @prop {Object} currentUser Object containing the current user's information. If no
     * user is signed in, will be `null`
     * @prop {Object} submission Object containing all the information of the submission
     * @prop {Object} actions Contains all actions necessary for editing a submission
     */
    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        submission: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        console.log("esc props:" , props)

        this.save = this
            .save
            .bind(this);
        this.saveCallback = this.saveCallback.bind(this)
    }

    /**
     * Dispatches a save action. Once the action completes, `saveCallback` will be called.
     *
     * Note: Either the `file` or `notebookJSON` will be null. If the user uploaded a new file,
     * `notebookJSON` will be null. If no new file was uploaded, `file` will be null and `notebookJSON`
     * will be populated with the original contents of the ipynb file.
     *
     * @param {Object} param0
     * @param {Object} param0.formData Contains all the information the user entered in the form
     * @param {File} param0.file Reference to the file the user uploaded.
     * @param {Object} param0.notebookJSON JSON representing the ipynb file
     */
    save ({formData, file, notebookJSON}) {

        this
            .props
            .actions
            .editSubmission({formData, file, notebookJSON, submissionID: this.props.match.params.id}, this.saveCallback);
    }

    /**
     * Callback for a save action. If there was an error saving the submission, `success` will
     * be false, otherwise it will be true.
     * @param {bool} success Save was successful or not
     */
    saveCallback(success) {
        if(success){
            this.props.history.push('/submission/' + this.props.match.params.id)
        } else {
            console.warn("Error editing submission")
        }
    }

    render() {
        return (
            <div>
                <EditSubmission
                    submission={this.props.submission}
                    currentUser={this.props.currentUser}
                    save={this.save}
                    history={this.props.history}/>
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
