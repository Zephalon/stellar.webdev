import React, { Component } from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Sun from "../classes/Sun.js";
import Planet from "../classes/Planet.js";
import Animation from "./Animation.js";
import Starfield from "../classes/Starfield.js";

class AnimationSatellites extends Animation {
  // state
  planets = [];
  starfield = [];

  constructor(props) {
    super(props);
    this.state = {};

    this.sun = new Sun('sun', settings.colors.active); // create planet (sun)
    this.starfield = new Starfield(settings.starfield.size, settings.starfield.speed, this.sun, settings.colors.secondary); // create starfield
  }

  async componentDidMount() {
    // create moons (planets)
    this.planets = [];
    this.props.content.files.forEach(file => {
      this.planets.push(new Planet('planet-' + file.id, 1, this.sun));
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
    p5.clear();

    this.starfield.render(p5);
    this.sun.render(p5);

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