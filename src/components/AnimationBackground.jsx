'use client';

import { useRef } from 'react';
import settings from '@/animation_settings.json';
import Pattern from '@/classes/Pattern.js';
import P5Canvas from './P5Canvas';
import useAnimationCanvas from './useAnimationCanvas';

export default function AnimationBackground() {
  const { createCanvas, addWindowListener } = useAnimationCanvas();
  const pattern = useRef(new Pattern(settings.colors.black));

  // p5.draw
  const draw = (p5) => {
    pattern.current.render(p5);
  };

  // p5.setup
  const setup = (p5, canvasParentRef) => {
    createCanvas(p5, canvasParentRef);

    p5.noLoop();

    // kept as-is from the CRA version: the handler receives the resize event
    // instead of the p5 instance, so the redraw is a no-op. Changing that would
    // make the background pattern repaint on resize, which it never did.
    addWindowListener('resize', draw, true);
  };

  return (
    <div id="animation-background" className="animation">
      <P5Canvas setup={setup} draw={draw} />
    </div>
  );
}
