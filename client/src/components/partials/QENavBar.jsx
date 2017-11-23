import React, {Component} from 'react';
import {a} from 'react-router-dom'

import logo from '../../assets/img/qe-logo-horizontal.png';

class QENavBar extends Component {
    render() {
        return (
        <div class="qe-menubar">
        
            <p class="qe-menubar-logo"><a href="https://quantecon.org/" title="quantecon.org"><img src="{logo}" alt="QuantEcon logo" /> Quant<span>Econ</span></a></p>
        
            <ul class="qe-menubar-nav">
                <li><a href="https://lectures.quantecon.org/" title="Lectures">Lectures</a></li>
                <li><a href="https://quantecon.org/python_index.html" title="QuantEcon.py">QuantEcon.py</a></li>
                <li><a href="https://quantecon.org/julia_index.html" title="QuantEcon.jl">QuantEcon.jl</a></li>
                <li><a href="http://notebooks.quantecon.org/" title="Notebooks">Notebooks</a></li>
                <li><a href="http://cheatsheets.quantecon.org/" title="Cheatsheets">Cheatsheets</a></li>
                <li><a href="https://quantecon.org/workshops" title="Workshops">Workshops</a></li>
                <li><a href="http://discourse.quantecon.org/" title="Forum">Forum</a></li>
                <li><a href="https://github.com/QuantEcon/" title="Repository"><span class="show-for-sr">Repository</span></a></li>
                <li><a href="https://twitter.com/quantecon" title="Twitter"><span class="show-for-sr">Twitter</span></a></li>
            </ul>

        </div>
        )
    }
}

export default QENavBar