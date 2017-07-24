import React, { Component } from 'react';
import {connect} from 'react-redux';
import Submission from '../../components/submissions/Submission';

class SubmissionContainer extends Component {
    constructor(props){
        super(props);

        var notebookID = props.match.params.id;
        //TODO: dispatch find notebook action

        
        this.state = {
            submission: {}
        }
    }

    render(){
        <div>
            <Submission submission={this.state.submission}/>
        </div>
    }
}

function mapStateToProps(state, props) {
    return {
        submission: state.submission
    }
}

function mapDispatchToProps(dispatch){

}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);