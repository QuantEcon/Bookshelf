import React, { Component } from 'react';
import Markdown from '@nteract/markdown'

export default class AnnouncementBanner extends Component {
    constructor(props){
        super(props)

        this.state = {
            showEdit: false,
            editText: ""
        }
    }

    toggleEdit = (e) => {
        if(e){
            e.preventDefault()
        }

        this.setState({
            showEdit: !this.state.showEdit
        })
    }


    editTextChanged = (e) => {
        this.setState({
            editText: e.target.value
        })
    }


    submit = (e) => {
        if(e){
            e.preventDefault()
        }

        this.props.actions.addAnnouncement(this.state.editText)
        this.setState({
            showEdit: false
        })
    }

    render(){
        return (
            <div className='announcements'>
                <div className='container'>
                    {/* TODO: Announcements title here */}
                    <div className='announcements-list'>
                        {this.props.announcements.map((announcement, index) => {
                            return (
                                // TODO: Style this div
                                <div key={index} className='announcement'>
                                    <p>{announcement.date}</p>
                                    
                                    {this.props.showAdmin
                                    ? <div>
                                    {this.state.showEdit ? 
                                        <div>
                                            <Markdown source={this.state.editText} />  

                                            <textarea name="editAnnouncement" 
                                            id="editAnnouncementTextArea" 
                                            cols="30" 
                                            rows="10"
                                            placeholder="You can use markdown here..."
                                            onChange={this.editTextChanged}/>

                                            <button onClick={this.toggleEdit}>Cancel</button>

                                            <button onClick={this.submit}>Submit</button>
                                        </div>

                                        : <div>
                                            <Markdown source={announcement.content} />                                        
                                            <button onClick={this.toggleEdit}>Edit</button>
                                        </div>}
                                    </div>
                                    : <Markdown source={announcement.content} />}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
        
    }
}