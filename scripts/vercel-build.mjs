import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import extract from 'extract-zip';
import { generateAiStaticFiles } from './generate-ai-static.mjs';

const root = new URL('../', import.meta.url);
const outputDir = new URL('.vercel/output/', root);
const staticDir = new URL('static/', outputDir);
const configPath = new URL('config.json', outputDir);
const exportZip = new URL('export.zip', root);

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: fileURLToPath(root),
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });

await rm(outputDir, { recursive: true, force: true });
await rm(exportZip, { force: true });

await run('pnpm', ['exec', 'mint', 'export']);

await mkdir(staticDir, { recursive: true });
await extract(fileURLToPath(exportZip), { dir: fileURLToPath(staticDir) });
await generateAiStaticFiles(staticDir);

await cp(new URL('public/', staticDir), staticDir, { recursive: true, force: true });
await Promise.all(
  [
    '.codegraph',
    '.gitignore',
    '.npmrc',
    'Start Docs.bat',
    'Start Docs.command',
    'public',
    'scripts',
    'serve.js',
    'tokens.config.ts',
  ].map((path) => rm(new URL(path, staticDir), { recursive: true, force: true })),
);

await writeFile(configPath, `${JSON.stringify({ version: 3 }, null, 2)}\n`);
await rm(exportZip, { force: true });
