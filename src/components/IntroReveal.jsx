'use client';

import { useState, useRef, useCallback, useEffect, useSyncExternalStore } from 'react';
import styles from '@/styles/IntroReveal.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

export default function IntroReveal({ onComplete, subjectSrc = '/images/subject-portrait.jpg' }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const updatePos = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleMouseMove = (e) => updatePos(e.clientX, e.clientY);
  const handleTouchMove = (e) => {
    const t = e.touches[0];
    if (t) updatePos(t.clientX, t.clientY);
  };

  const handleFound = () => {
    if (found) return;
    setFound(true);
    timeoutRef.current = setTimeout(() => onComplete?.(), 900);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={styles.container}
      style={{ '--x': `${pos.x}%`, '--y': `${pos.y}%` }}
    >
      {/* layer tersembunyi/redacted */}
      <div className={styles.hiddenLayer} style={{ backgroundImage: `url(${subjectSrc})` }} />
      <div className={styles.redactedStripes} />

      {/* layer yang di-reveal, mask ngikutin posisi cursor */}
      <div
        className={`${styles.revealedLayer} ${found ? styles.found : ''}`}
        style={{
          backgroundImage: `url(${subjectSrc})`,
          WebkitMaskImage: `radial-gradient(circle at var(--x) var(--y), black 0, black 90px, transparent 92px)`,
          maskImage: `radial-gradient(circle at var(--x) var(--y), black 0, black 90px, transparent 92px)`,
        }}
      />

      {/* magnifier ring ngikutin cursor */}
      {!reducedMotion && (
        <div
          className={styles.magnifierRing}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      )}

      {/* hotspot klik di area "wajah" */}
      <button
        onClick={handleFound}
        aria-label="Reveal the subject"
        className={styles.hotspot}
      />

      {/* copy */}
      <div className={styles.copyWrap}>
        <span className={styles.eyebrow}>Case No. 000 — Subject unconfirmed</span>
        <p className={styles.title}>Take the glass — find the subject</p>
      </div>

      <button onClick={handleFound} className={styles.skipButton}>
        Skip intro →
      </button>
    </div>
  );
}