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
        <div className="folder-inner">
          <div className="folder-planet"></div>
          <h2><span class="highlight">{this.props.title}</span></h2>
        </div>
      </li>
    );
  }
}

export default Folder;