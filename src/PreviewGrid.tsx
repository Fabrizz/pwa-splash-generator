import type { GeneratedSplash } from './splashSizes'
import styles from './PreviewGrid.module.css'

interface Props {
  items: GeneratedSplash[]
  onDownload: (item: GeneratedSplash) => void
}

export function PreviewGrid({ items, onDownload }: Props) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <button
          key={i}
          className={styles.card}
          onClick={() => onDownload(item)}
          title={`↓ ${item.filename}`}
        >
          <div
            className={styles.imgWrap}
            style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}
          >
            <img src={item.dataUrl} alt={item.label} className={styles.img} />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.dims}>{item.width}×{item.height}</span>
            <span className={styles.scale}>@{item.scale}x</span>
          </div>
        </button>
      ))}
    </div>
  )
}
