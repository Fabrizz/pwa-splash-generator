import { useState, useCallback } from 'react'
import JSZip from 'jszip'
import {
  SPLASH_SIZES,
  type CropMode,
  type FilterType,
  type GeneratedSplash,
  splashFilename,
} from './splashSizes'
import { cropToDataUrl } from './cropUtils'

interface GeneratorState {
  results: GeneratedSplash[]
  running: boolean
  progress: number // 0–100
}

export function useGenerator() {
  const [state, setState] = useState<GeneratorState>({
    results: [],
    running: false,
    progress: 0,
  })

  const generate = useCallback(
    async (img: HTMLImageElement, mode: CropMode, filter: FilterType) => {
      const sizes = SPLASH_SIZES.filter(
        (s) => filter === 'all' || s.device === filter,
      )
      setState({ results: [], running: true, progress: 0 })

      const results: GeneratedSplash[] = []
      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i]
        // yield to browser between frames so UI stays responsive
        await new Promise<void>((r) => setTimeout(r, 0))
        const dataUrl = await cropToDataUrl(img, size.width, size.height, mode)
        results.push({ ...size, dataUrl, filename: splashFilename(size) })
        setState({
          results: [...results],
          running: true,
          progress: Math.round(((i + 1) / sizes.length) * 100),
        })
      }

      setState({ results, running: false, progress: 100 })
    },
    [],
  )

  const reset = useCallback(() => {
    setState({ results: [], running: false, progress: 0 })
  }, [])

  const downloadAll = useCallback(async (results: GeneratedSplash[]) => {
    const zip = new JSZip()
    const folder = zip.folder('apple-splash')!
    for (const p of results) {
      const base64 = p.dataUrl.split(',')[1]
      folder.file(p.filename, base64, { base64: true })
    }
    const blob = await zip.generateAsync({ type: 'blob' })
    triggerDownload(URL.createObjectURL(blob), 'apple-splash-screens.zip')
  }, [])

  const downloadOne = useCallback((p: GeneratedSplash) => {
    triggerDownload(p.dataUrl, p.filename)
  }, [])

  return { ...state, generate, reset, downloadAll, downloadOne }
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
}
