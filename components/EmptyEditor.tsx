'use client';

import Image from 'next/image';
import { useIDE } from '@/components/ide/IDEProvider';
import styles from '@/styles/EmptyEditor.module.css';

export default function EmptyEditor() {
  const ide = useIDE();

  return (
    <div className={styles.emptyContainer}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logos/vscode_icon.svg"
          alt="Visual Studio Code"
          width={180}
          height={180}
          priority
        />
      </div>

      <div className={styles.shortcutsList}>
        <div className={styles.shortcutRow}>
          <span className={styles.shortcutLabel}>Show All Commands</span>
          <span className={styles.keyCombo}>
            <kbd className={styles.key}>Ctrl</kbd>
            <kbd className={styles.key}>Shift</kbd>
            <kbd className={styles.key}>P</kbd>
          </span>
        </div>

        <div className={styles.shortcutRow}>
          <span className={styles.shortcutLabel}>Go to File</span>
          <span className={styles.keyCombo}>
            <kbd className={styles.key}>Ctrl</kbd>
            <kbd className={styles.key}>P</kbd>
          </span>
        </div>

        <div className={styles.shortcutRow}>
          <span className={styles.shortcutLabel}>Toggle Terminal</span>
          <span className={styles.keyCombo}>
            <kbd className={styles.key}>Ctrl</kbd>
            <kbd className={styles.key}>`</kbd>
          </span>
        </div>

        <div className={styles.shortcutRow}>
          <span className={styles.shortcutLabel}>Toggle Explorer</span>
          <span className={styles.keyCombo}>
            <kbd className={styles.key}>Ctrl</kbd>
            <kbd className={styles.key}>B</kbd>
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.reopenBtn}
        onClick={ide.reopenDefaults}
      >
        Restore Open Tabs
      </button>
    </div>
  );
}
