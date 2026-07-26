'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Mail, ArrowUpRight } from 'lucide-react';
import styles from '@/styles/Navbar.module.css';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function GithubIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navbar({
  name = 'Nama Kamu',
  avatarSrc = '/images/subject-portrait.jpg',
  githubUrl = 'https://github.com/username',
  email = 'email@kamu.com',
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#top" className={styles.profile}>
        <img src={avatarSrc} alt={name} className={styles.avatar} />
        <span className={styles.name}>{name}.</span>
      </a>

      <nav className={styles.links}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}

        <a href="/cv-nama-kamu.pdf" download className={styles.link}>
          Resume <ArrowUpRight size={13} style={{ display: 'inline' }} />
        </a>
      </nav>

      <div className={styles.social}>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={styles.socialIcon}
        >
          <GithubIcon size={18} />
        </a>

        <a href={`mailto:${email}`} aria-label="Email" className={styles.socialIcon}>
          <Mail size={18} />
        </a>
      </div>

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className={styles.mobileSocial}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={20} color="#f4f1ea" />
            </a>

            <a href={`mailto:${email}`} aria-label="Email">
              <Mail size={20} color="#f4f1ea" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}