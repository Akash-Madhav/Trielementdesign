Here's the updated prompt with Rive, Motion, and LottieFiles woven in, and the theme shifted to light/white:

---

# WEBSITE REDESIGN SPECIFICATION PROMPT
**Legal Clearance Edition — v2.0 Enhanced**
`Full Redesign` `Architecture / BIM` `Motion-First` `Zero Resemblance Constraint` `Light Theme`

---

## OBJECTIVE

Redesign the existing website to achieve a **fully distinct, legally original visual identity** that shares zero compositional, typographic, or structural resemblance with the current reference site or any dominant industry template. This is not a facelift. Every visual decision — layout, motion, hierarchy, color, interaction — must be rebuilt from first principles with a clear point-of-view. The design language is **light, white-oriented, and high-contrast** — precision over decoration, clarity over clutter.

---

## 00 — ANIMATION STACK (MANDATORY)

Before any design decision, establish the animation toolchain. All motion on the site must be produced using one or more of the following — no exceptions:

**Rive**
Use Rive for all stateful, interactive animations — hero entry sequences, hover-triggered state machines, scroll-linked playback, and any animated illustration that responds to user input. Rive's state machine model is the primary tool for hero focal point animations and interactive service explainers. Export as `.riv` and embed via the Rive Web Runtime (`@rive-app/canvas`).

**Motion (motion.dev / Framer Motion)**
Use Motion for all DOM-level transitions — page entry animations, scroll-triggered reveals, layout animations, and gesture-based interactions. Replace all CSS `transition` and `animation` properties with Motion equivalents where JavaScript control is needed. Use `useScroll`, `useTransform`, and `useInView` hooks for scroll-driven behavior. Use `AnimatePresence` for all mount/unmount transitions.

**LottieFiles**
Use Lottie for lightweight looping illustrations, loading states, success/error feedback animations, and decorative ambient motion (e.g., a subtle animated blueprint in the background, a looping site-wide accent). Export from After Effects via Bodymovin or source from LottieFiles.com. Embed via `@lottiefiles/dotlottie-web` or the React player. Keep Lottie file sizes under 150kb. Prefer dotLottie (.lottie) format over legacy JSON for performance.

**Tool Assignment by Use Case:**

| Use Case | Tool |
|---|---|
| Hero focal point / interactive entry | Rive |
| Page transitions, scroll reveals, layout animations | Motion |
| Looping ambient illustrations, loading states | LottieFiles |
| Hover state machines, interactive icons | Rive |
| Counter animations, text reveals | Motion |
| Success/error feedback micro-animations | LottieFiles |
| Scroll-linked parallax and transform | Motion |
| Complex stateful UI (tabs, toggles with animation) | Rive or Motion |

---

## 01 — LIGHT THEME DESIGN LANGUAGE

The entire site operates on a **white and light neutral base**. This is not a default Bootstrap white — it is a considered, architectural white with deliberate tonal variation.

**Base Palette Logic**

- **Canvas:** Pure white `#ffffff` or warm white `#fafaf8` as the dominant surface. Never grey as a background.
- **Structural Tint:** One very light warm or cool tint (`#f4f2ee` or `#f0f4f8`) used only for alternating section backgrounds — never more than 2 steps away from white.
- **Ink:** Near-black `#111110` or `#0f0f0d` for all primary text and structural lines. Not pure `#000000`.
- **Structural Accent:** One single mid-tone used for rules, borders, dividers, and grid lines — `#d4d0c8` range. Consistent, never decorative.
- **Signal Color:** One deliberate color used exclusively for interactive states, CTAs, and hover feedback. Options: a deep architectural terracotta, a precise cobalt, a muted sage. Never more than 10% of total visible color area.
- **No gradients** on backgrounds. No drop shadows heavier than `0 2px 8px rgba(0,0,0,0.06)`. Depth is achieved through layering and spacing, not shadow stacking.

**Light Theme Contrast Rules**

