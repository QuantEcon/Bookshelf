import React, {Component} from 'react';

import MagnifyingGlass from 'react-icons/lib/fa/search';
import CloseIcon from 'react-icons/lib/fa/close';

class Searchbar extends Component {
    //variables

    constructor(props) {
        super(props);

        this.state = {
            searchParams: props.searchParams,
            totalSubmissions: props.totalSubmissions,
            showSearchBar: false
        }

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
        this.printState = this
            .printState
            .bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({searchParams: props.searchParams, totalSubmissions: props.totalSubmissions})
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
        if (this.state.searchParams.keywords !== '') {
            this.submit();
        } else {
            this.closeSearch();
        }
    }

    closeSearch() {
        this.setState({
            showSearchBar: false,
            searchParams: {
                ...this.state.searchParams,
                keywords: ''
            }
        });
    }

    clearSearch() {
        this.setState({
            hasCurrentSearch: false,
            previousSearch: '',
            searchParams: {
                ...this.state.searchParams,
                keywords: ''
            }
        }, this.submit);
    }

    submit(e) {
        if(e){
            e.preventDefault();
        }
        console.log('[Searchbar] - search params: ', this.state.searchParams)
        if(this.state.searchParams.keywords !== ''){
            this.setState({hasCurrentSearch: true, previousSearch: this.state.searchParams.keywords, showSearchBar: false})
        }
        this
            .props
            .actions
            .fetchSubmissions(this.state.searchParams);
    }

    sortByChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                sortBy: e.target.value
            }
        }, this.submit);
        console.log("Sort by changed: ", e.target.value);
    }
    timeChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                time: e.target.value
            }
        }, this.submit);
        console.log("Time changed: ", e.target.value);
    }
    topicChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                topic: e.target.value
            }
        }, this.submit);
        console.log("Topic changed: ", e.target.value);
    }
    langChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                lang: e.target.value
            }
        }, this.submit);
        console.log("lang changed: ", e.target.value);
    }

    keywordsChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                keywords: e.target.value
            }
        });
    }
    printState() {
        console.log('[Searchbar] - state: ', this.state);
    }

    render() {

        return (
            <div>
                <form name="searchForm" onSubmit={this.submit}>
                    <div className="filters">
                        <div className="sort-inputs">
                            <label>Sort by:
                                <select
                                    type='submit'
                                    onChange={this.sortByChanged}
                                    value={this.state.searchParams.sortBy}>
                                    <option value="Trending">Trending</option>
                                    <option value="Date">Date</option>
                                    <option value="Views">Views</option>
                                    <option value="Comments">Comments</option>
                                    <option value="Votes">Votes</option>
                                </select>
                            </label>

                            <label>
                                <select onChange={this.timeChanged} value={this.state.searchParams.time}>
                                    <option value="Today">Today</option>
                                    <option value="This month">This month</option>
                                    <option value="This year">This year</option>
                                    <option value="All time">All time</option>
                                </select>
                            </label>

                            <p className="totals">{this.state.totalSubmissions} {' '}Notebooks
                            </p>

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
                                                onSubmit={this.searchButtonClicked}
                                                autoFocus/>
                                        </label>

                                    </div>
                                    <a>
                                        <MagnifyingGlass onClick={this.searchButtonClicked}/>
                                    </a>
                                </div>
                            : <div className="filter-inputs">

                                <label>Topic:
                                    <select
                                        type="submit"
                                        onChange={this.topicChanged}
                                        value={this.state.searchParams.topic}>
                                        <option value='topic'>topic</option>
                                        <option value="All">All</option>
                                    </select>
                                </label>

                                <label>Language:
                                    <select
                                        type="submit"
                                        onChange={this.langChanged}
                                        value={this.state.searchParams.lang}>
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
                                returned {this.state.totalSubmissions}
                                {this.state.totalSubmissions === 1
                                    ? <span>{' '}notebook</span>
                                    : <span>{' '}notebooks</span>}
                                <br/>
                                <a onClick={this.clearSearch}>Clear search</a>
                            </p>
                        : null}

                </form>
            </div>
        );
    }
};

export default Searchbar;