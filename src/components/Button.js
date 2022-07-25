import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, class_name, action } = this.props;

    return (
      <div className={class_name}>
        <button onClick={action}><span className="text">{title}</span></button>
      </div>
    )
  }
}

export default Button;