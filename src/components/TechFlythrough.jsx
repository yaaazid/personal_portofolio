'use client';

import { useEffect, useRef, useState } from 'react';
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
import { createRng } from '@/lib/random';
import styles from '@/styles/TechFlythrough.module.css';

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

const DEPTH_LAYERS = 6;

function Icon3D({ Icon, size }) {
  if (!Icon) return null;

  return (
    <span className={styles.icon3dWrap} style={{ width: size, height: size }}>
      <span className={styles.icon3d}>
        {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
          <Icon
            key={i}
            aria-hidden={i > 0}
            className={styles.icon3dLayer}
            style={{
              transform: `translateZ(${-i * 1.4}px)`,
              opacity: i === 0 ? 1 : Math.max(0.15, 0.6 - i * 0.1),
            }}
          />
        ))}
      </span>
    </span>
  );
}

// Each entry gets a random-ish spread position and depth (0 = far/small, 1 = near/large)
function buildLayout(items) {
  const rand = createRng(7);
  return items.map((item, i) => {
    const angle = (i / items.length) * Math.PI * 2 + rand() * 0.6;
    const radius = 30 + rand() * 45;
    return {
      ...item,
      xPct: Math.cos(angle) * radius,
      yPct: Math.sin(angle) * radius * 0.6,
      depth: 0.5 + rand() * 0.6,
    };
  });
}

// How much of the timeline each logo's turn occupies, and how much overlaps the next
const STEP = 1; // spacing between each logo's start, in timeline "units"
const TURN_DURATION = 0.8; // how long each logo's fly-in animation takes, in the same units

export default function TechFlythrough() {
  const wrapperRef = useRef(null);
  const logoRefs = useRef([]);
  const [layout] = useState(() => buildLayout(techStack));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const logos = logoRefs.current.filter(Boolean);

      logos.forEach((el) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          scale: 0.1,
          opacity: 0,
          filter: 'blur(4px)',
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      logos.forEach((el, i) => {
        const data = layout[i];

        // each logo's turn starts at i * STEP — sequential, not all at once
        tl.to(
          el,
          {
            x: `${data.xPct}vw`,
            y: `${data.yPct}vh`,
            scale: 0.6 + data.depth * 1.8,
            opacity: 0.9,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: TURN_DURATION,
          },
          i * STEP
        );

        // hold briefly, then fade back down before the next logo takes over
        tl.to(
          el,
          {
            opacity: 0.35,
            scale: `-=0.15`,
            duration: TURN_DURATION * 0.6,
            ease: 'power1.in',
          },
          i * STEP + TURN_DURATION + 0.15
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [layout]);

  const totalHeightVh = 100 + techStack.length * 55;

  return (
    <section
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ height: `${totalHeightVh}vh` }}
    >
      <div className={styles.sticky}>
        <p className={styles.centerText}>
          One stack, many tools — reaching for whichever one gets the job done.
        </p>

        {layout.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.substance}
              ref={(el) => {
                logoRefs.current[i] = el;
              }}
              className={styles.logo}
            >
              {Icon && <Icon3D Icon={Icon} size={22} />}
              <span className={styles.logoLabel}>{item.substance}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}