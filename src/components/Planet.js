import React, { Component } from 'react';

class Planet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // relay to parent
  open() {
    if (!this.props.link) {
      this.props.openPlanet(this.props.id);
    } else {
      window.open(this.props.link, '_blank');
    }
  }

  render() {
    let { id, title, link = false } = this.props;

    return (
      <li id={"planet-" + id} className="planet" key={id} onClick={this.open.bind(this)} >
        <div className="planet-inner">
          <div id={"planet-" + id + '-planet'} className="planet-planet"></div>
          <div className="planet-title">
            <h2><span className="highlight">{title + (link ? ' ↝' : '')}</span></h2>
          </div>
        </div>
      </li>
    );
  }
}

export default Planet;