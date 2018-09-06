import React, {Component} from 'react';

// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';
import AnnouncementsContainer from '../../containers/AnnouncementsContainer'
import quanteconLogo from '../../assets/img/qe-logo-100.svg'
import jupyterLogo from '../../assets/img/landing-jupyter-logo.png'
import sloanLogo from '../../assets/img/landing-sloan-logo.png'

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
                <div className='landing-logos'>
                      <div className='container'>
                          <ul>
                              <li><a href="https://quantecon.org/"><img src={quanteconLogo} alt="QuantEcon Logo" className="quantecon-logo"/></a></li>
                              <li><a href="http://jupyter.org/"><img src={jupyterLogo} alt="Jupyter Logo" className="jupyter-logo"/></a></li>
                              <li><a href="https://sloan.org/"><img src={sloanLogo} alt="Sloan Logo" className="sloan-logo"/></a></li>
                          </ul>
                      </div>
                </div>
                {/* <BetaBanner/> */}
                <AnnouncementsContainer />
                <SubmissionListContainer searchP={this.state.searchParams} resetSearch={this.state.reset}/>
                {/* <footer className='landing-logos'>
                      <div className='container'>
                          <ul>
                              <li><a href="https://quantecon.org/"><img src={quanteconLogo} alt="QuantEcon Logo" className="quantecon-logo"/></a></li>
                              <li><a href="http://jupyter.org/"><img src={jupyterLogo} alt="Jupyter Logo" className="jupyter-logo"/></a></li>
                              <li><a href="https://sloan.org/"><img src={sloanLogo} alt="Sloan Logo" className="sloan-logo"/></a></li>
                          </ul>
                      </div>

                </footer> */}
            </div>

        );
    }
    componentDidMount(){
        document.title = 'QuantEcon - Notes'
    }
}

export default Home;
