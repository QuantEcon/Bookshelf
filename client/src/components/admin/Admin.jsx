import React, {Component} from 'react';
import HeadContainer from '../../containers/HeadContainer';


class AdminPage extends Component {
    render(){
        return(
            <div>
                <HeadContainer history={this.props.history}/>
                <div className='row'>
                    <div className='page-title'>
                        <h2 className='title-name'>
                            Admin
                        </h2>
                    </div>
                    <div className='column'>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage