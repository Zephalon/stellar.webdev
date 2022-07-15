import React, { Component } from 'react';

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // relay to parent
  openFile() {
    this.props.openFile(this.props.id);
  }

  render() {
    return (
      <div className="file" onClick={this.openFile.bind(this)} key={this.props.id}>
        <div className="file-icon">
        <div className="file-title">
          <h3><span className="highlight">{this.props.title ? this.props.title : this.props.id}</span></h3>
        </div>
        </div>
      </div>
    );
  }
}

export default File;