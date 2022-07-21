import React, { Component } from 'react';
import System from "./System";
import Moon from "./Moon";
import Celestial from "./Celestial";

class SystemSatellite extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="system system-satellites">
        <Celestial id="celestial-planet" />
        <ul className="planets">
          {this.props.files.map((file) =>
            <Moon key={file.id} id={file.id} title={file.title} openPlanet={this.props.openPlanet} />
          )}
        </ul>
        <button className="back2" onClick={this.props.closePlanet}>Back</button>
      </div>
    )
  }
}

export default SystemSatellite;