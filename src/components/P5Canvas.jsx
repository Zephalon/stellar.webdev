'use client';

import { useEffect, useRef } from 'react';

// Stand-in for react-p5, which is unmaintained and does not accept React 19.
// Keeps the same contract: setup(p5, canvasParentRef) and draw(p5).
export default function P5Canvas({ setup, draw }) {
  const container = useRef(null);
  const sketch = useRef({ setup, draw });

  // p5 keeps calling the callbacks it got on setup, so they need refreshing
  useEffect(() => {
    sketch.current = { setup, draw };
  });

  useEffect(() => {
    let instance = null;
    let cancelled = false;

    (async () => {
      // p5 reads `window` on import, so it may only be loaded in the browser
      const { default: p5 } = await import('p5');
      if (cancelled) return;

      instance = new p5((p) => {
        p.setup = () => sketch.current.setup(p, container.current);
        p.draw = () => sketch.current.draw(p);
      }, container.current);
    })();

    return () => {
      cancelled = true;
      instance?.remove();
    };
  }, []);

  return <div ref={container}></div>;
}
