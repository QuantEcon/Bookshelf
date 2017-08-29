import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/img/qe-logo-horizontal.png';

class Head extends Component {
    render() {
        return (
            <header className="header">

                <div className="row columns">

                    <div className="header-container">

                        <div className="site-title">
                            <Link to='/'>
                                <h2 className="site-name">QuantEconLib (beta)</h2>
                                <p className="site-tag">Open notebook library for economic modeling</p>
                            </Link>

                        </div>
                        
                        {this.props.isSignedIn
                            ? <ul className='site-menu'>
                                    <li className='menu-user'>
                                        <Link to="/user/my-profile">
                                            <div className='avatar'>
                                                <img
                                                    src={this.props.user.avatar}
                                                    alt="My Avatar"/>
                                            </div>
                                            <span>My Profile</span>
                                        </Link>
                                    </li>
                                    <li className='menu-submit'>
                                        <Link to="/submit">Submit Notebook</Link>
                                    </li>
                                </ul>
                            : <ul className='site-menu'>
                                <li className="menu-signin">
                                    <Link to='/signin'>Sign In</Link>
                                </li>
                                <li className='menu-submit'>
                                    <Link to="/signin">Submit Notebook</Link>
                                </li>
                            </ul>}

                    </div>

                </div>

            </header>
        );
    };
}

export default Head;