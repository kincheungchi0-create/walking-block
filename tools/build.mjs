import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
const filter = (source) => !path.basename(source).startsWith('._');
for (const entry of ['index.html', 'src', 'audio']) {
  await cp(entry, path.join('dist', entry), { recursive: true, filter });
}
await mkdir('dist/node_modules/three', { recursive: true });
for (const entry of ['build', 'examples/jsm']) {
  await cp(path.join('node_modules/three', entry), path.join('dist/node_modules/three', entry), { recursive: true, filter });
}
