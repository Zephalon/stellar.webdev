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
      <div className="system lunar">
        <FileView folder={this.props.folder} id={this.props.file} title="" />
      </div>
    )
  }
}

export default SystemLunar;