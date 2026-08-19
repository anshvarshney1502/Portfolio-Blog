import { Metadata } from 'next';
import styles from '@/styles/HomePage.module.css';

export const metadata: Metadata = {
  title: "Coders' High Python",
};

export default function CodersHighPythonPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.intro} style={{ alignItems: 'center', textAlign: 'center', minHeight: '300px', justifyContent: 'center' }}>
            <h1 className={styles.name} style={{ fontSize: '24px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)' }}>
              nothing updated here
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
