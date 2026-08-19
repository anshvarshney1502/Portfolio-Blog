'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { VscChevronRight, VscPinned, VscHistory } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { useContextMenu } from '@/components/ide/ContextMenu';
import { FOLDERS, filesInFolder, getFile, normalizePath, type IDEFile } from '@/lib/ide/files';
import styles from '@/styles/Explorer.module.css';

function FileRow({ file, isActive }: { file: IDEFile; isActive: boolean }) {
  const ide = useIDE();
  const pinned = ide.isPinned(file.path);
  const { open: openCtx, element: ctxEl } = useContextMenu();

  return (
    <>
      {ctxEl}
      <button
        type="button"
        className={`${styles.file} ${isActive ? styles.fileActive : ''}`}
        onClick={() => ide.openFile(file.path)}
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
        {isActive && <span className={styles.activeBar} />}
      </button>
    </>
  );
}

function Folder({ id, label }: { id: 'portfolio' | 'blogs'; label: string }) {
  const pathname = usePathname();
  const activePath = normalizePath(pathname);
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

      {/* grid-rows animation — 0fr → 1fr on open */}
      <div className={`${styles.folderContents} ${open ? styles.folderOpen : ''}`}>
        <div className={styles.folderInner}>
          {files.map(file => (
            <FileRow key={file.path} file={file} isActive={file.path === activePath} />
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

  /* Recent files section */
  const recentFiles = ide.recent
    .slice(0, 4)
    .map(p => getFile(p))
    .filter((f): f is IDEFile => !!f);

  return (
    <aside className={styles.explorer}>
      <div className={styles.titleRow}>
        <span className={styles.title}>Explorer</span>
      </div>

      {FOLDERS.map(({ id, label }) => (
        <Folder key={id} id={id} label={label} />
      ))}

      {recentFiles.length > 1 && (
        <div className={styles.folder}>
          <div className={styles.folderHeader} style={{ cursor: 'default' }}>
            <VscHistory size={13} className={styles.recentIcon} />
            <span className={styles.folderLabel}>Recent</span>
          </div>
          <div className={`${styles.folderContents} ${styles.folderOpen}`}>
            <div className={styles.folderInner}>
              {recentFiles.map(file => (
                <FileRow key={file.path} file={file} isActive={file.path === activePath} />
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
