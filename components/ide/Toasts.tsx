'use client';

import { VscCheck, VscClose, VscInfo, VscWarning } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import styles from '@/styles/Toasts.module.css';

const ICONS = {
  info: <VscInfo size={15} />,
  success: <VscCheck size={15} />,
  error: <VscWarning size={15} />,
};

export default function Toasts() {
  const { toasts, dismissToast } = useIDE();

  if (!toasts.length) return null;

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`}>
          <span className={styles.icon}>{ICONS[toast.tone]}</span>
          <div className={styles.body}>
            <p className={styles.message}>{toast.message}</p>
            {toast.detail && <p className={styles.detail}>{toast.detail}</p>}
          </div>
          <button
            className={styles.dismiss}
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <VscClose size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
