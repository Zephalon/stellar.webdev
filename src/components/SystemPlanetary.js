import React, { Component } from 'react';
import System from "./System";
import Planet from "./Planet";

class SystemPlanetary extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="system planets">
        {this.props.content.map((folder) =>
          <Planet key={folder.id} id={folder.id} title={folder.title} openPlanet={this.props.openPlanet} />
        )}
      </ul>
    )
  }
}

export default SystemPlanetary;