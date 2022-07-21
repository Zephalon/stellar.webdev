import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Animation from "./Animation.js";
import Pattern from "../classes/Pattern.js";

class AnimationBackground extends Animation {
  // state
  constructor(props) {
    super(props);
    this.state = {};

    this.pattern = new Pattern(settings.colors.black);
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
    this.createCanvas(p5, canvasParentRef);

    p5.noLoop();

    window.addEventListener('resize', this.draw.bind(p5), true);
  };

  // p5.draw
  draw = (p5) => {
    let { show } = this.props;

    p5.clear();
    this.pattern.render(p5);
  };

  render() {
    return (
      <div id="animation-background" className="animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationBackground;