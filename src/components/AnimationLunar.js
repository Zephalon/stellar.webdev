import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Animation from "./Animation.js";

class AnimationLunar extends Animation {
  // state
  constructor(props) {
    super(props);
    this.state = {};
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
  };

  // p5.draw
  draw = (p5) => {
  };

  render() {
    return (
      <div id="animation-lunar">
        
      </div>
    );
  }
}

export default AnimationLunar;