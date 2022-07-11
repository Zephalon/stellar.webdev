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
    let view = file.length ? <FileView folder={this.props.id} id={file[0].id} title={file[0].title} closeFile={this.closeFile.bind(this)} /> : <FolderView files={this.props.files} openFile={this.openFile.bind(this)} />;

    return (
      <div className="window_folder">
        <div className="window_folder-inner">
          <div className="window_folder-info">
            <div className="window_folder-icon">&nbsp;</div>
            <div className="window_folder-meta">
              <div className="window_folder-title"><span class="highlight">{this.props.id}</span></div>
              <div>Gravity: Attractive</div>
              <div>Main Composition: CoFFe2</div>
            </div>
            {<button onClick={this.props.closeWindow}>
              Close Folder
            </button>}
          </div>
          <div className="window_folder-content">
            <div className="window_folder-content-inner">
              {view}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WindowFolder;