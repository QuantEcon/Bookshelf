import React, { Component } from 'react';
import Markdown from '@nteract/markdown'

export default class AnnouncementBanner extends Component {

    render(){
        return (
            <div className='container'>
                <div className='tile'>
                    {/* TODO: Announcements title here */}
                    <div className='announcements-list'>
                        {this.props.announcements.map((announcement, index) => {
                            return (
                                // TODO: Style this div
                                <div key={index} className='announcement'>
                                    <p>{announcement.date}</p>
                                    <Markdown source={announcement.content} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
        
    }
}