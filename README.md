# ForgeLine Steel static website

A multi-page steel and TMT bar dealer website built with HTML, CSS and vanilla JavaScript. No build step or server is required: open `index.html` in a browser.

## Pages

- `index.html` — primary home page
- `pages/home-2.html` — detailed company, products, grade/size guides, logistics, quality process, testimonials and FAQ
- `pages/products.html` — product hub with Shop by Grade, Shop by Size and category overview
- `pages/products-grade.html` — TMT grade overview
- `pages/products-size.html` — common bar sizes
- `pages/price-enquiry.html` — quote request form
- `pages/contact.html` — contact details and message form
- `style-guide.html` — shared components previewed in light and dark themes
- `test.html` — shared shell, preference, navigation and scroll integration checks

## Before publishing

The website uses ForgeLine Steel as its brand and is configured with the supplied address `146(1), Sunvale Complex, Virudhunagar` and phone number `+91 98745 61230`. Confirm the address pin and service area, product availability and social profiles before publishing.

The price enquiry and Contact forms save submissions only in the visitor's browser using local storage; they do not transmit data to ForgeLine or a server. Replace the generic social profile links in `assets/js/data.js` with the business's verified profiles before publishing.

Both forms require a name of at least four letters (spaces allowed), exactly 10 numeric phone digits and a valid email address. The optional delivery date on the price enquiry form cannot be earlier than the current date in `Asia/Kolkata` (IST). Submission notifications reflect local browser storage success or validation/storage failures; they are not confirmation that a server received the data.

The contact page's Google Maps embed requires an internet connection and Google Maps availability. It searches for the supplied address; verify the map result before relying on it as a precise entrance or delivery pin.

The Home 2 testimonial carousel uses illustrative sample quotes, not real customer endorsements. Replace them with verified testimonials before publishing.

Product catalogue content is maintained in `assets/js/data.js`. Product illustrations are local SVG files in `assets/images/`.

The TMT size guide uses theoretical mass estimates based on nominal diameter (d²/162 kg/m) and rounded bar counts for 12 m lengths. These figures are for general reference only; confirm actual product weights, lengths, specifications and availability with the supplier.

The shared design system lives in `assets/css/`. Open `style-guide.html` to inspect the available type, layout, navigation, form and component states. The style guide is populated with plain JavaScript from `assets/js/style-guide.js`.

Open `test.html` to run the shared-module smoke checks. Resize the browser below 1024px to include the mobile drawer and focus-trap checks.

## Browser support and preferences

The shared navigation, theme controls and direction-only LTR/RTL layout toggle are implemented in vanilla JavaScript. The toggle changes only the document layout direction; it does not translate or modify page content. Theme and direction preferences are saved in local storage when browser permissions allow it; the site still works when storage is unavailable. Google Fonts are optional and have system-font fallbacks.

## Project structure

```text
.
├── index.html                 Primary home page
├── pages/                     Detailed home, product guides, enquiry and contact pages
├── assets/
│   ├── css/                   Shared design system and page-specific styles
│   ├── icons/                 SVG favicon and interface icons
│   ├── images/                Local SVG illustration placeholders
│   └── js/                    Shared shell, catalogue data, forms and page interactions
├── style-guide.html           Component previews for light/dark, LTR layout
├── test.html                  In-browser shared-module smoke checks
└── Decision.md                Project brief and implementation prompts
```

## Placeholder image inventory

The site uses local, scalable SVG illustrations rather than stock photography. Their SVG dimensions are resolution-independent. If replacing one with a raster image, use the suggested dimensions and keep the same aspect ratio to avoid changing the layout.

| File | Used for | Suggested replacement size |
| --- | --- | --- |
| `assets/images/hero/steel-coils.svg` | Primary steel-supply hero artwork | 1920 × 1080 px (16:9) |
| `assets/images/products/rebar.svg` | TMT bars and product cards | 800 × 600 px (4:3) |
| `assets/images/products/sections.svg` | Structural steel and product cards | 800 × 600 px (4:3) |
| `assets/images/about/quality.svg` | Grade-page quality illustration | 1000 × 800 px (5:4) |
| `assets/images/about/warehouse.svg` | Home 2 company and dispatch illustrations | 1200 × 900 px (4:3) |

Home 2 also contains inline SVG illustrations in `pages/home-2.html`. The contact page embeds an interactive Google Map search for the configured address; verify the returned pin before publishing. Sample partner marks and testimonial quotes are illustrative and should be replaced with approved branding and verified customer quotes.

## Editing the site

- **Colors and themes:** edit the light and dark custom properties in `assets/css/themes.css`. Keep text, muted text, focus, error and success colors readable against their actual backgrounds; use a contrast checker when changing them.
- **Fonts:** change the Google Fonts import and font variables in `assets/css/base.css`. Keep system fallbacks so the site remains usable without a network connection.
- **Layout and components:** shared spacing, containers, and breakpoints are in `assets/css/base.css`, `assets/css/layout.css` and `assets/css/responsive.css`; shared buttons, navigation and footer styles are in `assets/css/components.css`. Page-specific rules are in the matching CSS files under `assets/css/`.
- **Company and contact details:** update `brand.name`, `brand.logo`, `brand.descriptor`, `brand.phone`, `brand.phoneHref` and `brand.address` in `assets/js/data.js`. Update the visible contact details and Google Maps query in `pages/contact.html`. Replace generic social URLs in `socialLinks` with the business's verified profiles.
- **Content:** edit page copy in the corresponding HTML file. The direction toggle affects layout only; the site content remains English.
- **Product information:** edit the grade, size and product records in `assets/js/data.js`; keep the sizing calculations and their caveats consistent if you change the guide.
- **Page content and images:** edit the corresponding HTML file under `pages/` or `index.html`. Keep meaningful `alt` text for informative images, empty `alt` for decorative images, and update any asset paths when replacing illustrations.
