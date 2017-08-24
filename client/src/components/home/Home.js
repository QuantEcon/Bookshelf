import React, {Component} from 'react';

// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';
import * as SubmissionListActions from '../../actions/submissionList';

class Home extends Component {
    constructor(props){
        super(props);

        var searchParams = this.getUrlVars(window.location.href);
        console.log('[Home] - url search params: ', searchParams.lang);
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
                <HeadContainer/>
                <SubmissionListContainer searchP={this.state.searchParams}/>
            </div>

        );
    }
    componentDidMount(){
        document.title = 'QuantEcon'
    }
}

export default Home;