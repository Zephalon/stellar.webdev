import React, { Component } from 'react';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  // relay to parent
  openFolder() {
    this.props.openWindow(this.props.id);
  }

  render() {
    return (
      <li id={"folder-" + this.props.id} className="folder" key={this.props.id} onClick={this.openFolder.bind(this)} >
        <div className="folder-inner">
          <div className="folder-planet"></div>
          <h2><span className="highlight">{this.props.title}</span></h2>
        </div>
      </li>
    );
  }
}

export default Folder;