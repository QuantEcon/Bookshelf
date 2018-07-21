import React, {Component} from 'react';
import Searchbar from '../searchbar/Searchbar';
import SubmissionPreview from './submissionPreview';
import Paginate from 'react-paginate'

class SubmissionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            submissionPreviews: [],
            searchParams: props.searchParams
        }
    }

    componentWillReceiveProps(props) {
        // console.log('[SubmissionList] - received new props: ', props);
        this.setState({submissionPreviews: props.submissionPreviews})
    }

    onSearch = (searchParams) => {
        this.setState({
            searchParams
        }, () => {
            this.props.onSearch(searchParams);
        })
    }
    onPageChange = (page) => {
        var newSearchParams = Object.assign({}, this.state.searchParams, {
            page: page.selected + 1
        })
        this.onSearch(newSearchParams);
    }


    render() {
        return (
            <div className="container">
                <div className="tile">
                    <Searchbar
                        searchParams={this.props.searchParams}
                        totalSubmissions={this.props.totalSubmissions}
                        actions={this.props.actions}
                        onSearch={this.onSearch}/>
                    <div className="summaries">
                        {/*Repeat for each notebook*/}

                        {this.props.isLoading
                            ? <h3>loading...</h3>
                            : <div>
                                {this
                                    .state
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
                    <Paginate
                        onPageChange={this.onPageChange}
                        pageCount={this.props.totalSubmissions/10}
                        pageRangeDisplayed ={this.props.totalSubmissions/10}
                        marginPageDisplayed={3}
                        previousLabel='Prev'
                        nextLabel='Next'
                        breakLabel='...'
                        initialPage={this.props.searchParams.page? this.props.searchParams.page - 1 : 0}
                        containerClassName='pagination text-center'
                        activeClassName='current'
                        previousClassName='pagination-previous'
                        nextClassName='pagination-next'
                        disabledClassName='disabled'/>
                </div>
            </div>
        );
    }
};

export default SubmissionList;
