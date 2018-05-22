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
                <HeadContainer history={this.props.history}/>
                <Breadcrumbs title='About'/>
                <div className='container'>
                    <div className='page-title'>
                        <h1 className='title-name'>
                            About
                        </h1>
                    </div>
                    <div className='page-content'>
                        <Markdown source={this.state.content}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default About;