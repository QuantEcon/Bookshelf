import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import SubmissionList from '../../components/submissions/SubmissionList';
import * as SubmissionListActions from '../../actions/submissionList';

class SubmissionListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: Object.assign({}, props.searchParams, props.searchP)
        }
        this.onSearch=this.onSearch.bind(this);
    }

    onSearch = (searchParams) => {
        this.setState({
            searchParams: searchParams
        })
        this.props.actions.fetchSubmissions({searchParams, forced: true});
    }
    render() {
        console.log(this.props.submissionPreviews)
        return (
            <div>
                <SubmissionList
                    isLoading={this.props.isLoading}
                    submissionPreviews={this.props.submissionPreviews}
                    totalSubmissions={this.props.totalSubmissions}
                    onSearch={this.onSearch}
                    searchParams={this.state.searchParams
                    ? this.state.searchParams
                    : {
                        lang: 'All',
                        time: 'All time',
                        topic: 'All',
                        author: '',
                        keywords: '',
                        page: 1,
                        sortBy: 'Votes'
                    }}
                    onPageChange={this.onPageChange}
                    authors={this.props.authors}
                    actions={this.props.actions}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    var searchParams = {};
    if(props.resetSearch){
        searchParams = {
            lang: 'All',
            time: 'All time',
            topic: 'All',
            author: '',
            keywords: '',
            page: 1,
            sortBy: 'Votes'
        }
    } else {
        searchParams = Object.assign({}, {
            lang: 'All',
            time: 'All time',
            topic: 'All',
            author: '',
            keywords: '',
            page: 1,
            sortBy: 'Votes'
        }, state.submissionList.searchParams);
    }
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
