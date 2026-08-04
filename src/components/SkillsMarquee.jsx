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

export default function SkillsMarquee() {
  const loopItems = [...techStack, ...techStack];

  return (
    <div className={styles.wrap}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <div className={styles.track}>
        {loopItems.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <span key={`${item.substance}-${i}`} className={styles.item}>
              {Icon && <Icon className={styles.icon} />}
              {item.substance}
            </span>
          );
        })}
      </div>
    </div>
  );
}