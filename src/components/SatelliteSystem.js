import React, { Component } from 'react';
import System from "./System";
import Moon from "./Moon";

class SatelliteSystem extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="system satellites">
        {this.props.files.map((file) =>
          <Moon key={file.id} id={file.id} title={file.title} openWindow={this.props.openWindow} />
        )}
      </ul>
    )
  }
}

export default SatelliteSystem;