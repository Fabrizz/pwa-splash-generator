import { useState } from 'react'
import { SPLASH_SIZES, type CropMode, type FilterType } from './splashSizes'
import { useImageLoader } from './useImageLoader'
import { useGenerator } from './useGenerator'
import { DropZone } from './DropZone'
import { PreviewGrid } from './PreviewGrid'
import { MetaTagsPanel } from './MetaTagsPanel'
import styles from './App.module.css'

const DEVICES: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'iphone', label: 'iPhone' },
  { value: 'ipad', label: 'iPad' },
]

const MODES: { value: CropMode; label: string; desc: string }[] = [
  { value: 'cover', label: 'Cover', desc: 'Fills by cropping from center' },
  { value: 'contain', label: 'Contain', desc: 'Fits fully with black bars' },
]

export default function App() {
  const [mode, setMode] = useState<CropMode>('cover')
  const [filter, setFilter] = useState<FilterType>('all')
  const [showMeta, setShowMeta] = useState(false)
  const [splashPath, setSplashPath] = useState('/splash/')

  const { image, load } = useImageLoader()
  const { results, running, progress, generate, downloadAll, downloadOne } = useGenerator()

  const filteredCount = SPLASH_SIZES.filter(
    (s) => filter === 'all' || s.device === filter,
  ).length

  const handleGenerate = () => {
    if (image) generate(image.el, mode, filter)
  }

  return (
    <div className={styles.app}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoBox}>
            <div className={styles.logoInner} />
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.logoTitle}>PWA Splash Generator</div>
            <div className={styles.logoSub}>
              Vibe coded tool to generate splash screens PWAs.
            </div>
          </div>
          <div>
              <a
                href="https://github.com/fabrizz/pwa-splash-generator"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                GitHub
              </a>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>01 · Source image</div>
            <DropZone image={image} onFile={load} />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>02 · Crop mode</div>
            <div className={styles.modeGroup}>
              {MODES.map((m) => (
                <button
                  key={m.value}
                  className={`${styles.modeBtn} ${mode === m.value ? styles.active : ''}`}
                  onClick={() => setMode(m.value)}
                >
                  <span className={styles.modeBtnLabel}>{m.label}</span>
                  <span className={styles.modeBtnDesc}>{m.desc}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>03 · Devices</div>
            <div className={styles.filterGroup}>
              {DEVICES.map((d) => (
                <button
                  key={d.value}
                  className={`${styles.filterBtn} ${filter === d.value ? styles.active : ''}`}
                  onClick={() => setFilter(d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className={styles.filterCount}>{filteredCount} sizes selected</div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>04 · Generate</div>
            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={!image || running}
            >
              {running
                ? `Generating… ${progress}%`
                : `Generate ${filteredCount} images`}
            </button>
            {running && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>05 · File path</div>
            <input
              className={styles.pathInput}
              type="text"
              value={splashPath}
              onChange={(e) => setSplashPath(e.target.value)}
              placeholder="/splash/"
              spellCheck={false}
            />
          </section>

          {results.length > 0 && (
            <section className={styles.section}>
              <button
                className={styles.downloadBtn}
                onClick={() => downloadAll(results)}
              >
                ↓ Download ZIP ({results.length} files)
              </button>
              <button
                className={`${styles.metaToggle} ${showMeta ? styles.active : ''}`}
                onClick={() => setShowMeta((v) => !v)}
              >
                {showMeta ? 'Hide' : 'Show'} &lt;link&gt; meta tags
              </button>
            </section>
          )}
        </aside>

        {/* ── Main ── */}
        <main className={styles.main}>
          {showMeta && results.length > 0 && <MetaTagsPanel basePath={splashPath} />}

          {results.length === 0 && !running ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>▣</div>
              <p>Upload an image and click "Generate"<br />to see the results</p>
            </div>
          ) : (
            <>
              {results.length > 0 && (
                <div className={styles.resultsHeader}>
                  <span>{results.length} images · click to download individually</span>
                </div>
              )}
              <PreviewGrid items={results} onDownload={downloadOne} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
