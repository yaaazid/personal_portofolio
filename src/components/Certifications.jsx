'use client';

import { useState } from 'react';
import { certifications } from '@/lib/constants';
import CertificationCard from '@/components/CertificationCard';
import CertificateModal from '@/components/CertificateModal';
import styles from '@/styles/Certifications.module.css';

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Verified Credentials</span>
        <h2 className={styles.title}>Certifications</h2>
      </div>

      <div className={styles.grid}>
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            certificate={cert}
            onClick={() => setActiveCert(cert)}
          />
        ))}
      </div>

      <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  );
}