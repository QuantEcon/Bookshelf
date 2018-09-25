import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone';
// import {MarkdownRender} from '../MarkdownMathJax';
import MarkdownRender from '@nteract/markdown'
import Modal from 'react-modal';
import NotebookPreview from '@nteract/notebook-preview';
import {typesetMath} from 'mathjax-electron'
// import {transforms, displayOrder} from '@nteract/transforms-full';
import CloseIcon from 'react-icons/lib/fa/close'
import HeadContainer from '../../containers/HeadContainer';
import Breadcrumbs from '../partials/Breadcrumbs'
import { Prompt } from 'react-router'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0',
    width                 : '600px'
  }
};

const maxWords = 251

/**
 * Renders the form to submit a new notebook. It's parent container, {@link SubmitContainer},
 * passes the `submit` function as a prop.
 */
class Submit extends Component {

    /**
     * @prop {Object} user Contains all the current user's data.
     * @prop {func} submit Method to call after successful form validation and when the user
     * clicks on submit
     * @prop {Object} history Required for navigation.
     * @prop {func} save Method to call after successful form validation and when the user
     * clicks on save. This is used if this is an EditSubmission page

     */

    static propTypes = {
        user: PropTypes.object.isRequired,
        submit: PropTypes.func,
        history: PropTypes.object.isRequired,
        save: PropTypes.func
    }

    topics = [
        "Agricultural Economics",
        "Business Economics",
        "Computational Economics",
        "Econometrics",
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
            markdownRefereceModal: false,
            summaryModal: false,
            notebookDataReady: false,
            notebookJSON: {},
            contentSaved: false,
            cancelSubmissionModal: false,
            redirect: false,
            count: 0,
            pasteValue: false,
            textareaValue: 0,
            triggerOnKeyPress: false,
            summary: ''
        }

