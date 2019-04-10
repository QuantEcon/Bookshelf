import React, { Component } from 'react';
import axios from 'axios';
class Sitemap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'loading...'
        }
        console.log('[About] - fetching sitemap page');
        axios
            .get('/api/sitemap')
            .then(resp => {
                console.log('[About] - returned resp: ', resp.data);
                this.setState({ content: resp.data})
            })
            .catch(err => {
                console.log('[About] - err:', err);
                this.setState({ error: err })
            })
    }
    render() {
        return (
            <div>
                {this.state.content}
            </div>
        )
    }
}
export default Sitemap