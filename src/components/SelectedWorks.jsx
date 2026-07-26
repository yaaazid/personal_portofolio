import { works } from '@/lib/constants';
import WorkCard from '@/components/WorkCard';
import styles from '@/styles/SelectedWorks.module.css';

export default function SelectedWorks() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Case Files 01 — 0{works.length}</span>
        <h2 className={styles.title}>Selected Works</h2>
      </div>

      <div className={styles.grid}>
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </section>
  );
}