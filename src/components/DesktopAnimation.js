import React, { Component } from 'react';
import Sketch from "react-p5";
import content from "../content.json";
import Sun from "../classes/Sun.js";
import MiniStar from "../classes/MiniStar.js";
import Planet from "../classes/Planet.js";
import Satellite from "../classes/Satellite.js";
import Stargate from "../classes/Stargate.js";
import ContentShadow from "../classes/ContentShadow.js";
import MathBook from "../classes/MathBook.js";

class DesktopAnimation extends Component {
  // settings
  colors = {
    light: '#F2E2C4',
    dark: '#261D11',
    active: '#A6290D',
    secondary: '#F2B705'
  };
  settings = {
    starfield_count: 150,
    starfield_size: 8,
    starfield_speed: 0.1
  }

  // state
  planets = [];
  starfield = [];
  rotation = false;
  rotation_x_offset = null;

  constructor(props) {
    super(props);
    this.state = {};

    // ToDo: this on resize

    this.sun = new Sun('sun', this.colors.secondary); // create sun

    // create planets
    const classMap = {
      'planet': Planet,
      'satellite': Satellite,
      'stargate': Stargate
    }
    content.forEach(folder => {
      this.planets.push(new classMap[folder.type](folder.id, folder.size, this.sun));
    });

    // create starfield
    for (let i = 0; i < this.settings.starfield_count; i++) {
      this.starfield.push(new MiniStar(this.settings.starfield_size, this.settings.starfield_speed, this.sun, this.colors.secondary));
    } this.canvas_size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };

    this.content_shadow = new ContentShadow('window_folder-inner', this.sun, this.colors.dark); // create folder shadow
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

    this.starfield.forEach(star => star.render(p5)); // render the starfield
    this.sun.render(p5); // render the sun

    // current light source
    let light_source = this.props.content_open ? this.sun : this.getUserLightsource(p5);

    // handle the content shadow
    this.content_shadow.setStatus(this.props.content_open);
    this.content_shadow.render(p5);

    // animate each planet
    this.planets.forEach(planet => planet.move(this.props.content_open));
    this.planets.forEach(planet => planet.renderOrbit(p5, this.colors.secondary));

    //if (light_source.x !== 0 && light_source.y !== 0) {
      this.planets.forEach(planet => planet.renderShadow(p5, this.colors.active, light_source));
    //}
    this.planets.forEach(planet => planet.renderShadow(p5, this.colors.dark, this.sun, 0.5));

    this.planets.forEach(planet => planet.renderPlanet(p5, this.colors.active, light_source));
  };

  // get user light source for animation
  getUserLightsource(p5) {
    // default light source
    let light_source = {
      x: p5.mouseX,
      y: p5.mouseY
    };

    if (p5.rotationX || p5.rotationY) {
      // device has accelerometer
      let max_angle = 30;

      if (this.rotation_x_offset === null) this.rotation_x_offset = MathBook.clamp(p5.rotationX, 25, 45);

      let rotation = {
        x: MathBook.clamp(p5.rotationY, max_angle * -1, max_angle),
        y: MathBook.clamp(p5.rotationX - this.rotation_x_offset, max_angle * -1, max_angle)
      }
      light_source = {
        x: document.documentElement.clientWidth * (0.5 + rotation.x * (0.5 / max_angle)),
        y: document.documentElement.clientHeight * (0.5 + rotation.y * (0.5 / max_angle))
      };
    }

    if (light_source.x === 0 && light_source.y === 0) return this.sun;

    // set light source dot
    p5.noStroke();
    p5.fill(this.colors.active);
    p5.ellipse(light_source.x, light_source.y, 10);

    return light_source;
  }

  render() {
    return (
      <div id="background-animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default DesktopAnimation;