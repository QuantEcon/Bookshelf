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
                                <h2 className="site-name">QuantEconLib</h2>
                                <p className="site-tag">Open notebook library for economic modeling</p>
                            </Link>

                        </div>

                        <p className="qe-logo">
                            <Link to='https://quantecon.org/'>
                                <img src={logo} alt="QuantEcon logo"/>Quant<span>Econ</span>
                            </Link>
                        </p>

                        <ul className="site-menu">
                            <li className="menu-signin">
                                <Link to='/signin'>Sign In</Link>
                            </li>
                        </ul>

                    </div>

                </div>

            </header>
        );
    };
}

export default Head;