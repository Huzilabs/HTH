# HTH (Hub to Hub): website

Brand site for HTH, a digital growth and automation agency. Built with Next.js (App Router), TypeScript and Tailwind CSS v4. All copy lives in `/content`, so you can edit text without touching components.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. Every page is prerendered except `/api/contact` |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URL, e.g. `https://www.yourdomain.com`. Used by canonical tags, sitemap, OG and JSON-LD. Falls back to the Vercel production domain. |
| `GHL_WEBHOOK_URL` | Yes in production | GoHighLevel **Inbound Webhook** trigger URL. The contact form posts to `/api/contact`, which forwards to this URL server-side. In development, if it's unset, submissions are logged to the terminal and the form shows success. In production, if it's unset, the form shows its error state. |
| `GHL_CALENDAR_EMBED_URL` | Recommended | `https` URL of your GHL booking calendar embed. Shown on `/contact#book`. A labelled placeholder appears until it's set. |

Pages are static, so env values are read at **build time**. After changing them in Vercel, redeploy.

### What the contact webhook receives

```json
{
  "first_name": "", "last_name": "", "full_name": "", "email": "",
  "phone": "", "whatsapp": "", "company_name": "",
  "services": ["AI chatbots", "SEO"], "services_text": "AI chatbots, SEO",
  "budget": "", "message": "", "source": "Website contact form",
  "page": "", "submitted_at": "ISO date"
}
```

In your GHL workflow, map these fields with **Create/Update Contact**. Use `services_text` for a single-line custom field.

## Project structure

```
app/
  layout.tsx                 fonts, skip link, Organization + ProfessionalService JSON-LD
  (site)/                    every public page shares the header and footer layout
    page.tsx                 Home
    services/                overview + [slug] (one template for every service)
    work/                    case study index (hub filter) + [slug]
    about/ contact/ insights/ (+ [slug] for MDX posts)
    **/opengraph-image.tsx   brand-style OG images (next/og)
  api/contact/route.ts       validates and forwards the form to GHL
  brand/                     internal brand directions page (noindex, not in nav)
  sitemap.ts robots.ts llms.txt/route.ts not-found.tsx icon.svg apple-icon.tsx
components/                  brand/ layout/ sections/ ui/ seo/ contact/
content/                     ALL copy (JSON + MDX), see below
lib/                         content loaders, SEO + JSON-LD builders, OG renderer
styles/tokens.css            design tokens, the only source of colour, type and radii
assets/fonts/                font files used to draw OG images
```

## Editing content

Everything below lives in `/content`. Search the codebase for `[PLACEHOLDER` to find every marker waiting for real information (numbers, client names, social URLs, the WhatsApp number, response times).

| File | Controls |
| --- | --- |
| `site.json` | Name, description, email, **WhatsApp number**, social links, nav, footer note |
| `home.json` | Home page: hero, proof numbers, hubs intro, "how it connects", process, industries, CTA |
| `hubs.json` | The four hubs (name, summary, description) |
| `services/*.json` | One file per service page |
| `case-studies/*.json` | One file per case study |
| `testimonials.json` | Testimonials |
| `insights/*.mdx` | Blog posts |
| `about.json`, `contact.json`, `faqs.json`, `pages.json` | Those pages, plus intro text for Services, Work, Insights and the 404 page |

**WhatsApp:** set `whatsapp.number` in `content/site.json` to digits only, with country code (e.g. `923001234567`). The footer and Contact page then show a working `wa.me` click-to-chat link.

**Social links:** replace each `href` in `site.json` with a full `https://` URL. Placeholder text isn't linked, and real URLs are also added to the Organization JSON-LD `sameAs`.

### Add a service

1. Copy any file in `content/services/` to `content/services/<new-slug>.json`.
2. Set `slug` (it must match the filename), `hub` (`crm-automation`, `ai`, `web-commerce` or `growth`) and `order` (its position within the hub).
3. Write `answer` as two or three plain sentences: what it is, who it's for, and what HTH does. It opens the page and is what AI engines quote.
4. Fill in `whoFor`, `problem`, `deliverables`, `tools`, `process` (4 steps), `timeline`, `faqs` and `seo`.

The page, the Services overview, the footer, the contact form's service options, the sitemap, `llms.txt` and the Service + FAQPage JSON-LD all pick it up automatically.

