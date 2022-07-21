import React, { Component } from 'react';

class Planet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // relay to parent
  open() {
    this.props.openPlanet(this.props.id);
  }

  render() {
    return (
      <li id={"planet-" + this.props.id} className="planet" key={this.props.id} onClick={this.open.bind(this)} >
        <div className="planet-inner">
          <div className="planet-planet"></div>
          <div className="planet-title">
            <h2><span className="highlight">{this.props.title ? this.props.title : this.props.id}</span></h2>
          </div>
        </div>
      </li>
    );
  }
}

export default Planet;