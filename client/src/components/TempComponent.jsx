import React, { Component } from 'react';
import Markdown from 'react-markdown'

var cleanMarkdown = "# Heading \n **bolded** [link](http://www.google.com)"

const customStyle = {
  textAlign: 'center',
};

class TempComponent extends Component {
    render(){
        return(
            // <div>
            //     loading....
            //     <Markdown source={"# Dirty markdown"}/>
            //     <Markdown source={cleanMarkdown} disallowedTypes={['heading']} unwrapDisallowed={true}/>
            // </div>
            <div>
              <h5 style={customStyle}>User has been deleted.</h5>
            </div>
        )
    }
}

export default TempComponent
