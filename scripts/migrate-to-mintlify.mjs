import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'

const groups = [
  {
    group: '开始',
    pages: [
      ['preface', 'content/1.preface.md'],
      ['startup', 'content/startup.md'],
      ['contribution-guidelines', 'content/2.contribution-guidelines.md'],
    ],
  },
  {
    group: 'VSCode',
    pages: [
      ['vscode/introduction', 'content/3.vscode/0.introduction.md'],
      ['vscode/download-and-install', 'content/3.vscode/1.download-and-install.md'],
      ['vscode/basic-operation', 'content/3.vscode/2.basic-operation.md'],
      ['vscode/install-step-by-step', 'content/3.vscode/vscode-install-step-by-step.md'],
    ],
  },
  {
    group: 'Git',
    pages: [
      ['git/introduction', 'content/4.git/0.introduction.md'],
      ['git/download-and-install', 'content/4.git/1.download-and-install.md'],
      ['git/basic-concept', 'content/4.git/2.basic-concept.md'],
      ['git/reference', 'content/4.git/3.git-reference.md'],
      ['git/advanced-operation', 'content/4.git/4.git-advanced-operation.md'],
      ['git/basic-operation', 'content/4.git/basic-operation.md'],
      ['git/install-step-by-step', 'content/4.git/git-install-step-by-step.md'],
    ],
  },
  {
    group: 'Markdown',
    pages: [
      ['markdown/introduction', 'content/5.markdown/0.introduction.md'],
      ['markdown/basic-grammar', 'content/5.markdown/1.basic-grammar.md'],
      ['markdown/extra-grammar', 'content/5.markdown/2.extra-grammar.md'],
      ['markdown/cheat-sheet', 'content/5.markdown/3.cheat-sheet.md'],
    ],
  },
  {
    group: 'Terminal',
    pages: [
      ['terminal/introduction', 'content/6.terminal/0.introduction.md'],
      ['terminal/cli', 'content/6.terminal/1.cli.md'],
    ],
  },
  {
    group: 'GitHub',
    pages: [
      ['github/introduction', 'content/7.github/0.introduction.md'],
      ['github/desktop', 'content/7.github/3.github-desktop.md'],
      ['github/sign-up', 'content/7.github/github-sign-up.md'],
    ],
  },
  {
    group: 'Mindmap',
    pages: [
      ['mindmap/introduction', 'content/8.mindmap/0.introduction.md'],
      ['mindmap/recommended-softwares', 'content/8.mindmap/1.recommended-softwares.md'],
    ],
  },
  {
    group: '正则表达式',
    pages: [
      ['regexp/introduction', 'content/10.REGEXP/0.introduction.md'],
    ],
  },
  {
    group: '附录',
    pages: [
      ['smart-qa', 'content/99.smart-qa.md'],
    ],
  },
]

for (const path of outputRoots()) {
  rmSync(path, { recursive: true, force: true })
}

writePage('index', convertHome(readSource('content/index.md')))

for (const group of groups) {
  for (const [target, source] of group.pages) {
    writePage(target, convertPage(readSource(source), target))
  }
}

writeFileSync('docs.json', `${JSON.stringify({
  $schema: 'https://mintlify.com/docs.json',
  theme: 'mint',
  name: 'Shift to Modern',
  colors: {
    primary: '#16a34a',
    light: '#22c55e',
    dark: '#15803d',
  },
  favicon: '/favicon.ico',
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  navigation: {
    tabs: [
      {
        tab: '指南',
        groups: [
          { group: '首页', pages: ['index'] },
          ...groups.map(({ group, pages }) => ({
            group,
            pages: pages.map(([target]) => target),
          })),
        ],
      },
    ],
  },
  footer: {
    socials: {
      github: 'https://github.com/BPCClub/Shift2Modern',
    },
  },
}, null, 2)}\n`)

