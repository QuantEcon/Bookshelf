import React from 'react';
import MetaTags from 'react-meta-tags';
 
class MetaTagsComp extends React.Component {
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

export default MetaTagsComp;