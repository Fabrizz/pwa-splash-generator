export type DeviceType = 'iphone' | 'ipad'
export type CropMode = 'cover' | 'contain'
export type FilterType = 'all' | DeviceType

export interface SplashSize {
  label: string
  width: number
  height: number
  scale: number
  device: DeviceType
}

export interface GeneratedSplash extends SplashSize {
  dataUrl: string
  filename: string
}

export const SPLASH_SIZES: SplashSize[] = [
  // ── iPhones ────────────────────────────────────────────────────────────────
  { label: 'iPhone 16 Pro Max',                         width: 1320, height: 2868, scale: 3, device: 'iphone' },
  { label: 'iPhone 16 Pro',                             width: 1206, height: 2622, scale: 3, device: 'iphone' },
  { label: 'iPhone 16 Plus / 15 Pro Max / 14 Pro Max',  width: 1320, height: 2868, scale: 3, device: 'iphone' },
  { label: 'iPhone 16 / 15 Pro / 14 Pro',               width: 1179, height: 2556, scale: 3, device: 'iphone' },
  { label: 'iPhone 15 / 14 / 13 Pro / 12 Pro',          width: 1170, height: 2532, scale: 3, device: 'iphone' },
  { label: 'iPhone 15 Plus / 14 Plus / 13 Pro Max',     width: 1284, height: 2778, scale: 3, device: 'iphone' },
  { label: 'iPhone 13 mini / 12 mini',                  width: 1080, height: 2340, scale: 3, device: 'iphone' },
  { label: 'iPhone 11 Pro Max / XS Max',                width: 1242, height: 2688, scale: 3, device: 'iphone' },
  { label: 'iPhone 11 / XR',                           width:  828, height: 1792, scale: 2, device: 'iphone' },
  { label: 'iPhone 11 Pro / X / XS',                   width: 1125, height: 2436, scale: 3, device: 'iphone' },
  { label: 'iPhone 8 Plus / 7 Plus / 6s Plus',         width: 1242, height: 2208, scale: 3, device: 'iphone' },
  { label: 'iPhone 8 / 7 / 6s / 6',                   width:  750, height: 1334, scale: 2, device: 'iphone' },
  { label: 'iPhone SE (3rd / 2nd gen)',                 width:  750, height: 1334, scale: 2, device: 'iphone' },
  { label: 'iPhone SE 1st gen / iPod touch',           width:  640, height: 1136, scale: 2, device: 'iphone' },
  // ── iPads ──────────────────────────────────────────────────────────────────
  { label: 'iPad Pro 12.9" (6th–3rd gen)',              width: 2048, height: 2732, scale: 2, device: 'ipad' },
  { label: 'iPad Pro 11" (4th / 3rd gen)',              width: 1668, height: 2388, scale: 2, device: 'ipad' },
  { label: 'iPad Air 13" (M2 / M1)',                    width: 2048, height: 2732, scale: 2, device: 'ipad' },
  { label: 'iPad Air 11" (M2) / Air 5th–4th',          width: 1668, height: 2388, scale: 2, device: 'ipad' },
  { label: 'iPad Pro 10.5" / Air 3rd gen',              width: 1668, height: 2224, scale: 2, device: 'ipad' },
  { label: 'iPad mini 6th gen',                         width: 1488, height: 2266, scale: 2, device: 'ipad' },
  { label: 'iPad mini 5th gen / Air 2',                 width: 1536, height: 2048, scale: 2, device: 'ipad' },
  { label: 'iPad 10th gen',                             width: 1640, height: 2360, scale: 2, device: 'ipad' },
  { label: 'iPad 9th–7th gen (10.2")',                  width: 1620, height: 2160, scale: 2, device: 'ipad' },
]

export function splashFilename(size: SplashSize): string {
  return `apple-splash-${size.width}-${size.height}.png`
}

export function splashMetaTag(size: SplashSize, basePath = '/splash/'): string {
  const dw = Math.round(size.width / size.scale)
  const dh = Math.round(size.height / size.scale)
  const mq = `(device-width: ${dw}px) and (device-height: ${dh}px) and (-webkit-device-pixel-ratio: ${size.scale}) and (orientation: portrait)`
  const path = basePath.endsWith('/') ? basePath : `${basePath}/`
  return `<link rel="apple-touch-startup-image" media="${mq}" href="${path}${splashFilename(size)}">`
}

export function allMetaTags(basePath = '/splash/'): string {
  return SPLASH_SIZES.map((s) => splashMetaTag(s, basePath)).join('\n')
}
