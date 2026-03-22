WEBSITE REDESIGN SPECIFICATION PROMPT
Legal Clearance Edition — v3.0 Liquid Glass
Full Redesign Liquid Glass UI Motion-First Zero Resemblance Constraint Light Theme

OBJECTIVE
Redesign the existing website around a single, unified design language: Liquid Glass. Every surface, component, and transition must express this material — not as a decorative flourish applied on top of a standard layout, but as the foundational logic the entire interface is built from. Glass is not a style choice here. It is the architecture.
The theme is light, white, and luminous. Glass reads best against light — translucency, refraction, and depth only work when there is light passing through. The background is always bright. The glass surfaces float above it.

00 — ANIMATION STACK (MANDATORY)
All motion is produced exclusively through:
Rive
All stateful, interactive animations. Hero entry sequences, hover-triggered state machines, scroll-linked playback, glass morphing transitions between states. The glass material itself — the way it reacts, refracts, and responds — is authored in Rive. Export as .riv, embed via @rive-app/canvas.
Motion (motion.dev)
All DOM-level transitions. Page entries, scroll-triggered reveals, layout shifts, gesture interactions, glass panel sliding and floating animations. Use useScroll, useTransform, useSpring, useInView, and AnimatePresence throughout. Glass panels enter, exit, and reposition exclusively through Motion.
LottieFiles
Lightweight looping ambience, feedback states, and decorative liquid motion elements. A slow liquid shimmer looping behind a hero glass panel. A ripple feedback on form submission. A fluid fill animation on CTA hover. Embed via @lottiefiles/dotlottie-web, dotLottie format, under 150kb per file.
Tool Assignment:
Use CaseToolGlass material state machine (hover, focus, active)RiveGlass panel entry / exit / repositioningMotionLiquid shimmer / ambient background motionLottieFilesHero focal point interactive animationRiveScroll-triggered glass revealsMotionCTA liquid fill on hoverLottieFiles or MotionForm feedback (success ripple, error shake)LottieFilesPage transitions with glass wipeMotionAnimated bespoke iconsRive

01 — LIQUID GLASS DESIGN LANGUAGE
This is the single most important section. Every decision flows from here.
What Liquid Glass Is
Liquid Glass is a material UI paradigm where interface surfaces behave like real glass — they are translucent, they refract light from behind, they have physical edge highlights, they respond to motion with fluid, organic deformation. The "liquid" modifier means the glass is not static or rigid: it breathes, it shifts, it reacts to user input as if it has surface tension.
The Glass Material — Technical Specification
Every glass surface must be built with all of the following properties applied consistently:
background: rgba(255, 255, 255, 0.45)
backdrop-filter: blur(24px) saturate(1.8) brightness(1.05)
-webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.05)
border: 1px solid rgba(255, 255, 255, 0.75)
border-bottom: 1px solid rgba(255, 255, 255, 0.35)
border-right: 1px solid rgba(255, 255, 255, 0.35)
box-shadow:
  0 2px 8px rgba(0, 0, 0, 0.04),
  0 8px 32px rgba(0, 0, 0, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.9),
  inset 0 -1px 0 rgba(255, 255, 255, 0.2)
border-radius: 20px
This is the base. Every glass variant — cards, nav, modals, CTAs, inputs — inherits from this and adjusts only what is necessary.
Glass Variants

Heavy Glass — blur(40px), rgba(255,255,255,0.6) fill. Used for modals, overlays, primary CTAs. Maximum frosting.
Standard Glass — blur(24px), rgba(255,255,255,0.45) fill. Used for cards, panels, nav bar.
Thin Glass — blur(12px), rgba(255,255,255,0.25) fill. Used for tags, badges, secondary UI elements.
Liquid Glass — Standard glass base + a subtle animated inner highlight that shifts on mouse move, simulating light refraction through a curved glass surface. Achieved via a radial-gradient pseudo-element that follows the cursor using Motion useMotionValue.

The Refraction Highlight
Every primary glass surface has a moving inner light source — a ::before pseudo-element with:
background: radial-gradient(ellipse at var(--x) var(--y),
  rgba(255,255,255,0.6) 0%,
  transparent 60%)
Where --x and --y are updated on mousemove via JavaScript. This is what makes glass feel liquid — the specular highlight moves with the viewer.
Edge Lighting
All glass panels have a top-left edge highlight simulating a light source from above-left. Achieved via inset 0 1px 0 rgba(255,255,255,0.9) on box-shadow. The bottom and right edges are slightly darker — inset 0 -1px 0 rgba(255,255,255,0.2) — simulating shadow on the underside of the glass.
Background Requirement
Liquid Glass only works with a rich background beneath it. The background must not be plain white. It must contain:

