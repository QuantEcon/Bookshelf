import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import HeadContainer from '../../containers/HeadContainer';
import Markdown from 'react-markdown';

import CheckmarkIcon from 'react-icons/lib/fa/check-circle-o'
import ErrorIcon from 'react-icons/lib/md/error-outline'

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.websiteChanged = this
            .websiteChanged
            .bind(this);
        this.emailChanged = this
            .emailChanged
            .bind(this);
        this.positionChanged = this
            .positionChanged
            .bind(this);
        this.nameChanged = this
            .nameChanged
            .bind(this);
        this.validate = this
            .validate
            .bind(this);
        this.toggleShowPositionPreview = this
            .toggleShowPositionPreview
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

    }

    componentWillReceiveProps = (props) => {
        console.log('[EditProfile] - received new props: ', props);
    }

    formData = {
        name: this.props.user.name,
        position: this.props.user.position,
        email: this.props.user.email,
        website: this.props.user.website
    }

    dirtyFields = {
        name: false,
        position: false,
        email: false,
        website: false
    }

    errors = {
        name: null,
        position: null,
        email: null,
        website: null
    }

    hasError = false

    hasSaved = false

    showPositionPreview = false;

    toggleShowPositionPreview = () => {

        this.showPositionPreview = !this.showPositionPreview
        console.log('[EditProfile] - toggle show position preview: ', this.showPositionPreview)
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

    positionChanged = (e) => {
        // console.log('[EditProfile] - position changed: ', e.target.value);
        this.formData.position = e.target.value
        this.dirtyFields.position = true;
        this.validate();
    }

    nameChanged = (e) => {
        // console.log('[EditProfile] - name changed: ', e.target.value);
        this.formData.name = e.target.value;
        this.dirtyFields.name = true;
        this.validate();
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

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    isURL = (str) => {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
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

        if (this.formData.email != '' && this.dirtyFields.email) {
            if (this.validateEmail(this.formData.email)) {
                this.errors.email = false;
            } else {
                this.errors.email = true;
                this.hasError = true;
            }
        }

        if (this.formData.website != '' && this.dirtyFields.website) {
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
        e.preventDefault();
        this
            .props
            .saveProfile(this.formData);
        this.hasSaved = true;
    }

    cancel = () => {
        this
            .props
            .cancel();
    }

    render() {
        return (
            <div>
                <HeadContainer/> {this.props.editProfileSuccess && this.hasSaved
                    ? <div className="success callout">
                            <div className="row columns">
                                <p className="callout-message">
                                    <CheckmarkIcon/>
                                    Your profile was saved
                                </p>
                            </div>
                        </div>
                    : null}

                {this.props.editProfileError && this.hasSaved
                    ? <div className="warning callout">
                            <div className="row columns">
                                <p className="callout-message">
                                    <ErrorIcon/>
                                    An error occurred while saving your profile
                                </p>
                            </div>
                        </div>
                    : null}
                <form onSubmit={this.saveProfile}>
                    <div className='row-columns'>
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
                                        <Link to="http://commonmark.org/help/">markdown</Link>
                                        {' '}here.
                                    </p>
                                    <textarea
                                        id="position"
                                        name='position'
                                        defaultValue={this.formData.position}
                                        placeholder='Position/Job Description'
                                        onChange={this.positionChanged}></textarea>

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
                                    <Markdown
                                        source={this.formData.position
                                        ? this.formData.position
                                        : '*No description*'}/>
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
                                                            Remove {' | '}
                                                        </a>
                                                        {' | '}{this.props.user.github.hidden
                                                            ? <a onClick={this.toggleGithub}>Show</a>
                                                            : <a onClick={this.toggleGithub}>Hide</a>} {' | '}<a
onClick={this.useGithubPhoto}
disabled={this.props.user.activeAvatar === 'github'}>Use this photo</a>
                                                    </p>
                                                </div>
                                            : <div>
                                                <label htmlFor="github" className='section-title'>Github Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <a onClick={this.addGithub}>Add Github</a>
                                                    </li>
                                                </ul>
                                            </div>}
                                    </div>
                                    <hr/>
                                    <div>
                                        {this.props.user.fb
                                            ? <div>
                                                    <label htmlFor="facebook" className='section-title'>
                                                        Facebook Profile {this.props.user.fb.hidden
                                                            ? '(hidden)'
                                                            : null}
                                                    </label>
                                                    <br/>
                                                    <div className='edit-profile-header'>
                                                        <div className='avatar'>
                                                            <a href={this.props.user.fb.url}>
                                                                <img src={this.props.user.fb.avatarURL} alt="Github avatar"/>
                                                            </a>
                                                        </div>
                                                        <span>
                                                            <a href={this.props.user.fb.url}>
                                                                {this.props.user.fb.displayName}
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <p className='input-hint input-hint-after'>
                                                        <a onClick={this.removeFacebook} disabled={this.props.user.oneSocial}>
                                                            Remove
                                                        </a>
                                                        {' | '}{this.props.user.fb.hidden
                                                            ? <a onClick={this.toggleFacebook}>Show</a>
                                                            : <a onClick={this.toggleFacebook}>Hide</a>} {' | '}
                                                        <a
                                                            onClick={this.useFacebookPhoto}
                                                            disabled={this.props.user.activeAvatar === 'fb'}>Use this photo</a>
                                                    </p>
                                                </div>
                                            : <div>
                                                <label htmlFor="facebook" className='section-title'>Facebook Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <a onClick={this.addFacebook}>Add Facebook</a>
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
                                                        <a onClick={this.addTwitter}>Add Twitter</a>
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
                                                    <a onClick={this.useGooglePhoto}>Use this photo</a>
                                                </div>
                                            : <div>
                                                <label htmlFor="google" className='section-title'>Google Profile</label>
                                                <br/>
                                                <ul className='button-row'>
                                                    <li className='menu-submit'>
                                                        <a onClick={this.addGoogle}>Add Google</a>
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
                                <a className="alt" onClick={this.cancel}>Cancel</a>
                            </li>
                            <li>

                                <button name="submit" type="submit" disabled={this.hasError}>
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