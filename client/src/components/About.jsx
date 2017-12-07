import React, {Component} from 'react';
import HeadContainer from '../containers/HeadContainer';
import Breadcrumbs from './partials/Breadcrumbs'
import Markdown from 'react-markdown'
import axios from 'axios'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'loading...'
        }
        console.log('[About] - fetching about page');
        axios
            .get('/api/about')
            .then(resp => {
                console.log('[About] - returned resp: ', resp);
                this.setState({content: resp.data.content})
            })
            .catch(err => {
                console.log('[About] - err:', err);
                this.setState({error: err})
            })
    }

    render() {
        return (
            <div>
                <HeadContainer/>
                <Breadcrumbs title='About'/>
                <div className='container'>
                    <div className='page-title'>
                        <h2 className='title-name'>
                            About
                        </h2>
                    </div>
                        <div>
                            <p>
                                If you run into any issues or bugs, please follow
                                <a href="http://discourse.quantecon.org/c/bookshelf-feedback"> this link </a>
                                to post an issue. Submit the issue under the category 'bookshelf'. 
                            </p>
                            <p>Thank you for your help.</p>
                        </div>
                        <Markdown source={this.state.content}/>
                </div>
            </div>
        )
    }
}
export default About;