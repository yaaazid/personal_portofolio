import { education } from '@/lib/constants';
import styles from '@/styles/EducationHistory.module.css';

export default function EducationHistory() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>The Record</span>
        <h2 className={styles.title}>Education History</h2>
      </div>

      <div className={styles.timeline}>
        {education.map((item) => (
          <div key={item.id} className={styles.item}>
            <span className={styles.marker} />
            <span className={styles.period}>{item.period}</span>
            <h3 className={styles.institution}>{item.institution}</h3>
            <span className={styles.degree}>{item.degree}</span>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}