'use client';

import { useEffect, useRef, useState } from 'react';
import { VscCheck, VscChevronRight } from 'react-icons/vsc';

import styles from '@/styles/Menu.module.css';

/*
 * The floating list used by both the title bar menus and right-click menus.
 *
 * Keeping one implementation means keyboard navigation, hover-to-focus and the
 * open animation behave identically wherever a menu appears — which is most of
 * what makes a menu feel native rather than like a styled <ul>.
 */

export interface MenuItem {
  type?: 'item' | 'separator' | 'header';
  label?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  submenu?: MenuItem[];
  onSelect?: () => void;
}

interface MenuPanelProps {
  items: MenuItem[];
  onClose: () => void;
  className?: string;
  /** Rendered inline (title bar) vs. positioned by a parent (context menu). */
  style?: React.CSSProperties;
}

const isSelectable = (item: MenuItem) =>
  item.type !== 'separator' && item.type !== 'header' && !item.disabled;

export default function MenuPanel({ items, onClose, className, style }: MenuPanelProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectableIndices = items
    .map((item, i) => (isSelectable(item) ? i : -1))
    .filter((i) => i !== -1);

  const run = (item: MenuItem) => {
    if (!isSelectable(item)) return;
    if (item.submenu) return;
    item.onSelect?.();
    onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const dir = e.key === 'ArrowDown' ? 1 : -1;
        const current = selectableIndices.indexOf(activeIndex);
        const next =
          current === -1
            ? selectableIndices[dir === 1 ? 0 : selectableIndices.length - 1]
            : selectableIndices[
                (current + dir + selectableIndices.length) % selectableIndices.length
              ];
        setActiveIndex(next);
        setOpenSubmenu(null);
        return;
      }

      if (e.key === 'ArrowRight' && activeIndex >= 0 && items[activeIndex]?.submenu) {
        e.preventDefault();
        setOpenSubmenu(activeIndex);
        return;
      }

      if (e.key === 'ArrowLeft' && openSubmenu !== null) {
        e.preventDefault();
        setOpenSubmenu(null);
        return;
      }

      if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const item = items[activeIndex];
        if (item.submenu) setOpenSubmenu(activeIndex);
        else run(item);
      }
    };

    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  });

  return (
    <div
      ref={panelRef}
      className={`${styles.panel} ${className ?? ''}`}
      style={style}
      role="menu"
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={`sep-${index}`} className={styles.separator} role="separator" />;
        }

        if (item.type === 'header') {
          return (
            <div key={`head-${index}`} className={styles.header}>
              {item.label}
            </div>
          );
        }

        const active = activeIndex === index;

        return (
          <div key={item.label ?? index} className={styles.itemWrap}>
            <button
              type="button"
              role="menuitem"
              className={`${styles.item} ${active ? styles.active : ''} ${
                item.disabled ? styles.disabled : ''
              }`}
              disabled={item.disabled}
              onMouseEnter={() => {
                setActiveIndex(index);
                setOpenSubmenu(item.submenu ? index : null);
              }}
              onClick={() => {
                if (item.submenu) setOpenSubmenu(openSubmenu === index ? null : index);
                else run(item);
              }}
            >
              <span className={styles.check}>
                {item.checked ? <VscCheck size={13} /> : item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
              {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
              {item.submenu && <VscChevronRight size={13} className={styles.submenuArrow} />}
            </button>

            {item.submenu && openSubmenu === index && (
              <MenuPanel
                items={item.submenu}
                onClose={onClose}
                className={styles.submenu}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
