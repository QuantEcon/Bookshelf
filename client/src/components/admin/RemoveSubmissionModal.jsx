import React, {Component} from 'react'
import Modal from 'react-modal'

import SubmissionPreview from '../submissions/submissionPreview'

class RemoveSubmissionModal extends Component {
    constructor(props){
        super(props)

        this.state = {
            textEntry: ""
        }

        this.textChanged = this.textChanged.bind(this)
        this.remove = this.remove.bind(this)
    }

    textChanged = (e) => {
        if(e){
            e.preventDefault()
        }
        this.setState({
            textEntry: e.target.value
        })
    }

    remove = (e) => {
        console.log("Delete clicked")
        if(e){
            e.preventDefault()
        }

        if(this.state.textEntry === this.props.submission.data.title){
            this.props.onRemove(this.props.submission.data._id)
        }
    }

    render(){
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="Remove Submission"
                className="overlay">
                <div className="my-modal">
                    <div className="modal-header">
                        <h1 className="modal-title">Remove Submission</h1>
                    </div>

                    <div className="modal-body">
                        <p>Are you sure you want to remove this submission?</p>
                        <p>WARNING: THIS IS IRREVERSIBLE. THIS WILL REMOVE THE CONTENT FROM THE DATABASE</p>
                        <SubmissionPreview submission={this.props.submission.data} author={this.props.submission.author}/>
                        <p>Enter the name of the submission to continue:</p>
                        <form name="deleteForm" onSubmit={this.delete}>
                            <input type="text"
                                onChange={this.textChanged}
                                placeholder={this.props.submission? this.props.submission.data.title : null}
                                onSubmit={this.delete}
                                autoFocus/>
                            <ul className="button-row">
                                <li>
                                    <button disabled={this.state.textEntry !== this.props.submission.data.title} onClick={this.remove}>Remove</button>
                                </li>
                                <li>
                                    <button onClick={this.props.onCancel} className="alt">Cancel</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </Modal>

        )
    }
}

export default RemoveSubmissionModal