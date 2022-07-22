import React, { Component } from 'react';
import System from "./System";
import FileView from "./FileView";
import Celestial from "./Celestial";

class SystemLunar extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { content, folder, file, closeMoon: close } = this.props;

    return (
      <div className="system system-lunar">
        <Celestial id="celestial-moon" />
        <div className="headline-container container">
          <h1 className="headline"><span className="highlight">{content.title}</span></h1>
        </div>
        <div className="file-container container">
          <FileView folder={folder} id={file} title="" />
        </div>
        <div className="button-container container">
          <button className="back" onClick={close}><span className="text">Zurück ⇻</span></button>
        </div>
      </div>
    )
  }
}

export default SystemLunar;