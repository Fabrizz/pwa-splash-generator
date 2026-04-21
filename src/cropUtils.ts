import type { CropMode } from './splashSizes'

/**
 * Crops/fits an HTMLImageElement onto a new OffscreenCanvas (or regular Canvas
 * as fallback) and returns it as a data-URL PNG.
 */
export async function cropToDataUrl(
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
  mode: CropMode,
): Promise<string> {
  // Use OffscreenCanvas when available for better perf off the main thread
  const useOffscreen =
    typeof OffscreenCanvas !== 'undefined' &&
    typeof createImageBitmap !== 'undefined'

  if (useOffscreen) {
    const oc = new OffscreenCanvas(targetW, targetH)
    const ctx = oc.getContext('2d')!
    drawCrop(ctx as unknown as CanvasRenderingContext2D, img, targetW, targetH, mode)
    const blob = await oc.convertToBlob({ type: 'image/png' })
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')!
  drawCrop(ctx, img, targetW, targetH, mode)
  return canvas.toDataURL('image/png')
}

function drawCrop(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
  mode: CropMode,
): void {
  const { naturalWidth: srcW, naturalHeight: srcH } = img
  const srcRatio = srcW / srcH
  const dstRatio = targetW / targetH

  if (mode === 'cover') {
    let sx: number, sy: number, sw: number, sh: number
    if (srcRatio > dstRatio) {
      sh = srcH
      sw = srcH * dstRatio
      sy = 0
      sx = (srcW - sw) / 2
    } else {
      sw = srcW
      sh = srcW / dstRatio
      sx = 0
      sy = (srcH - sh) / 2
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
  } else {
    // contain — fill background then letterbox
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, targetW, targetH)
    const scale = Math.min(targetW / srcW, targetH / srcH)
    const dw = srcW * scale
    const dh = srcH * scale
    const dx = (targetW - dw) / 2
    const dy = (targetH - dh) / 2
    ctx.drawImage(img, dx, dy, dw, dh)
  }
}
