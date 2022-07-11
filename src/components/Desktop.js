import React, { Component } from 'react';
import Folders from "./Folders";
import WindowFolder from "./WindowFolder";
import Logotype from "./Logotype";
import content from "../content.json";

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_folder_id: null,
      open_file_id: null
    };
  }

  async componentDidMount() {
    this.navigateHash();
    window.addEventListener('hashchange', this.navigateHash.bind(this), false);
  }

  // navigate to the set location
  navigateHash() {
    let requested_folder, requested_file;
    let requested_location = window.location.hash.substring(2);
    [requested_folder, requested_file] = requested_location.split('/');

    this.setState((state, props) => {
      return {
        open_folder_id: requested_folder ? requested_folder : null,
        open_file_id: requested_file ? requested_file : null
      };
    });
  }

  openWindow(id) {
    console.log('open: ' + id);

    // search for the content and open it
    let content = this.getContentById(id);

    if (content && content.type === 'folder') {
      window.location.hash = '#/' + id;
    } else {
      console.warn('Invalid Content ID: ' + id);
    }
  }

  closeWindow() {
    window.history.replaceState(null, null, ' ');

    this.setState((state, props) => {
      return { open_folder_id: null };
    });
  }

  getContentById(id) {
    let result = null;

    content.forEach(folder => {
      if (folder.id === id) {
        result = {
          id: id,
          type: 'folder',
          files: folder.files,
        }
      }

      folder.files.forEach(file => {
        if (file.id === id) {
          result = {
            id: id,
            type: 'file',
            folder: folder.id,
            path: 'content/' + folder.id + '/' + file.id
          }
        }
      });
    });

    return result;
  }

  render() {
    let { open_folder_id, open_file_id } = this.state;

    let active_folder = '';
    if (open_folder_id) {
      let folder = this.getContentById(open_folder_id);
      active_folder = <WindowFolder key={folder} id={folder.id} files={folder.files} closeWindow={this.closeWindow.bind(this)} openFile={open_file_id} />;
    }

    return (
      <div className="desktop" key={this.props.id}>
        <Logotype />
        <Folders content={content} openWindow={this.openWindow.bind(this)} />
        {active_folder}
      </div >
    );
  }
}

export default Desktop;