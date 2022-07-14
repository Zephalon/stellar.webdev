import React, { Component } from 'react';
import Sketch from "react-p5";
import content from "../content.json";
import Sun from "../classes/Sun.js";
import MiniStar from "../classes/MiniStar.js";
import Planet from "../classes/Planet.js";
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
  sun = null;
  planets = [];
  starfield = [];
  folder_shadow_length = 0;

  constructor(props) {
    super(props);
    this.state = {};

    // ToDo: this on resize
    this.sun = new Sun('sun', this.colors.secondary);

    // create planets
    content.forEach(folder => {
      this.planets.push(new Planet(folder.id, folder.size, this.sun));
    });

    // create starfield
    for (let i = 0; i < this.settings.starfield_count; i++) {
      this.starfield.push(new MiniStar(this.settings.starfield_size, this.settings.starfield_speed, this.sun, this.canvas_size, this.colors.secondary));
    }
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

    // ToDo: if this stays like this, please don't hire me
    const folder = document.getElementById('window_folder-inner');

    // render the folder shadow
    if (folder) {
      const boundaries = MathPack.getElementBoundaries(folder);

      // ToDo: get the closest edges to the sun

      let folder_points = [
        { x: Math.round(boundaries.left), y: Math.round(boundaries.top) },
        { x: Math.round(boundaries.left), y: Math.round(boundaries.top + boundaries.height) }
      ];

      // the two vectors to the closest folder edges
      let folder_vectors = [
        p5.createVector(folder_points[0].x - this.sun.x, folder_points[0].y - this.sun.y).normalize().setMag(this.canvas_size.width * this.folder_shadow_length * 0.05),
        p5.createVector(folder_points[1].x - this.sun.x, folder_points[1].y - this.sun.y).normalize().setMag(this.canvas_size.width * this.folder_shadow_length * 0.05),
      ];
      // ToDo: replace "width" with something more clever

      // sun ray to folde edges (does not look good)
      //p5.fill(this.colors.secondary);
      //p5.triangle(this.sun.x, this.sun.y, folder_points[0].x, folder_points[0].y, folder_points[1].x, folder_points[1].y);

      // create window shadow
      p5.fill(this.colors.dark);
      p5.beginShape();
      p5.vertex(folder_points[0].x, folder_points[0].y);
      p5.vertex(folder_points[0].x + folder_vectors[0].x, folder_points[0].y + folder_vectors[0].y);
      p5.vertex(folder_points[1].x + folder_vectors[1].x, folder_points[1].y + folder_vectors[1].y);
      p5.vertex(folder_points[1].x, folder_points[1].y);
      p5.endShape(p5.CLOSE);

      this.folder_shadow_length = this.folder_shadow_length >= 20 ? 20 : ++this.folder_shadow_length; // increment for animation
    } else {
      this.folder_shadow_length = 0; // reset
    }

    // current light source
    let light_source = {
      x: !this.props.content_open ? p5.mouseX : this.sun.x,
      y: !this.props.content_open ? p5.mouseY : this.sun.y
    }

    // animate each planet
    this.planets.forEach(planet => planet.move(this.props.content_open));
    this.planets.forEach(planet => planet.renderOrbit(p5, this.colors.secondary));
    this.planets.forEach(planet => planet.renderShadow(p5, this.colors.dark, light_source));
    this.planets.forEach(planet => planet.renderPlanet(p5, this.colors.active));
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