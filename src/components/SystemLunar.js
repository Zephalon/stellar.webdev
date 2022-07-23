import React from 'react';
import System from "./System";
import FileView from "./FileView";
import Celestial from "./Celestial";
import Headline from "./Headline";

class SystemLunar extends System {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(prev_props, prev_state) {
    // scroll content window to top
    document.getElementsByClassName('file-container')[0].scrollTop = 0;
  }

  render() {
    let { content, folder, file, closeMoon: close } = this.props;

    return (
      <div className="system system-lunar">
        <Celestial id="celestial-moon" />
        <Headline title={content.title} />
        <div className="file-container container">
          <FileView folder={folder} id={file} title="" />
        </div>
        <div className="button-container container">
          <button className="back" onClick={close}><span className="text">Zurück ⇻</span></button>
        </div>
      </div>
    )
  }
}

export default SystemLunar;