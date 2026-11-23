# Roneil G. Bansas — Portfolio

A Next.js portfolio with project sections and a Sanity-powered blog CMS. The visual system uses Geist, Instrument Serif, bespoke local SVG artwork, and responsive image layouts.

## Project structure

```text
app/
├── (site)/                 # Portfolio routes and shared shell
│   ├── about/page.tsx      # /about
│   ├── shop/page.tsx        # /shop
│   ├── services/page.tsx   # /services
│   ├── blog/
│   │   ├── [slug]/page.tsx # /blog/:slug
│   │   └── page.tsx        # /blog
│   ├── template.tsx        # Route-entry animation
│   ├── page.tsx            # /
│   └── projects/
│       ├── [slug]/page.tsx # Dynamic /projects/:slug details
│       └── page.tsx        # Data-driven category listing
└── studio/[[...tool]]/    # Embedded Sanity Studio at /studio
components/
├── blog/                   # Post cards and rich-content renderers
├── shop/                   # Searchable, filterable, paginated shop item directory
├── templates/              # Searchable, filterable, paginated Canva template directory
├── site/                   # Shared navigation, theme, and animation
└── ui/                     # Reusable UI primitives
content/blog/               # Local sample posts used without Sanity config
lib/                        # Blog queries and portfolio data
sanity/
├── client.ts               # Sanity client/environment config
└── schemas/                # Blog, shop item, template, and project schemas
public/images/              # Original local artwork and sample covers
sanity.config.ts            # Studio plugins, route, and schema registration
sanity.cli.ts               # Sanity CLI config
```

## Connect Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the project ID. Keep the dataset as `production` unless you created another dataset. No read token is needed for published public content.
3. Start the app with `npm run dev`, then open `/studio` and sign in to create and publish posts.

The Studio post editor supports a cover image, rich text, inline images with alt text and captions, uploaded video or YouTube/Vimeo/direct video URLs, code snippets, tags, and scheduled publication dates. The website renders these in the blog index and individual posts. With no Sanity project ID configured, the included sample posts are displayed instead.

The `/shop` page has two separate Sanity-powered catalogs. `Marketplace shop item` documents hold products from Amazon, Shopee, SHEIN, Lazada, TikTok Shop, or other marketplaces. `Canva design template` documents hold Canva design templates only, such as menus, packaging, social graphics, branding, and presentations; they cannot be assigned generic product categories or non-Canva platforms. Each section has its own search, category/platform filters, and independent pagination. Add listing links and image galleries in the corresponding Sanity document type; external platforms handle checkout, product availability, template access, and delivery. The old `/shops` and `/templates` URLs redirect to the combined Shop page.

The Projects page is organized into video editing, graphic design, web development, app development, and virtual assistant sections. The Services page describes those offers and electrical installation and maintenance. In `/studio`, create a document under the matching project type; each type presents its own relevant fields. Published projects drive category counts, cards, and `/projects/<slug>` detail pages. If there are no published Sanity project documents, the local sample is shown.

Video editing projects have video format, editing software, deliverables, and final-video fields. Graphic design projects have design type, design tools, and deliverables. Web projects have technology stack, features, and live/source links. App projects have platforms, technology stack, features, and store links. Virtual-assistant projects have support areas, tools, engagement, outcomes, and an optional testimonial. All types share cover media, client/context, role, duration, highlights, and an image/video gallery. These different fields are normalized for reusable listing cards while each project detail page renders only the available category-specific information.

For local fallback/testing without Sanity, add project objects to `sampleProjects` in `lib/projects.ts`.

## Development

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000). Use `npm run lint` and `npm run build` to validate the project.


Yt1chkgPlifYHN9b