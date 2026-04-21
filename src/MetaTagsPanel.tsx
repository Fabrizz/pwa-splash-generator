import { useState } from 'react'
import { allMetaTags } from './splashSizes'
import styles from './MetaTagsPanel.module.css'

export function MetaTagsPanel({ basePath }: { basePath: string }) {
  const [copied, setCopied] = useState(false)
  const tags = allMetaTags(basePath)

  const copy = async () => {
    await navigator.clipboard.writeText(tags)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>HTML &lt;link&gt; tags — paste into &lt;head&gt;</span>
        <button className={styles.copyBtn} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy all'}
        </button>
      </div>
      <pre className={styles.code}>{tags}</pre>
    </div>
  )
}
