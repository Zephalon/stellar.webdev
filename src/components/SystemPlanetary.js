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
    let { content, openPlanet: open } = this.props;

    return (
      <div className="system system-planetary">
        <Celestial id="celestial-sun" />
        <ul className="planets">
          {content.map((folder) =>
            <Planet key={folder.id} id={folder.id} title={folder.title} link={folder.link ? folder.link : false} openPlanet={open} />
          )}
        </ul>
      </div>
    )
  }
}

export default SystemPlanetary;