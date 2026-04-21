import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import styles from './DropZone.module.css'

interface Props {
  image: { src: string; width: number; height: number; name: string } | null
  onFile: (file: File) => void
}

export function DropZone({ image, onFile }: Props) {
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className={styles.hidden}
        onChange={handleChange}
      />

      {image ? (
        <div className={styles.preview}>
          <img src={image.src} alt="source" className={styles.thumb} />
          <div className={styles.meta}>
            <span className={styles.name}>{image.name}</span>
            <span className={styles.dims}>{image.width} × {image.height}px</span>
            <span className={styles.hint}>Click to change</span>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.icon}>⌃</div>
          <p>Drop image here<br />or click to browse</p>
          <span className={styles.formats}>PNG · JPG · WEBP · AVIF</span>
        </div>
      )}
    </div>
  )
}
