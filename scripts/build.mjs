import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { userscriptMeta } from '../src/userscript-meta.js';

const entryPoint = fileURLToPath(new URL('../src/index.js', import.meta.url));
const outfile = fileURLToPath(new URL('../searchEngineJump.user.js', import.meta.url));

await build({
  entryPoints: [entryPoint],
  outfile,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  charset: 'utf8',
  legalComments: 'none',
  banner: {
    js: userscriptMeta
  }
});

console.log(`Built ${outfile}`);
