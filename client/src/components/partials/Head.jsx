import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import bookshelfLogo from '../../assets/img/bookshelf-logo.png'

class Head extends Component {
    render() {
        return (
            <header className="header">

                <div className="container">

                    <div className="header-container">

                        <div className="site-title">
                            <Link to='/'>
                                <span>
                                    <img src={bookshelfLogo} alt="Bookshelf Logo" className="bookshelf-logo"/>
                                    <div>
                                        <h2 className="site-name">Bookshelf (beta)</h2>
                                        <p className="site-tag">Open notebook library for economic modeling</p>
                                    </div>
                                </span>

                            </Link>

                        </div>

                        <ul className='links'>
                            <li className='link'>
                                <Link to='/'>Home</Link>
                            </li>
                            <li className='link'>
                                <Link to='/faq'>FAQ</Link>
                            </li>
                            <li className='link'>
                                <Link to='/about'>About</Link>
                            </li>
                        </ul>

                        {this.props.isSignedIn
                            ? <ul className='site-menu'>
                                    <li className='menu-user'>
                                        <Link to="/user/my-profile">
                                            <div className='avatar'>
                                                <img src={this.props.user.avatar} alt="My Avatar"/>
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