# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-14
- Primary product surfaces: Blog index, category index, post detail, about, 404
- Evidence reviewed: `src/pages`, `src/components`, `src/layouts`, `src/styles/global.css`, and the approved references in `.omx/artifacts/visual-ralph/ludens-kurly/`

## Brand

- Personality: Quiet, precise, curious, and editorial.
- Trust signals: Clear dates and categories, readable typography, restrained color, direct GitHub link.
- Avoid: Marketing-style hero copy, ornamental gradients, heavy cards, excessive rounded UI, and imitation of Kurly branding.

## Product goals

- Goals: Make development notes, retrospectives, and book reviews easy to scan and comfortable to read; present ludens as a thoughtful developer.
- Non-goals: Social feed, newsletter funnel, commercial landing page, or dense portfolio showcase.
- Success signals: A visitor can identify the author, browse a category, and open a post without explanation.

## Personas and jobs

- Primary personas: ludens, other developers, and hiring reviewers.
- User jobs: Find recent writing, filter by subject, assess writing quality, and reach the author's GitHub.
- Key contexts of use: Desktop research, mobile reading, and quick portfolio review.

## Information architecture

- Primary navigation: `ludens.dev` home link, GitHub, theme toggle.
- Core routes/screens: `/`, `/posts/`, `/categories/[category]/`, `/tags/[tag]/`, `/posts/[id]/`, `/about/`; `/categories/books/` switches between a visual reading shelf and a standard review list.
- Content hierarchy: Brand header -> category tabs -> book view switcher or horizontal article list -> footer.

## Design principles

- Content before introduction: The index starts with filtering and writing, not a manifesto hero.
- Lime as punctuation: Lime identifies state and category; it never becomes a large decorative field.
- Familiar but original: Reuse the scan pattern of a technical editorial index while retaining ludens typography and tokens.
- Tradeoffs: Article thumbnails improve scanning but remain optional; text must carry the experience when an image is absent.

## Visual language

- Color: White canvas, olive-black text, muted gray metadata, lime `#9DD84B`, pale lime `#F1F8E7`.
- Typography: `Pretendard Variable` across interface, index, wordmark, headings, and long-form content. Fallback order mirrors the approved reference: Pretendard, Apple/system UI, `Apple SD Gothic Neo`, then `Noto Sans KR`. Titles wrap at word boundaries; individual words break only as a last resort when they cannot fit the available width.
- Spacing/layout rhythm: Maximum 1180px content width shared by the index and header; the left wordmark and right header actions align with the article-list edges; 8px base rhythm; first-view spacing stays compact enough to reveal content without scrolling; shelf captions begin at least 10px below the visible shelf edge.
- Shape/radius/elevation: 8px or less, hairline borders, no default shadows.
- Motion: 160ms color/translation feedback; disabled for reduced-motion users.
- Imagery/iconography: Optional 160px editorial thumbnails; simple line icons only.

## Components

- Existing components to reuse: `BaseLayout`, `PostLayout`, `Icon`, `Footer`.
- New/changed components: Minimal `Header`, reusable `CategoryTabs`, horizontal `PostList` rows, `Bookshelf`, and an accessible `BookViewSwitcher` for book-review discovery.
- Variants and states: Active category underline; image and generated monogram thumbnail variants; the home list highlights one featured article; book list rows retain portrait cover proportions and expose rating/page metadata; light/dark themes; equal-size book displays wrap into vertically stacked rows with one continuous shelf per row and show author plus rating below each title; compact icon tabs beside the shared review-list title switch separate shelf and list panels.
- Token/component ownership: Global CSS variables in `src/styles/global.css`; components own semantic markup only.

## Accessibility

- Target standard: WCAG 2.2 AA.
- Keyboard/focus behavior: Visible focus ring; theme button and all tabs keyboard accessible; the book view tabs support arrow, Home, and End keys; skip link retained.
- Contrast/readability: Muted text meets 4.5:1 and focus, icons, and selected controls meet 3:1; lime is not used as body text on white; active lime includes weight/underline cues.
- Screen-reader semantics: Header actions and icon-only book view tabs have explicit names; tabs use navigation landmarks; metadata uses `<time>`.
- Reduced motion and sensory considerations: `prefers-reduced-motion` disables transitions.

## Responsive behavior

- Supported breakpoints/devices: 360px mobile through wide desktop.
- Layout adaptations: Article rows become compact horizontal cards on narrow mobile; book covers keep a portrait ratio; the reading shelf wraps from six columns to fewer columns as space narrows; header actions remain top-right.
- Touch/hover differences: Primary icon targets are 44px and compact view tabs are 40px; shelf titles remain visible without hover; hover motion and title underlines are supplemental and not required for navigation.

## Interaction states

- Loading: Static HTML requires no blocking loading UI.
- Empty: A bordered, quiet message explains that the first public post is being prepared.
- Error: Custom 404 retains the global header and return link.
- Success: Navigation state is expressed through URL and active underline; book view state is expressed through the selected tab and visible panel.
- Disabled: Not currently used.
- Offline/slow network: Core layout and system font fallbacks remain usable without Google Fonts.

## Content voice

- Tone: Direct, reflective, and understated.
- Terminology: UI uses Korean labels; technical terms and category aliases may remain English.
- Microcopy rules: No promotional slogans; short nouns and concrete actions; article-list metadata shows category and date without repeating the site author name.

## Implementation constraints

- Framework/styling system: Astro 7, TypeScript, Markdown content collections, plain CSS.
- Design-token constraints: Extend existing CSS custom properties; no UI framework or new dependency.
- Performance constraints: Static output, no large decorative media, optional optimized thumbnails.
- Compatibility constraints: GitHub Pages static deployment; no server-only features.
- Test/screenshot expectations: `npm run check`, `npm run build`, desktop 1440x1000 and mobile 390x844 screenshots.

## Open questions

- [ ] Replace the generic welcome cover when ludens provides the first post artwork / ludens / visual specificity only.
- [ ] Decide whether the dormant search endpoint should return as a visible control after enough posts exist / ludens / navigation density.
