'use client';

import { useEffect, useRef } from 'react';
import settings from '@/animation_settings.json';
import { content } from '@/lib/content';
import Sun from '@/classes/Sun.js';
import Starfield from '@/classes/Starfield.js';
import Planet from '@/classes/Planet.js';
import P5Canvas from './P5Canvas';
import useAnimationCanvas from './useAnimationCanvas';

export default function AnimationPlanetary({ show }) {
  const { createCanvas, getUserLightsource, calculateBaseSize } = useAnimationCanvas();
  const sun = useRef(null);
  const starfield = useRef(null);
  const planets = useRef([]);

  useEffect(() => {
    sun.current = new Sun('celestial-sun', settings.colors.secondary); // create sun
    starfield.current = new Starfield(settings.starfield.size, settings.starfield.speed, sun.current, settings.colors.secondary); // create starfield

    // create planets
    planets.current = content.map(folder => new Planet('planet-' + folder.id, sun.current));
  }, []);

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

    starfield.current.render(p5, base_size);
    sun.current.render(p5, base_size);

    // animate each planet
    planets.current.forEach(planet => planet.move(false).renderOrbit(p5, settings.colors.secondary, base_size));

    if (show) {
      let user_light_source = getUserLightsource(p5);
      planets.current.forEach(planet => planet.renderShadow(p5, settings.colors.active, base_size, user_light_source));
    }
    planets.current.forEach(planet => planet.renderShadow(p5, settings.colors.black, base_size, sun.current, 0.5));

    planets.current.forEach(planet => planet.renderBody(p5, settings.colors.active, base_size));
  };

  return (
    <div id="animation-planetary" className="animation">
      <P5Canvas setup={setup} draw={draw} />
    </div>
  );
}
