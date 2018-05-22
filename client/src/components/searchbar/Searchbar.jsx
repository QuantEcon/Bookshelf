import React, {Component} from 'react';
import PropTypes from 'prop-types'

import MagnifyingGlass from 'react-icons/lib/fa/search';
import CloseIcon from 'react-icons/lib/fa/close';

/**
 * Renders the search bar for the submission list
 */
class Searchbar extends Component {
    /**
     * @prop {Object} searchParams Default search params
     * @prop {Integer} totalSubmission Total nubmer of submission returned from the API that
     * match the searchParams
     */
    static propTypes = {
        searchParams: PropTypes.object
    }
    constructor(props) {
        super(props);

        this.state = {
            searchParams: props.searchParams,
            totalSubmissions: props.totalSubmissions,
            showSearchBar: false,
            hasCurrentSearch: props.searchParams.keywords !== '',
            previousSearch: props.searchParams.keywords
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

    topics = [
        "All",
        "Agricultural Economics",
        "Business Economics",
        "Computational Economics",
        "Econometrics",
        "Economic Development",
        "Economic History",
        "Economics of Education",
        "Economics of Law",
        "Environmental Economics",
        "Financial Economics",
        "Game Theory",
        "General Economics and Teaching",
        "Health Economics",
        "Industrial Organization",
        "International Economics",
        "Labor Economics",
        "Macroeconomics",
        "Mathematical/Quantitative Methods",
        "Microeconomics",
        "Monetary Economics",
        "Public Economics",
        "Other",
    ];

    componentWillReceiveProps(props) {
        // console.log('[SearchBar] - new props: ', props);
        this.setState({searchParams: props.searchParams, totalSubmissions: props.totalSubmissions})
    }

    /**Toggles visibility of the searchbar */
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

    /**
     * Method called when the user clicks the search button. If the search field is empty,
     * this method simply closes the searchbar. Else, it calls `submit`
     */
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

    /**
     * Resets the current search params to default and dispatches a search request
     */
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

    /**
     * Listener for the search submit. Dispatches a search action.
     * @param {Object} e Event passed from the `onClick` listener
     */
    submit(e) {
        if(e){
            e.preventDefault();
        }
        if(this.state.searchParams.keywords !== ''){
            this.setState({hasCurrentSearch: true, previousSearch: this.state.searchParams.keywords, showSearchBar: false})
        }
        this
            .props
            .onSearch(this.state.searchParams);
    }

    /**
     * Listens for a change in the `Sort by` field then dispatches a new search.
     * @param {Object} e Event passed from the `onChange` listener
     */
    sortByChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                sortBy: e.target.value
            }
        }, this.submit);
    }
    /**
     * Listens for a change in the `Time` field then dispatches a new search.
     * @param {Object} e Event passed from the `onChange` listener
     */
    timeChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                time: e.target.value
            }
        }, this.submit);
    }
    /**
     * Listens for a change in the `Topic` field then dispatches a new search.
     * @param {Object} e Event passed from the `onChange` listener
     */
    topicChanged(e) {
        this.setState({
            searchParams: Object.assign({}, this.state.searchParams, {
                topic: e.target.value
            })
        }, this.submit);
    }
    /**
     * Listens for a change in the `Language` field then dispatches a new search.
     * @param {Object} e Event passed from the `onChange` listener
     */
    langChanged(e) {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                lang: e.target.value
            }
        }, this.submit);
    }

    /**
     * Listens for a change in the `Keywords` text field.
     * @param {Object} e Event passed from the `onChange` listener
     */
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
                                        {this.topics.map(function(topic, index) {
                                            return (
                                                <option key={index}>
                                                    {topic}
                                                </option>
                                            )
                                        }, this)}
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
                                        <option value='Other'>Other</option>
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