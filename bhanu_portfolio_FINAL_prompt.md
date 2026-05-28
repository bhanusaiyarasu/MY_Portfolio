# 🚀 FINAL MASTER PROMPT — BHANU SAI YARASU | PREMIUM PORTFOLIO REBUILD 2026

---

## 🧠 READ THIS FIRST — WHAT YOU ARE BUILDING

You are a senior creative frontend engineer. Build a **complete, production-ready React portfolio** for **Bhanu Sai Yarasu**, a Frontend & Web Developer. 

This is a full rebuild. The old site had these problems — fix all of them:
- ❌ Separate ugly header → ✅ No traditional header. Nav links live INSIDE the hero section
- ❌ Generic cursor → ✅ Unique ink-drop / magnetic cursor (described below)
- ❌ Boring skills grid → ✅ Scroll-reactive floating skill cards with glow
- ❌ Synced images that look off → ✅ Remove all stock images, replace with text animations + glowing effects
- ❌ Normal vertical timeline journey → ✅ Horizontal scroll pinned timeline (GSAP ScrollTrigger pin)
- ❌ Small footer → ✅ Full-viewport footer — one full screen, massive type, cinematic
- ❌ Bento grid not working → ✅ Magazine asymmetric bento with hover reveals

**Core inspiration:** mina-massoud.com — editorial, cinematic, motion-rich. Take the FEELING, build Bhanu's own identity.

**The vibe:** Dark. Confident. Electric. Like a senior developer who lets the work speak. Premium without being loud.

---

## 🏗️ TECH STACK — USE ALL OF THESE

```
Framework:      React 18 + Vite
Animations:     GSAP + ScrollTrigger + TextPlugin + Flip
Smooth Scroll:  Lenis (smooth, 60fps, connects to GSAP ticker)
3D:             Three.js + @react-three/fiber + @react-three/drei
Motion:         Framer Motion (component transitions)
Styling:        Tailwind CSS + CSS custom properties
Fonts:          See Typography section below
Icons:          Lucide React
Marquee:        react-fast-marquee
Cursor:         Custom built (no library) — canvas-based
Theme:          React Context + CSS variables + localStorage
```

**GSAP Init (put in utils/gsap.js):**
```js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import Flip from "gsap/Flip";
gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip);
export default gsap;
```

**Lenis Init (put in hooks/useLenis.js):**
```js
import Lenis from "lenis";
import gsap from "./gsap";
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 🎨 COLOR SYSTEM — CSS VARIABLES

```css
/* globals.css — Dark mode default */
:root {
  --bg:           #070707;   /* near black, not pure black */
  --bg-card:      #0E0E0E;   /* card surfaces */
  --bg-raised:    #131313;   /* elevated cards */
  --lime:         #C8FF00;   /* SIGNATURE accent — electric lime */
  --lime-dim:     rgba(200,255,0,0.08);
  --lime-glow:    rgba(200,255,0,0.18);
  --mint:         #00FFB2;   /* secondary accent */
  --white:        #F0EFEA;   /* warm off-white */
  --muted:        #606060;
  --faint:        #282828;
  --border:       rgba(255,255,255,0.07);
  --font-display: 'Bebas Neue', sans-serif;       /* HERO MASSIVE TYPE */
  --font-head:    'Syne', sans-serif;              /* section headings */
  --font-body:    'DM Sans', sans-serif;           /* body text */
  --font-mono:    'JetBrains Mono', monospace;     /* tags, labels */
  --font-serif:   'Playfair Display', serif;       /* italic accents */
}

