import React, { Component } from 'react';

import logo from './logo.svg';
import './App.scss';
import DesktopAnimation from "./DesktopAnimation";
import Desktop from "./components/Desktop";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app" key={this.props.id}>
        <header className="app-header">

        </header>
        <Desktop />
      </div>
    );
  }
}

export default App;