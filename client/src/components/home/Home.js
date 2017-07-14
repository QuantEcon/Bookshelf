import React, {Component} from 'react';

import Head from '../partials/Head';
import SubmissionList from '../submissions/SubmissionList';

class Home extends Component {
    render() {
        return (
            <div>
                <Head/>
                <SubmissionList/>
            </div>

        );
    }
}

export default Home;