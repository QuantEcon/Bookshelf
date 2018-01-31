import React, { Component } from 'react';
import HeadContainer from "../containers/HeadContainer";

class NotFound extends Component {
    render(){
        return(
            <div>
                <HeadContainer/>
                <h3> 404: Not Found</h3>
            </div>
        )
    }
}

export default NotFound;