'use client';

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
import styles from '@/styles/SkillsMarquee.module.css';

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

// Real brand colors, shown on hover
const BRAND_COLORS = {
  html5: '#E34F26',
  css3: '#1572B6',
  bootstrap: '#7952B3',
  tailwindcss: '#38BDF8',
  javascript: '#F7DF1E',
  php: '#777BB4',
  laravel: '#FF2D20',
  react: '#61DAFB',
  nodedotjs: '#5FA04E',
  flutter: '#02569B',
};

export default function SkillsMarquee() {
  const loopItems = [...techStack, ...techStack];

  return (
    <div className={styles.wrap}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <div className={styles.track}>
        {loopItems.map((item, i) => {
          const Icon = ICONS[item.icon];
          const color = BRAND_COLORS[item.icon] || '#f4f1ea';
          return (
            <span
              key={`${item.substance}-${i}`}
              className={styles.item}
              style={{ '--brand-color': color }}
            >
              {Icon && <Icon className={styles.icon} />}
              {item.substance}
            </span>
          );
        })}
      </div>
    </div>
  );
}