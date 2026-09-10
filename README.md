# Riya Gupta — Portfolio Website

A fully responsive, multi-page portfolio site with a dark, glassmorphic "vision-lab" theme
built around your AI/ML + computer-vision background.

## How to view it
Just double-click **index.html** to open it in any browser — no build step, no dependencies,
no server required. All 5 pages link to each other.

## Pages
- `index.html` — Home (hero, skills marquee, featured projects, current role)
- `about.html` — Bio, skills accordion, education, achievements, certifications
- `projects.html` — Filterable project grid (All / GenAI & LLM / Computer Vision)
- `experience.html` — Vertical timeline of all 5 internships
- `contact.html` — Contact details + a front-end-only contact form

## Features included
- Dark theme by default, with a light-mode toggle (saved across visits via localStorage)
- Glassmorphism surfaces (frosted, blurred cards) throughout
- Animated "live detection" hero panel referencing your YOLO/CV work
- Scroll-reveal animations, button ripple effects, magnetic hover states
- Mobile hamburger menu with a slide-down, staggered animation
- Accordion for the skills section, filter buttons for projects
- Floating-label contact form with client-side validation
- Fully responsive down to small mobile screens
- Respects `prefers-reduced-motion` for accessibility

## To customize
- **Colors / fonts**: edit the CSS variables at the top of `css/style.css` (`:root { ... }`)
- **Text content**: edit directly inside each `.html` file
- **LinkedIn link**: currently a placeholder (`https://linkedin.com`) — replace with your
  real profile URL in every page (search for `linkedin.com`)
- **Résumé download**: `assets/Riya_Gupta_Resume.pdf` is already included and linked from
  the Home and Experience pages
- **Contact form**: it's a static front-end demo (no backend). To make it actually send
  emails, connect it to a form service like Formspree, EmailJS, or your own backend, and
  replace the `fetch`/submit logic in `js/main.js`

## File structure
```
portfolio/
├── index.html
├── about.html
├── projects.html
├── experience.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── Riya_Gupta_Resume.pdf
```

## Hosting it for free
Drag-and-drop the whole folder onto **Netlify Drop** (app.netlify.com/drop), or push it to
a GitHub repo and enable **GitHub Pages** — either will get you a live link in minutes.
