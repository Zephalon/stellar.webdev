import React, { Component } from 'react';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  openFolder() {
    this.props.openWindow(this.props.id);
  }

  render() {
    return (
      <li onClick={this.openFolder.bind(this)} className="folder" key={this.props.id}>
        <h2>{this.props.title}</h2>
      </li>
    );
  }
}

export default Folder;