import React, {Component} from 'react';

// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';
import QENavBar from '../partials/QENavBar'
import BetaBanner from '../partials/BetaBanner';
import * as SubmissionListActions from '../../actions/submissionList';

class Home extends Component {
    constructor(props){
        super(props);

        var searchParams = this.getUrlVars(window.location.href);
        if(searchParams.topic){
            searchParams.topic = decodeURIComponent(searchParams.topic);
            
        }
        console.log('[Home] - url search params: ', searchParams);
        
        this.state = {
            searchParams: searchParams
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
                <QENavBar/>
                <HeadContainer/>
                <BetaBanner/>
                <hr/>
                <SubmissionListContainer searchP={this.state.searchParams}/>
            </div>

        );
    }
    componentDidMount(){
        document.title = 'QuantEcon'
    }
}

export default Home;