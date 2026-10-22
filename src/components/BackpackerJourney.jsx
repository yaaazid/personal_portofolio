'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { backpackerJourney } from '@/lib/constants';
import styles from '@/styles/BackpackerJourney.module.css';

gsap.registerPlugin(ScrollTrigger);

const COUNTRY_FLAGS = {
  Malaysia: '🇲🇾',
  China: '🇨🇳',
  Egypt: '🇪🇬',
  Morocco: '🇲🇦',
  Netherlands: '🇳🇱',
  Belgium: '🇧🇪',
  Germany: '🇩🇪',
  'Czech Republic': '🇨🇿',
  Austria: '🇦🇹',
  Slovakia: '🇸🇰',
  Hungary: '🇭🇺',
  Serbia: '🇷🇸',
  Bulgaria: '🇧🇬',
  Turkey: '🇹🇷',
  'Saudi Arabia': '🇸🇦',
  Nepal: '🇳🇵',
  Thailand: '🇹🇭',
  Laos: '🇱🇦',
  Vietnam: '🇻🇳',
  'Hong Kong': '🇭🇰',
  Macau: '🇲🇴',
};

export default function BackpackerJourney() {
  const { title, period, duration, countryCount, description, countries } =
    backpackerJourney;

  const sectionRef = useRef(null);
  const statCountRef = useRef(null);
  const statBlockRefs = useRef([]);
  const tagRefs = useRef([]);
  const countUpTarget = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statBlocks = statBlockRefs.current.filter(Boolean);
      const tags = tagRefs.current.filter(Boolean);

      gsap.set(statBlocks, { opacity: 0, y: 30, filter: 'blur(6px)' });
      gsap.set(tags, { opacity: 0, scale: 0.6, y: 12 });

      const tagRotations = tags.map(() => (Math.random() - 0.5) * 14);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(statBlocks, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      });

      tl.to(
        countUpTarget.current,
        {
          value: countryCount,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (statCountRef.current) {
              statCountRef.current.textContent = Math.round(
                countUpTarget.current.value
              );
            }
          },
        },
        '<'
      );

      tl.to(
        tags,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: (i) => tagRotations[i],
          duration: 0.5,
          ease: 'back.out(2)',
          stagger: 0.04,
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [countryCount]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Field Report — {period}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.statsCol}>
          <div
            className={styles.statBlock}
            ref={(el) => {
              statBlockRefs.current[0] = el;
            }}
          >
            <span className={styles.statNumber}>
              <span ref={statCountRef}>0</span>
            </span>
            <span className={styles.statLabel}>Countries</span>
          </div>
          <div
            className={styles.statBlock}
            ref={(el) => {
              statBlockRefs.current[1] = el;
            }}
          >
            <span className={styles.statNumber}>{duration}</span>
            <span className={styles.statLabel}>On the Road</span>
          </div>
        </div>

        <div className={styles.rightCol}>
          <p className={styles.description}>{description}</p>

          <div className={styles.countryGrid}>
            {countries.map((country, i) => (
              <span
                key={country}
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                className={styles.countryTag}
              >
                <span className={styles.flag}>{COUNTRY_FLAGS[country]}</span>
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}