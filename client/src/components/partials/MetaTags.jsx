import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
 
class MetaTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
    }
  }
  componentDidMount() {
    window.setTimeout(()=> {
      this.setState({
        render: true
      })
    },0)
  }
  render() {
    return (
        <div>
          {this.state.render ?
          <MetaTags>
            <title>{this.props.title}</title>
            <meta name="description" content={this.props.description} />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:description" content={this.props.description} />
          </MetaTags>
           : null}
        </div>
      )
  }
}

export default MetaTag;