import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Markdown from 'react-markdown';

class UserPreview extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: props.user
        }
    }

    render() {
        return (
            <div className="notebook-summary">
                <div className="specs">
                    <h3 className="title">
                        <Link to={"/user/" + this.state.user._id}>
                            {this.state.user.name}
                        </Link>
                    </h3>
                    <Markdown
                        disallowedTypes={['heading']}
                        source={this.state.user.summary
                        ? this.state.user.summary
                        : "*No summary*"}
                        className='short'/>
                </div>
                <p className="avatar">
                    <Link to={"/user/" + this.state.user._id}>
                        <img src={this.state.user.avatar} alt="User's avatar"/>
                    </Link>
                </p>
                <div className="stats">
                    <ul>
                        <li className="views">
                            <span className="count">
                                {this.state.user.submissions
                                ? this.state.user.submissions.length
                                : 0}
                            </span>
                            Submissions
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserPreview