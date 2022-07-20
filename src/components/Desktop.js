import React, { Component } from 'react';
import SystemPlanetary from "./SystemPlanetary";
import SystemSatellite from "./SystemSatellite";
import SystemLunar from "./SystemLunar";
import Logotype from "./Logotype";
import content from "../content.json";
import AnimationSystem from "./AnimationSystem";
import AnimationSatellites from "./AnimationSatellites";
import AnimationLunar from "./AnimationLunar";
import Sun from "./Sun";
import MathBook from '../classes/MathBook';

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontpage_open: true,
      open_folder_id: null,
      folder_open: false,
      open_file_id: null,
      file_open: false,
      loaded: false
    };
  }

  async componentDidMount() {
    this.navigateHash(); // navigate to folder or page if hash is set
    window.addEventListener('hashchange', this.navigateHash.bind(this), false);
  }

  // navigate to the set location
  navigateHash() {
    let requested_folder, requested_file;
    let requested_location = window.location.hash.substring(2);
    [requested_folder, requested_file] = requested_location.split('/');

    // set navigation state
    // keep current folder and file to allow animations
    this.setState((state, props) => {
      return {
        frontpage_open: !requested_folder && !requested_file,
        open_folder_id: requested_folder ? requested_folder : this.state.open_folder_id,
        folder_open: requested_folder && !requested_file,
        open_file_id: requested_file ? requested_file : this.state.open_file_id,
        file_open: requested_file ? true : false,
        loaded: true
      };
    });
  }

  // open the planetary content (folder)
  openPlanet(id) {
    // search for the content and open it
    let content = this.getContentById(id);

    if (content && ['folder', 'contact'].includes(content.type)) {
      window.location.hash = '#/' + id;
    } else {
      console.warn('Invalid Folder ID: ' + id);
    }
  }

  // open the lunar content (file)
  openMoon(id) {
    // search for the content and open it
    let content = this.getContentById(id);

    if (content && ['file'].includes(content.type)) {
      window.location.hash = '#/' + this.state.open_folder_id + (id ? '/' + id : '');
    } else {
      console.warn('Invalid File ID: ' + id);
    }
  }

  // close all conent
  reset() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { folder_open: false };
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
    let { frontpage_open, open_folder_id, open_file_id, loaded, folder_open, file_open } = this.state;

    let desktop_class = 'desktop-planetary';
    let animations = [];
    let systems = [];

    // system: planetary
    if (loaded) animations.push(<AnimationSystem key="animations-system" show={!folder_open && !file_open} />);
    systems.push(<SystemPlanetary key="system-planetary" content={content} openPlanet={this.openPlanet.bind(this)} />);

    // open folder - system: satellite
    if (open_folder_id) {
      let content = this.getContentById(open_folder_id);

      animations.push(<AnimationSatellites key="animation-satellites" id={open_folder_id} content={content} show={folder_open} move_sun={frontpage_open || folder_open && !file_open} />);
      systems.push(<SystemSatellite key="system-satellites" id={open_folder_id} files={content.files} openPlanet={this.openMoon.bind(this)} />);
      if (folder_open) desktop_class = 'desktop-satellites';
    }

    // open file - system: lunar
    if (open_file_id) {
      let content = this.getContentById(open_file_id);

      animations.push(<AnimationLunar key="animation-lunar" id={open_file_id} content={content} show={file_open} />);
      systems.push(<SystemLunar key="system-lunar" id={open_file_id} folder={open_folder_id} file={open_file_id} />);
      if (file_open) desktop_class = 'desktop-lunar';
    }

    return (
      <div id="desktop" className={desktop_class} key={this.props.id}>
        <Sun />
        <Logotype />
        <div id="animations">{animations}</div>
        <div id="systems">{systems}</div>
      </div >
    );
  }
}

export default Desktop;