Soft, large-radius color blobs in very muted tones (architectural warm greys, pale sage, stone) rendered as blurred radial gradients
A LottieFiles slow-moving liquid gradient animation at very low opacity (8–12%)
A fine grain texture overlay (SVG feTurbulence at 3% opacity)

The glass surfaces float above this background. The background provides the depth the glass refracts.
The Liquid Behavior
On hover, glass surfaces must exhibit liquid physics — not just a color change. Implement via Motion:

Panel slightly scales up: scale: 1 → 1.02
Inner highlight shifts toward cursor position
Border opacity increases: rgba(255,255,255,0.75) → rgba(255,255,255,0.95)
Box shadow deepens: outer shadow increases blur radius from 32px → 48px
backdrop-filter blur increases: 24px → 32px via CSS transition on the filter property

On mouse leave, all values spring back via Motion useSpring with stiffness: 200, damping: 28.

02 — LAYOUT ARCHITECTURE
Everything Floats
No element sits flush with the viewport edge at the background level. All content lives inside glass panels that float above the background layer. The background is always visible at the edges, in gaps between panels, and through the panels themselves.
Layered Depth System
Three depth layers, always maintained:

Layer 0 — Background: Animated gradient blobs + grain texture + LottieFiles ambient motion
Layer 1 — Structural Glass: Navigation bar, section containers, hero panel
Layer 2 — Content Glass: Cards, project panels, testimonial blocks, form fields
Layer 3 — Interactive Glass: Modals, tooltips, hover states, dropdowns

Each layer has a defined blur value — deeper layers blur more, higher layers blur less. This creates true optical depth.
Hybrid Scroll System
Mixed-axis layout. Sections alternate between vertical narrative flow and horizontal glass panel reveals (Motion useScroll + useTransform on x-axis). No two consecutive sections share the same scroll behavior.
Asymmetric Panel Grid
Glass panels arranged in a named-area CSS Grid. Panels of different sizes, overlapping at edges, with visible background bleeding between them. No uniform card grids. No equal-height rows.
Section Cadence
Emotional pacing sequence: intrigue → proof → trust → action. Each section is a distinct glass scene — different panel density, different background tone, different glass weight.

03 — HERO SECTION
Canvas
Full-viewport white-to-light-warm-grey background. Two or three large blurred color blobs (CSS radial-gradient) shift slowly via LottieFiles animation — this is what the hero glass panels refract. The blobs are the light source.
Focal Point
A Rive state machine animation inside a Heavy Glass panel. An architectural form — a building wireframe assembling line by line, a structural diagram that fills in on load, or a fluid 3D form rotating slowly. The Rive canvas sits inside the glass panel with the panel's backdrop-filter applying to content behind it.
Hero Glass Panel Layout
Diagonal or asymmetric split. One large Heavy Glass panel occupying 55% of the viewport, offset to the right. Headline and subtext to the left, partially overlapping the panel edge. Not centered. Not symmetric.
Typography
Oversized editorial serif headline — clamp(60px, 12vw, 120px). Ink-black on the white background side. Where text overlaps glass, it remains readable via the glass panel's own lightening effect. No text on a dark background anywhere in the hero.
Entry Sequence — Motion + Rive

Background blobs fade in (0→1, 400ms, ease-out)
LottieFiles ambient shimmer begins at 8% opacity
Hero glass panel slides in from bottom (translateY 40px→0, opacity 0→1, 600ms, cubic-bezier(0.16,1,0.3,1))
Rive animation begins playback inside panel
Headline characters stagger in (Motion, 40ms/character)
Subtext fades in (200ms delay)
CTA glass button ascends (translateY 16px→0)
Total: ≤ 1.6s

Scroll Indicator
LottieFiles looping animation — a fluid downward ripple or a liquid drop forming and falling. Ink-toned, 28×28px, positioned at bottom center of hero.

04 — NAVIGATION
Glass Nav Bar
Standard Glass variant. Full-width, position: sticky, top: 0. Blur increases from 12px to 24px as user scrolls past 80px — transitions via Motion useScroll + useTransform. On initial load, nav is Thin Glass. After scroll threshold, it becomes Standard Glass.
Nav Links
On hover: a Thin Glass pill morphs in behind the hovered link — border-radius: 100px, appears via Motion scale: 0.8→1 + opacity: 0→1 with spring physics.
CTA in Nav
Heavy Glass button. The signal color appears as a very subtle tint inside the glass fill — rgba(signal-color, 0.12) — not a solid colored button. Border is rgba(signal-color, 0.4). On hover, the Rive state machine transitions to an active state with increased border opacity and inner highlight shift.
Mobile Nav
On mobile, nav collapses to a glass panel that slides in from the top — Motion AnimatePresence with a clip-path reveal from inset(0 0 100% 0) to inset(0 0 0% 0). Full-screen Heavy Glass overlay with blur(40px).

