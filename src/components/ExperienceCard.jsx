import styles from '@/styles/ExperienceCard.module.css';

export default function ExperienceCard({ experience }) {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <h3 className={styles.role}>{experience.role}</h3>
        <span className={styles.period}>{experience.period}</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.company}>{experience.company}</span>
        <span className={styles.dot} />
        <span>{experience.location}</span>
      </div>

      <p className={styles.description}>{experience.description}</p>
    </div>
  );
}