- All body text must pass WCAG AA at minimum on white background.
- Signal color must pass AA against white when used as a text or icon color.
- Avoid light grey text on white — it fails accessibility and reads as unfinished.
- Section separation is achieved via ruled lines, spacing, and structural tint — never colored divider bars.

---

## 02 — LAYOUT ARCHITECTURE

**Hybrid Scroll System**
Replace linear vertical scroll with a mixed-axis layout. Sections alternate between vertical narrative flow and horizontal reveal panes. No two consecutive sections share the same scroll behavior.

**Asymmetric Modular Grid**
Abolish uniform column grids. Use a named-area CSS Grid with intentional negative space, bleeds, and off-axis anchoring. Content blocks should float, overlap, and breathe — not sit in rows.

**Depth Layering**
Introduce z-axis hierarchy via parallax layers, sticky pinned elements that persist across sections, and overlapping panels with masked content reveals. On a light theme, depth is expressed through typography scale and spacing — not dark overlays.

**Section Cadence**
Reorder all content sections completely. The new sequence must follow emotional pacing — intrigue → proof → trust → action — rather than a standard service-listing structure.

**Spatial Breathing Room**
Use deliberate empty space as a design element. Large typographic anchors, partial image bleeds, fine ruled lines at `#d4d0c8` that span full viewport width.

**Viewport-First Thinking**
Design at 100vw / 100dvh units first. Each primary section should feel like a distinct scene — not a scrolled continuation of the same template.

---

## 03 — HERO SECTION ARCHITECTURE

| Component | Specification |
|---|---|
| Layout Type | Diagonal split-screen OR full-bleed white canvas with an off-axis Rive animation as the dominant element. No centered text over a background image. No dark overlays. |
| Visual Focal Point | A Rive state machine animation — an architectural line drawing that assembles on load, a building form that responds to mouse position, or a structural diagram that animates on scroll entry. White or near-white background. Ink-colored line work. |
| Typography Treatment | Hero headline oversized (clamp 60px–14vw), set in a geometric serif or high-contrast editorial typeface. Partially off-canvas or revealed via a Motion clip-path animation. Ink on white — no reversed text in the hero. |
| Entry Animation | Sequenced via Motion: canvas whites in (opacity 0→1, 200ms) → Rive animation begins playback → headline characters stagger in via Motion (stagger: 40ms/character) → subtext fades in (200ms delay) → CTA ascends (translateY 16px→0). Total ≤ 1.4s. |
| Scroll Indicator | A LottieFiles looping animation — a fine downward arrow, an architectural survey mark, or a scrolling coordinate indicator. Ink-colored, minimal, 24×24px max. |
| Mobile Adaptation | Hero recomposes to a stacked full-bleed white layout. Rive animation scales to fit or swaps to a simplified mobile state via state machine. Define both breakpoints explicitly. |

---

## 04 — VISUAL LANGUAGE SYSTEM

**Color System**
White canvas dominant. One structural tint. One ink-black. One structural accent (mid-tone neutral). One signal color. Five tokens total — nothing outside this system appears anywhere on the site.

**Typography Pairing**
Two fonts maximum. Display: a high-contrast editorial serif (Canela, Freight Display, Cormorant, or equivalent) with strong optical presence at large sizes. Body: a refined grotesque (Söhne, ABC Diatype, Neue Haas Grotesk, or equivalent). No Inter. No system fonts. Define named roles: display, heading, subheading, body, caption, label, mono.

**Surface Treatment**
On a light theme, surfaces are defined by ruled lines and spacing — not card shadows. Where containers are needed: a 1px `#d4d0c8` border, or a `#f4f2ee` tinted fill. No heavy box-shadows. No glass morphism on light backgrounds (it reads as blurry, not refined).

**Iconography**
No icon libraries. Bespoke SVG line marks at consistent 1.5px stroke-weight. Drawn at 24×24px grid. Architectural drafting vocabulary is the reference. For animated icons, build in Rive as interactive state machines (idle → hover → active states).

