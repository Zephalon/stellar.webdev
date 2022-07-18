import React, { Component } from 'react';
import System from "./System";
import FileView from "./FileView";

class SystemLunar extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="system moon">
        <FileView folder={this.props.folder} id={this.props.file} title="" />
      </ul>
    )
  }
}

export default SystemLunar;