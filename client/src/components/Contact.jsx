import React, { Component } from 'react';
import HeadContainer from '../containers/HeadContainer';
import Breadcrumbs from './partials/Breadcrumbs'

class Contact extends Component {
    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
                <Breadcrumbs title='Contact'/>

                <div className="container">
                    <div className="page-title">
                        <h2 className="title-name">Contact</h2>
                    </div>
                    <div className='tile'>
                        <div>
                            <p>Please send feedback to <a href="mailto:contact@quantecon.org">contact@quantecon.org</a></p>
                        </div>
                    </div>
                  
                </div>
              
            </div>
        )
    }
}

export default Contact