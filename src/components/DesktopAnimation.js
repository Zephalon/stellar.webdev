import React, { Component } from 'react';
import Sketch from "react-p5";
import { Vector } from "p5"
import content from "../content.json";

class DesktopAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getSunPosition();
    this.getPlanetPositions();
  }

  y = 0;
  direction = '^';

  canvas_size = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
  sun = null;
  planets = null;
  colors = {
    light: '#F2E2C4',
    dark: '#261D11',
    active: '#A6290D',
    secondary: '#F2B705'
  }
  folder_shadow_length = 0

  angle = 0;

  setup = (p5, canvasParentRef) => {
    // ToDo: do not create twice!
    p5.createCanvas(this.canvas_size.width, this.canvas_size.height).parent(canvasParentRef);

    //p5.blendMode(p5.ADD);
  };

  draw = (p5) => {
    // ToDo: Remove this here
    function gradientLine(x1, y1, x2, y2, c1, c2, sz) {
      const d = p5.dist(x1, y1, x2, y2)
      for (let i = 0; i < d; i++) {
        const step = p5.map(i, 0, d, 0, 1)
        const x = p5.lerp(x1, x2, step)
        const y = p5.lerp(y1, y2, step)
        const c = p5.lerpColor(c1, c2, step)
        p5.fill(c)
        p5.ellipse(x, y, sz, sz)
      }
    }

    let speed = 0;
    let mouse_shadows = true;
    p5.clear();

    // create the sun
    p5.noStroke();
    p5.fill(this.colors.active);
    p5.ellipse(this.sun.center.x, this.sun.center.y, this.sun.boundaries.width);

    // ToDo: if this stays like this, please don't hire me
    const folder = document.getElementById('window_folder-inner');
    if (folder) {
      speed = 0.005;
      mouse_shadows = false;

      const boundaries = this.getElementBoundaries(folder);

      // ToDo: get the closest edges to the sun

      let folder_points = [
        { x: Math.round(boundaries.left), y: Math.round(boundaries.top) },
        { x: Math.round(boundaries.left), y: Math.round(boundaries.top + boundaries.height) }
      ];

      let folder_vectors = [
        p5.createVector(folder_points[0].x - this.sun.center.x, folder_points[0].y - this.sun.center.y).normalize().setMag(this.canvas_size.width * this.folder_shadow_length * 0.05),
        p5.createVector(folder_points[1].x - this.sun.center.x, folder_points[1].y - this.sun.center.y).normalize().setMag(this.canvas_size.width * this.folder_shadow_length * 0.05),
      ];
      // ToDo: replace "width" with something more clever

      // sun ray
      p5.fill(this.colors.secondary);
      // p5.triangle(this.sun.center.x, this.sun.center.y, folder_points[0].x, folder_points[0].y, folder_points[1].x, folder_points[1].y);

      // create window shadow
      p5.fill(this.colors.dark);
      p5.beginShape();
      p5.vertex(folder_points[0].x, folder_points[0].y);
      p5.vertex(folder_points[0].x + folder_vectors[0].x, folder_points[0].y + folder_vectors[0].y);
      p5.vertex(folder_points[1].x + folder_vectors[1].x, folder_points[1].y + folder_vectors[1].y);
      p5.vertex(folder_points[1].x, folder_points[1].y);
      p5.endShape(p5.CLOSE);

      this.folder_shadow_length = this.folder_shadow_length >= 20 ? 20 : ++this.folder_shadow_length;
    } else {
      this.folder_shadow_length = 0;
    }

    // animate each planet
    this.planets.forEach(planet => {
      let planet_size = planet.boundaries.width * 0.6 * planet.size;
      let orbit = p5.dist(this.sun.center.x, this.sun.center.y, planet.center.x, planet.center.y);
      let planet_speed = (planet_size + 1 / orbit) * 0.01;

      let position = {
        x: this.sun.center.x + orbit * Math.cos(this.angle * planet_speed),
        y: this.sun.center.y + orbit * Math.sin(this.angle * planet_speed)
      }

      // create planet orbit
      /*p5.stroke(this.colors.secondary);
      p5.strokeWeight(1);
      p5.noFill();
      p5.ellipse(planet.center.x, planet.center.y, planet.boundaries.width * 1);*/

      // create sun orbit
      /*p5.stroke(this.colors.light);
      p5.strokeWeight(10);
      p5.noFill();
      p5.ellipse(this.sun.center.x, this.sun.center.y, orbit * 2);*/

      p5.stroke(this.colors.secondary);
      p5.strokeWeight(1);
      p5.noFill();
      p5.ellipse(this.sun.center.x, this.sun.center.y, orbit * 2);
    });

    this.planets.forEach(planet => {
      let planet_size = planet.boundaries.width * 0.6 * planet.size;
      let orbit = p5.dist(this.sun.center.x, this.sun.center.y, planet.center.x, planet.center.y);
      let planet_speed = (planet_size + 1 / orbit) * 0.01;

      let position = {
        x: this.sun.center.x + orbit * Math.cos(this.angle * planet_speed),
        y: this.sun.center.y + orbit * Math.sin(this.angle * planet_speed)
      }

      // create planet shadows
      let light_source = {
        x: mouse_shadows ? p5.mouseX : this.sun.center.x,
        y: mouse_shadows ? p5.mouseY : this.sun.center.y,
        distance: mouse_shadows ? p5.dist(p5.mouseX, p5.mouseY, planet.center.x, planet.center.y) * 0.3 : orbit * 0.5
      }

      let light_angle = this.getAngle(light_source.x, light_source.y, position.x, position.y);
      let shadow_vector = Vector.fromAngle(p5.radians(light_angle), light_source.distance);

      p5.strokeWeight(planet_size * 1);
      p5.stroke(this.colors.dark);
      p5.line(position.x, position.y, position.x + shadow_vector.x, position.y + shadow_vector.y);
      // gradientLine(position.x, position.y, position.x + shadow_vector.x, position.y + shadow_vector.y, p5.color(this.colors.secondary), p5.color(242, 183, 5, 0), planet_size);

      // create planets
      p5.noStroke();
      p5.fill(this.colors.active);
      p5.ellipse(position.x, position.y, planet_size);

      // p5.image(this.layers.planets, 0, 0);
    });

    this.angle += speed;
  };

  getSunPosition() {
    const element = document.getElementById('sun');
    const boundaries = this.getElementBoundaries(element);

    this.sun = {
      element: element,
      boundaries: boundaries,
      center: {
        x: Math.round(boundaries.left + boundaries.width * 0.5),
        y: Math.round(boundaries.top + boundaries.height * 0.5)
      }
    };
  }

  getPlanetPositions() {
    let planets = [];

    content.forEach(folder => {
      const element = document.getElementById('folder-' + folder.id);
      const boundaries = this.getElementBoundaries(element);

      planets.push({
        id: folder.id,
        element: element,
        boundaries: boundaries,
        size: folder.size,
        center: {
          x: Math.round(boundaries.left + boundaries.width * 0.5),
          y: Math.round(boundaries.top + boundaries.height * 0.5)
        }
      })
    });

    this.planets = planets;
  }

  getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  }

  // get the element boundaries...
  getElementBoundaries(element) {
    return !element ? null : element.getBoundingClientRect();
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