**Texture & Atmosphere**
One ambient texture sitewide: a very fine grain overlay at 3–4% opacity (SVG feTurbulence filter), or a hairline isometric grid at 2% opacity in the structural accent color. Applied globally via a fixed-position pseudo-element. Adds material quality without visual noise.

**Image Treatment**
Project photography: slight desaturation (saturate: 0.88) + very subtle warm tint applied via CSS filter as a custom property (`--img-filter`). All images feel editorial — not stock vibrant. On hover, filter eases to full saturation over 300ms via Motion.

---

## 05 — INTERACTION & MOTION SPECIFICATION

**On Load — Motion + Rive**
Motion orchestrates the DOM sequence. Rive begins hero animation playback after DOM paint. Use Motion's `staggerChildren` for content reveals. Easing: `[0.16, 1, 0.3, 1]` throughout. Max total duration: 1.4s.

**On Scroll — Motion**
`useInView` triggers per-element reveals: `translateY(20px)→0` + `opacity: 0→1`. `useScroll` + `useTransform` for parallax on background layers only — never on body copy. Scroll-linked Rive playback for timeline and process sections.

**On Hover — Rive + Motion**
Interactive icons: Rive state machines handle idle → hover → active transitions. Project cards: Motion `whileHover` scales image to 1.03, overlay label ascends 8px. Nav links: Motion animates an underline scaleX from 0→1. CTAs: Motion animates a background fill sliding in from the left edge in signal color.

**On Click / Tap — Motion**
`AnimatePresence` manages all mount/unmount transitions. Expandable panels: Motion `height` animation (0→auto) with no layout shift. Modals: opacity + scale (0.97→1) entry, backdrop blur 0→6px. Exit animations always present — nothing disappears without acknowledgment.

**Page Transitions — Motion**
`AnimatePresence` at the layout level. Exit: `opacity: 1→0` + `translateY: 0→-12px` over 250ms. Enter: `opacity: 0→1` + `translateY: 16px→0` over 300ms. Never a full-page fade-to-black on a light theme.

**Loading & Feedback States — LottieFiles**
Form submission success: a LottieFiles checkmark animation plays in the signal color. Error state: a LottieFiles shake/alert animation. Page section loading skeleton: a LottieFiles pulse loop. All Lottie files under 150kb, dotLottie format preferred.

**Cursor (Desktop)**
Motion-driven custom cursor: a small 10px ink-colored circle. On hover over interactive elements: scales to 32px with `border-radius: 50%` and `mix-blend-mode: multiply` (works correctly on white backgrounds). Over project images: transforms into a pill with "View" label. Follows mouse with 80ms lerp lag via Motion `useSpring`.

**Scroll Progress**
A 1px top-edge progress bar. Color: signal color. Width animated via Motion `useScroll` + `scaleX` transform on a full-width element. Hidden on mobile.

---

## 06 — CONTENT PRESENTATION PATTERNS

**Project Showcase**
Scroll-driven horizontal filmstrip (Motion `useScroll` + `useTransform` on x-axis) OR full-viewport stacked reveal where each project occupies 100dvh with a sticky Rive animation that transitions between project states. No 3-column thumbnail grids.

**Services / Capabilities**
Expandable accordion with Motion height animations, OR a tabbed lateral panel. Each tab/panel entry features a LottieFiles illustration specific to that service — not a static icon.

**Stats / Numbers**
Motion counter animations on scroll entry via `useInView`. Each stat paired with a Rive micro-animation — a structural diagram that builds, a bar that fills, a form that assembles.

**Testimonials / Social Proof**
No auto-play carousels. A single large-format quote with portrait. User-controlled: clicking next triggers a Motion crossfade (`AnimatePresence` with `mode="wait"`). No progress dots — use a text-based counter (01 / 06).

**Process / Timeline**
Scroll-driven horizontal timeline with Motion `useScroll`. Each phase marker triggers a small Rive animation when it enters the viewport — a pin drops, a line draws, a node activates.

