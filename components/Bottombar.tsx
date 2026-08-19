'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  VscBell,
  VscCheck,
  VscError,
  VscWarning,
  VscSourceControl,
  VscTerminal,
  VscSync,
} from 'react-icons/vsc';
import { SiNextdotjs } from 'react-icons/si';

import { useIDE } from '@/components/ide/IDEProvider';
import { getFile, normalizePath } from '@/lib/ide/files';
import { PROFILE } from '@/lib/ide/profile';
import styles from '@/styles/Bottombar.module.css';

export default function Bottombar() {
  const ide = useIDE();
  const pathname = usePathname();
  const activePath = normalizePath(pathname);
  const file = getFile(activePath);

  const [time, setTime] = useState('');
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  return (
    <footer className={styles.bottomBar}>
      {/* Left group */}
      <div className={styles.group}>
        <a
          href={PROFILE.repo}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
          title="View source on GitHub"
        >
          <VscSourceControl size={13} className={styles.icon} />
          <span>main</span>
        </a>

        <div className={styles.section} title="0 errors, 0 warnings">
          <VscError size={13} className={styles.icon} />
          <span>0</span>
          <VscWarning size={13} className={`${styles.icon} ${styles.ml}`} />
          <span>0</span>
        </div>
      </div>

      {/* Right group */}
      <div className={styles.group}>
        {file && (
          <div className={styles.section} title="Current file language">
            <span>{file.language}</span>
          </div>
        )}

        <div className={styles.section} title="Online status">
          <VscSync size={13} className={`${styles.icon} ${online ? styles.online : styles.offline}`} />
          <span>{online ? 'Online' : 'Offline'}</span>
        </div>

        {time && (
          <div className={styles.section} title="Local time">
            <span>{time}</span>
          </div>
        )}

        <div
          className={`${styles.section} ${ide.terminalOpen ? styles.active : ''}`}
          onClick={ide.toggleTerminal}
          title="Toggle Terminal (Ctrl+`)"
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && ide.toggleTerminal()}
        >
          <VscTerminal size={13} className={styles.icon} />
        </div>

        <div className={styles.section} title={`v${PROFILE.version} — Powered by Next.js`}>
          <SiNextdotjs size={13} className={styles.icon} />
          <span>Next.js</span>
        </div>

        <div className={styles.section}>
          <VscCheck size={13} className={styles.icon} />
          <span>Prettier</span>
        </div>

        <div
          className={styles.section}
          onClick={() => ide.notify('No new notifications')}
          title="Notifications"
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && ide.notify('No new notifications')}
        >
          <VscBell size={13} />
        </div>
      </div>
    </footer>
  );
}
