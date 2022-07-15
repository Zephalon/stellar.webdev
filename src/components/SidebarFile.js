import React, { Component } from 'react';

class SidebarFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sidebar sidebar-file">
        <div className="sidebar-icon">
          <div className="sidebar-title headline">
            <span className="highlight">{this.props.title}</span>
          </div>
        </div>
        <div className="sidebar-meta">
        </div>
        {<button className="sidebar-action" onClick={this.props.closeFile}>
          Datei schliessen
        </button>}
      </div>
    );
  }
}

export default SidebarFile;