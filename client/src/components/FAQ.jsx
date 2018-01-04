import React, {Component} from 'react';
import HeadContainer from '../containers/HeadContainer'
import Breadcrumbs from './partials/Breadcrumbs';

//import '../assets/css/faq.css'

class FAQ extends Component {
    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
                <Breadcrumbs title='FAQ'/>
                <div className='container'>
                    <div className='page-title'>
                        <h2 className='title-name'>
                            Frequently Asked Questions
                        </h2>
                    </div>

                        <div className='qa'>
                            <p className='question'>
                                How does this site work?
                            </p>
                            <p className='answer'>
                                This site is used to encourage the sharing and use of open source code for
                                economic research and modeling. Users can upload their own work, find other
                                notebooks, vote, comment and download notebooks.
                            </p>
                        </div>
                        <div className='qa'>
                            <p className='question'>
                                Are the notebooks interactive?
                            </p>
                            <p className='answer'>
                                Sort of. There is no kernel running, so you cannot execute code cells. However,
                                libraries such as PlotlyJS that use JavaScript allow a notebook's output cells
                                to be interactive.
                            </p>
                        </div>
                        <div className='qa'>
                            <p className='question'>
                                Is this site only for economics?
                            </p>
                            <p className='answer'>
                                The target audience is for economists and economic students and professors.
                            </p>
                        </div>
                        <div className='qa'>
                            <p className='question'>
                                Can anyone submit a notebook?
                            </p>
                            <p className='answer'>
                                Yes! We encourage you to share your work and discover others' work!
                            </p>
                        </div>
                        <div className='qa'>
                            <p className='question'>
                                What should I do if I find an issue with the website?
                            </p>
                            <p className='answer'>
                                Follow
                                <a href="http://discourse.quantecon.org/c/bookshelf-feedback"> this link </a>
                                and post an issue. Please provide a detailed description of the issue and what
                                you were doing at the time. Submit the issue under the category "bookshelf".
                            </p>
                        </div>

                </div>
            </div>
        )
    }
}

export default FAQ;
