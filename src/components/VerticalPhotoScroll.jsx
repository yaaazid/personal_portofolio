import { works } from '@/lib/constants';
import styles from '@/styles/VerticalPhotoScroll.module.css';

const LABELS = ['Web Development', 'Mobile Apps', 'UI Systems', 'Client Work'];

export default function VerticalPhotoScroll() {
  const photos = works.map((w) => w.image);
  const loopPhotos = [...photos, ...photos];

  return (
    <section className={styles.section}>
      <div className={styles.labels}>
        {LABELS.map((label) => (
          <span key={label} className={styles.label}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.photoColumnWrap}>
        <div className={styles.fadeTop} />
        <div className={styles.fadeBottom} />

        <div className={styles.photoTrack}>
          {loopPhotos.map((src, i) => (
            <img key={i} src={src} alt="" className={styles.photo} />
          ))}
        </div>
      </div>
    </section>
  );
}