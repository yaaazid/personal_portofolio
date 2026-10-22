import styles from '@/styles/VerticalPhotoScroll.module.css';

/**
 * Two vertical photo columns that loop continuously in opposite directions --
 * the left column drifts down (counter-clockwise), the right drifts up
 * (clockwise) -- reading like two halves of a slow-turning carousel.
 *
 * items: Array<{
 *   id: string,
 *   image?: string,        // photo src -- renders an <img> tile
 *   icon?: ComponentType,   // icon component -- renders an icon tile instead
 *   brand?: string,         // accent color for icon tiles
 *   caption?: string,       // small mono label pinned bottom-left of the tile
 *   alt?: string,
 * }>
 */
export default function VerticalPhotoScroll({ items = [], eyebrow, title }) {
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  const loop = (arr) => [...arr, ...arr];

  return (
    <section className={styles.section}>
      {(eyebrow || title) && (
        <div className={styles.header}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
        </div>
      )}

      <div className={styles.wrap}>
        <div className={styles.fadeTop} />
        <div className={styles.fadeBottom} />

        <div className={styles.columns}>
          <Column items={loop(left)} direction={styles.trackDown} />
          <Column items={loop(right)} direction={styles.trackUp} />
        </div>
      </div>
    </section>
  );
}

function Column({ items, direction }) {
  return (
    <div className={styles.columnWrap}>
      <div className={`${styles.track} ${direction}`}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.id}-${i}`}
              className={styles.tile}
              style={item.brand ? { '--brand': item.brand } : undefined}
            >
              {item.image ? (
                <img src={item.image} alt={item.alt || ''} className={styles.image} />
              ) : (
                Icon && <Icon className={styles.icon} aria-hidden="true" />
              )}
              {item.caption && <span className={styles.caption}>{item.caption}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}