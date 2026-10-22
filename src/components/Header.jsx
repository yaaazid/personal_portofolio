'use client';

import { useSyncExternalStore } from 'react';
import styles from '@/styles/Header.module.css';

const subscribe = () => () => {};

// Tanggal dihitung di browser (bukan saat build), jadi selalu sesuai hari pengunjung.
const getDate = () =>
  new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
const getServerDate = () => '';

export default function Header({ city = 'Cikarang, ID' }) {
  const dateStr = useSyncExternalStore(subscribe, getDate, getServerDate);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <span className={styles.item}>{city}</span>
        <span className={styles.item}>{dateStr}</span>
      </div>
      <span className={styles.edition}>Edisi No. 001</span>
    </div>
  );
}
