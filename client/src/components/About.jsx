import React, {Component} from 'react';
import HeadContainer from '../containers/HeadContainer';
import Breadcrumbs from './partials/Breadcrumbs'
import Markdown from 'react-markdown'
import axios from 'axios'
class About extends Component {
    constructor(props) {
        super(props);
        this.state ={
            content: 'loading...'
        }
        console.log('[About] - fetching about page');
        axios.get('/api/about')
            .then(resp => {
                console.log('[About] - returned resp: ', resp);
                this.setState({
                    content: resp.data.content
                })
            })
            .catch(err => {
                console.log('[About] - err:', err);
                this.setState({
                    error: err
                })
            })
    }

    render() {
        return (
            <div>
                <HeadContainer/>
                <Breadcrumbs title='About'/>
                <div className='row'>
                    <div className='page-title'>
                        <h2 className='title-name'>
                            About
                        </h2>
                    </div>
                    <div className='column'>
                        <Markdown source={this.state.content}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default About;