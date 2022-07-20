import React, { Component } from 'react';
import Sketch from "react-p5";
import content from "../content.json";
import settings from "../animation_settings.json";
import Sun from "../classes/Sun.js";
import Starfield from "../classes/Starfield.js";
import Planet from "../classes/Planet.js";
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
      'planet': Planet
    }
    content.forEach(folder => {
      this.planets.push(new classMap[folder.render]('planet-' + folder.id, this.sun));
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
    this.calculateBaseSize(!this.props.show);
    if (!this.base_size) return null;

    //console.log(p5.frameRate());

    this.starfield.render(p5, this.base_size);
    this.sun.render(p5, this.base_size);

    // animate each planet
    this.planets.forEach(planet => planet.move(false).renderOrbit(p5, settings.colors.secondary, this.base_size));

    if (this.props.show) {
      let user_light_source = this.getUserLightsource(p5);
      this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.active, this.base_size, user_light_source));
    }
    this.planets.forEach(planet => planet.renderShadow(p5, settings.colors.black, this.base_size, this.sun, 0.5));

    this.planets.forEach(planet => planet.renderBody(p5, settings.colors.active, this.base_size));
  };

  render() {
    return (
      <div id="animation-system" className="animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationSystem;