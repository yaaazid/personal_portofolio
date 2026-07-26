'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/Header.module.css';

export default function Header({ city = 'Cikarang, ID' }) {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setDateStr(formatted);
  }, []);

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