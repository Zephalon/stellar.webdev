import React, { Component } from 'react';

import './App.scss';
import SolarSystem from "./components/SolarSystem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app" key={this.props.id}>
        <header className="app-header"></header>
        <SolarSystem />
      </div>
    );
  }
}

export default App;