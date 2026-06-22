# PROJECT KNOWLEDGE BASE

## OVERVIEW

Shift2Modern is a Nuxt 4 + Docus documentation site for Chinese-language guides about modern development workflows and tools. Most work is content editing in `content/` plus matching static assets in `public/img/`; the application layer is intentionally thin.

## STRUCTURE

```text
/
├── app.config.ts          # Docus site metadata, GitHub edit links, layout/header/footer config
├── nuxt.config.ts         # Extends Docus and limits prerender crawling
├── tokens.config.ts       # Pinceau theme token override; primary color is lightblue
├── content/               # Ordered Markdown pages and optional section .navigation.yml files
└── public/img/            # Images keyed by content section/page numeric indexes
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| Site title, repo links, navigation chrome | `app.config.ts` | `docus.github.dir` points to `content`; branch is `main` |
| Theme color tokens | `tokens.config.ts` | Uses `defineTheme` from `pinceau` |
| Add or edit guide content | `content/**/*.md` | Pages use Docus/MDC components, not plain Markdown only |
| Add or edit section title/redirect | `content/*/.navigation.yml` | `navigation.redirect` omits numeric filename prefixes |
| Add local images | `public/img/<section>/<page>/` | Directory numbers mirror content filename prefixes |
| Contributor-facing rules | `content/2.contribution-guidelines.md` | Treat this as the source of truth for writing conventions |

## CONTENT MAP

| Path | Topic |
| --- | --- |
| `content/0.index.md` | Landing page |
| `content/1.preface.md` | Preface |
| `content/2.contribution-guidelines.md` | Contribution and writing rules |
| `content/3.vscode/` | VSCode guides |
| `content/4.git/` | Git guides |
| `content/5.markdown/` | Markdown guides |
| `content/6.terminal/` | Terminal guides |
| `content/7.github/` | GitHub and GitHub Desktop guides |
| `content/8.mindmap/` | Mind map guides |
| `content/10.REGEXP/` | Regular expression guide |
| `content/99.smart-qa.md` | Smart QA page |
| `content/startup.md` | Quick collaboration guide, hidden from navigation |

## CONTENT CONVENTIONS

- Keep main prose in Simplified Chinese. Keep product names and technical terms in their original form when that is clearer.
- Use a neutral technical tone. Avoid first person, second person, political/religious framing, or opinion-driven claims.
- Every document should have front matter with at least `title` and `description`.
- A page `title` should match its H1. Use one H1 for the guide title; use lower headings for sections.
- Ordered content filenames use numeric prefixes to control navigation order. Do not reuse a number within the same directory.
- Step-by-step or auxiliary guides can use `navigation: false` to hide from navigation.
- New category introduction pages may use `toc: false` when the table of contents should be hidden.
- Docus/MDC components already used here include `::callout`, `::card`, `::card-group`, `::code-group`, `::code-preview`, `:badge`, and `:br`.
- Put blank lines around headings and code fences. Use ` :br` for forced line breaks in component-heavy content; note the leading space.
- Use italic formatting for software names and special product names, for example `*Nuxt*`, `*Vue*`, `*Docus*`.
- When quoting a linked article title, place Chinese quotation marks outside the link: `“[S2M](https://shift2modern.dev/)”`.

## ASSET CONVENTIONS

- Local images live under `public/img`, then section number, then page number.
- Example mapping: `content/2.sample-category-1/0.sample-guide-1.md` uses `public/img/2/1/`.
- Reference local images from Markdown as `/img/...`, not `public/img/...`.
- Existing screenshot-heavy pages use PNG and GIF. The contribution guide recommends 1920x1080 PNG, compressed with Squoosh OxiPNG effort 2.
- Preserve source credit lines near imported images when existing content does so.

## COMMANDS

```bash
npm run dev       # nuxi dev
npm run build     # nuxi build
npm run generate  # nuxi generate
npm run preview   # nuxi preview
```

## PACKAGE NOTES

- `package.json` has npm scripts only and no explicit `packageManager`.
- Both `package-lock.json` and `pnpm-lock.yaml` exist. Avoid lockfile churn unless dependency work requires it.
- No test, lint, or format scripts are currently defined.

## ANTI-PATTERNS

- Do not add unrelated app architecture; the site currently relies on Docus defaults.
- Do not store content images outside `public/img` unless the page intentionally uses an external image URL.
- Do not add repeated numeric prefixes inside one content directory.
- Do not change `navigation.redirect` targets to include numeric prefixes.
- Do not silently rewrite the contribution guide's writing rules; update `content/2.contribution-guidelines.md` first if project policy changes.
