import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const defaultStaticDir = new URL('.vercel/output/static/', root);
const siteUrl = process.env.SITE_URL || 'https://shift2modern.dev';

const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;

function parseFrontmatter(source) {
  const match = source.match(frontmatterPattern);
  if (!match) {
    return { data: {}, body: source };
  }

  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    if (!key) {
      continue;
    }

    data[key] = rawValue.replace(/^["']|["']$/g, '');
  }

  return { data, body: source.slice(match[0].length) };
}

function pagePathToUrlPath(pagePath) {
  return pagePath === 'index' ? '/' : `/${pagePath}`;
}

function pagePathToMarkdownPath(pagePath) {
  return pagePath === 'index' ? 'index.md' : `${pagePath}.md`;
}

function pagePathToMarkdownPaths(pagePath) {
  const paths = [pagePathToMarkdownPath(pagePath)];
  if (pagePath === 'index') {
    paths.push('.md');
  }

  return paths;
}

function absoluteUrl(path) {
  return new URL(path, siteUrl).toString();
}

function collectPages(config) {
  const pages = [];

  for (const tab of config.navigation?.tabs ?? []) {
    for (const group of tab.groups ?? []) {
      for (const page of group.pages ?? []) {
        if (typeof page === 'string') {
          pages.push({ group: group.group, path: page });
        }
      }
    }
  }

  return pages;
}

async function readPage(page) {
  const source = await readFile(new URL(`${page.path}.mdx`, root), 'utf8');
  const { data, body } = parseFrontmatter(source);

  return {
    ...page,
    title: data.title || page.path.split('/').at(-1),
    description: data.description || '',
    source,
    body,
  };
}

async function writeTextFile(staticDir, relativePath, content) {
  const target = join(staticDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

function buildLlmsTxt(config, pages) {
  const lines = [`# ${config.name}`, ''];

  if (config.description) {
    lines.push(`> ${config.description}`, '');
  }

  let currentGroup = '';
  for (const page of pages) {
    if (page.group !== currentGroup) {
      currentGroup = page.group;
      if (lines.at(-1) !== '') {
        lines.push('');
      }
      lines.push(`## ${currentGroup}`, '');
    }

    const summary = page.description ? `: ${page.description}` : '';
    lines.push(`- [${page.title}](${absoluteUrl(pagePathToUrlPath(page.path))})${summary}`);
  }

  lines.push('');
  return lines.join('\n');
}

function buildLlmsFullTxt(config, pages) {
  const sections = [buildLlmsTxt(config, pages).trimEnd(), ''];

  for (const page of pages) {
    sections.push(`## ${page.title}`);
    sections.push('');
    sections.push(`URL: ${absoluteUrl(pagePathToUrlPath(page.path))}`);
    if (page.description) {
      sections.push(`Description: ${page.description}`);
    }
    sections.push('');
    sections.push(page.body.trim());
    sections.push('');
  }

  return sections.join('\n');
}

export async function generateAiStaticFiles(staticDirUrl = defaultStaticDir) {
  const staticDir = fileURLToPath(staticDirUrl);
  const config = JSON.parse(await readFile(new URL('../docs.json', import.meta.url), 'utf8'));
  const pages = await Promise.all(collectPages(config).map(readPage));

  await Promise.all(
    pages.flatMap((page) =>
      pagePathToMarkdownPaths(page.path).map((path) => writeTextFile(staticDir, path, page.source)),
    ),
  );

  const llmsTxt = buildLlmsTxt(config, pages);
  const llmsFullTxt = buildLlmsFullTxt(config, pages);

  await Promise.all([
    writeTextFile(staticDir, 'llms.txt', llmsTxt),
    writeTextFile(staticDir, 'llms-full.txt', llmsFullTxt),
    writeTextFile(staticDir, '.well-known/llms.txt', llmsTxt),
    writeTextFile(staticDir, '.well-known/llms-full.txt', llmsFullTxt),
  ]);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateAiStaticFiles(process.argv[2] ? new URL(process.argv[2], root) : defaultStaticDir);
}
