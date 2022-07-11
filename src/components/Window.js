import React, { Component } from 'react';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setLocationHash(file_id) {
    window.location.hash = '#/' + this.props.id + (file_id ? '/' + file_id : '');
  }
}

export default Window;