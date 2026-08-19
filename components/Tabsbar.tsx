'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useIDE } from '@/components/ide/IDEProvider';
import { getFile, normalizePath } from '@/lib/ide/files';
import Tab from '@/components/Tab';
import styles from '@/styles/Tabsbar.module.css';

export default function Tabsbar() {
  const ide = useIDE();
  const pathname = usePathname();
  const activePath = normalizePath(pathname);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Scroll the active tab into view on navigation */
  const handleRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    scrollRef.current = el;
  };

  return (
    <div className={styles.bar} role="tablist" aria-label="Open files">
      <div className={styles.tabs} ref={handleRef}>
        {ide.tabs.map(path => {
          const file = getFile(path);
          if (!file) return null;
          return (
            <Tab
              key={path}
              file={file}
              isActive={path === activePath}
            />
          );
        })}
      </div>
    </div>
  );
}
