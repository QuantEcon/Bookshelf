import React, { Component } from 'react';
import Markdown from 'react-markdown';

var cleanMarkdown = "# Heading \n **bolded** [link](http://www.google.com)";

class TempComponent extends Component {
    render(){
        return(
            <div>
                loading....
                <Markdown source={"# Dirty markdown"}/>
                <Markdown source={cleanMarkdown} disallowedTypes={['heading']} unwrapDisallowed={true}/>
            </div>
        )
    }
}

export default TempComponent
