import React, { Component } from 'react';
import Window from "./Window";
import FolderView from "./FolderView";
import FileView from "./FileView";
import SidebarFolder from "./SidebarFolder";
import SidebarFile from "./SidebarFile";

class WindowFolder extends Window {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // open file -> set hash, render
  openFile(file_id) {
    this.setLocationHash(file_id);
  }

  // open file -> reset hash, render
  closeFile() {
    this.setLocationHash();
  }

  render() {
    let { files, openFile } = this.props;

    // get open file
    let file = files.filter(file => file.id === openFile);
    file = file.length ? file[0] : null;

    // select file or folder view
    let view = file ? <FileView folder={this.props.id} id={file.id} title={file.title} closeFile={this.closeFile.bind(this)} /> : <FolderView files={this.props.files} openFile={this.openFile.bind(this)} />;

    // set sidebar
    let sidebar = file ? <SidebarFile id={file.id} title={file.title} closeFile={this.closeFile.bind(this)} /> : <SidebarFolder title={this.props.title} closeWindow={this.props.closeWindow} />

    return (
      <div className="window_folder">
        <div id="window_folder-inner" className="window_folder-inner">
          {sidebar}
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