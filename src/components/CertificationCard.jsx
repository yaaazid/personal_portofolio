'use client';

import { useRef, useState, useEffect } from 'react';
import styles from '@/styles/CertificationCard.module.css';

const RADIUS = 12;
const DOT_COUNT = 3;

function buildBorderPath(w, h, r) {
  return `M ${r} 0 L ${w - r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0 Z`;
}

export default function CertificationCard({ certificate, onClick }) {
  const cardRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    const measure = () => {
      if (cardRef.current) {
        setSize({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const pathD =
    size.width > 0 && size.height > 0
      ? buildBorderPath(size.width, size.height, RADIUS)
      : '';

  return (
    <button ref={cardRef} onClick={onClick} className={styles.card}>
      {pathD && (
        <svg
          className={styles.frameSvg}
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <path pathLength="1" className={styles.borderPath} d={pathD} />
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <path
              key={i}
              pathLength="1"
              className={styles.glowPath}
              d={pathD}
              style={{ animationDelay: `${-(i * (4.5 / DOT_COUNT))}s` }}
            />
          ))}
        </svg>
      )}

      <span className={styles.badge}>
        <span className={styles.badgeDot} />
        View
      </span>

      <span className={styles.issuer}>{certificate.issuer}</span>
      <span className={styles.name}>{certificate.name}</span>
      <span className={styles.date}>
        {certificate.issuedDate} - {certificate.validUntil}
      </span>
    </button>
  );
}