'use client';

import { useEffect, useRef } from 'react';

// Turbopack's minifier corrupts p5 ("Identifier 'h' has already been declared"),
// so the library is served from /public and loaded as a plain script instead.
const P5_SRC = '/vendor/p5.min.js';

function loadP5() {
  if (window.p5) return Promise.resolve(window.p5);

  let script = document.querySelector(`script[src="${P5_SRC}"]`);
  if (!script) {
    script = document.createElement('script');
    script.src = P5_SRC;
    document.head.appendChild(script);
  }

  return new Promise((resolve, reject) => {
    script.addEventListener('load', () => resolve(window.p5), { once: true });
    script.addEventListener('error', reject, { once: true });
  });
}

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
      const p5 = await loadP5();
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
