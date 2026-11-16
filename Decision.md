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
   - LTR↔RTL works on all pages: paddings, icons, dropdowns, timeline, tablesforms,     drawer, scroll bar.
   - Dark↔light works everywhere; AA contrast; preferences persist.
   - No horizontal scroll or overlapping text/images at 320, 375, 768, 1024, 1440 px.
   - Buttons identical per variant and size on every page.
   - Header sticky without overlapping anchors (`scroll-margin-top`).
   - Footer © + year, social icons, back-to-top work.
   - No console errors, no broken asset paths, no duplicate IDs, every image has alt, every control has a label.
2. Write `README.md`: how to run, folder map, **list of all placeholder images with filenames and recommended sizes**, and how to change colors, fonts, content, company name, contact details and translations.

- Remove the `container` class from every `<nav>` on every page (breadcrumbs in `products`, `products-grade`, `products-size`, `price-enquiry`, `contact`). Done: no `<nav>` carries `container` now.
- Desktop (1024px and up): hide the Products dropdown arrow button (`.nav-dropdown__toggle`) on every page. The Products link opens its Grade/Size menu on hover and keyboard focus, and an 8px bridge keeps the menu open while the pointer moves down. The button stays in the markup for the mobile drawer. Applied in `assets/css/responsive.css`, which every page loads.
 
- Header dropdown, every page (not only home and products): on desktop (1024px and up), hide the Products arrow button (`.nav-dropdown__toggle`, the `icon-button` beside "Products"). Hovering or keyboard-focusing the Products link opens its Grade and Size menu, styled like the existing dropdown panel. An 8px invisible bridge (`.site-nav__dropdown::before`) keeps the menu open while the pointer moves down. Applied in `assets/css/responsive.css` inside the `min-width: 1024px` block, which all pages load. The button stays in the markup so the mobile drawer can still open sub-items on phones and tablets. `nav` elements no longer carry `container`, as noted above.
- Not yet checked in a browser: hover at 1280px (Products, then down to Grade) and the drawer at 375px.

<nav class="products-hub__breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a href="../index.html" data-i18n="navHome">Home</a></li>
        <li aria-current="page" data-i18n="navProducts">Products</li>
      </ol>
    </nav> remove this for every page(product,price enquiry, contact)

## Layout Model & Full Image Visibility Update (Task 12)
- Re-architected hero sections on all pages (`index.html`, `home-2.html`, `products.html`, `products-grade.html`, `products-size.html`, `price-enquiry.html`, `contact.html`) to follow the new reference layout model:
  1. **Contained Editorial Card Silhouette**: Padded card format with `border-radius: 28px`, subtle borders, and smooth atmospheric gradients in both light and dark themes.
  2. **Asymmetric 2-Column Desktop Grid**: Left column hosts left-aligned typographic content (tracked uppercase gold eyebrow, massive bold two-tone H1 headline, legible paragraph, and pill-shaped action buttons side-by-side with `border-radius: 9999px`).
  3. **Dedicated Image Showcase Column**: Right column houses the page's installed asset (`Home page Hero 1.jpg`, `Home page Hero 2.jpg`, `Product page Hero 1.jpg`, `Product page Hero 2.jpg`, `Price page Hero.jpg`, `conatct  Hero.jpg`) in an elegant showcase frame (`border-radius: 20px`, ambient drop shadow, subtle border) rendered in full natural aspect ratio with **100% visibility and zero text overlay**.
  4. **Bottom Proof Bar**: Spanning full width across the hero bottom, separated by a crisp divider line, featuring 3 bold metrics/proof columns matching the reference model.
  5. **About Section Dual-Image Visibility**: Set `aspect-ratio: 4 / 3` for `steel-engineer.jpg` and `steel-grinding.jpg` so both landscape images display in full without cropping.
  6. **Interactive Slide Switching**: Interactive home hero slider seamlessly cycles through slides and updates the right-column showcase image while keeping all `data-i18n` translation hooks intact.
  7. **Integration Verification**: All 13 core site test checks in `test.html` pass with 100% success.

## Core Range 6 Content Images Update (Task 13)
- Replaced the previous vector placeholders under "Steel essentials for your site" on `index.html` (and `pages/home-2.html`) with the 6 dedicated photographic assets installed in `assets/images/`:
  1. **TMT Bars**: `assets/images/TMT Bars.jpg` (Corrosion-resistant Shyam Steel TMT rebars).
  2. **Structural Steel**: `assets/images/Structural Steel.jpg` (Structural I-beam framing, columns, and staircases).
  3. **Binding Wire**: `assets/images/Binding Wire.jpg` (APL Apollo / SG Mart galvanized binding wire coils).
  4. **MS Plates & Sheets**: `assets/images/MS Plates & Sheets.jpg` (Heavy Goel Steel industrial plates and sheets).
  5. **Hollow Sections & Pipes**: `assets/images/Hollow Sections & Pipes.jpg` (Panchtatva Indij square/rectangular hollow sections).
  6. **Cut & Bend Rebar (BBS)**: `assets/images/Cut & Bend Rebar (BBS).jpg` (Prefabricated beam ties and stirrups).
- Enhanced `.product-card__image` container with rounded borders (`border-radius: var(--radius)`), clean surface framing, and `object-fit: contain` with padding so that **100% of the graphics, labels, and metallurgical specs are fully visible without cropping**.

## Global Image Sizing & Container Standardization Strategy (Task 14)
- **Global Strategy**: Added `.image-frame` and `.image-container` base rules in `assets/css/base.css` with `aspect-ratio: 4 / 3`, `width: 100%`, `display: flex; align-items: center; justify-content: center; overflow: hidden; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); padding: var(--space-3);` and inner `img` with `width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;`.
- **Card Image Containers Standardized**:
  - `.product-card__image` across `index.html`, `style-guide.html`, and `pages/home-2.html`: standardized to `aspect-ratio: 4 / 3; width: 100%; background: var(--color-surface); border-radius: var(--radius); border: 1px solid var(--color-border); padding: var(--space-3); margin-block-end: var(--space-4);`. Inner images use `width: 100%; height: 100%; object-fit: contain; object-position: center;`.
  - `.products-hub__choice-image` across `pages/products.html`: standardized to `aspect-ratio: 4 / 3; width: 100%; object-fit: contain; object-position: center;`. Removed conflicting hardcoded media query overrides (`min-height: 260px`, `height: 220px`).
  - `.size-product-card__image` and `.size-detail__image` on `pages/products-size.html`: standardized to `aspect-ratio: 4 / 3; width: 100%; object-fit: contain; object-position: center;`.
