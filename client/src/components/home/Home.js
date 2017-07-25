import React, {Component} from 'react';

import Head from '../partials/Head';
// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';

class Home extends Component {
    render() {
        return (
            <div>
                <Head/>
                <SubmissionListContainer/>
            </div>

        );
    }
}

export default Home;