'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiReact,
  SiNodedotjs,
  SiFlutter,
} from 'react-icons/si';
import { techStack } from '@/lib/constants';
import styles from '@/styles/TechStackTable.module.css';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  html5: SiHtml5,
  css3: SiCss,
  bootstrap: SiBootstrap,
  tailwindcss: SiTailwindcss,
  javascript: SiJavascript,
  php: SiPhp,
  laravel: SiLaravel,
  react: SiReact,
  nodedotjs: SiNodedotjs,
  flutter: SiFlutter,
};

const BADGE_CLASS = {
  'Primary Tool': 'badgePrimary',
  Comfortable: 'badgeComfortable',
};

export default function TechStackTable() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowRefs.current.filter(Boolean);

      gsap.set(rows, {
        opacity: 0,
        y: 60,
        scale: 0.85,
        filter: 'blur(8px)',
      });

      rows.forEach((row, i) => {
        gsap.to(row, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.04,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Lab Report</span>
        <h2 className={styles.title}>The Lab Report</h2>
      </div>

      <div className={styles.beamBorder}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Substance</th>
                <th>Code</th>
                <th>Detected</th>
                <th>Finding</th>
              </tr>
            </thead>
            <tbody>
              {techStack.map((row, i) => {
                const Icon = ICONS[row.icon];
                const badgeClass = styles[BADGE_CLASS[row.finding]] || styles.badgeComfortable;

                return (
                  <tr key={row.substance} ref={(el) => (rowRefs.current[i] = el)}>
                    <td>
                      <span className={styles.substanceCell}>
                        {Icon && <Icon className={styles.icon} />}
                        {row.substance}
                      </span>
                    </td>
                    <td>{row.code}</td>
                    <td className={styles.detectedCell}>{row.detected}</td>
                    <td>
                      <span className={badgeClass}>{row.finding}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className={styles.caption}>
        Findings are illustrative — what he reaches for day to day, not a ranking.
      </p>
    </section>
  );
}