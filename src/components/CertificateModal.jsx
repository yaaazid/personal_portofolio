'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from '@/styles/CertificateModal.module.css';

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{certificate.name}</span>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <iframe
          src={certificate.pdfUrl}
          title={certificate.name}
          className={styles.frame}
        />
      </div>
    </div>
  );
}