### Add a case study

1. Copy `content/case-studies/real-estate-speed-to-lead.json` to `content/case-studies/<slug>.json`.
2. Fill in `title`, `client`, `industry`, `region`, `hubs`, `summary`, `problem`, `built`, `stack` and `results`.
3. Screenshots: put images in `public/work/<slug>/` and add `"src": "/work/<slug>/pipeline.png", "width": 1600, "height": 1000` to each entry in `screenshots`. Entries without `src` show a labelled placeholder. Always write a meaningful `alt`.
4. Optionally link a testimonial with `testimonialId`, and set `placeholder` to `false` once it's real.

### Add a testimonial

Add an object to `content/testimonials.json`:

```json
{
  "id": "unique-id",
  "quote": "Specific, in the client's words.",
  "name": "Full name",
  "role": "Founder",
  "company": "Company",
  "industry": "Real estate",
  "hub": "crm-automation",
  "result": "Optional, e.g. 40% more booked calls",
  "photo": "/testimonials/name.jpg",
  "featured": false,
  "placeholder": false
}
```

- `placeholder: true` testimonials (the six samples) **only appear in development**, marked with a "Sample" label. Production builds remove them automatically, and if no real testimonials exist, the testimonial sections disappear entirely.
- `featured: true` makes it the large quote on the Home page. Use it on one testimonial only.
- With no `photo`, an initials avatar is shown. Put photos in `public/testimonials/`.
- The Home page shows all of them. Each service page shows up to two from that service's `hub`.

### Add a blog post

Create `content/insights/<slug>.mdx`:

```mdx
export const metadata = {
  title: "Post title",
  description: "One or two sentences. Used for the listing, meta description and Article JSON-LD.",
  date: "2026-12-01",
  hub: "growth",
  readingTime: "5 min read",
};

Write the post in Markdown. Use `##` for section headings (the page title is the only h1).
```

It shows up on `/insights`, in the sitemap and in `llms.txt`, and gets its own OG image and Article JSON-LD.

## Design system

Brand direction **B, "Network"** (compare all three at `/brand`). Tokens live in `styles/tokens.css`:

- **Colour:** `ground` #0F1315, `ink` #E6EAE3, `accent` #E3B34A, plus fixed mixes of those (`muted`, `subtle`, `line`, `line-strong`, `raised`). Tailwind's default palette is switched off, so only these colour classes exist.
- **Type:** Archivo (semi-condensed for headlines via the `display` utility) and JetBrains Mono (the `label` utility).
- **Contrast:** ink 15.3:1, muted 9.6:1, subtle 7.1:1, accent 9.6:1 on ground. Every text pair passes WCAG AA.
- **Motion:** the only motion is the "how it connects" route line drawing in on scroll. It uses CSS scroll-driven animation, not JavaScript, and is off for reduced-motion users.

## SEO, AEO and GEO

- Per-page `metadata` (title, description, canonical, Open Graph, Twitter), plus OG images generated with `next/og` in the brand style.
- JSON-LD:
  - Organization (with email) and ProfessionalService on every page
  - Service, FAQPage and BreadcrumbList on service pages
  - CreativeWork on case studies
  - Article on posts
  - BreadcrumbList on every inner page
- `/sitemap.xml`, `/robots.txt`. AI crawlers are allowed; only `/api/` and `/brand` are excluded.
- `/llms.txt` summarises HTH, every service (using its direct answer), key pages, case studies, posts, FAQs and the contact email. It's generated from `/content`, so it stays current.
- One `h1` per page, descriptive headings, and alt text on every image and placeholder.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** this repo. The framework preset (Next.js) is detected automatically. Leave the build settings as they are.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `GHL_WEBHOOK_URL` and `GHL_CALENDAR_EMBED_URL` for Production (and Preview if you want forms to work there).
4. Deploy. Then add your domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to match.
5. Redeploy after any env var change, because pages read them at build time.
6. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

### Before launch checklist

- [ ] Replace every `[PLACEHOLDER: ...]` (search the repo)
- [ ] Add real testimonials with `placeholder: false`, or accept that the sections stay hidden
- [ ] Set the WhatsApp number and social URLs in `content/site.json`
- [ ] Set all three env vars in Vercel and send a test form submission
- [ ] Add real case study screenshots
