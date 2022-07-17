import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Sun from "../classes/Sun.js";
import Planet from "../classes/Planet.js";
import Animation from "./Animation.js";

class AnimationSatellites extends Animation {
  // state
  planets = [];

  constructor(props) {
    super(props);
    this.state = {};

    this.sun = new Sun('sun', settings.colors.active); // create sun
  }

  async componentDidMount() {
    this.planets = [];
    this.props.content.files.forEach(file => {
      this.planets.push(new Planet('planet-' + file.id, 1, this.sun));
    });
    console.log(this.props.content.files);
    console.log(this.planets);
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
    p5.clear();
    this.sun.render(p5); // render the sun

    // animate each planet
    this.planets.forEach(planet => planet.move(false));
    this.planets.forEach(planet => planet.renderOrbit(p5, settings.colors.secondary));

    if (!this.props.content_open) {
      let user_light_source = this.getUserLightsource(p5);
      this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.light, user_light_source));
    }
    this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.black, this.sun, 0.5));

    this.planets.forEach(planet => planet.renderPlanet(p5, settings.colors.light, this.sun));
  };

  render() {
    return (
      <div id="animation-satellites">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationSatellites;