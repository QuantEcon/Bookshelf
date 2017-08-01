import React, { Component } from 'react';

class SignInButton extends Component {
    // constructor(props){
    //     super(props);
    //     console.log('[SignInButton] - props: ', props);

    // }

    render(){
        return(
            <div>
                <a onClick={this.props.onClick}>
                    <span>{this.props.icon}</span>
                    {this.props.provider}
                </a>
            </div>
        )
    }
}

export default SignInButton