import { useState, useCallback } from 'react'

interface ImageState {
  src: string
  el: HTMLImageElement
  width: number
  height: number
  name: string
}

export function useImageLoader() {
  const [image, setImage] = useState<ImageState | null>(null)

  const load = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const src = URL.createObjectURL(file)
    const el = new Image()
    el.onload = () => {
      setImage({ src, el, width: el.naturalWidth, height: el.naturalHeight, name: file.name })
    }
    el.src = src
  }, [])

  const clear = useCallback(() => {
    if (image?.src) URL.revokeObjectURL(image.src)
    setImage(null)
  }, [image])

  return { image, load, clear }
}
