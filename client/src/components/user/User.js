import React, {Component} from 'react';

import Time from 'react-time';
import Markdown from 'react-markdown';

import SubmissionListContainer from '../../containers/submission/SubmissionListContainer'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import EmailIcon from 'react-icons/lib/md/email'

import Head from '../partials/Head';

class User extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className='row columns'>
                    <div className='details'>
                        <div className='details-side'>
                            <p className='avatar'>
                                {this.props.isLoading
                                    ? null
                                    : <a><img src={this.props.data.avatar} alt='User avatar'/></a>}
                            </p>
                        </div>
                        <div className='details-main'>
                            <div className='details-header'>
                                <div className='details-title'>
                                    {this.props.isLoading
                                        ? null
                                        : <h1 className='title'>{this.props.data.name}</h1>}

                                    {/*TODO: Insert my-page settings here*/}
                                    <p className='date'>
                                        Joined {!this.props.isLoading
                                            ? <Time value={this.props.data.joinDate} format='d MMM YYYY'/>
                                            : null}
                                    </p>
                                </div>
                                <div className='details-counts'>
                                    <div className='counts'>
                                        <ul>
                                            <li className='views'>
                                                <span className='count'>{!this.props.isLoading
                                                        ? <div>{this.props.data.submissions.length}</div>
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
                                    {!this.props.isLoading
                                        ? <div>
                                                <Markdown source={this.props.data.summary}/>
                                                <ul className='networks'>
                                                    {this.props.data.github
                                                        ? <li>
                                                                <a href={this.props.data.github.url}>
                                                                    <span><GithubIcon/></span>
                                                                    <span>GitHub</span>
                                                                </a>
                                                            </li>
                                                        : null}

                                                    {this.props.data.fb
                                                        ? <li>
                                                                <a href={this.props.data.fb.url}>
                                                                    <span><FacebookIcon/></span>
                                                                    <span>Facebook</span>
                                                                </a>
                                                            </li>
                                                        : null}

                                                    {this.props.data.twitter
                                                        ? <li>
                                                                <a href={this.props.data.twitter.url}>
                                                                    <span><TwitterIcon/></span>
                                                                    <span>Twitter</span>
                                                                </a>
                                                            </li>
                                                        : null}
                                                    {this.props.data.email
                                                        ? <li>
                                                                <a href={'mailto:' + this.props.data.email}>
                                                                    <span><EmailIcon/></span>
                                                                    <span>Email</span>
                                                                </a>
                                                            </li>
                                                        : null}
                                                </ul>
                                                {this.props.data.website
                                                    ? <p className='web'>
                                                            <a href={this.props.data.website}>{this.props.data.website}</a>
                                                        </p>
                                                    : null}
                                            </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        {!this.props.isLoading
                            ? <SubmissionListContainer userID={this.props.data._id}/>
                            : null}
                    </div>
                </div>
            </div>

        );
    }
}

export default User;