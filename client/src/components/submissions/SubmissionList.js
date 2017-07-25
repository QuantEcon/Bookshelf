import React, {Component} from 'react';

// import Paginate from 'react-paginate';
//TODO: Implement pagination

import Searchbar from '../searchbar/Searchbar';
import SubmissionPreview from './submissionPreview';

class SubmissionList extends Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="tile">
                        <Searchbar searchParams={this.props.searchParams} totalSubmissions={this.props.totalSubmissions} actions={this.props.actions}/>
                        <div className="summaries">
                            {/*Repeat for each notebook*/}

                            {this.props.isLoading
                                ? <h3>loading...</h3>
                                : <div>
                                    {this
                                        .props
                                        .submissionPreviews
                                        .map((submission, index) => {
                                            //get author
                                            var author = this
                                                .props
                                                .authors
                                                .filter(function (a) {
                                                    return a._id === submission.author;
                                                });
                                            return <SubmissionPreview key={index} submission={submission} author={author[0]}/>
                                        })
}
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SubmissionList;