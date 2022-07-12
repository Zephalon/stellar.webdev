import React, { Component } from 'react';
import Folder from "./Folder";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="folders">
        {this.props.content.map((folder) =>

          <Folder key={folder.id} id={folder.id} title={folder.title} openWindow={this.props.openWindow} />
        )}
      </ul>
    )
  }
}

export default Folders;