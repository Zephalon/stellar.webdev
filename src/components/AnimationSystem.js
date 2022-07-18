import React, { Component } from 'react';
import Sketch from "react-p5";
import content from "../content.json";
import settings from "../animation_settings.json";
import Sun from "../classes/Sun.js";
import Starfield from "../classes/Starfield.js";
import Planet from "../classes/Planet.js";
import Satellite from "../classes/Satellite.js";
import Stargate from "../classes/Stargate.js";
import Animation from "./Animation.js";

class AnimationSystem extends Animation {
  // state
  planets = [];
  rotation = false;
  rotation_x_offset = null;

  constructor(props) {
    super(props);
    this.state = {};

    this.sun = new Sun('sun', settings.colors.secondary); // create sun
    this.starfield = new Starfield(settings.starfield.size, settings.starfield.speed, this.sun, settings.colors.secondary); // create starfield
  }

  async componentDidMount() {
    // create planets
    const classMap = {
      'planet': Planet,
      'satellite': Satellite,
      'stargate': Stargate
    }
    content.forEach(folder => {
      this.planets.push(new classMap[folder.render]('planet-' + folder.id, folder.size, this.sun));
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

    //console.log(p5.frameRate());

    this.starfield.render(p5);
    this.sun.render(p5);

    // animate each planet
    this.planets.forEach(planet => planet.move(this.props.content_open));
    this.planets.forEach(planet => planet.renderOrbit(p5, settings.colors.secondary));

    if (!this.props.content_open) {
      let user_light_source = this.getUserLightsource(p5);
      this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.active, user_light_source));
    }
    this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.black, this.sun, 0.5));

    this.planets.forEach(planet => planet.renderPlanet(p5, settings.colors.active, this.sun));
  };

  render() {
    return (
      <div id="animation-system">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationSystem;