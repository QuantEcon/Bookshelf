import React, {Component} from 'react';

// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';
import BetaBanner from '../partials/BetaBanner';

class Home extends Component {
    constructor(props){
        super(props);

        var resetSearch = false
        var searchParams = this.getUrlVars(window.location.href);
        if(searchParams.reset) {
            resetSearch = true
        }
        if(searchParams.topic){
            searchParams.topic = decodeURIComponent(searchParams.topic);
        }
        console.log('[Home] - url search params: ', searchParams);
        
        this.state = {
            searchParams: searchParams,
            reset: resetSearch
        }

    }

    getUrlVars = () => {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
                <BetaBanner/>
                <SubmissionListContainer searchP={this.state.searchParams} resetSearch={this.state.reset}/>
            </div>

        );
    }
    componentDidMount(){
        document.title = 'Bookshelf'
    }
}

export default Home;