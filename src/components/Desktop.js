import React, { Component } from 'react';
import SystemPlanetary from "./SystemPlanetary";
import SystemSatellite from "./SystemSatellite";
import SystemLunar from "./SystemLunar";
import Logotype from "./Logotype";
import content from "../content.json";
import AnimationSystem from "./AnimationSystem";
import AnimationSatellites from "./AnimationSatellites";
import AnimationLunar from "./AnimationLunar";

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_window_id: null,
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
        open_window_id: requested_folder ? requested_folder : null,
        open_file_id: requested_file ? requested_file : null
      };
    });
  }

  // open the planetary content
  openPlanet(id) {
    // search for the content and open it
    let content = this.getContentById(id);

    if (content && ['folder', 'contact'].includes(content.type)) {
      window.location.hash = '#/' + id;
    } else {
      console.warn('Invalid Folder ID: ' + id);
    }
  }

  // open the lunar content
  openMoon(id) {
    // search for the content and open it
    let content = this.getContentById(id);

    console.log(content);

    if (content && ['file'].includes(content.type)) {
      window.location.hash = '#/' + this.state.open_window_id + (id ? '/' + id : '');
    } else {
      console.warn('Invalid File ID: ' + id);
    }
  }

  // close all conent
  reset() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { open_window_id: null };
    });
  }

  // fetch content (page, folder) by id
  getContentById(id) {
    let result = null;

    // folders
    content.forEach(content_piece => {
      if (content_piece.id === id) {
        result = {
          id: id,
          title: content_piece.title,
          type: content_piece.type,
          files: content_piece.files,
        }
      }

      // files
      if (content_piece.files) {
        content_piece.files.forEach(file => {
          if (file.id === id) {
            result = {
              id: id,
              type: 'file',
              folder: content_piece.id,
              path: 'content/' + content_piece.id + '/' + file.id
            }
          }
        });
      }
    });

    return result;
  }

  render() {
    let { open_window_id, open_file_id, loaded } = this.state;

    let window = '';

    /*if (open_window_id) {
      let content = this.getContentById(open_window_id);

      if (content.type === 'folder') {
        window = <WindowFolder key={content} id={content.id} title={content.title} files={content.files} closeWindow={this.closeWindow.bind(this)} openFile={open_file_id} />;
      }

      if (content.type === 'contact') {
        window = <WindowContact key={content} id={content.id} title={content.title} closeWindow={this.closeWindow.bind(this)} />;
      }
    }*/

    let system = <SystemPlanetary content={content} openPlanet={this.openPlanet.bind(this)} />;

    let animation = '';
    if (loaded) {
      animation = <AnimationSystem content_open={this.state.open_window_id ? true : false} />;
    }


    if (open_file_id) {
      let content = this.getContentById(open_file_id);

      animation = <AnimationLunar content={content} />;
      system = <SystemLunar folder={open_window_id} file={open_file_id} />;
    } else if (open_window_id) {
      let content = this.getContentById(open_window_id);

      animation = <AnimationSatellites content={content} />;
      system = <SystemSatellite files={content.files} openPlanet={this.openMoon.bind(this)} />;
    }

    return (
      <div className="desktop" key={this.props.id}>
        <div id="sun"></div>
        {animation}
        <Logotype />
        {system}
      </div >
    );
  }
}

export default Desktop;