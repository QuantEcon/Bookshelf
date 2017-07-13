import React, {Component} from 'react';

// import Paginate from 'react-paginate';
//TODO: Implement pagination

import Searchbar from '../searchbar/Searchbar';
import SubmissionPreview from './submissionPreview';

class SubmissionList extends Component {

    searchParams = {
        lang: 'All',
        time: 'All time',
        topic: 'All',
        author: '',
        keywords: '',
        page: 1,
        sortBy: 'Trending'
    };

    constructor(props) {
        super(props);

        this.state = {
            dataReady: false
        }

        if (props.searchParams) {
            if (props.searchParams.lang) {
                this.searchParams.lang = props.searchParams.lang;
            }
            if (props.searchParams.time) {
                this.searchParams.time = props.searchParams.time;
            }
            if (props.searchParams.topic) {
                this.searchParams.topic = props.searchParams.topic;
            }
            if (props.searchParams.author) {
                this.searchParams.author = props.searchParams.author;
            }
            if (props.searchParams.keywords) {
                this.searchParams.keywords = props.searchParams.keywords;
            }
            if (props.searchParams.page) {
                this.searchParams.page = props.searchParams.page
            }
            if (props.searchParams.sortBy) {
                this.searchParams.sortBy = props.searchParams.sortBy
            }
        }

        this.onSearchResults = this
            .onSearchResults
            .bind(this);

    }
    //get submissions from API initialize data
    onSearchResults(results) {
        console.log("Search results: ", results);
        this.setState({submissions: results.submissions, authors: results.authors, totalSubmissions: results.totalSubmissions, dataReady: true});
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="tile">
                        <Searchbar
                            searchParams={this.searchParams}
                            onSearchResults={this.onSearchResults}
                            totalSubmissions={this.state.totalSubmissions}/>
                        <div className="summaries">
                            {/*Repeat for each notebook*/}

                            {this.state.dataReady
                                ? <div>
                                        {this
                                            .state
                                            .submissions
                                            .map((submission, index) => {
                                                //get author
                                                var author = this.state.authors.filter(function(a){
                                                    return a._id === submission.author;
                                                });
                                                return <SubmissionPreview key={index} submission={submission} author={author[0]}/>
                                            })
}
                                    </div>
                                : <h3>loading...</h3>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SubmissionList;