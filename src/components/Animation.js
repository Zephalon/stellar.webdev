import React, { Component } from 'react';
import settings from "../animation_settings.json";
import MathBook from "../classes/MathBook.js";

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.base_size = 0; // for animation
    this.rotation_x_offset = null; // for gyro animation
  }

  // cancas setup
  createCanvas = (p5, canvasParentRef) => {
    this.p5 = p5;

    p5.createCanvas(0, 0).parent(canvasParentRef);
    this.resizeP5Canvas.bind(p5)();

    window.addEventListener('resize', this.resizeP5Canvas.bind(p5), true);
  };

  // resize canvas on window resize
  resizeP5Canvas() {
    this.resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  }

  // get user light source for animation
  getUserLightsource(p5) {
    // the mouse position is the default light source
    let light_source = {
      x: p5.mouseX,
      y: p5.mouseY
    };

    // if the device has an accelerometer, use it instead
    if (p5.rotationX || p5.rotationY) {
      let max_angle = 30;

      if (this.rotation_x_offset === null) this.rotation_x_offset = MathBook.clamp(p5.rotationX, 25, 45); // set offset, depending on initial device angle

      let rotation = {
        x: MathBook.clamp(p5.rotationY, max_angle * -1, max_angle),
        y: MathBook.clamp(p5.rotationX - this.rotation_x_offset, max_angle * -1, max_angle)
      }
      light_source = {
        x: document.documentElement.clientWidth * (0.5 + rotation.x * (0.5 / max_angle)),
        y: document.documentElement.clientHeight * (0.5 + rotation.y * (0.5 / max_angle))
      };
    }

    return light_source;
  }

  // calculate base size for animation
  calculateBaseSize(hide = false) {
    if (!hide) {
      this.base_size += settings.animations_speed;
    } else {
      this.base_size -= settings.animations_speed;
    }

    this.base_size = MathBook.clamp(this.base_size, 0, 1);

    return this;
  }
}

export default Animation;