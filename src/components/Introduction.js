import React, { Component } from 'react';

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="introduction">
        <div className="introduction-inner">
        <div className="topline">Hallo, ich bin <span>Fabian</span>.</div>
        <h1>
          let <span>me</span> = <span>yourFullstackWebdev</span>();
        </h1>
      </div>
      </div>
    )
  }
}

export default Introduction;