function writePage(target, content) {
  const path = `${target}.mdx`
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

function convertHome(source) {
  const title = frontmatterValue(source, 'title') ?? 'Shift to Modern'
  const description = frontmatterValue(source, 'description') ?? 'The only guide you need to let your teammates adopt modern workflows and tools.'

  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n# Shift to Modern\n\n## 步入现代\n\n${description}\n\n带您的队友采用现代开发工作流所需的唯一指南。\n\n<CardGroup cols={2}>\n  <Card title=\"开始阅读\" href=\"/preface\">\n    从项目背景和现代开发工作流的基本目标开始。\n  </Card>\n  <Card title=\"查看线路图\" href=\"https://github.com/orgs/BPCClub/projects/2/views/1\">\n    查看项目建设计划和待完善内容。\n  </Card>\n</CardGroup>\n\n## Why Shift to Modern?\n\n## 为何步入现代？\n\n**您是否体验过：**\n\n- 队友每次将代码打包成压缩包且用 **iM** 做“版本控制”\n- 队友次次文档写成 **doc** 甚至 **wps**\n- 看到优秀工具却担心难以入门而望而却步\n\n## How to Shift to Modern?\n\n## 如何步入现代？\n\n本指南将浅入深出讲解现代开发工作流所用的工具，包括但不限于：\n\n- [Visual Studio Code](https://code.visualstudio.com/)\n- [Git](https://git-scm.com/)\n- [GitHub](https://github.com)\n- Markdown\n- [LaTeX](https://www.latex-project.org/)\n- [Docker](https://www.docker.com/)\n`
}

function convertPage(source, target) {
  let text = stripNavigationFrontmatter(source)

  text = convertCallouts(text)

  text = convertCards(text)
  text = convertCodeGroups(text)

  text = text
    .replace(/:icon\{[^}]+\}/g, '→')
    .replace(/:badge\[\[([^\]]+)\]\(([^)]+)\)\]/g, '[$1]($2)')
    .replace(/:badge\[([^\]]+)\](?:\{[^}]*\})?/g, '`$1`')
    .replace(/:button-link\[([^\]]+)\]\{href="([^"]+)"\}/g, '[$1]($2)')
    .replace(/:br\b/g, '<br />')
    .replace(/::/g, '')

  if (target.startsWith('markdown/')) {
    text = escapeMarkdownTutorialHtml(text)
  }

  text = text.replace(/\n[ \t]+<(Info|Warning|Note)>\n/g, '\n<$1>\n')
    .replace(/\n[ \t]+<\/(Info|Warning|Note)>\n/g, '\n</$1>\n')

  text = escapeMdxTextAngles(text)

  return `${text.trim()}\n`
}

function stripNavigationFrontmatter(source) {
  if (!source.startsWith('---\n')) return source
  const end = source.indexOf('\n---\n', 4)
  if (end === -1) return source

  const frontmatter = source.slice(4, end)
    .split('\n')
    .filter(line => !/^\s*(navigation|layout)\s*:/.test(line))
    .join('\n')
    .trim()

  const body = source.slice(end + 5)
  return frontmatter ? `---\n${frontmatter}\n---\n${body}` : body
}

function convertCards(text) {
  const lines = text.split('\n')
  const output = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const cardGroup = line.match(/^\s*::card-group\s*$/)
    const card = line.match(/^\s*::card(?:\{([^}]*)\})?\s*$/)

    if (cardGroup) {
      const cards = []
      index += 1

      while (index < lines.length && !/^\s*::\s*$/.test(lines[index])) {
        const nestedCard = lines[index].match(/^\s*::card(?:\{([^}]*)\})?\s*$/)
        if (!nestedCard) {
          index += 1
          continue
        }

        const collected = collectBlock(lines, index + 1)
        cards.push(convertCard(nestedCard[1] ?? '', collected.body))
        index = collected.end + 1
      }

      output.push(`<CardGroup cols={2}>`)
      output.push(cards.join('\n'))
      output.push(`</CardGroup>`)
      continue
    }

    if (card) {
      const collected = collectBlock(lines, index + 1)
      output.push(convertCard(card[1] ?? '', collected.body))
      index = collected.end
      continue
    }

    output.push(line)
  }

  return output.join('\n')
}

