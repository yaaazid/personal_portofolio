'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { works } from '@/lib/constants';
import styles from '@/styles/SuccessCarousel.module.css';

export default function SuccessCarousel() {
  const [index, setIndex] = useState(0);
  const total = works.length;
  const current = works[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  if (!current) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Their Success, His Craft</span>
        <h2 className={styles.title}>Case Highlights</h2>
      </div>

      <div className={styles.controlsRow}>
        <span className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <div className={styles.navButtons}>
          <button onClick={prev} aria-label="Sebelumnya" className={styles.navButton}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} aria-label="Berikutnya" className={styles.navButton}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className={styles.slide}>
        <div className={styles.imageWrap}>
          <img src={current.image} alt={current.title} className={styles.image} />
        </div>

        <div>
          <h3 className={styles.slideTitle}>{current.title}</h3>
          <p className={styles.slideDescription}>{current.description}</p>

          <div className={styles.metaRow}>
            <span>
              <span className={styles.metaLabel}>Category</span>
              {current.category}
            </span>
            <span>
              <span className={styles.metaLabel}>Stack</span>
              {current.tech.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}