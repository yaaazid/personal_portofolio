import Link from 'next/link';
import { notFound } from 'next/navigation';
import { works } from '@/lib/constants';
import styles from '@/styles/CaseFile.module.css';

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};

  return {
    title: `${work.title} — Yazid Denny Troya`,
    description: work.description,
  };
}

export default async function CaseFilePage({ params }) {
  const { slug } = await params;
  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) notFound();

  const work = works[index];
  const next = works[(index + 1) % works.length];

  return (
    <main className={styles.page}>
      <Link href="/#work" className={styles.back}>
        ← Back to all cases
      </Link>

      <header className={styles.header}>
        <span className={styles.eyebrow}>
          {work.exhibit} — {work.category}
        </span>
        <h1 className={styles.title}>{work.title}</h1>
      </header>

      <div className={styles.imageWrap}>
        {work.image ? (
          <img src={work.image} alt={`Screenshot of ${work.title}`} className={styles.image} />
        ) : (
          <span className={styles.placeholder}>Screenshot coming soon</span>
        )}
      </div>

      <p className={styles.description}>{work.description}</p>

      <section aria-labelledby="stack-heading" className={styles.stack}>
        <h2 id="stack-heading" className={styles.stackTitle}>
          Stack
        </h2>
        <ul className={styles.techRow}>
          {work.tech.map((t) => (
            <li key={t} className={styles.techTag}>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {works.length > 1 && (
        <Link href={`/case-files/${next.slug}`} className={styles.next}>
          Next case: {next.title} →
        </Link>
      )}
    </main>
  );
}
