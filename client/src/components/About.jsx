import React, {Component} from 'react';
import HeadContainer from '../containers/HeadContainer';
import Breadcrumbs from './partials/Breadcrumbs'
class About extends Component {
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

                    </div>
                </div>
            </div>
        )
    }
}
export default About;