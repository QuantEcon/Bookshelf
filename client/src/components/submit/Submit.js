import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone';
import Markdown from 'react-markdown';

import HeadContainer from '../../containers/HeadContainer';

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
            fileName: props.isEdit
                ? this.props.submission.data.fileName
                : '',
            rejected: [],
            fileUploaded: props.isEdit
                ? true
                : false,
            uploadError: false,
            showSummaryPreview: false
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

    formData = {
        agreement: false,
        title: this.props.isEdit
            ? this.props.submission.data.notebook.title
            : '',
        summary: this.props.isEdit
            ? this.props.submission.data.notebook.summary
            : '',
        lang: this.props.isEdit
            ? this.props.submission.data.notebook.lang
            : 'Python',
        topics: this.props.isEdit
            ? this.props.submission.data.notebook.topics
            : '',
        coAuthors: this.props.isEdit
            ? this.props.submission.data.coAuthors
            : []
    }

    errors = {
        title: false,
        agreement: false
    }

    dirtyFields = {
        title: false,
        agreement: false
    }

    validate = () => {
        var valid = true;

        if (!this.formData.title) {
            valid = false
            if (this.dirtyFields.title) {
                this.errors.title = true;
            } else {
                this.errors.title = false
            }
        } else {
            this.errors.title = false
        }

        //validate file
        if (!this.state.fileUploaded) {
            valid = false;
        }

        if (!this.formData.agreement) {
            valid = false;
            if (this.dirtyFields.agreement) {
                this.errors.agreement = true;
            } else {
                this.errors.agreement = false;
            }
        } else {
            this.errors.agreement = false;
        }

        //TODO: validate co-author email patterns

        this.setState({
            valid
        }, () => this.forceUpdate());
    }

    removeTopic = (topic, array) => {
        var index = array.indexOf(topic);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    topicChanged(event) {
        //TODO: add/remove topic to/from topic list
        if (event.target.checked) {
            this
                .formData
                .topics
                .push(event.target.name);
        } else {
            this.removeTopic(event.target.name, this.formData.topics);
        }
    }

    submit = (e) => {
        e.preventDefault();
        if (this.props.isEdit) {
            console.log('[EditSubmission] - preview clicked')
            var file = this.state.accepted[0]
                ? this.state.accepted[0]
                : null
            var notebookJSON = this.state.accepted[0]
                ? null
                : this.props.submission.data.notebookJSON
            this.formData.score = this.props.submission.data.notebook.score
            this.formData.views = this.props.submission.data.notebook.views
            this.formData.published = this.props.submission.data.notebook.published
            this
                .props
                .preview({formData: this.formData, file, notebookJSON});
        } else {
            this
                .props
                .submit(this.formData, this.state.accepted[0]);
        }
    }

    langChanged = (event) => {
        this.formData.lang = event.target.value
    }

    titleChanged(event) {
        this.dirtyFields.title = true;
        this.formData.title = event.target.value;
        this.validate();
    }

    agreementChanged = (event) => {
        this.dirtyFields.agreement = true;
        this.formData.agreement = event.target.checked;
        this.validate();
    }

    toggleSummaryPreview = () => {
        this.setState({
            showSummaryPreview: !this.state.showSummaryPreview
        });
    }

    summaryChanged = (event) => {
        this.formData.summary = event.target.value;
        this.forceUpdate();
    }

    onDrop(accepted, rejected) {
        if (accepted.length) {
            this.setState({
                accepted,
                rejected,
                fileUploaded: true,
                uploadError: false,
                fileName: accepted[0].name
            }, () => this.validate());
        } else if (!this.state.fileUploaded) {
            this.setState({
                uploadError: true
            }, () => this.validate());
        }
    }

    printState() {
        console.log("state: ", this.state);
        console.log('errors: ', this.errors);
        console.log('dirty fields: ', this.dirtyFields);
        console.log('formdata: ', this.formData);
    }

    // TODO: stlying for accept is not being applied correctly. Doesn't recognize
    // .ipynb as valid accept parameter The file will still be accepted, however
    render() {
        return (
            <div>
                <HeadContainer/>
                <div className='row columns'>
                    <div className='submit-form'>
                        <form onSubmit={this.submit}>
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
                                                    <h5 className='hint'>{this.state.fileName}</h5>
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
                                        defaultValue={this.formData.title}
                                        onChange={this.titleChanged}/> {this.errors.title
                                        ? <p className="error-help-text">
                                                Title is required
                                            </p>
                                        : null}

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
                                                <Link to={'/user/' + this.props.user._id}>
                                                    <img src={this.props.user.avatar} alt="Your avatar"/>
                                                </Link>
                                            </p>
                                        </div>
                                        <div className='main'>
                                            <p>
                                                <Link to={'/user/' + this.props.user._id}>{this.props.user.name}</Link>
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
                                    <select name="lang" value='python' onChange={this.langChanged}>
                                        <option value="python">Python</option>
                                        <option value="julia">Julia</option>
                                        <option value="r">R</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <hr/>

                                    <label htmlFor='summary' className='section-title'>Summary</label>
                                    <p className="input-hint">You can use{' '}
                                        <a href="http://commonmark.org/help/">markdown</a>{' '}
                                        here.</p>
                                    <textarea
                                        placeholder="Notebook summary"
                                        id="summary"
                                        onChange={this.summaryChanged}
                                        defaultValue={this.formData.summary}></textarea>

                                    {this.state.showSummaryPreview
                                        ? <div>
                                                <Markdown
                                                    source={this.formData.summary
                                                    ? this.formData.summary
                                                    : '*No summary*'}/>
                                                <p
                                                    className="input-hint-after input-hint orange bold"
                                                    onClick={this.toggleSummaryPreview}>
                                                    Close Summary
                                                </p>
                                            </div>
                                        : <p className="input-hint input-hint-after">

                                            <a onClick={this.toggleSummaryPreview}>
                                                Preview
                                            </a>
                                        </p>}
                                </div>

                            </div>

                            <div className='submit-footer'>
                                <p className='section-title'>
                                    Terms
                                    <span className='mandatory'>*</span>
                                </p>

                                <label>
                                    <input type="checkbox" name="agreement" onChange={this.agreementChanged}/>
                                    I agree to the {' '}<a>Terms and Conditions</a>{' '}
                                    of publishing content and sint occaecat cupidatat non proident, sunt in culpa
                                    qui officia deserunt mollit anim id est laborum.
                                </label>

                                {this.errors.agreement
                                    ? <p className="error-help-text">
                                            Agreement is required
                                        </p>
                                    : null}

                            </div>

                            <ul className='button-row'>
                                {this.props.isEdit
                                    ? <li>
                                            <Link to={'/submission/' + this.props.submission.data.notebook._id}>
                                                Cancel
                                            </Link>
                                        </li>
                                    : null}
                                <li>
                                    <button disabled={!this.state.valid}>
                                        Preview
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