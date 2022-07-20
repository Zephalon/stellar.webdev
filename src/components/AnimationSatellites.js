import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Sun from "../classes/Sun.js";
import Moon from "../classes/Moon.js";
import Animation from "./Animation.js";
import Starfield from "../classes/Starfield.js";

class AnimationSatellites extends Animation {
  // state
  Moons = [];
  starfield = [];

  constructor(props) {
    super(props);
    this.state = {};

    this.sun = new Sun('sun', settings.colors.active, document.getElementById('planet-' + props.id)); // create Moon (sun)
    this.starfield = new Starfield(settings.starfield.size, settings.starfield.speed, this.sun, settings.colors.secondary, false); // create starfield
  }

  async componentDidMount() {
    this.populateMoons();
  }

  async componentDidUpdate(prev_props, prev_state) {
    if (prev_props.content.files !== this.props.content.files) {
      this.populateMoons();
    }
    if (prev_props.id !== this.props.id) {
      this.sun.setOriginElement(document.getElementById('planet-' + this.props.id));
    }
  }

  populateMoons() {
    // create moons (Moons)
    this.moons = [];
    this.props.content.files.forEach(file => {
      this.moons.push(new Moon('planet-' + file.id, this.sun));
    });
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
    this.p5 = p5;

    // ToDo: do not run setup twice!
    p5.createCanvas(0, 0).parent(canvasParentRef);

    this.resizeP5Canvas.bind(p5)();

    window.addEventListener('resize', this.resizeP5Canvas.bind(p5), true);
  };

  // resize canvas on window resize
  resizeP5Canvas() {
    this.resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  }

  // p5.draw
  draw = (p5) => {
    let { show, file_open } = this.props;

    p5.clear();
    this.calculateBaseSize(!show);
    if (!this.base_size) return null;

    this.starfield.setAngle(p5, 45).render(p5); // todo
    this.sun.render(p5, this.base_size, this.props.move_sun);

    // animate each Moon
    this.moons.forEach(moon => moon.move(false).renderOrbit(p5, settings.colors.secondary, this.base_size));

    if (!this.props.content_open) {
      let user_light_source = this.getUserLightsource(p5);
      this.moons.forEach(moon => moon.renderShadow(p5, settings.colors.light, this.base_size, user_light_source));
    }
    this.moons.forEach(moon => moon.renderShadow(p5, settings.colors.black, this.base_size, this.sun, 0.5));

    this.moons.forEach(moon => moon.renderBody(p5, settings.colors.light, this.base_size, this.sun));
  };

  render() {
    return (
      <div id="animation-satellites" className="animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationSatellites;