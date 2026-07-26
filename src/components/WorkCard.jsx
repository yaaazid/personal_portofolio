import styles from '@/styles/WorkCard.module.css';

export default function WorkCard({ work }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={work.image} alt={work.title} className={styles.image} />
        <span className={styles.badge}>Confirmed</span>
      </div>

      <div className={styles.meta}>
        <span>{work.exhibit}</span>
        <span>{work.category}</span>
      </div>

      <h3 className={styles.title}>{work.title}</h3>
      <p className={styles.description}>{work.description}</p>

      <div className={styles.techRow}>
        {work.tech.map((t) => (
          <span key={t} className={styles.techTag}>
            {t}
          </span>
        ))}
      </div>

      <a href={`/case-files/${work.slug}`} className={styles.link}>
        Open case file →
      </a>
    </article>
  );
}