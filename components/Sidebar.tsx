'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  VscAccount,
  VscSettings,
  VscMail,
  VscGithubAlt,
  VscCode,
  VscFiles,
  VscEdit,
} from 'react-icons/vsc';

import styles from '@/styles/Sidebar.module.css';

const top = [
  { Icon: VscFiles, path: '/', label: 'Explorer' },
  { Icon: VscGithubAlt, path: '/github', label: 'GitHub' },
  { Icon: VscCode, path: '/projects', label: 'Projects' },
  { Icon: VscEdit, path: '/articles', label: 'Articles' },
  { Icon: VscMail, path: '/contact', label: 'Contact' },
];

const bottom = [
  { Icon: VscAccount, path: '/about', label: 'About' },
  { Icon: VscSettings, path: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        {top.map(({ Icon, path, label }) => (
          <Link href={path} key={path} title={label} className={styles.link}>
            <div className={`${styles.item} ${pathname === path ? styles.active : ''}`}>
              {pathname === path && <span className={styles.activeLine} />}
              <Icon size={22} className={styles.icon} />
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.bottom}>
        {bottom.map(({ Icon, path, label }) => (
          <Link href={path} key={path} title={label} className={styles.link}>
            <div className={`${styles.item} ${pathname === path ? styles.active : ''}`}>
              {pathname === path && <span className={styles.activeLine} />}
              <Icon size={22} className={styles.icon} />
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
