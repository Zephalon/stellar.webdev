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
          stellar#<strong>webdev</strong>
        </h1>
      </div>
      </div>
    )
  }
}

export default Logotype;