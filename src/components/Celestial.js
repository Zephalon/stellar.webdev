import React, { Component } from 'react';

class Celestial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { id } = this.props;

    return (
      <div id={id} className="celestial"></div>
    );
  }
}

export default Celestial;