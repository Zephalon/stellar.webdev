import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Animation from "./Animation.js";
import Sun from "../classes/Sun.js";

class AnimationLunar extends Animation {
  // state
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.sun = new Sun('sun', settings.colors.light, document.getElementById('planet-' + this.props.id)); // create Moon (sun)
  }

  async componentDidUpdate(prev_props, prev_state) {
    if (prev_props.id !== this.props.id) {
      this.sun.setOriginElement(document.getElementById('planet-' + this.props.id));
    }
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
    this.createCanvas(p5, canvasParentRef);
  };
  // p5.draw
  draw = (p5) => {
    let { show } = this.props;

    p5.clear();
    this.calculateBaseSize(!show);
    if (!this.base_size) return null;

    this.sun.render(p5, this.base_size, true);
  };

  render() {
    return (
      <div id="animation-lunar" className="animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationLunar;