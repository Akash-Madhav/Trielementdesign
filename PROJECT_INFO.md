# SEED Engineering Website

A premium, multi-page website for SEED Engineering - a global MEP engineering consultancy.

## Features

### Design System
- **Color Palette**: Dark theme with gold accents (#C8972B)
- **Typography**: 
  - Display: Cormorant Garamond (serif, architectural)
  - Body: Inter (clean, modern)
  - Accents: JetBrains Mono (monospace for labels)
- **Animations**: Framer Motion for scroll reveals, page transitions, and hover effects
- **Custom Cursor**: Gold circular cursor that scales on interactive elements

### Pages

1. **Home** (`/`)
   - Hero section with animated "SEED" letters
   - Featured projects horizontal scroll
   - Animated statistics counter
   - Three philosophy sections (Design, Integrate, Sustain)
   - Partners marquee
   - Full-screen CTA

2. **About** (`/about`)
   - Split hero with animated SVG
   - Principles quote section
   - 3D tilt cards for commitments
   - Experience section
   - CSR initiatives

3. **Services** (`/services`)
   - Animated MEP schematic hero
   - Vertical tab navigation (desktop) / dropdown (mobile)
   - 7 service categories with detailed descriptions

4. **Projects** (`/projects`)
   - Filterable project grid
   - Filter by Scope, Location, and Sector
   - Active filter pills
   - Animated project cards

5. **Team** (`/team`)
   - Leadership cards with grayscale-to-color hover
   - Slide-up bio panel on hover
   - LinkedIn integration

6. **Partnerships** (`/partnerships`)
   - Global network grid
   - Infinite scrolling marquee
   - Philosophy quote
   - Benefits section

7. **Contact** (`/contact`)
   - 6 office locations with hover effects
   - Contact form with floating labels
   - Form validation and success state
   - Brochure download CTA

### Components

- **Navbar**: Glassmorphism sticky nav with scroll compression
- **Footer**: Dark footer with social links
- **CustomCursor**: Gold circular cursor with scale animation
- **ScrollReveal**: Reusable component for scroll-triggered animations
- **PageLoader**: Initial page load animation

### Interactions

- Scroll-triggered animations using Intersection Observer
- Parallax effects on hero sections
- Smooth page transitions
- Hover effects with shimmer sweeps
- 3D card tilts
- Infinite marquees
- Animated counters

## Tech Stack

- React 18
- React Router 7
- Framer Motion
- Tailwind CSS v4
- TypeScript
- Vite

## Design Philosophy

The website embodies SEED's tagline "Design. Integrate. Sustain." through:
- Sophisticated animations that feel engineered and precise
- Dark, premium aesthetic reflecting technical excellence
- Gold accents symbolizing quality and achievement
- Architectural references in typography and layouts
