'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { VscClose, VscPinned } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { useContextMenu } from '@/components/ide/ContextMenu';
import type { IDEFile } from '@/lib/ide/files';
import styles from '@/styles/Tab.module.css';

interface TabProps {
  file: IDEFile;
  isActive: boolean;
}

export default function Tab({ file, isActive }: TabProps) {
  const ide = useIDE();
  const pinned = ide.isPinned(file.path);
  const { open: openCtx, element: ctxEl } = useContextMenu();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => ide.openFile(file.path);

  const handleMouseDown = (e: React.MouseEvent) => {
    /* Middle-click closes */
    if (e.button === 1) {
      e.preventDefault();
      if (!pinned) ide.closeTab(file.path);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    openCtx(e, [
      { label: pinned ? 'Unpin Tab' : 'Pin Tab', icon: <VscPinned size={13} />, onSelect: () => ide.togglePin(file.path) },
      { type: 'separator' },
      { label: 'Close Tab', shortcut: 'Ctrl+W', disabled: pinned, onSelect: () => ide.closeTab(file.path) },
      { label: 'Close Others', onSelect: () => ide.closeOtherTabs(file.path) },
      { label: 'Close All', onSelect: ide.closeAllTabs },
      { type: 'separator' },
      { label: 'Reopen Closed Tabs', onSelect: ide.reopenDefaults },
    ]);
  };

  return (
    <>
      {ctxEl}
      <div
        className={`${styles.tab} ${isActive ? styles.active : ''} ${pinned ? styles.pinned : ''}`}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
        title={file.name}
        role="tab"
        aria-selected={isActive}
      >
        <Image src={file.icon} alt="" width={16} height={16} className={styles.fileIcon} />
        <span className={styles.name}>{file.name}</span>
        {pinned ? (
          <span className={styles.pinDot} title="Pinned" />
        ) : (
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={e => { e.stopPropagation(); ide.closeTab(file.path); }}
            aria-label={`Close ${file.name}`}
            title="Close"
          >
            <VscClose size={14} />
          </button>
        )}
        {isActive && <span className={styles.activeLine} />}
      </div>
    </>
  );
}