- **Hero & Showcase Image Frames**:
  - `.hero__image-frame` & `.page-hero__image-frame`: standardized to `aspect-ratio: 4 / 3; width: 100%; max-width: 520px; border-radius: 20px; overflow: hidden; background: var(--color-surface); border: 1px solid var(--color-border); box-shadow: 0 20px 48px var(--color-shadow-strong); display: flex; align-items: center; justify-content: center; padding: var(--space-3);`.
  - Inner `.hero__image` & `.page-hero__image`: `width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;`. Portrait posters (`Home page Hero 1.jpg`, `Home page Hero 2.jpg`, `Product page Hero 2.jpg`, `Price page Hero.jpg`), square images (`Product page Hero 1.jpg`, `conatct  Hero.jpg`), and landscape images all fit proportionally without any cropping or distortion.
  - Removed all conflicting inline `style="aspect-ratio: ..."` from `pages/home-2.html`, `pages/products.html`, `pages/products-grade.html`, `pages/products-size.html`, `pages/price-enquiry.html`, `pages/contact.html`.
- **About Dual Images & Split Images**:
  - `.about-dual-images__col` & `.split__image`: standardized with `aspect-ratio: 4 / 3`, `object-fit: contain; object-position: center; width: 100%; height: 100%;`.
- **Brand Cards**:
  - `.brand-card__logo-wrap` & `.brand-card__logo`: standardized to `height: 56px`, `max-width: 100%; max-height: 50px; object-fit: contain; object-position: center;`.
- **Responsive & Design Integrity**:
  - Fully responsive across desktop (1440px), tablet (768px), and mobile (390px).
  - All 13/13 integration checks on `test.html` pass with 100% success.

## Product Card Image Layout & Fallback Resolution (Task 15)
- **Problem 1 (Structural Steel Card Broken Image)**:
  - Inspected filesystem: `assets/images/Structural Steel.jpg` was completely absent on disk (only `TMT BARS.jpg` remained from the previously placed images).
  - Expected exact path: `c:\Users\Admin\Desktop\Steel project\assets\images\Structural Steel.jpg` (or relative `assets/images/Structural Steel.jpg` from root and `../assets/images/Structural Steel.jpg` from `/pages/`).
  - Implemented `onerror="this.onerror=null;this.src='images/placeholder.jpg';"` on all card images.
  - Generated an SVG-styled industrial placeholder JPEG `placeholder.jpg` at both `images/placeholder.jpg` and `assets/images/placeholder.jpg` with a 4:3 ratio, light steel background, and steel I-beam + rebar icon.
  - Added global window error fallback listener in `assets/js/main.js` so any missing image across all pages automatically resolves to the placeholder.
- **Problem 2 (TMT Bars Card Portrait Inconsistency)**:
  - Updated image source to `assets/images/TMT BARS.jpg` to match the exact filename and case of the newly provided 735x490 landscape rebar photograph.
  - The landscape photo fills the standardized 4:3 image box symmetrically, resolving the visual inconsistency with the adjacent cards.
