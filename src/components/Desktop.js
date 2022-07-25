import React, { Component } from 'react';
import SystemPlanetary from "./SystemPlanetary";
import SystemSatellite from "./SystemSatellite";
import SystemLunar from "./SystemLunar";
import content from "../content.json";
import AnimationBackground from "./AnimationBackground";
import AnimationInteraction from "./AnimationInteraction";
import AnimationPlanetary from "./AnimationPlanetary";
import AnimationSatellites from "./AnimationSatellites";
import AnimationLunar from "./AnimationLunar";

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      system: 'planetary',
      last_system: null,
      open_folder_id: null,
      open_file_id: null
    };

    this.last_hash = '';
    this.loaded = false;
  }

  async componentDidMount() {
      this.navigateHash(); // navigate to folder or page if hash is set

    if (!this.loaded) {
      window.addEventListener('hashchange', this.navigateHash.bind(this), false);
    }
    this.loaded = true;
  }

  // navigate to the set location
  navigateHash() {
    if (window.location.hash === this.last_hash) return; // do not fire twice
    this.last_hash = window.location.hash;

    // get requested 
    let requested_folder, requested_file;
    let requested_location = window.location.hash.substring(2);
    [requested_folder, requested_file] = requested_location.split('/');

    let current_system = 'planetary';
    if (requested_folder) current_system = 'satellites';
    if (requested_file) current_system = 'lunar';

    // set navigation state
    // keep current folder and file to allow animations
    this.setState((state, props) => {
      return {
        system: current_system,
        last_system: state.system,
        open_folder_id: requested_folder ? requested_folder : this.state.open_folder_id,
        open_file_id: requested_file ? requested_file : this.state.open_file_id
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

  // close the lunar content (file)
  closeMoon() {
    window.location.hash = '#/' + this.state.open_folder_id;
  }

  // close all conent
  reset() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { folder_open: false };
    });

    this.navigateHash();
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
              title: file.title ? file.title : id,
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
    let { system, last_system, open_folder_id, open_file_id } = this.state;

    let desktop_class = 'desktop-' + system;
    let animations = [];
    let systems = [];

    // background
    animations.push(<AnimationBackground key="animations-background" />);
    animations.push(<AnimationInteraction key="animations-interaction" />);

    // home - system: planetary
    animations.push(<AnimationPlanetary key="animations-planetary" show={system === 'planetary'} open_folder={open_folder_id} />);
    systems.push(<SystemPlanetary key="system-planetary" content={content} openPlanet={this.openPlanet.bind(this)} />);

    // open folder - system: satellites
    if (open_folder_id) {
      let content = this.getContentById(open_folder_id);

      animations.push(<AnimationSatellites key="animation-satellites" id={open_folder_id} content={content} show={system === 'satellites'} move_sun={system !== 'lunar' && last_system !== 'lunar'} />);
      systems.push(<SystemSatellite key="system-satellites" id={open_folder_id} files={content.files} content={content} openPlanet={this.openMoon.bind(this)} closePlanet={this.reset.bind(this)} />);
    }

    // open file - system: lunar
    if (open_file_id) {
      let content = this.getContentById(open_file_id);

      animations.push(<AnimationLunar key="animation-lunar" id={open_file_id} content={content} show={system === 'lunar'} />);
      systems.push(<SystemLunar key="system-lunar" id={open_file_id} folder={open_folder_id} file={open_file_id} content={content} closeMoon={this.closeMoon.bind(this)} />);
    }

    return (
      <div id="desktop" className={desktop_class} key={this.props.id}>
        <div id="animations">{animations}</div>
        <div id="systems">{systems}</div>
      </div >
    );
  }
}

export default Desktop;