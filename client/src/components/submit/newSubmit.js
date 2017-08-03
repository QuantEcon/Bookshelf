import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom'

const SubmitForm = (
    <Form
        onSubmit={(values) => {
        console.log('Submit clicked:', values);
    }}
        defaultValues={{
        language: 'Python'
    }}
        validate={values => {
        const {language, title, agreement} = values;
        return {
            language: !language
                ? 'Language is required'
                : false,
            title: !title
                ? 'Title is required'
                : false,
            agreement: !agreement
                ? 'Agreement is required'
                : false
        }
    }}
        onValidationFail={() => {
        console.log('Something is wrong with the form');
    }}>

        {({values, submitForm, addValue, removeValue, getError}) => {
            return (
                <form onSubmit={submitForm}>
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
                            <label className='section-title'>Title
                                <span className='mandatory'>*</span>
                            </label>
                            <Text placeholder='Title' field='title'/>
                        </div>
                    </div>

                    <div className='submit=primary'>
                        <div className='submit-primary-group1'>
                            <h2 className='section-title'>Co-Authors</h2>
                            <p>An email will be sent to each co-author requesting their permission to be
                                acknowledged</p>
                            <div className='coauthor-emails'>
                                <Text type='email' placeholder='Email address' field='coAuthor1'/>
                                <Text type='email' placeholder='Email address' field='coAuthor2'/>
                                <Text type='email' placeholder='Email address' field='coAuthor3'/>
                                <Text type='email' placeholder='Email address' field='coAuthor4'/>
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

                        <div>
                            
                        </div>
                    </div>
                </form>
            )
        }}
    </Form>
)