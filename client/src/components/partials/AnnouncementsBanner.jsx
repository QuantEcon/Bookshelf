import React, { Component } from 'react';
import Markdown from '@nteract/markdown'
import Moment from 'react-moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class AnnouncementBanner extends Component {
    constructor(props){
        super(props)

        this.state = {
            showEdit: false,
            editText: ""
        }
        this.editTextChanged = this.editTextChanged.bind(this);
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
        console.log("edit text changed: ", e.target.value);
    }

    deleteRecent = (e) => {
        if(e){
            e.preventDefault()
        }

        this.props.actions.deleteRecent()
    }


    submit = (e) => {
        if(e){
            e.preventDefault()
        }

        this.props.actions.editRecent(this.state.editText)
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
                        <div className='announcement'>
                            {this.props.announcement
                                ? <Moment date={this.props.announcement.date} format="dddd, DD MMMM YYYY, H:mm A"/>
                                : null}
                            {this.props.showAdmin
                            ? <div>
                                {this.state.showEdit ?
                                    <div>
                                        {/* Below markdown source will render the editText on the page*/}
                                        {/*<Markdown source={this.state.editText} />*/}
                                        <Tabs>
                                          <TabList>
                                            <Tab>Write</Tab>
                                            <Tab>Preview</Tab>
                                          </TabList>

                                          <TabPanel>
                                            <textarea name="editAnnouncement"
                                            id="editAnnouncementTextArea"
                                            placeholder="You can use markdown here..."
                                            defaultValue={this.state.editText}
                                            onChange={this.editTextChanged}/>
                                          </TabPanel>
                                          <TabPanel>
                                            <Markdown
                                              source={this.state.editText
                                              ? this.state.editText
                                              : '*No description*'}/>
                                          </TabPanel>
                                        </Tabs>
                                        <button onClick={this.toggleEdit}>Cancel</button>
                                        <button onClick={this.submit}>Submit</button>
                                    </div>
                                    : <div>
                                        <Markdown source={this.props.announcement ? this.props.announcement.content : null} />
                                        <button onClick={this.toggleEdit}>Add</button>
                                        {this.props.announcement
                                        ? <button onClick={this.deleteRecent}>Delete</button>
                                        : null }
                                    </div>}
                                </div>
                                : <Markdown source={this.props.announcement.content} />}
                        </div>
                    </div>

                </div>
            </div>
        )

    }
}