05 — VISUAL LANGUAGE SYSTEM
Color System — Five Tokens Only

--color-canvas: #fafaf8 warm white — page background base
--color-ink: #111110 near-black — all primary text and SVG strokes
--color-structural: rgba(200,195,188,0.6) — ruled lines, grid marks, dividers
--color-signal: one deliberate choice (deep terracotta #c4613a, or precise cobalt #2d5be3, or architectural sage #4a6741) — interactive states only
--color-glass-fill: rgba(255,255,255,0.45) — base glass fill, adjusted per variant

Nothing outside these five tokens appears anywhere on the site.
Typography
Display: high-contrast editorial serif — Canela, Cormorant Display, or freight-display-pro. Body: refined grotesque — Söhne, ABC Diatype, or Neue Haas Grotesk. No Inter. No system fonts. Named scale: display / heading / subheading / body / caption / label / mono.
Iconography
Bespoke SVG line marks, 1.5px stroke, 24×24px grid, architectural drafting vocabulary. Animated icons built in Rive with idle / hover / active state machines. No icon libraries.
Texture
One global grain overlay: SVG feTurbulence filter at 3% opacity, position: fixed, pointer-events: none, z-index: 9999. Adds material quality to all glass surfaces without interfering with interactions.

06 — INTERACTION & MOTION SPECIFICATION
Glass Hover Physics — Motion + Rive
All glass surfaces respond to hover with liquid physics. Motion useMotionValue tracks cursor position relative to each panel. useTransform maps cursor to --x / --y CSS variables that drive the refraction highlight pseudo-element. Rive state machine handles the material state transition (idle → hovered → pressed).
Scroll Reveals — Motion
useInView triggers glass panels sliding up from translateY(32px) to 0 with opacity: 0→1. Panels in the same section stagger by 80ms. Easing: [0.16, 1, 0.3, 1] always.
Page Transitions — Motion
AnimatePresence at layout level. Exit: current page glass panels scatter — each panel exits with a slight scale: 1→0.96 + opacity: 1→0 with randomized translateY offsets (−8px to −20px), stagger 30ms. Enter: new page glass panels assemble from translateY: 20px→0 + opacity: 0→1, stagger 40ms.
Glass Morphing — Motion
When layout changes (tab switch, accordion open, filter change), glass panels morph using Motion's layout prop. Panels physically animate to their new position, size, and shape. Border-radius transitions included. No hard jumps.
Liquid Fill CTA — LottieFiles or Motion
On CTA hover: a liquid fill rises from the bottom of the glass button — LottieFiles animation playing forward on hover, reversing on mouse leave. Fill color is signal color at 15% opacity inside the glass.
Feedback States — LottieFiles
Form success: a fluid ripple emanates from the submit button, then a checkmark assembles in the signal color. Error: a liquid shake animation. Both under 120kb, dotLottie format.
Custom Cursor — Motion
A 12px glass circle — border: 1px solid rgba(255,255,255,0.8), backdrop-filter: blur(4px), background: rgba(255,255,255,0.3). Follows mouse via Motion useSpring (stiffness: 500, damping: 40). Over interactive glass surfaces: expands to 40px. Over project images: transforms into a glass pill with "View" label. mix-blend-mode: normal on light background.

07 — CONTENT PRESENTATION PATTERNS
Project Showcase
Each project lives inside a Standard Glass panel. Panels arranged in an asymmetric overlapping grid. On hover: panel elevates (box-shadow deepens, scale 1.02), glass blur increases, project title and category ascend from bottom inside the panel. No static image thumbnails without glass treatment.
Services
Glass accordion. Each service row is a Thin Glass panel. On expand: panel morphs to Standard Glass (Motion layout animation), interior content reveals via height: 0→auto with Motion. A LottieFiles illustration specific to the service plays on expand.
Stats
Each stat inside a Heavy Glass panel. Motion counter animation on scroll entry. Rive micro-animation behind the number — a structural form building, a line filling. Glass panels for stats are arranged asymmetrically, not in a row.
Testimonials
One large Heavy Glass panel occupying 70% of viewport width. Quote in large display serif. Portrait in a circular glass frame with border: 1px solid rgba(255,255,255,0.75). User navigates via glass arrow buttons. Motion AnimatePresence mode="wait" crossfade between quotes.
Process / Timeline
Scroll-driven horizontal timeline. Each phase marker is a Thin Glass node. As user scrolls, Motion useScroll drives the active state — the current node morphs to Standard Glass, Rive animation plays (a pin drops, a line extends). Past nodes remain Thin Glass. Future nodes at 40% opacity.
Contact
Split panel. Left: a LottieFiles animated location/map illustration inside a Standard Glass panel. Right: a Heavy Glass form panel. All inputs are Thin Glass — backdrop-filter: blur(8px), border: 1px solid rgba(255,255,255,0.5). On focus, input transitions to Standard Glass with Motion spring animation on border opacity and blur value.

08 — TECHNICAL IMPLEMENTATION STANDARDS
Performance
Lighthouse ≥ 85 desktop, ≥ 70 mobile. backdrop-filter is GPU-composited — ensure glass elements are on their own compositing layer via will-change: transform. Limit simultaneous active backdrop-filter elements to ≤ 8 on screen at any time — more causes GPU thrash.
Glass Performance Budget
No more than 12 glass panels visible simultaneously on desktop, 6 on mobile. Panels outside the viewport must have backdrop-filter removed via IntersectionObserver — it costs GPU even when off-screen.
Animation Engine
Rive: @rive-app/canvas, state machines only. Motion: v11+ (motion.dev). LottieFiles: @lottiefiles/dotlottie-web, dotLottie format, ≤150kb, lazy-loaded below fold.
Reduced Motion
prefers-reduced-motion: Rive pauses at first frame, Motion removes all translateY/scale animations (opacity-only fallback), LottieFiles displays static poster frame. Glass surfaces retain their visual appearance but do not animate.
Browser Support
backdrop-filter requires -webkit- prefix for Safari. Test on Safari 16+, Chrome 108+, Firefox 103+. Firefox backdrop-filter support requires layout.css.backdrop-filter.enabled flag check — provide a graceful fallback: background: rgba(255,255,255,0.85) with no blur for non-supporting browsers, detected via @supports (backdrop-filter: blur(1px)).
Accessibility
WCAG 2.1 AA. All glass panels with text must achieve 4.5:1 contrast ratio against the blurred background behind them — test at the lowest backdrop brightness the glass will ever sit over. All Rive and Lottie animations aria-hidden="true" if decorative. Focus states: a 2px solid signal-color outline, outline-offset: 4px, visible through glass surfaces.
CSS Architecture
All glass properties as CSS Custom Properties:
--glass-fill: rgba(255,255,255,0.45)
--glass-blur: 24px
--glass-saturate: 1.8
--glass-border: rgba(255,255,255,0.75)
--glass-shadow-outer: rgba(0,0,0,0.06)
--glass-radius: 20px
--glass-highlight: rgba(255,255,255,0.9)
Variants override only the properties they change — everything else inherits.

09 — HARD CONSTRAINTS — DO NOT VIOLATE
NO — Do not apply glass as decoration on top of an otherwise standard layout. Glass is the layout. Every surface is glass or background — nothing in between.
NO — Do not use solid colored backgrounds for any panel, card, or container. If it contains content, it is glass.
NO — Do not use plain white as a background without the animated gradient blob layer beneath it. Flat white kills the glass effect entirely.
NO — Do not use CSS transitions or keyframe animations where Rive, Motion, or LottieFiles are specified. The animation stack is mandatory.
NO — Do not use dark mode, dark overlays, or any element that introduces a dark background surface. Light theme, always.
NO — Do not use Inter, Roboto, or any system font. Typography is a primary differentiator.
NO — Do not use icon libraries. All icons are bespoke SVG or Rive-animated.
NO — Do not use auto-play carousels or rotating banners.
NO — Do not add glass as a hover effect only — it is the resting state of every surface.
NO — Do not use more than 12 active glass panels simultaneously on desktop. Manage GPU budget strictly.
NO — Do not design mobile as an afterthought. Every glass panel must have an explicit mobile composition defined.

10 — END GOAL — THE EXPERIENCE BENCHMARK
The finished site must feel like walking through a building made entirely of glass — light passing through every surface, depth visible at every layer, the structure itself transparent and honest about what it contains.
Every interaction must feel like touching real glass — it responds, it refracts, it has weight and temperature.
It must be:

Every surface a glass panel — no exceptions
Light pouring through from behind — the background is always alive
Motion that obeys liquid physics — not snappy, not bouncy, fluid
Depth that is optical, not decorative — you see through, not around
Impossible to template-match — no Dribbble reference will match this
Forensically distinct from the original — legally and visually unrecognizable
Memorable in under 5 seconds — the material alone is the differentiator

