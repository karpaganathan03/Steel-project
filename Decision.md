# MASTER CONTEXT
Project: multi-page static website for a **Steel & TMT Bar Dealer**.
Stack: **HTML5 + CSS3 + vanilla JavaScript (ES6+) only**. No backend, no frameworks or libraries, no build tools, no icon CDNs. Only external resource allowed: Google Fonts (with system fallback). Must open by double-clicking `index.html`.

## Folder architecture
steel-dealer/
├── index.html (Home 1)
├── pages/ home-2.html, products.html, products-grade.html, products-size.html, price-enquiry.html, contact.html
├── assets/css/ base.css, layout.css, components.css, themes.css, rtl.css, responsive.css
├── assets/js/ main.js, theme.js, direction.js, nav.js, scroll-progress.js, products.js, forms.js, data.js
├── assets/images/ (hero/, brands/, products/, about/)
├── assets/icons/
└── README.md

## Design tokens (CSS custom properties only; no hardcoded colors elsewhere)
Navy #0F1E2E, charcoal #1C242C, steel grey #6B7885, light steel #E9EDF1, accent orange #F26A1B, success #1F9D55, error #D64545.
Fonts: headings "Barlow Condensed" 600/700; body "Inter" 400/500/600; RTL adds "Noto Sans Arabic"; fallback system-ui stack.
Spacing tokens 4/8/12/16/24/32/48/64/96. Grid gutter 24px, card padding 24px, one radius/border/shadow set. Container max 1200px.
Buttons: only .btn-primary, .btn-outline, .btn-ghost; sizes sm 36px, md 44px, lg 52px.

## Global rules
- CSS uses **logical properties** (margin-inline, padding-inline, inset-inline-start, text-align:start). No left/right unless unavoidable.
- RTL/LTR via dir on <html>; dark/light via [data-theme] on <html>; both saved in localStorage (try/catch).
- Directional icons mirror in RTL via .icon-dir; logos and phone numbers never mirror.
- Header and footer identical on every page (injected from one template in main.js). Relative paths must work from `/` and `/pages/`.
- Sticky header, steel-bar scroll progress under it, © 2026 footer with back-to-top arrow, social SVG icons, SVG favicon on every page.
- Every hero/section has a relevant image with CSS gradient + SVG fallback; text over images only on a dark overlay (4.5:1 contrast), never overlapping at 320px.
- Section heading pattern: eyebrow + H2 + short steel-bar underline + one-line description, aligned consistently.
- Mobile-first; breakpoints 480/768/1024/1280; no horizontal page scroll; touch targets ≥44px.
- Zero inline styles, no `!important` (except reduced-motion), BEM naming, semantic HTML, accessible (labels, alt, aria, focus rings, skip link).
- Output full code for every file requested. No truncation, no "rest of code".



prompt-2

# TASK 2 of 11: Design system (CSS only)
Create these files in full: `base.css`, `themes.css`, `layout.css`, `components.css`, `rtl.css`, `responsive.css`.

Requirements:
- **base.css**: modern reset, tokens (spacing, radius, shadow, font sizes via clamp(), z-index scale), typography for h1 to h6, p, a, lists, tables, focus-visible rings, skip-link, `prefers-reduced-motion`.
- **themes.css**: `[data-theme="light"]` and `[data-theme="dark"]` variable sets for bg, surface, text, muted text, border, overlay gradients, shadows, header blur. Verify WCAG AA contrast. Smooth 200ms transitions.
- **layout.css**: container, 12/8/4-column grid helpers, section spacing, `.section__head` (eyebrow, title, steel-bar underline, description; centered and start-aligned modifiers), equal-height card grids, hero layout, breadcrumb layout, utility classes.
- **components.css**: buttons (3 variants × 3 sizes, all states, icon gap), icon buttons (40×40), header + nav + dropdown + mobile drawer, cards (product, feature, brand, stat, testimonial), badges, chips, tabs, accordion, tables (scroll wrapper, sticky first column), forms (inputs, select with custom arrow, checkbox, chips, error/success states), footer (4→2→1 columns, social circles, bottom bar), back-to-top button, steel-bar scroll progress (rib pattern with repeating gradients, orange hot tip, `transform: scaleX()` anchored to inline-start), toast.
- **rtl.css**: only the minimal overrides (icon mirroring, dropdown arrow, drawer slide direction, progress-bar origin, Arabic font stack).
- **responsive.css**: all breakpoint rules; header 72px desktop / 64px mobile; buttons stack full-width on mobile.

