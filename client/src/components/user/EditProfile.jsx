import React, {Component} from 'react';
import HeadContainer from '../../containers/HeadContainer';
import MarkdownRender from '@nteract/markdown';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import OAuthSignInButton from '../../containers/auth/OAuthSignInButton'
import CheckmarkIcon from 'react-icons/lib/fa/check-circle-o'
import ErrorIcon from 'react-icons/lib/md/error-outline'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import GoogleIcon from 'react-icons/lib/fa/google'
import Breadcrumbs from '../partials/Breadcrumbs'

import axios from 'axios'
import store from '../../store/store'

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMergeModal: false,
            customers: []
        }
        this.websiteChanged = this
            .websiteChanged
            .bind(this);
        this.emailChanged = this
            .emailChanged
            .bind(this);
        this.summaryChanged = this
            .summaryChanged
            .bind(this);
        this.nameChanged = this
            .nameChanged
            .bind(this);
        this.validate = this
            .validate
            .bind(this);
        this.deleteProfile = this
            .validate
            .bind(this);

        this.removeFacebook = this
            .removeFacebook
            .bind(this);
        this.removeGithub = this
            .removeGithub
            .bind(this);
        this.removeTwitter = this
            .removeTwitter
            .bind(this);
        this.toggleFacebook = this
            .toggleFacebook
            .bind(this);
        this.toggleGithub = this
            .toggleGithub
            .bind(this);
        this.toggleTwitter = this
            .toggleTwitter
            .bind(this);
        this.useTwitterPhoto = this
            .useTwitterPhoto
            .bind(this);
        this.useFacebookPhoto = this
            .useFacebookPhoto
            .bind(this);
        this.useGithubPhoto = this
            .useGithubPhoto
            .bind(this);
        this.useGooglePhoto = this
            .useGooglePhoto
            .bind(this);
        this.onAddSocialEnd = this
            .onAddSocialEnd
            .bind(this);
        this.componentDidMount = this
            .componentDidMount
            .bind(this);
        this.toggleMergeModal = this
            .toggleMergeModal
            .bind(this)
        this.mergeAccounts = this
            .mergeAccounts
            .bind(this)
        this.cancelMerge = this
            .cancelMerge
            .bind(this);
        this.commentSettingChanged = this
            .commentSettingChanged
            .bind(this)
        this.replySettingChanged = this
            .replySettingChanged
            .bind(this)
        this.submissionSettingChanged = this
            .submissionSettingChanged
            .bind(this)
        this.signOut = this
            .signOut
            .bind(this);
    }

    componentDidMount() {
        document.title = 'Edit Profile - QuantEcon Notes'
        // this     .props     .router     .setRouteLeaveHook(this.props.route, () => {
        // if (this.dirtyFields.name ||             this.dirtyFields.email ||
        // this.dirtyFields.summary ||             this.dirtyFields.website) {
        // console.log('[EditProfile] - leaving page with unsaved changes')       } });
    }

    componentWillReceiveProps = (props) => {
        // console.log('[EditProfile] - received new props: ', props);
        this.errorSaving = props.editProfileError;
        this.successSaving = props.editProfileSuccess;
    }

    formData = {
        id: this.props.user._id,
        name: this.props.user.name,
        summary: this.props.user.summary,
        email: this.props.user.email,
        website: this.props.user.website,
        emailSettings: Object.assign({
            newComment: false,
            newReply: false,
            submission: false
        }, this.props.user.emailSettings)
    }

    dirtyFields = {
        name: false,
        summary: false,
        email: false,
        website: false,
        emailSettings: false
    }

    errors = {
        name: null,
        summary: null,
        email: null,
        website: null
    }

    hasError = false

    hasSaved = false

    errorSaving = false;
    successSaving = false;

    toggleMergeModal = (provider) => {
        this.setState({
            showMergeModal: !this.state.showMergeModal,
            accountToMerge: provider
        })
    }

    onMergeAccountsEnd = (success) => {
        console.log("[EditProfile] - onMergeAccountsEnd success=", success)
        this.hasSaved = true;
        this.errorSaving = !success;
        this.successSaving = success
        this.saveProfile()
    }

    mergeAccounts = () => {
        this
            .props
            .mergeAccounts({accountToMerge: this.state.accountToMerge, next: this.onMergeAccountsEnd})
        this.toggleMergeModal();
    }

    cancelMerge = () => {
        if (this.state.accountToMerge) {
            this
                .props
                .removeSocial({social: this.state.accountToMerge})
        } else {
            console.warn('[EditProfile] - cancel merge: no accountToMerge in state!');
        }
        this.toggleMergeModal();
    }

    onAddSocialEnd = (success, provider) => {
        if (success) {
            this.hasSaved = true;
            this.errorSaving = !success;
            this.successSaving = success
        } else {
            if (this.props.user[provider].needToMerge) {
                this.toggleMergeModal(provider)
            } else {
                this.hasSaved = true;
                this.errorSaving = !success;
                this.successSaving = success
            }
        }

    }

    websiteChanged = (e) => {
        // console.log('[EditProfile] - website changed: ', e.target.value);
        this.formData.website = e.target.value;
        this.dirtyFields.website = true;
        this.validate();
    }

    emailChanged = (e) => {
        // console.log('[EditProfile] - email changed: ', e.target.value);
        this.formData.email = e.target.value;
        this.dirtyFields.email = true;
        this.validate();
    }

    summaryChanged = (e) => {
        // console.log('[EditProfile] - summary changed: ', e.target.value);
        this.formData.summary = e.target.value
        this.dirtyFields.summary = true;
        this.validate();
    }

    nameChanged = (e) => {
        // console.log('[EditProfile] - name changed: ', e.target.value);
        this.formData.name = e.target.value;
        this.dirtyFields.name = true;
        this.validate();
    }

    replySettingChanged = (e) => {
        this.formData.emailSettings.newReply = e.target.checked
        this.dirtyFields.emailSettings = true
        this.validate()
    }

    commentSettingChanged = (e) => {
        this.formData.emailSettings.newComment = e.target.checked
        this.dirtyFields.emailSettings = true
        this.validate()
    }

    submissionSettingChanged = (e) => {
        this.formData.emailSettings.submission = e.target.checked
        this.dirtyFields.emailSettings = true
        this.validate()
    }
    // printFormData = () => {     console.log('[EditProfile] - form data: ',
    // this.formData); } printErrors = () => {     console.log('[EditProfile] -
    // errors: ', this.errors, this.hasError); }

    toggleFacebook = () => {
        this
            .props
            .toggleSocial({social: 'fb'})
        this.hasSaved = true;

    }

    toggleGithub = () => {
        this
            .props
            .toggleSocial({social: 'github'})
        this.hasSaved = true;
    }

    toggleTwitter = () => {
        this
            .props
            .toggleSocial({social: 'twitter'})
        this.hasSaved = true;
    }

    useGooglePhoto = () => {
        this
            .props
            .setAvatar({social: 'google'})
        this.hasSaved = true;
    }

    useFacebookPhoto = () => {
        this
            .props
            .setAvatar({social: 'fb'})
        this.hasSaved = true;
    }

    useTwitterPhoto = () => {
        this
            .props
            .setAvatar({social: 'twitter'})
        this.hasSaved = true;
    }

    useGithubPhoto = () => {
        this
            .props
            .setAvatar({social: 'github'})
        this.hasSaved = true;
    }

    removeFacebook = () => {
        this
            .props
            .removeSocial({social: 'fb'});
        this.hasSaved = true;
    }

    removeGithub = () => {
        this
            .props
            .removeSocial({social: 'github'});
        this.hasSaved = true;
    }

    removeTwitter = () => {
        this
            .props
            .removeSocial({social: 'twitter'});
        this.hasSaved = true;
    }

    removeGoogle = () => {
        this
            .props
            .removeSocial({social: 'google'});
        this.hasSaved = true;
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    isURL = (str) => {
        var expression = /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        return str.match(regex);
    }

    validate = () => {
        this.hasError = false
        if (!this.formData.name || this.formData.name === '') {
            console.log('nothing in name')
            if (this.dirtyFields.name) {
                console.log('name has been changed')
                this.errors.name = true;
                this.hasError = true
            } else {
                this.errors.name = false;
            }
        } else {
            this.errors.name = false;
        }

        if (this.formData.email !== '' && this.dirtyFields.email) {
            if (this.validateEmail(this.formData.email)) {
                this.errors.email = false;
            } else {
                this.errors.email = true;
                this.hasError = true;
            }
        }

        if (this.formData.website !== '' && this.dirtyFields.website) {
            if (this.isURL(this.formData.website)) {
                this.errors.website = false
            } else {
                this.errors.website = true;
                this.hasError = true;
            }
        } else {
            this.errors.website = false
        }

        this.forceUpdate();
    }

    saveProfile = (e) => {
        if (e) {
            e.preventDefault()
        }
        console.log('[EditProfile] - form data: ', this.formData)
        this
            .props
            .saveProfile(this.formData);
        this.hasSaved = true;
    }

    delete = () => {
      console.log('id:' , this.formData.id,  'JWT TOKEN', store.getState().auth.token);

      if(store.getState().auth.isSignedIn) {
        console.log('Is user signed?', store.getState().auth.isSignedIn);
        console.log('--------------------------------------------')
        axios.post('/api/edit-profile/delete-account', {
          'userId': this.formData.id
        },{
          headers: {
            'Authorization': 'JWT ' + store.getState().auth.token
          }
        }).then(response => {
          console.log('SUCCESS', response);
          // if success then redirect back to home page and log user out
          this.signOut();
          return true;
        }).catch(error => {
          console.log('ERROR:', error);
          return false;
        });
      }
    }

    signOut = () => {
        this
            .props
            .signOut();
    }

    cancel = () => {
        this.props.cancel();
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.showMergeModal}
                    contentLabel='Merge Accounts'
                    className='overlay'>
                    <div className='my-modal'>
                        <div className='modal-header'>
                            <h1 className='modal-title'>
                                Merge Accounts
                            </h1>
                        </div>
                        <div className='modal-body'>
                            <p className='padded-below'>
                                There is already an account associated with that social login. Would you like to
                                merge these two accounts?
                            </p>

                            <label htmlFor="currentAccount" className='section-title'>
                                Current Account
                            </label>
                            <div className='edit-profile-header'>
                                <div className='avatar'>
                                    <a >
                                        <img src={this.props.user.avatar} alt="Current avatar"/>
                                    </a>
                                    <span>
                                        <a>
                                            {this.props.user.name}
                                        </a>

                                    </span>
                                    <p>
                                        ({this.props.user.submissions.length} {this.props.user.submissions.length === 1
                                            ? ' submission)'
                                            : ' submissions)'}
                                    </p>
                                </div>

                            </div>
                            <hr/>
                            <label htmlFor="toMerge" className='section-title'>
                                To Merge
                            </label>
                            <div className='edit-profile-header'>
                                <div className='avatar'>
                                    <a>
                                        <img
                                            src={this.props.user[this.state.accountToMerge]
                                            ? this.props.user[this.state.accountToMerge].avatarURL
                                            : null}
                                            alt="Avatar"/>
                                    </a>
                                    <span>
                                        <a
                                            href={this.props.user[this.state.accountToMerge]
                                            ? this.props.user[this.state.accountToMerge].url
                                            : null}>
                                            {this.props.user[this.state.accountToMerge]
                                                ? <div>
                                                        {this.props.user[this.state.accountToMerge].username}

                                                    </div>
                                                : null}
                                        </a>
                                    </span>
                                </div>
                            </div>

                            <ul className='button-row'>
                                <li>
                                    <button className='alt' onClick={this.cancelMerge}>
                                        Cancel
                                    </button>
                                </li>
                                <li>
                                    <button onClick={this.mergeAccounts}>
                                        Merge
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </div>

                </Modal>
                <HeadContainer history={this.props.history}/> {this.successSaving && this.hasSaved
                    ? <div className="success callout">
                            <div className="container">
                                <p className="callout-message">
                                    <CheckmarkIcon/>
                                    Your profile was saved
                                </p>
                            </div>
                        </div>
                    : null}

                {this.errorSaving && this.hasSaved
                    ? <div className="warning callout">
                            <div className="container">
                                <p className="callout-message">
                                    <ErrorIcon/>
                                    An error occurred while saving your profile
                                </p>
                            </div>
                        </div>
                    : null}
                <Breadcrumbs title='Edit-Profile'/>
                <form onSubmit={this.saveProfile}>
                    <div className='container'>
                        <div className='edit-profile'>
                            <h1 className='page-title'>
                                Edit Profile
                            </h1>
                            {/*edit-profile-header*/}
                            <div className='edit-profile-header'>
                                <p className='avatar'><img src={this.props.user.avatar} alt="My avatar"/></p>
                                <div className='edit-profile-title'>
                                    <label htmlFor="name" className='section-title'>Name
                                        <span className='mandatory'>*</span>
                                    </label>

                                    <input
                                        name='name'
                                        type="text"
                                        defaultValue={this.formData.name}
                                        placeholder='Your name'
                                        onChange={this.nameChanged}/> {this.errors.name
                                        ? <p className='error-help-text'>
                                                Your name is required
                                            </p>
                                        : null}

                                </div>
                            </div>
                            {/*edit-profile-header*/}
                            {/*edit-profile-primary*/}
                            <div className='edit-profile-primary'>
                                <div className='edit-profile-primary-group1'>
                                    <label htmlFor="position" className='section-title'>
                                        Position/Job Description
                                    </label>
                                    <p className="input-hint">
                                        You can use{' '}
                                        <a href="http://commonmark.org/help/" target="_blank"><b>markdown</b></a>{' '}here.
                                    </p>
                                    <Tabs>
                                      <TabList>
                                        <Tab>Write</Tab>
                                        <Tab>Preview</Tab>
                                      </TabList>

                                      <TabPanel>
                                        <textarea
                                            id="position"
                                            name='position'
                                            defaultValue={this.formData.summary}
                                            placeholder='Position/Job Description'
                                            onChange={this.summaryChanged}></textarea>
                                      </TabPanel>
                                      <TabPanel>
                                        <MarkdownRender
                                            disallowedTypes={['heading']}
                                            source={this.formData.summary
                                            ? this.formData.summary
                                            : '*No description*'}/>
                                      </TabPanel>
                                    </Tabs>

                                    {/* {this.showPositionPreview
                                        ? <div>
                                                <Markdown
                                                    source={this.formData.position
                                                    ? this.formData.position
                                                    : '*No description*'}/>
                                                <p className='input-hint input-hint-after'>
                                                    <a onClick={this.toggleShowPositionPreview}>
                                                        Close Preview
                                                    </a>
                                                </p>
                                            </div>
                                        : <p className="input-hint input-hint-after">
                                            <a onClick={this.toggleShowPositionPreview}>
                                                Preview
                                            </a>
                                        </p>} */}

                                    <hr/>

                                    <label className='section-title' htmlFor="website">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name='website'
                                        placeholder='Website URL'
                                        defaultValue={this.formData.website}
                                        onChange={this.websiteChanged}/> {this.errors.website
                                        ? <p className='error-help-text'>
                                                Please enter a valid URL
                                            </p>
                                        : null}

                                    <label htmlFor="email" className='section-title'>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name='email'
                                        placeholder='Email'
                                        defaultValue={this.formData.email}
                                        onChange={this.emailChanged}/> {this.errors.email
                                        ? <p className='error-help-text'>
                                                Please enter a valid email
                                            </p>
                                        : null}
                                    <div>
                                        <label className='section-title'>
                                            Notify my when:
                                        </label>
                                        <div>
                                            <input
                                                type="checkbox"
                                                disabled={this.errors.email}
                                                defaultChecked={this.props.user.emailSettings
                                                ? this.props.user.emailSettings.newComment
                                                : false}
                                                onChange={this.commentSettingChanged}/>
                                            {' '}A user comments on my submission
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                disabled={this.errors.email}
                                                defaultChecked={this.props.user.emailSettings
                                                ? this.props.user.emailSettings.newReply
                                                : false}
                                                onChange={this.replySettingChanged}/>
                                            {' '}A user replies to my comment
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                disabled={this.errors.email}
                                                defaultChecked={this.props.user.emailSettings
                                                ? this.props.user.emailSettings.submission
                                                : false}
                                                onChange={this.submissionSettingChanged}/>
                                            {' '}Notebook submission is successful
                                        </div>
                                    </div>

                                </div>
                                {/*edit-profile-primary-group1*/}

                                <div className='edit-profile-primary-group2'>
                                    <div>
                                        {this.props.user.github
                                            ? <div>
                                                    <label htmlFor="github" className='section-title'>
                                                        Github Profile {this.props.user.github.hidden
                                                            ? '(hidden)'
                                                            : null}
                                                    </label>
                                                    <br/>
                                                    <div className='edit-profile-header'>
                                                        <div className='avatar'>
                                                            <a href={this.props.user.github.url}>
                                                                <img src={this.props.user.github.avatarURL} alt="Github avatar"/>
                                                            </a>
                                                        </div>
                                                        <span>
                                                            <a href={this.props.user.github.url}>
                                                                {this.props.user.github.username}
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <p className='input-hint input-hint-after'>
                                                        <a onClick={this.removeGithub} disabled={this.props.user.oneSocial}>
                                                            Remove
                                                        </a>
                                                        {' | '}{this.props.user.github.hidden
                                                            ? <a onClick={this.toggleGithub}>Show</a>
                                                            : <a onClick={this.toggleGithub}>Hide</a>} {' | '}
                                                        <a
                                                            onClick={this.useGithubPhoto}
                                                            disabled={this.props.user.activeAvatar === 'github'}>Use this photo</a>
                                                    </p>
                                                </div>
                                            : <div>
                                                <label htmlFor="github" className='section-title'>Github Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <OAuthSignInButton
                                                            provider='Github'
                                                            icon={GithubIcon()}
                                                            next={this.onAddSocialEnd}
                                                            isAdd={true}>
                                                            Add Github
                                                        </OAuthSignInButton>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>
                                    <hr/>
                                    <div>
                                        {this.props.user.twitter
                                            ? <div>
                                                    <label htmlFor="twitter" className='section-title'>
                                                        Twitter Profile {this.props.user.twitter.hidden
                                                            ? '(hidden)'
                                                            : null}
                                                    </label>
                                                    <br/>
                                                    <div className='edit-profile-header'>
                                                        <div className='avatar'>
                                                            <a href={this.props.user.twitter.url}>
                                                                <img src={this.props.user.twitter.avatarURL} alt="Twitter avatar"/>
                                                            </a>
                                                        </div>
                                                        <span>
                                                            <a href={this.props.user.twitter.url}>
                                                                {this.props.user.twitter.username}
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <p className='input-hint input-hint-after'>
                                                        <a onClick={this.removeTwitter} disabled={this.props.user.oneSocial}>
                                                            Remove
                                                        </a>
                                                        {' | '}{this.props.user.twitter.hidden
                                                            ? <a onClick={this.toggleTwitter}>Show</a>
                                                            : <a onClick={this.toggleTwitter}>Hide</a>} {' | '}
                                                        <a
                                                            onClick={this.useTwitterPhoto}
                                                            disabled={this.props.user.activeAvatar === 'twitter'}>
                                                            Use this photo
                                                        </a>
                                                    </p>
                                                </div>
                                            : <div>
                                                <label htmlFor="twitter" className='section-title'>Twitter Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <OAuthSignInButton
                                                            provider='Twitter'
                                                            icon={TwitterIcon()}
                                                            next={this.onAddSocialEnd}
                                                            isAdd={true}>
                                                            Add Github
                                                        </OAuthSignInButton>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>
                                    <hr/>
                                    <div>
                                        {this.props.user.google
                                            ? <div>
                                                    <label htmlFor="google" className='section-title'>
                                                        Google Profile
                                                    </label>
                                                    <br/>
                                                    <div className='edit-profile-header'>
                                                        <div className='avatar'>
                                                            <img src={this.props.user.google.avatarURL} alt="Google avatar"/>
                                                            <span>
                                                                <a className='profile-link' href={this.props.user.google.url}>
                                                                    {this.props.user.google.displayName}
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className='input-hint input-hint-after'>
                                                        <a onClick={this.removeGoogle} disabled={this.props.user.oneSocial}>
                                                            Remove
                                                        </a>
                                                        {' | '}
                                                        <a
                                                            onClick={this.useGooglePhoto}
                                                            disabled={this.props.user.activeAvatar === 'google'}>
                                                            Use this photo
                                                        </a>
                                                    </p>
                                                </div>
                                            : <div>
                                                <label htmlFor="google" className='section-title'>Google Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <OAuthSignInButton
                                                            provider='Google'
                                                            icon={GoogleIcon()}
                                                            next={this.onAddSocialEnd}
                                                            isAdd={true}>
                                                            Add Github
                                                        </OAuthSignInButton>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>

                                </div>
                                {/* edit-profile-primary-group2 */}

                            </div>
                            {/*edit-profile-primary*/}
                        </div>
                        <ul className="button-row">
                            <li>
                              <a className="delete-profile" onClick={this.delete}>Delete</a>
                            </li>
                            <li>
                                <a className="alt" onClick={this.cancel}>Cancel</a>
                            </li>
                            <li>
                                <button name="submit" type="submit" disabled={this.hasError} >
                                    Save Profile
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile;
