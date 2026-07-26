# The Fusion Club Website

Official website of **The Fusion Club**.
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![License](https://img.shields.io/badge/License-MIT-green)

# Fusion Starter

A production-ready full-stack React application with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

This project uses a React + Express architecture.

The Express server should only be used when backend functionality is required, such as authentication, database operations, API integrations, or handling sensitive credentials.

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3, plugins and animation + shadcn/ui style component set 
- **Backend**: Express server integrated with the Vite development server (currently includes only demo routes).
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons
- **Animations**: GSAP, Lenis, Framer Motion, Three.js, Lottie, DotLottie, Embla Carousel, Lordicon
- **Development**: Vite, Vitest, ESLint, Prettier

## Getting Started

### Clone the repository

```bash
git clone https://github.com/THE-FusionClub/Thefusionclub-website.git
cd Thefusionclub-website
```

### Install dependencies

**Recommended (pnpm)**

```bash
pnpm install
```

**Or using npm**

```bash
npm install
```

### Start the development server

**Using pnpm**

```bash
pnpm dev
```

**Or using npm**

```bash
npm run dev
```

After the server starts, open the local URL shown in your terminal (typically `http://localhost:5173`).

## Preview

[host at netlify with domain .xyz](https://thefusionclub.xyz/)

![Home Page](public/assets/preview/h-1.png)
![Community Page](public/assets/preview/c-1.png)

## Project Structure

   Thefusionclub-website/
   ├─ .gitignore
   ├─ .npmrc
   ├─ .prettierrc
   ├─ components.json
   ├─ eslint.config.js
   ├─ index.html
   ├─ LICENSE
   ├─ package-lock.json
   ├─ package.json
   ├─ pnpm-lock.yaml
   ├─ postcss.config.js
   ├─ README.md
   ├─ tailwind.config.ts
   ├─ tsconfig.json
   ├─ vite.config.server.ts
   ├─ vite.config.ts
   │
   ├─ client/
   │  ├─ App.tsx                          # Root component with React Router routes
   │  ├─ global.css                       # Global TailwindCSS styles
   │  ├─ global-intro.css                 # Global intro/animation styles
   │  ├─ vite-env.d.ts                    # Vite TypeScript declarations
   │  │
   │  ├─ assets/
   │  │  ├─ logo.png                      # App logo
   │  │  ├─ M4iFOW10Xd.lottie            # Lottie shapes for Events Hero section
   │  │  ├─ team.lottie                   # Team Lottie animation
   │  │  └─ dragon/dragon.png             # Dragon cursor sprite
   │  │
   │  ├─ components/
   │  │  ├─ animations/
   │  │  │  └─ AnimatedCounter.tsx        # Scroll-triggered animated counter
   │  │  │
   │  │  ├─ icons/
   │  │  │  └─ LordiconSolid.tsx          # Lordicon solid icon components
   │  │  │
   │  │  ├─ layout/
   │  │  │  ├─ DragonCursor/
   │  │  │  │  ├─ DragonCursor.css
   │  │  │  │  ├─ DragonCursor.module.css
   │  │  │  │  └─ DragonCursor.tsx        # Custom dragon cursor effect
   │  │  │  │
   │  │  │  ├─ Footer/
   │  │  │  │  ├─ Footer.css
   │  │  │  │  ├─ Footer.module.css
   │  │  │  │  └─ Footer.tsx             # Site-wide footer
   │  │  │  │
   │  │  │  ├─ IntroCinematic/
   │  │  │  │  ├─ IntroCinematic.css
   │  │  │  │  ├─ IntroCinematic.module.css
   │  │  │  │  └─ IntroCinematic.tsx     # GSAP intro animation sequence
   │  │  │  │
   │  │  │  └─ Navbar/
   │  │  │     ├─ Navbar.css
   │  │  │     ├─ Navbar.module.css
   │  │  │     └─ Navbar.tsx             # Responsive navigation bar
   │  │  │
   │  │  ├─ shared/
   │  │  │  └─ ScrollProgress.tsx        # Scroll progress indicator
   │  │  │
   │  │  └─ ui/                          # shadcn/ui Radix primitives
   │  │     ├─ accordion.tsx
   │  │     ├─ alert-dialog.tsx
   │  │     ├─ alert.tsx
   │  │     ├─ aspect-ratio.tsx
   │  │     ├─ avatar.tsx
   │  │     ├─ badge.tsx
   │  │     ├─ breadcrumb.tsx
   │  │     ├─ button.tsx
   │  │     ├─ calendar.tsx
   │  │     ├─ card.tsx
   │  │     ├─ carousel.tsx
   │  │     ├─ chart.tsx
   │  │     ├─ checkbox.tsx
   │  │     ├─ collapsible.tsx
   │  │     ├─ command.tsx
   │  │     ├─ context-menu.tsx
   │  │     ├─ dialog.tsx
   │  │     ├─ drawer.tsx
   │  │     ├─ dropdown-menu.tsx
   │  │     ├─ form.tsx
   │  │     ├─ hover-card.tsx
   │  │     ├─ Icons.tsx                 # Lordicon-powered icon components
   │  │     ├─ input-otp.tsx
   │  │     ├─ input.tsx
   │  │     ├─ label.tsx
   │  │     ├─ LiquidEther.css
   │  │     ├─ LiquidEther.module.css
   │  │     ├─ LiquidEther.tsx           # Liquid ether Three.js effect
   │  │     ├─ menubar.tsx
   │  │     ├─ navigation-menu.tsx
   │  │     ├─ pagination.tsx
   │  │     ├─ popover.tsx
   │  │     ├─ progress.tsx
   │  │     ├─ radio-group.tsx
   │  │     ├─ resizable.tsx
   │  │     ├─ scroll-area.tsx
   │  │     ├─ select.tsx
   │  │     ├─ separator.tsx
   │  │     ├─ sheet.tsx
   │  │     ├─ sidebar.tsx
   │  │     ├─ skeleton.tsx
   │  │     ├─ slider.tsx
   │  │     ├─ sonner.tsx
   │  │     ├─ switch.tsx
   │  │     ├─ table.tsx
   │  │     ├─ tabs.tsx
   │  │     ├─ textarea.tsx
   │  │     ├─ toast.tsx
   │  │     ├─ toaster.tsx
   │  │     ├─ toggle-group.tsx
   │  │     ├─ toggle.tsx
   │  │     ├─ tooltip.tsx
   │  │     └─ use-toast.ts
   │  │
   │  ├─ hooks/
   │  │  ├─ use-mobile.tsx               # Mobile breakpoint hook
   │  │  ├─ use-toast.ts                 # Toast notification hook
   │  │  └─ usePrefersReducedMotion.ts   # Accessibility motion preference hook
   │  │
   │  ├─ lib/
   │  │  ├─ utils.spec.ts                # Unit tests for utils
   │  │  └─ utils.ts                     # Utility helpers (cn, etc.)
   │  │
   │  ├─ pages/
   │  │  ├─ About.tsx                    # About page wrapper (Navbar + Footer)
   │  │  ├─ Community.css                # Standalone community styles (legacy)
   │  │  ├─ Community.tsx                # Standalone community page (legacy)
   │  │  ├─ Index.tsx                    # Home page (Hero + sections)
   │  │  ├─ NotFound.tsx                 # 404 page
   │  │  │
   │  │  ├─ about/
   │  │  │  ├─ about-patch.css
   │  │  │  ├─ about-patch.module.css
   │  │  │  ├─ about.css
   │  │  │  ├─ responsive.css
   │  │  │  ├─ About.tsx                 # About main content (sections composition)
   │  │  │  ├─ components/
   │  │  │  │  └─ FloatingObject.tsx     # Floating abstract 3D object
   │  │  │  ├─ hooks/
   │  │  │  │  └─ useSmoothScroll.ts     # Lenis smooth scroll hook
   │  │  │  └─ sections/
   │  │  │     ├─ BentoSection.tsx       # Feature highlights bento grid
   │  │  │     ├─ CTASection.tsx         # Call-to-action section
   │  │  │     ├─ GallerySection.tsx     # Image gallery
   │  │  │     ├─ HeroSection.tsx        # Hero with parallax
   │  │  │     ├─ ImpactSection.tsx      # Impact statistics (commented out)
   │  │  │     ├─ LeadershipSection.tsx  # Leadership team message
   │  │  │     ├─ PhilosophySection.tsx  # Core philosophy (dark section)
   │  │  │     ├─ StorySection.tsx       # Who We Are story
   │  │  │     ├─ TimelineSection.tsx    # Timeline (commented out)
   │  │  │     └─ ValuesSection.tsx      # Core values horizontal scroll
   │  │  │
   │  │  ├─ community/
   │  │  │  ├─ Community.css             # Community page styles
   │  │  │  ├─ Community.tsx             # Community wrapper (Navbar + Footer)
   │  │  │  ├─ CommunityPage.tsx         # Community main content composition
   │  │  │  └─ sections/
   │  │  │     ├─ BentoSection.tsx       # "Why Join TFC" bento grid
   │  │  │     ├─ CTASection.tsx         # Join community CTA
   │  │  │     ├─ FeaturedStories.tsx    # Featured stories carousel
   │  │  │     ├─ GallerySection.tsx     # Photo gallery with modal
   │  │  │     ├─ HeroSection.tsx        # Community hero header
   │  │  │     ├─ LeadershipSection.tsx  # Team leaders showcase
   │  │  │     ├─ ManifestoSection.tsx   # Community philosophy manifesto
   │  │  │     ├─ PartnersSection.tsx    # Partner logos marquee
   │  │  │     ├─ SocialWall.tsx         # Social media posts wall (commented out)
   │  │  │     ├─ StatsSection.tsx       # Community stats (commented out)
   │  │  │     ├─ Testimonials.tsx       # Member testimonials carousel
   │  │  │     └─ TimelineSection.tsx    # Journey timeline (commented out)
   │  │  │
   │  │  ├─ events/
   │  │  │  ├─ data.ts                   # Events data, FAQ, filters, timeline
   │  │  │  ├─ EventsPage.tsx            # Events page (Navbar + Footer + sections)
   │  │  │  ├─ components/
   │  │  │  │  └─ EventIcon.tsx          # Event type icon component
   │  │  │  └─ sections/
   │  │  │     ├─ CTA.tsx                # Call-to-action section
   │  │  │     ├─ EventGrid.tsx          # Filterable event grid
   │  │  │     ├─ EventTimeline.tsx      # Event timeline view
   │  │  │     ├─ FAQ.tsx                # FAQ accordion section
   │  │  │     ├─ FeaturedEvent.tsx      # Featured event highlight
   │  │  │     ├─ Gallery.tsx            # Event image gallery
   │  │  │     ├─ HeroSection.tsx        # Events page hero
   │  │  │     ├─ SectionTitle.tsx       # Animated section title
   │  │  │     ├─ Statistics.tsx         # Event statistics (commented out)
   │  │  │     └─ UpcomingEvents.tsx     # Upcoming events list
   │  │  │
   │  │  ├─ home/
   │  │  │  └─ sections/
   │  │  │     ├─ CommunityHighlights/
   │  │  │     │  ├─ CommunityHighlights.css
   │  │  │     │  ├─ CommunityHighlights.tsx
   │  │  │     │  └─ CommunityHighlightsBackgroundCarousel/
   │  │  │     │     ├─ CommunityHighlightsBackgroundCarousel.css
   │  │  │     │     ├─ CommunityHighlightsBackgroundCarousel.module.css
   │  │  │     │     └─ CommunityHighlightsBackgroundCarousel.tsx
   │  │  │     ├─ EcosystemSection/
   │  │  │     │  ├─ EcosystemSection.css
   │  │  │     │  ├─ EcosystemSection.module.css
   │  │  │     │  └─ EcosystemSection.tsx
   │  │  │     ├─ EventsSection/
   │  │  │     │  ├─ EventsSection.css
   │  │  │     │  ├─ EventsSection.module.css
   │  │  │     │  └─ EventsSection.tsx
   │  │  │     ├─ FellowshipSection/
   │  │  │     │  ├─ FellowshipSection.css
   │  │  │     │  ├─ FellowshipSection.module.css
   │  │  │     │  └─ FellowshipSection.tsx
   │  │  │     ├─ HeroSection/
   │  │  │     │  ├─ HeroSection.css
   │  │  │     │  ├─ HeroSection.module.css
   │  │  │     │  └─ HeroSection.tsx
   │  │  │     └─ NewsletterSection/
   │  │  │        ├─ NewsletterSection.css
   │  │  │        ├─ NewsletterSection.module.css
   │  │  │        └─ NewsletterSection.tsx
   │  │  │
   │  │  ├─ JoinEvent/
   │  │  │  ├─ JoinEvent.css
   │  │  │  ├─ JoinEvent.module.css
   │  │  │  └─ JoinEvent.tsx            # Join event form page
   │  │  │
   │  │  ├─ SignIn/
   │  │  │  ├─ SignIn.css
   │  │  │  ├─ SignIn.module.css
   │  │  │  └─ SignIn.tsx               # Sign in page
   │  │  │
   │  │  ├─ SignUp/
   │  │  │  └─ SignUp.tsx               # Sign up page
   │  │  │
   │  │  └─ sponsor/
   │  │     ├─ Sponsor.tsx              # Sponsor wrapper (Navbar + Footer)
   │  │     ├─ SponsorPage.tsx          # Sponsor main content composition
   │  │     └─ sections/
   │  │        ├─ ContactSection.module.css
   │  │        ├─ ContactSection.tsx    # Contact sponsor form
   │  │        ├─ FAQSection.module.css
   │  │        ├─ FAQSection.tsx        # Sponsor FAQ accordion
   │  │        ├─ HeroSection.module.css
   │  │        ├─ HeroSection.tsx       # Sponsor page hero
   │  │        ├─ LottieSponsorIcon.tsx # Lottie animation icons
   │  │        ├─ SectionTitle.module.css
   │  │        ├─ SectionTitle.tsx      # Animated section title component
   │  │        ├─ sponsorData.tsx       # Sponsor tiers data
   │  │        ├─ SponsorTiersSection.module.css
   │  │        ├─ SponsorTiersSection.tsx  # Sponsorship packages grid
   │  │        ├─ StatsSection.module.css
   │  │        ├─ StatsSection.tsx      # Sponsor statistics
   │  │        ├─ WhySponsorSection.module.css
   │  │        └─ WhySponsorSection.tsx # Why sponsor benefits
   │  │
   │  ├─ styles/
   │  │  └─ animations.css              # Shared keyframe animation definitions
   │  │
   │  └─ utils/
   │     ├─ theme.ts                    # Theme utilities
   │     └─ useScrollReveal.ts          # Intersection Observer scroll reveal hook
   │
   ├─ public/
   │  ├─ favicon.ico
   │  ├─ placeholder.svg
   │  └─ assets/
   │     ├─ colored-logo.png
   │     ├─ logo.png
   │     ├─ community/
   │     │  ├─ L-1.png
   │     │  ├─ L-2.png
   │     │  ├─ idea-1.jpg
   │     │  └─ trip-1.jpeg
   │     ├─ events/
   │     │  ├─ fusionX.png
   │     │  ├─ fusionXposter.png
   │     │  ├─ RaibarX.png
   │     │  └─ survivors_zone_poster.webp
   │     ├─ footer/
   │     │  └─ footer-img.png
   │     ├─ lottie-icons/
   │     │  ├─ announcement.json
   │     │  ├─ attract-customer.json
   │     │  ├─ collab.json
   │     │  ├─ community-help.lottie
   │     │  ├─ developer.json
   │     │  ├─ globe.json
   │     │  ├─ gold-house-corn.json
   │     │  ├─ hand-earn.lottie
   │     │  ├─ lucky-cat.json
   │     │  ├─ management.json
   │     │  └─ shooting-star.json
   │     ├─ partners-logo/
   │     │  ├─ dbuu.png
   │     │  └─ kailshians.png
   │     ├─ preview/
   │     │  ├─ c-1.png
   │     │  └─ h-1.png
   │     ├─ team-mates/
   │     │  ├─ ishita.jpg
   │     │  ├─ om.png
   │     │  ├─ parul.png
   │     │  ├─ prakash.jpeg
   │     │  ├─ shreya.jpg
   │     │  └─ suraj.jpeg
   │     └─ video/
   │        ├─ ayush-inventory.mp4
   │        └─ sonam.mp4
   │
   └─ server/
      ├─ index.ts                       # Express server entry point
      ├─ node-build.ts                  # Production server build config
      └─ routes/
         └─ demo.ts                     # Demo API route



## Architecture Overview

### Frontend (`client/`)
- Built with **React + TypeScript + Vite**
- Uses **Tailwind CSS** and **shadcn/ui**
- Component-based architecture
- Page-wise section separation
- Reusable animations and UI primitives

### UI & Animation System
- GSAP based cinematic animations
- Lottie animations
- Lordicon icons
- Custom cursor effects
- Scroll reveal animations
- Smooth scrolling experience

### Backend (`server/`)
- Express.js server setup
- API route structure
- Production build support

### Asset Management
- `public/assets` → Static images, videos, icons
- `client/assets` → Imported frontend assets

### Folder Organization Principles


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Attribution

Animated icons by **[Lordicon](https://lordicon.com/)**.


## Notes for Future Developers

### Lordicon

Please do not remove the Lordicon attribution. It is required under their licensing terms.

### Initial Repository

The initial commits were rewritten because additional tooling (such as ESLint) was added before the project was finalized.

If you have any questions regarding the original project setup, feel free to contact me.


## resolved bug

**Notion**: (https://app.notion.com/p/resolved-bug-39664c3a4f818066b4a0f6da28ddf8b4?source=copy_link)
