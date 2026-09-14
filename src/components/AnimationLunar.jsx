'use client';

import { useEffect, useRef } from 'react';
import settings from '@/animation_settings.json';
import Celestial from '@/classes/Celestial.js';
import Starfield from '@/classes/Starfield.js';
import P5Canvas from './P5Canvas';
import useAnimationCanvas from './useAnimationCanvas';

export default function AnimationLunar({ id, show }) {
  const { createCanvas, calculateBaseSize } = useAnimationCanvas();
  const sun = useRef(null);
  const starfield = useRef(null);

  useEffect(() => {
    sun.current = new Celestial('celestial-moon', settings.colors.light, document.getElementById('planet-' + id + '-planet')); // create Moon (sun)
    starfield.current = new Starfield(settings.starfield.size, settings.starfield.speed, sun.current, settings.colors.secondary, settings.starfield.count * 0.25, false); // create starfield
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sun.current?.setOriginElement(document.getElementById('planet-' + id + '-planet'));
  }, [id]);

  // p5.setup
  const setup = (p5, canvasParentRef) => {
    createCanvas(p5, canvasParentRef);
  };

  // p5.draw
  const draw = (p5) => {
    if (!starfield.current) return null;

    p5.clear();
    let base_size = calculateBaseSize(!show);
    if (!base_size) return null;

    starfield.current.setAngle(p5, 60).render(p5, base_size);
    sun.current.render(p5, base_size, true);
  };

  return (
    <div id="animation-lunar" className="animation">
      <P5Canvas setup={setup} draw={draw} />
    </div>
  );
}
