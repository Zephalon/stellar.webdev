import React, { Component } from 'react';

class Headline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title } = this.props;

    return (
      <div className="headline-container container">
        <h1 className="headline"><span className="highlight" dangerouslySetInnerHTML={{__html: title}}></span></h1>
      </div>
    )
  }
}

export default Headline;