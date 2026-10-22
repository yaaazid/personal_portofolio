'use client';

import { useEffect, useRef } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import styles from '@/styles/CertificateModal.module.css';

export default function CertificateModal({ certificate, onClose }) {
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Simpan callback terbaru tanpa membuat effect di bawah dijalankan ulang tiap render induk.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const isOpen = Boolean(certificate);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!certificate) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={certificate.name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>{certificate.name}</span>

          <div className={styles.actions}>
            {/* Browser mobile sering tidak menampilkan PDF di dalam iframe, jadi sediakan jalan keluar. */}
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openLink}
            >
              Open PDF <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Tutup"
              className={styles.closeButton}
            >
              <X size={20} />
            </button>
          </div>
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
