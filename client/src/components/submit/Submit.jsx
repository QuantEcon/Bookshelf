import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone';
import Markdown from 'react-markdown';
import Modal from 'react-modal';
import NotebookPreview from '@nteract/notebook-preview';
import {transforms, displayOrder} from '@nteract/transforms-full';
import CloseIcon from 'react-icons/lib/fa/close'
import HeadContainer from '../../containers/HeadContainer';
import Breadcrumbs from '../partials/Breadcrumbs'

class Submit extends Component {

    topics = [
        'All',
        "Agricultural Economics",
        "Business Economics",
        "Computational Economics",
        "Computational Techniques",
        "Economic Development",
        "Economic History",
        "Economics of Education",
        "Economics of Law",
        "Environmental Economics",
        "Financial Economics",
        "Game Theory",
        "General Economics and Teaching",
        "Health Economics",
        "Industrial Organization",
        "International Economics",
        "Labor Economics",
        "Macroeconomics",
        "Mathematical/Quantitative Methods",
        "Microeconomics",
        "Monetary Economics",
        "Public Economics",
        "Other"
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
            showSummaryPreview: false,
            modalOpen: false,
            notebookDataReady: false,
            notebookJSON: {}
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
        this.toggleTermsAndConditionsModal = this
            .toggleTermsAndConditionsModal
            .bind(this);
    }

    componentDidMount() {
        if (this.props.isEdit) {
            document.title = 'Edit Submission'
        } else {
            document.title = 'Submit'
        }
    }

    toggleTermsAndConditionsModal = () => {
        this.setState({
            termsAndConditionsModalOpen: !this.termsAndConditionsModalOpen
        })
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
            : [],
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
                .push(this.topics[event.target.name]);
        } else {
            this.removeTopic(this.topics[event.target.name], this.formData.topics);
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
                .save({formData: this.formData, file, notebookJSON});
        } else {
            console.log('[EditSubmission] - not edit')

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
            var reader = new FileReader();
            this.setState({notebookDataReady: false});
            reader.readAsText(accepted[0]);
            reader.onload = (event) => {
                this.setState({
                    notebookJSON: JSON.parse(event.target.result),
                    notebookDataReady: true,
                    accepted,
                    rejected,
                    fileUploaded: true,
                    uploadError: false,
                    fileName: accepted[0].name
                }, () => this.validate())
            }
        } else if (!this.state.fileUploaded) {
            this.setState({
                uploadError: true
            }, () => this.validate());
        }
    }

    toggleOpenModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    readNotebookFile = () => {
        if (!this.state.notebookDataReady) {
            var reader = new FileReader();
            this.setState({notebookDataReady: false});
            reader.readAsText(this.state.accepted[0]);
            reader.onload = (event) => {
                this.setState({
                    notebookJSON: JSON.parse(event.target.result),
                    notebookDataReady: true
                })
            }
        }
        this.toggleOpenModal();
    }

    printState() {
        console.log("state: ", this.state);
        console.log('errors: ', this.errors);
        console.log('dirty fields: ', this.dirtyFields);
        console.log('formdata: ', this.formData);
    }

    isTopicSelected(topic) {
        return this
            .formData
            .topics
            .indexOf(topic) > -1;
    }

    // TODO: stlying for accept is not being applied correctly. Doesn't recognize
    // .ipynb as valid accept parameter The file will still be accepted, however
    render() {
        return (
            <div>
                <HeadContainer/>
                <Breadcrumbs title='Submit'/>
                <Modal isOpen={this.state.modalOpen} contentLabel="Preview">
                    <CloseIcon onClick={this.toggleOpenModal}/>
                    <NotebookPreview
                        notebook={this.state.notebookJSON}
                        transforms={transforms}
                        displayOrder={displayOrder}/>
                </Modal>
                <Modal isOpen={this.state.termsAndConditionsModalOpen} contentLabel="Preview">
                    <CloseIcon onClick={this.toggleTermsAndConditionsModal}/>
                    <div className='submit-footer'>
                        <p className='section-title'>
                            Terms
                            <span className='mandatory'>*</span>
                        </p>
                        <label>
                            By submitting to `QuantEconLib` you acknowledge:
                            <ul>
                                <li>
                                    1. the content in your notebook is available and shared with the public internet
                                </li>
                                <li>
                                    2. your notebook does not contain any illegal or copyrighted material
                                </li>
                                <li>
                                    3. any notebook that is submitted to this service may be viewed and downloaded
                                    by users visiting this website.
                                </li>
                                <li>
                                    4. all software contained in the notebooks are considered to be released under a
                                    BSD-3 license.
                                </li>
                                <li>
                                    5. QuantEcon reserves the right the delete your notebook if found to violate
                                    these terms and conditions
                                </li>
                            </ul>

                        </label>
                    </div>
                </Modal>

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
                                <ul className='button-row'>
                                    <li>
                                        <button
                                            disabled={!this.state.fileUploaded || !this.state.notebookDataReady}
                                            onClick={this.toggleOpenModal}>
                                            Preview
                                        </button>
                                    </li>
                                </ul>

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
                                                        <input
                                                            type="checkbox"
                                                            name={index}
                                                            onChange={this.topicChanged}
                                                            defaultChecked={this.props.isEdit && this.isTopicSelected(topic)}/>
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
                                    <select name="lang" defaultValue='python' onChange={this.langChanged}>
                                        <option value="Python">Python</option>
                                        <option value="Julia">Julia</option>
                                        <option value="R">R</option>
                                        <option value="Other">Other</option>
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
                                                    Close Preview
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
                                    of publishing content:
                                    <br/>
                                    <br/>
                                    By submitting to
                                    <span className='title'>QuantEcon Bookshelf</span>
                                    you acknowledge:
                                    <ol className='terms-and-conditions'>
                                        <li>
                                            The content in your notebook is available and shared with the public internet
                                        </li>
                                        <li>
                                            Your notebook does not contain any illegal or copyrighted material
                                        </li>
                                        <li>
                                            Any notebook that is submitted to this service may be viewed and downloaded by
                                            users visiting this website.
                                        </li>
                                        <li>
                                            All software contained in the notebooks are considered to be released under a
                                            BSD-3 license.
                                        </li>
                                        <li>
                                            QuantEcon reserves the right the delete your notebook if found to violate these
                                            terms and conditions
                                        </li>
                                    </ol>
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
                                        Submit
                                    </button>
                                </li>
                            </ul>

                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Submit;