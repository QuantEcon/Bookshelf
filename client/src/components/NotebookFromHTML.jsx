import React, {Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class NotebookFromHTML extends Component {
    render() {
        return (
            <div>
                {ReactHtmlParser(this.props.html)}
            </div>
        )
    }
}

export default NotebookFromHTML