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