Deliver a small `style-guide.html` test page showing every component in all 4 combinations (LTR/RTL × light/dark) so I can verify alignment.


prompt-3
Existing files: all CSS from Task 1.

# TASK 3 of 11: Shared JS, header and footer
Create in full: `main.js`, `theme.js`, `direction.js`, `nav.js`, `scroll-progress.js`, `data.js` (shared parts only: brands, nav items, `i18n` EN + Arabic).

Requirements:
- **main.js**: injects the single header and footer template into `<div id="site-header">` and `<div id="site-footer">`, resolves relative paths automatically for root vs `/pages/`, sets the active link, sets the footer year, back-to-top button, and calls every module's init.
- **Header**: logo (SVG steel-bar) at inline-start, nav (Home, Home 2 (Detailed), Products ▾ [By Grade, By Size], Price Enquiry, Contact), then icon buttons for Theme (sun/moon SVG), Direction (LTR/RTL arrows SVG) and the "Get Quote" CTA at inline-end.
- **theme.js**: `[data-theme]` on `<html>`, default from `prefers-color-scheme`, saved to localStorage, icon swaps, `aria-pressed`, tooltip.
- **direction.js**: toggles `dir` and `lang`, saved to localStorage, applies `data-i18n` translations (nav, hero headline, CTAs, footer) so content visibly changes in Arabic.
- **nav.js**: sticky shadow on scroll, dropdown (hover, focus, tap, ESC), mobile drawer from the inline-start edge with focus trap, overlay click, ESC, body scroll lock.
- **scroll-progress.js**: steel-bar rebar indicator under the header, rAF-throttled, grows from the inline-start edge in both LTR and RTL.
- **Footer**: 4 columns (About + logo, Quick Links, Products, Contact), social SVG icons (Facebook, Instagram, X, LinkedIn, YouTube, WhatsApp), bottom bar "© 2026 [Company Name]. All rights reserved." with the © symbol and a back-to-top arrow.
- Add a minimal `test.html` that loads these and proves everything works.

prompt-4
Existing files: all CSS, shared JS, header/footer.

# TASK 4 of 11: Home 1 (`index.html`)
Build only `index.html` (plus any new `data.js` entries).
Sections in order:
1. **Hero**: full-bleed background image (`assets/images/hero/hero-tmt-bars.jpg`) + dark overlay, H1, subtext, two CTAs ("Get Price Quote", "View TMT Grades"), 3 to 4 trust stats. Min-height 80vh/70vh.
2. **Brands strip**: grid of 6 sample brand logos (inline SVG placeholders: Tata Tiscon, JSW Neosteel, SAIL, Jindal Panther, Kamdhenu, Vizag Steel).
3. **Product highlights**: 3 equal-height cards (TMT Bars, Structural Steel, Binding Wire) with image, title, 2-line description, bottom-aligned button.
4. **Why Choose Us**: 4 icon points.
5. **CTA banner**: heading + "Get Price Quote" + "Call Now".
Include meta tags, SVG favicon, apple-touch-icon, skip link, semantic landmarks. Keep it clearly **basic** and short, because Home 2 is the detailed version.

Prompt-5
Existing files: all CSS, shared JS, Home 1.

# TASK 5 of 11: Home 2 (`pages/home-2.html`)
Build only `home-2.html` (plus any new JS in `main.js`/`data.js`, kept minimal).
Must be visibly richer than Home 1. Sections:
Hero → Brands → About the company (image + animated counters via IntersectionObserver) → Detailed product range → Grade guide teaser (Fe 500 vs 500D vs 550D table) → Size chart teaser → Quality & testing (4-step timeline, mirrored correctly in RTL) → Delivery & logistics → Industries served → Testimonials slider (prev/next, dots, keyboard, autoplay paused on hover/focus, ARIA) → FAQ accordion → Brand partners → Final CTA band.
Cross-link with Home 1 ("Home" ↔ "Home 2 (Detailed)"). Timeline, slider and accordion must be pixel-aligned in both LTR and RTL and both themes.

Prompt-6
Existing files: CSS, shared JS.

