import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
 
class MetaTag extends Component {
  render() {
    return (
        <div>
          <MetaTags>
            <title>{this.props.title}</title>
            <meta name="description" content={this.props.description} />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:description" content={this.props.description} />
          </MetaTags>
        </div>
      )
  }
}

export default MetaTag;