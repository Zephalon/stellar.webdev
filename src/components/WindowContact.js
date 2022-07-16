import React, { Component } from 'react';
import Window from "./Window";
import FileView from "./FileView";

class WindowContact extends Window {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="window window-contact">
        <div id="window-inner" className="window-inner window-contact-inner">
          <div className="window-content window-contact-content">
            <div className="window-content-inner window-contact-content-inner">
            <FileView folder="misc" id={this.props.id} title="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WindowContact;