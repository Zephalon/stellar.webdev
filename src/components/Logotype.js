import React, { Component } from 'react';

class Logotype extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logotype">
        <div className="logotype-inner">
        <h1>
          <sub>stellar</sub><br />DESIGN<span>&</span><strong>CODE</strong>
        </h1>
      </div>
      </div>
    )
  }
}

export default Logotype;