**About / Team**
No static headshot grids. Hover-to-reveal via Motion `whileHover` — portrait opacity animates in, name and role ascend. Or a narrative long-scroll with inline portraits and a LottieFiles ambient element.

**Contact**
Split-panel: left side an animated site location / map element (Rive or LottieFiles), right side an inline form. Form success state plays a LottieFiles confirmation animation. No plain text email addresses displayed.

---

## 07 — TECHNICAL IMPLEMENTATION STANDARDS

**Performance**
Lighthouse ≥ 85 desktop, ≥ 70 mobile. Rive canvas elements must be sized explicitly — no layout-reflow on load. LottieFiles loaded lazily below the fold. Motion animations GPU-composited only — `transform` and `opacity` exclusively, never `top/left/width/height`.

**Animation Engine Rules**
Rive: `@rive-app/canvas` runtime, state machines only (no manual playback scrubbing in production). Motion: v11+ (motion.dev), not legacy Framer Motion API. LottieFiles: `@lottiefiles/dotlottie-web`, dotLottie format, under 150kb per file, lazy-loaded.

**Reduced Motion**
Every Rive, Motion, and Lottie animation must have a `prefers-reduced-motion` fallback. Motion: wrap in `useReducedMotion()` hook and provide static alternatives. Rive: pause at first frame. Lottie: display static poster frame.

**Responsive Breakpoints**
375px mobile, 768px tablet, 1280px desktop. Rive canvases must define explicit dimensions at each breakpoint. LottieFiles players must be responsive (percentage width, not fixed px).

**Accessibility**
WCAG 2.1 AA. All Rive and Lottie animations marked `aria-hidden="true"` if decorative, or given meaningful `aria-label` if they convey information. Focus states: 2px solid signal color offset outline on all interactive elements. Keyboard navigation fully functional with all Motion AnimatePresence transitions.

**CSS Architecture**
Design tokens as CSS Custom Properties — `--color-canvas`, `--color-ink`, `--color-accent-structural`, `--color-accent-signal`, `--color-tint`, `--img-filter`, `--font-display`, `--font-body`. No hard-coded values in component styles.

---

## 08 — HARD CONSTRAINTS — DO NOT VIOLATE

**NO** — Do not retain any section from the original in its current position. Every section must move, restructure, or be replaced.

**NO** — Do not use CSS transitions or keyframe animations where Rive, Motion, or LottieFiles are the specified tool. The animation stack is mandatory, not optional.

**NO** — Do not use a dark or gradient background. The theme is white and light neutral — full stop. No hero dark overlays, no footer that goes black, no dark-mode toggle unless explicitly requested later.

**NO** — Do not reuse similar UI patterns: no uniform icon-card grids, no centered-text hero over a background image, no split hero with an illustration pinned to the right.

**NO** — Do not replicate original color relationships. Hue, contrast role, and saturation must all change entirely.

**NO** — Do not use Inter, Roboto, or any system font. Typography is a primary differentiator — treat it accordingly.

**NO** — Do not use auto-play carousels, rotating banners, or generic sliders.

**NO** — Do not use stock icon libraries (Heroicons, Font Awesome, Material Icons, Phosphor). All icons are bespoke SVG or Rive-animated.

**NO** — Do not design mobile as an afterthought. If the desktop concept cannot gracefully adapt, the concept is invalid.

---

## 09 — END GOAL — THE EXPERIENCE BENCHMARK

The finished site must feel like **a white-walled architectural studio brought online** — not a website about architecture built from a template.

It must be:
- Spatially confident on a light, open canvas
- Every animation purposeful — Rive for intelligence, Motion for fluidity, Lottie for warmth
- Editorially deliberate in typography and image treatment
- Impossible to template-match or reverse-engineer to an original
- Forensically distinct — a lawyer and a designer both confirm no resemblance
- Memorable in under 8 seconds

---

*If the output still looks like the original, the problem is not the brief — it's emotional attachment to rectangles. Let them go. Start from the experience, not the layout.*