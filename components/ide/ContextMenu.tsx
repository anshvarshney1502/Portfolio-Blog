'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import MenuPanel, { type MenuItem } from '@/components/ide/MenuPanel';

interface ContextMenuState {
  x: number;
  y: number;
  items: MenuItem[];
}

/**
 * Right-click menu anchored to the cursor.
 *
 * Returns an `open` handler to attach to onContextMenu and the element to
 * render. The menu portals to <body> so it is never clipped by the scrolling
 * panel it was triggered from — which is what happens if you render it inline
 * inside the explorer or the tab strip.
 */
export function useContextMenu() {
  const [state, setState] = useState<ContextMenuState | null>(null);

  const open = useCallback((e: React.MouseEvent, items: MenuItem[]) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ x: e.clientX, y: e.clientY, items });
  }, []);

  const close = useCallback(() => setState(null), []);

  const element = state ? (
    <ContextMenuPortal x={state.x} y={state.y} items={state.items} onClose={close} />
  ) : null;

  return { open, close, element, isOpen: state !== null };
}

function ContextMenuPortal({
  x,
  y,
  items,
  onClose,
}: ContextMenuState & { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: x, top: y });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Measure after paint and flip toward the viewport if the menu would spill
  // off the right or bottom edge.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const margin = 8;
    let left = x;
    let top = y;

    if (x + rect.width + margin > window.innerWidth) {
      left = Math.max(margin, x - rect.width);
    }
    if (y + rect.height + margin > window.innerHeight) {
      top = Math.max(margin, y - rect.height);
    }
    setPos({ left, top });
  }, [x, y]);

  useEffect(() => {
    const dismiss = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      onClose();
    };
    // `capture` so the menu closes before the click lands on whatever is
    // underneath it.
    window.addEventListener('mousedown', dismiss, true);
    window.addEventListener('resize', onClose);
    window.addEventListener('blur', onClose);
    return () => {
      window.removeEventListener('mousedown', dismiss, true);
      window.removeEventListener('resize', onClose);
      window.removeEventListener('blur', onClose);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        zIndex: 'var(--z-contextmenu)' as unknown as number,
      }}
    >
      <MenuPanel items={items} onClose={onClose} style={{ position: 'static' }} />
    </div>,
    document.body
  );
}
