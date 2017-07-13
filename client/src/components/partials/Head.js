import React, {Component} from 'react';

import logo from '../../assets/img/qe-logo-horizontal.png';

class Head extends Component {

    render() {
        return (
            <header className="header">

                <div className="row columns">

                    <div className="header-container">

                        <div className="site-title">
                            <a href="/">
                                <h2 className="site-name">QuantEconLib</h2>
                                <p className="site-tag">Open notebook library for economic modeling</p>
                            </a>
                        </div>

                        <p className="qe-logo">
                            <a href="https://quantecon.org/" title="quantecon.org">
                                <img src={logo} alt="QuantEcon logo"/>Quant<span>Econ</span>
                            </a>
                        </p>

                        <ul className="site-menu">
                            <li className="menu-signin">
                                <a href="/login" aria-haspopup="true">Sign In</a>
                            </li>
                        </ul>

                    </div>

                </div>

            </header>
        );
    };
}

export default Head;