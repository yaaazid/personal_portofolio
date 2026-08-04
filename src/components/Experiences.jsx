import { experiences } from '@/lib/constants';
import ExperienceCard from '@/components/ExperienceCard';
import styles from '@/styles/Experiences.module.css';

export default function Experiences() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>The Field Notes</span>
        <h2 className={styles.title}>Experience</h2>
      </div>

      <div className={styles.list}>
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}