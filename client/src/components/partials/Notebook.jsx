import React, {Component, Fragment} from 'react';
import NotebookFromHTML from '../NotebookFromHTML';
import NotebookPreview from '@nteract/notebook-preview'

class Notebook extends Component {
    render() {
        return (
            <Fragment>
                {this.props.nbLoading
                    ? <div>
                        {/* TODO: display download progress */}
                        
                        <div>
                            Loading... ({this.props.dataReceived} / {this.props.totalData})
                            <br/>
                            <progress value={this.props.dataReceived} max={this.props.totalData}></progress>
                        </div>
                    </div>: 
                    <Fragment> {this.props.html
                        ? <div>
                            <p>(pre-rendered notebook)</p>
                            <NotebookFromHTML html={this.props.submission.data.html}/>
                        </div>
                        : <div id='notebook'>
                            <NotebookPreview notebook={this.props.submission.data.notebookJSON}/>
                        </div>} 
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default Notebook;