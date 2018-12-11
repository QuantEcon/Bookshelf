import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
 
class MetaTag extends Component {
  render() {
    return (
        <div>
          <MetaTags>
            <meta name="description" content={this.props.description} />
          </MetaTags>
        </div>
      )
  }
}

export default MetaTag;