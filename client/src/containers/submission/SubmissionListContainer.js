import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import SubmissionList from '../../components/submissions/SubmissionList';
import * as SubmissionListActions from '../../actions/submissionList';

class SubmissionListContainer extends Component {
    constructor(props) {
        super(props);
        console.log('[SubmissionListContainer] - Props: ', props);
        this
            .props
            .actions
            .fetchSubmissions(props.searchParams);
    }

    render() {
        return (
            <div>
                <SubmissionList
                    isLoading={this.props.isLoading}
                    submissionPreviews={this.props.submissionPreviews}
                    totalSubmissions={this.props.totalSubmissions}
                    searchParams={this.props.searchParams
                    ? this.props.searchParams
                    : {
                        lang: 'All',
                        time: 'All time',
                        topic: 'All',
                        author: '',
                        keywords: '',
                        page: 1,
                        sortBy: 'Trending'
                    }}
                    authors={this.props.authors}
                    actions={this.props.actions}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    console.log('[SubmissionListContainer] - own props: ', props);
    var searchParams = {
            lang: 'All',
            time: 'All time',
            topic: 'All',
            author: '',
            keywords: '',
            page: 1,
            sortBy: 'Trending'
        }
    if (props.userID) {
        searchParams = Object.assign(searchParams, {author: props.userID});
    } else {
        searchParams = Object.assign(searchParams, state.submissionList.searchParams);
        if (searchParams.author) {
            delete searchParams.author;
        }

    }
    console.log('[SubmissionListContainer] - searchParams: ', searchParams);
    return {searchParams: searchParams, submissionPreviews: state.submissionList.previews, totalSubmissions: state.submissionList.totalSubmissions, authors: state.submissionList.authors, isLoading: state.submissionList.isFetching}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SubmissionListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionListContainer);