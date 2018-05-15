import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchAnnouncements} from '../actions/announcements'

import AnnouncementsBanner from '../components/partials/AnnouncementsBanner'

class AnnouncementsContainer extends Component {

    constructor(props) {
        super(props)

        props.actions.fetchAnnouncements()
    }

    render() {
        return (
            <AnnouncementsBanner actions={this.props.actions} 
                announcements={this.props.announcements ?
                    this.props.announcements :
                    []
                }
            />
        )
    }
}

function mapStateToProps(state, props) {
    return {
        announcements: state.announcements.announcements
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators({
           fetchAnnouncements
       }, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsContainer);