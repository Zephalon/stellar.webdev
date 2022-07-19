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

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let { open_folder_id, open_file_id, loaded } = this.state;

    let window = '';

    /*if (open_folder_id) {
      let content = this.getContentById(open_folder_id);

      if (content.type === 'folder') {
        window = <WindowFolder key={content} id={content.id} title={content.title} files={content.files} closeWindow={this.closeWindow.bind(this)} openFile={open_file_id} />;
      }

      if (content.type === 'contact') {
        window = <WindowContact key={content} id={content.id} title={content.title} closeWindow={this.closeWindow.bind(this)} />;
      }
    }*/

    let classes = ['desktop'];

    let system_planetary = <SystemPlanetary content={content} openPlanet={this.openPlanet.bind(this)} />;
    let animation_planetary = loaded ? <AnimationSystem content_open={this.state.open_folder_id ? true : false} /> : '';

    let system = '';
    let animation = '';

    if (open_file_id) {
      let content = this.getContentById(open_file_id);

      animation = <AnimationLunar content={content} />;
      system = <SystemLunar folder={open_folder_id} file={open_file_id} />;
      classes.push('desktop-lunar');
    } 
    
    if (open_folder_id) {
      let content = this.getContentById(open_folder_id);

      animation = <AnimationSatellites content={content} />;
      system = <SystemSatellite files={content.files} openPlanet={this.openMoon.bind(this)} />;
      classes.push('desktop-satellites');
    } else {
      classes.push('desktop-planetary');
    }

    return (
      <div className={classes.join(' ')} key={this.props.id}>
        <Sun />
        {animation_planetary}
        {animation}
        <Logotype />
        {system_planetary}
        {system}
      </div >
    );
  }
}

export default Desktop;