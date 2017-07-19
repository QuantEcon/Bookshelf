import React, { Component } from 'react';

import Comment from './Comment';

class Reply extends Component {
    constructor(props){
        super(props)

        this.state = {
            reply: props.reply,
            author: props.author
        }
    }

    render(){
        return(
            <div className='comment-nested'>
                <Comment comment={this.state.reply} author={this.state.author} isReply={true}/>
            </div>
        )
    }
}

export default Reply;