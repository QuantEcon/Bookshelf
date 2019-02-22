import React, { Component } from 'react';
import HeadContainer from "../containers/HeadContainer";
import Breadcrumbs from './partials/Breadcrumbs'

class NotFound extends Component {
    render() {
        return (
            <div>
                <HeadContainer history={this.props.history}/>
                <Breadcrumbs title='Page Not Found'/>

                <div className="container">
                    <div className="page-title">
                        <h1 className="title-name">Page Not Found</h1>
                    </div>
                    <div className='page-content'>
                        <div>

                        	<p>We couldn’t find the page you were looking for.</p>

                        	<p>Please check the URL or try a link below:</p>

							<ul>
								<li><a href="/">Home</a></li>
								<li><a href="/submit">Submit a Notebook</a></li>
								<li><a href="/user/my-profile">View your Profile</a></li>
								<li><a href="/about">About QuantEcon Notes</a></li>
								<li><a href="/contact">Contact us</a></li>
							</ul>

                        </div>
                    </div>
                  
                </div>
              
            </div>
        )
    }
}

export default NotFound;