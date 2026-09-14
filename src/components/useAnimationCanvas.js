'use client';

import { useCallback, useEffect, useRef } from 'react';
import settings from '@/animation_settings.json';
import MathBook from '@/classes/MathBook.js';

// Shared canvas, light source and transition logic for every p5 animation —
// the class based `Animation` component this replaces never removed its listeners.
export default function useAnimationCanvas() {
  const base_size = useRef(0); // for animation
  const rotation_x_offset = useRef(null); // for gyro animation
  const listeners = useRef([]);

  useEffect(() => () => {
    listeners.current.forEach(([type, handler, capture]) => {
      window.removeEventListener(type, handler, capture);
    });
    listeners.current = [];
  }, []);

  const addWindowListener = useCallback((type, handler, capture = false) => {
    window.addEventListener(type, handler, capture);
    listeners.current.push([type, handler, capture]);
  }, []);

  // canvas setup
  const createCanvas = useCallback((p5, canvasParentRef) => {
    p5.createCanvas(0, 0).parent(canvasParentRef);

    // resize canvas on window resize
    const resizeP5Canvas = () => {
      p5.resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
    };

    resizeP5Canvas();
    addWindowListener('resize', resizeP5Canvas, true);
  }, [addWindowListener]);

  // get user light source for animation
  const getUserLightsource = useCallback((p5) => {
    // the mouse position is the default light source
    let light_source = {
      x: p5.mouseX,
      y: p5.mouseY
    };

    // if the device has an accelerometer, use it instead
    if (p5.rotationX || p5.rotationY) {
      let max_angle = 30;

      // set offset, depending on initial device angle
      if (rotation_x_offset.current === null) {
        rotation_x_offset.current = MathBook.clamp(p5.rotationX, 25, 45);
      }

      // normalize device rotation
      let rotation = {
        x: MathBook.clamp(p5.rotationY, max_angle * -1, max_angle),
        y: MathBook.clamp(p5.rotationX - rotation_x_offset.current, max_angle * -1, max_angle)
      };

      // set gyro light source
      light_source = {
        x: document.documentElement.clientWidth * (0.5 + rotation.x * (0.5 / max_angle)),
        y: document.documentElement.clientHeight * (0.5 + rotation.y * (0.5 / max_angle))
      };
    }

    return light_source;
  }, []);

  // calculate base size for animation
  const calculateBaseSize = useCallback((hide = false) => {
    base_size.current += hide ? settings.animations_speed * -1 : settings.animations_speed;
    base_size.current = MathBook.clamp(base_size.current, 0, 1);

    return base_size.current;
  }, []);

  return { createCanvas, getUserLightsource, calculateBaseSize, addWindowListener };
}
