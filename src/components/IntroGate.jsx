'use client';

import { useState } from 'react';
import IntroReveal from '@/components/IntroReveal';

/**
 * Menampilkan intro dulu, baru konten utama.
 *
 * Konten (children) tetap dirender di HTML dari server supaya terbaca mesin pencari
 * dan preview link, hanya disembunyikan sampai intro selesai. Saat intro selesai,
 * `key` berubah sehingga konten di-mount ulang — animasi GSAP/ScrollTrigger di
 * dalamnya mulai dari awal dengan ukuran layout yang benar.
 */
export default function IntroGate({ children, subjectSrc }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <IntroReveal onComplete={() => setIntroDone(true)} subjectSrc={subjectSrc} />
      )}
      <div key={introDone ? 'live' : 'ssr'} style={{ display: introDone ? 'contents' : 'none' }}>
        {children}
      </div>
    </>
  );
}
