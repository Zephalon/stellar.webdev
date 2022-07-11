import React, { Component } from 'react';
import Folder from "./Folder";

class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*mapFolders (folders) {
    return folders.map(folder => {
      <Folder key={folder.id} title={folder.title} body={folder.body} openFolder={this.openFolder}/>
    });
}*/

  render() {
    return (
      <ul className="folders">
        {/* this.mapFolders(this.state.folders) */}
        {this.props.content.map((folder) =>

          <Folder key={folder.id} id={folder.id} title={folder.title} openWindow={this.props.openWindow} />
        )}
      </ul>
    )
  }
}

export default Folders;