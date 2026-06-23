# Shift2Modern Design System

## Purpose

Shift2Modern is a documentation site for teaching modern development workflows. The interface should stay quiet, readable, and task-focused so readers can scan guides without fighting the chrome.

The visual reference is Vercel's Geist design system from `https://vercel.com/design.md`: minimal, developer-focused, high contrast, neutral surfaces, strong typography, and color used sparingly for hierarchy or state.

## Tokens

- Color: use Mintlify theme colors for documentation chrome. Custom landing content follows Geist light tokens: primary text `#171717`, secondary text `#4d4d4d`, background `#ffffff`, secondary surface `#fafafa`, neutral borders `#eaeaea`, and blue accent `#006bff` only for small hierarchy cues or links.
- Type: use Mintlify's default sans-serif stack, with Geist-style hierarchy: strong 600-weight headings, 14px UI labels, and 16-18px body copy with clear line height.
- Spacing: use a 4px base rhythm. Landing sections use generous vertical padding and constrained widths: `max-w-5xl` for page sections, `max-w-3xl` for reading-width text.
- Radius: controls use 6px when possible; cards and larger surfaces use 12px or 16px at most. Avoid pill-shaped large containers.

## Layout

- Documentation pages use Mintlify's default docs layout, sidebar navigation, article body, and table of contents.
- The homepage may use Mintlify `mode: custom` to present a concise landing hero before routing readers into docs.
- Repeated choice lists use flat bordered cards with clear links and restrained copy.
- Avoid gradients, heavy shadows, decorative blobs, and large color fields. Separation comes from whitespace, borders, and neutral surface shifts.

## Components

- Alerts map to semantic Markdown blockquotes or Mintlify callouts when needed.
- Cards map to Mintlify card components in docs pages, and to simple bordered anchors on the custom homepage.
- Card grids use two columns on wide screens and one column on narrow screens.
- Homepage hero actions are plain anchors styled as buttons.
- Primary actions use black background and white text. Secondary actions use white background, neutral border, and primary text.
- Prose images keep their intrinsic size up to the article width so icons and logos do not render as full-width screenshots.

## Interaction

- Links remain real anchors.
- Mobile navigation, color mode, and generated docs navigation remain owned by Mintlify.
- Compatibility components must not intercept clicks unless they render explicit links.

## Accessibility

- Use semantic headings, sections, lists, and real links.
- Keep callout icons decorative and preserve readable text contrast through theme tokens.

## Scope

This file documents the current Mintlify-based visual system. It is intentionally restrained so the content remains the focus.
