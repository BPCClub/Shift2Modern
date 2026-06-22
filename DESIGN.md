# Shift2Modern Design System

## Purpose

Shift2Modern is a documentation site for teaching modern development workflows. The interface should stay quiet, readable, and task-focused so readers can scan guides without fighting the chrome.

## Tokens

- Color: use the Docus/Nuxt UI semantic tokens already provided by the theme, especially `primary`, `info`, `warning`, `error`, `success`, `default`, `muted`, and `accented`.
- Type: use the Docus/Nuxt UI prose scale for article content and page-level headings.
- Spacing: use the Docus/Nuxt UI spacing rhythm and Tailwind utility scale. Prefer existing page/prose components over custom layout math.
- Radius: use the theme defaults for Nuxt UI cards, callouts, and buttons.

## Layout

- Documentation pages use Docus' default docs layout, sidebar navigation, article body, and table of contents.
- Landing content uses the Docus/Nuxt UI page hero and prose card components.
- Repeated choice lists use card groups with responsive columns.

## Components

- Alerts map to semantic callouts: `info`, `warning`, `danger`, and `success`.
- Cards map to Nuxt UI prose cards. Keep `#title`; put body copy in the default slot.
- Card grids map to Nuxt UI prose card groups and keep legacy `#title`, `#root`, and default slots.
- Legacy block heroes map to Nuxt UI page heroes with primary and secondary actions.
- Prose images keep their intrinsic size up to the article width so icons and logos do not render as full-width screenshots.

## Interaction

- Links remain real anchors.
- Header search, mobile navigation, color mode, and generated docs navigation remain owned by Docus.
- Compatibility components must not intercept clicks unless they render explicit links.

## Accessibility

- Use semantic headings and links from the Docus/Nuxt UI components.
- Keep callout icons decorative and preserve readable text contrast through theme tokens.

## Scope

This file documents the existing Docus-based visual system. It is not a redesign brief.
