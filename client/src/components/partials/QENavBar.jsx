import React, {Component} from 'react';
import {a} from 'react-router-dom'

import logo from '../../assets/img/qe-logo-horizontal.png';

class QENavBar extends Component {
    render() {
        return (
            // <div className='row column'>
                <div className="qe-nav">
                    <p className="qe-logo">
                        <a href="https://quantecon.org/" title="quantecon.org">
                            <img src={logo} alt="QuantEcon logo"/>
                            Quant<span>Econ</span>
                        </a>
                    </p>
                    <ul className="qe-menu">
                        <li>
                            <a href="https://lectures.quantecon.org/">Lectures</a>
                        </li>
                        <li>
                            <a href="https://quantecon.org/quantecon-py">QuantEcon.Py</a>
                        </li>
                        <li>
                            <a href="https://quantecon.org/quantecon-jl">QuantEcon.jl</a>
                        </li>
                        <li>
                            <a href="https://cheatsheets.quantecon.org/">Cheatsheets</a>
                        </li>
                        <li>
                            <a href="http://discourse.quantecon.org/">Forum</a>
                        </li>
                        <li>
                            <a href="https://github.com/QuantEcon/">Reposihrefry</a>
                        </li>
                    </ul>
                </div>
            //</div>
        )
    }
}

export default QENavBar