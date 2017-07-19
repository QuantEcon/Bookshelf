import React, {Component} from 'react';

import Dropzone from 'react-dropzone';
import Head from '../partials/Head';

class Submit extends Component {

    topics = [
        'All',
        'General Economics and Teaching',
        'History of Economic Thought, Methodology, and Heterodox Approaches',
        'Mathematical and Quantitative Methods',
        'Microeconomics',
        'Macroeconomics and Monetary Economics',
        'International Economics',
        'Financial Economics',
        'Public Economics',
        'Health, Education, and Welfare',
        'Labor and Demographic Economics',
        'Law and Economics',
        'Industrial Organization',
        'Business Administration and Business Economics • Marketing • Accounting • Person' +
                'nel Economics',
        'Economic History',
        'Economic Development, Innovation, Technological Change, and Growth',
        'Economic Systems',
        'Agricultural and Natural Resource Economics • Environmental and Ecological Econo' +
                'mics',
        'Urban, Rural, Regional, Real Estate, and Transportation Economics',
        'Miscellaneous',
        'Other'
    ];

    constructor(props) {
        super(props);

        this.state = {
            accepted: [],
            rejected: [],
            fileUploaded: false,
            uploadError: false
        }

        this.onDrop = this
            .onDrop
            .bind(this);
        this.printState = this
            .printState
            .bind(this);
        this.titleChanged = this
            .titleChanged
            .bind(this);
        this.topicChanged = this
            .topicChanged
            .bind(this);
    }

    topicChanged(event){
        console.log('topic changed: ', event.target.name, ' = ', event.target.checked);
        //TODO: add/remove topic to/from topic list
    }

    titleChanged(event) {
        this.setState({title: event.target.value});
    }

    onDrop(accepted, rejected) {
        if (accepted.length) {
            this.setState({accepted, rejected, fileUploaded: true, uploadError: false});
        } else if (!this.state.fileUploaded) {
            this.setState({uploadError: true});
        }
    }

    printState() {
        console.log("Print state: ", this.state);
    }

    // TODO: stlying for accept is not being applied correctly. Doesn't recognize
    // .ipynb as valid accept parameter
    render() {
        // The file will still be accepted, however
        return (
            <div>
                <Head/>
                <div className='row columns'>
                    <div className='submit-form'>
                        <form action="">
                            <div className='submit-upload'>
                                <h2 className='section-title'>Notebook File
                                    <span className='mandatory'>*</span>
                                </h2>
                                <p className="input-hint">
                                    You will be able to preview the rendered Notebook before publishing. A published
                                    Notebook can be modified by uploading an updated version.
                                </p>
                                <Dropzone
                                    multiple={false}
                                    className='dropzone'
                                    maxSize={10000000}
                                    onDrop={this.onDrop}
                                    activeClassName='dragover'
                                    rejectClassName='dragover'
                                    disablePreview={true}
                                    accept='.ipynb'>
                                    <div className="dz-default dz-message">
                                        {this.state.fileUploaded
                                            ? <div>
                                                    <h5 className='hint'>{this.state.accepted[0].name}</h5>
                                                </div>
                                            : <div>
                                                <p className='hint'>
                                                    Drop Notebook file here or
                                                    <strong>{' '}click{' '}</strong>
                                                    to browse
                                                </p>
                                                <p>
                                                    You can upload an
                                                    <strong>{' '}.ipynb{' '}</strong>
                                                    file up to 10mb
                                                </p>
                                            </div>}

                                        {this.state.uploadError
                                            ? <p className='error-help-text'>Please submit a file of type
                                                    <strong>{' '}.ipynb{' '}</strong>
                                                </p>
                                            : null}

                                    </div>
                                </Dropzone>
                            </div>

                            <div className='submit-header'>
                                <div className='submit-title'>
                                    <label className='section-title'>
                                        Title
                                        <span className='mandatory'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Notebook Title'
                                        required='required'
                                        onChange={this.titleChanged}/>

                                </div>
                            </div>

                            <div className='submit-primary'>
                                <div className='submit-primary-group1'>
                                    <h2 className='section-title'>Co-Authors</h2>
                                    <p>An email will be sent to each co-author requesting their permission to be
                                        acknowledged.</p>
                                    <div className='coauthor-emails'>
                                        <input type="email" placeholder='Email address'/>
                                        <input type="email" placeholder='Email address'/>
                                        <input type="email" placeholder='Email address'/>
                                        <input type="email" placeholder='Email address'/>
                                    </div>
                                </div>

                                <div className='submit-primary-group2'>
                                    <h2 className='section-title'>Author
                                        <span className='mandatory'>*</span>
                                    </h2>
                                    <p>You are signed in as:</p>
                                    <div className='submit-user'>
                                        <div className='side'>
                                            <p className='avatar'>
                                                <a href="/user">img</a>
                                            </p>
                                        </div>
                                        <div className='main'>
                                            <p>
                                                <a href="/user">Username</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='submit-secondary'>
                                <div className='submit-secondary-group1'>
                                    <h2 className='section-title'>Topics</h2>
                                    <ul className='submit-topics'>
                                        {this
                                            .topics
                                            .map(function (topic, index) {
                                                return (
                                                    <li key={index}>
                                                        <input type="checkbox" name={index} onChange={this.topicChanged}/>
                                                        <label>{topic}</label>
                                                    </li>
                                                );
                                            }, this)}
                                    </ul>
                                </div>
                                <div className='submit-secondary-group2'>
                                    <label className='section-title'>Language
                                        <span className='mandatory'>*</span>
                                    </label>
                                    <select name="lang">
                                        <option value="python">Python</option>
                                        <option value="julia">Julia</option>
                                        <option value="r">R</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                            </div>

                            <div className='submit-footer'></div>

                            <ul className='button-row'>
                                <li>
                                    <button onClick={this.submit}>
                                        Submit
                                    </button>
                                </li>
                            </ul>

                        </form>
                    </div>
                </div>

                <button onClick={this.printState}>Print State</button>
            </div>

        )
    }
}

export default Submit;