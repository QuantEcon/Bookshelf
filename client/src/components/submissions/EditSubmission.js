import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Submit from '../submit/Submit'

/**
 * Componnet that renders the {@link Submit} component in an edit submission environment.
 * 
 * It's parent component, {@link EditSubmissionContainer} passes all necessary data to this.
 */
class EditSubmission extends Component {
     /**
     * @prop {Object} currentUser Object containing the current user's information. If no
     * user is signed in, will be `null`
     * @prop {Object} submission Object containing all the information of the submission
     * @prop {Function} save Method 
     */
    static propTypes = {
        submission: PropTypes.object.isRequired,
        currentUser: PropTypes.object.isRequired,
        save: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                <Submit
                    isEdit={true}
                    submission={this.props.submission}
                    user={this.props.currentUser}
                    save={this.props.save}
                    history={this.props.history}/>
            </div>
        )
    }
}

export default EditSubmission