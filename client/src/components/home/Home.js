import React, {Component} from 'react';

// import SubmissionList from '../submissions/SubmissionList';
import SubmissionListContainer from '../../containers/submission/SubmissionListContainer';
import HeadContainer from '../../containers/HeadContainer';

class Home extends Component {
    render() {
        return (
            <div>
                <HeadContainer/>
                <SubmissionListContainer/>
            </div>

        );
    }
    componentDidMount(){
        document.title = 'QuantEcon'
    }
}

export default Home;