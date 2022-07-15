import React, { Component } from 'react';
import Folders from "./Folders";
import WindowFolder from "./WindowFolder";
import Logotype from "./Logotype";
import content from "../content.json";
import DesktopAnimation from "./DesktopAnimation";

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_folder_id: null,
      open_file_id: null,
      loaded: false
    };
  }

  async componentDidMount() {
    this.navigateHash(); // navigate to folder or page if hash is set
    window.addEventListener('hashchange', this.navigateHash.bind(this), false);

    this.setState((state, props) => {
      return { loaded: true };
    });
  }

  // navigate to the set location
  navigateHash() {
    let requested_folder, requested_file;
    let requested_location = window.location.hash.substring(2);
    [requested_folder, requested_file] = requested_location.split('/');

    // set navigation state
    this.setState((state, props) => {
      return {
        open_folder_id: requested_folder ? requested_folder : null,
        open_file_id: requested_file ? requested_file : null
      };
    });
  }

  // open the content window
  openWindow(id) {
    // search for the content and open it
    let content = this.getContentById(id);

    if (content && content.type === 'folder') {
      window.location.hash = '#/' + id;
    } else {
      console.warn('Invalid Content ID: ' + id);
    }
  }

  // close the conten window
  closeWindow() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { open_folder_id: null };
    });
  }

  // fetch content (page, folder) by id
  getContentById(id) {
    let result = null;

    // folders
    content.forEach(folder => {
      if (folder.id === id) {
        result = {
          id: id,
          title: folder.title,
          type: 'folder',
          files: folder.files,
        }
      }

      // files
      if (folder.files) {
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
      }
    });

    return result;
  }

  render() {
    let { open_folder_id, open_file_id, loaded } = this.state;

    let active_folder = '';
    if (open_folder_id) {
      let folder = this.getContentById(open_folder_id);
      active_folder = <WindowFolder key={folder} id={folder.id} title={folder.title} files={folder.files} closeWindow={this.closeWindow.bind(this)} openFile={open_file_id} />;
    }

    let animation = '';
    if (loaded) {
      animation = <DesktopAnimation content_open={this.state.open_folder_id ? true : false} />;
    }

    return (
      <div className="desktop" key={this.props.id}>
        <div id="sun"></div>
        {animation}
        <Logotype />
        <Folders content={content} openWindow={this.openWindow.bind(this)} />
        {active_folder}
      </div >
    );
  }
}

export default Desktop;