import React, { Component } from 'react';

import './App.scss';
import Desktop from "./components/Desktop";
import fs from 'fs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app" key={this.props.id}>
        <header className="app-header"></header>
        <Desktop />
      </div>
    );
  }
}

export default App;