'use client';

import { useEffect, useRef } from 'react';
import settings from '@/animation_settings.json';
import Celestial from '@/classes/Celestial.js';
import Moon from '@/classes/Moon.js';
import Starfield from '@/classes/Starfield.js';
import P5Canvas from './P5Canvas';
import useAnimationCanvas from './useAnimationCanvas';

export default function AnimationSatellites({ id, content, show, move_sun }) {
  const { createCanvas, getUserLightsource, calculateBaseSize } = useAnimationCanvas();
  const sun = useRef(null);
  const starfield = useRef(null);
  const moons = useRef([]);

  useEffect(() => {
    sun.current = new Celestial('celestial-planet', settings.colors.active, document.getElementById('planet-' + id + '-planet')); // create Moon (sun)
    starfield.current = new Starfield(settings.starfield.size, settings.starfield.speed, sun.current, settings.colors.secondary, settings.starfield.count * 0.25, false); // create starfield
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create moons (Moons)
  useEffect(() => {
    moons.current = content.files.map(file => new Moon('planet-' + file.id, sun.current));
  }, [content.files]);

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

    starfield.current.setAngle(p5, 45).render(p5, base_size);
    sun.current.render(p5, base_size, move_sun);

    // animate each Moon
    moons.current.forEach(moon => moon.move(false).renderOrbit(p5, settings.colors.active, base_size));

    // the CRA version guarded this with a `content_open` prop that was never passed
    let user_light_source = getUserLightsource(p5);
    moons.current.forEach(moon => moon.renderShadow(p5, settings.colors.light, base_size, user_light_source));

    moons.current.forEach(moon => moon.renderShadow(p5, settings.colors.black, base_size, sun.current, 0.5));

    moons.current.forEach(moon => moon.renderBody(p5, settings.colors.light, base_size, sun.current));
  };

  return (
    <div id="animation-satellites" className="animation">
      <P5Canvas setup={setup} draw={draw} />
    </div>
  );
}
