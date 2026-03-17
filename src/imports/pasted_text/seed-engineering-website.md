You are an elite frontend engineer and UI/UX designer.

Build a complete, multi-page premium website for SEED Engineering — a global MEP engineering consultancy founded in 2005 with offices in Dubai, Singapore, Kochi, Bengaluru, Mumbai, and Gurugram.

SEED's tagline is: "Design. Integrate. Sustain."
Their philosophy is built on three pillars: Design (from whole to parts), Integrate (technology + human experience), Sustain (engineer for tomorrow).
They have 300+ projects, 20+ countries, 15+ sectors, $5Bn+ in project value, 50Mn+ sq ft designed.

---

## DESIGN SYSTEM

Color palette:
- Background primary: #0A0A0C (near black)
- Background secondary: #111116
- Surface: #16161E
- Accent / Gold: #C8972B (warm amber gold)
- Accent glow: rgba(200,151,43,0.15)
- Text primary: #F0EDE8 (warm off-white)
- Text muted: #8A8A9A
- Divider: rgba(255,255,255,0.07)

Typography:
- Display/Hero: "Cormorant Garamond" or "Playfair Display" — serif, editorial, architectural
- UI/Body: "Inter" or "DM Sans" — clean, modern, readable
- Monospace accents: "JetBrains Mono" — for labels, overlines, counters

Grid: 12-column fluid grid, max-width 1440px, 120px horizontal padding desktop, 24px mobile.

---

## GLOBAL INTERACTIONS

Navbar: Sticky glassmorphism navbar (backdrop-filter: blur(20px), background: rgba(10,10,12,0.7)). On scroll past 80px, compress padding with transition: all 0.4s ease. Logo left, nav links center, "Request a Quote" ghost-to-filled CTA right. Nav link hover: left-to-right animated underline (scaleX transform, transform-origin: left). Mobile: full-screen overlay menu, links stagger-animate in with 80ms delay each.

Cursor: Custom circular cursor that scales up (scale 2.5) on hover over links/CTAs with a slow trailing follow. Gold color.

Page transitions: Smooth page-level fade + upward translate when navigating between pages (opacity 0→1, translateY 20px→0, 400ms ease-out).

Scroll animations: All sections use IntersectionObserver. Elements enter with translateY(40px) opacity:0 → translateY(0) opacity:1 with 600ms ease-out, staggered 120ms between siblings.

---

## PAGE: HOME

### HERO SECTION
Full viewport (100vh). Background: deep dark with an animated SVG blueprint grid (fine white lines on dark, slow parallax on scroll at 0.3x speed). Subtle grain texture overlay (CSS noise filter). 

