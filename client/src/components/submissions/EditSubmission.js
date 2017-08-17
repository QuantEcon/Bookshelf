import React, {Component} from 'react';
import Submit from '../submit/Submit'

class EditSubmission extends Component {
    render() {
        return (
            <div>
                <Submit isEdit={true} submission={this.props.submission} user={this.props.currentUser} preview={this.props.preview}/>
            </div>
        )
    }
}

export default EditSubmission