- **Card Image Box Standardization**:
  - Image box `.product-card__image` enforces `aspect-ratio: 4 / 3`, light surface background (`var(--color-surface)` / `#F8F9FA`), `1px solid var(--color-border)` (#D8DEE4), `border-radius: var(--radius)` (12px), `padding: var(--space-3)` (12px), and `display: flex; align-items: center; justify-content: center;`.
  - Inner image uses `width: 100%; height: 100%; object-fit: contain; object-position: center; margin: auto; display: block;` and `loading="lazy"`.
  - Card titles, descriptions, and CTA buttons remain completely intact and aligned.
  - Verified on desktop (1440px) and mobile (390px) with single-column clean stacking.

## Landing Products Page "Shop by Grade" & "Shop by Size" Image Update (Task 16)
- **Verified Files**:
  - Found `assets/images/Shop by Grade.jpg` (bundled coiled TMT rebar with grade tags).
  - Found `assets/images/Shop by Size.jpg` (Durgapur TMT bar size and dimension specification table).
- **Implementation in `pages/products.html`**:
  - Replaced the vector placeholder `../assets/images/products/rebar.svg` on "Shop by Grade" with `../assets/images/Shop by Grade.jpg`.
  - Replaced the vector placeholder `../assets/images/products/rebar.svg` on "Shop by Size" with `../assets/images/Shop by Size.jpg`.
  - Added descriptive `alt` text, `loading="lazy"`, and `onerror="this.onerror=null;this.src='../images/placeholder.jpg';"` fallback to both images.
  - Standardized `.products-hub__choice-image` container with `aspect-ratio: 4 / 3`, `object-fit: contain`, `object-position: center`, light surface background, and subtle hover transition (`scale(1.04)`).
  - Verified across desktop (1440px) and mobile (390px) viewports with all 13/13 test checks passing.


## Industrial Reference Model Hero Section Layout Standardization (Task 20)
- **Reference Model Integration**:
  - Aligned the hero presentation across all 7 pages to match the user's reference layout model (Image 1 & Image 2) without changing existing text, links, or color themes.
  - Unified each hero into a single cohesive full-bleed container (`<section class="hero">` and `<section class="page-hero">`) with the technical dark engineering grid (`#0A0F16`, 44px grid) and warm ambient gold radial lighting (`radial-gradient(circle at 82% 40%, rgba(216, 175, 54, 0.14) 0%, transparent 60%)`).
  - Removed outdated card layering, disjointed split containers, and negative margins.
- **Typographic & Control Hierarchy**:
  - **Glowing Pill Badge**: Integrated `.hero__badge` and `.page-hero__badge` with gold shield icon `🛡`, letter-spaced uppercase tracking, gold border (`rgba(216, 175, 54, 0.45)`), and ambient gold glow.
  - **Two-Tone Bold Display Title**: Structured H1 with bold display typography (`.hero__title-white` in crisp `#FFFFFF` and `.hero__title-accent` in glowing `#FFC82C` with KaTeXKaTeX/text-shadow glow).
  - **Readable Lead Paragraph**: Styled `.hero__lead` and `.page-hero__lead` in light slate `#B8C7D5` with 1.6 line-height and max-width 580px.
  - **Pill CTA Buttons**:
    - Primary Solid Gold: `#FFC82C` with `#0D131A` text, 9999px pill border-radius, and gold glow drop-shadow.
    - Secondary Solid White: `#FFFFFF` with `#0D131A` text and subtle drop-shadow.
    - Tertiary / Outline Pill: transparent background with white border `rgba(255, 255, 255, 0.35)` and white text.
  - **Horizontal Proof Checklist**: Positioned directly below buttons with gold circular checkmark badges (`✔` in `#FFC82C` with circular gold pill frame) and inline proof text.
- **Dedicated Named Hero Photographic Assets**:
  - Right column media frame (`.hero__image-frame`, `.page-hero__image-frame`) features a dark industrial backdrop, gold rim border (`1px solid rgba(216, 175, 54, 0.35)`), and ambient glow (`box-shadow: 0 20px 48px rgba(0, 0, 0, 0.65), 0 0 32px rgba(216, 175, 54, 0.12)`).
  - Images use `object-fit: contain;` preserving 100% natural aspect ratio with full visibility and zero cropping across:
    1. `index.html`: `assets/images/Home page Hero 1.jpg` (with slider cycling to `Product page Hero 2.jpg` and `Home page Hero 2.jpg`).
    2. `pages/home-2.html`: `../assets/images/Home page Hero 2.jpg`.
    3. `pages/products.html`: `../assets/images/Product page Hero 1.jpg`.
    4. `pages/products-grade.html`: `../assets/images/Product page Hero 2.jpg`.
    5. `pages/products-size.html`: `../assets/images/Product page Hero 1.jpg`.
    6. `pages/price-enquiry.html`: `../assets/images/Price page Hero.jpg`.
    7. `pages/contact.html`: `../assets/images/conatct  Hero.jpg`.
- **Slider Navigation & Interactivity**:
  - Added circular outline `<` and `>` arrow buttons (`.hero__arrow--prev`, `.hero__arrow--next`) at the outer edges of the homepage hero.
  - Added bottom-center slider indicator dashes (`.hero__dots`, `.hero__dot.is-active`).
  - Updated `assets/js/home-interactive.js` to cycle slide typography, dedicated image, and active indicator dot on click or arrow trigger.
- **Integration & Responsiveness**:
  - Verified on desktop (1440px) and mobile (390px). All 13/13 integration checks on `test.html` pass with 100% success.

## SAFE-CHANGE RULES (very important)
My project is large and I don't want the structure to collapse.
- Do NOT rewrite or restructure my HTML. Keep existing class names, IDs,
  and element order. Only add a class or a wrapper if absolutely necessary,
  and tell me exactly where.
- Do NOT change content, colors, fonts, or the brand look.
- Prefer ADDING a new block of CSS at the END of my shared stylesheet
  (clearly commented, e.g. /* ===== LAYOUT FIXES ===== */) that overrides
  the broken rules, instead of rewriting my whole file.
- Give changes as small, labeled snippets: "find this selector -> replace
  with this" or "add this at the end of style.css". Never dump a full
  rewritten file unless I ask.
- Do not use !important unless there is no other way, and say why.
- Use my existing CSS variables for colors. Don't hardcode colors.
- Before changing anything, tell me which selectors you need to see.
  Ask me for the specific file instead of guessing class names.

  ## A. Product / section cards (3-column grid)
1. Images don't fill the card. They sit inside a padded grey box and are
   letterboxed, so every card's image looks a different size.
   - Make the image wrapper a fixed ratio (aspect-ratio: 4 / 3) spanning
     the full card width, with no inner padding or grey background.
   - img { width:100%; height:100%; object-fit:cover; object-position:center;
     display:block; } and overflow:hidden on the wrapper so the top corners
     follow the card's border-radius.
   - Portrait images and posters (like the binding wire poster) must fill
     the same frame without stretching.
2. Equal-height, aligned cards.
   - Grid: display:grid; grid-template-columns: repeat(auto-fit,
     minmax(280px, 1fr)); gap: one CSS variable; align-items: stretch.
   - Card: display:flex; flex-direction:column; height:100%.
   - Card body: flex:1 with the button pushed down using margin-top:auto,
     so all buttons line up even when a title wraps to 2 lines.
   - Titles: clamp to a maximum of 2 lines (-webkit-line-clamp) with a
     consistent min-height so descriptions start at the same level.
3. Hover: the card may lift (transform: translateY(-6px)) and change
   shadow/border color, but it must NOT change size, padding, or border
   width (use a transparent border by default so nothing shifts).
4. One consistent value for grid gap, card padding, and border-radius
   (CSS variables on :root).

   ## B. Hero section
1. The hero image is small and floats inside a big dark frame. Make the
   image fill its panel (width:100%; aspect-ratio or height matching the
   text column; object-fit:cover; rounded corners) and reduce the frame
   padding so the image dominates.
2. Layout: CSS Grid, grid-template-columns: 1.1fr 0.9fr, gap:
   clamp(24px, 4vw, 64px), align-items:center, inside a centered container
   (max-width about 1200-1320px with consistent side padding). Stack to
   one column below about 900px, image below the text.
3. CTA buttons: a flex container (display:flex; flex-wrap:wrap; gap:12px).
   All buttons share the same height, padding, and font size. Keep them
   on one row on desktop if possible (slightly smaller padding, or turn
   the third into a ghost/text link). Full width or neat wrap on mobile.
4. Trust points (Quality / Clarity / Delivery): CSS grid with 3 equal
   columns on desktop, stacked on mobile, so none is orphaned on a
   second row.
5. Slider arrows: place them inside the hero container (position:absolute,
   vertically centered, 12-16px from the content edges), not at the far
   edge of the viewport. Dots centered under the content.
6. Headline and text sizes use clamp() so nothing overflows or collides
   with the image.

   ## C. Global CSS
- *, *::before, *::after { box-sizing:border-box; }
- img { max-width:100%; display:block; }
- Use logical properties (margin-inline, padding-inline,
  inset-inline-start/end, text-align:start) so LTR/RTL both work. Arrow
  icons must flip in RTL (e.g. [dir="rtl"] .arrow { transform: scaleX(-1); }).
- Must look right in light and dark mode.
- Test at 360, 768, 1024, 1280, 1536px. No horizontal scroll. No fixed
  pixel heights that crop text.

  ## D. Elegant animations (pure CSS + vanilla JS only)
Keep them subtle, smooth, and professional (this is an industrial B2B
brand, not a playful site).
1. Scroll reveal: using IntersectionObserver, elements with a class like
   .reveal fade in and slide up (opacity 0 -> 1, translateY(24px) -> 0,
   about 600-700ms, cubic-bezier(.22,.61,.36,1)). Observe once, then
   unobserve. Cards in a grid appear staggered (50-120ms delay increments,
   set with a CSS variable like style="--i:2").
2. Hero entrance: on page load, the badge, headline, paragraph, buttons,
   and trust points fade/slide in one after another (staggered), and the
   hero image fades in with a gentle scale (1.04 -> 1).
3. Hero slider: smooth cross-fade or slide between slides (about 700ms),
   a progress/active-dot animation, auto-play every 5-6 seconds, pause
   on hover/focus, keyboard-accessible arrows. Written in vanilla JS.
4. Cards: on hover, the image zooms slowly (transform: scale(1.06),
   600ms, inside the overflow:hidden wrapper), the card lifts with a
   softer shadow, and the arrow in the button slides a few pixels.
5. Buttons: smooth hover transitions (background, shadow, slight lift);
   a subtle press effect on :active.
6. Header: becomes slightly compact with a soft shadow after scrolling
   (a small scroll listener with a CSS class toggle).
7. Section headings: a gold underline that grows from 0 to full width
   when the heading reveals.
8. Performance rules: animate ONLY transform and opacity, use
   will-change sparingly, throttle scroll handlers or use
   IntersectionObserver, no layout-shifting animations.
9. Accessibility: wrap everything in
   @media (prefers-reduced-motion: reduce) to disable or minimize motion,
   and make sure content is visible even if JavaScript fails (e.g. add a
   "js" class to <html> via script, and only hide .reveal elements when
   that class exists).
10. Put all animation JS in ONE small file (e.g. animations.js) loaded
    with defer, and all animation CSS in one clearly commented block.

    ## How I want the answer
1. List the root causes you found (exact selectors and files).
2. Give the fixes as small labeled snippets, with the file name and where
   to place each one.
3. Give the animation CSS block and the animations.js file, plus the exact
   one-line additions needed in my HTML (e.g. adding class="reveal" or
   the script tag).
4. List any pages or components that may still need manual changes, and
   why.
5. End with a checklist I can use to verify each page: images fill cards,
   buttons aligned, hero stacks on mobile, RTL works, dark mode works,
   animations run once, reduced-motion respected.

   ## SAFE-CHANGE RULES (very important)
- Do NOT restructure my HTML or rename existing classes/IDs. Reuse the
  card classes and CSS I already have.
- Do NOT change colors, fonts, or the brand look. Use my CSS variables.
- Give changes as small labeled snippets (file name + where to place it).
  Never dump a full rewritten file.
- Put any new CSS at the END of my shared stylesheet in a commented block.
- Before changing anything, tell me which HTML section or CSS selectors
  you need to see. Ask instead of guessing class names.

  ## CHANGE 1: Home page 2, section "Materials to match your requirement"
Problems:
- This section currently repeats the same content (titles, descriptions,
  buttons) as Home page 1's product cards, so the images repeat too.
- The 6 cards are not aligned in a proper grid.

What I want:
1. Keep 6 cards, arranged as a clean grid: 3 columns x 2 rows on desktop
   (1024px and above), 2 columns on tablet (600-1023px), 1 column on
   mobile (below 600px). Use CSS Grid with one gap variable and
   align-items: stretch.
2. All 6 cards must be equal height. Use flex column inside each card
   and margin-top:auto on the button so buttons line up even when
   titles wrap.
3. Every card's image uses the same frame: aspect-ratio 4 / 3,
   object-fit: cover, overflow hidden, rounded top corners, no padding
   or grey wrapper.
4. Replace the duplicated content with NEW placeholder content for 6
   different materials that are relevant to a steel supplier and
   clearly different from Home page 1 (which uses TMT Bars, Structural
   Steel, Binding Wire). Suggested: Mild Steel Angles, Channels and
   Beams, Flat Bars and Plates, Round and Square Bars, Wire Mesh and
   Reinforcement Mesh, Roofing and Cladding Sheets. For each, write a
   short title (max 2 lines), a one-sentence description (about 12-18
   words), and a button label that differs per card where sensible.
5. Keep image tags in place with a neutral placeholder src and a
   meaningful alt text for each card, because I will replace the images
   myself later. Add a comment above each image such as
   <!-- Replace with: angle and channel steel photo -->.
6. Hover: the card lifts (translateY(-6px)) with a softer shadow, the
   image zooms slowly (scale 1.06, 600ms), and nothing shifts in size.
   Add a subtle scroll-reveal with staggered delay using --i
   (IntersectionObserver, observe once), and respect
   prefers-reduced-motion.

   ## CHANGE 2: Product page 1, section "Find a grade to match your specification"
Problems:
- The grid is not aligned and currently has 6 containers.

What I want:
1. Change it from 6 containers to 8. Add 2 new containers that match the
   existing ones in structure and class names, with new placeholder
   grade/spec content. Tell me exactly where to paste them.
2. Arrange the 8 as a clean grid: 4 columns x 2 rows on desktop
   (1100px and above), 2 columns x 4 rows on tablet (600-1099px),
   1 column on mobile. Never leave an orphaned card on a partial row.
3. All 8 containers must be equal height with consistent padding,
   radius, gap, and aligned inner content (title, spec lines, button
   or link pinned to the bottom).
4. Keep the same hover and reveal animation style as Change 1.


## Global requirements
- *, *::before, *::after { box-sizing: border-box; }
- Use logical properties (margin-inline, padding-inline, text-align:start)
  so RTL works. Flip arrow icons in RTL.
- Works in light and dark mode. No horizontal scroll at 360, 768, 1024,
  1280, 1536px. No fixed pixel heights that crop text.
- Do not use !important unless unavoidable, and say why.

## How I want the answer
1. Ask for any HTML/CSS you need to see first.
2. Then give the new HTML for the 6 cards and the 2 extra containers,
   with the file name and exact location.
3. Give the CSS grid snippet for each section (to add at the end of the
   shared stylesheet) and the small reveal JS only if I don't already
   have one.
4. End with a checklist: grid layout at each breakpoint, equal heights,
   images fill the frame, 8 containers present, RTL and dark mode OK.



## Home Page 2 Product Range Images Integration (Task 21)
- **Image Mapping & Placement in `pages/home-2.html`**:
  - Placed the 6 newly added photographic assets from `assets/images/` into the updated "Product range" section (`.home-story-range`):
    1. `Mild Steel Angles` -> `../assets/images/Mild Steel Angles.jpg`
    2. `Channels and Beams` -> `../assets/images/Channels and Beams.jpg`
    3. `Flat Bars and Plates` -> `../assets/images/Flat Bars and Plates.jpg`
    4. `Round and Square Bars` -> `../assets/images/Round and Square Bars.jpg`
    5. `Wire Mesh and Reinforcement Mesh` -> `../assets/images/Wire Mesh and Reinforcement.jpg`
    6. `Roofing and Cladding Sheets` -> `../assets/images/Roofing and Cladding Sheets.jpg`
  - Replaced temporary placeholder images and comment markers.
  - Added descriptive `alt` text, `loading="lazy"`, and fallback `onerror="this.onerror=null;this.src='../assets/images/placeholder.jpg';"`.
- **Card Image Styling in `assets/css/home-2.css`**:
  - Set `.home-story-range__card > .product-card__image` with `aspect-ratio: 4 / 3`, `display: flex`, `align-items: center`, `justify-content: center`, `padding: var(--space-2)` (8px), `background: var(--color-surface)`, and `border-bottom: 1px solid var(--color-border)`.
  - Applied `object-fit: contain;` and `object-position: center;` to `.home-story-range__card .product-card__image img` to ensure square and portrait images remain 100% visible, centered, and sharp without cropping or distortion.
- **Verification**:
  - Visual verification captured via Chrome headless on desktop (1440px) and mobile (390px).
  - All 13 core site integration checks in `test.html` pass with 100% success.


## Products Hub Construction Steel Categories Image Integration (Task 22)
- **Image Mapping & Placement in `pages/products.html`**:
  - Matched and integrated existing photographic assets from `assets/images/` into the "Construction steel categories" section (`.products-hub__category-grid`):
    1. `TMT Bars` -> `../assets/images/TMT Bars.jpg`
    2. `Structural Steel` -> `../assets/images/Structural Steel.jpg`
    3. `Binding Wire` -> `../assets/images/Binding Wire.jpg`
    4. `MS Plates` -> `../assets/images/MS Plates & Sheets.jpg`
  - Replaced the placeholder SVG icons (`.feature-card__icon`) with standardized `.product-card__image` containers.
  - Added descriptive `alt` text, `loading="lazy"`, and fallback `onerror="this.onerror=null;this.src='../assets/images/placeholder.jpg';"`.
- **Card Image Styling in `assets/css/products-hub.css`**:
  - Maintained global standard `aspect-ratio: 4 / 3`, `display: flex`, `align-items: center`, `justify-content: center`, `padding: var(--space-2)`, `background: var(--color-surface)`, and `border: 1px solid var(--color-border)`.
  - Configured `object-fit: contain;` and `object-position: center;` so that all images display with 100% visibility without cropping, clipping, or distortion.
  - Added hover zoom effect (`transform: scale(1.04)`) with `prefers-reduced-motion` compliance.
- **Verification**:
  - Verified on desktop (1440px) 4-column layout and mobile (390px) single-column stacked layout.
  - All 13 core site integration checks in `test.html` pass with 100% success.

  You are a senior front-end developer who works ONLY with plain HTML5, CSS3
and vanilla JavaScript (ES6+). Do NOT use or suggest React, Vue, Tailwind,
Bootstrap, jQuery, SASS/SCSS, npm packages, CDNs, or libraries.
Everything must work by opening the .html files directly in a browser.

## Project context
Steel supplier website (TMT bars, structural steel, binding wire) with
light/dark mode and LTR/RTL toggles. On the Products page, in the section
"Find a grade to match your specification", there are 8 grade cards in a
4-column x 2-row grid. The first 6 are real: Fe 415, Fe 500, Fe 500D,
Fe 550, Fe 550D, Fe 600. Cards 7 and 8 are still placeholders (badge
"Placeholder 7" / "Placeholder 8", title "PLACEHOLDER", values "Add value",
"Replace with approved applications for this grade.", "Add sizes").

## SAFE-CHANGE RULES (very important)
- Do NOT restructure my HTML or rename existing classes/IDs. Cards 7 and 8
  must keep exactly the same markup and class names as the 6 real cards.
- Do NOT change colors, fonts, or the brand look. Use my CSS variables.
- Give changes as small labeled snippets (file name + where to place it).
  Never dump a full rewritten file.
- Put any new CSS at the END of my shared stylesheet in a commented block.
- If you need to see my card HTML or CSS first, ask me. Don't guess class names.

## TASK 1: Replace the two placeholder cards with real content
Card 7 -> Fe 415D
- Badge: "Fe 415D"
- Title: "FE 415D"
- Yield strength: 415 MPa
- Elongation reference: 18%*
- Typical applications: one sentence, same tone and length (about 12-16
  words) as the other cards, e.g. general reinforced concrete work that
  needs better ductility than standard Fe 415.
- Example available sizes: 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm
- Button: "Enquire price" (same as the others)

Card 8 -> Fe 500S
- Badge: "Fe 500S"
- Title: "FE 500S"
- Yield strength: 500 MPa
- Elongation reference: 18%*
- Typical applications: one sentence, same tone and length, e.g. structures
  in seismic zones that need high ductility and energy absorption.
- Example available sizes: 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm
- Button: "Enquire price"

Keep the asterisk on the elongation values and the same footnote logic as
the existing cards. Tell me to verify these figures against IS 1786 and my
supplier's mill test certificates before publishing.

## TASK 2: Image slot (I will add the images myself)
- Add an image wrapper inside cards 7 and 8 only if the other cards have
  one. If they don't, tell me and do not add it.
- Where an image is needed, use a neutral placeholder src, a meaningful alt
  ("Fe 415D TMT bars", "Fe 500S TMT bars"), and a comment above it:
  <!-- Replace with: Fe 415D TMT bar photo -->
- Frame: aspect-ratio 4 / 3, object-fit: cover, overflow hidden, rounded
  corners, no padding or grey wrapper.

## TASK 3: Fix the card alignment problems visible in my screenshot
1. Titles: "PLACEHOLDER" wrapped to two lines and pushed the stat boxes down,
   so cards 3 and 4 are taller than cards 1 and 2. Make titles single-line
   (white-space: nowrap with clamp() font-size) or reserve the same
   min-height for every title, so the stat boxes start at the same level
   in all 8 cards.
2. Stat boxes ("Yield strength" / "Elongation reference"): same height in
   every card, values on one line. Use a 2-column grid with equal columns.
3. Size chips: the first chip ("8 mm") sits higher than the rest. Use
   display:flex; flex-wrap:wrap; gap: var(--gap); align-items:center, and
   give every chip identical height, padding, and line-height.
4. Equal-height cards: grid with align-items:stretch; each card is a flex
   column; the "Typical applications" block grows with flex:1 and the
   "Enquire price" button is pinned to the bottom with margin-top:auto so
   all 8 buttons line up on each row.
5. Layout: 4 columns at 1100px and above, 2 columns from 600 to 1099px,
   1 column below 600px. No orphaned card.
6. Button text "ENQUIRE PRICE ->" must not overflow the card. Reduce
   padding or font size slightly with clamp() if needed.

## Global requirements
- *, *::before, *::after { box-sizing:border-box; }
- Logical properties (margin-inline, padding-inline, text-align:start);
  the arrow in the button must flip in RTL.
- Works in light and dark mode. No horizontal scroll at 360, 768, 1024,
  1280, 1536px. No fixed pixel heights that crop text.
- Keep the existing hover lift and scroll-reveal style. Cards 7 and 8 get
  the same classes so they animate the same way. Respect
  prefers-reduced-motion.
- No !important unless unavoidable, and explain why.

## How I want the answer
1. Ask for any HTML/CSS you need to see first.
2. Give the exact HTML to paste for cards 7 and 8 (file name and location).
3. Give the CSS snippet for Task 3 (to add at the end of the stylesheet).
4. End with a checklist: 8 real cards, no placeholder text left, titles on
   one line, stat boxes aligned, chips aligned, buttons aligned on both
   rows, correct columns at each breakpoint, RTL and dark mode OK.

## Products by Grade and Size Image Integration & Layout Alignment (Task 23)
- **Grade Catalogue Integration (`pages/products-grade.html` & `assets/js/products.js`)**:
  - Dynamically injected `.grade-card__image.product-card__image` into each grade card in `renderCard(grade)` in `assets/js/products.js`.
  - Mapped each grade to its exact photographic asset in `assets/images/`:
    1. `Fe 415` -> `assets/images/Fe 415.jpg`
    2. `Fe 500` -> `assets/images/Fe 500.jpg`
    3. `Fe 500D` -> `assets/images/Fe 500D.jpg`
    4. `Fe 550` -> `assets/images/Product page Hero 2.jpg`
    5. `Fe 550D` -> `assets/images/Product page Hero 2.jpg`
    6. `Fe 600` -> `assets/images/Fe 600.jpg`
    7. `Fe 415D` -> `assets/images/FE 415D.jpg`
    8. `Fe 500S` -> `assets/images/FE 500S.jpg`
  - Added descriptive `alt` tags, `loading="lazy"`, and `onerror` fallback to `assets/images/placeholder.jpg`.
  - Added image references to `steelGrades` in `assets/js/data.js`.
  - Applied standardized image box layout in `assets/css/products-grade.css`:
    - `aspect-ratio: 4 / 3`, `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius)`, `padding: var(--space-2)`, `box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.02)`.
    - `object-fit: contain` and `object-position: center` ensuring 100% full uncropped image display.
    - Card grid layout: 4 columns on desktop (>=1100px), 2 columns on tablet (600px–1099px), and 1 column on mobile (<600px).
    - Equal height cards (`display: flex; flex-direction: column; height: 100%;`) with bottom-pinned CTA buttons (`margin-block-start: auto;`).

- **Size Catalogue Integration (`pages/products-size.html` & `assets/js/products.js`)**:
  - Replaced static SVG placeholder (`rebar.svg`) with dynamic size-specific images in `initSizeProducts` in `assets/js/products.js`.
  - Mapped each nominal diameter to its newly uploaded asset:
    1. `8 mm` -> `assets/images/8mm.jpg`
    2. `10 mm` -> `assets/images/10mm.jpg`
    3. `12 mm` -> `assets/images/12mm.jpg`
    4. `16 mm` -> `assets/images/16mm.jpg`
    5. `20 mm` -> `assets/images/20mm.jpg`
    6. `25 mm` -> `assets/images/25mm.jpg`
    7. `32 mm` -> `assets/images/32mm.jpg`
  - Both `.size-detail__image` and `.size-product-card__image` dynamically update upon tab selection with `onerror` fallback to `placeholder.jpg`.
  - Styled with standard `aspect-ratio: 4 / 3`, `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius)`, `object-fit: contain`, and `object-position: center`.
  - Added responsive separator border `border-inline-end: 1px solid var(--color-border)` for the 2-column layout on desktop/tablet.

- **Verification**:
  - Full headless Chrome visual regression testing across desktop (1440px) and mobile (390px) viewports.
  - Interactive tab-switching verification: confirmed all 7 size tabs and 9 grade filter tabs render correctly with their dedicated images.
  - All 13 core site integration checks in `test.html` pass with 100% success.

## FE 550 and FE 550D Image Mapping Fix (Task 24)
- **Misplaced Image Removal**:
  - Removed `Product page Hero 2.jpg` (which displayed the red promotional hand-with-house hero graphic) from both `Fe 550` and `Fe 550D` in `assets/js/data.js` and `assets/js/products.js`.
- **Exact Name Configuration in `assets/js/data.js` & `assets/js/products.js`**:
  - `Fe 550` now maps directly to `Fe 550.jpg`.
  - `Fe 550D` now maps directly to `Fe 550D.jpg`.
  - Added multi-variant candidate fallback in `renderCard(grade)` in `assets/js/products.js`:
    - Automatically tests `Fe 550.jpg`, `FE550.jpg`, and `FE 550.jpg` for Fe 550.
    - Automatically tests `Fe 550D.jpg`, `FE550D.jpg`, and `FE 550D.jpg` for Fe 550D.
    - If the physical file is not yet present in the directory, it safely falls back to `assets/images/placeholder.jpg` without displaying broken image icons or misplaced assets.
- **Verification**:
  - Verified on `pages/products-grade.html` via headless Chrome screenshots. Cards 4 and 5 no longer display the red hero graphic.
  - All 13 core site integration checks in `test.html` continue to pass with 100% success.

## SAFE-CHANGE RULES (very important)
- Do NOT restructure my HTML or rename existing classes/IDs. If you need a
  new class, add it as a modifier (e.g. .media--poster) and tell me exactly
  where.
- Do NOT change brand colors, fonts, or content wording (except where a task
  below says so). Use my existing CSS variables.
- Give changes as small labeled snippets (file name + where to place it).
  Never dump a full rewritten file.
- Put new CSS at the END of the shared stylesheet in a commented block, and
  find and neutralize any older rules that fight it (per-page overrides,
  inline style="" attributes, duplicate selectors, leftover padding,
  object-fit: contain). List each one you remove or change.
- No !important unless unavoidable, and explain why.
- FIRST tell me exactly which files and snippets you need (shared CSS, one
  card from each page type, the contact section, the <head>). Do not guess
  class names.

1. Home page card: a portrait poster is cropped at the top by
   object-fit: cover in a landscape frame, so the headline text is cut off.
2. Home and Products cards: images sit inside a padded grey wrapper with
   object-fit: contain, so they float small, letterboxed, and each looks
   a different size. Posters are unreadable.
3. "Shop by grade" and "Shop by size": the left image has grey bands around
   it and the right poster is cropped at the bottom and runs flush to the
   top edge. The two cards don't match each other.
4. Card titles that wrap to two lines, with min-height reserved for every
   title, leave big empty gaps under one-line titles.
5. Contact page: the WhatsApp icon is a generic chat bubble, and all icons
   are small and thin.


   ## TASK 1: One reusable image frame for the whole site
Create one shared "media frame" pattern and apply it to EVERY card image,
the hero image, and the Shop by grade / Shop by size images on every page.
- Frame: position:relative; overflow:hidden; aspect-ratio 4 / 3 (16 / 10
  for the wide Shop by grade / size cards); padding:0; no grey wrapper,
  no inner border or inset; top corners follow the card radius (CSS
  variable). Background is only a loading placeholder using my surface
  variable.
- PHOTO mode (default): img { position:absolute; inset:0; width:100%;
  height:100%; object-fit:cover; object-position: var(--focus, center); }
  I can set style="--focus: 50% 30%" per image to choose the crop.
- POSTER mode (.media--poster) for portrait or text-heavy images that must
  NOT be cropped: the frame shows a blurred, scaled copy of the same image
  as its background (set with style="--img: url(...)" on the frame and a
  ::before pseudo-element with filter: blur(22px), transform: scale(1.2),
  low opacity), and the real img sits on top with object-fit: contain, so
  no grey boxes appear and no text is cut off. The same frame size is
  kept so cards still match.
- Add width and height attributes, loading="lazy" (not on the first hero
  image), decoding="async", and meaningful alt text on every image.
- Image fade-in: JS adds .is-loaded on the img "load" event, with a
  300-400ms opacity transition. Images must stay visible if JS fails
  (use the html.js pattern).
- Broken or missing image fallback (I will add real images later): on the
  "error" event, JS adds .media--missing, which shows a neutral
  gradient with a small inline-SVG steel icon, never a broken-image icon.
- Hover: image scales slowly (1.06, 600ms) inside the frame, with no layout
  shift.

## TASK 2: Card layout alignment (all grids, all pages)
- Grids: CSS Grid, align-items:stretch, one gap variable. Cards are
  display:flex; flex-direction:column; height:100%.
- Remove the reserved min-height on titles. Instead use container queries:
  card { container-type:inline-size } and title font-size:
  clamp(1.35rem, 7cqi, 2.1rem), with text-wrap:balance, so titles like
  "STRUCTURAL STEEL" fit on one line at 3 or 4 columns. If one still wraps,
  nothing breaks: the description follows the title directly and the
  button/link stays pinned to the bottom with margin-top:auto.
- Consistent card padding, radius, border (1px, transparent or subtle) and
  layered soft shadow from CSS variables. Hover only changes transform
  and shadow, never size or border width.
- Breakpoints: 4 columns at 1100px+, 2 columns at 600-1099px, 1 column
  below 600px for 4-card rows. Use 3 / 2 / 1 for 3-card rows. No orphaned
  card where I can avoid it.
- Hero image panel: use the same media frame so the image fills its panel
  (poster mode if it is a portrait poster).

## TASK 3: Apply it everywhere
Audit every HTML page and list each place that has an image wrapper,
card, or hero image (Home 1, Home 2, Products, grades, sizes, About,
Contact, and any others). Show which ones now use the shared pattern, and
which need a one-line HTML change (class or data attribute), by file name.
Flag any inline styles or page-level CSS that overrides the shared rules.

## TASK 4: Contact page icons and cards
1. Replace the current icons with a consistent set of inline SVGs (24x24
   viewBox, stroke="currentColor", stroke-width 1.75, round caps and
   joins), drawn by you in the HTML, no external files:
   - Address: map pin
   - Phone: phone handset
   - WhatsApp: the recognizable WhatsApp glyph (speech bubble with a
     handset inside), filled with currentColor
   - Working hours: clock
2. Icon holder: 56px circle with a soft gold tint using my brand variable,
   icon about 26px, gold icon color. On card hover, the circle fills gold
   and the icon turns dark, with a smooth transition.
3. Make the cards useful: phone card is a tel: link, WhatsApp card links to
   https://wa.me/<number digits only, with country code> using the number
   shown on the page, address card links to a Google Maps search for the
   address (target="_blank" rel="noopener"). Add small action text with an
   arrow (Call now, Chat on WhatsApp, Get directions) that flips in RTL.
4. Equal-height cards: 4 columns on desktop, 2 on tablet, 1 on mobile.
   Add aria-label to each link and a visible :focus-visible outline.
5. Simplify the hours text to "Mon-Sat, 9:00 AM - 6:00 PM IST".
6. Browser-tab favicon: if the page uses a generic or broken favicon,
   create an inline SVG favicon (a gold "F" or steel-bar mark on charcoal)
   and give me the <link rel="icon" type="image/svg+xml" href="data:..."> line
   for the <head> of every page.
7. Optional: below the cards, a "Visit us" panel with a lazy-loaded map
   <iframe> (plain HTML, title attribute set), styled with the same radius
   and shadow, stacked on mobile.

## TASK 5: Make it eye-catching and elegant (with restraint)
- Define design tokens on :root if missing: spacing scale (4, 8, 12, 16,
  24, 32, 48, 64, 96), radius scale, shadow scale (sm, md, lg), and a
  fluid type scale with clamp().
- Consistent vertical rhythm: every section gets the same top/bottom
  padding via a variable. Section headings use the small gold eyebrow
  text, the large condensed title, and a gold underline that grows when
  revealed.
- Cards: crisp image on top, optional small category chip over the image
  corner (uses existing gold variable), clean text hierarchy, link-style
  or outline buttons with an arrow that slides 4px on hover.
- Dark mode: check contrast of text on cards and chips (WCAG AA).
- Keep the scroll-reveal and hero entrance animations from earlier:
  only transform and opacity, staggered with --i, observed once, and
  disabled under prefers-reduced-motion.
- No new colors, no gradients that clash with the brand, no heavy effects.
  The goal is calm, premium, and industrial.

## TASK 6: Bug-proofing (do this before you answer)
Review your own output and confirm:
- No horizontal scroll at 360, 768, 1024, 1280, 1536px.
- No duplicate IDs, unclosed tags, or console errors.
- No fixed pixel heights that crop text; no layout shift when images load.
- Light and dark mode, LTR and RTL all work, including flipped arrows.
- Everything works with JavaScript disabled (content visible, layout intact).
- Keyboard navigation works on cards, links, arrows, and the toggles.

## PLACEHOLDER IMAGES RULE
Some of my current images are other companies' marketing posters (with
their logos, phone numbers, or dated price lists). List every such image by
file name and page. Do not treat them as final. For each one, tell me what
kind of replacement photo to shoot or source (subject, landscape 4:3,
about 1200x900, JPG or WebP under 200KB). Until I replace them, use
.media--missing or a neutral placeholder.

