import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class Breadcrumbs extends Component {
    render() {
        return (

            <div className="row columns">

                <ul className="breadcrumbs">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>{this.props.title}</li>
                </ul>

            </div>
        )
    }
}

export default Breadcrumbs