function convertCallouts(text) {
  const lines = text.split('\n')
  const output = []

  for (let index = 0; index < lines.length; index += 1) {
    const callout = lines[index].match(/^\s*::callout(?:\{([^}]*)\})?\s*$/)
    if (!callout) {
      output.push(lines[index])
      continue
    }

    const collected = collectBlock(lines, index + 1)
    const body = collected.body
      .trim()
      .split('\n')
      .map(line => line.trim() ? `> ${line}` : '>')
      .join('\n')
    output.push(body)
    index = collected.end
  }

  return output.join('\n')
}

function convertCard(attrs, content) {
  const normalized = content.split('\n').map(line => line.replace(/^\s{2,}/, '')).join('\n')
  const titleMatch = normalized.match(/#title\n([\s\S]*?)(?:\n#default\n|$)/)
  const defaultMatch = normalized.match(/#default\n([\s\S]*)/)
  const title = cleanInline(titleMatch?.[1]?.trim() || '内容')
  const body = (defaultMatch?.[1] || normalized.replace(/#title[\s\S]*?(?:\n#default\n|$)/, '')).trim()
  const icon = attrs.match(/icon="([^"]+)"/)?.[1]
  const iconProp = icon ? ` icon="${icon}"` : ''

  return `<Card title="${escapeAttribute(title)}"${iconProp}>\n${body}\n</Card>`
}

function collectBlock(lines, start) {
  const body = []
  for (let index = start; index < lines.length; index += 1) {
    if (/^\s*::\s*$/.test(lines[index])) {
      return { body: body.join('\n'), end: index }
    }
    body.push(lines[index])
  }
  return { body: body.join('\n'), end: lines.length - 1 }
}

function convertCodeGroups(text) {
  return text.replace(/::code-group\n([\s\S]*?)\n::/g, (_match, body) => {
    const cleaned = body
      .replace(/\n\s*::code-preview(?:\{[^}]*\})?\n([\s\S]*?)\n\s*::/g, '\n\n$1\n')
      .replace(/\n\s*::code-group/g, '\n')
      .replace(/\n\s*::/g, '\n')
      .trim()
    return cleaned
  })
}

function cleanInline(value) {
  return value.replace(/:br/g, ' ').replace(/\s+/g, ' ').trim()
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function frontmatterValue(source, key) {
  if (!source.startsWith('---\n')) return null
  const end = source.indexOf('\n---\n', 4)
  if (end === -1) return null
  const line = source.slice(4, end).split('\n').find(item => item.startsWith(`${key}:`))
  if (!line) return null
  return line.slice(key.length + 1).trim().replace(/^['"]|['"]$/g, '')
}

function readSource(path) {
  try {
    return readFileSync(path, 'utf8')
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
    return execFileSync('git', ['show', `HEAD:${path}`], { encoding: 'utf8' })
  }
}

function outputRoots() {
  return [
    'index.mdx',
    'preface.mdx',
    'startup.mdx',
    'contribution-guidelines.mdx',
    'smart-qa.mdx',
    'vscode',
    'git',
    'markdown',
    'terminal',
    'github',
    'mindmap',
    'regexp',
    'docs',
  ]
}

function escapeMdxTextAngles(text) {
  return text.split('\n').map((line) => {
    if (/^\s*```/.test(line)) return line
    if (/^\s*<\/?(Info|Warning|Note|Card|CardGroup)\b/.test(line)) return line
    return line
      .replace(/<([A-Za-z0-9._-]+@[A-Za-z0-9._-]+)>/g, '`<$1>`')
      .replace(/<((?:https?|ftp):\/\/[^>]+)>/g, '$1')
      .replace(/<([A-Za-z][A-Za-z0-9._-]*)>/g, '`<$1>`')
  }).join('\n')
}

function escapeMarkdownTutorialHtml(text) {
  return text.split('\n').map((line) => {
    if (/^\s*<\/?(Info|Warning|Note|Card|CardGroup)\b/.test(line)) return line
    return line
      .replace(/``<([^`]+)>``/g, '`&lt;$1&gt;`')
      .replace(/`<([^`]+)>`/g, '`&lt;$1&gt;`')
      .replace(/<([/?]?[a-z][^>]*)>/g, '&lt;$1&gt;')
      .replace(/```#include`&lt;stdio\.h&gt;````/g, '`#include <stdio.h>`')
  }).join('\n')
}