        this.onOpenClick = this
            .onOpenClick
            .bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body')
    }

    componentDidMount() {
        if (this.props.isEdit) {
            document.title = 'Edit Submission - QuantEcon Notes';
            if (this.props.submission.data.notebook.summary.split(' ').length == 1 && this.props.submission.data.notebook.summary.split(' ')[0] == '') {
              this.setState({summary: '', count: 0})
            }
            else {
              this.setState({summary: this.props.submission.data.notebook.summary, count: this.props.submission.data.notebook.summary.split(' ').length})
            }
        } else {
            document.title = 'Submit - QuantEcon Notes'
        }

    }

    /**
     * Toggles the visibliity of the Terms and Conditions Modal
     */
    toggleTermsAndConditionsModal(){
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
            : {},
        lastUpdated: this.props.isEdit
            ? this.props.submission.data.lastUpdated
            : ''
    }

    errors = {
        title: false,
        agreement: false
    }

    dirtyFields = {
        title: false,
        agreement: false
    }

    /**
     * Validates the form to ensure all required fields are filled out correctly.
     *
     * If there is an error in a field, an error message will be displayed underneath the
     * input.
     */
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

    /**
     * Removes the topic from the selected topics array
     * @param {String} topic Topic to remove from form data
     * @param {Array} array Array of topics
     */
    removeTopic = (topic, array) => {
        var index = array.indexOf(topic);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    /**
     * Listener method for `onChange` on the topics' checkboxes. Adds/removes the topic
     * from the form data topic list
     * @param {Object} event Event passed from the `onChange` listener
     */
    topicChanged = (event) => {
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

    /**
     * Calls the prop action `submit` if this is a new submission or the prop action `save` if
     * the submission is being edited
     * @param {Object} e Event passed from the `submit` listener
     */
    submit = (e) => {
        if(e) {
            e.preventDefault()
        }
        this.setState({contentSaved : true}, () => {

        if (this.props.isEdit) {
            console.log('[EditSubmission] - submit edit', this.props)
            var file = this.state.accepted[0]
              ? this.state.accepted[0]
              : null
            var notebookJSON = this.state.accepted[0]
              ? null
              : this.props.submission.data.notebookJSON
          this.formData.score = this.props.submission.data.notebook.score
          this.formData.views = this.props.submission.data.notebook.views
          this.formData.published = this.props.submission.data.notebook.published
          this.formData.lastUpdateDate = Date(Date.now())
          this.props.save({formData: this.formData, file, notebookJSON})
          console.log("[FormData Saved after Edit] - ", this.formData.lastUpdateDate);
          ;
      } else {
          console.log('[EditSubmission] - not edit')

          this
              .props
              .submit(this.formData, this.state.accepted[0]);
      }
     });
    }

    langChanged = (event) => {
        this.formData.lang = event.target.value
    }

    titleChanged = (event) => {
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
        setTimeout(() => {
            typesetMath(this.rendered)
        }, 20);
    }

    renderMath = () => {
        typesetMath(this.rendered)
    }

    summaryLimit = (event) => {
      event.preventDefault();
      //Display modal error to users
      this.toggleSummaryModal();
      this.forceUpdate();
    }

    summaryChanged = (event) => {
      this.setCounts(event.target.value)
      this.setState({summary: event.target.value})

      if (this.state.count < maxWords) {
        this.formData.summary = event.target.value;
        this.setState({triggerOnKeyPress: false, pasteValue: false})
      }
      if (this.state.count >= maxWords || event.target.value.split(' ').length >= maxWords) {
        this.formData.summary = event.target.value.split(' ').slice(0, maxWords-1).join(' ');
        this.setState({summary: this.formData.summary, count: this.formData.summary.split(' ').length })
        this.setState({triggerOnKeyPress: true, pasteValue: true})
      }
      this.forceUpdate();
    }


    /**
     * Listener for when a user drops files into the drop zone
     * @param {Array} accepted Array of accepeted files
     * @param {Array} rejected Array of rejected files
     */
    onDrop = (accepted, rejected) => {
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

    onOpenClick = ()=> {
      this.refs.dropzoneref.open();
    }

    /**
     * Opens the submission preview modal
     * @param {Object} e Event passed from the `onClick` listener
     */
    toggleOpenModal = (e) => {
        e.preventDefault()
        this.setState({
            modalOpen: !this.state.modalOpen,
        })
    }

    closeModal = () => {
      this.setState({modalOpen: false, cancelSubmissionModal: false});
    }

    /**Reads the contents of the file submitted to prepare the notebookJSON for submission */
    readNotebookFile = () =>{
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

    isTopicSelected = (topic) => {
        return this
            .formData
            .topics
            .indexOf(topic) > -1;
    }

    toggleMarkdownReferenceModal = (e) => {
        e.preventDefault()
        this.setState({
            markdownRefereceModal: !this.state.markdownRefereceModal
        })
    }

    toggleCancelSubmissionModal = (e) => {
        e.preventDefault()
        this.setState({
            cancelSubmissionModal: !this.state.cancelSubmissionModal
        })
    }

    // Using redirect to redirect users when 'yes' is clicked back to home page.
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    toggleSummaryModal = (event) => {
      this.setState({
        summaryModal: !this.state.summaryModal
      })
    }

    removeEmptyElements = (arr) => {
      const index = arr.findIndex(el => el.trim() === '');
      if (index === -1)
        return arr;
      arr.splice(index, 1);
      return this.removeEmptyElements(arr)
    };

    setCounts = (value) => {
      const trimmedValue = value.trim();
      const words = this.removeEmptyElements(trimmedValue.split(' '));
      this.setState({
        count: value === '' ? 0 : words.length
      });
    }

    pasting = (event) => {
      event.preventDefault();
      event.stopPropagation();
    }

    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
                <Breadcrumbs title='Submit'/>

              {/* Modal window for preview button in the edit notebook submission */}
                <Modal isOpen={this.state.modalOpen}
                       onRequestClose={this.closeModal}
                       contentLabel="Preview">
                    <CloseIcon onClick={this.toggleOpenModal}/>
                    <NotebookPreview notebook={this.state.notebookJSON}/>
                </Modal>

                {/* Modal window for cancel button in the edit notebook submission */}
                <Modal isOpen={this.state.cancelSubmissionModal}
                      onRequestClose={this.toggleCancelSubmissionModal}
                      contentLabel="Cancel Submission"
                      style={customStyles}
                      shouldCloseOnOverlayClick={false} >
                  <div className="modal">
                    <div className="modal-header">
                      <h1 className='modal-title'>Cancel Changes</h1>
                    </div>
                    <div className="modal-body">
                      <p><strong>All the changes made will be lost, are you sure you want to leave?</strong></p>
                      <ul className="options">
                        <li>
                          <a className='alt' onClick={this.toggleCancelSubmissionModal}>Cancel</a>
                        </li>
                        <li>
                          {this.renderRedirect()}
                          <a onClick={this.setRedirect}>Yes</a>
                        </li>
                      </ul>
                      <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.closeModal}><span aria-hidden="true">×</span></button>
                    </div>
                  </div>
                </Modal>
                <Modal isOpen={this.state.summaryModal} style={customStyles} contentLabel="Summary">
                    <div className="modal">
                      <div className="modal-header">
                        <h1 className='modal-title'>Summary Word Limits</h1>
                      </div>
                      <div className="modal-body">
                        <p><strong>The word limits for summary is 250 words.</strong></p>
                        <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.toggleSummaryModal}><span aria-hidden="true">×</span></button>
                      </div>
                    </div>
                </Modal>

                <Modal isOpen={this.state.markdownRefereceModal} contentLabel="Markdown Referece" className="overlay">
                    <div className='my-modal'>
                    <CloseIcon onClick={this.toggleMarkdownReferenceModal}/>
                        <div className='modal-header'>
                            <h1 className='modal-title'>Markdown Reference</h1>
                        </div>
                        <div className='modal-body'>
                            <ul>
                                <li>
                                    <MarkdownRender source="Use ticks (\`\`) for code: \`hello world\` -> `hello world`"/>
                                </li>
                                <li>
                                    <MarkdownRender source="Use \* for italics: \*italics\* -> *italics*"/>
                                </li>
                                <li>
                                    <MarkdownRender source="Use \*\* for bold: \*\*bold\*\* -> **bold**"/>
                                </li>
                            </ul>
                        </div>
                    </div>
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
                                    5. Jupyter notebooks uploaded to this site are considered to be released under
                                    a CC BY-ND 4.0 International license.
                                </li>
                                <li>
                                    5. QuantEcon reserves the right the delete your notebook if found to violate
                                    these terms and conditions
                                </li>
                                <li>
                                    6. If you choose to delete your account, your submissions and comments will
                                    remain listed on the forum and in any backups required to maintain the site.
                                </li>
                            </ul>

                        </label>
                    </div>
                </Modal>

                <div className='container'>
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
                                    ref = 'dropzoneref'
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
                                        <button type="button"
                                              disabled = {!this.props.isEdit}
                                              onClick={this.onOpenClick}>
                                              Update Notebook
                                        </button>

                                    </li>
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
                                        maxLength="120"
                                        defaultValue={this.formData.title}
                                        onChange={this.titleChanged}/> {this.errors.title
                                        ? <p className="error-help-text">
                                                Title is required
                                            </p>
                                        : null}

                                </div>
                            </div>

                            <div className='submit-primary'>
                                {/* <div className='submit-primary-group1'>
                                    <h2 className='section-title'>Co-Authors</h2>
                                    <p>An email will be sent to each co-author requesting their permission to be
                                        acknowledged.</p>
                                    <div className='coauthor-emails'>
                                        <input type="email" placeholder='Email address' onChange={(e) => this.coAuthorChanged(e, 1)}/>
                                        <input type="email" placeholder='Email address' onChange={(e) => this.coAuthorChanged(e, 2)}/>
                                        <input type="email" placeholder='Email address' onChange={(e) => this.coAuthorChanged(e, 3)}/>
                                        <input type="email" placeholder='Email address' onChange={(e) => this.coAuthorChanged(e, 4)}/>
                                    </div>
                                </div> */}

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
                                        <a onClick={this.toggleMarkdownReferenceModal}>markdown</a>{' '}
                                        here.</p>
                                    <Tabs>
                                      <TabList>
                                        <Tab>Write</Tab>
                                        <Tab>Preview</Tab>
                                        <p className="word-count"><span className="words">{this.state.count}</span> words</p>
                                      </TabList>
                                      <TabPanel>
                                        <textarea
                                            placeholder="Notebook summary"
                                            id="summary"
                                            type="text"
                                            onChange={this.summaryChanged}
                                            onKeyPress={this.state.triggerOnKeyPress ? this.summaryLimit: null}
                                            style={customStyles}
                                            onPaste={this.state.pasteValue ? this.pasting : null}
                                            value = {this.state.summary}></textarea>
                                      </TabPanel>
                                      <p class="textarea-hint">The maximum word count for summary is 250 words.</p>
                                      <TabPanel>
                                        <MarkdownRender
                                            disallowedTypes={['heading']}
                                            source={this.formData.summary
                                            ? this.formData.summary
                                            : '*No summary*'}/>
                                      </TabPanel>
                                    </Tabs>
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
                                    {' '}<span className='title'>QuantEcon Notes</span>{' '}
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
                                            users visiting this website
                                        </li>
                                        <li>
                                            All software contained in the notebooks are considered to be released under a
                                            BSD-3 license
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
                                          <button onClick={this.toggleCancelSubmissionModal}>
                                              Cancel
                                          </button>
                                        </li>
                                    : null}
                                <li>
                                    <button disabled={!this.state.valid} onClick={this.submit}>
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
