import React, { Component } from 'react';
import settings from "../animation_settings.json";
import MathBook from "../classes/MathBook.js";

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

    // set light source dot
    p5.noStroke();
    p5.fill(settings.colors.active);
    p5.ellipse(light_source.x, light_source.y, 10);

    return light_source;
  }
}

export default Animation;