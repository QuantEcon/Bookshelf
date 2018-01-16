import React, {Component} from 'react';
import renderHTML from 'react-render-html'

class NotebookFromHTML extends Component {
    render() {
        return (
            <div>
                {renderHTML(this.props.html)}
            </div>
        )
    }
}

export default NotebookFromHTML