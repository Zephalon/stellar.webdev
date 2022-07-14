import React, { Component } from 'react';
import Sketch from "react-p5";
import content from "../content.json";
import Sun from "../classes/Sun.js";
import MiniStar from "../classes/MiniStar.js";
import Planet from "../classes/Planet.js";
import Satellite from "../classes/Satellite.js";
import ContentShadow from "../classes/ContentShadow.js";
import MathPack from "../classes/MathPack.js";

class DesktopAnimation extends Component {
  // settings
  colors = {
    light: '#F2E2C4',
    dark: '#261D11',
    active: '#A6290D',
    secondary: '#F2B705'
  };
  settings = {
    starfield_count: 100,
    starfield_size: 8,
    starfield_speed: 0.00005
  }

  // state
  canvas_size = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
  planets = [];
  starfield = [];

  constructor(props) {
    super(props);
    this.state = {};

    // ToDo: this on resize
  
    this.sun = new Sun('sun', this.colors.secondary); // create sun

    // create planets
    const classMap = {
      'Planet': Planet,
      'Satellite': Satellite
    }
    content.forEach(folder => {
      this.planets.push(new classMap[folder.type](folder.id, folder.size, this.sun));
    });

    // create starfield
    for (let i = 0; i < this.settings.starfield_count; i++) {
      this.starfield.push(new MiniStar(this.settings.starfield_size, this.settings.starfield_speed, this.sun, this.canvas_size, this.colors.secondary));
    }

    this.content_shadow = new ContentShadow('window_folder-inner', this.sun, this.colors.dark); // create folder shadow
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
    this.p5 = p5;

    // ToDo: do not run setup twice!
    p5.createCanvas(this.canvas_size.width, this.canvas_size.height).parent(canvasParentRef);
  };

  // p5.draw
  draw = (p5) => {
    p5.clear();

    this.starfield.forEach(star => star.render(p5)); // render the starfield
    this.sun.render(p5); // render the sun

    // current light source
    let light_source = {
      x: !this.props.content_open ? p5.mouseX : this.sun.x,
      y: !this.props.content_open ? p5.mouseY : this.sun.y
    }

    // handle the content shadow
    this.content_shadow.setStatus(this.props.content_open);
    this.content_shadow.render(p5);

    // animate each planet
    this.planets.forEach(planet => planet.move(this.props.content_open));
    this.planets.forEach(planet => planet.renderOrbit(p5, this.colors.secondary));
    this.planets.forEach(planet => planet.renderShadow(p5, this.colors.dark, light_source));
    this.planets.forEach(planet => planet.renderPlanet(p5, this.colors.active, light_source));
  };

  render() {
    return (
      <div id="background-animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default DesktopAnimation;