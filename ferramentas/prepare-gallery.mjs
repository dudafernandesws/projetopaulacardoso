import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = resolve(projectRoot, 'imagens/originais-hd');
const outputRoot = resolve(projectRoot, 'site/web/assets/gallery');
const dataPath = resolve(projectRoot, 'site/web/gallery-data.js');
const supportedImage = /\.(?:jpe?g|png|webp)$/i;

await mkdir(outputRoot, { recursive: true });

const names = (await readdir(sourceRoot))
  .filter(name => supportedImage.test(name))
  .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));

for (const name of names) {
  const source = resolve(sourceRoot, name);
  const output = resolve(outputRoot, name);
  let shouldCopy = true;

  try {
    const [sourceInfo, outputInfo] = await Promise.all([stat(source), stat(output)]);
    shouldCopy = sourceInfo.size !== outputInfo.size || sourceInfo.mtimeMs > outputInfo.mtimeMs;
  } catch {}

  if (shouldCopy) await copyFile(source, output);
}

const photos = names.map(name => ({ src: `assets/gallery/${encodeURIComponent(name)}` }));
await writeFile(dataPath, `window.PAULA_GALLERY_PHOTOS=${JSON.stringify(photos)};\n`, 'utf8');
console.log(`Galeria preparada: ${photos.length} fotografias.`);
