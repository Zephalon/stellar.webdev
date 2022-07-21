import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Animation from "./Animation.js";
import Celestial from "../classes/Celestial.js";
import Starfield from "../classes/Starfield.js";

class AnimationLunar extends Animation {
  // state
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.sun = new Celestial('celestial-moon', settings.colors.light, document.getElementById('planet-' + this.props.id)); // create Moon (sun)
    this.starfield = new Starfield(settings.starfield.size, settings.starfield.speed, this.sun, settings.colors.secondary, settings.starfield.count * 0.25, false); // create starfield
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

    this.starfield.setAngle(p5, 60).render(p5, this.base_size);
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