import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import bookshelfLogo from '../../assets/img/bookshelf-logo.png'

class Head extends Component {
    constructor(props) {
        super(props)

        this.redirectToHome = this
            .redirectToHome
            .bind(this)
    }

    redirectToHome = () => {
        console.log("redirect to home")
        //reset search params
        this.props.resetSearchParams()
        if(this.props.history){
            this.props.history.replace("/")
        } else {
            window.location.href = '/'
        }
    }
    
    render() {
        return (
            <div>
                <div className="corner-ribbon">Beta</div>

                <a
                    className="submit-feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://discourse.quantecon.org/c/bookshelf-feedback">Submit Feedback</a>

                <header className="header">

                    <div className="container">

                        <div className="header-container">

                            <div className="site-title">
                                <a onClick={this.redirectToHome}>
                                    <span>
                                        <img src={bookshelfLogo} alt="Bookshelf Logo" className="bookshelf-logo"/>
                                        <div>
                                            <h2 className="site-name">Quant<span>Econ</span>
                                                <strong>Bookshelf</strong>
                                            </h2>
                                        </div>
                                    </span>
                                </a>

                            </div>

                            <div className="site-nav">
                                <p className="site-tag">Open notebook library for economic modeling</p>
                                <ul>
                                    <li>
                                        <Link to='/'>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/faq'>FAQ</Link>
                                    </li>
                                    <li>
                                        <Link to='/about'>About</Link>
                                    </li>
                                    {this.props.showAdmin && this.props.isSignedIn
                                    ? <li>
                                        <Link to='/admin'>Admin</Link>
                                    </li>
                                    : null}
                                </ul>
                            </div>

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
            </div>
        );
    };
}

export default Head;