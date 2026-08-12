# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-13
- Primary product surfaces: Blog index, category index, post detail, about, 404
- Evidence reviewed: `src/pages`, `src/components`, `src/layouts`, `src/styles/global.css`, and the approved references in `.omx/artifacts/visual-ralph/ludens-kurly/`

## Brand

- Personality: Quiet, precise, curious, and editorial.
- Trust signals: Clear dates and categories, readable typography, restrained color, direct GitHub link.
- Avoid: Marketing-style hero copy, ornamental gradients, heavy cards, excessive rounded UI, and imitation of Kurly branding.

## Product goals

- Goals: Make development notes, retrospectives, and book reviews easy to scan and comfortable to read; present Ludens as a thoughtful developer.
- Non-goals: Social feed, newsletter funnel, commercial landing page, or dense portfolio showcase.
- Success signals: A visitor can identify the author, browse a category, and open a post without explanation.

## Personas and jobs

- Primary personas: Ludens, other developers, and hiring reviewers.
- User jobs: Find recent writing, filter by subject, assess writing quality, and reach the author's GitHub.
- Key contexts of use: Desktop research, mobile reading, and quick portfolio review.

## Information architecture

- Primary navigation: `ludens.dev` home link, GitHub, theme toggle.
- Core routes/screens: `/`, `/posts/`, `/categories/[category]/`, `/tags/[tag]/`, `/posts/[id]/`, `/about/`.
- Content hierarchy: Brand header -> category tabs -> horizontal article list -> footer.

## Design principles

- Content before introduction: The index starts with filtering and writing, not a manifesto hero.
- Lime as punctuation: Lime identifies state and category; it never becomes a large decorative field.
- Familiar but original: Reuse the scan pattern of a technical editorial index while retaining Ludens typography and tokens.
- Tradeoffs: Article thumbnails improve scanning but remain optional; text must carry the experience when an image is absent.

## Visual language

- Color: White canvas, olive-black text, muted gray metadata, lime `#9DD84B`, pale lime `#F1F8E7`.
- Typography: `Noto Sans KR` for interface and index; `Gowun Batang` for the wordmark and long-form article headings/body.
- Spacing/layout rhythm: Maximum 1180px content width; 8px base rhythm; generous 80-120px vertical whitespace.
- Shape/radius/elevation: 8px or less, hairline borders, no default shadows.
- Motion: 160ms color/translation feedback; disabled for reduced-motion users.
- Imagery/iconography: Optional 160px editorial thumbnails; simple line icons only.

## Components

- Existing components to reuse: `BaseLayout`, `PostLayout`, `Icon`, `Footer`.
- New/changed components: Minimal `Header`, reusable `CategoryTabs`, horizontal `PostList` rows.
- Variants and states: Active category underline; image and generated monogram thumbnail variants; light/dark themes.
- Token/component ownership: Global CSS variables in `src/styles/global.css`; components own semantic markup only.

## Accessibility

- Target standard: WCAG 2.2 AA.
- Keyboard/focus behavior: Visible focus ring; theme button and all tabs keyboard accessible; skip link retained.
- Contrast/readability: Lime is not used as body text on white; active lime includes weight/underline cues.
- Screen-reader semantics: Header actions have explicit names; tabs use navigation landmarks; metadata uses `<time>`.
- Reduced motion and sensory considerations: `prefers-reduced-motion` disables transitions.

## Responsive behavior

- Supported breakpoints/devices: 360px mobile through wide desktop.
- Layout adaptations: Article thumbnail shrinks on tablet and moves above text on narrow mobile; tabs scroll horizontally; header actions remain top-right.
- Touch/hover differences: Touch targets are at least 40px; hover effects are supplemental.

## Interaction states

- Loading: Static HTML requires no blocking loading UI.
- Empty: A bordered, quiet message explains that the first public post is being prepared.
- Error: Custom 404 retains the global header and return link.
- Success: Navigation state is expressed through URL and active underline.
- Disabled: Not currently used.
- Offline/slow network: Core layout and system font fallbacks remain usable without Google Fonts.

## Content voice

- Tone: Direct, reflective, and understated.
- Terminology: UI uses Korean labels; technical terms and category aliases may remain English.
- Microcopy rules: No promotional slogans; short nouns and concrete actions.

## Implementation constraints

- Framework/styling system: Astro 7, TypeScript, Markdown content collections, plain CSS.
- Design-token constraints: Extend existing CSS custom properties; no UI framework or new dependency.
- Performance constraints: Static output, no large decorative media, optional optimized thumbnails.
- Compatibility constraints: GitHub Pages static deployment; no server-only features.
- Test/screenshot expectations: `npm run check`, `npm run build`, desktop 1440x1000 and mobile 390x844 screenshots.

## Open questions

- [ ] Replace the generic welcome cover when Ludens provides the first post artwork / Ludens / visual specificity only.
- [ ] Decide whether the dormant search endpoint should return as a visible control after enough posts exist / Ludens / navigation density.
