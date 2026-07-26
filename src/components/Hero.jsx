import styles from '@/styles/Hero.module.css';

export default function Hero({
  eyebrow = 'Case No. 001 — Web & Mobile Developer',
  headline = 'Building web & mobile apps that just work',
  subtext = 'Full-stack developer working across Laravel, React/Next.js, and Flutter — turning ideas into shipped products.',
  portraitSrc = '/images/subject-portrait.jpg',
  primaryCta = { label: 'View my work', href: '#work' },
  secondaryCta = { label: 'Get in touch', href: '#contact' },
}) {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.textCol}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.subtext}>{subtext}</p>
        <div className={styles.ctaRow}>
          <a href={primaryCta.href} className={styles.ctaPrimary}>
            {primaryCta.label} →
          </a>
          <a href={secondaryCta.href} className={styles.ctaSecondary}>
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div className={styles.imageCol}>
        <img src={portraitSrc} alt="Portrait" className={styles.portrait} />
      </div>
    </section>
  );
}