/* Light mode override */
[data-theme="light"] {
  --bg:           #F2F1EC;
  --bg-card:      #E8E7E1;
  --bg-raised:    #DDDCD6;
  --lime:         #1A1A1A;   /* inverted — black as accent in light */
  --lime-dim:     rgba(0,0,0,0.05);
  --lime-glow:    rgba(0,0,0,0.12);
  --white:        #111111;
  --muted:        #777777;
  --faint:        #CCCCCC;
  --border:       rgba(0,0,0,0.08);
}
```

**Rule:** Electric lime (#C8FF00) is the signature in dark mode. It appears on: cursor ring, nav active link, CTA buttons, skill card borders on hover, hero underline, section number labels. Nowhere else. Restraint = luxury.

---

## ✍️ TYPOGRAPHY — THIS IS CRUCIAL

```
IMPORT THESE FROM GOOGLE FONTS:
- Bebas Neue          → Hero name, massive display text (weight 400)
- Syne                → Section headings (weight 700, 800)
- DM Sans             → Body, nav links, paragraphs (weight 400, 500)
- JetBrains Mono      → Labels, tags, counters, tech stack pills
- Playfair Display    → Italic accent quotes, soft contrast moments
```

**Size scale (fluid, use clamp everywhere):**
```css
--text-hero:    clamp(5rem, 15vw, 18rem);   /* BHANU SAI YARASU */
--text-display: clamp(3rem, 7vw, 9rem);     /* section big text */
--text-head:    clamp(1.8rem, 3.5vw, 4rem); /* sub headings */
--text-body:    clamp(0.95rem, 1.2vw, 1.1rem);
--text-label:   clamp(0.7rem, 0.9vw, 0.85rem);
```

---

## 🖱️ CUSTOM CURSOR — MAKE THIS UNIQUE, NOT COMMON

**Concept: "Ink Drop" cursor** — like a drop of ink falling on paper. Completely different from standard dot+ring.

**Build as:** `components/cursor/CustomCursor.jsx` using canvas or pure CSS + JS

**Structure:**
1. **Core drop** — 12px tear-drop shape (not a circle), lime colored, instant mouse follow
2. **Ink spread** — 50px translucent lime ellipse, follows with 100ms lerp lag, slightly squishes on fast movement (scaleX based on velocity)
3. **Splatter ring** — on mousedown: 6 tiny 3px dots burst outward from cursor position then fade (GSAP to, duration 0.4s, stagger 0.04s)

**Cursor state changes (smooth CSS transitions, 0.2s):**
```
DEFAULT:        teardrop + ink spread (described above)
HOVER LINK:     ink spread expands to 70px, text "→" appears inside, rotates to point at link
HOVER CARD:     cursor morphs to horizontal pill, text "OPEN" inside, lime bg 15% opacity
HOVER TEXT:     cursor becomes a 2px wide, 28px tall lime vertical line (I-beam but cooler)
HOVER BUTTON:   cursor hides, button gains lime glow + 3px scale (magnetic effect)
CLICKING:       splatter animation fires
DRAGGING:       cursor becomes horizontal arrow "← →"
```

**GSAP magnetic on buttons:**
```js
// On every [data-magnetic] element:
el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width/2;
  const y = e.clientY - rect.top - rect.height/2;
  gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
});
el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" }));
```

**DISABLE on mobile:** `@media (pointer: coarse) { cursor: auto; }` — hide custom cursor component entirely on touch devices.

---

## 🌐 PAGE STRUCTURE — ONE PAGE, ALL SECTIONS

No traditional top navbar. All in one scroll. Lenis handles everything.

```
1. PRELOADER         — 1.5s cinematic entry
2. HERO              — Full screen, nav links INSIDE, no separate header  
3. MARQUEE STRIP     — Infinite scrolling tech names
4. ABOUT             — Text-forward, no photos, glowing text effects
5. SKILLS            — Floating reactive cards, scroll-triggered
6. PROJECTS          — Asymmetric bento, hover reveals
7. JOURNEY           — HORIZONTAL SCROLL TIMELINE (pinned)
8. STATS             — Bold count-up numbers
9. CONTACT           — Clean form + socials
10. FOOTER           — FULL VIEWPORT, cinematic, massive type
```

---

## ⚡ SECTION SPECIFICATIONS

---

### SECTION 0 — PRELOADER

```
- Full screen, bg: #070707
- Center: "B·S" in Bebas Neue, 20vw, color #C8FF00, letter spacing 0.5em
- Below: progress bar — thin 1px lime line, fills left to right in 1.5s
- Top-right: counter "000" → "100" in JetBrains Mono, muted color
- Grain noise overlay: CSS pseudo-element with SVG noise filter, opacity 0.04
- Exit: GSAP timeline —
    1. "B·S" scales up to 40vw + fades (0.3s)
    2. Entire preloader clips upward (clip-path: inset(0 0 100% 0), 0.6s, ease:"power4.inOut")
    3. Hero beneath is revealed
