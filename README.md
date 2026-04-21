# PWA Splash Generator

Genera todos los `apple-touch-startup-image` para tu PWA directamente en el navegador usando Canvas. Sin servidor, sin dependencias externas.

## Características

- ✅ 23 tamaños oficiales (iPhone + iPad)
- ✅ Modo **Cover** (recorte centrado) o **Contain** (letterbox negro)
- ✅ Descarga individual o **ZIP** con todos los archivos
- ✅ Genera los `<link rel="apple-touch-startup-image">` listos para pegar
- ✅ Usa `OffscreenCanvas` cuando está disponible (más rendimiento)
- ✅ 100% client-side, privacidad total

## Uso

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── splashSizes.ts       # Todos los tamaños + generadores de meta tags
├── cropUtils.ts         # Lógica Canvas (cover / contain)
├── useImageLoader.ts    # Hook para cargar imagen fuente
├── useGenerator.ts      # Hook de generación + ZIP download
├── DropZone.tsx         # Drag & drop upload
├── PreviewGrid.tsx      # Grid de resultados
├── MetaTagsPanel.tsx    # Panel con HTML meta tags
└── App.tsx              # Composición principal
```

## Meta tags generados

```html
<link rel="apple-touch-startup-image"
  media="(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
  href="/splash/apple-splash-1320-2868.png">
<!-- ... un tag por cada tamaño -->
```

## Tamaños incluidos

| Dispositivo | Resolución | Escala |
|-------------|-----------|--------|
| iPhone 16 Pro Max | 1320×2868 | @3x |
| iPhone 16 Pro | 1206×2622 | @3x |
| ... | ... | ... |
| iPad Pro 12.9" | 2048×2732 | @2x |
