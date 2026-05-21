# Configuración de Música - Seiko

Este directorio contiene la configuración para la música de fondo del juego.

## Cómo agregar canciones

1. Abre el archivo `music.ts`
2. Reemplaza los URLs placeholder (`URL_CANCION_1`, etc.) con URLs reales de tus archivos de música
3. Puedes agregar tantas canciones como desees

### Ejemplo:

```typescript
export const BACKGROUND_MUSIC_URLS: string[] = [
  'https://ejemplo.com/musica/cancion1.mp3',
  'https://ejemplo.com/musica/cancion2.mp3',
  'https://ejemplo.com/musica/cancion3.ogg',
];
```

## Formatos soportados

- MP3 (.mp3)
- OGG (.ogg)
- WAV (.wav)

## Notas importantes

- Las canciones se reproducen aleatoriamente al inicio
- Cuando una canción termina, se reproduce la siguiente en orden
- El sistema hace loop infinito a través de todas las canciones
- El volumen se puede controlar desde el menú de Ajustes
- Si no quieres música de fondo, simplemente deja el array vacío: `[]`

## Hospedaje de archivos de música

Puedes hospedar tus archivos de música en:
- GitHub (usando GitHub Pages o URLs de releases)
- Servicios de almacenamiento en la nube (Google Drive, Dropbox con links directos)
- CDN de audio
- Tu propio servidor

**Importante:** Asegúrate de que los URLs permitan CORS (Cross-Origin Resource Sharing) para que el navegador pueda reproducir los archivos.
