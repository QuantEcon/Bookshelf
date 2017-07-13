import React, {Component} from 'react';

import queryString from 'query-string';

import MagnifyingGlass from 'react-icons/lib/fa/search';
import CloseIcon from 'react-icons/lib/fa/close';

class Searchbar extends Component {
    //variables

    constructor(props) {
        super(props);

        console.log("props: ", props);

        this.state = props.searchParams;

        console.log("state:", this.state);

        this.submit = this
            .submit
            .bind(this);
        this.sortByChanged = this
            .sortByChanged
            .bind(this);
        this.timeChanged = this
            .timeChanged
            .bind(this);
        this.topicChanged = this
            .topicChanged
            .bind(this);
        this.langChanged = this
            .langChanged
            .bind(this);
        this.keywordsChanged = this
            .keywordsChanged
            .bind(this);

        this.toggleSearchBar = this
            .toggleSearchBar
            .bind(this);
        this.searchButtonClicked = this
            .searchButtonClicked
            .bind(this);
        this.closeSearch = this
            .closeSearch
            .bind(this);
        this.clearSearch = this
            .clearSearch
            .bind(this);

        this.submit();
    }

    toggleSearchBar() {
        if (this.state.showSearchBar) {
            this.setState({
                showSearchBar: false
            }, console.log("Toggle search bar: ", this.state.showSearchBar));
        } else {
            this.setState({
                showSearchBar: true
            }, console.log("Toggle search bar: ", this.state.showSearchBar));
        }
    }

    searchButtonClicked() {
        if (this.state.keywords !== '') {
            this.setState({hasCurrentSearch: true, previousSearch: this.state.keywords, showSearchBar: false})
            this.submit();
        } else {
            this.closeSearch();
        }
    }

    closeSearch() {
        this.setState({showSearchBar: false, keywords: ''});
    }

    clearSearch() {
        this.setState({
            hasCurrentSearch: false, 
            previousSearch: '',
            keywords: ''
        }, this.submit);
    }

    submit() {
        console.log('Submit: ', this.state);
        //get search results return to parent
        var searchParams = {
            keywords: this.state.keywords,
            lang: this.state.lang,
            author: this.state.author,
            time: this.state.time,
            sortBy: this.state.sortBy,
            topic: this.state.topic
        };

        var query = queryString.stringify(searchParams);
        fetch('/search/all-submissions/?' + query).then(results => {
            return results.json();
        }).then(data => {
            this.setState({totalSubmissions: data.totalSubmissions});
            this.props.onSearchResults(data);
        });
        // console.log(query);
        // this
        //     .props
        //     .onSearchResults({searchParams: this.state});
    }

    sortByChanged(e) {
        this.setState({
            sortBy: e.target.value
        }, this.submit);
        console.log("Sort by changed: ", e.target.value);
    }
    timeChanged(e) {
        this.setState({
            time: e.target.value
        }, this.submit);
        console.log("Time changed: ", e.target.value);
    }
    topicChanged(e) {
        this.setState({
            topic: e.target.value
        }, this.submit);
        console.log("Topic changed: ", e.target.value);
    }
    langChanged(e) {
        this.setState({
            lang: e.target.value
        }, this.submit);
        console.log("lang changed: ", e.target.value);
    }

    keywordsChanged(e) {
        this.setState({keywords: e.target.value});
    }

    render() {

        return (

            <form name="searchForm" onSubmit={this.submit}>
                <div className="filters">

                    <div className="sort-inputs">
                        <label>Sort by:
                            <select type='submit' onChange={this.sortByChanged} value={this.state.sortBy}>
                                <option value="Trending">Trending</option>
                                <option value="Date">Date</option>
                                <option value="Views">Views</option>
                                <option value="Comments">Comments</option>
                                <option value="Votes">Votes</option>
                            </select>
                        </label>

                        <label>
                            <select onChange={this.timeChanged} value={this.state.time}>
                                <option value="Today">Today</option>
                                <option value="This month">This month</option>
                                <option value="This year">This year</option>
                                <option value="All time">All time</option>
                            </select>
                        </label>

                        <p className="totals">{this.state.totalSubmissions} Notebooks</p>

                    </div>

                    {this.state.showSearchBar
                        ? <div className="search-inputs">

                                <div className="search-field">
                                    <a className="search-hide">
                                        <CloseIcon onClick={this.closeSearch}/>
                                    </a>
                                    <label>
                                        Search:
                                        <input
                                            type="text"
                                            onChange={this.keywordsChanged}
                                            placeholder="Enter search terms here"
                                            onSubmit={this.searchButtonClicked}/>
                                    </label>

                                </div>
                                <a>
                                    <MagnifyingGlass onClick={this.searchButtonClicked}/>
                                </a>
                            </div>
                        : <div className="filter-inputs">

                            <label>Topic:
                                <select type="submit" onChange={this.topicChanged} value={this.state.topic}>
                                    <option value='topic'>topic</option>
                                    <option value="All">All</option>
                                </select>
                            </label>

                            <label>Language:
                                <select type="submit" onChange={this.langChanged} value={this.state.lang}>
                                    <option value="All">All</option>
                                    <option value="Python">Python</option>
                                    <option value="Julia">Julia</option>
                                    <option value="R">R</option>
                                </select>
                            </label>

                            <button>
                                <MagnifyingGlass onClick={this.toggleSearchBar}/>
                            </button>
                        </div>}

                </div>

                {this.state.hasCurrentSearch
                    ? <p className="search-message">
                            Your search for
                            <span>
                                {' "'}{this.state.previousSearch}{'" '}
                            </span>
                            returned numSubs
                            <span>
                                notebook.</span>
                            <br/>
                            <a onClick={this.clearSearch}>Clear search</a>
                        </p>
                    : null}

            </form>
        );
    }
};

export default Searchbar;