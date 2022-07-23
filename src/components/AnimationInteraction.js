import React from 'react';
import Sketch from "react-p5";
import settings from "../animation_settings.json";
import Animation from "./Animation.js";
import MathBook from "../classes/MathBook.js";
import Easing from "../classes/Easing.js";

class AnimationInteraction extends Animation {
  // state
  constructor(props) {
    super(props);
    this.state = {};
  }

  // p5.setup
  setup = (p5, canvasParentRef) => {
    this.createCanvas(p5, canvasParentRef);
  };

  // p5.draw
  draw = (p5) => {
    let { user_interaction: setup } = settings;

    let light_source = this.getUserLightsource(p5);
    let count = Math.floor(setup.radius * 2 / setup.density);

    p5.clear();
    p5.noStroke();
    p5.fill(settings.colors.active);

    // create dot-pattern
    for (let row = 0; row < count; row++) {
      let y = Math.round((row * setup.density + light_source.y - setup.radius) / setup.density) * setup.density;
      let offset = ((y / setup.density) % 2) ? setup.density * 0.5 : 0;

      for (let column = 0; column < count; column++) {
        let x = Math.round((column * setup.density + light_source.x - setup.radius) / setup.density) * setup.density;
        let distance = MathBook.clamp(MathBook.getDistance(light_source.x, light_source.y, x, y), 0, setup.radius);
        let size_factor = Easing.easeInQuad((setup.radius - distance) * 0.01);

        p5.ellipse(x + offset, y, setup.size * size_factor);
      }
    }
  };

  render() {
    return (
      <div id="animation-interaction" className="animation">
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AnimationInteraction;