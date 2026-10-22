'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  SiLaravel,
  SiBootstrap,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFlutter,
  SiFirebase,
} from 'react-icons/si';
import { ArrowUpRight, Box } from 'lucide-react';
import { works } from '@/lib/constants';
import styles from '@/styles/SelectedWorks.module.css';

// Icon + real brand color per technology. Unlisted tech falls back to a generic icon.
const TECH_MAP = {
  Laravel: { Icon: SiLaravel, color: '#FF2D20' },
  Bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  'Next.js': { Icon: SiNextdotjs, color: '#ffffff' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38BDF8' },
  Flutter: { Icon: SiFlutter, color: '#02569B' },
  Firebase: { Icon: SiFirebase, color: '#FFCA28' },
  GetX: { Icon: Box, color: '#8B5CF6' },
  'ML Kit': { Icon: Box, color: '#34A853' },
};

export default function SelectedWorks() {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const activeWork = works.find((w) => w.slug === hovered);

  return (
    <section id="work" className={styles.section} onMouseMove={handleMouseMove}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          Case Files 01 — {String(works.length).padStart(2, '0')}
        </span>
        <h2 className={styles.title}>Selected Works</h2>
      </div>

      <div className={styles.list}>
        {works.map((work) => (
          <Link
            key={work.slug}
            href={`/case-files/${work.slug}`}
            className={styles.row}
            onMouseEnter={() => setHovered(work.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.rowLeft}>
              <span className={styles.exhibit}>{work.exhibit}</span>
              <span className={styles.rowTitle}>{work.title}</span>
            </span>

            <span className={styles.rowRight}>
              <span className={styles.category}>{work.category}</span>

              <span className={styles.techIcons}>
                {work.tech.map((techName) => {
                  const entry = TECH_MAP[techName];
                  const Icon = entry?.Icon || Box;
                  const color = entry?.color || '#f4f1ea';
                  return (
                    <Icon
                      key={techName}
                      size={24}
                      className={styles.techIcon}
                      style={{ '--brand-color': color }}
                      title={techName}
                    />
                  );
                })}
              </span>

              <ArrowUpRight size={18} className={styles.arrow} />
            </span>
          </Link>
        ))}
      </div>

      <div
        className={`${styles.preview} ${activeWork ? styles.previewVisible : ''}`}
        style={
          activeWork
            ? { transform: `translate(${pos.x + 24}px, ${pos.y - 130}px) rotate(-4deg)` }
            : undefined
        }
      >
        {activeWork && (
          <>
            {activeWork.image ? (
              <img src={activeWork.image} alt={activeWork.title} className={styles.previewImage} />
            ) : (
              <span className={styles.previewPlaceholder}>{activeWork.title}</span>
            )}
            <span className={styles.previewBadge}>View</span>
          </>
        )}
      </div>
    </section>
  );
}