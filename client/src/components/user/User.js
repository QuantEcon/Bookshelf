import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Time from 'react-time';
import Markdown from 'react-markdown';

import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';
import Breadcrumbs from '../partials/Breadcrumbs'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import GithubIcon from 'react-icons/lib/fa/github'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import EmailIcon from 'react-icons/lib/md/email'
import GearIcon from 'react-icons/lib/fa/cog'

class User extends Component {
    constructor(props) {
        super(props)
        this.signOut = this
            .signOut
            .bind(this);
    }

    compoentDidMount() {
        if (this.props.isMyProfile) {
            document.title = 'My Profile - QuantEcon Bookshelf'
        }
    }

    componentWillReceiveProps(props) {
        if (props.data) {
            if (props.isMyProfile) {
                document.title = 'My Profile - QuantEcon Bookshelf'
            } else {
                document.title = props.data.name + " - QuantEcon Bookshelf"
            }
        }
    }

    signOut = () => {
        this
            .props
            .signOut();
    }

    render() {
        return (
            <div>
                <HeadContainer/> {this.props.isLoading
                    ? null
                    : <Breadcrumbs title={this.props.data.name}/>}
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
                                    {this.props.isMyProfile
                                        ? <div>
                                                <ul className='details-options'>
                                                    <li>
                                                        <Link to="/user/my-profile/edit">
                                                            <GearIcon/>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a onClick={this.signOut}>
                                                            Sign Out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        : null}
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
                                                <Markdown
                                                    source={this.props.data.summary
                                                    ? this.props.data.summary
                                                    : '*No summary*'}/>
                                                <ul className='networks'>
                                                    {this.props.data.github && !this.props.data.github.hidden
                                                        ? <li>
                                                                <a href={this.props.data.github.url}>
                                                                    <span><GithubIcon/></span>
                                                                    <span>GitHub</span>
                                                                </a>
                                                            </li>
                                                        : null}

                                                    {this.props.data.fb && !this.props.data.fb.hidden
                                                        ? <li>
                                                                <a href={this.props.data.fb.url}>
                                                                    <span><FacebookIcon/></span>
                                                                    <span>Facebook</span>
                                                                </a>
                                                            </li>
                                                        : null}

                                                    {this.props.data.twitter && !this.props.data.twitter.hidden
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