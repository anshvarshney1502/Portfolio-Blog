'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { VscChevronRight, VscPinned } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { useContextMenu } from '@/components/ide/ContextMenu';
import { FOLDERS, filesInFolder, normalizePath, IDE_FILES, type IDEFile } from '@/lib/ide/files';
import styles from '@/styles/Explorer.module.css';

interface FileRowProps {
  file: IDEFile;
  isSelected: boolean;
  onFocusItem: () => void;
}

function FileRow({ file, isSelected, onFocusItem }: FileRowProps) {
  const ide = useIDE();
  const pinned = ide.isPinned(file.path);
  const { open: openCtx, element: ctxEl } = useContextMenu();

  return (
    <>
      {ctxEl}
      <button
        type="button"
        className={`${styles.file} ${isSelected ? styles.fileSelected : ''}`}
        onClick={() => {
          onFocusItem();
          ide.openFile(file.path);
        }}
        onMouseEnter={onFocusItem}
        onContextMenu={e =>
          openCtx(e, [
            { label: pinned ? 'Unpin' : 'Pin to Explorer', icon: <VscPinned size={13} />, onSelect: () => ide.togglePin(file.path) },
            { type: 'separator' },
            { label: 'Open', onSelect: () => ide.openFile(file.path) },
            { label: 'Copy Path', onSelect: () => ide.copyToClipboard(file.path, 'path') },
          ])
        }
        title={file.name}
      >
        <Image src={file.icon} alt="" width={16} height={16} className={styles.fileIcon} />
        <span className={styles.fileName}>{file.name}</span>
        {pinned && <VscPinned size={11} className={styles.pinIcon} />}
        {isSelected && <span className={styles.activeBar} />}
      </button>
    </>
  );
}

function Folder({
  id,
  label,
  selectedPath,
  setSelectedPath,
}: {
  id: 'portfolio' | 'blogs';
  label: string;
  selectedPath: string;
  setSelectedPath: (path: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const files = filesInFolder(id);

  return (
    <div className={styles.folder}>
      <button
        type="button"
        className={styles.folderHeader}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <VscChevronRight
          size={14}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        />
        <span className={styles.folderLabel}>{label}</span>
      </button>

      <div className={`${styles.folderContents} ${open ? styles.folderOpen : ''}`}>
        <div className={styles.folderInner}>
          {files.map(file => (
            <FileRow
              key={file.path}
              file={file}
              isSelected={file.path === selectedPath}
              onFocusItem={() => setSelectedPath(file.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Explorer() {
  const ide = useIDE();
  const pathname = usePathname();
  const activePath = normalizePath(pathname);
  const [selectedPath, setSelectedPath] = useState<string>(activePath);

  /* All navigable file paths in Explorer order */
  const allNavigableFiles = useMemo(() => {
    return IDE_FILES.map(f => f.path);
  }, []);

  /* Sync selectedPath when activePath changes via route navigation */
  useEffect(() => {
    setSelectedPath(activePath);
  }, [activePath]);

  /* Keyboard Navigation (ArrowUp, ArrowDown, Enter) */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as Element;
      const inInput = target.closest('input, textarea, [contenteditable]');
      if (inInput || ide.paletteOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currIndex = allNavigableFiles.indexOf(selectedPath);
        const nextIndex = currIndex < allNavigableFiles.length - 1 ? currIndex + 1 : 0;
        setSelectedPath(allNavigableFiles[nextIndex]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currIndex = allNavigableFiles.indexOf(selectedPath);
        const prevIndex = currIndex > 0 ? currIndex - 1 : allNavigableFiles.length - 1;
        setSelectedPath(allNavigableFiles[prevIndex]);
      } else if (e.key === 'Enter') {
        if (selectedPath) {
          e.preventDefault();
          ide.openFile(selectedPath);
        }
      }
    },
    [allNavigableFiles, selectedPath, ide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <aside className={styles.explorer}>
      <div className={styles.titleRow}>
        <span className={styles.title}>Explorer</span>
      </div>

      {FOLDERS.map(({ id, label }) => (
        <Folder
          key={id}
          id={id}
          label={label}
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}
        />
      ))}
    </aside>
  );
}
