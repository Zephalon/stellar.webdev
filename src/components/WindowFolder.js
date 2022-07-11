import React, { Component } from 'react';
import Window from "./Window";
import FolderView from "./FolderView";
import FileView from "./FileView";

class WindowFolder extends Window {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openFile(file_id) {
    console.log('open file: ' + file_id);
    this.setLocationHash(file_id);
  }

  closeFile(file_id) {
    console.log('close file: ' + file_id);
    this.setLocationHash();
  }

  render() {
    let { files, openFile } = this.props;

    let file = files.filter(file => file.id === openFile);
    let view = file.length ? <FileView folder={this.props.id} id={file[0].id} title={file[0].title} closeFile={this.closeFile.bind(this)}/> : <FolderView files={this.props.files} openFile={this.openFile.bind(this)} />;

    return (
      <div className="window_folder">
        <div className="folder_title">{this.props.id}</div>
        <div className="folder_content">
          {view}
        </div>
        {<button onClick={this.props.closeWindow}>
          Close Folder
        </button>}
      </div>
    )
  }
}

export default WindowFolder;