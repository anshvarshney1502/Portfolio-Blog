'use client';

import { useEffect, useRef } from 'react';

import styles from '@/styles/Spotlight.module.css';

/**
 * A very soft pool of accent light that follows the pointer behind the editor.
 *
 * The point is depth, not decoration — it gives the flat background a sense of
 * being lit from somewhere, which is most of what separates a desktop app
 * surface from a web page div. It is deliberately barely visible.
 *
 * Position is written straight to CSS custom properties inside a rAF, so the
 * effect never triggers a React render and never runs more than once a frame.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Pointer light on a touchscreen would just be a stuck blob.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--spot-x', `${x}px`);
      el.style.setProperty('--spot-y', `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      el.style.setProperty('--spot-opacity', '0');
    };
    const onEnter = () => {
      el.style.setProperty('--spot-opacity', '1');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />;
}