# TASK 6 of 11: Products hub (`pages/products.html`)
Breadcrumb → page hero (smaller, with background image and overlay) → intro text → two large cards "Shop by Grade" and "Shop by Size" (image, description, CTA each linking to the real pages) → category overview grid (TMT Bars, Structural Steel, Binding Wire, MS Plates) → CTA band.
Cards must have equal height and identical padding, with buttons bottom-aligned.

Prompt-7
Existing files: CSS, shared JS.

# TASK 7 of 11: Products by Grade (`pages/products-grade.html` + `products.js` grade logic + grade data in `data.js`)
- Breadcrumb, page hero.
- Filter chips/tabs: All, Fe 415, Fe 500, Fe 500D, Fe 550, Fe 550D, Fe 600 (accessible tabs, keyboard arrows).
- Product cards rendered from `data.js`: name, grade badge, yield strength, elongation, typical uses, available sizes, "Enquire Price" button deep-linking to `price-enquiry.html?grade=...&product=...`.
- Comparison table (scroll wrapper, sticky first column, works in RTL).
- Spec/info section with image (IS 1786 notes, sample content).
- CTA band.

Prompt-8
Existing files: CSS, shared JS, `products.js`.

# TASK 8 of 11: Products by Size (`pages/products-size.html` + size logic in `products.js` + size data in `data.js`)
- Breadcrumb, page hero.
- Size selector (8, 10, 12, 16, 20, 25, 32 mm) as accessible chips/tabs.
- Selected size panel: weight per metre, bars per tonne, standard length 12 m, applications, image.
- Product cards per size with "Enquire Price" deep-links (`?size=...`).
- Weight/size comparison table (scroll wrapper, sticky first column).
- Link back to Products by Grade, then CTA band.


Prompt-9
Existing files: CSS, shared JS, product data.

# TASK 9 of 11: Price Enquiry (`pages/price-enquiry.html` + `forms.js`)
- Breadcrumb, page hero.
- Two-column layout (form + side panel; stacks on mobile). Side panel: 3-step enquiry process, helpline, working hours.
- Fields: Name, Phone, Email, Company, City, Product (select), Grade (select), Size (multi-select chips), Quantity (tonnes), Delivery date, Message, consent checkbox.
- Prefill from URL query params (`grade`, `size`, `product`).
- Validation on blur and on submit: required, email regex, 10-digit phone, quantity > 0, trimmed values. Inline errors via `aria-describedby`, focus moves to the first error.
- Submit: disabled and spinner for 600ms, then success panel. Store the submission in `localStorage` only.
- Optional indicative price estimator clearly labelled "Sample data, not a live price".
- `forms.js` must be reusable by the Contact page.
Make sure labels, inputs, chips, select arrows and checkboxes are aligned in RTL and in both themes.


Prompt-10
Existing files: CSS, shared JS, `forms.js`.

# TASK 10 of 11: Contact (`pages/contact.html`)
- Breadcrumb, page hero.
- Contact cards (address, phone, email, working hours) with icons, equal height.
- Quote request form (Name, Phone, Email, Subject, Message) using `forms.js` with the same validation and success behaviour.
- Static map placeholder (SVG/image, no iframe), social icon row, mini FAQ accordion, CTA band.
- Phone and email stay LTR in RTL mode (`dir="ltr"` on those spans).

Prompt-11
Existing files: the entire project.

# TASK 11 of 11: Audit, fix and document
1. Audit every file against this checklist and output a **list of defects with exact fixes** (then the corrected files in full):
   - Every nav, footer and CTA link resolves from every page; no `href="#"`.
   - LTR↔RTL works on all pages: paddings, icons, dropdowns, timeline, tables, forms, drawer, scroll bar.
   - Dark↔light works everywhere; AA contrast; preferences persist.
   - No horizontal scroll or overlapping text/images at 320, 375, 768, 1024, 1440 px.
   - Buttons identical per variant and size on every page.
   - Header sticky without overlapping anchors (`scroll-margin-top`).
   - Footer © + year, social icons, back-to-top work.
   - No console errors, no broken asset paths, no duplicate IDs, every image has alt, every control has a label.
2. Write `README.md`: how to run, folder map, **list of all placeholder images with filenames and recommended sizes**, and how to change colors, fonts, content, company name, contact details and translations.


