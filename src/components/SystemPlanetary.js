import React, { Component } from 'react';
import System from "./System";
import Planet from "./Planet";
import Celestial from "./Celestial";

class SystemPlanetary extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="system system-planetary">
        <Celestial id="celestial-sun" />
        <ul className="planets">
          {this.props.content.map((folder) =>
            <Planet key={folder.id} id={folder.id} title={folder.title} openPlanet={this.props.openPlanet} />
          )}
        </ul>
      </div>
    )
  }
}

export default SystemPlanetary;