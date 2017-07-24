import React, {Component} from 'react';

import Time from 'react-time';
import Markdown from 'react-markdown';

import SubmissionList from '../submissions/SubmissionList';

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import EmailIcon from 'react-icons/lib/md/email'

import Head from '../partials/Head';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: {
                avatar: ''
            },
            dataReady: false
        };

        console.log('Querying database...');
        fetch('/api/search/users/?_id=' + this.props.match.params.userID).then(results => {
            return results.json();
        }).then(data => {
            console.log('User search returned: ', data);
            this.setState({author: data[0], dataReady: true})
        });
    }

    component

    render() {
        return (
            <div>
                <Head/>
                <div className='row columns'>
                    <div className='details'>
                        <div className='details-side'>
                            <p className='avatar'>
                                <a><img src={this.state.author.avatar} alt='User avatar'/></a>
                            </p>
                        </div>
                        <div className='details-main'>
                            <div className='details-header'>
                                <div className='details-title'>
                                    <h1 className='title'>{this.state.author.name}</h1>
                                    {/*TODO: Insert my-page settings here*/}
                                    <p className='date'>
                                        Joined {this.state.dataReady
                                            ? <Time value={this.state.author.joinDate} format='d MMM YYYY'/>
                                            : null}
                                    </p>
                                </div>
                                <div className='details-counts'>
                                    <div className='counts'>
                                        <ul>
                                            <li className='views'>
                                                <span className='count'>{this.state.dataReady
                                                        ? <div>{this.state.author.submissions.length}</div>
                                                        : null}</span>
                                                Notebooks
                                            </li>
                                            <li className='votes'>
                                                <span className='count'>0</span>
                                                Votes
                                            </li>
                                            <li className='comments'>
                                                <span className='count'>0</span>
                                                Comments
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className='details-body'>
                                <div className='details-primary'>
                                    {this.state.dataReady
                                        ? <Markdown source={this.state.author.summary}/>
                                        : null}
                                    {this.state.author.website
                                        ? <p className='web'>
                                                <a href={this.state.author.website}>{this.state.author.website}</a>
                                            </p>
                                        : null}
                                    <ul className='networks'>
                                        {this.state.author.github
                                            ? <li>
                                                    <a href={this.state.author.github.url}>
                                                        <span><GithubIcon/></span>
                                                        <span>GitHub</span>
                                                    </a>
                                                </li>
                                            : null}

                                        {this.state.author.fb
                                            ? <li>
                                                    <a href={this.state.author.fb.url}>
                                                        <span><FacebookIcon/></span>
                                                        <span>Facebook</span>
                                                    </a>
                                                </li>
                                            : null}

                                        {this.state.author.twitter
                                            ? <li>
                                                    <a href={this.state.author.twitter.url}>
                                                        <span><TwitterIcon/></span>
                                                        <span>Twitter</span>
                                                    </a>
                                                </li>
                                            : null}
                                        {this.state.author.email
                                            ? <li>
                                                    <a href={'mailto:' + this.state.author.email}>
                                                        <span><EmailIcon/></span>
                                                        <span>Email</span>
                                                    </a>
                                                </li>
                                            : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        {this.state.dataReady
                            ? <SubmissionList
                                    searchParams={{
                                    author: this.state.author._id
                                }}/>

                            : null}
                    </div>
                </div>
            </div>

        );
    }
}

export default User;