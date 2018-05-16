import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchAnnouncements, addAnnouncement} from '../actions/announcements'

import AnnouncementsBanner from '../components/partials/AnnouncementsBanner'

class AnnouncementsContainer extends Component {

    constructor(props) {
        super(props)

        props.actions.fetchAnnouncements()
    }

    render() {
        return (
            <AnnouncementsBanner 
                actions={this.props.actions} 
                announcements={this.props.announcements ?
                    this.props.announcements :
                    []
                }
                showAdmin={this.props.showAdmin}
            />
        )
    }
}

function mapStateToProps(state, props) {
    return {
        announcements: state.announcements.announcements,
        showAdmin: state.auth.isAdmin
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators({
           fetchAnnouncements,
           addAnnouncement
       }, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsContainer);