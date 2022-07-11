import React, { Component } from 'react';

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openFile() {
    this.props.openFile(this.props.id);
  }

  render() {
    return (
      <li onClick={this.openFile.bind(this)} className="file" key={this.props.id}>
        <div className="title">
          {this.props.title ? this.props.title : this.props.id}.md
        </div>
      </li>
    );
  }
}

export default File;