import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import logo from '../../assets/img/qe-logo-horizontal.png';

class QENavBar extends Component {
    render() {
        return (
            <div className="qe-nav">
                <p className="qe-logo">
                    <Link to="https://quantecon.org/" title="quantecon.org">
                        <img src={logo} alt="QuantEcon logo"/>
                        Quant<span>Econ</span>
                    </Link>
                </p>
                <ul className="qe-menu">
                    <li>
                        <Link to="https://lectures.quantecon.org/">Lectures</Link>
                    </li>
                    <li>
                        <Link to="https://quantecon.org/quantecon-py">QuantEcon.Py</Link>
                    </li>
                    <li>
                        <Link to="https://quantecon.org/quantecon-jl">QuantEcon.jl</Link>
                    </li>
                    <li>
                        <Link to="https://cheatsheets.quantecon.org/">Cheatsheets</Link>
                    </li>
                    <li>
                        <Link to="http://discourse.quantecon.org/">Forum</Link>
                    </li>
                    <li>
                        <Link to="https://github.com/QuantEcon/">Repository</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default QENavBar