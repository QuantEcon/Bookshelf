import React, {Component} from 'react';

//Components
import Head from '../partials/Head';

class Submission extends Component {

    constructor(props) {
        super(props);
        console.log('Fetch submission data: ', props);
        fetch('/search/notebook/' + props.match.params.id).then(results => {
            return results.json();
        }).then(data => {
            console.log("Query returned: ", data);
        })
    }

    render() {
        return (
            <div>
                <Head/>
                <div className='row'>
                    <div className='column'>

                        <div className='details'></div>

                        <div className='tileHeader'></div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Submission;