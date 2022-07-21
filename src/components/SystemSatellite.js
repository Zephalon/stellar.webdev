import React, { Component } from 'react';
import System from "./System";
import Moon from "./Moon";

class SystemSatellite extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="system system-satellites">
        {this.props.files.map((file) =>
          <Moon key={file.id} id={file.id} title={file.title} openPlanet={this.props.openPlanet} />
        )}
      </ul>
    )
  }
}

export default SystemSatellite;