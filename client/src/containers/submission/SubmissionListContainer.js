import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import SubmissionList from '../../components/submissions/SubmissionList';
import * as SubmissionListActions from '../../actions/submissionList';

class SubmissionListContainer extends Component {
    constructor(props) {
        super(props);
        console.log('[SubmissionListContainer] - searchP: ', props.searchP);
        var params = Object.assign({}, {
            lang: 'All',
            time: 'All time',
            topic: 'All',
            author: props.userID,
            keywords: '',
            page: 1,
            sortBy: 'Trending'
        }, props.searchP);
        console.log('[SubmissionListContainer] - params: ', params);
        this
            .props
            .actions
            .fetchSubmissions(params);
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
                    onPageChange={this.onPageChange}
                    authors={this.props.authors}
                    actions={this.props.actions}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    var searchParams = Object.assign({}, {
        lang: 'All',
        time: 'All time',
        topic: 'All',
        author: '',
        keywords: '',
        page: 1,
        sortBy: 'Trending'
    }, state.submissionList.searchParams);
    if (props.userID) {
        searchParams = Object.assign(searchParams, {author: props.userID});
    } else {
        if (searchParams.author) {
            delete searchParams.author;
        }

    }
    return {searchParams: searchParams, submissionPreviews: state.submissionList.previews, totalSubmissions: state.submissionList.totalSubmissions, authors: state.submissionList.authors, isLoading: state.submissionList.isFetching}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SubmissionListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionListContainer);