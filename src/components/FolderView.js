import React, { Component } from 'react';
import File from "./File";

class FolderView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="files">
        {this.props.files.map((file) =>
          <File key={file.id} id={file.id} title={file.title} openFile={this.props.openFile} />
        )}
      </ul>
    )
  }
}

export default FolderView;