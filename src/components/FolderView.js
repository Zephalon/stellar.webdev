import React, { Component } from 'react';
import File from "./File";

class FolderView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="folder_view">
        {this.props.files.map((file) =>
          <li className="file_wrapper">
            <File key={file.id} id={file.id} title={file.title} openFile={this.props.openFile} />
          </li>
        )}
      </ul>
    )
  }
}

export default FolderView;