```

---

### SECTION 1 — HERO (NO SEPARATE HEADER — THIS IS THE NAV TOO)

**This section IS the navigation. No floating header needed.**

**Layout — full viewport (100dvh):**
```
TOP ROW (fixed inside hero):
  [Left]  B·S logo monogram (Bebas Neue, 28px, lime)  
  [Right] Nav links: Work  About  Skills  Contact  [🌙 toggle]

CENTER:
  MASSIVE name text:
  "BHANU" — full width, Bebas Neue, var(--text-hero)
  "SAI YARASU" — slightly smaller, same font
  
  Below name: 
  "Frontend Developer & Creative Coder"
  → Text scramble animation on load (letters cycle before settling)
  → Written in Syne, 1.5rem, muted color

BOTTOM ROW:
  [Left]  "Available for work · 2026" with pulsing lime dot
  [Right] Vertical social stack: GH · LI · TW
  [Center] ↓ scroll indicator with animated line
```

**Hero nav links behavior:**
- DM Sans, small caps, 0.85rem, --muted color by default
- Hover: lime color, underline draws from left (scaleX 0→1, 0.2s)
- When user scrolls past hero: nav links morph into a floating pill (position:fixed, top: 20px, centered, glassmorphism bg) — GSAP Flip for smooth transition
- The nav links NEVER disappear — they just change from being inside hero to floating pill on scroll

**Hero background:**
- Three.js canvas, full screen, z-index -1
- 1500 particles, #C8FF00 at 0.3–0.6 opacity, varying sizes 0.5–2px
- Slowly drift with Perlin noise
- MouseMove: particles near cursor push away (repulsion radius 120px)
- Scroll: particles fade out by 80% as user scrolls to about section

**Name load animation (GSAP, fires after preloader exits):**
```js
// SplitText on "BHANU" and "SAI YARASU"
gsap.from(".hero-name .char", {
  y: 120, opacity: 0, rotateX: -90,
  stagger: 0.04, duration: 0.8,
  ease: "power4.out", delay: 0.2
});
// After name settles — draw SVG underline under BHANU
gsap.fromTo(".hero-underline", 
  { strokeDashoffset: 600 },
  { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", delay: 1.2 }
);
```

**Lime SVG underline:** An SVG `<path>` that looks like a hand-drawn underline beneath "BHANU", drawn in via strokeDashoffset animation. Color: #C8FF00, strokeWidth: 3.

---

### SECTION 2 — MARQUEE STRIP

Between hero and about, full width:

```
REACT · TYPESCRIPT · THREE.JS · GSAP · NODE.JS · NEXT.JS · FIGMA · TAILWIND · 
WEBGL · FRAMER MOTION · REST APIs · VITE · GIT · CSS3 · HTML5 ·
```

**Design:**
- bg: var(--lime), text: #070707 (inverted)
- Font: Bebas Neue, 1.2rem, letter-spacing 0.15em
- react-fast-marquee, speed: 60, direction: left
- Second row runs opposite direction at speed 45

**In light mode:** bg: #1A1A1A, text: #F2F1EC

---

### SECTION 3 — ABOUT

**Philosophy: No photos. Text IS the design.**

**Layout:** Full width, two visual moments:

**Moment 1 — Big statement:**
```
Section label: "01 · ABOUT" — JetBrains Mono, lime, small
Big quote — Playfair Display italic, clamp(2rem,4vw,5rem):
"I build interfaces the way good films are made — 
 every frame intentional, every cut precise."
```
This text should have a **scroll-triggered reveal**: each word clips in from bottom (overflow:hidden + translateY) with 0.05s stagger.

**Moment 2 — Split layout:**
```
LEFT (60%):
  Short bio — DM Sans, 1.1rem, line-height 1.8:
  "Frontend developer based in [City], India. 
   3+ years crafting fast, precise digital experiences.
   I obsess over the details nobody notices 
   until they're missing."
  
  Two lime-accented stat lines:
  ◈ 50+ Projects shipped
  ◈ 3+ Years in the craft

RIGHT (40%):
  Glowing text block — creative flourish instead of photo:
  Large "{ }" in Bebas Neue, 15vw, lime, very low opacity (0.06)
  Over it: floating code-like lines in JetBrains Mono, muted:
  
  const bhanu = {
    role: "Frontend Dev",
    passion: "motion + code",
    status: "open to work",
    location: "India 🇮🇳"
  };
  
  Each line fades in staggered on scroll. The "{}" glows subtly.
```

**GSAP ScrollTrigger for About:**
- Left block: `from: { x: -60, opacity: 0 }` → in at 70% viewport
- Right block: `from: { x: 60, opacity: 0 }` → staggered 0.15s after left

---

### SECTION 4 — SKILLS

**Concept: Floating reactive skill cards — not a grid, a constellation**

**Layout:** 
- bg: var(--bg), full width
- Section heading: "02 · SKILLS" label + "What I work with." in Syne bold
- Below heading: A dynamic zone where skill cards **float and react to scroll + mouse**

**Skill card design:**
```
- Size: 140×56px pill shape (border-radius: 99px)
- bg: var(--bg-card)
- Border: 1px solid var(--border)
- Inside: skill icon (SVG, 20px) + skill name (DM Sans, 0.85rem)
- Default: muted appearance
- Hover: border flashes lime, name turns lime, subtle lime glow shadow
  box-shadow: 0 0 20px rgba(200,255,0,0.25)
- GSAP Float: each card has a slow sinusoidal float (gsap.to y: ±12px, duration: 2-4s, yoyo: true, repeat: -1)
  Each card has different duration so they feel independent, not synced
```

**Scroll behavior:**
- Cards start scattered (random x/y offsets, opacity 0, scale 0.8)
- As section enters: GSAP ScrollTrigger staggers them in (opacity 1, scale 1, to their grid position)
- MouseMove on section: cards closest to cursor float toward it by 8px (proximity effect)

**Skill categories displayed:**
```
Row 1 — Frontend:   React, TypeScript, Next.js, HTML5, CSS3, Tailwind CSS
Row 2 — Creative:   Three.js, GSAP, Framer Motion, WebGL, Canvas API
Row 3 — Backend:    Node.js, Express, REST APIs, MongoDB
Row 4 — Tools:      Git, Figma, Vite, VS Code
Row 5 — Learning:   WebAssembly, React Native, Astro
```

**Special large cards (2x width) for primary skills:**
React, TypeScript, Three.js, GSAP — these get 240px wide cards with a subtle animated gradient border

---

### SECTION 5 — PROJECTS (BENTO GRID)

**Layout: Asymmetric magazine bento — 4 featured + 2 smaller**

```
Desktop grid layout (CSS Grid):
┌─────────────────────┬──────────────┐
│  FEATURED #01       │  PROJECT #02 │
│  (2/3 width)        │  (1/3 width) │
│                     │              │
├──────────┬──────────┴──────────────┤
│ PROJ #03 │  FEATURED #04           │
│          │  (2/3 width)            │
├──────────┴──────────┬──────────────┤
│  PROJECT #05        │  PROJECT #06 │
└─────────────────────┴──────────────┘
```

**Each project card:**
```
- bg: var(--bg-card)
- border: 1px solid var(--border)
- border-radius: 16px
- Top: Project number "01" in JetBrains Mono, lime, small
- Middle: Project name in Syne Bold, large
- Tags: Tech stack pills — JetBrains Mono, 0.7rem, lime border
- Default: clean, minimal
- Hover reveal (GSAP):
  → Overlay slides up from bottom (clip-path reveal)
  → Shows: short description + two buttons [Live ↗] [GitHub ↗]
  → Card border animates to lime
  → Subtle scale: 1 → 1.02
```

**Featured cards (large) get extra treatment:**
- A subtle animated gradient that slowly moves across the card on hover
- `background: conic-gradient(from var(--angle), transparent 20%, var(--lime-dim) 40%, transparent 60%)`
- Animate --angle via @property CSS Houdini or GSAP

**Section heading:** "03 · WORK" label + "Selected Projects." in Syne

**Projects to fill in (placeholder structure):**
```js
// src/data/projects.js
export const projects = [
  { id: "01", title: "Project Name", tags: ["React", "TypeScript"], live: "#", github: "#", size: "large" },
  { id: "02", title: "Project Name", tags: ["Node.js", "API"], live: "#", github: "#", size: "small" },
  // ... add all of Bhanu's real projects
];
```

---

### SECTION 6 — JOURNEY (HORIZONTAL SCROLL TIMELINE)

**This is the show-stopper section. Pinned horizontal scroll.**

**How it works:**
- The section is PINNED by GSAP ScrollTrigger
- While user scrolls vertically, the inner content moves HORIZONTALLY
- Total horizontal travel: 4 timeline entries × 500px = 2000px
- After all entries are seen, pin releases and vertical scroll resumes

**GSAP implementation:**
```js
gsap.to(".journey-track", {
  x: () => -(document.querySelector(".journey-track").scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".journey-section",
    start: "top top",
    end: () => "+=" + document.querySelector(".journey-track").scrollWidth,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  }
});
```

**Each timeline entry (card, 420px wide, 70vh tall):**
```
- Large year: "2022" in Bebas Neue, 8vw, lime (very low opacity 0.15, background decoration)
- Over it: Role title in Syne Bold, 1.8rem
- Company / context below in DM Sans muted
- Short description: 2–3 lines
- Tech used: pill tags
- Left edge: vertical lime line connecting entries
- Connecting line between cards: thin 1px lime dashed horizontal line
```

**Entries:**
```
2022 — Started frontend journey | First React projects
2023 — [Any job/internship/freelance]
2024 — [Next role or major project milestone]
2025 — [Current / latest]
```

**Scroll indicator while in pinned section:**
"DRAG →" text appears with animated arrows, fades out after first card passes

---

### SECTION 7 — STATS

**Full width, bold, typographic**

```
Layout: 4 columns on desktop, 2×2 tablet, 1 col mobile

[ 50+ ]        [ 3+ ]        [ 100% ]      [ 15+ ]
Projects       Years         Satisfaction  Technologies

Each number: Bebas Neue, clamp(4rem, 8vw, 10rem), --white
Label below: DM Sans, --muted, 0.85rem, uppercase tracking-widest
```

**Animation:** CountUp triggered by ScrollTrigger — numbers count from 0 when section enters viewport

**Design detail:** Very subtle dot-grid background pattern on this section only:
```css
background-image: radial-gradient(var(--faint) 1px, transparent 1px);
background-size: 28px 28px;
```

---

### SECTION 8 — CONTACT

**Layout:** Two columns

**Left (50%):**
```
"05 · CONTACT" label — lime, mono
Big heading: "Let's build something." — Syne Bold, display size
Sub: "Available for freelance & full-time. 
      Usually respond within 24 hours."

Direct email (big, hoverable):
bhanusai@email.com  ↗
→ On hover: entire email gets lime underline sweep, cursor becomes arrow
→ On click: copies to clipboard + toast "Copied ✓"

Social row:
[ GitHub ]  [ LinkedIn ]  [ Twitter ]
→ Each icon + label, hover: lift + lime color
```

**Right (50%) — Contact form:**
```
Fields (bottom-line style, no box border):
─────────────────
Your Name
─────────────────
Your Email  
─────────────────
Project Type  ▾ (dropdown)
─────────────────
Message
─────────────────

Active field: line turns lime, label floats up (animated label)

Submit button:
- Full width, height 52px
- bg: var(--lime), color: #070707
- Font: Syne Bold, 1rem, uppercase
- Text: "SEND IT →"
- data-magnetic attribute (magnetic hover effect)
- On submit: button text morphs to "SENDING..." then "SENT ✓" with lime checkmark
- Integrate: EmailJS
```

---

### SECTION 9 — FOOTER (FULL VIEWPORT — ONE COMPLETE SCREEN)

**This entire footer IS a full viewport section (100dvh). Not a small strip.**

**Visual concept:** The footer feels like the closing frame of a film. Sparse, grand, memorable.

**Layout:**
```
TOP (15% height):
  Horizontal line, 1px, var(--border)
  Below: Two columns
  [Left]  "Available for work · 2026" with pulsing green dot
  [Right] Current time in user's timezone (live clock, JetBrains Mono)

MIDDLE (55% height) — THE CENTERPIECE:
  MASSIVE TEXT spanning full width:
  
  "BHANU SAI" — Bebas Neue, 18vw, --white, line 1
  "YARASU"    — Bebas Neue, 18vw, --white, line 2
  
  Hover effect on each LETTER individually:
  → Letter scrambles to random character for 300ms then snaps back
  → Use GSAP TextPlugin for this
  → The scramble should feel like a glitch, not jitter
  
  Each letter is wrapped: <span data-letter="B" class="footer-letter">B</span>
  
  Between "BHANU SAI" and "YARASU": thin lime line stretches full width

BOTTOM (30% height):
  Three columns:
  [Left]   © 2026 Bhanu Sai Yarasu. Crafted with obsession.
  [Center] Nav: Home · Work · About · Skills · Contact
  [Right]  "Back to top ↑" (smooth scroll to hero on click)
  
  Below (very bottom, 8px from edge):
  Centered: "Built with React · GSAP · Three.js · Lenis" — JetBrains Mono, --muted, 0.7rem
```

**Footer bg:** Same as site bg (#070707) OR a very subtle gradient: `background: linear-gradient(to bottom, #070707, #0A0A0A)`

**Grain texture:** Same noise overlay as preloader, opacity 0.03

**ScrollTrigger on footer:** As footer enters viewport, the massive BHANU SAI YARASU text does a clip-path reveal from bottom:
```js
gsap.from(".footer-name-line", {
  clipPath: "inset(100% 0 0 0)",
  duration: 1.2,
  stagger: 0.15,
  ease: "power4.out",
  scrollTrigger: { trigger: ".footer", start: "top 80%" }
});
```

---

## 🌗 DARK / LIGHT MODE SYSTEM

**ThemeContext.jsx:**
```jsx
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
```

**Toggle button design — pill with sliding indicator:**
```jsx
// Pill toggle, 64px wide × 28px tall
// Left icon: 🌙  Right icon: ☀️
// Sliding white/lime circle indicator
// Transition: 0.25s ease
// Place in top-right of hero nav row
```

---

## 🎬 LOAD ANIMATION SEQUENCE

```
0ms      → Preloader visible. "B·S" appears. Counter at 000.
0–1500ms → Progress bar fills. Counter increments 000→100.
1200ms   → "B·S" pulses once (scale 1→1.05→1)
1500ms   → Preloader clips up (clip-path: inset(0 0 100% 0), 0.55s, power4.inOut)
1700ms   → Hero revealed. Nav row fades in (opacity 0→1, y:-10→0, 0.4s)
1800ms   → "Frontend Developer · Available 2026" label fades in
1900ms   → "BHANU" letters stagger up (0.04s per char, rotateX -90→0)
2300ms   → "SAI YARASU" letters follow
2600ms   → Lime SVG underline draws under "BHANU"
2800ms   → Role scramble text settles to final value
3000ms   → Social icons + scroll indicator fade in
3100ms   → Three.js particle field fades in (opacity 0→0.6, 1.5s)
SCROLL   → All remaining sections trigger via ScrollTrigger
```

---

## 📱 RESPONSIVE RULES

```
MOBILE (< 768px):
- Custom cursor: DISABLED (pointer: coarse detection)
- Three.js: DISABLED, replaced with CSS radial gradient background
- Hero name: Bebas Neue, clamp(3.5rem, 18vw, 7rem) — still massive
- Hero nav: Hamburger → fullscreen overlay (bg: #070707, staggered links)
- Bento grid: 1 column, all cards full width
- Skills: 2-column pill grid (no floating effect)
- Horizontal journey: converted to vertical timeline on mobile
- Footer mega text: clamp(3rem, 15vw, 8rem) — still impactful
- Magnetic buttons: effect DISABLED on mobile

TABLET (768px–1024px):
- Cursor: enabled but no trail effect
- Bento: 2 column
- Journey horizontal scroll: enabled
- Three.js: enabled but particle count halved (750)

DESKTOP (> 1024px): full experience
```

---

## 📁 FILE STRUCTURE

```
src/
├── components/
│   ├── cursor/
│   │   └── InkCursor.jsx           ← custom ink-drop cursor
│   ├── nav/
│   │   └── HeroNav.jsx             ← nav INSIDE hero, morphs to pill on scroll
│   ├── preloader/
│   │   └── Preloader.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Journey.jsx             ← horizontal scroll
│   │   ├── Stats.jsx
│   │   └── Contact.jsx
│   ├── footer/
│   │   └── Footer.jsx              ← full viewport footer
│   ├── ui/
│   │   ├── MagneticButton.jsx
│   │   ├── TextScramble.jsx
│   │   ├── CountUp.jsx
│   │   ├── MarqueeStrip.jsx
│   │   └── ThemeToggle.jsx
│   └── three/
│       └── HeroParticles.jsx       ← Three.js canvas
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLenis.js
│   └── useCursor.js
├── data/
│   ├── projects.js
│   ├── skills.js
│   └── journey.js
├── styles/
│   └── globals.css                 ← all CSS variables + base styles
├── utils/
│   └── gsap.js                     ← GSAP init with all plugins
└── App.jsx
```

---

## 🚫 HARD RULES — NEVER DO THESE

| ❌ NEVER | ✅ ALWAYS |
|---------|---------|
| Separate floating header | Nav lives in hero, morphs on scroll |
| Stock photos or random images | Text animations, code blocks, glowing effects |
| Generic dot+ring cursor | Ink-drop cursor with states |
| All cards same size in grid | Asymmetric bento layout |
| Inter / Roboto / System fonts | Bebas Neue + Syne + DM Sans |
| Purple gradients | Electric lime on carbon black |
| Vertical journey timeline | Horizontal GSAP pin scroll |
| Small footer strip | Full viewport footer section |
| Fade-only scroll animations | GSAP with y-movement, clip-path reveals, stagger |
| useEffect for every animation | Proper GSAP ScrollTrigger patterns |
| Overflow issues on mobile | Test every section on 375px width |
| Un-killed ScrollTriggers | Cleanup in useEffect return function |

---

## 🏆 DONE WHEN

- [ ] Preloader runs 1.5s, exits cleanly
- [ ] Hero name is MASSIVE, Bebas Neue, letters stagger in
- [ ] Nav links live inside hero, morph to floating pill on scroll
- [ ] Ink-drop cursor active on desktop, disabled on mobile
- [ ] Marquee strip between hero and about runs smoothly
- [ ] About section has no images — code block glowing effect instead
- [ ] Skills float and react to mouse
- [ ] Projects bento is asymmetric with hover reveals
- [ ] Journey timeline scrolls HORIZONTALLY (pinned)
- [ ] Stats count up on scroll
- [ ] Contact form sends email (EmailJS)
- [ ] Footer is full viewport, mega text "BHANU SAI YARASU" scrambles on hover
- [ ] Dark/Light toggle works, persists in localStorage
- [ ] Lenis scroll feels silky (no jank)
- [ ] Mobile responsive — works on 375px
- [ ] No console errors, no animation overflow issues
- [ ] Lighthouse: Performance 90+, Accessibility 95+

---

*Built for Bhanu Sai Yarasu — 2026. Not a portfolio. A statement.*
