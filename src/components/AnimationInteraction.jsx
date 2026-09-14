'use client';

import settings from '@/animation_settings.json';
import MathBook from '@/classes/MathBook.js';
import Easing from '@/classes/Easing.js';
import P5Canvas from './P5Canvas';
import useAnimationCanvas from './useAnimationCanvas';

export default function AnimationInteraction() {
  const { createCanvas, getUserLightsource } = useAnimationCanvas();

  // p5.setup
  const setup = (p5, canvasParentRef) => {
    createCanvas(p5, canvasParentRef);
  };

  // p5.draw
  const draw = (p5) => {
    let { user_interaction: setup } = settings;

    let light_source = getUserLightsource(p5);
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

  return (
    <div id="animation-interaction" className="animation">
      <P5Canvas setup={setup} draw={draw} />
    </div>
  );
}
