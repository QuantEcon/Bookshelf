import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {editRecent, fetchRecent, deleteRecent} from '../actions/announcements'

import AnnouncementsBanner from '../components/partials/AnnouncementsBanner'

class AnnouncementsContainer extends Component {

    constructor(props) {
        super(props)

        props.actions.fetchRecent()
    }

    render() {
        return (
            <div>
                {this.props.announcement || this.props.showAdmin
                ? <AnnouncementsBanner 
                    actions={this.props.actions} 
                    announcement={this.props.announcement}
                    showAdmin={this.props.showAdmin}
                />
                : null}
                
            </div>
           
        )
    }
}

function mapStateToProps(state, props) {
    return {
        announcement: state.announcements.recent
    }
}

function mapDispatchToProps(dispatch) {
    return {
       actions: bindActionCreators({
           fetchRecent,
           editRecent,
           deleteRecent
       }, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsContainer);