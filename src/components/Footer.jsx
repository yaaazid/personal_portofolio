import { Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/constants';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Case Closed — Get in touch</span>
        <h2 className={styles.title}>Have a project in mind?</h2>
        <p className={styles.text}>
          Open to freelance work, collaborations, and full-time opportunities. The fastest way to
          reach me is by email.
        </p>

        <div className={styles.actions}>
          <a href={`mailto:${profile.email}`} className={styles.primary}>
            <Mail size={16} aria-hidden="true" />
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={profile.resume} download className={styles.secondary}>
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className={styles.copy}>
        © {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