## How I want the answer
1. The list of files and snippets you need from me.
2. Root causes found in my code, with exact selectors and files.
3. The shared CSS block, the small JS file, and the per-page one-line
   changes, each labeled with file name and location.
4. The new contact page HTML (icon SVGs and cards).
5. Work in small steps: shared fix first, then page by page. After each
   step, give a short verification checklist.

## Hero Section Visibility & Structural Steel Image Fix (Task 25 & 26)
- **Root Cause of Blank Hero Image & Cards**:
  1. Static HTML files had `media--missing` hardcoded on `.hero__image-frame`, `.page-hero__image-frame`, and `.product-card__image`.
  2. `media.js` previously only cleared `media--missing` if `frame.dataset.mediaError` existed, so hardcoded classes persisted even after images loaded successfully.
  3. In `media.css`, `.media-frame.media--missing > img` set `visibility: hidden;` and injected a placeholder icon mask, causing hero images and product cards to appear as blank white rectangles.
  4. In `media.css`, `.hero__image-frame.media-frame` had `background: var(--color-surface);`, which forced a white background inside the dark hero section in light mode.
- **Implemented Solutions**:
  1. Updated `assets/js/media.js` so `markLoaded(image)` unconditionally removes `media--missing` and cleans up error flags whenever an image loads successfully.
  2. Corrected `assets/css/media.css` line 151 to preserve the dark radial gradient background (`#15202D` to `#0B1118`), 1px gold border, and ambient shadow on hero frames instead of overriding with a white card background.
  3. Removed hardcoded `media--missing` from `index.html`, `pages/home-2.html`, `pages/products.html`, `pages/products-grade.html`, `pages/products-size.html`, `pages/price-enquiry.html`, and `pages/contact.html`.
  4. Added robust `onerror="this.onerror=null;this.src='...placeholder.jpg';"` fallback handlers to all hero and product card images.
  5. Connected the user's newly uploaded `assets/images/Structural Steel.jpg` (736×1104 px) on `index.html` and `pages/products.html` with full 4:3 contain aspect ratio.
  6. Verified all 7 pages on desktop (1440px) and mobile (390px): hero images (`Home page Hero 1.jpg`, `Home page Hero 2.jpg`, `Product page Hero 1.jpg`, `Product page Hero 2.jpg`, `Price page Hero.jpg`, `conatct  Hero.jpg`) now render with complete visibility, rich industrial dark framing, and 100% pass on all 13 test checks in `test.html`.