Center-aligned content:
- Overline: tiny tracked caps label — "GLOBAL ENGINEERING SERVICES & CONSULTANCY"
- H1: "SEED" — enormous, 16vw, Cormorant Garamond, letter-spacing: 0.25em. Each letter animates in with a heavy spring drop (staggered 100ms per letter, from translateY(-80px) opacity:0).
- Tagline below: "Design. Integrate. Sustain." — three words animate in left-to-right with a clip-path wipe (clip-path: inset(0 100% 0 0) → inset(0 0 0 0)), staggered 200ms each.
- Sub-copy: "Engineering the world's most iconic spaces — from concept to completion." — fades in after tagline.
- Two CTAs side by side: "VIEW PROJECTS" (gold fill, #C8972B) and "EXPLORE SERVICES" (ghost/outlined). CTAs have shimmer sweep on hover (::after pseudo-element translating from -100% to 100%).

Bottom ticker strip: frosted glass bar (backdrop-filter: blur(12px), background: rgba(255,255,255,0.04)) with partner logo names scrolling infinitely: WASL · TBC Bank · Commerz · Emaar · Hilton · Park Hyatt · Mandarin Oriental · Radisson · Marriott · Sobha · IMG Group.

### FEATURED PROJECTS SECTION
H2: "Explore Some of Our Work" — left-aligned.
Horizontal scroll container, 6 portrait cards (width: 340px, height: 520px). 
Cards: dark bg, project image fills top 70%, bottom 30% has project name + scope tag.
Scroll behavior: mouse-drag horizontal scroll on desktop, touch on mobile.
Card hover: translateY(-12px), image scale(1.03), bottom overlay slides up with "View Project →" text + arrow that animates right on hover.

Projects shown: Park Hyatt (Zanzibar), WASL Tower (Dubai), Mandarin JBR (Dubai), Commerz 3 (Dubai), IMG World (Dubai), Sunrise Bay (Dubai).

Below carousel: "VIEW MORE →" link with arrow animation.

### STATISTICS BAND
Full-width dark band. 5 stats in equal columns with thin vertical dividers.
Stats: 300+ Projects | 15+ Sectors | $5Bn Project Value | 50Mn+ Sq Ft Designed | 20+ Countries.
Each number animates from 0 to final value using requestAnimationFrame easing (easeOutExpo) when section enters viewport. Labels in muted text below.
Entry animation: band slides up from below, then numbers count up.

### PHILOSOPHY SECTION
3 scroll-snapped sections, each 100vh. Dark backgrounds with large translucent numerals (01, 02, 03) behind the content (font-size: 30vw, opacity: 0.04).

Section 1 — Design:
- Label: "01 · DESIGN"
- H3: "From Whole to Parts."
- Body: "Design governs the cost and performance of any project. Every engineer at SEED is empowered to consider the smallest of details — and their cascading impact at every level."

Section 2 — Integrate:
- Label: "02 · INTEGRATE"
- H3: "Technology Meets Human Experience."
- Body: "This step influences the efficiency and economics of operations. Promoting a blend of technology, keen observation and human experience enables seamless integration of each service into the system."

Section 3 — Sustain:
- Label: "03 · SUSTAIN"
- H3: "Built for Tomorrow."
- Body: "Transcend industry expectations by planning systems and technologies to last the test of time. Our designers tackle the challenge of not only meeting today's expectations, but foreseeing tomorrow's demands."

Transition: On scroll, text lines reveal via clip-path from bottom. Background number parallaxes at 0.5x speed. On desktop, subtle mouse parallax on the number.

### PARTNERS MARQUEE SECTION
Dark section, H2: "Globally Collaborative", body copy. Then double-row infinite marquee of architecture firm names (styled as text pills with outlined borders, not just logos). Marquee 1 scrolls left, marquee 2 scrolls right for visual depth. On hover: marquee pauses (animation-play-state: paused).

### CTA FULLSCREEN SECTION
100vh. Background: full-bleed architectural photography (a dramatic building at dusk/night, dark overlay 70% opacity). Parallax scroll on image at 0.4x.
Center content: 
- H2: "Begin Your Journey with SEED"
- Sub: "From feasibility to final handover — we engineer what others can only imagine."
- CTA: "REQUEST A QUOTE" — large gold button, shimmer sweep on hover.

---

## PAGE: ABOUT

### HERO
Split layout (50/50). Left: vertical centered text. Right: animated SVG of a building cross-section with animated system lines drawing in.
- Overline: "EST. 2005 · DUBAI"
- H1: "Engineering with Purpose"
- Body: "SEED Engineering Consultants was formed in 2005 with a vision to bridge the gap in building engineering and to positively impact the design of MEP Engineering Services worldwide."

### PRINCIPLES QUOTE
Full-width section. Large editorial quote (Cormorant Garamond, 3.5rem, italic):
"Sustainable & Energy-Efficient Design is not just our practice — it is our purpose."
Words reveal individually via clip-path on scroll.
Below: "Our sustainability group lends management and advisory services to Green Building projects across UAE and India."

### THE SEED COMMITMENT (3 cards)
H2: "The SEED Commitment"
Intro body: "Our experience across industries and sectors has led us to identify three key elements in the success of engineering in any project."
3 glass-morphism cards side by side:
- SERVICE: "We treat every client's challenge as our own. Our teams go beyond deliverables to provide consultative, proactive service."
- QUALITY: "Precision in every detail. Rigorous design review processes ensure every drawing and report meets the highest standard of technical excellence."
- UNDERSTANDING: "We deeply understand the unique context of each project — its geography, stakeholder goals, and long-term operational vision."
Card hover: 3D tilt (mouse-tracking perspective transform), glowing gold border traces card edge (animated gradient border).

### EXPERIENCE SECTION
Two columns. Left: Large display number "60+" with label "Design Professionals". Right: body copy about offices in Dubai, Kochi, Bangalore. Below: "Landmark projects in the Middle East, Africa and Indian sub-continent."

### CSR SECTION
Light section (slightly lighter background). H2: "Beyond Projects. Beyond Profits."
3 horizontal cards with icons:
- DFWAC: Dubai Foundation for Women & Children
- Pain & Palliative: Care Units, Kerala  
- Labour Welfare: Dubai Labour Camps
Footer: "To seek our support or learn more: contact@seedengineering.com"

---

## PAGE: SERVICES

### HERO
Dark hero with animated SVG MEP schematic — ducts, pipes, conduits illustrated as technical drawing, lines animate in sequentially.
- H1: "Our Services"
- Sub: "A comprehensive range of MEP Engineering and Sustainability practices covering every critical system in every type of building."

### SERVICE EXPLORER
Desktop: Left sticky vertical nav (tabs), right content panel.
Mobile: Accordion.

Tab navigation items: Mechanical | Electrical | Plumbing | Firefighting | Solar (Floating PV) | Sustainability | Associated Services

Each tab content panel:
- Service title (H3)
- Animated bullet list of sub-services (items stagger in on tab switch)
- Body paragraph
- A subtle illustration/icon representing that service discipline

Tab switch animation: content panel slides from right (translateX(30px) opacity:0 → translateX(0) opacity:1, 350ms ease-out). Active tab indicator: left gold bar (3px, height animated from 0 to 100% on active). Inactive tabs: muted, 60% opacity.

---

## PAGE: PROJECTS

### HERO
Full-width. Background: mosaic of 9 project images in a blurred grid, dark overlay 80%. 
- H1: "Our Work"
- Sub: "300+ projects across 20+ countries — shaping skylines and communities."
- Stats strip below: Projects | Countries | Sectors

### FILTER BAR
Sticky bar below hero on scroll. Three filter dropdowns: Scope (MEP Design, Peer Review, Supervision) | Location (UAE, India, Africa, etc.) | Sector (Hospitality, Residential, Commercial, Education, Healthcare, Retail, Sports, etc.) | Reset button.
Dropdown opens with smooth max-height expand + opacity. Selected filters shown as dismissible pill chips.

### PROJECT GRID
3-column masonry grid (or even grid with `grid-auto-rows`). Cards: image top, name + scope tag below.
On filter change: filtered-out cards fade out + scale(0.95), matching cards fade in staggered.
Card hover: image scale(1.05) inside overflow:hidden container, dark gradient overlay slides up from bottom, scope label + "View Project →" arrow appear.

On card click → project detail page with large hero image, project name, scope, location, description.

### PROJECTS IN FOCUS
Horizontal featured row at bottom, 6 cards same as homepage.

---

## PAGE: TEAM

### HERO
- H1: "Our People"
- Sub: "Our people are our roots — the foundation on which we are built. Our leadership brings an uncanny sense of quality and adherence to effective service delivery."

### LEADERSHIP GRID
3-column desktop. Each card: portrait photo (full height, grayscale default), name overlay at bottom, role.
Hover: photo transitions to full-color (filter: grayscale(1) → grayscale(0), 400ms), a slide-up panel reveals role + bio excerpt + LinkedIn icon.

**Sanu Mathew · Managing Director**
"30 years of experience in Building Services Design, Site Supervision, and Project Management. As a founding member, Sanu inspires the team through his passion for excellence and sustainable design."

**Anand Krishnan · Director**
"Chartered Engineer with 36 years of experience. Anand nurtures key client relationships and mentors the team to the highest levels of technical competency and self-reliance."

**Sankar N. Menon · Director**
"Senior Mechanical Engineer with over 53 years of professional experience. Sankar heads SEED's Kochi operations, bringing unparalleled depth of knowledge in MEP systems."

---

## PAGE: PARTNERSHIPS

### HERO
- H1: "Globally Collaborative"  
- Sub: "Sowing the seeds of a shared future."
- Body: "SEED has associated with major international architects and consultants, enabling streamlined design processes and innovative concepts based on the latest global trends."

### PARTNER LOGOS
Clean light-on-dark grid. Each logo: grayscale on default, full opacity + lift on hover. 

### PHILOSOPHY QUOTE BAND
Full-width dark band:
"Every great building begins with a great collaboration. At SEED, partnerships are not transactions — they are long-term relationships built on shared excellence."

---

## PAGE: CONTACT

### HERO
- H1: "Let's Build Something Exceptional"
- Sub: "Reach out to us at contact@seedengineering.com"

### OFFICE CARDS GRID
6 cards in 3-column grid. Each: city name as large display text, full address, phone number.
Dubai | Singapore | Kochi | Bengaluru | Mumbai | Gurugram
Card hover: gold left border appears, subtle background brightens.

### CONTACT FORM
Clean dark form. Fields: Name · Phone · Email · Country (searchable dropdown) · Nature of Query · Message.
Submit button: "SEND MESSAGE" — gold fill, shimmer on hover, on submit: loading state then success message (checkmark animates in with spring).
Form fields: on focus, label floats up (floating label pattern), gold underline appears.

### BROCHURE SECTION
Full-width dark band:
"Get to know SEED Engineering through its 40+ industry-leading projects."
CTA: "DOWNLOAD BROCHURE" button.

---

## FOOTER
Dark footer.
Left: SEED logo + "Design. Integrate. Sustain." tagline.
Center: Nav links (About · Services · Projects · Team · Partnerships · News · Contact).
Right: Social icons (Facebook, YouTube, LinkedIn, Instagram) — hover: scale(1.2) + gold glow.
Bottom strip: "© SEED Engineering 2005–2026. All Rights Reserved."
Social icon hover animation: slight bounce + icon turns gold.

---

## TECHNICAL IMPLEMENTATION NOTES

- Use React with Tailwind CSS
- Use Framer Motion for all scroll animations, page transitions, and hover effects
- Use GSAP (via CDN) for the hero letter animation and counter animations
- Custom cursor: implemented as a div that follows mousemove with lerp smoothing
- Fonts: load via Google Fonts — Cormorant Garamond (300, 400, 600 italic), Inter (400, 500, 600)
- All images: use high-quality architectural stock images from Unsplash (search: "skyscraper architecture dark", "MEP engineering", "luxury hotel architecture")
- Ensure full mobile responsiveness at 375px, 768px, 1024px, 1440px breakpoints
- Lighthouse performance target: 90+ (lazy load all images, use next/image or loading="lazy")
- Accessibility: all interactive elements have aria-labels, keyboard navigation supported

Build the entire website as a single-page React app with react-router for navigation between pages.